import { Module } from './Module';
import type { ImportObject } from './WebAssembly';
export declare class Instance {
    #private;
    exports: any;
    private memories;
    private tables;
    constructor(module: Module, imports?: ImportObject);
}
//# sourceMappingURL=Instance.d.ts.map