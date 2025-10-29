#include <jni.h>
#include <memory>
#include <string>

#include <ReactCommon/CallInvoker.h>
#include <ReactCommon/CxxTurboModuleUtils.h>
#include <ReactCommon/JavaTurboModule.h>

#include "ReactNativePolygen.h"

namespace ReactNative = facebook::react;

extern "C" JNIEXPORT void JNICALL
Java_com_wasm_PolygenModule_initialize(JNIEnv* env, jobject thiz) {
}

extern "C" JNIEXPORT void JNICALL
Java_com_wasm_PolygenModule_invalidate(JNIEnv* env, jobject thiz) {
}

class PolygenTurboModule : public ReactNative::JavaTurboModule {
public:
    PolygenTurboModule(
        const std::string& name,
        std::shared_ptr<ReactNative::CallInvoker> jsInvoker,
        JavaPart::javaobject jThis
    ) : JavaTurboModule(name, jsInvoker, jThis) {}

    static std::shared_ptr<ReactNative::TurboModule> create(
        const std::string& name,
        std::shared_ptr<ReactNative::CallInvoker> jsInvoker,
        JavaPart::javaobject jThis
    ) {
        return std::make_shared<ReactNative::ReactNativePolygen>(jsInvoker);
    }
};

extern "C" JNIEXPORT jboolean JNICALL
Java_com_wasm_PolygenModule_canAllocateModulesNatively(JNIEnv* env, jclass cls) {
    return true;
}

JNIEXPORT jobject JNICALL JSI_bind_polygen(
    JNIEnv* env,
    jclass clazz,
    jobject turboModule,
    jstring name,
    jobject jsInvoker,
    jobject javaPart
) {
    auto moduleName = ReactNative::fromJstring(env, name);
    auto callInvoker = ReactNative::extractCallInvoker(env, jsInvoker);

    auto module = PolygenTurboModule::create(moduleName, callInvoker, (JavaPart::javaobject)javaPart);

    ReactNative::registerTurboModule(moduleName, module);

    return turboModule;
}
