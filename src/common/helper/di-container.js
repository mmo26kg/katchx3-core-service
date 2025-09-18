function loggerDependencyError(err) {
    console.error('Dependency error:', err.message);
    throw err;
}

const container = {
    dependencies: {},
    instances: {}, // Cache cho singleton instances

    register(key, dependency) {
        this.dependencies[key] = dependency;
    },

    registerFactory(key, factory) {
        this.dependencies[key] = { type: 'factory', fn: factory };
    },
    registerMiddleware(key, middleware) {
        this.dependencies[key] = { type: 'middleware', fn: middleware };
    },
    registerClass(key, ClassDef) {
        this.dependencies[key] = (...args) => new ClassDef(...args);
    },

    get(key) {
        if (!key || typeof key !== 'string') {
            loggerDependencyError(new Error('Dependency key must be a non-empty string'));
            throw new Error('Dependency key must be a non-empty string');
        }

        const dep = this.dependencies[key];
        if (!dep) {
            const availableKeys = Object.keys(this.dependencies);
            loggerDependencyError(
                new Error(
                    `Dependency [${key}] not found. Available keys are: [${availableKeys.join(', ')}]`
                )
            );
            throw new Error(`Dependency [${key}] not found`);
        }

        // Nếu đã có instance cached, trả về
        if (this.instances[key]) {
            return this.instances[key];
        }

        let instance;
        try {
            if (dep?.type === 'factory') {
                // Factory function - invoke và cache result
                instance = dep.fn();
            } else if (dep?.type === 'middleware') {
                instance = dep.fn;
            } else if (typeof dep === 'function') {
                // Function dependency - invoke
                instance = dep();
            } else {
                // Direct value/object
                instance = dep;
            }
        } catch (err) {
            loggerDependencyError(new Error(`Failed to resolve dependency ${key}: ${err.message}`));
            throw err;
        }

        if (instance === undefined || instance === null) {
            loggerDependencyError(new Error(`Resolved dependency ${key} is invalid: ${instance}`));
            throw new Error(`Resolved dependency ${key} is invalid`);
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
