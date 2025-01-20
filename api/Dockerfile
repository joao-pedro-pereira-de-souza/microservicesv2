# Etapa base
ARG NODE_VERSION=20.16.0
FROM node:${NODE_VERSION}-alpine as base

# Configuração básica do container
WORKDIR /usr/src/app

# Verificar e criar grupo/usuário apenas se não existir
RUN if ! getent group appgroup >/dev/null; then addgroup -g 1001 appgroup; fi && \
    if ! id -u node >/dev/null 2>&1; then adduser -u 1001 -G appgroup -s /bin/sh -D node; fi

# Conceder permissões para o diretório de trabalho
RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app

# Etapa de dependências
FROM base as deps

# Copiar arquivos de dependências
COPY package.json package-lock.json ./

# Instalar dependências
RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

# Conceder permissões para o node_modules
RUN chown -R node:node /usr/src/app/node_modules

# Etapa de build
FROM deps as build

# Copiar todos os arquivos do projeto
COPY . .

# Gerar os artefatos do Prisma
RUN npx prisma generate

# Migrar o banco de dados para o diretório final dentro de dist
RUN DATABASE_URL="file:/usr/src/app/dist/prisma/dev.db" npx prisma migrate deploy

# Instalar dependências de produção e construir o projeto
RUN npm install
RUN npm run build

# Garantir que a pasta 'dist/prisma' exista e copiar o banco de dados para lá
RUN mkdir -p /usr/src/app/dist/prisma && \
    cp prisma/dev.db /usr/src/app/dist/prisma/dev.db

# Conceder permissões para os artefatos gerados
RUN chown -R node:node /usr/src/app

# Etapa final
FROM base as final

# Definir o ambiente como produção
ENV NODE_ENV=production
ENV PRISMA_LOG_LEVEL=info

# Definir o usuário para execução
USER node

# Copiar os arquivos necessários para o container final
COPY package.json .
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/prisma ./prisma

# Garantir que os diretórios necessários existam e estejam acessíveis
RUN mkdir -p /usr/src/app/dist/prisma && chown -R node:node /usr/src/app/dist/prisma

# Expor a porta da aplicação
EXPOSE 3366

# Comando de inicialização com verificação e logs
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:production"]
