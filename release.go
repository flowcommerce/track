package main

import (
	"github.com/flowcommerce/tools/executor"
)

func main() {
	executor := executor.Create("track")
	executor = executor.Add("git checkout main")
	executor = executor.Add("git pull origin main")
	executor = executor.Add("dev tag")
	executor = executor.Add("npm install && npm prune")
	executor = executor.Add("npm run build")
	executor = executor.Add("mv dist/js/main.css dist/css/main.css")
	executor = executor.Add("sed -i '.bak' 's/__APP_VERSION__/'$(sem-info tag latest)'/g' dist/index.html")
	executor = executor.Add("aws s3 sync dist/css s3://track.flow.io/css/`sem-info tag latest`")
	executor = executor.Add("aws s3 sync dist/js s3://track.flow.io/js/`sem-info tag latest`")
	executor = executor.Add("aws s3 cp dist/index.html s3://track.flow.io")
	executor.Run()
}
