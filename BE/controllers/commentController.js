import { Comment } from '../models/db.js';

export class CommentController {
    static async saveComment(ideaId, commentData, userId){
        let newComment = Comment.build(commentData);
        newComment.ideaId = +ideaId;
        newComment.userId = userId;
        return newComment.save();
    }

    static async findById(commentId){
        return Comment.findByPk(commentId);
    }

    static async updateComment(commentId, newCommentData){
        let ideaId = await Comment.findByPk(commentId);

        idea.set(newCommentData);
        return idea.save();
    }

    static async deleteComment(ideaId){
        return new Promise((resolve, reject) => {
            this.findById(ideaId).then((item) => {
                item.destroy().then(() => {
                    resolve(item);
                });
            });
        });
    }
}