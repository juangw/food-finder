import jwt from "jsonwebtoken";
import { Request, Response } from "express";

import configManager from "../config/configManager";


const authenticateJWT = (req: Request, res: Response, next: any) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(" ")[1];
        const accessTokenSecret = configManager.get("ACCESS_SECRET_TOKEN") || "";

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            return next();
        });
    } else {
        res.sendStatus(401);
    }
};

export default authenticateJWT;