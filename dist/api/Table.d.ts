import { type OpaqueTableNativeHandle } from '../NativePolygen';
/**
 * Object describing table metadata
 *
 * This object specifies table details and is used when creating
 * table object from JavaScript code.
 */
export interface TableDescriptor {
    /**
     * String representing table element type.
     */
    element: 'anyfunc' | 'externref';
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
export declare class Table {
    constructor(instance: OpaqueTableNativeHandle | TableDescriptor, value?: any);
    get length(): number;
    grow(delta: number): void;
    get(index: number): unknown;
    set(index: number, value: any): void;
}
//# sourceMappingURL=Table.d.ts.map