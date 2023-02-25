FROM node:alpine
WORKDIR /frontend
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i --legacy-peer-deps
EXPOSE 3001
CMD ["npm", "run", "start"]