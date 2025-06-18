import User from "../../../models/userModel";
import connectDB from "../../../utils/connectDB";
import jwt from 'jsonwebtoken';
import { HttpStatus } from "../constants";
import { createAccessToken, verifyToken } from "../../../utils/generateToken";

connectDB();

export default async (req, res) => {
  try {
    const rf_cookie = req.cookies.refreshtoken;
    if (!rf_cookie) return res.status(HttpStatus['BadRequest']).json({ error: "Please login now!" });

    const result = verifyToken(rf_cookie);
    if (!result) return res.status(HttpStatus['BadRequest']).json({ error: "Your token is incorrect or has expired. Please login again!" });

    const user = await User.findById(result.id);
    if (!user) return res.status(HttpStatus['BadRequest']).json({ error: "User does not exist." });

    const access_token = createAccessToken({ id: user._id });

    return res.status(HttpStatus['OK'])
      .json({
        access_token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      });

  } catch (error) {
    console.error("Error in accessToken API:", error);
    return res.status(HttpStatus['InternalServerError']).json({ error });

  }
}