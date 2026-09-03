# Checking For Vulkan Support

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/checking_for_support.html

## Table of Contents

- [Platform Support](#_platform_support)
- [Android](#_android)
- [BSD Unix](#_bsd_unix)
- [iOS](#_ios)
- [Linux](#_linux)
- [MacOS](#_macos)
- [Windows](#_windows)
- [Device Support](#_device_support)
- [Hardware Implementation](#_hardware_implementation)
- [Null Driver](#_null_driver)
- [Software Implementation](#_software_implementation)
- [Ways of Checking for Vulkan](#_ways_of_checking_for_vulkan)
- [Ways_of_Checking_for_Vulkan](#_ways_of_checking_for_vulkan)
- [VIA (Vulkan Installation Analyzer)](#_via_vulkan_installation_analyzer)
- [VIA_(Vulkan_Installation_Analyzer)](#_via_vulkan_installation_analyzer)
- [Hello Create Instance](#_hello_create_instance)
- [Hello_Create_Instance](#_hello_create_instance)

## Content

Vulkan requires both a [Vulkan Loader](loader.html#loader) and a Vulkan Driver (also referred to as a *Vulkan Implementation*). The driver is in charge of translating Vulkan API calls into a valid implementation of Vulkan. The most common case is a GPU hardware vendor releasing a driver that is used to run Vulkan on a physical GPU. It should be noted that it is possible to have an entire implementation of Vulkan software based, though the performance impact would be very noticeable.

When checking for Vulkan Support it is important to distinguish the difference between *platform support* and *device support*.

The first thing to check is if your [platform](platforms.html#platforms) even supports Vulkan. Each platform uses a different mechanism to manage how the [Vulkan Loader](loader.html#loader) is implemented. The loader is then in charge of determining if a Vulkan Driver is exposed correctly.

A simple way of grabbing info on Vulkan is to run the [Vulkan Hardware Capability Viewer](https://play.google.com/store/apps/details?id=de.saschawillems.vulkancapsviewer&hl=en_US) app developed by Sascha Willems. This app will not only show if Vulkan is supported, but also all the capabilities the device offers.

Grab the [Vulkan SDK](https://vulkan.lunarg.com/sdk/home#linux). Build Vulkan SDK using the command `./vulkansdk.sh` and then run the [vulkaninfo](https://vulkan.lunarg.com/doc/sdk/latest/linux/vulkaninfo.html) executable to easily check for Vulkan support as well as all the capabilities the device offers.

A simple way of grabbing info on Vulkan is to run the iOS port of the [Vulkan Hardware Capability Viewer](https://apps.apple.com/us/app/vulkan-capabilities-viewer/id1552796816) provided by LunarG. This app will not only show if Vulkan is supported, but also all the capabilities the device offers.

Grab the [Vulkan SDK](https://vulkan.lunarg.com/sdk/home#linux) and run the [vulkaninfo](https://vulkan.lunarg.com/doc/sdk/latest/linux/vulkaninfo.html) executable to easily check for Vulkan support as well as all the capabilities the device offers.

Grab the [Vulkan SDK](https://vulkan.lunarg.com/sdk/home#mac) and run the [vulkaninfo](https://vulkan.lunarg.com/doc/sdk/latest/mac/vulkaninfo.html) executable to easily check for Vulkan support as well as all the capabilities the device offers.

Grab the [Vulkan SDK](https://vulkan.lunarg.com/sdk/home#windows) and run the [vulkaninfo.exe](https://vulkan.lunarg.com/doc/sdk/latest/windows/vulkaninfo.html) executable to easily check for Vulkan support as well as all the capabilities the device offers.

Just because the platform supports Vulkan does not mean there is device support. For device support, one will need to make sure a Vulkan Driver is available that fully implements Vulkan. There are a few different variations of a Vulkan Driver.

A driver targeting a physical piece of GPU hardware is the most common case for a Vulkan implementation. It is important to understand that while a certain GPU might have the physical capabilities of running Vulkan, it still requires a driver to control it. The driver is in charge of getting the Vulkan calls mapped to the hardware in the most efficient way possible.

Drivers, like any software, are updated and this means there can be many variations of drivers for the same physical device and platform. There is a [Vulkan Database](https://vulkan.gpuinfo.org/), developed and maintained by Sascha Willems, which is the largest collection of recorded Vulkan implementation details

|  | Just because a physical device or platform isn’t in the Vulkan Database doesn’t mean it couldn’t exist. |
| --- | --- |

The term “null driver” is given to any driver that accepts Vulkan API calls, but does not do anything with them. This is common for testing interactions with the driver without needing any working implementation backing it. Many uses cases such as creating [CTS tests](vulkan_cts.html#vulkan-cts) for new features, [testing the Validation Layers](https://github.com/KhronosGroup/Vulkan-ValidationLayers/blob/main/docs/creating_tests.md#running-tests-on-devsim-and-mockicd), and more rely on the idea of a null driver.

Khronos provides the [Mock ICD](https://github.com/KhronosGroup/Vulkan-Tools/tree/master/icd) as one implementation of a null driver that works on various platforms.

It is possible to create a Vulkan implementation that only runs on the CPU. This is useful if there is a need to test Vulkan that is hardware independent, but unlike the null driver, also outputs a valid result.

[SwiftShader](https://github.com/google/swiftshader) is an example of CPU-based implementation.

Included in the [Vulkan SDK](https://vulkan.lunarg.com/sdk/home) is a utility to check the Vulkan installation on your computer. It is supported on Windows, Linux, and macOS. VIA **can**

* 
Determine the state of Vulkan components on your system

* 
Validate that your Vulkan Loader and drivers are installed properly

* 
Capture your system state in a form that can be used as an attachment when submitting bugs

View the [SDK documentation on VIA](https://vulkan.lunarg.com/doc/sdk/latest/windows/via.html) for more information.

A simple way to check for Vulkan support cross platform is to create a simple “Hello World” Vulkan application. The `vkCreateInstance` function is used to create a Vulkan Instance and is also the shortest way to write a valid Vulkan application.

The Vulkan SDK provides a minimal [vkCreateInstance](https://docs.vulkan.org/tutorial/latest/03_Drawing_a_triangle/00_Setup/01_Instance.html) example `01-init_instance.cpp` that can be used.
