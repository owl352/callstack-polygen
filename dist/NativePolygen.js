"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NativeSymbolKind = exports.NativeTableElementType = exports.NativeType = void 0;
const react_native_1 = require("react-native");
/**
 * WebAssembly type
 */
var NativeType;
(function (NativeType) {
    NativeType[NativeType["I32"] = 0] = "I32";
    NativeType[NativeType["U32"] = 1] = "U32";
    NativeType[NativeType["I64"] = 2] = "I64";
    NativeType[NativeType["U64"] = 3] = "U64";
    NativeType[NativeType["F32"] = 4] = "F32";
    NativeType[NativeType["F64"] = 5] = "F64";
})(NativeType || (exports.NativeType = NativeType = {}));
/**
 * WebAssembly Table element type
 */
var NativeTableElementType;
(function (NativeTableElementType) {
    NativeTableElementType[NativeTableElementType["AnyFunc"] = 0] = "AnyFunc";
    NativeTableElementType[NativeTableElementType["ExternRef"] = 1] = "ExternRef";
})(NativeTableElementType || (exports.NativeTableElementType = NativeTableElementType = {}));
/**
 * @spec https://webassembly.github.io/spec/js-api/index.html#modules
 */
var NativeSymbolKind;
(function (NativeSymbolKind) {
    NativeSymbolKind["Function"] = "function";
    NativeSymbolKind["Table"] = "table";
    NativeSymbolKind["Memory"] = "memory";
    NativeSymbolKind["Global"] = "global";
})(NativeSymbolKind || (exports.NativeSymbolKind = NativeSymbolKind = {}));
exports.default = react_native_1.TurboModuleRegistry.getEnforcing('Polygen');
