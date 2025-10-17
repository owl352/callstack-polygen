"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebAssembly = void 0;
const Global_1 = require("./api/Global");
const Instance_1 = require("./api/Instance");
const Memory_1 = require("./api/Memory");
const Module_1 = require("./api/Module");
const Table_1 = require("./api/Table");
const WebAssembly_1 = require("./api/WebAssembly");
const errors_1 = require("./api/errors");
const impl = {
    compile: WebAssembly_1.compile,
    compileStreaming: WebAssembly_1.compileStreaming,
    instantiate: WebAssembly_1.instantiate,
    instantiateStreaming: WebAssembly_1.instantiateStreaming,
    validate: WebAssembly_1.validate,
    Module: Module_1.Module,
    Instance: Instance_1.Instance,
    Memory: Memory_1.Memory,
    Global: Global_1.Global,
    Table: Table_1.Table,
    CompileError: errors_1.CompileError,
    LinkError: errors_1.LinkError,
};
exports.WebAssembly = impl;
