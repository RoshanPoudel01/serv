import express from "express";
import { addHotel } from "../controller/hotel.controller";

const router = express.Router();

router.post("/add-hotel", addHotel);

export default router;
