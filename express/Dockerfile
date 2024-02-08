# Use an official Node runtime as a parent image
FROM node:19-alpine

# Set the working directory to /app
COPY src/ /back-chat/src
COPY *.json /back-chat/

WORKDIR /back-chat

RUN npm ci

ENV DB_URL="postgres:5432"
ENV PORT=8080

EXPOSE 8080
# Run the command to start the server
CMD ["npm", "start"]
