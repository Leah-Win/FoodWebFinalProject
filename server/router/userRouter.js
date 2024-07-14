import express from "express";
import { UserController } from '../controllers/userController.js'
const userRouter = express.Router();

const userController = new UserController()

userRouter.post("/login", userController.login)
userRouter.post("/signup", userController.signUp)
// userRouter.get("/Email/:userEmail", userController.isExist)

export{
    userRouter
}