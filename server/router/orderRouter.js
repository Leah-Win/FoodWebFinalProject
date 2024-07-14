import express from "express";
import { OrderController } from '../controllers/orderController.js'
// import { verifyJWTToken } from "../middleware/authenticateToken.js";

const orderRouter = express.Router();
const orderController = new OrderController();

orderRouter.get("/:id", orderController.getOrderById)
orderRouter.post("/", orderController.addOrder)
orderRouter.delete("/:id", orderController.deleteOrder)

export {
    orderRouter
}