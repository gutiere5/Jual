FROM node:24-alpine AS base

# 1. Prune
FROM base AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install turbo --global
COPY . .
RUN turbo prune --scope=dashboard --docker

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
RUN npx turbo run build --filter=dashboard...

# 4. Serve with a lightweight Node static server on port 3001
FROM node:24-alpine AS runner
WORKDIR /app
COPY --from=installer /app/apps/dashboard/dist ./dist
# Install a small static server and run on port 3001
RUN npm install -g serve@14.2.0
EXPOSE 3001
CMD ["serve", "-s", "dist", "-l", "3001"]