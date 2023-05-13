import express from "express";
import { addHotel,getHotel } from "../controller/hotel.controller";
import { requireSignin } from "../middlewares";

const router = express.Router();

router.post("/add-hotel",requireSignin, addHotel);
router.get("/get-hotel", getHotel);
export default router;
