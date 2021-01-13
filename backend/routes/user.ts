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
        Key: {
            "username" : {S: username},
            "password" : {S: password},
        },
        ReturnValues: "ALL_NEW",
        ConditionExpression: "attribute_not_exists(username)"
    };
    ddb.updateItem(params, function (err: AWS.AWSError, result: any) {
        if (err && err.code === "ConditionalCheckFailedException") {
            return res.status(400).send("Unable to create duplicate username");
        }
        if (err) { return res.status(500).send(`Encountered Unexpected Error: ${err}`); }
        return res.json(result);
    });
});

/**
 * @swagger
 * paths:
 *  /user:
 *    delete:
 *      summary: Deletes a user
 *      tags: [User]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        "200":
 *          description: Deleted a user
 */
userRouter.delete("/", async (req: Request, res: Response) => {
    // Read username and password from request body
    const { username, password } = req.body;
    var params = {
        TableName: "users",
        Key: {
            "username": {S: username},
            "password": {S: password},
        },
        ReturnValues: "ALL_OLD"
    };
    ddb.deleteItem(params, function (err: any, result: any) {
        if (err) { return res.status(500).send(`Encountered Unexpected Error: ${err}`); }
        if (!result.hasOwnProperty("Attributes")) { return res.status(400).send("Unable to find user to delete"); }
        return res.json(result);
    });
});

export default userRouter;
