import { Router } from "express";
import { emailLogin, emailRegister } from "@controllers/auth/authController";
import { emailLoginValidation } from "@/utils/validation/auth/emailLoginValidation";
import { emailRegisterValidation } from "@/utils/validation/auth/emailRegisterValidation";

const router = Router();

router.post("/auth/login/email", emailLoginValidation(), emailLogin);
router.post("/auth/register/email", emailRegisterValidation(), emailRegister);

export default router;
