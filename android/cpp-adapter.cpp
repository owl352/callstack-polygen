#include <jni.h>
#include <memory>
#include <string>

// --- Ключевые инклуды из React Native ---
#include <ReactCommon/CallInvoker.h>
#include <ReactCommon/CxxTurboModuleUtils.h>
#include <ReactCommon/JavaTurboModule.h>

// --- Инклуд вашего основного C++ модуля ---
// Убедитесь, что путь к ReactNativePolygen.h правильный.
// Этот файл должен быть в вашем C++ коде, который вы портируете с iOS.
#include "ReactNativePolygen.h"

// Используем псевдоним для удобства
namespace ReactNative = facebook::react;

/**
 * JNI-функция, которая будет вызвана из Kotlin/Java (из PolygenModule.kt)
 * для инициализации C++ части.
 */
extern "C" JNIEXPORT void JNICALL
Java_com_wasm_PolygenModule_initialize(JNIEnv* env, jobject thiz) {
    // Эта функция вызывается один раз при старте, но нам нужно получить доступ
    // к контексту React Native, чтобы зарегистрировать JSI модуль.
    // Это делается в другом месте. См. ниже.
}

extern "C" JNIEXPORT void JNICALL
Java_com_wasm_PolygenModule_invalidate(JNIEnv* env, jobject thiz) {
    // Здесь логика очистки, если она нужна
}

/**
 * Это основная функция, которая регистрирует ваш C++ модуль (JSI).
 * React Native вызовет ее сам, если все правильно настроено.
 * Она должна быть связана с вашим Java-классом TurboModule.
 */
class PolygenTurboModule : public ReactNative::JavaTurboModule {
public:
    PolygenTurboModule(
        const std::string& name,
        std::shared_ptr<ReactNative::CallInvoker> jsInvoker,
        JavaPart::javaobject jThis
    ) : JavaTurboModule(name, jsInvoker, jThis) {}

    // Фабричный метод для создания вашего C++ модуля
    static std::shared_ptr<ReactNative::TurboModule> create(
        const std::string& name,
        std::shared_ptr<ReactNative::CallInvoker> jsInvoker,
        JavaPart::javaobject jThis
    ) {
        // Здесь происходит магия, аналогичная вашему Wasm.mm.
        // Мы создаем экземпляр ReactNativePolygen.
        return std::make_shared<ReactNative::ReactNativePolygen>(jsInvoker);
    }
};

/**
 * Регистрация фабрики. React Native найдет эту функцию по имени.
 */
extern "C" JNIEXPORT jboolean JNICALL
Java_com_wasm_PolygenModule_canAllocateModulesNatively(JNIEnv* env, jclass cls) {
    // Возвращаем true, чтобы сообщить React Native, что мы управляем созданием
    // C++ модуля вручную.
    return true;
}

// Регистрация нашего C++ модуля в React Native
JNIEXPORT jobject JNICALL JSI_bind_polygen( // Имя функции может быть любым
    JNIEnv* env,
    jclass clazz,
    jobject turboModule,
    jstring name,
    jobject jsInvoker,
    jobject javaPart
) {
    auto moduleName = ReactNative::fromJstring(env, name);
    auto callInvoker = ReactNative::extractCallInvoker(env, jsInvoker);

    // Создаем экземпляр нашего C++ модуля с помощью фабрики
    auto module = PolygenTurboModule::create(moduleName, callInvoker, (JavaPart::javaobject)javaPart);

    // Регистрируем его
    ReactNative::registerTurboModule(moduleName, module);

    return turboModule;
}
