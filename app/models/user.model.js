const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    description: String,
    email: String,
    city: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    published: Boolean,
    imagePath: {
      type: String,
      default: "",
    },
  })
);

module.exports = User;
