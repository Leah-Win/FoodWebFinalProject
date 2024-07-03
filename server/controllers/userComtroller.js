import { UserService } from '../service/userService.js'
import express from "express";


export class UserController {

    // async getUser(req, res, next) {
    //     try {
    //         const service = new UserService();
    //         const resultItem = await service.checkIfUserExist(req.body);
    //         if (resultItem == 0)
    //             throw new Error(404);
    //         else {
    //             const resultData = await service.getUserByParams(req.body);
    //             return res.status(200).json({ status: 200, data: resultData });
    //         }
    //     }
    //     catch (ex) {
    //         const err = {};
    //         err.statusCode = (ex.message == 404) ? 404 : 500
    //         err.message = ex.message;
    //         next(err)
    //     }
    // }


    async login(req, res, next) {
        try {
            const service = new UserService();
            const resultData = await service.getUserByParams(req.body);
            if (resultData == [] || resultData == undefined || resultData.length == 0)
                throw new Error(404);
            const passwordObj = { "Password": "".concat(req.body.Password), "UserID": resultData[0].UserID }
            const isExist = await service.checkIfUserExist(passwordObj);
            if (isExist == [] || isExist == undefined || isExist.length == 0)
                throw new Error(500);
            return res.status(200).json({ status: 200, data: resultData });
        }
        catch (ex) {
            const err = {};
            err.statusCode = (ex.message == 404) ? 404 : 500
            err.message = ex.message;
            next(err)
        }
    }


    async isExist(req, res, next) {
        try {
            const service = new UserService();
            const resultData = await service.getUserByEmail(req.params);
            if (resultData != [] && resultData != undefined && resultData.length != 0)
                throw new Error(409);
            else
            return res.status(200).json({ status: 200 });
        }
        catch (ex) {
            const err = {};
            err.statusCode = (ex.message == 409) ? 409 : 500
            err.message = ex.message;
            next(err)
        }
    }


    async signUp(req, res, next) {
        try {
            try {
                const service = new UserService();
                const resultItem = await service.addUser(req.body);
                const userObject = {
                    "userId": resultItem.insertId, "username": req.body.Username,
                    "email": req.body.Email, "phoneNumber": req.body.PhoneNumber, "address": req.body.Address
                }
                const passwordObj = { "Password":  req.body.password, "UserID":  resultItem.insertId }
                await service.addPassword(passwordObj);
                return res.status(200).json({ status: 200, data: userObject });
            }
            catch (ex) {
                const err = {};
                err.statusCode = (ex.message == 404) ? 404 : 500
                err.message = ex.message;
                next(err)
            }
        }

        //איפה יש בדיקה אם משתמש קיים?
        // console.log("adduser")
        // const service = new UserService();
        // console.log(req.body);
        // const resultItem = await service.addUser(req.body);
        // const userObject = {
        //     "UserId": resultItem.insertId, "Username": req.body.Username,
        //     "Email": req.body.Email, "phoneNumber": req.body.PhoneNumber, "Address": req.body.Address
        // }
        // console.log(userObject)
        // //לשנות את הצורה בה הכנסנו סיסמה!!
        // //  console.log("body",req.body)
        // const passwordService = new UserService('Passwords');
        // const passwordObj = [resultItem.insertId, req.body.Password]
        // const s = await passwordService.addPassword(passwordObj);
        // console.log("s", s,)
        // res.status(200).json({ status: 200, data: userObject });


        catch (ex) {
            const err = {};
            err.statusCode = (ex.message == 409) ? 409 : 500
            err.message = ex.message;
            next(err)
        }
    }
    async getUserById(req, res, next) {
        try {
            const service = new UserService();

            const isExist = await service.checkIfUserExist(req.params.id);
            if (isExist != []) {
                const resultItem = await service.getUserById(req.params.id);
                res.status(200).json(resultItem);
            }

        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }
    // async signupUser(req, res, next) {

    //     try {
    //         console.log("form controller")
    //         const service = new UserService('Users', 'UserName');
    //         const resultItem = await service.getUserByParam(req.query.username);
    //         console.log(resultItem)
    //         if (Object.keys(resultItem).length === 0) {
    //             console.log(resultItem)
    //             return res.status(200).json({ status: 200});
    //         }
    //         else
    //             throw new Error(409);
    //     }
    //     catch (ex) {
    //         const err = {};
    //         err.statusCode = (ex.message == 409) ? 409 : 500
    //         err.message = ex.message;
    //         next(err)
    //     }
    // }

    async addPassword(req, res, next) {
        try {
            console.log("addPassword")
            const service = new UserService('Passwords');
            await service.addPassword(req.body);
            // const passwordobj = { "UserId": req.body.UserId, "password": req.body.password}
            //  console.log(passwordobj)
            //לשנות את הצורה בה הכנסנו סיסמה!!
            //  console.log("body",req.body)
            //  const passwordService = new UserService('Passwords');
            //  const s=await passwordService.addPassword(resultItem.insertId, req.body.Password);
            //  console.log("s",s,)
            res.status(200).json({ status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

        // async addPassword(req, res, next) {
    //     try {
    //         const service = new UserService('Passwords');
    //         await service.addPassword(req.body);
    //         console.log(req.body,"kklklklkkkklklklklkolk")
    //         return res.status(200).json({ status: 200 });
    //     }
    //     catch (ex) {
    //         const err = {}
    //         err.statusCode = 500;
    //         err.message = ex;
    //         next(err)
    //     }
    // }
    async updateUser(req, res, next) {
        try {
            const service = new UserService();
            await service.updateUser(req.body, req.params.id);
            res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
    //?
    async deleteUser(req, res, next) {
        try {
            const userService = new UserService();
            await userService.deleteUser(req.params.id);
            res.status(200).json({ status: 200, data: req.params.id });
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