import express from "express";
import models from "../database/model/index.js";
import { userSignUp } from "../controller/auth.controller.js";

const router = express.Router();

const user = (req, res) => {
  models.Users.sync().then(() => {
    console.log("User Model synced");
  });
  res.json({ respnse: "respnserespnse" });
};
router.get("/user", user);
router.post("/signup", userSignUp);

export default router;
