import connectDB from '../../../utils/connectDB';
import User from '../../../models/userModel';
import { HttpStatus } from '../constants';
import auth from '../../../middleware/auth';
import bcrypt from 'bcrypt';

connectDB();
export default async (req, res) => {
  switch (req.method) {
    case 'PATCH':
      await resetPassword(req, res);
      break;

    default:
      break;
  }
}

const resetPassword = async (req, res) => {
  try {
    const result = await auth(req, res);

    if (!result) return res.status(HttpStatus['Forbidden']).json({ message: 'Invalid Authentication' });

    const { password } = req.body;

    const passwordHash = await bcrypt.hash(password, 12);

    await User.findOneAndUpdate({ _id: result.id }, { password: passwordHash });

    return res.status(HttpStatus['Accepted']).json({ message: 'Update success!' });
  } catch (error) {
    return res.status(HttpStatus['InternalServerError']).json({ message: error.message });
  }
}
