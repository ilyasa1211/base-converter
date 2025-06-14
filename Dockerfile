FROM node:24-alpine

RUN corepack enable pnpm && \
  corepack prepare pnpm@latest --activate && \
  yes | pnpm -v

USER node

WORKDIR /app

RUN --mount=source=package.json,target=package.json \
  --mount=source=pnpm-lock.yaml,target=pnpm-lock.yaml \
  pnpm i

COPY . .

# Build output should be at /app/dist
RUN npm run build
