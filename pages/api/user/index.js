import connectDB from '../../../utils/connectDB';
import User from '../../../models/userModel';
import { HttpStatus } from '../constants';
import auth from '../../../middleware/auth';
import bcrypt from 'bcrypt';

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case 'POST':
      await createUser(req, res);
      break;

    case 'GET':
      await getUser(req, res);
      break;

    case 'PATCH':
      await updateInfo(req, res);
      break;

    default:
      break;
  }
}

const updateInfo = async (req, res) => {
  try {
    const result = await auth(req, res);
    console.log(result)
    const { username, avatar } = req.body;

    const newUser = await User.findOneAndUpdate({ _id: result._id }, { username, avatar }).select('-password');

    return res.status(HttpStatus['Accepted']).json({ message: 'Update success', user: newUser });
  } catch (error) {
    return res.status(HttpStatus['InternalServerError']).json({ error: error.message });
  }
}

const createUser = async (req, res) => {
  try {
    const result = await auth(req, res);
  } catch (error) {
    return res.status(HttpStatus['InternalServerError']).json({ message: error.message });
  }
}

const getUser = async (req, res) => {
  try {
    const result = await auth(req, res);
    console.log(result)
  } catch (error) {
    return res.status(HttpStatus['InternalServerError']).json({ message: error.message });
  }
}