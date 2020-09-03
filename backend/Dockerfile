FROM node:14.9.0-alpine3.10

WORKDIR /app

COPY . /app

RUN yarn && \
  yarn build && \
  yarn install --prod --frozen-lockfile && \
  find lib -name '*.test.js' -o -name '*.test.js.map' | xargs rm

CMD ["node", "lib/server.js"]
