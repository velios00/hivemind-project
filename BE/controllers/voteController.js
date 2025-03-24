import { Vote } from '../models/db.js';
import { generateHttpError } from '../utils/common.js';

export class VoteController {
    static async saveVote(ideaId, voteData, userId){
        let existingVote = await Vote.findOne({
            where: {
                ideaId: ideaId,
                userId: userId
            }
        });
        if(existingVote == NULL){
            let newVote = Vote.build(voteData);
            newVote.ideaId = ideaId;
            newVote.userId = userId;
            return newVote.save();
        } else {
            throw generateHttpError(400, "You have already voted for this idea");
        }
    }
    static async findById(voteId){
        return Vote.findByPk(voteId);
    }

    static async updateVote(voteId, updatedVote){
        let vote = await Vote.findOne({
            where: {
                id: voteId
            },
        });
        if(vote){
            vote.voteType = updatedVote.voteType;
            return vote.save();
        } else {
                throw generateHttpError(404, "Vote not found");
            }
        }

    static async deleteVote(voteId){
        return new Promise((resolve, reject) => {
            this.findById(voteId).then((item) => {
              item.destroy().then(() => {
                resolve(item);
              });
            });
          });
        }

    static async getVotes(ideaId, type){
        let voteType;
        if(type === "upvote"){
            voteType = 1;
        } else if(type === "downvote"){
            voteType = -1;
        } else {
            voteType = 0;
        }
        let allVotes = await Vote.findAll({
            where: {
                ideaId: ideaId,
                ...(voteType ? { voteType: voteType } : {}),
            }
        })
        return {
            votes: allVotes,
            count: allVotes.length
        }
    }
        

}