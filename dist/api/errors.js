"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkError = exports.CompileError = void 0;
/**
 * Thrown when a compilation error occurs.
 */
class CompileError extends Error {
    constructor(message, ...args) {
        super(message, ...args);
        this.name = 'CompileError';
    }
}
exports.CompileError = CompileError;
/**
 * Thrown when a linking error occurs.
 */
class LinkError extends Error {
    constructor(message, ...args) {
        super(message, ...args);
        this.name = 'LinkError';
    }
}
exports.LinkError = LinkError;
