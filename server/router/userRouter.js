import express from "express";
import { UserController } from '../controllers/userComtroller.js'
const userRouter = express.Router();

const userController = new UserController()

userRouter.get("/:id", userController.getUserById)
userRouter.get("/", userController.getUser)
userRouter.post("/", userController.addUser)
userRouter.delete("/:id", userController.deleteUser)
userRouter.put("/:id", userController.updateUser)

export{
    userRouter
}