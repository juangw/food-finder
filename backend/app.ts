import { Request, Response } from "express";
import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import bodyParser from "body-parser";

import logger from "./utils/logger";
import configManager from "./config/configManager";
import recipeRouter from "./routes/recipe";
import healthcheckRouter from "./routes/healthcheck";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import authenticateJWT from "./utils/jwtAuthentication";

const app = express();
const port = configManager.get("PORT", "8080");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Food Finder Express API with Swagger",
            version: "0.1.0",
            description:
                "This is an API application made with Express and documented with Swagger to find recipes",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "William Juang",
                email: "juangw@umich.edu",
            },
        },
        servers: [
            {
                url: "http://localhost:8080",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: ["models/schemas/*", "routes/*"],
};

app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => res.send("Hello World!"));
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/healthcheck", authenticateJWT, healthcheckRouter);
app.use("/recipe", authenticateJWT, recipeRouter);

const specs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
);

const test = configManager.get("test");
logger.info("empty" || test);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
