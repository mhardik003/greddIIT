#Frontend
FROM node:16 as frontend-stage
WORKDIR /usr/src
COPY frontend ./frontend
RUN cd frontend && npm install && npm run build
RUN ls


#Backend
FROM node:16 as backend-stage
WORKDIR /usr/src
COPY backend ./backend
RUN cd backend && npm install 


#Packaging the app
FROM node:16
WORKDIR /root/
COPY --from=frontend-stage /usr/src/frontend/build ./frontend/build
COPY --from=backend-stage /usr/src/backend/ .
RUN ls

EXPOSE 3001

# CMD ["node", "api.bundle.js"]
# CMD ["npm", "start"]

#need to make a command to run both the files at the same time

