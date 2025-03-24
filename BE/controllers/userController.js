import { User } from '../models/db.js';

export class UserController {
    static async findById(ideaId) {
        const user = await User.findByPk(ideaId);

        return user;
    }
}