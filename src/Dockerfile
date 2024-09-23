FROM node:14.17.0-alpine3.12

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . ./

EXPOSE 8443

CMD ["npm", "run", "dev"]
