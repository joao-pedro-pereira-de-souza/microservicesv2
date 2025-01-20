# Etapa base com Node.js e pacotes do sistema
ARG NODE_VERSION=20.16.0
FROM node:${NODE_VERSION}-bullseye as base

WORKDIR /usr/src/app

# Instalação de pacotes necessários
RUN apt-get update && apt-get install -y --no-install-recommends \
    libreoffice \
    openjdk-11-jre \
    fontconfig \
    fonts-dejavu \
    fonts-liberation \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Instalar manualmente as fontes da Microsoft (opcional, se necessário)
RUN mkdir -p /usr/share/fonts/truetype/msttcorefonts && \
    curl -L -o /usr/share/fonts/truetype/msttcorefonts/arial.ttf https://github.com/DonGillardo/fonts/raw/main/arial.ttf && \
    curl -L -o /usr/share/fonts/truetype/msttcorefonts/times.ttf https://github.com/DonGillardo/fonts/raw/main/times.ttf && \
    fc-cache -f -v

# Etapa de dependências
FROM base as deps

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Etapa de build
FROM deps as build

COPY . .

RUN npm install
RUN npm run build

# Etapa final
FROM base as final

RUN mkdir -p /usr/src/temp && chown -R node:node /usr/src
RUN mkdir -p /app/temp && chmod -R 777 /app/temp
ENV NODE_ENV production

USER node

COPY package.json .
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3366

CMD npm run start:production
