FROM node:16-alpine AS dev
RUN npm install -g npm npm-upgrade

WORKDIR /var/app

CMD npm run start

# production
FROM dev AS production

COPY ./package.json .
RUN npm i

COPY ./ .
ENV NODE_ENV=production

RUN npm run build
