import { Request, Response } from "express";
import express from "express";

import SpoontacularRequest from "../models/spoonacularRequest";

var recipeRouter = express.Router();

/* GET recipe listing. */
recipeRouter.get("/complexSearch", async function(req: Request, res: Response) {
    var request = new SpoontacularRequest("recipes", "complexSearch");
    return request.get(req.query)
      .then((response) => res.send(response.data))
      .catch(error => res.send(error));
});
recipeRouter.get("/findByNutrients", async function(req: Request, res: Response) {
    var request = new SpoontacularRequest("recipes", "findByNutrients");
    return request.get(req.query)
      .then((response) => res.send(response.data))
      .catch(error => res.send(error));
});
recipeRouter.get("/findByIngredients", async function(req: Request, res: Response) {
    var request = new SpoontacularRequest("recipes", "findByIngredients");
    return request.get(req.query)
      .then((response) => res.send(response.data))
      .catch(error => res.send(error));
});

export default recipeRouter;
