import { IdeaController } from "../controllers/ideaController.js";
import { generateHttpError } from "../utils/common.js";

export async function ensureIdeaExists(req, res, next) {
    const ideaId = req.params.ideaId;
    const idea = await IdeaController.findById(ideaId);
    if(idea) {
        next();
    } else {
        next(generateHttpError(404, "Idea not found"));
    }
}