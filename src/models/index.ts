import mongoose from "mongoose";
import { collection } from "../utils/const";
import { UserSchema } from "./user";

let schemas = {
    [collection.users]: mongoose.model("User", UserSchema),
};

export default schemas;