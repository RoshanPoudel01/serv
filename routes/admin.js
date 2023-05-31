import express from "express";
import { requireSignin, checkAdmin } from "../middlewares";
import { allPaymentLog, allUsers, getAllHotels, totalBookings } from "../controller/admin.controller";

const router = express.Router();


router.get("/allbookings",requireSignin,checkAdmin,totalBookings)
router.get("/allusers",requireSignin,checkAdmin,allUsers)
router.get("/allpayments",requireSignin,checkAdmin,allPaymentLog)
router.get("/allhotels",requireSignin,checkAdmin,getAllHotels)

export default router;
