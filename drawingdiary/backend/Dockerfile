FROM node:15.11.0-alpine

RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json /app/package.json

RUN npm install --no-cache
#RUN apk add --no-cache git

COPY . /app
CMD ["npm", "run", "server"]