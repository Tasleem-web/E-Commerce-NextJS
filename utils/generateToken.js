import jwt from 'jsonwebtoken';

export const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
}

export const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

export const verifyToken = (token, secret = process.env.REFRESH_TOKEN_SECRET) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}