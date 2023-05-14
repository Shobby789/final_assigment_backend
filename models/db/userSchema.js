const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    address: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    // admin: { type: Boolean, required: true, default: false },
    UserType:{type:String},
  },
  {
    collection: "Users",
  }
);

mongoose.model("Users", userSchema);
