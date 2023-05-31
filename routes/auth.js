import express from "express";
import { userSignUp, userLogin,changePassword,userLogout, makeClient, getAccountStatus } from "../controller/auth.controller.js";
import { requireSignin } from "../middlewares";

const router = express.Router();

router.post("/login", userLogin);
router.post("/signup", userSignUp);
router.post("/change-password", requireSignin, changePassword)
router.get("/logout",requireSignin,userLogout)
router.get("/makeclient", requireSignin, makeClient)
router.get("/get-account-status",requireSignin,getAccountStatus)

export default router;
