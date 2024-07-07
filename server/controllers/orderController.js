import { OrderService } from '../service/orderService.js'
import express from "express";

export class OrderController {

    async getOrderById(req, res, next) {
        try {
            const service = new OrderService();
            const resultItem = await service.getOrderById(req.params.id);
            // const resultItem = await service.getOrderById(req.params.id);
            res.status(200).json(resultItem);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err);
        }
    }

    async addOrder(req, res, next) {
        try {
            const service = new OrderService();

            const resultItem = await service.addOrder(req.body);
            const orderObject = {
                "OrderID": resultItem.insertId, "UserID": req.body.UserID,
                "TotalAmount": req.body.TotalAmount
            }
            res.status(200).json({ data: orderObject });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async deleteOrder(req, res, next) {
        try {
            const orderService = new OrderService();
            await orderService.deleteOrder(req.params.id);
            res.status(200).json({ data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

}