FROM node:24-alpine AS base

WORKDIR /app

# Prepare
FROM base AS prepare
RUN apk add --no-cache libc6-compat
RUN npm install turbo --global
COPY . .
RUN turbo prune dashboard --docker

# Builder
FROM base AS builder
# First install the dependencies (as they change less often)
COPY --from=prepare /app/out/json/ .
RUN npm install
# Build the project
COPY --from=prepare /app/out/full/ .

# BUILD TIME ARGS
ENV VITE_BACKEND_API_URL=/api
ENV VITE_BACKEND_API_TIMEOUT=5000
ENV VITE_CANVAS_EDITOR_URL=https://editor.jualinbox.com
ENV VITE_CANVAS_DISPLAY_URL=https://display.jualinbox.com

RUN npx turbo run build --filter=dashboard...

# --
FROM nginx:stable-alpine AS production
COPY --from=builder /app/apps/dashboard/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# docker build -f apps/dashboard/Dockerfile -t jual-dashboard .