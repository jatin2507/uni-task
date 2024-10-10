import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { config } from '../utils/config';
import path from 'path';
const swaggerLoader = (app: Express): void => {
	let swaggerPath = path.join(__dirname, '../../swagger/*.yaml');
	let url = `${config.server.protocol}://${config.server.host}:${config.server.port}/api`;
	const swaggerOptions = {
		swaggerDefinition: {
			openapi: '3.0.0',
			info: {
				title: 'API Documentation',
				version: '1.1.0',
				description: 'API documentation for your application',
			},
			servers: [
				{
					url,
					description: 'Local server',
				},
			],
		},
		apis: [swaggerPath],
	};

	const swaggerDocs = swaggerJSDoc(swaggerOptions);
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export default swaggerLoader;
