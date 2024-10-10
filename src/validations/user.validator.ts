import Joi from 'joi';

let userValidators = {
	signup: Joi.object({
		username: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')).required().messages({
			'string.pattern.base': `Password must contain: At least one lowercase letter, At least one uppercase letter, At least one number, At least one special character (@$!%*?&), Minimum 8 characters.`,
			'any.required': 'Password is required.',
		}),
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		dateOfBirth: Joi.date().required().messages({
			'date.base': 'Date of birth must be a valid date. format: MM-DD-YYYY',
		}),
		phoneNumber: Joi.number().required(),
		address: Joi.string().required(),
		profilePicture: Joi.string(),
	}),
	login: Joi.object({
		usernameORemail: Joi.string(),
		password: Joi.string().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')).required().messages({
			'string.pattern.base': `Password must contain: At least one lowercase letter, At least one uppercase letter, At least one number, At least one special character (@$!%*?&), Minimum 8 characters.`,
			'any.required': 'Password is required.',
		}),
	})
};

export { userValidators };
