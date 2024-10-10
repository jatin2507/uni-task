import { Request, Response } from 'express';
import logger from '../loaders/logger.loader';
import { failed, success } from '../utils/response.utils';
import { pricingArray, productsArray, categoryArray, MergedProduct } from '../utils/array';
import { objectArgs } from '../interfaces/common.interfaces';

export const optmize = async (req: Request, res: Response) => {
	try {
		const pricingMap = pricingArray.reduce((acc: objectArgs, item) => {
			acc[item.sku] = item.price;
			return acc;
		}, {});

		const categoryMap = categoryArray.reduce((acc: objectArgs, item) => {
			acc[item.id] = item.name;
			return acc;
		}, {});

		const mergedProducts: MergedProduct[] = productsArray.map((product) => ({
			...product,
			price: pricingMap[product.sku]
		}));

		res.send(success(mergedProducts, 'Optmized data'));
	} catch (error) {
		logger.error('!! optmize !! Auth Code Failed !!');
		logger.error(error);
		return res.status(400).send(failed(error, '', 400));
	}
};
