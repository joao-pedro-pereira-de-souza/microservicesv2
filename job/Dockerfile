ARG NODE_VERSION=20.16.0

FROM node:${NODE_VERSION}-alpine as base

WORKDIR /usr/src/app

RUN apk add --no-cache libreoffice libreoffice-common openjdk11

FROM base as deps

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

FROM deps as build

COPY . .

RUN npm install
RUN npm run build

FROM base as final

RUN mkdir -p /usr/src/temp && chown -R node:node /usr/src

ENV NODE_ENV production

USER node

COPY package.json .
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3366

CMD npm run start:production
