// Product service extending BaseService
import Product from './product.model.js';
import BaseService from '../../common/interface/base.service.js';

class ProductService extends BaseService {
  constructor() {
    super(Product);
  }
}

export const productService = new ProductService();
export default productService;
