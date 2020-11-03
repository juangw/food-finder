import { Request, Response } from "express";
import express from "express";

import logger from "./utils/logger";
import configManager from "./config/configManager";
import router from "./routes/food";

const app = express();
const port = configManager.get("PORT", "8080");

app.get("/", (req: Request, res: Response) => res.send("Hello World!"));
app.use("/food", router);

const test = configManager.get("test");
logger.info("empty" || test);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
