import express from "express";
// import { RestaurantController } from '../controllers/restaurantsController.js'
import { MenuController } from '../controllers/menuController.js'

const menuRouter = express.Router();
const  menuController = new MenuController();

menuRouter.get("/", menuController.getAllMenus)
menuRouter.get("/:id", menuController.getMenuById)
menuRouter.post("/", menuController.addMenu)
menuRouter.put("/:id", menuController.updateMenu)
menuRouter.delete("/:id", menuController.deleteMenu)

export {
    menuRouter
}