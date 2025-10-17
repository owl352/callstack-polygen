import { type InternalModuleMetadata, type ModuleExportDescriptor, type ModuleImportDescriptor } from '../NativePolygen';
/**
 * @spec https://webassembly.github.io/spec/js-api/index.html#modules
 */
export declare class Module {
    metadata: InternalModuleMetadata;
    constructor(buffer: ArrayBuffer);
    static imports(mod: Module): ModuleImportDescriptor[];
    static exports(mod: Module): ModuleExportDescriptor[];
}
//# sourceMappingURL=Module.d.ts.map