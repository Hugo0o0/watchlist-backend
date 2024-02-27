import { checkSchema } from "express-validator";

export const emailLoginValidation = () =>
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
      escape: true,
      notEmpty: {
        errorMessage: "Password is required",
        bail: true,
      },
    },
  });
