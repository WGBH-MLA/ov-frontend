# Development
FROM node AS dev
WORKDIR /app
ENV PATH="${PATH}:/app/node_modules/.bin"

RUN npm install -g npm npm-upgrade
RUN npm i


CMD npm run dev

# Production
FROM node:alpine AS production
ENV PATH="${PATH}:/app/node_modules/.bin"
ENV NODE_ENV=production

COPY ./ .
RUN npm i
RUN npm run build


CMD npm run start
