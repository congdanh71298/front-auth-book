up_build_front: stop_front
	@echo "docker-compose up -d --no-recreate --build front"
	@docker-compose up -d --no-recreate --build front

stop_front:
	@echo "docker-compose stop front"
	@docker-compose stop front

up_build_auth: stop_auth
	@echo "docker-compose up -d --no-recreate --build auth"
	@docker-compose up -d --no-recreate --build auth

stop_auth:
	@echo "docker-compose stop auth"
	@docker-compose stop auth

up_build_books: stop_books
	@echo "docker-compose up -d --no-recreate --build books"
	@docker-compose up -d --no-recreate --build books

stop_books:
	@echo "docker-compose stop books"
	@docker-compose stop books

up: down
	@echo "docker-compose up -d"
	@docker-compose up -d

up_build: down
	@echo "docker-compose up -d --build"
	@docker-compose up -d --build

down:
	@echo "docker-compose down"
	@docker-compose down