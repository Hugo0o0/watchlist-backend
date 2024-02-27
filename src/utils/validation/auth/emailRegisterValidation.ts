import { checkSchema } from "express-validator";

export const emailRegisterValidation = () =>
  checkSchema({
    email: {
      in: ["body"],
      notEmpty: {
        errorMessage: "Email is required",
        bail: true,
      },
      isEmail: {
        errorMessage: "Email is not valid",
        bail: true,
      },
      escape: true,
    },
    password: {
      in: ["body"],
      notEmpty: {
        errorMessage: "Password is required",
        bail: true,
      },
      isStrongPassword: {
        errorMessage:
          "Password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character",
        bail: true,
      },
      escape: true,
    },
  });
