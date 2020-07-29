# food-finder
Web application written in typescript to find food and recipes

## How to start application locally
Use docker-compose commands to build, run, and exec into
```bash
docker-compose build
docker-compose up -d
docker-compose exec food-finder-app bash
docker-compose down
```

Once inside the container run, and the website will be at the address `localhost:8080`:
```bash
node index.js
```

## How to lint
```
npm run lint
```
