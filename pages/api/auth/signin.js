import fieldsValidation from "../../../utils/validation";
import connectDB from "../../../utils/connectDB";
import bcrypt from 'bcrypt'
import User from "../../../models/userModel";
import { HttpStatus, USER_SIGNIN, SUCCESS, ERROR } from "../constants";
import { createAccessToken, createRefreshToken } from "../../../utils/generateToken";

connectDB();

export default async function (req, res) {
  switch (req.method) {
    case 'POST':
      await SignIn(req, res);
      break;

    default:
      break;
  }
}

const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const errMsg = fieldsValidation({ checkType: 'signin', fields: { email, password } });
    if (errMsg) return res.status(HttpStatus['BadRequest']).json({ [ERROR]: errMsg });

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(HttpStatus['BadRequest']).json({ [ERROR]: 'User not found. Please register.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(HttpStatus['BadRequest']).json({ [ERROR]: 'Invalid credentials. Please try again.' });
    }

    const access_token = createAccessToken({ id: user._id });
    const refresh_token = createRefreshToken({ id: user._id });

    return await res.
      status(HttpStatus['OK'])
      .json({
        [SUCCESS]: USER_SIGNIN,
        access_token,
        refresh_token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          root: user.root
        }
      });
  }
  catch (error) {
    console.error("Error during sign-in:", error);
    return res.status(HttpStatus['InternalServerError']).json({ error: 'Internal server error. Please try again later.' });
  }
}