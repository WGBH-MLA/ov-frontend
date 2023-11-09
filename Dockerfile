FROM node:alpine AS dev
WORKDIR /app
ENV PATH="${PATH}:/app/node_modules/.bin"

RUN npm install -g npm npm-upgrade


CMD npm run dev

# production
FROM dev AS production

COPY ./ .
RUN npm i
RUN npm run build

ENV NODE_ENV=production
CMD npm run start
