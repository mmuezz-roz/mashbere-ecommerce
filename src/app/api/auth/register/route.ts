import { UserController } from '@/controllers/user.controller';

export async function POST(req: Request) {
  return await UserController.register(req);
}
