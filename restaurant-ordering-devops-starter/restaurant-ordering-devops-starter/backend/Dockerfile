FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm install || true
COPY . .
EXPOSE 8080
CMD ["npm","start"]
