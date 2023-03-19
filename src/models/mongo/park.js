import Mongoose from "mongoose";

const { Schema } = Mongoose;

const parkSchema = new Schema({
  title: String,
  locatiom: String,
  rating: String,
  parklistid: {
    type: Schema.Types.ObjectId,
    ref: "Parklist",
  },
});

export const Park = Mongoose.model("Park", parkSchema);