import { Hono } from "hono";
import userRoutes from "../controller/user/user.routes";

const routes = new Hono();

routes.route("/users", userRoutes);

export default routes;
