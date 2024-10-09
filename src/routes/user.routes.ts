import express from "express";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { userValidators } from "../validations/user.validator";
import * as controller from "../controllers/user.controller";
import { jwtToken } from "../middlewares/headers.middleware";
const router = express.Router();

router.post(
    "/singup",
    validationMiddleware("body", userValidators.signup),
    controller.signup
);

router.post(
    "/login",
    validationMiddleware("body", userValidators.login),
    controller.login
);

router.get("/logout", jwtToken, controller.logout);

router.get("/me", jwtToken, controller.retriveUser);



export default router;
