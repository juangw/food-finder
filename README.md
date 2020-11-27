# food-finder
This repository contains the frontend written in React and Typescript and the backend written in Typescript for a web application written in Typescript to find food and recipes. This utilizes a free API: https://spoonacular.com/food-api/docs, which provides data for ingredients, recipes, products, and drinks.


## How to start backend locally
Use docker-compose commands to build, run, and exec into backend
```bash
docker-compose build
docker-compose up -d
docker-compose exec food-finder-backend-app bash
docker-compose down
```

Once inside the container you can start the back end of the service by running:
```bash
API_KEY=<API Key From Spoonacular> ts-node app.ts
```

The backend end should then be accessible on port 8080:
```bash
curl http://localhost:8080/healthcheck
```

You can view the swagger spec for all endpoint by navigating to http://localhost:8080/api-docs/


## How to start frontend locally
Use docker-compose commands to build, run, and exec into frontend
```bash
docker-compose build
docker-compose up -d
docker-compose exec food-finder-frontend-app bash
docker-compose down
```

Once inside the container you can start the react UI of the service by running:
```bash
yarn run start
```

## How to lint
You can navigate to either of the `frontend` or `backend` directories and run
this command:
```
yarn run lint
```
