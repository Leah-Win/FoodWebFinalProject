import { RestaurantService } from '../service/restaurantService.js'
import express from "express";


export class RestaurantController {

    async getAllRestaurants(req, res, next) {
        try {
            const service = new RestaurantService();
            const resultItems = await service.getAllRestaurants()
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }

    async getRestaurantById(req, res, next) {
        try {
            const service = new RestaurantService();
            const resultItem = await service.getRestaurantById(req.params.id);
            res.status(200).json(resultItem);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }

    async addRestaurant(req, res, next) {
        try {
            console.log("addrestaurant")
            const service = new RestaurantService();
            const resultItem = await service.addRestaurant(req.body);
            const restaurantObject = { "RestaurantID": resultItem.insertId, "Name": req.body.Name, "Address": req.body.Address, "PhoneNumber":req.body.PhoneNumber
            , "ImageURL":req.body.ImageURL, "Description": req.body.Description }
             console.log(restaurantObject)
             //לשנות את הצורה בה הכנסנו סיסמה!!
            //  console.log("body",req.body)
            //  const passwordService = new RestaurantService('Passwords');
            //  const s=await passwordService.addPassword(resultItem.insertId, req.body.Password);
            //  console.log("s",s,)
            res.status(200).json({ status: 200, data: restaurantObject });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }



    async updateRestaurant(req, res, next) {
        try {
            console.log(req.body,"+",req.params.id)
            const service = new RestaurantService();
            await service.updateRestaurant(req.body, req.params.id);
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
    async deleteRestaurant(req, res, next) {
        try {
            const restaurantService = new RestaurantService();
            await restaurantService.deleteRestaurant(req.params.id);
            res.status(200).json( {data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

}