import { z } from "zod";

export const signupValidationSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: "This field is required",
    })
    .max(20, {
      message: "Username must be at most 20 characters",
    }),
  email: z
    .string()
    .min(1, {
      message: "This field is required",
    })
    .email({
      message: "Please enter a valid email",
    }),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters",
    })
    .max(20, {
      message: "Password must be at most 20 characters",
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_]).+$/, {
      message:
        "password must have at least 1 capital letter, 1 small letter, 1 number and 1 special character",
    }),
  
});


