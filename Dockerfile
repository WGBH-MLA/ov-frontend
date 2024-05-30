# Development
FROM node AS dev
WORKDIR /app
ENV PATH="${PATH}:/app/node_modules/.bin"
RUN npm install -g npm npm-upgrade

COPY package*.json .
RUN npm i

CMD npm run dev

# Production
FROM node:alpine AS production
ENV PATH="${PATH}:/app/node_modules/.bin"

COPY ./ .
RUN npm i
RUN npm run build

ENV NODE_ENV=production
CMD npm run start
