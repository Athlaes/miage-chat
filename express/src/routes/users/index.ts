import { Router } from "express";
import { usersController } from "../../controllers/users.controller";

const user : Router = Router();

user.get("/:id", usersController.getAll)

user.post("/", usersController.create)

user.patch("/", usersController.update)

user.delete("/", usersController.delete)

export const userRouter : Router = user;