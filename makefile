.PHONY: dev clean

dev:
	docker compose -f compose.dev.yaml --env-file .env.dev up -d --build

clean:
	docker system prune -af --volumes

stop:
	docker compose down -v

prod: 
	docker compose -f compose.prod.yaml --env-file .env.prod up -d --build
