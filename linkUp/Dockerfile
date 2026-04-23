FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
# Importante o --host para o Vite aceitar conexões do Docker
CMD ["npm", "run", "dev", "--", "--host"]