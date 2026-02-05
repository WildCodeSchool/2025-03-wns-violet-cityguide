.PHONY: dev clean

clean: #nettoie tous les volumes, container + images (images pas utilisées)
	docker system prune -af --volumes

remove-all: #stoppe tous les containers
	docker stop $(docker ps -a -q)

prune-image: #nettoie juste les images pas utilisées, pour un petit clean rapide
	docker image prune -f

dev: #lance le build de dev docker (--build sert à forcer Docker a reconstruire au lieu d'utiliser le cache)
	docker compose -f compose.dev.yaml --env-file .env.dev up -d --build

test-dev: #lance le build de test de dev  => /!\ pas de volumes ni de gateway dans le build de test ! 
	docker compose -f compose.test.dev.yaml --env-file .env.dev up -d --build

test-prod: #lance le build de test de prod => /!\ pas de volumes ni de gateway dans le build de test ! 
	docker compose -f compose.test.prod.yaml --env-file .env.prod up -d --build

stop-dev: #stop dev containers
	docker compose -f compose.dev.yaml down -v

stop-test-dev: #stop test dev containers
	docker compose -f compose.test.dev.yaml down -v

stop-test-prod: #stop test prod containers
	docker compose -f compose.test.prod.yaml down -v

stop-all: #stop all containers (regardless of compose file)
	docker stop $$(docker ps -q) 2>/dev/null || true

logs: #affiche les logs de tous les services 
	docker compose logs -f

status: #affiche les status de tous les services 
	docker compose ps --services --filter "status=running"

restart: #restart  les containers 
	docker compose restart 

shell-backend-dev: #permet d"écouter et lancer des commandes dans le services de backend dev + lire les logs [debug]
	docker exec -it backend-dev sh

shell-frontend-dev: #permet d"écouter et lancer des commandes dans le services de frontend dev + lire les logs [debug]
	docker exec -it frontend-dev sh

shell-db-dev: #permet d"écouter et lancer des commandes dans le services de la db dev + lire les logs [debug]
	docker exec -it database sh

shell-backend-prod: #permet d"écouter et lancer des commandes dans le services de backend prod + lire les logs [debug]
	docker exec -it backend-dev sh

shell-frontend-prod: #permet d"écouter et lancer des commandes dans le services de frontend prod + lire les logs [debug]
	docker exec -it frontend-dev sh

shell-db-prod: #permet d"écouter et lancer des commandes dans le services de db prod + lire les logs [debug]
	docker exec -it database sh

