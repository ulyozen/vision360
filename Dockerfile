FROM node:20 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build --prod

FROM node:20-alpine AS runtime
WORKDIR /app
COPY --from=builder /app/dist/quiz/browser /app/dist
RUN npm install -g http-server
EXPOSE 3000
CMD ["http-server", "/app/dist", "-p", "3000", "--index", "index.html"]
