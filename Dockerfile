FROM node:20-alpine AS base
WORKDIR /app

FROM base AS dev
COPY . .
RUN npm ci

FROM dev AS build
ENV NODE_ENV=production

RUN npm run build

FROM base AS prod

COPY --chown=node:node --from=build /app/.next/standalone ./
COPY --chown=node:node --from=build /app/.next/static ./.next/static
COPY --chown=node:node --from=build /app/public ./public

USER node

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
EXPOSE 3000

CMD ["node", "server.js"]