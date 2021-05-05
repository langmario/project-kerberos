FROM node:alpine as builder

WORKDIR /home/node/app

COPY package.json ./

RUN yarn

COPY . .

CMD [ "yarn", "start" ]
