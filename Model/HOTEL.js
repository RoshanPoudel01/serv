import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;
const hotelSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    subTitle: {
      type: String,
      lowercase: true,
    },
    address: {
      type: String,
      trim: true,
    },
    hotelDescprition: {
      type: String,
      trim: true,
    },
    bannerImage: {},
    // Feature: [],

    feature: [
      {
        type: ObjectId,
        ref: "Feature",
      },
    ],
    price: {
      type: Number,
      default: 5,
    },
    phone: { type: String, min: 10, max: 14 },
  },

  { timestamps: true }
);

export default mongoose.model("Hotel", hotelSchema);

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
// ]
