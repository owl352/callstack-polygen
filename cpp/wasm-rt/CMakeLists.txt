# Рекурсивный поиск заголовочных и исходных файлов для wasm-rt
# Использование ${CMAKE_CURRENT_SOURCE_DIR} делает пути более надежными.
file(GLOB_RECURSE wasmrt_headers CONFIGURE_DEPENDS "${CMAKE_CURRENT_SOURCE_DIR}/*.h" "${CMAKE_CURRENT_SOURCE_DIR}/*.hpp")
file(GLOB_RECURSE wasmrt_sources CONFIGURE_DEPENDS "${CMAKE_CURRENT_SOURCE_DIR}/*.cpp" "${CMAKE_CURRENT_SOURCE_DIR}/*.c" "${CMAKE_CURRENT_SOURCE_DIR}/*.cxx")

# Создание статической библиотеки и добавление исходных файлов
add_library(wasm-rt STATIC ${wasmrt_sources} ${wasmrt_headers})

# Делаем заголовочные файлы публично доступными для других целей.
# Это заменяет функциональность PUBLIC FILE_SET.
# Путь ".." указывает, что заголовочные файлы находятся в родительской директории
# относительно текущего CMakeLists.txt, как было указано в BASE_DIRS.
get_target_property(wasmrt_SOURCE_DIR wasm-rt SOURCE_DIR)
target_include_directories(wasm-rt PUBLIC "${wasmrt_SOURCE_DIR}/..")
