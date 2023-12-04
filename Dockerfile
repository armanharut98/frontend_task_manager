FROM node:alpine

WORKDIR /app

COPY ./ ./ 

COPY package.json ./
COPY package-lock.json ./

RUN env

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
