ARG NODE_VERSION=20.16.0

# Etapa 1: Construção
FROM node:${NODE_VERSION}-alpine as builder

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Constrói o projeto
RUN npm run build

# Etapa 2: Produção
FROM node:${NODE_VERSION}-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos necessários da etapa de construção
COPY --from=builder /app ./

# Exponha a porta para o servidor Next.js
EXPOSE 8080

# Comando para rodar a aplicação
CMD ["npm", "start"]
