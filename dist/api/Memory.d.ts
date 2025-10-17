import { type OpaqueMemoryNativeHandle } from '../NativePolygen';
/**
 * Object describing memory metadata
 *
 * This object specifies memory details and is used when creating
 * memory object from JavaScript code.
 */
export interface MemoryDescriptor {
    /**
     * Initial number of pages.
     */
    initial: number;
    /**
     * Maximum number of pages for this memory.
     */
    maximum?: number;
}
/**
 * @spec https://webassembly.github.io/spec/js-api/index.html#memories
 */
export declare class Memory {
    constructor(instance: OpaqueMemoryNativeHandle | MemoryDescriptor);
    get buffer(): object;
    grow(delta: number): void;
}
//# sourceMappingURL=Memory.d.ts.map