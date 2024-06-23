import express from "express";
import { UserController } from '../controllers/userComtroller.js'
const userRouter = express.Router();

const userController = new UserController()
//A
userRouter.get("/:id", userController.getUserById)
userRouter.get("/", userController.getUser)
userRouter.post("/", userController.addUser)
userRouter.delete("/:id", userController.deleteUser)
userRouter.put("/:id", userController.updateUser)


// userRouter.get("/", (req, res, next) => controller.handleRequest(req, res, next, "get", "users"));
// userRouter.post("/", (req, res, next) => controller.handleRequest(req, res, next, "create", "users"));
// userRouter.delete("/", (req, res, next) => controller.handleRequest(req, res, next, "delete", "users"));
// userRouter.patch("/", (req, res, next) => controller.handleRequest(req, res, next, "update", "users"));

export{
    userRouter
}