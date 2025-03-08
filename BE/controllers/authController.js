import { User } from "../models/db.js";
import { generateHttpError } from "../utils/common.js";
import Jwt from "jsonwebtoken";

export class AuthController {
    static async checkCredentials(req, res){
        let user = new User({
            userName: req.body.usr,
            password: req.body.pwd
        });

        let found = await User.findOne({
            where: {
                userName: user.userName,
                password: user.password
            }
        });

        return found != null;
    }

    static async saveUser(req, res){
        let user = new User({
            userName: req.body.usr,
            password: req.body.pwd
        });
        let found = await User.findOne({
            where: {
                userName: user.userName
            }
        });

        if(found != null){
            throw generateHttpError(409, "User already exists");
        }
        return await user.save();
    }

    

    static issueToken(user){
        return Jwt.sign({user: userName}, process.env.TOKEN_SECRET, {expiresIn: `${24*60*60}s`});
    }
    
    static isTokenValid(token, callback) {
        Jwt.verify(token, process.env.TOKEN_SECRET, callback);
    }
}