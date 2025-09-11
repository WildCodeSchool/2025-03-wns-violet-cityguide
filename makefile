.PHONY: dev clean

dev:
	docker compose up -d --build

clean:
	docker system prune -af --volumes

stop:
	docker compose down -v

prod: 
	docker compose -f compose.prod.yaml --env-file .env.prod up -d --build
