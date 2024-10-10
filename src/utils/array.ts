type Product = {
	id: number;
	sku: string;
	productName: string;
	category: number;
};

type Pricing = {
	sku: string;
	price: number;
};

type Category = {
	id: number;
	name: string;
};

export type MergedProduct = Product & { price: number };

export const productsArray: Product[] = [
	{
		id: 1,
		sku: 'abc',
		productName: 'name 1',
		category: 1,
	},
	{
		id: 2,
		sku: 'def',
		productName: 'name 2',
		category: 2,
	},
	{
		id: 3,
		sku: 'ghi',
		productName: 'name 1',
		category: 2,
	},
	{
		id: 4,
		sku: 'klm',
		productName: 'name 1',
		category: 3,
	},
	{
		id: 5,
		sku: 'xyz',
		productName: 'name 1',
		category: 1,
	},
];

export const pricingArray: Pricing[] = [
	{
		sku: 'abc',
		price: 10,
	},
	{
		sku: 'def',
		price: 20,
	},
	{
		sku: 'ghi',
		price: 30,
	},
	{
		sku: 'klm',
		price: 40,
	},
	{
		sku: 'xyz',
		price: 50,
	},
];

export const categoryArray: Category[] = [
	{ id: 1, name: 'category1' },
	{ id: 2, name: 'category2' },
	{ id: 3, name: 'category3' },
	{ id: 4, name: 'category4' },
	{ id: 5, name: 'category5' },
];
