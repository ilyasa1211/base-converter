FROM node:24-alpine

USER node

WORKDIR /app

RUN --mount=source=package.json,target=package.json \
  --mount=source=package-lock.json,target=package-lock.json \
  npm ci

COPY . .

# Build output should be at /app/dist
RUN npm run build
