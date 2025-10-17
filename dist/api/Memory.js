"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Memory = void 0;
const NativePolygen_1 = __importDefault(require("../NativePolygen"));
/**
 * Helper function checking if specified object is a memory descriptor.
 *
 * @param descriptor Object to check
 */
function isMemoryDescriptor(descriptor) {
    return 'initial' in descriptor;
}
/**
 * @spec https://webassembly.github.io/spec/js-api/index.html#memories
 */
class Memory {
    constructor(instance) {
        if (isMemoryDescriptor(instance)) {
            NativePolygen_1.default.createMemory(this, instance.initial, instance.maximum);
        }
        else {
            if (!NativePolygen_1.default.copyNativeHandle(this, instance)) {
                throw new Error('Invalid object passed to WebAssembly.Memory() constructor');
            }
        }
    }
    get buffer() {
        return NativePolygen_1.default.getMemoryBuffer(this);
    }
    grow(delta) {
        NativePolygen_1.default.growMemory(this, delta);
    }
}
exports.Memory = Memory;
