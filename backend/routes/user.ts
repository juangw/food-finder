import { Request, Response } from "express";
import { MongoClient } from "mongodb";
import express from "express";

import configManager from "../config/configManager";

const uri = configManager.get("MONGO_URI") || "";

async function createUser(username: string, password: string) {
    const db = await MongoClient.connect(uri);
    await db.db("admin").collection("users").insertOne({ username, password });
    await db.close();
}

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User
 */
var userRouter = express.Router();

/**
 * @swagger
 * paths:
 *  /user:
 *    post:
 *      summary: Creates a user
 *      tags: [User]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: Created a user
 */
userRouter.post("/", async (req: Request, res: Response) => {
    // Read username and password from request body
    const { username, password } = req.body;
    await createUser(username, password);

    return res.json({
        username,
        password
    });
});

export default userRouter;
