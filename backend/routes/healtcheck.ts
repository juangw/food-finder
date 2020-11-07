import { Request, Response } from "express";
import express from "express";

var healthcheckRouter = express.Router();

/* GET recipe listing. */
healthcheckRouter.get("/", (req: Request, res: Response) => res.send("OK"));

export default healthcheckRouter;
