import { Router } from "express";
import { generateAccessToken } from "../controller/generate_access.controller";
import { loginUser } from "../controller/login.controller";
import { logoutUser } from "../controller/logout.controller";
import { registerUser } from "../controller/register.controller";
import { registerUserValidator } from "../validators/registerUser";

const router = Router()

router.post("/register", registerUserValidator, registerUser)

router.post("/login", loginUser)

router.post("/generate-access", generateAccessToken)

router.delete("/logout", logoutUser)

export default router