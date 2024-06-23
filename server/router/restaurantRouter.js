import express from "express";
// import { RestaurantController } from '../controllers/restaurantsController.js'
import { RestaurantController } from '../controllers/restaurantController.js'

const restaurantRouter = express.Router();
const restaurantController = new RestaurantController();

restaurantRouter.get("/", restaurantController.getAllRestaurants)
restaurantRouter.get("/:id", restaurantController.getRestaurantById)
restaurantRouter.post("/", restaurantController.addRestaurant)
restaurantRouter.put("/:id", restaurantController.updateRestaurant)
restaurantRouter.delete("/:id", restaurantController.deleteRestaurant)

export {
    restaurantRouter
}