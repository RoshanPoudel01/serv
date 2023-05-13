import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;
const paymentLogSchema = new Schema(
  {
    transaction_id: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
      default: 1,
    },

    User: {
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
      default: false,
    },
    transaction_detail: {
    },
  },

  { timestamps: true }
);

export default mongoose.model("Payment", paymentLogSchema);
