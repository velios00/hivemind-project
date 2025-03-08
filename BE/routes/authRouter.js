import express from "express";
import { AuthController } from "../controllers/authController.js";


export const authRouter = express.Router();

authRouter.post("/auth/signin"), async (req, res) => {
    let isAuth = await AuthController.checkCredentials(req, res);
    if(isAuth){
        res.json(AuthController.issueToken(req.body.user));
    } else {
        res.status(401);
    }
};

authRouter.post("/auth/signup", (req, res, next) => {
    AuthController.saveUser(req.body)
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        next({ status: 500, message: "Could not save user"});
      });
  });