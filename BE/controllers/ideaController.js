

export class IdeaController {
    static async saveIdea(userId, idea) {
        let curr_idea = Idea.build(idea);
        curr_idea.userId = userId;  //l'id dell'utente che ha creato l'idea e' quello attualmente loggato
        return curr_idea.save();
    }

    static async delete(ideaId) {
        return new Promise((resolve, reject) => {
          this.findById(ideaId).then((item) => {
            item.destroy().then(() => {
              resolve(item);
            });
          });
        });
      }

      static async findById(ideaId) {
        return Idea.findByPk(ideaId);
      }

      static async deleteIdea(ideaId) {
        return new Promise((resolve, reject) => {
          this.findById(ideaId).then((item) => {
            item.destroy().then(() => {
              resolve(item);
            });
          });
        });
      }


      static async getIdeasBySearch(req){
        const { page = 1, limit = 10, type } = req.query;
        const offset = (page - 1) * limit;

        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        let order = [];
        let having = null;

        switch(type){
            case 'controversial':
                having = Sequelize.where(Sequelize.fn('ABS', Sequelize.col('voteSum')), '<=', 5); //ho scelto <=5 perche' se ci fossero solo 3 idee per ex, le prime due hanno un abs vicino a 0 (tipo 2 o 3) e una terza abbia un abs di 60, per me non avrebbe senso mostrare la terza nel controverso
                order = [[Sequelize.literal('voteCount'), 'DESC']];
                break;
            case 'unpopular':
                order = [[Sequelize.literal('voteSum'), 'ASC']];
                break;
            case 'mainstream':
                order = [[Sequelize.literal('voteSum'), 'DESC']];
                break;
        }

        try{
            const ideas = await Idea.findAll({
                include: [{
                    model: Vote,
                    attributes: []
                }],
                attributes: {
                    include: [
                        [Sequelize.fn('SUM', Sequelize.col('votes.value')), 'voteSum'],
                        [Sequelize.fn('COUNT', Sequelize.col('votes.value')), 'voteCount']
                    ]
                },
                where: {
                    createdAt: {
                        [Op.gte]: oneWeekAgo
                    }
                },
                group: ['Idea.id'],
                having,
                order,
                limit,
                offset
            });
            res.json(ideas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }

        }
      }
