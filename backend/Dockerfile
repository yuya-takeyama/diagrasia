FROM node:14.7.0-alpine3.10

WORKDIR /app

COPY . /app

RUN yarn && \
  yarn build && \
  yarn install --prod --frozen-lockfile

CMD ["node", "lib/main.js"]
