FROM node:24-bookworm

RUN corepack enable pnpm && \
  corepack prepare pnpm@latest --activate && \
  yes | pnpm -v

USER node

WORKDIR /workspaces/base-converter

