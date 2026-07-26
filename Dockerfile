# syntax=docker/dockerfile:1

# Dev-only (see ROADMAP.md's Docker open question — both apps deploy as
# static builds, nothing here is meant to run in production). One file
# with named stages, not one Dockerfile per app: Docker's build cache is
# scoped per file, so two separate Dockerfiles could never actually share
# the install layer no matter how identical their early steps looked —
# only stages within the same file can.
FROM node:24-alpine AS base
WORKDIR /app
RUN corepack enable
# The base image bundles npm, which we never use (this project is pnpm-only)
# — its own dependency tree (tar, undici, brace-expansion) has known DoS
# CVEs upstream in this image as of this writing (1 critical, 4 high; see
# `git log` on this file for the scan that found them). Removing it here
# eliminates that surface entirely rather than accepting or waiting on it.
RUN rm -rf /usr/local/lib/node_modules/npm \
  /usr/local/bin/npm /usr/local/bin/npx \
  /usr/local/share/man/man1/npm* /usr/local/share/man/man5/npm* /usr/local/share/man/man7/npm*

# Manifests only, so a source-only change never invalidates this layer.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/portfolio/package.json ./apps/portfolio/package.json
COPY apps/blog/package.json ./apps/blog/package.json
COPY packages/config-typescript/package.json ./packages/config-typescript/package.json
COPY packages/config-eslint/package.json ./packages/config-eslint/package.json
COPY packages/config-tailwind/package.json ./packages/config-tailwind/package.json

RUN pnpm install --frozen-lockfile

COPY . .

FROM base AS portfolio-dev
EXPOSE 5173
# No "--" before --host: confirmed empirically that pnpm forwards a literal
# "--" into the script's argv rather than stripping it, and Vite's CLI (cac)
# then treats everything after that first "--" as raw/unparsed positional
# args — so --host silently never took effect with it present. The
# earlier version of this Dockerfile (see git log) had the "--" and
# started a server unreachable from the host despite the port mapping.
CMD ["pnpm", "--filter", "portfolio", "dev", "--host"]

FROM base AS blog-dev
EXPOSE 5173
CMD ["pnpm", "--filter", "blog", "dev", "--host"]
