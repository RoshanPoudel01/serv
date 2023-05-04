import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;
const userSchema = new Schema(
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
    address: {
      type: String,
      trim: true,
    },
    // band: {
    //   type: Boolean,
    //   default: false,
    // },

    // email_verified: {
    //   type: Boolean,
    //   default: false,
    // },
    phone: { type: String, min: 10, max: 14 },

    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },

    bookings: {
      type: ObjectId,
      ref: "Booking",
    },
    upoadlImage: {},
    role: {
      type: [String],
      default: ["Normal User"],
      enum: ["Normal User", "Admin"],
    },
    // stripe_account_id: { type: String, default: "" },
    stripeSession: {},
    // passwordResetCode: {
    //   data: String,
    //   default: "",
    // },
  },

  { timestamps: true }
);

export default mongoose.model("User", userSchema);
