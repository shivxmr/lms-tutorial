FROM node:18

WORKDIR /app

COPY package.json /app/
RUN npm install

COPY ./ /app/

RUN npx prisma generate

EXPOSE 3000

RUN npm run build

CMD ["sh", "-c", "npx prisma db push  && node ./scripts/seed.ts && npm run dev"]