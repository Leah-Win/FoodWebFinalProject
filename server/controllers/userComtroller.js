import { UserService } from '../service/userService.js'
import express from "express";


export class UserController {

    async getUser(req, res, next) {
        try {
            const service = new UserService();
            const resultItems = await service.getUser()
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }

    async getUserById(req, res, next) {
        try {
            const service = new UserService();
            const resultItem = await service.getUserById(req.params.id);
            res.status(200).json(resultItem);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }

    async addUser(req, res, next) {
        try {
            console.log("adduser")
            const service = new UserService();
            console.log(req.body);
            const resultItem = await service.addUser(req.body);
            const userObject = { "UserId": resultItem.insertId, "Username": req.body.Username,
             "Email": req.body.Email, "phoneNumber":req.body.PhoneNumber, "Address":req.body.Address }
             console.log(userObject)
             //לשנות את הצורה בה הכנסנו סיסמה!!
            //  console.log("body",req.body)
            //  const passwordService = new UserService('Passwords');
            //  const s=await passwordService.addPassword(resultItem.insertId, req.body.Password);
            //  console.log("s",s,)
            res.status(200).json({ status: 200, data: userObject });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

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
            res.status(200).json({ status: 200});
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

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
            const userService = new UserService('id');
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

}