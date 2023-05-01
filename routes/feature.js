import express from "express";
import { addHotelFeature, getFeature } from "../controller/feature.controller";

const router = express.Router();

router.post("/add-feature", addHotelFeature);
router.get("/get-feature", getFeature);

export default router;
