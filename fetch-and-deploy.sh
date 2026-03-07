#! /bin/sh
# fetch-and-deploy.sh
echo fetch-and-deploy.sh
cd /home/wns_student/apps/dev
git pull origin develop

# éteint les containers dockers qui tournent
docker compose -f compose.yaml --env-file .env down && \

  # monte les containers avec les nouvelles images
  GATEWAY_PORT=7000 docker compose -f compose.yaml --env-file .env up -d --build;