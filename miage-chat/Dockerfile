# Use an official Node runtime as a parent image
FROM node:19-alpine

COPY src/ /front-chat/src
COPY *.json /front-chat/


WORKDIR /front-chat

RUN npm ci

ENV BACK_URL="localhost:8080"

EXPOSE 3000
# Run the command to start the server
CMD ["npm", "start"]
