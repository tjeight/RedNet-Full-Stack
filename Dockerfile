# # # Dependencies
# # FROM node:18-alpine AS deps
# # WORKDIR /app
# # COPY package.json pnpm-lock.yaml ./
# # RUN npm install -g pnpm && pnpm install --frozen-lockfile --prod

# # # Builder
# # FROM node:18-alpine AS builder
# # WORKDIR /app
# # COPY --from=deps /app/node_modules ./node_modules
# # COPY . .
# # RUN npm install -g pnpm && pnpm build

# # # Runner – super small (~80 MB) and 100% working
# # FROM node:18-alpine AS runner
# # WORKDIR /app

# # ENV NODE_ENV=production
# # ENV NEXT_TELEMETRY_DISABLED=1

# # COPY --from=builder /app/public ./public
# # COPY --from=builder /app/.next/standalone ./
# # COPY --from=builder /app/.next/static ./.next/static

# # EXPOSE 3000

# # CMD ["node", "server.js"]



# FROM node:18-alpine AS base
# WORKDIR /app
# COPY package.json pnpm-lock.yaml ./
# RUN npm install -g pnpm && pnpm install --frozen-lockfile

# FROM base AS builder
# COPY . .
# RUN pnpm build

# # Production runner (tiny & bulletproof)
# FROM node:18-alpine AS runner
# WORKDIR /app
# ENV NODE_ENV=production
# ENV NEXT_TELEMETRY_DISABLED=1

# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static

# EXPOSE 3000
# CMD ["node", "server.js"]


FROM nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085/library/node:18-alpine AS base
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

FROM nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085/library/node:18-alpine AS builder
COPY --from=base /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM nexus-service-for-docker-hosted-registry.nexus.svc.cluster.local:8085/library/node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]