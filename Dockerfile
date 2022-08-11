FROM node:16-alpine AS dev
RUN npm install -g npm npm-upgrade

WORKDIR /var/app

COPY ./ .
RUN npm i

RUN npm run build

CMD npm run dev

# production
FROM dev AS production

ENV NODE_ENV=production
CMD npm run start
