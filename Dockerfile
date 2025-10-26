FROM node:22-alpine

WORKDIR /app

RUN npm i -D

COPY . .

CMD ["tail", "-f", "/dev/null"]