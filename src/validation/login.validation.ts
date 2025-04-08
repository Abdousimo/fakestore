import { z } from "zod";

export const loginValidationSchema = z.object({
  username: z
    .string({
      message: "This field is required",
    }),
  password: z.string(),
});