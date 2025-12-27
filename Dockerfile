# # # # ---- Dependencies ----
# # # FROM docker.io/library/node:18-alpine AS base
# # # WORKDIR /app
# # # COPY package.json pnpm-lock.yaml ./
# # # RUN npm install -g pnpm && pnpm install --frozen-lockfile

# # # # ---- Builder ----
# # # FROM docker.io/library/node:18-alpine AS builder
# # # WORKDIR /app
# # # COPY --from=base /app/node_modules ./node_modules
# # # COPY . .
# # # RUN pnpm build

# # # # ---- Production Runner ----
# # # FROM docker.io/library/node:18-alpine AS runner
# # # WORKDIR /app

# # # ENV NODE_ENV=production
# # # ENV NEXT_TELEMETRY_DISABLED=1

# # # COPY --from=builder /app/public ./public
# # # COPY --from=builder /app/.next/standalone ./
# # # COPY --from=builder /app/.next/static ./.next/static

# # # EXPOSE 3000
# # # CMD ["node", "server.js"]
# # # ---- Dependencies ----
# # FROM node:18-alpine AS deps
# # WORKDIR /app
# # COPY package.json pnpm-lock.yaml ./
# # RUN npm install -g pnpm && pnpm install --frozen-lockfile

# # # ---- Builder ----
# # FROM node:18-alpine AS builder
# # WORKDIR /app

# # # Install pnpm in builder stage
# # RUN npm install -g pnpm

# # COPY --from=deps /app/node_modules ./node_modules
# # COPY . .

# # # Build the Next.js app
# # RUN pnpm build

# # # ---- Production Runner ----
# # FROM node:18-alpine AS runner
# # WORKDIR /app

# # ENV NODE_ENV=production
# # ENV NEXT_TELEMETRY_DISABLED=1

# # RUN addgroup --system --gid 1001 nodejs && \
# #     adduser --system --uid 1001 nextjs

# # # Copy necessary files
# # COPY --from=builder /app/public ./public
# # COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
# # COPY --from=builder /app/node_modules ./node_modules
# # COPY --from=builder /app/package.json ./package.json

# # USER nextjs

# # EXPOSE 3000

# # CMD ["npm", "start"]


# # ----------------------------------------
# # Stage 1: Builder
# # ----------------------------------------
# FROM node:18-alpine AS builder

# WORKDIR /app

# # Enable pnpm via corepack (modern, clean)
# RUN corepack enable

# # Copy only dependency manifests first (cache optimization)
# COPY package.json pnpm-lock.yaml ./

# # Deterministic install
# RUN pnpm install --frozen-lockfile

# # Bring in the rest of the universe
# COPY . .

# # Build-time public envs only
# ARG NEXT_PUBLIC_SUPABASE_URL
# ARG NEXT_PUBLIC_SUPABASE_ANON_KEY

# ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
# ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY

# # Forge the Next.js build
# RUN pnpm build

# # ----------------------------------------
# # Stage 2: Runner
# # ----------------------------------------
# FROM node:18-alpine AS runner

# WORKDIR /app

# ENV NODE_ENV=production

# # Enable pnpm again (runtime needs it)
# RUN corepack enable

# # Copy only what is needed to run
# COPY --from=builder /app/package.json ./
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/next.config.* ./

# EXPOSE 3000

# # Final heartbeat
# CMD ["pnpm", "start"]

# # # # ---- Dependencies ----
# # # FROM docker.io/library/node:18-alpine AS base
# # # WORKDIR /app
# # # COPY package.json pnpm-lock.yaml ./
# # # RUN npm install -g pnpm && pnpm install --frozen-lockfile

# # # # ---- Builder ----
# # # FROM docker.io/library/node:18-alpine AS builder
# # # WORKDIR /app
# # # COPY --from=base /app/node_modules ./node_modules
# # # COPY . .
# # # RUN pnpm build

# # # # ---- Production Runner ----
# # # FROM docker.io/library/node:18-alpine AS runner
# # # WORKDIR /app

# # # ENV NODE_ENV=production
# # # ENV NEXT_TELEMETRY_DISABLED=1

# # # COPY --from=builder /app/public ./public
# # # COPY --from=builder /app/.next/standalone ./
# # # COPY --from=builder /app/.next/static ./.next/static

# # # EXPOSE 3000
# # # CMD ["node", "server.js"]
# # # ---- Dependencies ----
# # FROM node:18-alpine AS deps
# # WORKDIR /app
# # COPY package.json pnpm-lock.yaml ./
# # RUN npm install -g pnpm && pnpm install --frozen-lockfile

# # # ---- Builder ----
# # FROM node:18-alpine AS builder
# # WORKDIR /app

# # # Install pnpm in builder stage
# # RUN npm install -g pnpm

# # COPY --from=deps /app/node_modules ./node_modules
# # COPY . .

# # # Build the Next.js app
# # RUN pnpm build

# # # ---- Production Runner ----
# # FROM node:18-alpine AS runner
# # WORKDIR /app

# # ENV NODE_ENV=production
# # ENV NEXT_TELEMETRY_DISABLED=1

# # RUN addgroup --system --gid 1001 nodejs && \
# #     adduser --system --uid 1001 nextjs

# # # Copy necessary files
# # COPY --from=builder /app/public ./public
# # COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
# # COPY --from=builder /app/node_modules ./node_modules
# # COPY --from=builder /app/package.json ./package.json

# # USER nextjs

# # EXPOSE 3000

# # CMD ["npm", "start"]


# ----------------------------------------
# Stage 1: Builder
# ----------------------------------------
FROM node:18-alpine AS builder

WORKDIR /app

# Enable pnpm via corepack (modern, clean)
RUN corepack enable

# Copy only dependency manifests first (cache optimization)
COPY package.json pnpm-lock.yaml ./

# Deterministic install
RUN pnpm install --frozen-lockfile

# Bring in the rest of the universe
COPY . .

# Build-time public envs only
ENV NEXT_PUBLIC_SUPABASE_URL=https://nypverxdujpsdnyzktdm.supabase.co
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55cHZlcnhkdWpwc2RueXprdGRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2MjYyNjgsImV4cCI6MjA2NTIwMjI2OH0.0AlveeXieCvf5umY5JSvErhu96pbVPQwIKXTkIpKB-Q


# Forge the Next.js build
RUN pnpm build

# ----------------------------------------
# Stage 2: Runner
# ----------------------------------------
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Enable pnpm again (runtime needs it)
RUN corepack enable

# Copy only what is needed to run
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.* ./

EXPOSE 3000

# Final heartbeat
CMD ["pnpm", "start"]
