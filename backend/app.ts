import { Request, Response } from "express";
import express from "express";

import logger from "./utils/logger";
import configManager from "./config/configManager";
import recipeRouter from "./routes/recipe";
import healthcheckRouter from "./routes/healtcheck";

const app = express();
const port = configManager.get("PORT", "8080");

app.get("/", (req: Request, res: Response) => res.send("Hello World!"));
app.use("/healthcheck", healthcheckRouter);
app.use("/recipe", recipeRouter);

const test = configManager.get("test");
logger.info("empty" || test);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
