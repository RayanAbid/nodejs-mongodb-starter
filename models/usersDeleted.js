const mongoose = require("mongoose");

const UserDeletedSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      min: 3,
    },
    email: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    videosTrimmedInfo: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UsersDeleted", UserDeletedSchema);
