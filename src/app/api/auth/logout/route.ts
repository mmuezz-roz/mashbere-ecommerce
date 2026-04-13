import { UserController } from '@/controllers/user.controller';

export async function POST() {
  return await UserController.logout();
}
