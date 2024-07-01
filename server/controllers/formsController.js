import { UserService } from '../service/userService.js'
//חייבים לשנות שלא ילך לקונטרולר של USER
export class FormController {

    async loginUser(req, res, next) {
        try {
            const service = new UserService('Passwords');
            const resultItem = await service.checkIfUserExist(req.body);
            if (resultItem == 0)
                throw new Error(404);
            else {
                const data = new UserService('Users', 'Username');
                const resultData = await data.getUserByParam(req.body.email);
                console.log("resultData", resultData)
                return res.status(200).json({ status: 200, data: resultData });
            }
        }
        catch (ex) {
            const err = {};
            err.statusCode = (ex.message == 404) ? 404 : 500
            err.message = ex.message;
            next(err)
        }
    }

    async signupUser(req, res, next) {

        try {
            console.log("form controller")
            const service = new UserService('Users', 'UserName');
            const resultItem = await service.getUserByParam(req.query.username);
            console.log(resultItem)
            if (Object.keys(resultItem).length === 0) {
                console.log(resultItem)
                return res.status(200).json({ status: 200});
            }
            else
                throw new Error(409);
        }
        catch (ex) {
            const err = {};
            err.statusCode = (ex.message == 409) ? 409 : 500
            err.message = ex.message;
            next(err)
        }
    }

    async addPassword(req, res, next) {
        try {
            const service = new UserService('Passwords');
            await service.addPassword(req.body);
            return res.status(200).json({ status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async changePassword(req, res, next) {
        try {
            const service = new UserService('Passwords ', 'Username ');
            const resultItem = await service.getItemByParam(req.body.username);
            if (Object.keys(resultItem).length === 0) {
                throw new Error(409);
            }
            else {
                await service.updateItem(req.body.newPassword, req.body.username);
                return res.status(200).json({ status: 200 });
            }
        } catch (ex) {
            const err = {}
            err.statusCode = (ex.message == 409) ? 409 : 500
            err.message = ex;
            next(err)
        }
    }

}