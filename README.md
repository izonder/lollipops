[Lollipops]: https://github.com/izonder/lollipops

# Lollipops

![Lollipops](https://user-images.githubusercontent.com/1416966/33080340-244c809c-ced8-11e7-872c-9c11fb4976d5.png)

[Lollipops] - easy and clear React/Redux/Docker boilerplate:
* react
* redux
* sass/scss
* redux-saga (optional)
* WDS/HMR/react-hot-loader
* Docker

## Pre-requisites
* Node.js: v.8.9.0+
* Yarn: v.1.3.0+

## Development

1) Install `build-essential` and `git` packages:

```
sudo apt-get install -y build-essential git
```

2) Install Node.js 8.9.0+:

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
4) Clone git repo:

```
git clone git@github.com:izonder/lollipops.git ./lollipops
cd ./lollipops
```

**Tip!** In old versions of WebStorm mark `/src` directory as resource root for better resolving.

5) Install dependencies and run watcher 

```
yarn start
# or with redux-dev-tool
yarn start:dev
```

The application will be exposed at `9000` port, just open in browser URL `http://localhost:9000`
 
**Note!** Make sure the port is free and the compilation is finished

## Production

### Build

1) Make steps 1-4 for development environment

2) Build package

```
yarn build
```

**Note!** This creates a Docker image `lollipops`

### Roll-out

1) Install Docker to production host if it doesn't exist, e.g. via `https://get.docker.com`:
```
curl -fsSL get.docker.com | sudo sh -
```

2) Upload Docker image `lollipops` to production (e.g. via Docker registry)

3) Run Docker container:
```
sudo docker run -d --restart=unless-stopped -p 80:80 lollipops sh
```

**Note!** Make sure port `80` is free
