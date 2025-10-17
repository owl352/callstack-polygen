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
exports.Global = void 0;
const NativePolygen_1 = __importStar(require("../NativePolygen"));
/**
 * Helper function checking if specified object is a global descriptor.
 *
 * @param descriptor Object to check
 */
function isGlobalDescriptor(descriptor) {
    return 'value' in descriptor;
}
const TypeMapping = {
    i32: NativePolygen_1.NativeType.I32,
    u32: NativePolygen_1.NativeType.U32,
    i64: NativePolygen_1.NativeType.I64,
    u64: NativePolygen_1.NativeType.U64,
    f32: NativePolygen_1.NativeType.F32,
    f64: NativePolygen_1.NativeType.F64,
};
/**
 * @spec https://webassembly.github.io/spec/js-api/index.html#globals
 */
class Global {
    constructor(instance, initialValue) {
        if (isGlobalDescriptor(instance)) {
            NativePolygen_1.default.createGlobal(this, {
                type: TypeMapping[instance.value],
                isMutable: instance.mutable ?? false,
            }, initialValue ?? 0);
        }
        else {
            if (!NativePolygen_1.default.copyNativeHandle(this, instance)) {
                throw new Error('Invalid object passed to WebAssembly.Global() constructor');
            }
        }
    }
    get value() {
        return NativePolygen_1.default.getGlobalValue(this);
    }
    set value(newValue) {
        NativePolygen_1.default.setGlobalValue(this, newValue);
    }
}
exports.Global = Global;
