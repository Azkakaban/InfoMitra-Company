FROM node:20

WORKDIR /app

RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 5000

CMD sh -c "until nc -z $DB_HOST $DB_PORT; do echo 'Menunggu database...'; sleep 2; done && npm start"
