# Setup and Installation: Preparing Your Environment

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Advanced_Vulkan_Compute/05_OpenCL_on_Vulkan/02_setup_and_installation.html

## Table of Contents

- [Where to Get the Tools](#_where_to_get_the_tools)
- [Where_to_Get_the_Tools](#_where_to_get_the_tools)
- [Building clspv](#_building_clspv)
- [Building clvk](#_building_clvk)
- [Platform-Specific Notes](#_platform_specific_notes)
- [Linux](#_linux)
- [Windows](#_windows)
- [Android](#_android)
- [Verifying Your Setup](#_verifying_your_setup)
- [Verifying_Your_Setup](#_verifying_your_setup)

## Content

To run OpenCL code on Vulkan, you’ll need a few extra tools in your development kit. The two most important are **clspv** (the compiler) and **clvk** (the runtime library).

Both `clspv` and `clvk` are open-source projects hosted on GitHub. They are not currently part of the standard Vulkan SDK, so you will need to fetch and build them yourself, although pre-built binaries are occasionally available for certain platforms.

* 
**clspv**: [github.com/google/clspv](https://github.com/google/clspv)

* 
**clvk**: [github.com/kpet/clvk](https://github.com/kpet/clvk)

`clspv` is a complex tool built on top of LLVM and Clang. Because of this, it has several dependencies:

**CMake**: Version 3.17.2 or higher.

**Python 3**: Used for various build scripts.

**Git**: For cloning the repository and its dependencies.

**C++ Compiler**: A modern compiler (GCC 7+, Clang 5+, or MSVC 2017+).

To build `clspv`, follow these steps:

git clone --recursive https://github.com/google/clspv.git
cd clspv
python3 utils/fetch_sources.py
mkdir build && cd build
cmake .. -G Ninja -DCMAKE_BUILD_TYPE=Release
ninja clspv

Once the build is complete, you’ll have a `clspv` executable in your `build` folder. Add this to your system’s `PATH` for easier access.

`clvk` builds `clspv` as a dependency and uses it internally to compile OpenCL C kernels into Vulkan-compatible SPIR-V at runtime. You therefore do not need to build `clspv` separately if your only goal is to use `clvk`. The build primarily requires a Vulkan driver and headers:

git clone --recursive https://github.com/kpet/clvk.git
cd clvk
mkdir build && cd build
cmake .. -G Ninja -DCMAKE_BUILD_TYPE=Release
ninja

This will produce a shared library (e.g., `libOpenCL.so.1` on Linux or `OpenCL.dll` on Windows).

While the build process is similar across platforms, there are a few important considerations:

On Linux, ensure you have the Vulkan SDK or your distribution’s Vulkan development packages installed (`vulkan-headers`, `libvulkan-dev`). Most developers prefer using `clvk` as a **Vulkan Layer** or by explicitly linking against the `clvk` shared library.

For Windows, you’ll need Visual Studio. `clspv` can be built using the Visual Studio command prompt. To use `clvk`, you can rename the generated `OpenCL.dll` to `clvk.dll` (to avoid conflicts with any system-wide OpenCL drivers) and load it dynamically in your application.

Android is one of the most popular platforms for `clvk`. To build for Android, you’ll need the **Android NDK**. You can cross-compile `clspv` on your host machine to generate SPIR-V binaries, and then include the `clvk` library as a native shared library in your Android project’s `jniLibs` folder.

Once you’ve built the tools, verify your installation:

**clspv**: Run `clspv --version` in your terminal. It should report the current version and its LLVM/Clang base.

**clvk**: You can use a tool like `clinfo` to check if `clvk` is correctly recognized as an OpenCL platform on your system. Run it with `LD_LIBRARY_PATH=/path/to/clvk/build clinfo` on Linux to see if the Vulkan-backed OpenCL device appears.

Now that your environment is ready, let’s look at how to use `clspv` to compile your first OpenCL kernel for Vulkan.

[Previous: OpenCL on Vulkan](01_introduction.html) | [Next: The clspv Pipeline](03_clspv_pipeline.html)
