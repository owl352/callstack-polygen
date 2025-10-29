package com.wasm

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import com.facebook.react.module.annotations.ReactModule

import com.wasm.NativePolygenSpec

@ReactModule(name = PolygenModule.NAME)
class PolygenModule(reactContext: ReactApplicationContext) : NativePolygenSpec(reactContext) {

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
    override fun initialize() {
      System.loadLibrary("polygen")
    }
    external override fun invalidate()

    // --- Native methods that call C++ JNI functions ---

    override fun copyNativeHandle(holder: ReadableMap, from: ReadableMap): Boolean {
      return false
    }

    override fun loadModule(holder: ReadableMap, moduleData: ReadableMap): WritableMap? {
        return null
    }

    override fun unloadModule(module: ReadableMap) { /* no-op */ }

    override fun getModuleMetadata(module: ReadableMap): WritableMap? {
        return null
    }

    override fun createModuleInstance(holder: ReadableMap, mod: ReadableMap, importObject: ReadableMap) { /* no-op */ }

    override fun destroyModuleInstance(instance: ReadableMap) { /* no-op */ }

    override fun createMemory(holder: ReadableMap, initial: Double, maximum: Double?) { /* no-op */ }

    override fun getMemoryBuffer(instance: ReadableMap): WritableMap? {
        return null
    }

    override fun growMemory(instance: ReadableMap, delta: Double) { /* no-op */ }

    override fun createGlobal(holder: ReadableMap, descriptor: ReadableMap, initialValue: Double) { /* no-op */ }

    override fun getGlobalValue(instance: ReadableMap): Double {
        return 0.0
    }

    override fun setGlobalValue(instance: ReadableMap, newValue: Double) { /* no-op */ }

    override fun createTable(holder: ReadableMap, descriptor: ReadableMap, initial: ReadableMap?) { /* no-op */ }

    override fun growTable(instance: ReadableMap, delta: Double) { /* no-op */ }

    override fun getTableElement(instance: ReadableMap, index: Double): WritableMap? {
        return null
    }

    override fun setTableElement(instance: ReadableMap, index: Double, value: ReadableMap) { /* no-op */ }

    override fun getTableSize(instance: ReadableMap): Double {
        return 0.0
    }
}

