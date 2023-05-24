import express from "express";
import { userProfile } from "../controller/profile.controller";
import { requireSignin } from "../middlewares";

const router = express.Router();

router.get("/profile",requireSignin, userProfile);
export default router;