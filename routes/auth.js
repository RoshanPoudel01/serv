import express from "express";
import { userSignUp,userLogin } from "../controller/auth.controller.js";

const router = express.Router();


router.post("/login", userLogin);
router.post("/signup", userSignUp);

export default router;
