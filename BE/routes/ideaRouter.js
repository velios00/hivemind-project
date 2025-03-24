import express from "express"
import { IdeaController } from "../controllers/ideaController.js";
import { ensureIdeaExists } from "../middleware/ensureIdeaExists.js";
import { ensureUsersModifyOnlyOwnIdeas } from "../middleware/authorization.js";

export const ideaRouter = new express.Router();

ideaRouter.post("/ideas", (req, res, next) => {
  IdeaController.saveIdea(req.body.userId, req.body.idea)
    .then((idea) => res.status(200).json(idea))
    .catch((err) => next(err));
});

ideaRouter.get("/ideas", (req, res, next) => {
  IdeaController.getIdeasBySearch(req.query)
    .then((ideas) => res.status(200).json(ideas))
    .catch((err) => next(err));
});

ideaRouter.get("/ideas/:id", ensureIdeaExists, ensureUsersModifyOnlyOwnIdeas, (req, res, next) => {
  console.log("userId", req.params.userId);
  IdeaController.findIdeaById(req.params.ideaId)
    .then((item)=>{
      res.json(item);
    })
    .catch((err) =>{
       next(err);
      });
});

ideaRouter.delete("/ideas/:id", ensureIdeaExists, ensureUsersModifyOnlyOwnIdeas, (req, res, next) => {
  IdeaController.deleteIdea(req.params.ideaId)
    .then((item) => {
      res.json(item);
    })
    .catch((err) =>{
      next(err);
    });
});

