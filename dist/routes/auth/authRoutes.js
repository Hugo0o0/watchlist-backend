"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../../controllers/auth/authController");
const emailLoginValidation_1 = require("../../utils/validation/auth/emailLoginValidation");
const emailRegisterValidation_1 = require("../../utils/validation/auth/emailRegisterValidation");
const router = (0, express_1.Router)();
router.post("/auth/login/email", (0, emailLoginValidation_1.emailLoginValidation)(), authController_1.emailLogin);
router.post("/auth/register/email", (0, emailRegisterValidation_1.emailRegisterValidation)(), authController_1.emailRegister);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map