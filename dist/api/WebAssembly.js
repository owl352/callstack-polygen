"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
exports.compile = compile;
exports.compileStreaming = compileStreaming;
exports.instantiate = instantiate;
exports.instantiateStreaming = instantiateStreaming;
const Instance_1 = require("./Instance");
const Module_1 = require("./Module");
/**
 * Validates the specified WebAssembly binary module.
 *
 * As all WebAssembly modules must be known at compile-time and pre-compiled,
 * instead of passing module contents, we are accepting a module name
 * prefixed with magic number.
 *
 * @param bufferOrView ArrayBuffer or DataView containing the WebAssembly module to validate
 */
function validate(_bufferOrView) {
    // TODO: move this to Native side
    // const view = ArrayBuffer.isView(bufferOrView)
    //   ? (bufferOrView as DataView)
    //   : new DataView(bufferOrView);
    // const isCorrect =
    // view.getInt8(0) === MAGIC[0] && view.getInt8(1) === MAGIC[1];
    // if (!isCorrect) {
    //   console.warn(
    //     '[polygen] Validation of WebAssembly module failed. Only precompiled modules are allowed.'
    //   );
    // }
    return true;
}
/**
 * Compiles the provided WebAssembly binary module.
 *
 * @param bufferOrView ArrayBuffer or DataView containing the WebAssembly module to compile
 * @return A WebAssemblyModule instance constructed from the binary data.
 */
async function compile(bufferOrView) {
    return new Module_1.Module(ArrayBuffer.isView(bufferOrView) ? bufferOrView.buffer : bufferOrView);
}
async function compileStreaming(source) {
    const response = await source;
    const buffer = await response.arrayBuffer();
    return compile(buffer);
}
async function instantiate(source, imports = {}) {
    if (source instanceof Module_1.Module) {
        return new Instance_1.Instance(source, imports);
    }
    else {
        const module = await compile(source);
        return new Instance_1.Instance(module, imports);
    }
}
async function instantiateStreaming(source, importObject) {
    const module = await compileStreaming(source);
    const instance = instantiate(module, importObject);
    // @ts-ignore
    return { module, instance };
}
