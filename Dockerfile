FROM node:16-alpine

WORKDIR /var/app
COPY ./package.json ./
RUN npm install
COPY ./ .
RUN npm run

CMD ["npm", "run" ,"start"]
