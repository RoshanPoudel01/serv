import FEATUREaaa from "../Model/FEATURE";
import User from "../Model/USER"
import Hotel from "../Model/HOTEL";
import mongoose, { isValidObjectId } from "mongoose";
import { Types } from "mongoose";
import { responseObj } from "../utils";


const { ObjectId } = Types;
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dnjy9jxbk",
  api_key: "542287754895969",
  api_secret: "LqTWCnmvBKMhYtI6SUdMSIznnlI",
});

export const addHotel = async (req, res) => {
  // console.log(req.body);
  const responseObj = {
    response: {},
    message: "Please Enter All Fields",
  };
  const {
    name,
    description,
    email,
    address,
    phone,
    subtitle,
    price,
    bannerimage,
  } = req.body;
  if (
    !name ||
    !description ||
    !email ||
    !address ||
    !phone ||
    !subtitle ||
    !price
  ) {
    return res.status(400).json(responseObj);
  }
  const hotelCheck = await Hotel.findOne({ email }).exec();

  if (hotelCheck) {
    return res.status(400).json({
      ...responseObj,
      message: "Hotel with this email address already exists",
    });
  }
  // console.log(req.body.bannerimage);

  const resss = await cloudinary.uploader.upload(req.body.bannerimage, { public_id: name });
  console.log(resss?.url);
  console.log(subtitle)

  const createHotel = await new Hotel({
    name: name,
    email: email,
    address: address,
    price: price,
    phone: phone,
    description: description,
    subtitle: subtitle,
    bannerimage: resss?.url,
    owner:req.user._id
  });
  await createHotel.save();
  res.status(201).json({
    ...responseObj,
    message: "Hotel added successfully",
    response: createHotel,
  });
};
export const getHotel = async (req, res) => {
  const getHotels = await Hotel.find({});
   res.status(201).json({
      ...responseObj,
      message: "Hotel fetch successfully",
      response: getHotels,
    });
};

export const getHotelDetail = async (req, res) => {
   const hotelId = req.query.id;
console.log(hotelId)
  const getHotels = await Hotel.findOne({_id:hotelId}).populate("feature","name");
   res.status(201).json({
      ...responseObj,
      message: "Hotel fetch successfully",
      response: getHotels,
    });
};
export const deleteHotel = async (req, res) => {
  try
    {   const hotelId = req.query.id;
console.log(hotelId)
  const deleteHotels = await Hotel.deleteOne({_id:hotelId})
   return res.status(201).json({
      ...responseObj,
      message: "Hotel Delete successfully"
   });
  }
  catch (error) {
    console.log(error)
  }
};

export const editHotel = async (req, res) => {
     const hotelId = req.query.id;
console.log(hotelId)
  const getHotels = await Hotel.findOne({ _id: hotelId }).populate("feature", "name");
    // console.log(req.body);
  const responseObj = {
    response: {},
    message: "Please Enter All Fields",
  };
  const {
    name,
    description,
    email,
    address,
    phone,
    subtitle,
    price,
    bannerimage,
  } = req.body;
  if (
    !name ||
    !description ||
    !email ||
    !address ||
    !phone ||
    !subtitle ||
    !price||!bannerimage
  ) {
    return res.status(400).json(responseObj);
  }
  const hotelCheck = await Hotel.findOne({ email }).exec();

  if (hotelCheck) {
    return res.status(400).json({
      ...responseObj,
      message: "Hotel with this email address already exists",
    });
  }
  // console.log(req.body.bannerimage);

  const resss = await cloudinary.uploader.upload(req.body.bannerimage, { public_id: name });
  console.log(resss?.url);
  console.log(subtitle)
  const setNewValues = await Hotel.findOneAndUpdate({ _id: hotelId },
    {
    name: name,
    email: email,
    address: address,
    price: price,
    phone: phone,
    description: description,
    bannerimage: resss?.url
    },{new:true}
  )
   return res.status(201).json({
      ...responseObj,
      message: "Hotel fetch successfully",
      response: getHotels,
    });
}
// [
//   {
//     _id: new ObjectId("644fce960e59c0a1d955b9cf"),
//     name: [ 'nimeaaasshaaah' ],
//     createdAt: 2023-05-01T14:37:10.431Z,
//     updatedAt: 2023-05-01T14:37:10.431Z,
//     __v: 0
//   },
//   {
//     _id: new ObjectId("644fceab0e59c0a1d955b9d2"),
//     name: [ 'nimeaaasshaaah' ],
//     createdAt: 2023-05-01T14:37:31.332Z,
//     updatedAt: 2023-05-01T14:37:31.332Z,
//     __v: 0
//   },
//   {
//     _id: new ObjectId("644fced3be7ef130f8487ea7"),
//     name: [ 'roshanh' ],
//     createdAt: 2023-05-01T14:38:11.271Z,
//     updatedAt: 2023-05-01T14:38:11.271Z,
//     __v: 0
//   },
//   {
//     _id: new ObjectId("644fcf0abe7ef130f8487eaa"),
//     name: [ 'roshnnnnnnanh' ],
//     createdAt: 2023-05-01T14:39:06.596Z,
//     updatedAt: 2023-05-01T14:39:06.596Z,
//     __v: 0
//   },
//   {
//     _id: new ObjectId("644fcf1fbe7ef130f8487ead"),
//     name: [ 'roshnnnnnnanh' ],
//     createdAt: 2023-05-01T14:39:27.092Z,
//     updatedAt: 2023-05-01T14:39:27.092Z,
//     __v: 0
//   }


export const getMyHotel = async(req,res) => {
  const findUser = await User.findById(req.user._id);
  console.log(findUser?._id);
   const getHotels = await Hotel.find({owner:findUser._id});
   res.status(201).json({
      ...responseObj,
      message: "Hotel fetch successfully",
      response: getHotels,
    });
}