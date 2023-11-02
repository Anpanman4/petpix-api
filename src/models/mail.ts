import mongoose from "mongoose";

const mailSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    require: true,
  },
  code: {
    type: String,
    required: true,
  },
});

export default mongoose.model("mail", mailSchema);
