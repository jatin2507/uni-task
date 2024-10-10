import { Request, Response } from 'express';
import { failed, success } from '../utils/response.utils';
import logger from '../loaders/logger.loader';
import { deleteOne, findOne, insertOne, updateOne } from '../utils/db';
import { collection } from '../utils/const';
import { callApi, createJwtToken, createUniqueToken, encryptPassword, verifyPassword } from '../utils';
import { extendedRequest } from '../interfaces/common.interfaces';

export const signup = async (req: Request, res: Response) => {
	try {
		let payload = req.body;
		let username = await findOne({
			collection: collection.users,
			query: {
				$or: [{ username: payload.username }, { email: payload.email }],
			},
			project: { _id: 1 },
		});
		if (username) {
			return res.status(400).send(failed({}, `username or email is already exists`, 400));
		}
		payload.password = await encryptPassword(payload.password);
		payload.loginToken = await createUniqueToken();
		let insertData = await insertOne({
			collection: collection.users,
			document: payload,
		});
		//this is also mange using Redis-cache memeory
		let token = createJwtToken({
			_id: insertData._id,
			token: payload.loginToken,
		});
		res.send(success({ token }, 'User created successfully'));
	} catch (error) {
		logger.error('!! signup !! Auth Code Failed !!');
		logger.error(error);
		return res.status(400).send(failed(error, '', 400));
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		let payload = req.body;

		let user = await findOne({
			collection: collection.users,
			query: {
				$or: [{ username: payload.usernameORemail }, { email: payload.usernameORemail }],
			},
		});
		if (!user) {
			return res.status(400).send(failed({}, 'Username or email not found', 400));
		}
		if (!(await verifyPassword(payload.password, user.password))) {
			return res.status(400).send(failed({}, 'Invalid password', 400));
		}
		let loginToken = await createUniqueToken();

		await updateOne({
			collection: collection.users,
			query: { _id: user._id },
			update: { loginToken },
		});
		let token = createJwtToken({
			_id: user._id,
			token: loginToken,
		});
		res.send(success({ token }, 'User login successfully'));
	} catch (error) {
		logger.error('!! login !! Auth Code Failed !!');
		logger.error(error);
		return res.status(400).send(failed(error, '', 400));
	}
};

export const logout = async (req: any, res: Response) => {
	try {
		let { _id } = req.user;
		await updateOne({
			collection: collection.users,
			query: { _id },
			update: { loginToken: '' },
		});
		res.send(success({}, 'User logout successfully'));
	} catch (error) {
		logger.error('!! logout !! Auth Code Failed !!');
		logger.error(error);
		return res.status(400).send(failed(error, '', 400));
	}
};

export const retriveUser = async (req: any, res: Response) => {
	try {
		let { _id } = req.user;
		let user = await findOne({
			collection: collection.users,
			query: { _id },
			project: { password: 0, loginToken: 0 },
		});
		delete user._id;
		delete user.password;
		delete user.loginToken;
		delete user.createdAt;
		delete user.updatedAt;
		delete user.__v;
		res.send(success(user, 'User retrived successfully'));
	} catch (error) {
		logger.error('!! retriveUser !! Auth Code Failed !!');
		logger.error(error);
		return res.status(400).send(failed(error, '', 400));
	}
};

export const randomJoke = async (req: Request, res: Response) => {
	try {
		let response: any = await callApi('https://api.chucknorris.io/jokes/random', 'GET');
		let jokes = response.value;
		res.send(success(jokes, 'Random jokes retrived successfully'));
	} catch (error) {
		logger.error('!! randomJokes !! Auth Code Failed !!');
		logger.error(error);
		return res.status(400).send(failed(error, '', 400));
	}
};
