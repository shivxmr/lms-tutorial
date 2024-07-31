FROM node:18-alpine

RUN mkdir /app
WORKDIR /app

RUN npm install prisma --save-dev

RUN npm init -y

COPY ./schema.prisma /app/schema.prisma

CMD [ "npx", "prisma", "studio" ]
