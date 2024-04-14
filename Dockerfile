FROM --platform=linux/amd64 node:21.5.0

USER root

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# COPY package.json /usr/src/app/

# RUN npm install --legacy-peer-deps

ADD . /usr/src/app/

RUN npm install --legacy-peer-deps

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npx prisma db push  && node ./scripts/seed.js && npm run start"]
