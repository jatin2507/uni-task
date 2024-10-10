import { ERRORS } from './const';

interface Response {
	error: boolean;
	message: string;
	data: any;
	code: number;
}

export const success = (data: any = {}, message: string = '', code: number = 200): Response => {
	return {
		error: false,
		message: message || 'Success',
		data,
		code,
	};
};

export const failed = (data: any = {}, message: string = '', code: number = 400): Response => {
	return {
		error: true,
		message: message || ERRORS[code],
		data,
		code,
	};
};

export const validation = (message: string = 'Bad Request', data: any = {}): Response => {
	return {
		error: true,
		message,
		code: 400,
		data,
	};
};
