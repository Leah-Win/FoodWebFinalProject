import express from "express";
import { OrderController } from '../controllers/orderController.js'
import { verifyJWTToken } from "../middleware/authenticateToken.js";

const orderRouter = express.Router();
const orderController = new OrderController();

orderRouter.get("/:id",verifyJWTToken, orderController.getOrderById)
orderRouter.post("/",verifyJWTToken, orderController.addOrder)
orderRouter.delete("/:id",verifyJWTToken, orderController.deleteOrder)

export {
    orderRouter
}