import { get } from 'http';
import { type } from 'os';

const container = {
    dependencies: {},
    instances: {}, // Cache cho singleton instances

    register(key, dependency) {
        this.dependencies[key] = dependency;
    },

    registerFactory(key, factory) {
        this.dependencies[key] = { type: 'factory', fn: factory };
    },

    registerClass(key, ClassDef) {
        this.dependencies[key] = (...args) => new ClassDef(...args);
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

    getWithArgs(key, ...args) {
        const dep = this.dependencies[key];
        if (!dep) throw new Error(`Dependency ${key} not found`);
        if (!args || !args.length) return this.get(key);

        // Không cache khi resolve bằng args
        if (dep?.type === 'factory') return dep.fn(...args);
        if (typeof dep === 'function') return dep(...args);
        return dep;
    },

    reset() {
        this.dependencies = {};
        this.instances = {};
    },
};

export default container;
