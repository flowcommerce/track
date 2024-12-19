# track

UI for https://track.flow.io

## Development

To start the application in development mode run the following commands:

Webpack
```
npm run dev
```

Python HTTP Server
```
python -m SimpleHTTPServer 8000
```

You can view the dev version of the page at: [http://localhost:8000/index-dev.html](http://localhost:8000/index-dev.html)

## Deploying

To deploy run the release command:

```
go run release.go
```

## CloudFlare redirects

This app is a static file that is hosted in S3 and served via CloudFlare. It's also responsible for handling redirect of pretty URLs like [https://track.flow.io/SF704472243261382](https://track.flow.io/SF704472243261382) to [https://track.flow.io/index.html?number=SF704472243261382](https://track.flow.io/index.html?number=SF704472243261382).

Note that the redirects are for the tracking code prefixes `F70` and `SF70`. If the tracking number format changes in any way, CloudFlare will need to be updated as well.
