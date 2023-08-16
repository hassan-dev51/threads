import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: String,
  bio: String,
  threds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Threads",
    },
  ],
  onboarded: {
    type: Boolean,
    default: false,
  },
  communities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Community",
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
