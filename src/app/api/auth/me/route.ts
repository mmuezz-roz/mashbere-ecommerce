import { UserController } from '@/controllers/user.controller';

export async function GET(req: Request) {
  return await UserController.getMe(req);
}
