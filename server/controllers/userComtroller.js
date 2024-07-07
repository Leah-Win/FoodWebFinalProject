import { UserService } from '../service/userService.js'
import express from "express";


export class UserController {


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
            err.statusCode = (ex.message == 500)
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
            err.statusCode = (ex.message == 500)
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
                err.statusCode = (ex.message == 500) 
                err.message = ex.message;
                next(err)
            }
        }


        catch (ex) {
            const err = {};
            err.statusCode = (ex.message == 409) ? 409 : 500
            err.message = ex.message;
            next(err)
        }
    }
    // async getUserById(req, res, next) {
    //     try {
    //         const service = new UserService();

    //         const isExist = await service.checkIfUserExist(req.params.id);
    //         if (isExist != []) {
    //             const resultItem = await service.getUserById(req.params.id);
    //             res.status(200).json(resultItem);
    //         }

    //     }
    //     catch (ex) {
    //         const err = {}
    //         err.statusCode = 500;
    //         err.message = ex;
    //         next(err);
    //     }
    // }
    
    //


    // async changePassword(req, res, next) {
    //     try {
    //         const service = new UserService('Passwords ', 'Username ');
    //         const resultItem = await service.getItemByParam(req.body.username);
    //         if (Object.keys(resultItem).length === 0) {
    //             throw new Error(500);
    //         }
    //         else {
    //             await service.updateItem(req.body.newPassword, req.body.username);
    //             return res.status(200).json({ status: 200 });
    //         }
    //     } catch (ex) {
    //         const err = {}
    //         err.statusCode = (ex.message == 599) 
    //         err.message = ex;
    //         next(err)
    //     }
    // }

}