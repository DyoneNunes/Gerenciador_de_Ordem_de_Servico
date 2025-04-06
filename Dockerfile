
# Usar uma imagem base do Node.js
FROM node:16

# Definir o diretório de trabalho
WORKDIR /app

# Copiar o package.json e o package-lock.json (se existir)
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar todos os arquivos do projeto
COPY . .

# Construir a aplicação
RUN npm run build

# Expor a porta onde o app vai rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]
