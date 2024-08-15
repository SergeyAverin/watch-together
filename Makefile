# Run dev docker compose file
up:
	sudo docker-compose -f docker-compose.dev.yaml up

# Run shell form dev backend docker container
backshell:
	sudo docker exec -it webapp_backend /bin/bash

# Run shell form dev frontend docker container
frontshell:
	sudo docker exec -it webapp_frontend /bin/bash

# Run test docker compose file
test:
	sudo docker-compose -f docker-compose.test.yaml up
