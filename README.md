[![Build Status](https://travis-ci.org/telemark/tfk-search-index-portalen-info.svg?branch=master)](https://travis-ci.org/telemark/tfk-search-index-portalen-info)
[![Coverage Status](https://coveralls.io/repos/telemark/tfk-search-index-portalen-info/badge.svg?branch=master&service=github)](https://coveralls.io/github/telemark/tfk-search-index-portalen-info?branch=master)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
# tfk-search-index-ansatte
Indekserer innhold fra portalens infosider

## Docker
To run this module as a service use the docker image.

Change the ENV parts of the [Dockerfile](Dockerfile) or use [docker.env](docker.env)

Build
```sh
$ docker build -t tfk-search-index-portalen-info .
```

or use the prebuilt image from [hub.docker.com](https://hub.docker.com/r/telemark/tfk-search-index-portalen-info)

```sh
$ docker pull telemark/tfk-search-index-portalen-info
```

Run a container

```sh
$ docker run --rm tfk-search-index-portalen-info
```

or

```sh
$ docker run --env-file=docker.env --rm tfk-search-index-portalen-info
```

This will spin up a container. Do the job. Shut it down and remove it.
