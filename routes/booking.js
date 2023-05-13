import express from "express";
import { showPrice ,bookHotel, checkPaymentStatus } from "../controller/booking.controller";
import { requireSignin } from "../middlewares";

const router = express.Router();

router.post("/calculate-price", showPrice);
router.post("/book-hotel", requireSignin,bookHotel);
router.get("/payment-status",requireSignin,checkPaymentStatus);


export default router;
