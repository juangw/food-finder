import { Request, Response } from "express";
import express from "express";
import AWS from "aws-sdk";

import configManager from "../config/configManager";

const dynamoDBEndpoint = configManager.get("DYNAMO_DB_ENDPOINT") || "";

// Set the region
AWS.config.update({region: "us-east-1"});

// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({ endpoint: new AWS.Endpoint(dynamoDBEndpoint) });

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
    var params = {
        TableName: "users",
        Item: {
            "username" : {S: username},
            "password" : {S: password},
        }
    };
    ddb.putItem(params, function (err, _) {
        if (err) return res.status(500).send(`Encountered Unexpected Error: ${err}`);
        return res.json({
            username,
            password
        });
    });
});

export default userRouter;
