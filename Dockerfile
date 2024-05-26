# Dockerfile for building a Docker image for the frontend of the application
# The frontend is a NextJs application that is served by an Nginx server

FROM node:21.7.3

WORKDIR /home/node/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

# Copy the rest of the application code to the working directory
COPY . .
COPY .env .env

RUN npm run build

# Expose the application port

EXPOSE 3000

CMD ["npm", "start"]


