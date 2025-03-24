import express from 'express';
import { CommentController } from '../controllers/commentController.js';

export const commentRouter = express.Router();

commentRouter.post('/ideas/:ideaId/comments', (req, res, next) => {
    CommentController.saveComment(req.params.ideaId, req.body)
        .then((comment) => res.status(200).json(comment))
        .catch((err) => next(err));
    });


    commentRouter.put("/comments/:commentId", )