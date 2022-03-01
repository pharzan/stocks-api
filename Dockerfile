FROM node:14.17.5-alpine
WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build

RUN date > build_time.txt

CMD PORT=3000 NODE_ENV=production node build/app.js

EXPOSE 3000