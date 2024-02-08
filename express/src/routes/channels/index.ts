import { Router } from "express";
import { channelController } from "../../controllers/channels.controller";

const channels : Router = Router();

channels.post("/", channelController.create)

channels.delete("/", channelController.delete)

channels.get("/", channelController.getAll)

export const channelsRouter : Router = channels;