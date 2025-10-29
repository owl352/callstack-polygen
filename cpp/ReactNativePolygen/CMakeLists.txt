# CMakeLists.txt for ReactNativePolygen

# Find source and header files
file(GLOB_RECURSE polygen_headers CONFIGURE_DEPENDS "${CMAKE_CURRENT_SOURCE_DIR}/*.h" "${CMAKE_CURRENT_SOURCE_DIR}/*.hpp")
file(GLOB_RECURSE polygen_sources CONFIGURE_DEPENDS "${CMAKE_CURRENT_SOURCE_DIR}/*.cpp")

find_package(ReactAndroid REQUIRED CONFIG)
find_package(hermes-engine REQUIRED CONFIG)

# Create a static library
add_library(polygen_core STATIC ${polygen_sources} ${polygen_headers})

# Specify include directories for polygen_core
target_include_directories(polygen_core PUBLIC
    # Path to own headers (for external access)
    "${CMAKE_CURRENT_SOURCE_DIR}"

    # Paths to React Native (if needed in public headers of polygen_core)
    ${REACT_NATIVE_DIR}/ReactCommon/turbomodule
    ${REACT_NATIVE_DIR}/ReactCommon

    # Path to wasm-rt. It is needed publicly as it is used in bridge.h
    "${CMAKE_CURRENT_SOURCE_DIR}/../wasm-rt"
)

# Set C++ standard
set_target_properties(polygen_core PROPERTIES CXX_STANDARD 20)

# Link dependencies.
# PUBLIC: if the dependency (e.g., jsi) is used in public .h files of polygen_core
# PRIVATE: if the dependency is only used inside .cpp files of polygen_core
target_link_libraries(polygen_core
  PUBLIC
    ReactAndroid::jsi
    wasm-rt

  PUBLIC
    log
    ReactAndroid::reactnative
    hermes-engine::libhermes
)
