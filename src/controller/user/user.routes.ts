import { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";
import { UserController } from "./user.controller";
import { createUserSchema, loginUserSchema } from "./user.dto";

async function middleWare(c: any, next: any) {
    console.log("Hello From Middleware : 1");
    await next();
}

async function middleWare2(c: any, next: any) {
    console.log("Hello From Middleware : 2");
    await next();
}

const userRoutes = new Hono();

userRoutes.post("/create", middleWare, middleWare2, zValidator("form", createUserSchema), UserController.store);

userRoutes.post("/login", zValidator("json", loginUserSchema), UserController.login);

export default userRoutes;
