import express from "express";
import { userSignUp, userLogin,changePassword } from "../controller/auth.controller.js";
import { requireSignin } from "../middlewares";

const router = express.Router();

router.post("/login", userLogin);
router.post("/signup", userSignUp);
router.post("/change-password",requireSignin,changePassword)

export default router;
