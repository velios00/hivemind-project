import { Sequelize } from 'sequelize';
import { createModel as createUserModel } from './user.js';
import { createModel as createIdeaModel } from './idea.js';
import { createModel as createCommentModel } from './comment.js';
import { createModel as createVoteModel } from './vote.js';




import 'dotenv/config.js'; //leggi .env e rendilo disponibile in ambiente


export const database = new Sequelize({
    storage: process.env.DB_CONNECTION_URI,
    dialect: process.env.DIALECT
});



createUserModel(database);
createIdeaModel(database);
createCommentModel(database);
createVoteModel(database);

export const {User, Idea, Vote, Comment} = database.models;

//associazioni, faccio delle assegnazioni per avere dei riferimenti diretti
User.Ideas = User.hasMany(Idea, {foreignKey: 'userId', allowNull: false});

Idea.User = Idea.belongsTo(User, {foreignKey: 'userId', allowNull: false});

Idea.Comments = Idea.hasMany(Comment, {foreignKey: 'ideaId', allowNull: false});

Comment.idea = Comment.belongsTo(Idea, {foreignKey: 'ideaId', allowNull: false});

User.Comments = User.hasMany(Comment, {foreignKey: 'userId', allowNull: false});

Comment.User = Comment.belongsTo(User, {foreignKey: 'userId', allowNull: false});

User.Votes = User.hasMany(Vote, {foreignKey: 'userId', allowNull: false});

Vote.User = Vote.belongsTo(User, {foreignKey: 'userId', allowNull: false});

Idea.Votes = Idea.hasMany(Vote, {foreignKey: 'ideaId', allowNull: false});

Vote.Idea = Vote.belongsTo(Idea, {foreignKey: 'ideaId', allowNull: false});

//sincronizzazione schema
database
  .sync()
  .then(() => {
    console.log("Database sincronizzato");
  })
  .catch((err) => {
    console.log("Errore nella sincronizzazione: " + err.message);
  });
