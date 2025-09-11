import { type } from 'os';

const DIContainer = {
    dependencies: new Map(),
    register(name, factory) {
        if (typeof factory !== 'function') {
            throw new Error('Factory must be a function');
        }
        this.dependencies.set(name, factory);
    },
    resolve(name) {
        const factory = this.dependencies.get(name);
        if (!factory) {
            throw new Error(`Dependency '${name}' not found`);
        }
        return factory(this);
    },
};

export default DIContainer;
