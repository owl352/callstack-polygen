package com.wasm

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.turbomodule.core.interfaces.TurboModule

abstract class WasmSpec internal constructor(context: ReactApplicationContext) :
  NativeWasmSpec(context), TurboModule {
}
