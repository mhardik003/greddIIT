FROM node:16

# Install Dependencies
COPY package*.json ./

RUN npm install --silent

# Copy app source code
COPY . .

EXPOSE 3000
# Exports

CMD ["npm","start"]