FROM node:7.10

MAINTAINER Andrey Makarov <vivalaakam@gmail.com>

ENV INSTALL_PATH /app

ARG PROXY_SERVER
ARG NODE_ENV
ARG VAPID_PUBLIC_KEY

ENV PROXY_SERVER ${PROXY_SERVER}
ENV NODE_ENV ${NODE_ENV}
ENV VAPID_PUBLIC_KEY ${VAPID_PUBLIC_KEY}

RUN mkdir -p $INSTALL_PATH

WORKDIR $INSTALL_PATH

COPY . .

RUN yarn

RUN npm rebuild node-sass

RUN NODE_ENV=production node --max_old_space_size=2048 node_modules/.bin/webpack  --verbose --colors --display-error-details  --optimize-minimize --config ./config/prod.config.js

VOLUME ["$INSTALL_PATH/public"]

EXPOSE 3000

ENTRYPOINT ["npm", "run"]
CMD ["npm", "start"]
