import UserModule from './user/user.module.js';
import OrderModule from './order/order.module.js';

function registerAllModules() {
    let allModules = [];
    allModules.push(new UserModule());
    allModules.push(new OrderModule());
    return allModules;
    //     container.register('allModules', allModules);
}

export default registerAllModules;
