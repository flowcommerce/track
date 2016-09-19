package main

import (
	"github.com/flowcommerce/tools/executor"
)

func main() {
	executor := executor.Create("track")
  executor = executor.Add("git checkout master")
  executor = executor.Add("git pull origin master")
  executor = executor.Add("npm install && npm prune")
  executor = executor.Add("npm run build")
  executor = executor.Add("sed -i '.bak' 's/APP_VERSION/'$(sem-info tag latest)'/g' dist/index.html")
	executor = executor.Add("aws s3 sync dist/css s3://io-flow-track-www/css/`sem-info tag latest` --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers")
  executor = executor.Add("aws s3 sync dist/js s3://io-flow-track-www/js/`sem-info tag latest` --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers")
  executor = executor.Add("aws s3 cp dist/index.html s3://io-flow-track-www --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers")
	executor.Run()
}
