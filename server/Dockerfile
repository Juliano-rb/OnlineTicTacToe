FROM node:alpine

WORKDIR .

ARG NODE_ENV=unknown

ENV NODE_ENV=$ENVIRONMENT

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 8000

CMD [ "yarn", "start" ]