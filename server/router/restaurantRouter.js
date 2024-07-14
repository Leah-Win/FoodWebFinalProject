import express from "express";
import { RestaurantController } from '../controllers/restaurantController.js'
// import { verifyJWTToken } from "../middleware/authenticateToken.js";

const restaurantRouter = express.Router();
const restaurantController = new RestaurantController();

restaurantRouter.get("/", restaurantController.getAllRestaurants)
restaurantRouter.get("/:id",  restaurantController.getRestaurantById)
restaurantRouter.post("/",  restaurantController.addRestaurant)
restaurantRouter.put("/:id",  restaurantController.updateRestaurant)
restaurantRouter.delete("/:id", restaurantController.deleteRestaurant)

export {
    restaurantRouter
}