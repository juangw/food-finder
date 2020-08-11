import express from "express";
import config from './config/config.js';
import configManager from "./config/configManager.js";

const app = express();
const port = 8080;

app.get("/", (req, res) => res.send("Hello World!"));

const test = configManager.get("test").then(res => console.log(res));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
