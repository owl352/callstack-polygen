"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Instance_imports;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instance = void 0;
const NativePolygen_1 = __importDefault(require("../NativePolygen"));
const Global_1 = require("./Global");
const Memory_1 = require("./Memory");
const Module_1 = require("./Module");
const Table_1 = require("./Table");
const errors_1 = require("./errors");
class Instance {
    constructor(module, imports = {}) {
        // @ts-ignore
        _Instance_imports.set(this, void 0);
        this.memories = {};
        this.tables = {};
        __classPrivateFieldSet(this, _Instance_imports, imports, "f");
        if (module instanceof Module_1.Module) {
            validateImports(imports, module.metadata);
        }
        else {
            throw new TypeError('Invalid module type');
        }
        NativePolygen_1.default.createModuleInstance(this, module, imports);
        for (const memoryName in this.memories) {
            this.exports[memoryName] = new Memory_1.Memory(this.memories[memoryName]);
        }
        for (const tableName in this.tables) {
            this.exports[tableName] = new Table_1.Table(this.tables[tableName]);
        }
    }
}
exports.Instance = Instance;
_Instance_imports = new WeakMap();
function validateImports(imports, metadata) {
    for (const importDesc of metadata.imports) {
        const mod = imports[importDesc.module];
        if (!mod) {
            throw new errors_1.LinkError(`Imported module ${importDesc.module} is not provided`);
        }
        const value = mod[importDesc.name];
        if (!value) {
            throw new errors_1.LinkError(`Imported symbol ${importDesc.module}.${importDesc.name} is not provided`);
        }
        switch (importDesc.kind) {
            case 'function':
                if (typeof value !== 'function') {
                    throw new TypeError(`Imported symbol ${importDesc.module}.${importDesc.name} is not a function`);
                }
                break;
            case 'global':
                if (!(value instanceof Global_1.Global)) {
                    throw new TypeError(`Imported symbol ${importDesc.module}.${importDesc.name} is not a global`);
                }
                break;
            case 'memory':
                if (!(value instanceof Memory_1.Memory)) {
                    throw new TypeError(`Imported symbol ${importDesc.module}.${importDesc.name} is not a memory`);
                }
                break;
            case 'table':
                throw new Error('Importing tables is not yet supported');
        }
    }
}
