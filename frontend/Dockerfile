FROM node:22-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN chmod +x ./node_modules/.bin/vite
RUN npm run build


FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
