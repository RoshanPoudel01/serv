import express from "express";
import { addHotel,getHotel,getHotelDetail,getMyHotel } from "../controller/hotel.controller";
import { requireSignin } from "../middlewares";

const router = express.Router();

router.post("/add-hotel",requireSignin, addHotel);
router.get("/get-hotel", getHotel);
router.get("/hotel-details", getHotelDetail);

router.get("/myhotel", requireSignin, getMyHotel)
export default router;
