import express from "express";
// import { RestaurantController } from '../controllers/restaurantsController.js'
import { RestaurantController } from '../controllers/restaurantController.js'
import { verifyJWTToken } from "../middleware/authenticateToken.js";

const restaurantRouter = express.Router();
const restaurantController = new RestaurantController();

restaurantRouter.get("/", verifyJWTToken, restaurantController.getAllRestaurants)
restaurantRouter.get("/:id", verifyJWTToken, restaurantController.getRestaurantById)
restaurantRouter.post("/", verifyJWTToken, restaurantController.addRestaurant)
restaurantRouter.put("/:id", verifyJWTToken, restaurantController.updateRestaurant)
restaurantRouter.delete("/:id", verifyJWTToken, restaurantController.deleteRestaurant)

export {
    restaurantRouter
}