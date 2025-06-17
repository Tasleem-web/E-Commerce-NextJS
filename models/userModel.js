import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
  },
  root: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    default: 'https://res.cloudinary.com/tasleem/image/upload/v1750134577/user_profile_qomfds.png',
  },
}, {
  timestamps: true
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;