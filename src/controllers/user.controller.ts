import { UserService } from '@/services/user.service';
import { ApiResponse, ApiError } from '@/lib/api-response';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const ONE_DAY_IN_SECONDS = 60 * 60 * 24;

export class UserController {
  static async register(req: Request) {
    try {
      const body = await req.json();
      const validatedData = registerSchema.parse(body);

      const existingUser = await UserService.getUserByEmail(validatedData.email);
      if (existingUser) {
        throw new ApiError('An account with this email already exists', 400);
      }

      const user = await UserService.createUser(validatedData);
      const userObj = user.toObject();
      delete userObj.password;

      return ApiResponse.success(
        { id: userObj._id, name: userObj.name, email: userObj.email, role: userObj.role },
        'Account created successfully',
        201
      );
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        return ApiResponse.error('Validation failed', 400, error.errors);
      }
      if (error instanceof ApiError) {
        return ApiResponse.error(error.message, error.statusCode);
      }
      const msg = error instanceof Error ? error.message : 'Registration failed';
      console.error('[REGISTER ERROR]', error);
      return ApiResponse.error(msg, 500);
    }
  }

  static async login(req: Request) {
    try {
      const body = await req.json();
      const { email, password } = loginSchema.parse(body);

      const user = await UserService.getUserByEmail(email);
      if (!user || !user.password) {
        throw new ApiError('Invalid email or password', 401);
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new ApiError('Invalid email or password', 401);
      }

      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error('JWT_SECRET is not configured');
      }

      const payload = { id: user._id.toString(), email: user.email, name: user.name, role: user.role };

      const token = jwt.sign(payload, jwtSecret, { expiresIn: '1d' });

      // Set HTTP-only cookie valid for 1 day
      const cookieStore = await cookies();
      cookieStore.set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: ONE_DAY_IN_SECONDS,
        path: '/',
      });

      return ApiResponse.success(
        { id: user._id, name: user.name, email: user.email, role: user.role },
        'Logged in successfully'
      );
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        return ApiResponse.error('Validation failed', 400, error.errors);
      }
      if (error instanceof ApiError) {
        return ApiResponse.error(error.message, error.statusCode);
      }
      const msg = error instanceof Error ? error.message : 'Login failed';
      console.error('[LOGIN ERROR]', error);
      return ApiResponse.error(msg, 500);
    }
  }

  static async getMe(req: Request) {
    try {
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) throw new ApiError('Server configuration error', 500);

      const cookieStore = await cookies();
      const token = cookieStore.get('auth-token')?.value;
      if (!token) throw new ApiError('Not authenticated', 401);

      const decoded = jwt.verify(token, jwtSecret) as { id: string; email: string; name: string; role: string };

      const user = await UserService.getUserById(decoded.id);
      if (!user) throw new ApiError('User no longer exists', 401);

      return ApiResponse.success(
        { id: user._id, name: user.name, email: user.email, role: user.role }
      );
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        return ApiResponse.error(error.message, error.statusCode);
      }
      // JWT verification error
      return ApiResponse.error('Not authenticated', 401);
    }
  }

  static async logout() {
    const cookieStore = await cookies();
    cookieStore.delete('auth-token');
    return ApiResponse.success(null, 'Logged out successfully');
  }
}
