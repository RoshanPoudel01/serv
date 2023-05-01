import express from "express";

const router = express.Router();

const user = (req, res) => {
  console.log("hi");
};
router.get("/dataaa", user);

export default router;
