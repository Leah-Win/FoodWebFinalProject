import { UserService } from '../service/userService.js'
import CryptoJS from 'crypto-js';


export class UserController {
    async login(req, res, next) {
        try {
            const service = new UserService();
            req.body.password = CryptoJS.SHA256(req.body.password).toString();
            const resultData = await service.getUserByParams(req.body);
            if (resultData.length == 0)
                throw new Error(500);
            return res.cookie('token', resultData.token,  { httpOnly: true, secure: false }).json(resultData)
        }
        catch (ex) {
            const err = {};
            err.statusCode = (ex.message == 500)
            err.message = ex.message;
            next(err)
        }
    }

    async signUp(req, res, next) {

        try {
            const service = new UserService();
            req.body.password = CryptoJS.SHA256(req.body.password).toString();
            const resultItem = await service.addUser(req.body);
            const userObject = {
                "userId": resultItem.id, "username": req.body.username, "email": req.body.email, "isManager": 0
            }
            if (resultItem.length != 0) 
                return res.cookie('token', resultItem.token, { httpOnly: true, secure: false }).json(userObject)
        }
        catch (ex) {
            const err = {};
            err.statusCode = (ex.message == 500)
            err.message = ex.message;
            next(err)
        }
    }


}