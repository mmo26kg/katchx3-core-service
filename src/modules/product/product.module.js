// Product module aggregator using BaseModule
import router from './product.controller.js';
import productService from './product.service.js';
import Product from './product.model.js';
import BaseModule from '../../common/interface/base.module.js';

export const ProductModule = new BaseModule({
    basePath: '/products',
    router,
    service: productService,
    model: Product,
    name: 'ProductModule',
});

export default ProductModule;
