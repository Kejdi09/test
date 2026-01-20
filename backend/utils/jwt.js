import jwt from 'jsonwebtoken';

const getJwtSecret = () => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    console.error('❌ ERROR: JWT_SECRET environment variable is required!');
    console.error('Please set JWT_SECRET in your .env file or environment variables.');
    process.exit(1);
  }
  return JWT_SECRET;
};

const JWT_EXPIRES_IN = '7d';

export const generateToken = (userId) => {
  return jwt.sign({ userId }, getJwtSecret(), { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, getJwtSecret());
  } catch (error) {
    return null;
  }
};
