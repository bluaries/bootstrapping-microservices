# Sets the base image for our new image. 
# This allows us to produce new images based on existing images.
FROM node:12.18.1-alpine

# The directory in our image.
WORKDIR /usr/src/app

COPY package*.json ./

# Installs only the production dependencies
RUN npm install --only=production

# Copies the source code for our microservices
COPY ./src ./src

# Copies our sample video
COPY ./videos ./videos

CMD npm start