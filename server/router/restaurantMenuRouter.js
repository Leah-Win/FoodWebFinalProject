import express from "express";
import { RestaurantMenuController } from '../controllers/restaurantMenuController.js'

const restaurantMenuRouter = express.Router();
const restaurantMenuController = new RestaurantMenuController();
restaurantMenuRouter.get("/", restaurantMenuController.getAllRestaurantMenu)
restaurantMenuRouter.get("/:id", restaurantMenuController.getMenuItemById)
restaurantMenuRouter.get("/:restaurant/:restaurantID", restaurantMenuController.getMenuItemByParams)
restaurantMenuRouter.post("/", restaurantMenuController.addMenuItem)
restaurantMenuRouter.put("/:id", restaurantMenuController.updateMenuItem)
restaurantMenuRouter.delete("/:id", restaurantMenuController.deleteMenuItem)

export {
    restaurantMenuRouter
}