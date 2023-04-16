# Build image and load image

An automatic build image and upload image into server direct with [Docker REST API](https://docs.docker.com/engine/api/v1.42)

## Parameter

### url

- Required: ✅
- Description: `URL docker tcp server (Version required)`

### image

- Required: ❌
- Description: `Image name for build`
- Default: `<GH_USERNAME>-<GH_REPO>-<GH_COMMIT>`

### version

- Required: ❌
- Description: `Image version (Tag) for build`
- Default: `latest`

### dockerfile

- Required: ❌
- Description: `Docker image file`
- Default: `.`

## Example usage

```yaml
on: [push]

jobs:
  deploy_to_server:
    runs-on: ubuntu-latest
    name: Deploy image into server
    steps:
        - name: Checkout code
        uses: actions/checkout@v2.3.1
        - name: Build & Upload image
        uses: mrwan200/docker-auto-import@v0.1
        with:
            url: 'https://example.com/v1.4x'
```

## LICENSE
[MIT](./LICENSE)

![อีกล่ะ](https://media.tenor.com/JJB8yFUt35YAAAAd/nahida-nahida-genshin.gif)
