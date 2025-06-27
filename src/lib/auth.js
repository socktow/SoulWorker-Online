import jwt from 'jsonwebtoken';
import { roles } from './permissions';

export function getUserFromToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return null;
  }
}

export function hasPermission(user, permission) {
  if (!user || !user.role) return false;
  return roles[user.role]?.can.includes(permission);
}
