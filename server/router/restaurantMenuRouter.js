import express from "express";
import { RestaurantMenuController } from '../controllers/restaurantMenuController.js'

const restaurantMenuRouter = express.Router();
const restaurantMenuController = new RestaurantMenuController();
restaurantMenuRouter.get("/", restaurantMenuController.getAllRestaurantMenu)
restaurantMenuRouter.get("/:restaurantID/menuItemID/:id", restaurantMenuController.getMenuItemById)
restaurantMenuRouter.get("/:restaurant/:restaurantID", restaurantMenuController.getMenuItemByParams)
restaurantMenuRouter.post("/:restaurantID", restaurantMenuController.addMenuItem)
restaurantMenuRouter.put("/:restaurantID/menuItemID/:id", restaurantMenuController.updateMenuItem)
restaurantMenuRouter.delete("/:restaurantID/menuItemID/:id", restaurantMenuController.deleteMenuItem)

export {
    restaurantMenuRouter
}