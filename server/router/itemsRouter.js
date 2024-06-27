import express from "express";
import { ItemsController } from '../controllers/itemsController.js'

const itemsRouter = express.Router();
const itemsController = new ItemsController();

itemsRouter.get("/", itemsController.getAllItems)
itemsRouter.get("/:id", itemsController.getItemById)
itemsRouter.post("/", itemsController.addItem)
itemsRouter.put("/:id", itemsController.updateItem)
itemsRouter.delete("/:id", itemsController.deleteItem)

export {
    itemsRouter
}