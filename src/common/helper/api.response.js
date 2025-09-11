// Simple standardized API response envelope
export default class ApiResponse {
    constructor({ success = true, data = null, meta, message, error } = {}) {
        this.success = success;
        this.data = data;
        if (meta !== undefined) this.meta = meta;
        if (message !== undefined) this.message = message;
        if (error !== undefined) this.error = error;
    }

    static ok(data, meta, message) {
        return new ApiResponse({ success: true, data, meta, message });
    }

    static created(data, meta, message) {
        const r = new ApiResponse({ success: true, data, meta, message });
        r._status = 201;
        return r;
    }

    static fail(message, error, meta) {
        return new ApiResponse({ success: false, data: null, meta, message, error });
    }

    static notFound(message = 'Not Found', meta) {
        const r = new ApiResponse({ success: false, data: null, meta, message });
        r._status = 404;
        return r;
    }

    static unauthorized(message = 'Unauthorized', meta) {
        const r = new ApiResponse({ success: false, data: null, meta, message });
        r._status = 401;
        return r;
    }

    static forbidden(message = 'Forbidden', meta) {
        const r = new ApiResponse({ success: false, data: null, meta, message });
        r._status = 403;
        return r;
    }

    static badRequest(message = 'Bad Request', error, meta) {
        const r = new ApiResponse({ success: false, data: null, meta, message, error });
        r._status = 400;
        return r;
    }

    static serverError(message = 'Internal Server Error', error, meta) {
        const r = new ApiResponse({ success: false, data: null, meta, message, error });
        r._status = 500;
        return r;
    }

    withStatus(status) {
        this._status = status;
        return this;
    }

    toJSON() {
        const { success, data, meta, message, error } = this;
        const out = { success, data };
        if (meta !== undefined) out.meta = meta;
        if (message !== undefined) out.message = message;
        if (error !== undefined) out.error = error;
        return out;
    }

    send(res, status) {
        const code = status ?? this._status ?? (this.success ? 200 : 400);
        return res.status(code).json(this);
    }
}

export const ok = (data, meta, message) => ApiResponse.ok(data, meta, message);
export const created = (data, meta, message) => ApiResponse.created(data, meta, message);
export const fail = (message, error, meta) => ApiResponse.fail(message, error, meta);
export const notFound = (message, meta) => ApiResponse.notFound(message, meta);
export const unauthorized = (message, meta) => ApiResponse.unauthorized(message, meta);
export const forbidden = (message, meta) => ApiResponse.forbidden(message, meta);
export const badRequest = (message, error, meta) => ApiResponse.badRequest(message, error, meta);
export const serverError = (message, error, meta) => ApiResponse.serverError(message, error, meta);
