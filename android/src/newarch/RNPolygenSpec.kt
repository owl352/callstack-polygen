package com.wasm

import com.facebook.react.bridge.ReactApplicationContext
import com.callstack.polygen.NativePolygenSpec

abstract class WasmSpec internal constructor(context: ReactApplicationContext) :
  NativePolygenSpec(context) {
}
