FROM node:24-alpine AS base

WORKDIR /app

# Prepare
FROM base AS prepare
RUN apk add --no-cache libc6-compat
RUN npm install turbo --global
COPY . .
RUN turbo prune menu-display --docker

# Builder
FROM base AS builder
# First install the dependencies (as they change less often)
COPY --from=prepare /app/out/json/ .
RUN npm install
COPY --from=prepare /app/out/full/ .

ENV VITE_BACKEND_API_URL=/api
ENV VITE_BACKEND_API_TIMEOUT=5000
ENV VITE_DASHBOARD_URL=https://jualinbox.com

RUN npx turbo run build --filter=menu-display...

FROM nginx:stable-alpine AS production
COPY --from=builder /app/apps/menu_display/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# docker build -f apps/menu_display/Dockerfile -t jual-menu-display .
# docker run -d --name jual-display -p 3003:80 <container_id>
