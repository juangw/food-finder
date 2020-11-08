import { Request, Response } from "express";
import express from "express";

/**
 * @swagger
 * tags:
 *   name: Healthcheck
 *   description: Healthcheck
 */
var healthcheckRouter = express.Router();

/**
 * @swagger
 * paths:
 *  /healthcheck:
 *    get:
 *      summary: Healthcheck for the service
 *      tags: [Healthcheck]
 *      responses:
 *        "200":
 *          description: Is service healthy?
 */
healthcheckRouter.get("/", (req: Request, res: Response) => res.send("OK"));

export default healthcheckRouter;
