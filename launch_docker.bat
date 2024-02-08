docker build -t back-chat -f ./express/Dockerfile ./express

docker build -t front-chat -f ./miage-chat/Dockerfile ./miage-chat

docker compose -f ./docker-compose.yml up