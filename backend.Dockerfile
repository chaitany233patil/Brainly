FROM node:22-alpine

WORKDIR /app

COPY backend/package*.json ./

RUN npm install

COPY ./backend .

RUN npm run build

EXPOSE 8080

CMD ["node", "dist/index.js"]