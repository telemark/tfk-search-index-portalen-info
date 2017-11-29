###########################################################
#
# Dockerfile for tfk-search-index-portalen-info
#
###########################################################

# Setting the base to nodejs 4.7.0
FROM mhart/alpine-node:8

# Maintainer
MAINTAINER Geir Gåsodden

#### Begin setup ####

# Installs git
RUN apk add --update git && rm -rf /var/cache/apk/*

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Startup
ENTRYPOINT node index.js
