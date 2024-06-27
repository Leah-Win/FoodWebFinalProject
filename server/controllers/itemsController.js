import { ItemsService } from '../service/itemsService.js'
import express from "express";


export class ItemsController {

    async getAllItems(req, res, next) {
        try {
            console.log("get all r")
            const service = new ItemsService();
            const resultItems = await service.getAllItems()
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }

    async getItemById(req, res, next) {
        try {
            console.log("11")
            const service = new ItemsService();
            const resultItem = await service.getItemById(req.params.id);
            // const resultItem = await service.getItemById(req.params.id);
            res.status(200).json(resultItem);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }

    async addItem(req, res, next) {
        try {
            console.log("addItem")
            const service = new ItemsService();
            const resultItem = await service.addItem(req.body);
            const itemObject = {"ItemID": resultItem.insertId, "Name": req.body.Name, "Description": req.body.Description}
            console.log(itemObject)
            res.status(200).json({ status: 200, data: itemObject });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }


    async updateItem(req, res, next) {
        try {
            const service = new ItemsService();
            await service.updateItem(req.body, req.params.id);
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
    async deleteItem(req, res, next) {
        try {
            const ItemService = new ItemsService();
            await ItemService.deleteItem(req.params.id);
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