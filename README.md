# food-finder
This repository contains the frontend written in React and Typescript and the backend written in Typescript for a web application written in Typescript to find food and recipes. This utilizes a free API: https://spoonacular.com/food-api/docs, which provides data for ingredients, recipes, products, and drinks.

## How to start application locally
Use docker-compose commands to build, run, and exec into
```bash
docker-compose build
docker-compose up -d
docker-compose exec food-finder-app bash
docker-compose down
```

Once inside the container you can start the back end of the service by running:
```bash
API_KEY=<API Key From Spoonacular> ts-node backend/app.ts
```
The backend end will be accessible on port 8080:
```bash
curl http://localhost:8080/healthcheck
```

## How to lint
```
npm run lint
```
