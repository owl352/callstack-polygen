package com.wasm

import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import java.util.HashMap

class WasmPackage : TurboReactPackage() {

    override fun getModule(name: String, reactContext: ReactApplicationContext): NativeModule? {
        return if (name == PolygenModule.NAME) {
            PolygenModule(reactContext)
        } else {
            null
        }
    }


    override fun getReactModuleInfoProvider(): ReactModuleInfoProvider {
        return ReactModuleInfoProvider {
            val moduleInfos = HashMap<String, ReactModuleInfo>()
            moduleInfos[PolygenModule.NAME] =
                ReactModuleInfo(
                    PolygenModule.NAME,
                    "com.wasm.PolygenModule",
                    false, // canOverrideExistingModule
                    false, // needsEagerInit
                    true, // isCxxModule
                    true   // isTurboModule
                )
            moduleInfos
        }
    }

    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return emptyList()
    }
}

