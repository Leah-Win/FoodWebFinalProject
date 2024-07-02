import { RestaurantMenuService } from '../service/restaurantMenuService.js'
import express from "express";


export class RestaurantMenuController {

    async getAllRestaurantMenu(req, res, next) {
        try {
            console.log("get all rytutrrr")
            const service = new RestaurantMenuService();
            const resultRestaurantMenu = await service.getAllRestaurantMenu()
            console.log(resultRestaurantMenu)
            return res.status(200).json(resultRestaurantMenu);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }

    async getMenuItemById(req, res, next) {
        try {
            console.log("11")
            const service = new RestaurantMenuService();
            const resultRestaurantMenu = await service.getMenuItemById(req.params.id);
            // const resultRestaurantMenu = await service.getRestaurantMenuById(req.params.id);
            res.status(200).json(resultRestaurantMenu);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }

    async getMenuItemByParams(req, res, next) {
        try {
            const service = new RestaurantMenuService();
            const resultRestaurantMenu = await service.getMenuItemByParams(req.params);
            res.status(200).json(resultRestaurantMenu);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }


    async addMenuItem(req, res, next) {
        try {
            console.log("addRestaurantMenu")
            const service = new RestaurantMenuService();
            const resultRestaurantMenu = await service.addMenuItem(req.body);
            const restaurantMenuObject = {"RestaurantMenuID": resultRestaurantMenu.insertId,"RestaurantID": req.body.RestaurantID, "Price": req.body.Price,
            "ImageURL": req.body.ImageURL, "Name": req.body.Name, "Details": req.body.Details, "Description": req.body.Description}
            console.log(restaurantMenuObject)
            res.status(200).json({ status: 200, data: restaurantMenuObject });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }


    async updateMenuItem(req, res, next) {
        try {
            const service = new RestaurantMenuService();
            await service.updateMenuItem(req.body, req.params.id);
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
    async deleteMenuItem(req, res, next) {
        try {
            const RestaurantMenuervice = new RestaurantMenuService();
            await RestaurantMenuervice.deleteMenuItem(req.params.id);
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