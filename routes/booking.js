import express from "express";
import { showPrice ,bookHotel, checkPaymentStatus,bookingHistory,myHotelBooking,upcomingBookings,getPaymentLog } from "../controller/booking.controller";
import { requireSignin,checkClient, checkAdmin } from "../middlewares";

const router = express.Router();

router.post("/calculate-price", showPrice);
router.post("/book-hotel", requireSignin,bookHotel);
router.get("/payment-status", requireSignin, checkPaymentStatus);
router.get("/booking-history",requireSignin,bookingHistory)
router.get("/my-hotel-bookings",requireSignin,checkClient,myHotelBooking)
router.get("/upcomingbookings", requireSignin, upcomingBookings)
router.get("/allpayments", requireSignin, getPaymentLog)


export default router;
