import mongoose from "mongoose";

const mailSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

export default mongoose.model("mail", mailSchema);
