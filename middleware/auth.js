import jwt from "jsonwebtoken";
import User from '../models/userModel';

const auth = async (req, res) => {
  const token = req.headers.authorization;

  if (!token) return res.status(400).json({ error: { message: "Invalid Authentication." } });

  const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  if (!decode) return res.status(400).json({ error: { message: "Invalid Authentication." } });

  const user = await User.findOne({ _id: decode.id });

  return user;
}

export default auth;