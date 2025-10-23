package com.wasm

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.NativeModule

class WasmModule internal constructor(context: ReactApplicationContext) :
  WasmSpec(context), NativeModule {

  init {
    System.loadLibrary("polygen")
  }

  override fun getName(): String {
    return NAME
  }

  override external fun copyNativeHandle(holder: ReadableMap, from: ReadableMap): Boolean
  override external fun loadModule(holder: ReadableMap, moduleData: ReadableMap): WritableMap?
  override external fun unloadModule(module: ReadableMap)
  override external fun getModuleMetadata(module: ReadableMap): WritableMap?
  override external fun createModuleInstance(holder: ReadableMap, mod: ReadableMap, importObject: ReadableMap)
  override external fun destroyModuleInstance(instance: ReadableMap)
  override external fun createMemory(holder: ReadableMap, initial: Double, maximum: Double?)
  override external fun getMemoryBuffer(instance: ReadableMap): WritableMap?
  override external fun growMemory(instance: ReadableMap, delta: Double)
  override external fun createGlobal(holder: ReadableMap, descriptor: ReadableMap, initialValue: Double)
  override external fun getGlobalValue(instance: ReadableMap): Double
  override external fun setGlobalValue(instance: ReadableMap, newValue: Double)
  override external fun createTable(holder: ReadableMap, descriptor: ReadableMap, initial: ReadableMap?)
  override external fun growTable(instance: ReadableMap, delta: Double)
  override external fun getTableElement(instance: ReadableMap, index: Double): WritableMap?
  override external fun setTableElement(instance: ReadableMap, index: Double, value: ReadableMap)
  override external fun getTableSize(instance: ReadableMap): Double


  // Example method
  @ReactMethod
  fun multiply(a: Double, b: Double, promise: Promise) {
    promise.resolve(a * b)
  }

  override fun initialize() {}
  override fun onCatalystInstanceDestroy() {}
  override fun invalidate() {}

  companion object {
    const val NAME = "Polygen"

    init {
        try {
            System.loadLibrary("polygen")
        } catch (e: Exception) {
            System.err.println("Failed to load native library11111: " + e.message)
        }
    }
  }
}
