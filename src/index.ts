import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

import { myDataSource } from "../config/database";
import routes from "./routes";
import { serveStatic } from "@hono/node-server/serve-static";

const app = new Hono();

myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err: any) => {
        console.error("Error during Data Source initialization:", err);
    });

app.use(
    "*",
    cors({
        origin: "http://localhost:4200",
        // allowHeaders: ["Content-Type", "Authorization"],
        // allowMethods: ["POST", "GET", "OPTIONS"],
        // exposeHeaders: ["Content-Length"],
        // maxAge: 600,
        // credentials: true,
    })
);

app.use("/public/*", serveStatic({ root: "./" }));

app.route("/api/v1", routes);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
    fetch: app.fetch,
    port,
});
