import express from "express";
import { showPrice ,bookHotel } from "../controller/booking.controller";

const router = express.Router();

router.post("/calculate-price", showPrice);
router.post("/book-hotel", bookHotel);


export default router;
