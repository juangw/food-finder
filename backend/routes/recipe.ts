import { Request, Response } from "express";
import express from "express";

import SpoontacularRequest from "../models/spoonacularRequest";

/**
 * @swagger
 * tags:
 *   name: Recipe
 *   description: Recipe
 */
var recipeRouter = express.Router();

/**
 * @swagger
 * paths:
 *  /recipe/complexSearch:
 *    get:
 *      summary: Search recipes by arguments
 *      tags: [Recipe]
 *      parameters:
 *        - in: query
 *          name: query
 *          type: string
 *          required: false
 *          description: type of recipes to query by
 *      responses:
 *        "200":
 *          description: Recipes
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Recipe'
 */
recipeRouter.get("/complexSearch", async function(req: Request, res: Response) {
    var request = new SpoontacularRequest(req, "recipes", "complexSearch");
    return request.get(req.query)
      .then((response) => res.status(200).send(response.data))
      .catch(error => {
        req.log.error(error);
        res.status(400).send(error);
      });
});

/**
 * @swagger
 * paths:
 *  /recipe/findByNutrients:
 *    get:
 *      summary: Search recipes by nutrients
 *      tags: [Recipe]
 *      responses:
 *        "200":
 *          description: Recipes
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Recipe'
 */
recipeRouter.get("/findByNutrients", async function(req: Request, res: Response) {
    var request = new SpoontacularRequest(req, "recipes", "findByNutrients");
    return request.get(req.query)
      .then((response) => res.status(200).send(response.data))
      .catch(error => {
        req.log.error(error);
        res.status(400).send(error);
      });
});

/**
 * @swagger
 * paths:
 *  /recipe/findByIngredients:
 *    get:
 *      summary: Search recipes by ingredients
 *      tags: [Recipe]
 *      responses:
 *        "200":
 *          description: Recipes
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Recipe'
 */
recipeRouter.get("/findByIngredients", async function(req: Request, res: Response) {
    var request = new SpoontacularRequest(req, "recipes", "findByIngredients");
    return request.get(req.query)
      .then((response) => res.status(200).send(response.data))
      .catch(error => {
        req.log.error(error);
        res.status(400).send(error);
      });
});

export default recipeRouter;
