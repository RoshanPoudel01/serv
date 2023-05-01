import FEATUREaaa from "../Model/FEATURE";
import Hotel from "../Model/HOTEL";
import mongoose, { isValidObjectId } from "mongoose";
import { Types } from "mongoose";

const { ObjectId } = Types;

export const addHotel = async (req, res) => {
  // console.log(req.body);
  const responseObj = {
    response: {},
    message: "Please Enter All Fields",
  };
  const { name, description, email, address, phone, subtitle, price, feature } =
    req.body;
  console.log(feature);
  if (
    !name ||
    !description ||
    !email ||
    !address ||
    !phone ||
    !subtitle ||
    !price ||
    !feature
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
  const createHotel = new Hotel({
    ...req.body,
  });
  await createHotel.save();
  res.status(201).json({
    ...responseObj,
    message: "Hotel added successfully",
    response: createHotel,
  });
};

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
