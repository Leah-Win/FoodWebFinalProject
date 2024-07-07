import { OrderService } from '../service/orderService.js'
import express from "express";


export class OrderController {

    // async getAllOrders(req, res, next) {
    //     try {
    //         console.log("get all rerere")
    //         const service = new OrderService();
    //         const resultItems = await service.getAllOrders()
    //         return res.status(200).json(resultItems);
    //     }
    //     catch (ex) {
    //         const err = {}
    //         err.statusCode = 500;
    //         err.message = ex;
    //         next(err);
    //     }
    // }

    async getOrderById(req, res, next) {
        try {
            console.log("11")
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
            console.log("addorder")
            const service = new OrderService();

            const resultItem = await service.addOrder(req.body);
            // const orderItem={ "OrderID": resultItem.insertId, "ItemID":req.body.itemId,"Quantity":req.body.quantity}
            
            // const orderItem=req.body.slice(0,2)
            const orderObject = { "OrderID": resultItem.insertId, "UserID": req.body.UserID, 
             "TotalAmount":req.body.TotalAmount}

             console.log(orderObject)
            res.status(200).json({  data: orderObject });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }



    // async updateOrder(req, res, next) {
    //     try {
    //         const service = new OrderService();
    //         await service.updateOrder(req.body, req.params.id);
    //         res.status(200).json({ status: 200, data: req.params.id });
    //     }
    //     catch (ex) {
    //         const err = {}
    //         err.statusCode = 500;
    //         err.message = ex;
    //         next(err)
    //     }
    // }
//?
    async deleteOrder(req, res, next) {
        try {
            const orderService = new OrderService();
            await orderService.deleteOrder(req.params.id);
            res.status(200).json({data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

}