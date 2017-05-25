FROM node:7.10

MAINTAINER Andrey Makarov <vivalaakam@gmail.com>

ENV INSTALL_PATH /app

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
