import express from "express";
import { UserController } from '../controllers/userComtroller.js'
const userRouter = express.Router();
// const {userName}=useParams();

const userController = new UserController()

// userRouter.get("/:id", userController.getUserById)
userRouter.post("/login", userController.login)
userRouter.post("/signup", userController.signUp)
userRouter.get("/Email/:userEmail", userController.isExist)
// userRouter.delete("/:id", userController.deleteUser)
// userRouter.put("/:id", userController.updateUser)

export{
    userRouter
}