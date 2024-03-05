import prisma from "@/prisma";
import { PrismaClient } from "@prisma/client";
import passwordManager from "@utils/bcrypt/PasswordManager";
import { AppEror } from "@utils/Error/AppError";
import { StatusCodes } from "@/@types";
import BadRequestError from "@utils/Error/BadRequestError";

class User {
  constructor(private readonly user: PrismaClient["user"]) {}

  public async login(email: string, password: string) {
    const isUserExist = await this.checkUserExists(email);
    if (!isUserExist)
      throw new AppEror("User not found", StatusCodes.NOT_FOUND);
    const user = await this.user.findUniqueOrThrow({ where: { email } });
    await passwordManager.compare(password, user.password);
    return user;
  }

  public async register(email: string, password: string) {
    const userExist = await this.checkUserExists(email);
    if (userExist) throw new BadRequestError("User already exists");
    return await this.user.create({
      data: {
        email,
        password: await passwordManager.hash(password),
      },
    });
  }

  private async checkUserExists(email: string) {
    const user = await this.user.findUnique({ where: { email } });
    if (user) {
      return true;
    }

    return false;
  }
}

const user = new User(prisma.user);
export default user;
