import bcrypt from 'bcryptjs';
import { createUser, findUserByEmail, toPublicUser } from '../models/userModel.js';
import { signAccessToken } from '../utils/token-generator.js';

export async function register({ email, password, name }) {
  const existing = findUserByEmail(email);
  if (existing) {
    const error = new Error('EMAIL_ALREADY_EXISTS');
    error.statusCode = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = createUser({ email, name, passwordHash });
  const token = signAccessToken({ sub: user.id, email: user.email });

  return { user: toPublicUser(user), token };
}

export async function login({ email, password }) {
  const user = findUserByEmail(email);
  if (!user) {
    const error = new Error('INVALID_CREDENTIALS');
    error.statusCode = 401;
    throw error;
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    const error = new Error('INVALID_CREDENTIALS');
    error.statusCode = 401;
    throw error;
  }

  const token = signAccessToken({ sub: user.id, email: user.email });
  return { user: toPublicUser(user), token };
}

