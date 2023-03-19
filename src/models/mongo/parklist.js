import Mongoose from "mongoose";

const { Schema } = Mongoose;

const parklistSchema = new Schema({
  title: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Parklist = Mongoose.model("Parklist", parklistSchema);