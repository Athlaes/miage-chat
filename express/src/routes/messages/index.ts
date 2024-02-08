import { Router } from "express"
import { messagesController } from "../../controllers/messages.controller";

const messages : Router = Router();

messages.get("/:id", messagesController.getAllFromChannel)

messages.post("/", messagesController.create)

messages.patch("/", messagesController.update)

messages.delete("/", messagesController.delete)

export const messagesRouter : Router = messages