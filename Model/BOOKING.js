import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;
const bookingSchema = new Schema(
  {
    check_in_date: {
      type: String,
      trim: true,
      required: true,
    },
    check_out_date: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },

    amount: {
      type: Number,
      required: true,
      default:1
    },

    bookedBy: {
      type: ObjectId,
    //   required: true,
      ref: "User",
    },
    Hotel: {
      type: ObjectId,
      //   required: true,
      ref: "Hotel",
    },
    paid: {
        type: Boolean,
        default:false    
        },
  },

  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
