import pino from "pino";
import configManager from "../config/configManager";

const logLevel = configManager.get("LOG_LEVEL", "info");
const logger = pino({level: logLevel});
const expressPino = require("express-pino-logger");
expressPino({ logger });

export default logger;