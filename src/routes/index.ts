import { Router } from 'express';
import user from './user.routes';
import * as userController from '../controllers/user.controller';
import * as optmizeController from '../controllers/optmize.controller';
import { jwtToken } from '../middlewares/headers.middleware';
const router = Router();

router.use('/user', user);
router.get('/random-joke', jwtToken, userController.randomJoke);
router.get('/optmize-data', optmizeController.optmize);
export default router;
