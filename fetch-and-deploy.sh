#!/bin/sh
# fetch-and-deploy.sh

# éteint les containers dockers qui tournent
docker compose -f compose.yaml --env-file .env down && \

    # Pull les nouvelles images
    docker compose -f compose.yaml --env-file .env pull && \

    # Monte les containers avec les nouvelles images
    docker compose -f compose.yaml --env-file .env up -d --build;