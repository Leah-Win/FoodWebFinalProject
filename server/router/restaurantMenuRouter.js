import express from "express";
import { RestaurantMenuController } from '../controllers/restaurantMenuController.js'
import { verifyJWTToken } from "../middleware/authenticateToken.js";
const restaurantMenuRouter = express.Router();
const restaurantMenuController = new RestaurantMenuController();

restaurantMenuRouter.get("/",verifyJWTToken, restaurantMenuController.getAllRestaurantMenu)
restaurantMenuRouter.get("/:restaurantID/menuItemID/:id", verifyJWTToken, restaurantMenuController.getMenuItemById)
restaurantMenuRouter.get("/:restaurant/:restaurantID", verifyJWTToken, restaurantMenuController.getMenuItemByParams)
restaurantMenuRouter.post("/:restaurantID", verifyJWTToken, restaurantMenuController.addMenuItem)
restaurantMenuRouter.put("/:restaurantID/menuItemID/:id", verifyJWTToken, restaurantMenuController.updateMenuItem)
restaurantMenuRouter.delete("/:restaurantID/menuItemID/:id", verifyJWTToken, restaurantMenuController.deleteMenuItem)

export {
    restaurantMenuRouter
}