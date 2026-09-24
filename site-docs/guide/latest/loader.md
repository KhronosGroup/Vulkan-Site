# Loader

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/loader.html

## Table of Contents

- [Linking Against the Loader](#_linking_against_the_loader)
- [Linking_Against_the_Loader](#_linking_against_the_loader)
- [Platform Variations](#_platform_variations)
- [Android](#_android)
- [Linux](#_linux)
- [MacOS](#_macos)
- [Windows](#_windows)

## Content

The loader is responsible for mapping an application to Vulkan layers and Vulkan installable client drivers (ICD).

![loader_overview.png](_images/loader_overview.png)

Anyone can create their own Vulkan Loader, as long as they follow the [Loader Interface](https://github.com/KhronosGroup/Vulkan-Loader/blob/main/docs/LoaderInterfaceArchitecture.md). One can build the [reference loader](https://github.com/KhronosGroup/Vulkan-Loader/blob/main/BUILD.md) as well or grab a built version from the [Vulkan SDK](https://vulkan.lunarg.com/sdk/home) for selected platforms.

The [Vulkan headers](https://github.com/KhronosGroup/Vulkan-Headers) only provide the Vulkan function prototypes. When building a Vulkan application you have to link it to the loader or you will get errors about undefined references to the Vulkan functions. There are two ways of linking the loader, [directly](https://github.com/KhronosGroup/Vulkan-Loader/blob/main/docs/LoaderApplicationInterface.md#directly-linking-to-the-loader) and [indirectly](https://github.com/KhronosGroup/Vulkan-Loader/blob/main/docs/LoaderApplicationInterface.md#indirectly-linking-to-the-loader), which should not be confused with “static and dynamic linking”.

* 
[Directly linking](https://github.com/KhronosGroup/Vulkan-Loader/blob/main/docs/LoaderApplicationInterface.md#directly-linking-to-the-loader) at compile time

This requires having a built Vulkan Loader (either as a static or dynamic library) that your build system can find.

* 
Build systems (Visual Studio, CMake, etc) have documentation on how to link to the library. Try searching “(InsertBuildSystem) link to external library” online.

[Indirectly linking](https://github.com/KhronosGroup/Vulkan-Loader/blob/main/docs/LoaderApplicationInterface.md#indirectly-linking-to-the-loader) at runtime

* 
Using dynamic symbol lookup (via system calls such as `dlsym` and `dlopen`) an application can initialize its own dispatch table. This allows an application to fail gracefully if the loader cannot be found. It also provides the fastest mechanism for the application to call Vulkan functions.

* 
[Volk](https://github.com/zeux/volk/) is an open source implementation of a meta-loader to help simplify this process.

Each platform can set its own rules on how to enforce the Vulkan Loader.

Android devices supporting Vulkan provide a [Vulkan loader](https://source.android.com/devices/graphics/implement-vulkan#vulkan_loader) already built into the OS.

A [vulkan_wrapper.c/h](https://developer.android.com/ndk/guides/graphics/getting-started#using) file is provided in the Android NDK for indirectly linking. This is needed, in part, because the Vulkan Loader can be different across different vendors and OEM devices.

The [Vulkan SDK](https://vulkan.lunarg.com/sdk/home) provides a pre-built loader for Linux.

The [Getting Started](https://vulkan.lunarg.com/doc/sdk/latest/linux/getting_started.html) page in the Vulkan SDK explains how the loader is found on Linux.

The [Vulkan SDK](https://vulkan.lunarg.com/sdk/home) provides a pre-built loader for MacOS

The [Getting Started](https://vulkan.lunarg.com/doc/sdk/latest/mac/getting_started.html) page in the Vulkan SDK explains how the loader is found on MacOS.

The [Vulkan SDK](https://vulkan.lunarg.com/sdk/home) provides a pre-built loader for Windows.

The [Getting Started](https://vulkan.lunarg.com/doc/sdk/latest/windows/getting_started.html) page in the Vulkan SDK explains how the loader is found on Windows.
