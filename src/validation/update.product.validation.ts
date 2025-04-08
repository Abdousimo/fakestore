import {z} from "zod";

export const updateProductValidationSchema = z.object({
    title: z.string(),
    price: z.coerce.number(),
    description: z.string(),
    category: z.string(),
  });

  
    
    