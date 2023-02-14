#! /bin/bash

# bash script to run both the front end and back end servers
# run the back end server
cd server
npm install
nodemon index.js &
cd ..


# run the front end server
cd client
npm install
npm start -y&
cd ..



# run the database
mongod --dbpath ./data/db &

# run the tests
cd backend
npm test

# run the linter
npm run lint

# run the coverage
npm run coverage

# run the coverage report
npm run coverage-report



