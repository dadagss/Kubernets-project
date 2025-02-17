FROM node:current-alpine3.21 AS build

WORKDIR /usr/src/app

COPY package*.json . 
COPY index.js .

RUN npm install

FROM node:current-alpine3.21

WORKDIR /usr/src/app

COPY --from=build /usr/src/app .

EXPOSE 3000

CMD ["node", "index.js"]

