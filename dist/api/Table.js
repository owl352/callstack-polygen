"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = void 0;
const NativePolygen_1 = __importStar(require("../NativePolygen"));
/**
 * Helper function checking if specified object is a TableDescriptor.
 *
 * @param descriptor Object to check
 */
function isTableDescriptor(descriptor) {
    return 'element' in descriptor && 'initial' in descriptor;
}
/**
 * @spec https://webassembly.github.io/spec/js-api/index.html#memories
 */
class Table {
    constructor(instance, value) {
        if (isTableDescriptor(instance)) {
            NativePolygen_1.default.createTable(this, {
                element: instance.element === 'anyfunc'
                    ? NativePolygen_1.NativeTableElementType.AnyFunc
                    : NativePolygen_1.NativeTableElementType.ExternRef,
                initialSize: instance.initial,
                maxSize: instance.maximum,
            }, value);
        }
        else {
            if (!NativePolygen_1.default.copyNativeHandle(this, instance)) {
                throw new Error('Invalid object passed to WebAssembly.Table() constructor');
            }
        }
    }
    get length() {
        return NativePolygen_1.default.getTableSize(this);
    }
    grow(delta) {
        NativePolygen_1.default.growTable(this, delta);
    }
    get(index) {
        return NativePolygen_1.default.getTableElement(this, index);
    }
    set(index, value) {
        if (value == null || typeof value !== 'object') {
            return;
        }
        NativePolygen_1.default.setTableElement(this, index, value);
    }
}
exports.Table = Table;
