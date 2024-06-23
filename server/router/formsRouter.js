import express from "express";
import { FormController } from '../controllers/formsController.js'

const formsRouter = express.Router();
const formController = new FormController();

formsRouter.post("/login", formController.loginUser)
formsRouter.get("/signup", formController.signupUser)
formsRouter.post("/", formController.addPassword)
formsRouter.put("/", formController.changePassword)

export {
    formsRouter
}