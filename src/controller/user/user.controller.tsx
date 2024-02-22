import { writeFileSync } from "fs";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { myDataSource } from "../../../config/database";
import { User } from "../../../models/Order.entity";
import { sign } from "hono/jwt";

const userRepository = myDataSource.getRepository(User);

const schema = z.object({
    name: z.string(),
});

export class UserController {
    static async store(c: any) {
        const data = await c.req.parseBody();
        const image = data.image;

        const isUserExist = await userRepository.findOne({
            where: { email: data.email },
        });

        if (isUserExist) {
            return c.json({
                error: true,
                message: "User already exists",
                data: {},
            });
        }

        //* For single Image
        // const imageData = await image.arrayBuffer();

        // const buffer = Buffer.from(imageData);

        // writeFileSync(`image.jpg`, buffer);

        //* For multiple Images
        // image.forEach(async (element: any, index: number) => {
        //     const imageData = await element.arrayBuffer();
        //     writeFileSync(`image${index}.jpg`, imageData);
        // });

        const newUser = userRepository.create(data);

        const saveUser = await userRepository.save(newUser);

        return c.json({
            error: false,
            message: "User stored successfully",
            data: saveUser,
        });
    }

    static async login(c) {
        const data = await c.req.json();

        const isUserExist: any = await userRepository.findOne({
            where: { email: data.email },
        });

        isUserExist.token = await sign({ id: isUserExist, name: isUserExist.username }, "I_AM_BATMAN");

        if (isUserExist) {
            return c.json({
                error: true,
                message: "User Detail",
                data: isUserExist,
            });
        } else {
            return c.json({
                error: true,
                message: "User Not Found",
                data: {},
            });
        }

        return c.text("Hello");
    }
}
