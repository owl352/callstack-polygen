"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../types/WebAssembly-global.d.ts" preserve="true" />
const polygen_1 = require("@callstack/polygen");
global.WebAssembly = Object.freeze(polygen_1.WebAssembly);
// TODO: remove
// @ts-ignore
globalThis.WebAssembly = Object.freeze(polygen_1.WebAssembly);
