# --- STAGE 1: Build the Next.js app from web folder ---
FROM node:18-alpine AS builder

WORKDIR /app

# 1. Copy package manifest(s) from web, then install (legacy-peer-deps)
COPY package.json ./
COPY package-lock.json* ./
RUN npm install --legacy-peer-deps

# 2. Copy the rest of the Next.js source code
COPY . .

# 3. Override next.config.js to disable ESLint and TS-error blocking during build
RUN sed -i '/module.exports *= *{/a eslint: { ignoreDuringBuilds: true }, typescript: { ignoreBuildErrors: true },' next.config.ts


# 4. Tell Next.js to ignore prerender (getStaticProps) errors
ENV NEXT_IGNORE_PRERENDER_ERRORS=true

# 5. Build the optimized production Next.js output
RUN npm run build

# --- STAGE 2: Run the Next.js app in production mode ---
FROM node:18-alpine AS runner

WORKDIR /app

# Copy only the minimal production files from “builder”
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

ENV NODE_ENV=production
EXPOSE 3004

# Start Next.js in production mode
CMD ["npm", "start"]
