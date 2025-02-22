FROM node:18-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

FROM node:18-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/index.js ./

EXPOSE 3001

CMD ["node", "index.js"]