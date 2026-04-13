import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { ApiResponse } from './api-response';

export interface AdminPayload {
  id: string;
  email: string;
  name: string;
  role: string;
}

type AdminAuthResult =
  | { error: ReturnType<typeof ApiResponse.error>; user: null }
  | { error: null; user: AdminPayload };

/**
 * Admin-only guard.
 * Reads `auth-token` cookie, verifies the JWT, and asserts role === 'admin'.
 * Returns either an error Response or the decoded payload.
 */
export async function requireAdmin(req: NextRequest): Promise<AdminAuthResult> {
  const token = req.cookies.get('auth-token')?.value;

  if (!token) {
    return { error: ApiResponse.error('Authentication required', 401), user: null };
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return { error: ApiResponse.error('Server configuration error', 500), user: null };
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as AdminPayload;

    if (decoded.role !== 'admin') {
      return { error: ApiResponse.error('Admin access required. Forbidden.', 403), user: null };
    }

    return { error: null, user: decoded };
  } catch {
    return { error: ApiResponse.error('Invalid or expired session', 401), user: null };
  }
}
