properties([pipelineTriggers([githubPush()])])

pipeline {
  options {
    disableConcurrentBuilds()
    buildDiscarder(logRotator(numToKeepStr: '10'))
    timeout(time: 30, unit: 'MINUTES')
  }

  agent {
    kubernetes {
      inheritFrom 'default'

      containerTemplates([
        containerTemplate(name: 'nodejs', image: "flowdocker/node12_builder:0.2.27", resourceRequestCpu: '1', resourceRequestMemory: '4Gi', command: 'cat', ttyEnabled: true, runAsUser: '1000'),
      ])
    }
  }

  environment {
    ORG      = 'flowcommerce'
    NPM_TOKEN = credentials('jenkins-npm-automation-token')
  }

  stages {
    stage('Checkout') {
      steps {
        checkoutWithTags scm

        script {
          VERSION = new flowSemver().calculateSemver() //requires checkout
        }
      }
    }

    stage('Install & Build') {
      environment {
        NPM_TOKEN = credentials('jenkins-npm-automation-token')
      }
      when { not { branch 'main' } }
      steps {
        container('nodejs') {
          script {
            sh(script: 'node --version')
            sh(script: 'npm --version')
            sh(script: 'echo "//registry.npmjs.org/:_authToken=\${NPM_TOKEN}" > .npmrc')
            sh(script: 'sleep 1800')
            //sh(script: 'NODE_ENV=development npm ci')
          }
        }
      }
    }

    stage('Lint') {
      //when { not { branch 'main' } }
      steps {
        container('nodejs') {
          script {
            sh(script: 'npm run lint')
          }
        }
      }
    }

    stage('Commit SemVer tag') {
      when { branch 'main' }
      steps {
        script {
          VERSION = new flowSemver().calculateSemver()
          new flowSemver().commitSemver(VERSION)
        }
      }
    }

    stage('Build new release') {
      when { branch 'main' }
      steps {
        container('nodejs') {
          withCredentials([
            usernamePassword(
              credentialsId: 'jenkins-x-github',
              usernameVariable: 'GIT_USERNAME',
              passwordVariable: 'GIT_PASSWORD'
            )
          ]) {
            script {
              semver = VERSION.printable()
              sh """
                sleep 1800
                git clone https://github.com/flowcommerce/track.git track
                cd track
                npm install && npm prune
                npm run build
                mv dist/js/main.css dist/css/main.css
                sed -i '.bak' 's/__APP_VERSION__/$semver/g' dist/index.html
                aws s3 sync dist/css s3://track.flow.io/test/css/$semver --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers
                aws s3 sync dist/js s3://track.flow.io/test/js/$semver --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers
                sleep 1800
                aws s3 cp dist/index.html s3://track.flow.io/test --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers
              """         
            }
          }
        }
      }
    }
  }
}
