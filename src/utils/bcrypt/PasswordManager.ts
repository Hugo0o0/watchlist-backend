import { compare, genSalt, hash as bcryptHash } from "bcrypt";
import { AppEror } from "../Error/AppError";
import { StatusCodes } from "@/@types";

class PasswordManager {
  public async compare(password: string, hashedPassword: string) {
    const passwordMatch = await compare(password, hashedPassword);
    if (!passwordMatch)
      throw new AppEror("Invalid password", StatusCodes.UNAUTHORIZED);
  }

  public async hash(password: string, saltRounds?: number) {
    const salt = await genSalt(saltRounds || 10);
    return await bcryptHash(password, salt);
  }
}

export default new PasswordManager();
