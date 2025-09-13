import { type } from 'os';

// const DIContainer = {
//     dependencies: new Map(),
//     register(name, factory) {
//         if (typeof factory !== 'function') {
//             throw new Error('Factory must be a function');
//         }
//         this.dependencies.set(name, factory);
//     },
//     resolve(name) {
//         const factory = this.dependencies.get(name);
//         if (!factory) {
//             throw new Error(`Dependency '${name}' not found`);
//         }
//         return factory(this);
//     },
// };

// export default DIContainer;

const container = {
    dependencies: {},
    instances: {}, // Cache cho singleton instances

    register(key, dependency) {
        this.dependencies[key] = dependency;
    },

    registerFactory(key, factory) {
        this.dependencies[key] = { type: 'factory', fn: factory };
    },

    get(key) {
        const dep = this.dependencies[key];
        if (!dep) {
            throw new Error(`Dependency ${key} not found`);
        }

        // Nếu đã có instance cached, trả về
        if (this.instances[key]) {
            return this.instances[key];
        }

        let instance;

        if (dep.type === 'factory') {
            // Factory function - invoke và cache result
            instance = dep.fn();
        } else if (typeof dep === 'function') {
            // Function dependency - invoke
            instance = dep();
        } else {
            // Direct value/object
            instance = dep;
        }

        // Cache instance
        this.instances[key] = instance;
        return instance;
    },
};

export default container;
