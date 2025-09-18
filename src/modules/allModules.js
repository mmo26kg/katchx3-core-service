import UserExpenseModule from './userExpense/userExpense.module.js';
function registerAllModules() {
    let allModules = [];
    allModules.push(new UserExpenseModule());
    return allModules;
}

export default registerAllModules;
