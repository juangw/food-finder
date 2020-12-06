import { Request, Response } from "express";
import { MongoClient } from "mongodb";
import express from "express";
import jwt from "jsonwebtoken";

import configManager from "../config/configManager";

const accessTokenSecret = configManager.get("ACCESS_SECRET_TOKEN") || "";
const uri = configManager.get("MONGO_URI") || "";

async function getUser(username: string, password: string) {
    const db = await MongoClient.connect(uri);
    const users = await db.db("admin").collection("users").find({ username, password }).toArray();
    await db.close();
    return users;
}

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth
 */
var authRouter = express.Router();

/**
 * @swagger
 * paths:
 *  /auth/login:
 *    post:
 *      summary: Retrieves JWT token for auth
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: Retrieve JWT token for auth
 */
authRouter.post("/login", async (req: Request, res: Response) => {
    // Read username and password from request body
    const { username, password } = req.body;
    let users: any[] = await getUser(username, password);
    
    // Filter user from the users array by username and password
    const user = users.find(u => { return u.username === username && u.password === password; });

    if (user) {
        // Generate an access token
        const accessToken = jwt.sign({ username: username }, accessTokenSecret);

        return res.json({
            accessToken
        });
    } else {
        return res.send("Username or password incorrect");
    }
});

export default authRouter;
