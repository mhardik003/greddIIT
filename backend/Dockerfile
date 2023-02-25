FROM node:16-alpine
WORKDIR /backend
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
EXPOSE 3001
CMD ["npm", "run", "start"]