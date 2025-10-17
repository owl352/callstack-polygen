import { type OpaqueMemoryNativeHandle } from '../NativePolygen';
import type { WebAssemblyType } from '../types';
/**
 * Object describing global metadata
 *
 * This object specifies global variable details and is used when creating
 * global variable from JavaScript code.
 */
export interface GlobalDescriptor {
    /**
     * Type of the GlobalVariable.
     */
    value: WebAssemblyType;
    /**
     * Whenever the variable can be changed. By default, this is false.
     */
    mutable?: boolean;
}
/**
 * @spec https://webassembly.github.io/spec/js-api/index.html#globals
 */
export declare class Global {
    constructor(instance: OpaqueMemoryNativeHandle | GlobalDescriptor, initialValue?: number);
    get value(): number;
    set value(newValue: number);
}
//# sourceMappingURL=Global.d.ts.map