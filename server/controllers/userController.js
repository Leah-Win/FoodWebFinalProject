import { UserService } from '../service/userService.js'
import express from "express";
import CryptoJS from 'crypto-js';


export class UserController {
    async login(req, res, next) {
        try {
            const service = new UserService();
            req.body.password = CryptoJS.SHA256(req.body.password).toString();
            const resultData = await service.getUserByParams(req.body);
            if (resultData.length == 0)
                throw new Error(500);
            return res.status(200).json({ data: resultData });
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
                "userId": resultItem.result.insertId, "username": req.body.username, "email": req.body.email, "isManager": 0
            }
            return res.status(200).json(userObject);
        }
        catch (ex) {
            const err = {};
            err.statusCode = (ex.message == 500)
            err.message = ex.message;
            next(err)
        }
    }

    // async isExist(req, res, next) {
    //     try {
    //         const service = new UserService();
    //         const resultData = await service.getUserByEmail(req.params);
    //         if (resultData.length != 0)
    //             throw new Error(500);
    //         else
    //             return res.status(200).json();
    //     }
    //     catch (ex) {
    //         const err = {};
    //         err.statusCode = (ex.message == 500)
    //         err.message = ex.message;
    //         next(err)
    //     }
    // }


}