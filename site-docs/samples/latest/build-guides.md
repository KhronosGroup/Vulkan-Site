# Build Guides

## Metadata

- **Component**: samples
- **Version**: latest
- **URL**: /samples/latest/docs/build.html

## Table of Contents

- [CMake Options](#_cmake_options)
- [VKB_BUILD_SAMPLES](#_vkb_build_samples)
- [VKB_BUILD_TESTS](#_vkb_build_tests)
- [VKB_VALIDATION_LAYERS](#_vkb_validation_layers)
- [VKB_VALIDATION_LAYERS_GPU_ASSISTED](#_vkb_validation_layers_gpu_assisted)
- [VKB_VALIDATION_LAYERS_BEST_PRACTICES](#_vkb_validation_layers_best_practices)
- [VKB_VALIDATION_LAYERS_SYNCHRONIZATION](#_vkb_validation_layers_synchronization)
- [VKB_VULKAN_DEBUG](#_vkb_vulkan_debug)
- [VKB_WARNINGS_AS_ERRORS](#_vkb_warnings_as_errors)
- [VKB_SKIP_SLANG_SHADER_COMPILATION](#_vkb_skip_slang_shader_compilation)
- [Quality Assurance](#_quality_assurance)
- [3D models](#_3d_models)
- [Performance data](#_performance_data)
- [Windows](#_windows)
- [Dependencies](#_dependencies)
- [Clang Format and Visual Studio](#_clang_format_and_visual_studio)
- [Clang_Format_and_Visual_Studio](#_clang_format_and_visual_studio)
- [Build with CMake and Visual Studio](#_build_with_cmake_and_visual_studio)
- [Build_with_CMake_and_Visual_Studio](#_build_with_cmake_and_visual_studio)
- [Linux](#_linux)
- [Dependencies](#_dependencies_2)
- [Selecting the window system](#_selecting_the_window_system)
- [Selecting_the_window_system](#_selecting_the_window_system)
- [Build with CMake](#_build_with_cmake)
- [Build_with_CMake](#_build_with_cmake)
- [macOS](#_macos)
- [Dependencies](#_dependencies_3)
- [Set your environment variables](#_set_your_environment_variables)
- [Set_your_environment_variables](#_set_your_environment_variables)
- [Build with CMake and Xcode](#_build_with_cmake_and_xcode)
- [Build_with_CMake_and_Xcode](#_build_with_cmake_and_xcode)
- [iOS](#_ios)
- [Dependencies](#_dependencies_4)
- [Set your environment variables](#_set_your_environment_variables_2)
- [Set_your_environment_variables](#_set_your_environment_variables_2)
- [Build with CMake and Xcode](#_build_with_cmake_and_xcode_2)
- [Build_with_CMake_and_Xcode](#_build_with_cmake_and_xcode_2)
- [Android](#_android)
- [Dependencies](#_dependencies_5)
- [Android Studio (Recommended)](#_android_studio_recommended)
- [Android_Studio_(Recommended)](#_android_studio_recommended)
- [Build with Gradle](#_build_with_gradle)
- [Build_with_Gradle](#_build_with_gradle)
- [Generate the gradle project](#_generate_the_gradle_project)
- [Generate_the_gradle_project](#_generate_the_gradle_project)
- [Install dependencies](#_install_dependencies)
- [Build the project](#_build_the_project)
- [Build_the_project](#_build_the_project)
- [Install the apk on the device](#_install_the_apk_on_the_device)
- [Install_the_apk_on_the_device](#_install_the_apk_on_the_device)
- [Build with Android Studio](#_build_with_android_studio)
- [Build_with_Android_Studio](#_build_with_android_studio)

## Content

The following options are used to change the build configuration

Choose whether to include a sample at build time.

* 
`ON` - Build Sample

* 
`OFF` - Exclude Sample

**Default:** `ON`

Choose whether to build the samples.

* 
`ON` - Build All Samples

* 
`OFF` - Skip building Samples

**Default:** `ON`

Choose whether to build the tests

* 
`ON` - Build All Tests

* 
`OFF` - Skip building Tests

**Default:** `OFF`

Enable Validation Layers

**Default:** `OFF`

Enable [GPU assisted validation layers](https://github.com/KhronosGroup/Vulkan-ValidationLayers/blob/main/docs/gpu_validation.md), used primarily for VK_EXT_descriptor_indexing.

**Default:** `OFF`

Enable [best practices validation layers](https://github.com/KhronosGroup/Vulkan-ValidationLayers/blob/main/docs/best_practices.md).

**Default:** `OFF`

Enable [synchronization validation layers](https://github.com/KhronosGroup/Vulkan-ValidationLayers/blob/main/docs/synchronization_usage.md).

**Default:** `OFF`

Enable VK_EXT_debug_utils or VK_EXT_debug_marker, if supported.
This enables debug names for Vulkan objects, and markers/labels in command buffers.
+ See the [debug utils sample](../samples/extensions/debug_utils/README.html) for more information.

**Default:** `ON`

Treat all warnings as errors

**Default:** `ON`

Enable profiling using the [Tracy profiler](https://github.com/wolfpld/tracy).

We currently use Tracy v0.10.0 if you do not use the correct Tracy Profiler version as the Tracy Client version used in Sample you will get a protocol mismatch error.

Windows users can download the profiler from the [Tracy v0.10.0 release page](https://github.com/wolfpld/tracy/releases/tag/v0.10)
Other platforms require the user to build the profiler from source see the [Tracy documentation (pdf)](https://github.com/wolfpld/tracy/releases/download/v0.10/tracy.pdf) for more information on how to build for your platform.

Tracy is not currently enabled for Android builds. In the future, we may add support for this.

**Default:** `OFF`

By default, Slang shaders are compiled if a Slang compiler is found on the system. In cases where this is undesirable, set this to `OFF` to disable Slang shader compilation.

You can still select Slang as a shading language target for the samples since Slang shaders are included as precompiled SPIR-V files.

**Default:** `OFF`

We use a small set of tools to provide a level of quality to the project.
These tools are part of our CI/CD process.
If your local environment does not have the same versions of the tools we use in the CI you may see some errors or warnings pop-up when pushing.

For up-to date version information please see the repositories for the individual tools

* 
Doxygen [Doxygen Repository](https://github.com/KhronosGroupActions/doxygen)

* 
Clang Format / Clang Tidy [Clang Tools Repository](https://github.com/KhronosGroupActions/clang-tools)

* 
Snake Case Check [Snake Case Check Repository](https://github.com/KhronosGroupActions/snake-case-check)

* 
Android NDK [Android NDK Repository](https://github.com/KhronosGroupActions/android-ndk-build)

Most of the samples require 3D models downloaded from [https://github.com/KhronosGroup/Vulkan-Samples-Assets](https://github.com/KhronosGroup/Vulkan-Samples-Assets).
That repository is referenced as a git submodule by this project so if you followed the clone instructions in the [project readme](../README.html) you will already have the models locally under `./assets/`.

On Android, Gradle will run CMake which will sync assets to the device if there has been a change.

However, to sync them manually you may run the following command to ensure up to date assets are on the device:

adb push --sync assets /sdcard/Android/data/com.khronos.vulkan_samples/files/
adb push --sync shaders /sdcard/Android/data/com.khronos.vulkan_samples/files/

In order for performance data to be displayed, profiling needs to be enabled on the device.
Some devices may disable it by default.

Profiling can be enabled via adb:

adb shell setprop security.perf_harden 0

> 

Performance data is captured using HWCPipe.
For details on this project and how to integrate it in your pipeline, visit: [https://github.com/ARM-software/HWCPipe](https://github.com/ARM-software/HWCPipe)

* 
CMake v3.12+

* 
Python 3

* 
Visual Studio 2017 or above

* 
[CMake Options](#cmake-options)

* 
[3D models](#3d-models)

It is recommended to use `clang-format-15`, which is compatible with the styles in our `.clang-format` file.
It is also used by CI and is a basic version installed with Visual Studio 2022.

Go to the [LLVM downloads page](http://releases.llvm.org/download.html) to get clang.

> 

Please make sure, when running any sample, that you either:

* 
Enable [Developer Mode](https://docs.microsoft.com/en-us/windows/uwp/get-started/enable-your-device-for-development)

* 
Run Command Prompt or Visual Studio as administrator

`Step 1.` Generate the VS solution from the root of the repository

(For other VS versions please refer to [CMake Generators](https://cmake.org/cmake/help/latest/manual/cmake-generators.7.html#id15))

 cmake -G "Visual Studio 17 2022" -A x64 -S . -Bbuild/windows

Open the **vulkan_samples.sln** or **vulkan_samples.slnx** VS solution inside **build/windows** and build with Ctrl-Shift-B. To run Vulkan Samples, use Visual Studio’s Debug Properties selection and set the Debugging Command Arguments to --help. Click the "Local Windows Debugger" button and you should see the help output in the terminal. For convenience, the default setting is to run the hello_triangle sample; just edit that to your desired sample to run.

Alternatively, for command line builds use the steps below:

`Step 2.` Build the Visual Studio project

cmake --build build/windows --config Release --target vulkan_samples

`Step 3.` Run the **Vulkan Samples** application by specifying the name of the sample

build\windows\app\bin\Release\AMD64\vulkan_samples.exe sample 

* 
CMake v3.12+

* 
C++20 Compiler

* 
[CMake Options](#cmake-options)

* 
[3D models](#3d-models)

sudo apt-get install cmake g++ xorg-dev libglu1-mesa-dev libwayland-dev libxkbcommon-dev

On Linux, the samples support different window systems. If not explicitly set, default is X11 Xcb. If you want to build with another window system, use the `VKB_WSI_SELECTION` CMake option like this:

cmake -G "Unix Makefiles" -Bbuild/linux -DCMAKE_BUILD_TYPE=Release -DVKB_WSI_SELECTION=WAYLAND

Available Linux window systems:

| VKB_WSI_SELECTION | Window system |
| --- | --- |
| XCB | X11 Xcb (Default) |
| XLIB | X11 Xlib |
| WAYLAND | Wayland |
| D2D | Direct to Display (`VK_KHR_DISPLAY`) |

`Step 1.` The following command will generate the project

cmake -G "Unix Makefiles" -Bbuild/linux -DCMAKE_BUILD_TYPE=Release

`Step 2.` Build the project

cmake --build build/linux --config Release --target vulkan_samples -j$(nproc)

`Step 3.` Run the **Vulkan Samples** application to display the help message

./build/linux/app/bin/Release/x86_64/vulkan_samples --help

* 
CMake v3.12+ (Apple Silicon requires at least 3.19.2)

* 
Xcode v12 for Apple Silicon

* 
Command Line Tools (CLT) for Xcode `xcode-select --install`

* 
[Vulkan SDK](https://sdk.lunarg.com/sdk/download/latest/mac/vulkan_sdk.dmg) - Download and Install the Vulkan SDK with default options

* 
[CMake Options](#cmake-options)

* 
[3D models](#3d-models)

source /PATH/TO/VULKAN/SDK/setup-env.sh

`Step 1.` The following command will generate the project

cmake -G Xcode -Bbuild/mac-xcode -DCMAKE_BUILD_TYPE=Release -DCMAKE_OSX_SYSROOT=macosx -DCMAKE_OSX_DEPLOYMENT_TARGET=13.3

Open the **vulkan_samples** Xcode project inside build/mac-xcode and build with command-B.  To run Vulkan Samples, use Xcode’s edit-scheme selection and set the arguments to --help. Click the "Play" button and you should see the help output in the terminal. For convenience, the default setting is to run the hello_triangle sample; just edit that to your desired sample to run.

Alternatively, for command line builds use the steps below:

cmake -Bbuild/mac -DCMAKE_BUILD_TYPE=Release -DCMAKE_OSX_SYSROOT=macosx -DCMAKE_OSX_DEPLOYMENT_TARGET=13.3

`Step 2.` Build the project

cmake --build build/mac --config Release --target vulkan_samples -j$(sysctl -n hw.ncpu)

`Step 3.` Run the **Vulkan Samples** application to display the help message

./build/mac/app/bin/Release//vulkan_samples --help

* 
CMake v3.28+ (Apple xcframeworks require at least 3.28)

* 
Xcode v12 for Apple Silicon

* 
Command Line Tools (CLT) for Xcode `xcode-select --install`

* 
[Vulkan SDK](https://sdk.lunarg.com/sdk/download/latest/mac/vulkan_sdk.dmg) - Download and Install the Vulkan SDK making sure "Development libraries for iOS" is selected

* 
Vulkan at least version 1.3.278 to get the frameworks

* 
[CMake Options](#cmake-options)

* 
[3D models](#3d-models)

NB: For iOS you must run the setup-env.sh located inside the Vulkan SDK’s iOS directory

source /PATH/TO/VULKAN/SDK/iOS/setup-env.sh

`Step 1.` The following command will generate the project

cmake -G Xcode -Bbuild/ios -DCMAKE_BUILD_TYPE=Release -DCMAKE_SYSTEM_NAME=iOS -DCMAKE_OSX_SYSROOT=iphoneos -DCMAKE_OSX_DEPLOYMENT_TARGET=16.3 -DCMAKE_XCODE_ATTRIBUTE_ONLY_ACTIVE_ARCH=YES -DCMAKE_OSX_ARCHITECTURES=arm64 -DCMAKE_IOS_INSTALL_COMBINED=NO -DCMAKE_XCODE_ATTRIBUTE_DEVELOPMENT_TEAM="XXXX" -DMACOSX_BUNDLE_GUI_IDENTIFIER="com.YYYY.vulkansamples"

NB:  You MUST change the XXXX in the above to your TeamID (or Organizational Unit identifier in your Apple Development certificate) for code signing, and YYYY to your bundle identifier. iOS will NOT allow the application to run without code signing and bundle identifier setup.

Alternatively, you can build for the iOS Simulator (requires Vulkan SDK 1.4.321.0 or later) without code signing or specifying a bundle identifier (a default bundle id will be used). However, depending on your host architecture, you MUST select either arm64 (Apple Silicon) or x86_64 in the command below. *Note: On arm64 (Apple Silicon) hosts the Vulkan library may not load on iOS Simulator without specifying your TeamID and bundle identifier as shown above.*

cmake -G Xcode -Bbuild/ios-sim -DCMAKE_BUILD_TYPE=Release -DCMAKE_SYSTEM_NAME=iOS -DCMAKE_OSX_SYSROOT=iphonesimulator -DCMAKE_OSX_DEPLOYMENT_TARGET=16.3 -DCMAKE_XCODE_ATTRIBUTE_ONLY_ACTIVE_ARCH=YES -DCMAKE_OSX_ARCHITECTURES= -DCMAKE_IOS_INSTALL_COMBINED=NO

`Step 2.` Build the project

It’s recommended to open the **vulkan_samples** Xcode project that is generated inside build/ios or build/ios-sim and build with command-B.

Alternatively, you can build with cmake as shown here

cmake --build build/ios --config Release --target vulkan_samples -j$(sysctl -n hw.ncpu) -- -allowProvisioningUpdates

`Step 3.` Run the **Vulkan Samples** application

To run Vulkan Samples, one must have an iOS physical or simulator device provisioned and working with Xcode.  Open the Xcode project and ensure that can build/install to a device through Xcode normally.
Once the bundle is created from the build command in Step 2, use the edit-scheme selection in Xcode and set the arguments to --help.
Click the "Play" button and you should see the help output in the terminal.
For convenience, the default setting is to run the hello_triangle sample; just edit that to your desired sample to run.

For all dependencies set the following environment variables:

* 
JDK 8+ `JAVA_HOME=/java`

* 
Android SDK `ANDROID_HOME=/android-sdk`

* 
CMake v3.16+

* 
Android NDK r23+ `ANDROID_NDK_HOME=/android-ndk`

* 
[CMake Options](#cmake-options)

* 
[3D models](#3d-models)

* 
[Performance data](#performance-data)

> 

We use this environment in the CI [Android NDK Repository](https://github.com/KhronosGroupActions/android-ndk-build)

It is highly recommended to install [Android Studio](https://d.android.com/studio) to build, run and trace the sample project. Building via Android Studio requires at least Ladybug 2024.2.1.

Android Studio uses the following plugins/tools to build samples:

* 
Android Gradle Plugin

* 
CMake Plugin, which installs and uses Ninja

* 
NDK

Their versions are configured in the [build.gradle.in](https://github.com/KhronosGroup/Vulkan-Samples/blob/main/bldsys/cmake/template/gradle/build.gradle.in) and [app.build.gradle.in files](https://github.com/KhronosGroup/Vulkan-Samples/blob/main/bldsys/cmake/template/gradle/app.build.gradle.in);
when updating these versions, refer to [the official documentation for the recommended combinations](https://developer.android.com/studio/projects/install-ndk#default-ndk-per-agp).

To generate the gradle project, run the following command:

./scripts/generate.py android

A new folder will be created in the root directory at `build\android_gradle`

[Android Gradle Plugin](https://d.android.com/reference/tools/gradle-api) (used by Android Studio) may not auto install dependencies.
You will need to install them if they have not been installed:

* 
Find the configured versions in `build/android_gradle/app/build.gradle`, or its template file [`bldsys/cmake/template/gradle/app.build.gradle.in`](https://github.com/KhronosGroup/Vulkan-Samples/blob/main/bldsys/cmake/template/gradle/app.build.gradle.in)

* 
[Install them with Android Studio](https://d.android.com/studio/projects/install-ndk) or [sdkmanager command line tool](https://d.android.com/studio/projects/configure-agp-ndk?language=agp4-1#command-line).
For example, to install AGP port CMake 3.22.1 and NDK version 25.1.8937393 on Linux, do the following:

 yes | ${your-sdk}/cmdline-tools/latest/bin/sdkmanager --licenses
 ${your-sdk}/cmdline-tools/latest/bin/sdkmanager --install "ndk;25.1.8937393" --channel=3
 ${your-sdk}/cmdline-tools/latest/bin/sdkmanager --install "cmake;3.22.1" --channel=3

cd build/android_gradle

> 

Prefer a release build for better performance unless you want to actively debug the application.

For a release build:

gradle assembleRelease

For a debug build:

gradle assembleDebug

You can now install the apk on a connected device using the Android Debug Bridge:

For a release build:

adb install app/build/outputs/apk/release/vulkan_samples-release.apk

For a debug build:

adb install app/build/outputs/apk/debug/vulkan_samples-debug.apk

With [Android Studio](https://d.android.com/studio) you can open the `build/android_gradle/build.gradle` project, compile and run the project from here.
The lastest Android Studio release is recommended.

If you have agreed with the licenses previously on your development system, Android Studio will automatically install, at the start up time, CMake and NDK with the version configured in your `build/android-gradle/build.gradle`.
Otherwise (or if the installation failed), you need to install the required CMake and NDK manually, refer to [the official instructions](https://d.android.com/studio/projects/install-ndk) for the detailed steps.
The default installed locations are:

* 
$SDK-ROOT-DIR/ndk/$ndkVersion for NDK.

* 
$SDK-ROOT-DIR/cmake/$cmake-version for CMake.

Android Studio will use the above default locations without any environment variable requirement;
if you want to use the same NDK and CMake versions for other purpose, you can simply configure your environment variables to these locations.
If you do set up the NDK and CMake environment variables, Android Studio will use them instead of the default locations.
