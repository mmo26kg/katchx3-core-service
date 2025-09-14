// import ProductModule from './product/product.module.js';
import UserModule from './user/user.module.js';

function registerAllModules(container) {
    // container.register('productModule', () => new ProductModule());
    container.registerClass('userModule', UserModule);
}

export default registerAllModules;
