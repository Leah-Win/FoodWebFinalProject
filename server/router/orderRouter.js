import express from "express";
// import { RestaurantController } from '../controllers/restaurantsController.js'
import { OrderController } from '../controllers/orderController.js'
import { verifyJWTToken } from "../middleware/authenticateToken.js";

const orderRouter = express.Router();
const orderController = new OrderController();

// orderRouter.get("/", orderController.getAllOrders)
orderRouter.get("/:id",verifyJWTToken, orderController.getOrderById)
orderRouter.post("/",verifyJWTToken, orderController.addOrder)
// orderRouter.put("/:id", orderController.updateOrder)
orderRouter.delete("/:id",verifyJWTToken, orderController.deleteOrder)

export {
    orderRouter
}