package com.wasm

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import com.facebook.react.module.annotations.ReactModule

import com.callstack.polygen.NativePolygenSpec

@ReactModule(name = WasmSpec.NAME)
class WasmSpec(reactContext: ReactApplicationContext) : NativePolygenSpec(reactContext) {

    companion object {
        const val NAME = "Polygen"

        init {
            try {
                System.loadLibrary("polygen")
            } catch (e: Exception) {
                android.util.Log.e(NAME, "Failed to load native library 'polygen'", e)
            }
        }
    }

    override fun getName(): String {
        return NAME
    }

    // --- C++ module initialization ---
    external override fun initialize()
    external override fun invalidate()

    // --- Native methods that call C++ JNI functions ---

    external override fun copyNativeHandle(holder: ReadableMap, from: ReadableMap): Boolean

    external override fun loadModule(holder: ReadableMap, moduleData: ReadableMap): WritableMap?

    external override fun unloadModule(module: ReadableMap)

    external override fun getModuleMetadata(module: ReadableMap): WritableMap?

    external override fun createModuleInstance(holder: ReadableMap, mod: ReadableMap, importObject: ReadableMap)

    external override fun destroyModuleInstance(instance: ReadableMap)

    external override fun createMemory(holder: ReadableMap, initial: Double, maximum: Double?)

    external override fun getMemoryBuffer(instance: ReadableMap): WritableMap?

    external override fun growMemory(instance: ReadableMap, delta: Double)

    external override fun createGlobal(holder: ReadableMap, descriptor: ReadableMap, initialValue: Double)

    external override fun getGlobalValue(instance: ReadableMap): Double

    external override fun setGlobalValue(instance: ReadableMap, newValue: Double)

    external override fun createTable(holder: ReadableMap, descriptor: ReadableMap, initial: ReadableMap?)

    external override fun growTable(instance: ReadableMap, delta: Double)

    external override fun getTableElement(instance: ReadableMap, index: Double): WritableMap?

    external override fun setTableElement(instance: ReadableMap, index: Double, value: ReadableMap)

    external override fun getTableSize(instance: ReadableMap): Double
}

