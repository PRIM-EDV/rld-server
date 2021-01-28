FROM node:15.5.1-alpine

RUN apk update && apk add make g++ linux-headers udev python3

WORKDIR /app
ADD ./app/package.json ./

RUN npm install