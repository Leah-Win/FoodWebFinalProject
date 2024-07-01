import express from "express";
// import { RestaurantController } from '../controllers/restaurantsController.js'
import { OrderController } from '../controllers/orderController.js'

const orderRouter = express.Router();
const orderController = new OrderController();

orderRouter.get("/", orderController.getAllOrders)
orderRouter.get("/:id", orderController.getOrderById)
orderRouter.post("/", orderController.addOrder)
orderRouter.put("/:id", orderController.updateOrder)
orderRouter.delete("/:id", orderController.deleteOrder)

export {
    orderRouter
}