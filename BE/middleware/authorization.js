import { AuthController } from "../controllers/authController.js";
import { generateHttpError } from "../utils/common.js";


export function enforceAuthentication(req, res, next) {
    
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];
  if (!token) {
    next(generateHttpError(401, "Unauthorized"));
    return;
  }
  AuthController.isTokenValid(token, (err, decodedToken) => {
    if (err) {
      next(generateHttpError(401, "Unauthorized"));
    } else {
      console.log("Decoded token", decodedToken);
      req.username = decodedToken.user.username; //aggiungo una proprietà username all'oggetto req
      req.userId = decodedToken.user.id; //aggiungo una proprietà userId all'oggetto req
      next();
    }
  });
}

export async function ensureUsersModifyOnlyOwnIdeas(req, res, next) {
    const userId = req.userId;
    const ideaId = req.params.ideaId;
    const userHasPermission = await AuthController.canUserModifyIdea(userId, ideaId);
    if(userHasPermission){
      next();
    } else {
      next(generateHttpError(403, "Forbidden"));
    }
}

export async function ensureUsersModifyOnlyOwnComments(req, res, next) {
  const userId = req.userId;
  const commentId = req.params.commentId;
  const userHasPermission = await AuthController.canUserModifyComment(userId, commentId);
  if(userHasPermission){
    next();
  } else {
    next(generateHttpError(403, "Forbidden"));
  }
}

export async function ensureUsersMofifyOnlyOwnVotes(req, res, next) {
  const userId = req.userId;
  const voteId = req.params.voteId;
  const userHasPermission = await AuthController.canUserModifyVote(userId, voteId);
  if(userHasPermission){
    next();
  } else {
    next(generateHttpError(403, "Forbidden"));
  }
}

export async function ensureUsersModifyOnlyOwnAvatar(req, res, next){
  const userId = req.userId;
  const userHasPermission = await AuthController.canUserModifyAvatar(userId);
  if(userHasPermission){
    next();
  } else {
    next(generateHttpError(403, "Forbidden"));
  }
}