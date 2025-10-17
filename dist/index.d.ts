import { Global } from './api/Global';
import { Instance } from './api/Instance';
import { Memory } from './api/Memory';
import { Module } from './api/Module';
import { Table } from './api/Table';
import { compile, compileStreaming, instantiate, instantiateStreaming, validate } from './api/WebAssembly';
import { CompileError, LinkError } from './api/errors';
declare const impl: {
    readonly compile: typeof compile;
    readonly compileStreaming: typeof compileStreaming;
    readonly instantiate: typeof instantiate;
    readonly instantiateStreaming: typeof instantiateStreaming;
    readonly validate: typeof validate;
    readonly Module: typeof Module;
    readonly Instance: typeof Instance;
    readonly Memory: typeof Memory;
    readonly Global: typeof Global;
    readonly Table: typeof Table;
    readonly CompileError: typeof CompileError;
    readonly LinkError: typeof LinkError;
};
export type Schema = typeof impl;
export declare const WebAssembly: {
    readonly compile: typeof compile;
    readonly compileStreaming: typeof compileStreaming;
    readonly instantiate: typeof instantiate;
    readonly instantiateStreaming: typeof instantiateStreaming;
    readonly validate: typeof validate;
    readonly Module: typeof Module;
    readonly Instance: typeof Instance;
    readonly Memory: typeof Memory;
    readonly Global: typeof Global;
    readonly Table: typeof Table;
    readonly CompileError: typeof CompileError;
    readonly LinkError: typeof LinkError;
};
export {};
//# sourceMappingURL=index.d.ts.map