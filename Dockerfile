FROM node:16
WORKDIR /app    
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3008
CMD ["npm" , "start"]