###########################################################
#
# Dockerfile for tfk-search-index-ansatte
#
###########################################################

# Setting the base to nodejs 4.4.3
FROM mhart/alpine-node:4.4.3

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

# Env variables
ENV JWT_KEY "Louie Louie, oh no, I got to go"
ENV SEARCH_SERVICE_URL https://search.service.com/api
ENV SEARCH_SERVICE_INDEX portaleninfo
ENV SEARCH_SERVICE_INDEX_TYPE article
ENV SOURCE_URL "http://www.portalen.com/artikler.json"

# Startup
ENTRYPOINT node index.js