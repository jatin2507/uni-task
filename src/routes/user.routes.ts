import express from 'express';
import { validationMiddleware } from '../middlewares/validation.middleware';
import { userValidators } from '../validations/user.validator';
import * as controller from '../controllers/user.controller';
import { jwtToken } from '../middlewares/headers.middleware';
const router = express.Router();

/**
 * @typedef singup
 * @property {string}
 * @property {string} username.required
 * @property {string} email.required
 * @property {string} password.required
 * @property {string} firstName.required
 * @property {string} lastName.required
 * @property {string} dateOfBirth.required
 * @property {string} phoneNumber.required
 * @property {string} address.required
 * @property {string} profilePicture
 */

/**
 * Sign up
 * @route POST /api/user/signup
 * @param {signup.model} signup.body.required
 * @group User - Operations about user
 * @returns {object} 200 - User created
 * @returns {Error}  default - Unexpected error
 */

router.post('/signup', validationMiddleware('body', userValidators.signup), controller.signup);

/**
 * @typedef login
 * @property {string} email
 * @property {string} username
 * @property {string} password.required
 */
/**
 * Login
 * @route POST /api/user/login
 * @param {login.model} login.body.required
 * @group User - Operations about user
 * @returns {object} 200 - User logged in
 * @returns {Error}  default - Unexpected error
 */

router.post('/login', validationMiddleware('body', userValidators.login), controller.login);

router.get('/logout', jwtToken, controller.logout);


/**
 * Me
 * @route GET /api/user/me
 * @group User - Operations about user
 * @param {string} authorization.header.required - Bearer token
 * @returns {object} 200 - User profile
 * @returns {Error}  default - Unexpected error
 */

router.get('/me', jwtToken, controller.retriveUser);

export default router;
