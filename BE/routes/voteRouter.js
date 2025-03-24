import express from "express";
import { VoteController } from "../controllers/voteController.js";

export const voteRouter = express.Router();

voteRouter.post("/ideas/:ideaId/votes", async (req, res) => {
    voteController.saveVote(req.params.ideaID, req.body, req.user.id)
        .then((vote) => {
            res.status(201).send(vote);
        })
        .catch((err) => {
            res.status(400).send(err);
        })
});

voteRouter.get("/ideas/:ideaId/votes", async (req, res) => {
    voteController.getVotes(req.params.ideaID, req.query.type)
        .then((votes) => {
            res.status(200).send(votes);
        })
        .catch((err) => {
            res.status(400).send(err);
        })
});

voteRouter.delete("/ideas/votes/:voteId"), async (req, res) => {
    voteController.deleteVote(req.params.voteId)
        .then((vote) => {
            res.status(200).send(vote);
        })
        .catch((err) => {
            res.status(400).send(err);
        })
};

voteRouter.put("/ideas/votes/:voteId"), async (req, res) => {
    voteController.updateVote(req.params.voteId, req.body)
        .then((vote) => {
            res.status(200).send(vote);
        })
        .catch((err) => {
            res.status(400).send(err);
        })
};
