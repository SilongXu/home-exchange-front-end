FROM 172.16.1.99/frontend/tdc-ui/build/ci-base-10.16

ARG APP_DIR="/usr/src/app"

# ENV NPM_CONFIG_LOGLEVEL warn

COPY package.json .npmrc $APP_DIR/

RUN set -xe \
    && (cd $APP_DIR; npm i) \
    && (npm cache clean --force)

WORKDIR $APP_DIR
