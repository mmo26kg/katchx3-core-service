// import ProductModule from './product/product.module.js';
import UserModule from './user/user.module.js';
import container from '../common/helper/di-container.js';

function registerAllModules() {
    // container.register('productModule', () => new ProductModule());
    container.registerClass('userModule', UserModule);
}

export default registerAllModules;
