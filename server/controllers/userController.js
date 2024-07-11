import { UserService } from '../service/userService.js'
import express from "express";
import CryptoJS from 'crypto-js';

export class UserController {

    async login(req, res, next) {
        try {
            const service = new UserService();
            const resultData = await service.getUserByParams(req.body);
            if (resultData == [] || resultData == undefined || resultData.length == 0)
                throw new Error(500);
            const hash_password = CryptoJS.SHA256(req.body.Password).toString();
            const passwordObj = { "Password": hash_password, "UserID": resultData[0].UserID }
            const isExist = await service.checkIfUserExist(passwordObj);
            if (isExist == [] || isExist == undefined || isExist.length == 0)
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


    async isExist(req, res, next) {
        try {
            const service = new UserService();
            const resultData = await service.getUserByEmail(req.params);
            if (resultData != [] && resultData != undefined && resultData.length != 0)
                throw new Error(500);
            else
                return res.status(200).json();
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
                console.log(resultItem)

                const userObject = {
                    "userId": resultItem.result.insertId, "username": req.body.Username,
                    "email": req.body.Email, "phoneNumber": req.body.PhoneNumber, "address": req.body.Address
                }
                const passwordObj = { "Password": req.body.password, "UserID": resultItem.result.insertId }
                await service.addPassword(passwordObj);
                const result = { userObject, "token": resultItem.token }
                return res.status(200).json({ data: result });
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

}