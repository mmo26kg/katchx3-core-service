// Minimal Product controller
import { Router } from 'express';
import { productService } from './product.service.js';
import baseRoute from '../../common/interface/base.route.js';

const router = Router();

baseRoute(router, productService, 'Product');

export default router;
