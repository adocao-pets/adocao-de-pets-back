FROM node:lts

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY entrypoint.sh /app/entrypoint.sh
COPY . .

RUN npm i -g @nestjs/cli
RUN npm install

RUN chmod +x /app/entrypoint.sh

EXPOSE 3000
ENTRYPOINT [ "/app/entrypoint.sh" ]
CMD [ "npm", "run", "start:dev" ] 