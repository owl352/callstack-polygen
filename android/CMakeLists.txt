cmake_minimum_required(VERSION 3.22)
set(CMAKE_CXX_STANDARD 20)
project(Wasm)

add_compile_options(
        -fexceptions
        -frtti)

set(POLYGEN_SRC_DIR ${CMAKE_CURRENT_SOURCE_DIR}/../cpp/ReactNativePolygen)
set(WASM_RT_SRC_DIR ${CMAKE_CURRENT_SOURCE_DIR}/../cpp/wasm-rt)

set(POLYGEN_BIN_DIR ${CMAKE_CURRENT_BINARY_DIR}/ReactNativePolygen-build)
set(WASM_RT_BIN_DIR ${CMAKE_CURRENT_BINARY_DIR}/wasm-rt-build)


add_subdirectory(${POLYGEN_SRC_DIR} ${POLYGEN_BIN_DIR})
add_subdirectory(${WASM_RT_SRC_DIR} ${WASM_RT_BIN_DIR})

add_library(libpolygen SHARED
  #../cpp/ReactNativePolygen/ReactNativePolygen.cpp
  cpp-adapter.cpp
)


target_include_directories(libpolygen PUBLIC
  "${CMAKE_CURRENT_SOURCE_DIR}/build/generated/source/codegen/jni/react/renderer/components/RNPolygenSpec"
   ${POLYGEN_SRC_DIR}
   ${WASM_RT_SRC_DIR}
)

find_package(ReactAndroid REQUIRED CONFIG)
find_package(hermes-engine REQUIRED CONFIG)

set_target_properties(libpolygen PROPERTIES
    CXX_STANDARD 20
    CXX_STANDARD_REQUIRED ON
    CXX_EXTENSIONS OFF
    POSITION_INDEPENDENT_CODE ON
)

target_compile_definitions(
    libpolygen
    PRIVATE
    -DFOLLY_NO_CONFIG=1
)

target_link_libraries(libpolygen
  PRIVATE
  # android
  log
  ReactAndroid::reactnative
  ReactAndroid::jsi
  hermes-engine::libhermes
  wasm-rt
  # react_codegen_NodeApiHostSpec
)