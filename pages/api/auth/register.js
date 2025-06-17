import fieldsValidation from "../../../utils/validation";
import connectDB from "../../../utils/connectDB";
import bcrypt from 'bcrypt'
import User from "../../../models/userModel";
import { USER_REGISTER } from "../constants";

connectDB();

export default async function (req, res) {
  switch (req.method) {
    case 'POST':
      await register(req, res);
      break;

    default:
      break;
  }
}

const register = async (req, res) => {
  try {
    const { username, email, password, cf_password } = req.body;
    const errMsg = fieldsValidation(username, email, password, cf_password);
    if (errMsg) return res.status(400).json({ message: errMsg });

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: USER_REGISTER });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const newUser = new User({ username, email, password: passwordHash });
    await newUser.save();
    return res.json({
      message: USER_REGISTER,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}