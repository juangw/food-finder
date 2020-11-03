import express from "express";

var router = express.Router();

/* GET foods listing. */
router.get("/", function (res: any) {
        res.send("Respond with a resource");
    });

export default router;