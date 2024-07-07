import { MenuService } from '../service/menuService.js'
import express from "express";

export class MenuController {

    async getAllMenus(req, res, next) {
        try {
            const service = new MenuService();
            const resultItems = await service.getAllMenus()
            return res.status(200).json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }

    async getMenuById(req, res, next) {
        try {
            const service = new MenuService();
            const resultItem = await service.getMenuById(req.params.id);
            res.status(200).json(resultItem);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }


    async getMenuByParam(req, res, next) {
        try {
            const service = new MenuService();
            const resultItem = await service.getMenuByParam(req.params);
            res.status(200).json(resultItem);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }


    async addMenu(req, res, next) {
        try {
            const service = new MenuService();
            const resultItem = await service.addMenu(req.body);
            const menuObject = {"MenuID": resultItem.insertId, "Name": req.body.Name, "Description": req.body.Description}
            res.status(200).json({data: menuObject });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }


    async updateMenu(req, res, next) {
        try {
            const service = new MenuService();
            await service.updateMenu(req.body, req.params.id);
            res.status(200).json({  data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
//?
    async deleteMenu(req, res, next) {
        try {
            const menuService = new MenuService();
            await menuService.deleteMenu(req.params.id);
            res.status(200).json({  data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
}