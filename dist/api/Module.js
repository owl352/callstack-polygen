"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
const NativePolygen_1 = __importDefault(require("../NativePolygen"));
const errors_1 = require("./errors");
const MAGIC = new Uint8Array('CKWASM'.split('').map((e) => e.charCodeAt(0)));
/**
 * @spec https://webassembly.github.io/spec/js-api/index.html#modules
 */
class Module {
    constructor(buffer) {
        try {
            this.metadata = NativePolygen_1.default.loadModule(this, buffer);
        }
        catch (e) {
            throw new errors_1.CompileError(e.message);
        }
        if (!isFakeModule(buffer)) {
            // TODO: add documentation link
            console.warn('[polygen] Loaded a WebAssembly module from ArrayBuffer, use a loader plugin instead. ' +
                'This method is meant only for development purposes, ' +
                'and should not be used in production.');
        }
    }
    static imports(mod) {
        return mod.metadata.imports;
    }
    static exports(mod) {
        return mod.metadata.exports;
    }
}
exports.Module = Module;
function isFakeModule(buffer) {
    if (buffer.byteLength < 6) {
        return false;
    }
    const view = new DataView(buffer);
    return MAGIC.every((byte, i) => view.getUint8(i) === byte);
}
