import express from "express";
import { addHotel,getHotel } from "../controller/hotel.controller";

const router = express.Router();

router.post("/add-hotel", addHotel);
router.get("/get-hotel", getHotel);
export default router;
