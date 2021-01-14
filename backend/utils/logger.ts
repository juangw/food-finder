import pino from "pino";
import expressPino from "express-pino-logger";
import configManager from "../config/configManager";

const logLevel = configManager.get("LOG_LEVEL", "info");
const logger = pino({level: logLevel});
const expressLogger = expressPino({ logger });

export { logger, expressLogger };