# Instructions to build using docker
```
cd pyor
```
```
docker-compose up --build -d
```

# Instruction to stop and remove the docker containers
```
docker-compose down
```

## Backend API Guide
1. GET /data - Obtains the response from flipside
2. GET /ethereum-data - Returns ethereum data from coingecko
3. GET / - Test path to see if the server is running correctly