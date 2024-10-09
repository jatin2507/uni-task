import Joi from "joi";

let userValidators = {
    signup: Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string()
            .pattern(
                new RegExp(
                    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
                )
            )
            .required()
            .messages({
                "string.pattern.base": `Password must contain:
                 - At least one lowercase letter,
                 - At least one uppercase letter,
                 - At least one number,
                 - At least one special character (@$!%*?&),
                 - Minimum 8 characters.`,
                "any.required": "Password is required.",
            }),
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        dateOfBirth: Joi.date().required(),
        phoneNumber: Joi.string().required(),
        address: Joi.string().required(),
        profilePicture: Joi.string().required(),
        createdAt: Joi.date().required(),
        updatedAt: Joi.date().required(),
        lastLogin: Joi.date().optional(),
    }),
    login: Joi.object({
        email: Joi.string().email(),
        username: Joi.string(),
        password: Joi.string()
            .pattern(
                new RegExp(
                    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
                )
            )
            .required()
            .messages({
                "string.pattern.base": `Password must contain:
             - At least one lowercase letter,
             - At least one uppercase letter,
             - At least one number,
             - At least one special character (@$!%*?&),
             - Minimum 8 characters.`,
                "any.required": "Password is required.",
            }),
    }).or("email", "username"),
};

export { userValidators };
