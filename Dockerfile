FROM node:18-alpine AS dev
RUN npm install -g npm npm-upgrade

WORKDIR /var/app

COPY package.json .
RUN npm i

CMD npm run dev

# production
FROM dev AS production

COPY ./ .
RUN npm run build

ENV NODE_ENV=production
CMD npm run start
