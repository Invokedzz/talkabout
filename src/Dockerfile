FROM node
FROM mysql

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8443

CMD bash -c "npm run dev"

