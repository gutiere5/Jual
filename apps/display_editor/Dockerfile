FROM node:24-alpine AS base

# 1. Prune
FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install turbo --global
COPY . .
RUN turbo prune --scope=display-editor --docker

# 2. Install
FROM base AS installer
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm ci

# 3. Build 
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

ARG VITE_BACKEND_API_URL=/api
ARG VITE_BACKEND_API_TIMEOUT=5000
ENV VITE_BACKEND_API_URL=$VITE_BACKEND_API_URL
ENV VITE_BACKEND_API_TIMEOUT=$VITE_BACKEND_API_TIMEOUT

RUN npx turbo run build --filter=display-editor...

# 4. Serve with a lightweight Node static server on port 3002
FROM node:24-alpine AS runner
WORKDIR /app
COPY --from=installer /app/apps/display_editor/dist ./dist
# Install a small static server and run on port 3002
RUN npm install -g serve@14.2.0
EXPOSE 3002
CMD ["serve", "-s", "dist", "-l", "3002"]
