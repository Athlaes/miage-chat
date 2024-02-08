import { Router } from "express";
import { authController } from "../../controllers/auth.controller";
const auth : Router = Router();

auth.post("/", authController.login);

export const authRouter : Router = auth;