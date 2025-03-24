import express from "express";
import { UserController } from "../controllers/userController.js";

export const userRouter = express.Router();

userRouter.post("/users:userId", async (req, res, next) => {
    userController.findById(req.params.userId)
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

// fare avatar