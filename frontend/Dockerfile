# pull official base image
FROM node:18

RUN mkdir /frontend

COPY package.json /frontend
COPY package-lock.json /frontend

COPY . /frontend
WORKDIR /frontend

RUN npm install

RUN npm run build