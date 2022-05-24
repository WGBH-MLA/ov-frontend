FROM node:16-alpine
RUN npm install -g npm npm-upgrade

WORKDIR /var/app

CMD ["npm", "run" ,"start"]
