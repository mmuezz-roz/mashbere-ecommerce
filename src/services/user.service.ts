import User, { IUser } from '@/models/User';
import connectDB from '@/lib/mongoose';
import bcrypt from 'bcryptjs';

export class UserService {
  static async createUser(data: Partial<IUser>) {
    await connectDB();
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    const user = new User(data);
    return await user.save();
  }

  static async getUserByEmail(email: string) {
    await connectDB();
    return await User.findOne({ email }).select('+password');
  }

  static async getUserById(id: string) {
    await connectDB();
    return await User.findById(id);
  }

  static async updateUser(id: string, data: Partial<IUser>) {
    await connectDB();
    return await User.findByIdAndUpdate(id, data, { new: true });
  }
}
