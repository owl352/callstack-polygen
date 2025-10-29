cmake_minimum_required(VERSION 3.22)
set(CMAKE_CXX_STANDARD 20)
project(Wasm)

# --- Path Variables ---
set(CPP_ROOT_DIR ${CMAKE_CURRENT_SOURCE_DIR}/../cpp)
set(POLYGEN_SRC_DIR ${CMAKE_CURRENT_SOURCE_DIR}/../cpp/ReactNativePolygen)
set(WASM_RT_SRC_DIR ${CMAKE_CURRENT_SOURCE_DIR}/../cpp/wasm-rt)
set(CODEGEN_JNI_DIR ${CMAKE_CURRENT_SOURCE_DIR}/build/generated/source/codegen/jni)
set(POLYGEN_OUT_HOST_DIR ${CMAKE_CURRENT_SOURCE_DIR}/../../../.polygen-out/host)

# --- Find Dependencies ---
find_package(ReactAndroid REQUIRED CONFIG)
find_package(hermes-engine REQUIRED CONFIG)
find_package(fbjni REQUIRED CONFIG)

# --- Collect ALL sources into ONE variable ---
file(GLOB_RECURSE all_sources
    "${POLYGEN_SRC_DIR}/*.cpp"
    "${CODEGEN_JNI_DIR}/*.cpp"
    "${CODEGEN_JNI_DIR}/*.h"
    "${POLYGEN_OUT_HOST_DIR}/*.c"
    "${POLYGEN_OUT_HOST_DIR}/*.h"
    "${POLYGEN_OUT_HOST_DIR}/*.cpp"
)

# --- wasm-rt runtime library ---
add_subdirectory(${WASM_RT_SRC_DIR} ${CMAKE_CURRENT_BINARY_DIR}/wasm-rt-build)

# --- Create the SINGLE 'polygen' library ---
add_library(polygen SHARED ${all_sources})

# --- Compilation Properties ---
set_target_properties(polygen PROPERTIES
    CXX_STANDARD 20
    CXX_STANDARD_REQUIRED ON
    CXX_EXTENSIONS OFF
    POSITION_INDEPENDENT_CODE ON
)
target_compile_definitions(
  polygen
  PRIVATE
  -DFOLLY_NO_CONFIG=1
  -DFMT_HEADER_ONLY=1
)

# --- Specify ALL include paths for this ONE library ---
target_include_directories(polygen PUBLIC
    # Path for #include <ReactNativePolygen/Loader.h>
    "${CPP_ROOT_DIR}"

    # Base path to generated files
    "${CODEGEN_JNI_DIR}"

    # !!! THIS IS THE SOLUTION !!!
    # Add the exact path where the .h files are located
    "${CODEGEN_JNI_DIR}/react/renderer/components/RNPolygenSpec"

    # Paths for wasm
    "${POLYGEN_OUT_HOST_DIR}"
    "${WASM_RT_SRC_DIR}"

    # Paths for JSI, React Native, etc.
    $<TARGET_PROPERTY:ReactAndroid::jsi,INTERFACE_INCLUDE_DIRECTORIES>
    $<TARGET_PROPERTY:ReactAndroid::reactnative,INTERFACE_INCLUDE_DIRECTORIES>

    # Other paths
    "${POLYGEN_SRC_DIR}/WebAssembly"
)

# --- Link Libraries ---
target_link_libraries(polygen PUBLIC
  log
  ReactAndroid::reactnative
  ReactAndroid::jsi
  fbjni::fbjni
  hermes-engine::libhermes
  wasm-rt
)
