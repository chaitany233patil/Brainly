FROM node:22-alpine

WORKDIR /app

COPY frontend/package*.json ./

RUN npm install

COPY ./frontend .

RUN npm run build

CMD ["npm", "start"]