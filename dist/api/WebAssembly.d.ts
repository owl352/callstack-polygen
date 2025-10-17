import type { BufferSource } from '../types';
import { Instance } from './Instance';
import { Module } from './Module';
/**
 * Type representing object with imports
 */
export type ImportObject = Record<string, any>;
/**
 * Validates the specified WebAssembly binary module.
 *
 * As all WebAssembly modules must be known at compile-time and pre-compiled,
 * instead of passing module contents, we are accepting a module name
 * prefixed with magic number.
 *
 * @param bufferOrView ArrayBuffer or DataView containing the WebAssembly module to validate
 */
export declare function validate(_bufferOrView: BufferSource): boolean;
/**
 * Compiles the provided WebAssembly binary module.
 *
 * @param bufferOrView ArrayBuffer or DataView containing the WebAssembly module to compile
 * @return A WebAssemblyModule instance constructed from the binary data.
 */
export declare function compile(bufferOrView: BufferSource): Promise<Module>;
export declare function compileStreaming(source: Response | PromiseLike<Response>): Promise<Module>;
export declare function instantiate(source: Module | BufferSource, imports?: ImportObject): Promise<Instance>;
export interface WebAssemblyInstantiatedSource {
    instance: Instance;
    module: Module;
}
export declare function instantiateStreaming(source: Response | PromiseLike<Response>, importObject?: ImportObject): Promise<WebAssemblyInstantiatedSource>;
//# sourceMappingURL=WebAssembly.d.ts.map