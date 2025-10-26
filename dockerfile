FROM node:22.11

WORKDIR /app

COPY package*.json ./

RUN npm install

# COPY wait-for.sh /wait-for.sh

# RUN chmod +x /wait-for.sh

COPY . .

CMD ["tail", "-f", "/dev/null"]