import { Request, Response } from "express";
import express from "express";
import jwt from "jsonwebtoken";
import AWS from "aws-sdk";

import configManager from "../config/configManager";

const accessTokenSecret = configManager.get("ACCESS_SECRET_TOKEN") || "";
const dynamoDBEndpoint = configManager.get("DYNAMO_DB_ENDPOINT") || "";

// Set the region
AWS.config.update({region: "us-east-1"});

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({ endpoint: new AWS.Endpoint(dynamoDBEndpoint) });

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
    const queryParams = {
        TableName: "users",
        Key: {
            "username": {S: username},
            "password": {S: password},
        }
    };
    return ddb.getItem(queryParams, function (err, data) {
        if (err) return res.status(500).send(`Encountered Unexpected Error: ${err}`);
        if (!data.Item) return res.status(403).send("Invalid username and password provided");

        // Generate an access token viable for a week
        const accessToken = jwt.sign({ username: username }, accessTokenSecret, { expiresIn: 604800 });
        return res.status(200).json({
            accessToken
        });
    });
});

export default authRouter;
