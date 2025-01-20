FROM node:22-alpine

# Diretório de trabalho
WORKDIR /app

# Copiar o package.json e instalar as dependências
COPY package.json package-lock.json ./
RUN npm install

# Copiar todos os arquivos
COPY . .

# Remover qualquer build anterior (caso exista)
RUN rm -rf .next

# Gerar o build do Next.js
RUN npm run build

# Expor a porta
EXPOSE 8080

# Iniciar o servidor
CMD ["npm", "start"]
