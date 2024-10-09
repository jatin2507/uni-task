import { Router } from "express";
import user from "./user.routes";
import * as controller from "../controllers/user.controller";
import { jwtToken } from "../middlewares/headers.middleware";
const router = Router();

router.use("/users", user);
router.get("/random-joke", jwtToken, controller.randomJoke);
export default router;
