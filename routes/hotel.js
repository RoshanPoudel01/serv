import express from "express";
import { addHotel,deleteHotel,editHotel,getHotel,getHotelDetail,getMyHotel } from "../controller/hotel.controller";
import { requireSignin,checkClient } from "../middlewares";

const router = express.Router();

router.post("/add-hotel",requireSignin,checkClient, addHotel);
router.get("/get-hotel", getHotel);
router.get("/hotel-details", getHotelDetail);

router.get("/myhotel", requireSignin, checkClient, getMyHotel)

router.post("/hotel-edit", requireSignin, checkClient, editHotel)

router.delete("/delete",requireSignin,checkClient,deleteHotel)
export default router;
