import { Request, Response, NextFunction } from 'express';
import express from "express";
import configManager from "./config/configManager";

const app = express();
const port = 8080;

app.get("/", (req: Request, res: Response) => res.send("Hello World!"));

const test = configManager.get("test", null).then(result => console.log(result));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
