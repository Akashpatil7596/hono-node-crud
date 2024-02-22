import { z } from "zod";

const createUserSchema = z.object({
    username: z.string(),
    email: z.string(),
    password: z.string(),
    age: z.string(),
    salary: z.string(),
});

const loginUserSchema = z.object({
    email: z.string(),
    password: z.string(),
});

export { createUserSchema, loginUserSchema };
