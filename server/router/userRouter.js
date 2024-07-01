import express from "express";
import { UserController } from '../controllers/userComtroller.js'
const userRouter = express.Router();

const userController = new UserController()

userRouter.get("/:id", userController.getUserById)
userRouter.get("/login", userController.login)
userRouter.post("/login", userController.login)
userRouter.post("/", userController.signUp)
userRouter.delete("/:id", userController.deleteUser)
userRouter.put("/:id", userController.updateUser)

export{
    userRouter
}