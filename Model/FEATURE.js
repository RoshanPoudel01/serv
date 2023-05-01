import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;
const featureSchema = new Schema(
  {
    name: {
      type: [String], 
      default: [""],
    },
  },

  { timestamps: true }
);

export default mongoose.model("Feature", featureSchema);
