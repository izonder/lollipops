[Lollipops]: https://github.com/izonder/lollipops

# Lollipops

[![Known Vulnerabilities](https://snyk.io/test/github/izonder/lollipops/badge.svg?targetFile=package.json)](https://snyk.io/test/github/izonder/lollipops?targetFile=package.json)

![Lollipops](https://user-images.githubusercontent.com/1416966/33080340-244c809c-ced8-11e7-872c-9c11fb4976d5.png)

[Lollipops] - easy and clear React/Redux/Docker boilerplate:
* react
* redux
* sass/scss
* redux-saga (optional)
* WDS/HMR/react-hot-loader
* Docker

## Pre-requisites

* Node.js: v8.9.4+
* Yarn: v1.3.0+
* Docker: v1.12.3+

1) Install `build-essential` and `git` packages:

```
sudo apt-get install -y build-essential git
```

2) Install Node.js 8.9.4+:

```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```
3) Install Yarn 1.3.0+:

```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update
sudo apt-get install yarn
```
4) Install Docker to production host if it doesn't exist, e.g. via `https://get.docker.com`:

```
curl -fsSL get.docker.com | sudo sh -
```
or analogue from [Rancher](https://rancher.com/docs/rancher/v1.6/en/hosts/) with specifying the certain version:

```
curl https://releases.rancher.com/install-docker/17.03.sh | sh
```
5) Clone git repo:

```
git clone git@github.com:izonder/lollipops.git ./lollipops
cd ./lollipops
```

## Development

**Tip!** In old versions of WebStorm mark `/src` directory as resource root for better resolving.

1) Install dependencies and run watcher 

```
yarn start
# or with redux-dev-tool
yarn start:dev
```

The application will be exposed at `9000` port, just open in browser URL `http://localhost:9000`
 
**Note!** Make sure the port is free and the compilation is finished

## Production

### Build

1) Build package (IMPORTANT! make sure you've changed package tag namespace `change-your-namespace/` to your own in the command, read more: https://github.com/izonder/dimbu/blob/master/README.md)

```
yarn docker
```

**Note!** This creates a Docker image `lollipops`. To build project without packing to Docker image use command `yarn build`.

### Roll-out

1) Upload Docker image `lollipops` to production (e.g. via Docker registry)

2) Run Docker container:
```
sudo docker run -d --restart=unless-stopped -p 80:80 lollipops sh
```

**Note!** Make sure port `80` is free
