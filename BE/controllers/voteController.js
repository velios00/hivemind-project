import { Vote } from '../models/vote.js';
import { generateHttoError } from '../utils/httpError.js';

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
            throw generateHttoError(400, "You have already voted for this idea");
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
                throw generateHttoError(404, "Vote not found");
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
        //da completare
    }
        

}