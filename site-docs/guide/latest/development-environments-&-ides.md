# Development Environments & IDEs

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/ide.html

## Table of Contents

- [Visual Studio](#visual-studio)
- [Basic Setup and Configuration](#_basic_setup_and_configuration)
- [Basic_Setup_and_Configuration](#_basic_setup_and_configuration)
- [IntelliSense Configuration](#_intellisense_configuration)
- [CMake Configuration](#_cmake_configuration)
- [Debugging and Profiling](#_debugging_and_profiling)
- [Debugging_and_Profiling](#_debugging_and_profiling)
- [Visual Studio Code](#visual-studio-code)
- [Visual_Studio_Code](#visual-studio-code)
- [Basic Setup and Configuration](#_basic_setup_and_configuration_2)
- [Basic_Setup_and_Configuration](#_basic_setup_and_configuration_2)
- [CMake Configuration](#_cmake_configuration_2)
- [Build Tasks Configuration](#_build_tasks_configuration)
- [Build_Tasks_Configuration](#_build_tasks_configuration)
- [Launch Configuration](#_launch_configuration)
- [Debugging and Profiling Integration](#_debugging_and_profiling_integration)
- [Debugging_and_Profiling_Integration](#_debugging_and_profiling_integration)
- [CLion](#clion)
- [Basic Setup and Configuration](#_basic_setup_and_configuration_3)
- [Basic_Setup_and_Configuration](#_basic_setup_and_configuration_3)
- [CMake Configuration](#_cmake_configuration_3)
- [Run/Debug Configuration](#_rundebug_configuration)
- [Profiling Integration](#_profiling_integration)
- [Xcode](#xcode)
- [Basic Setup and Configuration](#_basic_setup_and_configuration_4)
- [Basic_Setup_and_Configuration](#_basic_setup_and_configuration_4)
- [CMake Configuration](#_cmake_configuration_4)
- [Debugging Configuration](#_debugging_configuration)
- [Profiling Integration](#_profiling_integration_2)
- [MoltenVK Considerations](#_moltenvk_considerations)
- [Android Studio](#android-studio)
- [Basic Setup and Configuration](#_basic_setup_and_configuration_5)
- [Basic_Setup_and_Configuration](#_basic_setup_and_configuration_5)
- [NDK Configuration for Vulkan](#_ndk_configuration_for_vulkan)
- [NDK_Configuration_for_Vulkan](#_ndk_configuration_for_vulkan)
- [CMake Integration](#_cmake_integration)
- [Debugging and Profiling](#_debugging_and_profiling_2)
- [Debugging_and_Profiling](#_debugging_and_profiling_2)
- [General IDE Configuration for Vulkan Development](#general-ide-configuration)
- [General_IDE_Configuration_for_Vulkan_Development](#general-ide-configuration)
- [Universal Setup Principles](#_universal_setup_principles)
- [Universal_Setup_Principles](#_universal_setup_principles)
- [CMake as a Universal Build System](#_cmake_as_a_universal_build_system)
- [CMake_as_a_Universal_Build_System](#_cmake_as_a_universal_build_system)
- [Universal Debugging Approaches](#_universal_debugging_approaches)
- [Universal_Debugging_Approaches](#_universal_debugging_approaches)
- [Cross-Platform Profiling Integration](#_cross_platform_profiling_integration)
- [Cross-Platform_Profiling_Integration](#_cross_platform_profiling_integration)
- [IDE Configuration Checklist](#_ide_configuration_checklist)
- [IDE_Configuration_Checklist](#_ide_configuration_checklist)
- [Shader Debugging Integration](#shader-debugging)
- [Shader_Debugging_Integration](#shader-debugging)
- [Shader Debugging Tools](#_shader_debugging_tools)
- [Shader_Debugging_Tools](#_shader_debugging_tools)
- [RenderDoc](#_renderdoc)
- [GPU-Assisted Validation](#_gpu_assisted_validation)
- [Shader printf](#_shader_printf)
- [Vendor-Specific Tools](#_vendor_specific_tools)
- [IDE-Specific Shader Debugging Configurations](#_ide_specific_shader_debugging_configurations)
- [IDE-Specific_Shader_Debugging_Configurations](#_ide_specific_shader_debugging_configurations)
- [Visual Studio](#_visual_studio)
- [Visual Studio Code](#_visual_studio_code)
- [Visual_Studio_Code](#_visual_studio_code)
- [CLion](#_clion)
- [Xcode](#_xcode)
- [Android Studio](#_android_studio)
- [Shader Debugging Best Practices](#_shader_debugging_best_practices)
- [Shader_Debugging_Best_Practices](#_shader_debugging_best_practices)
- [GLSL vs HLSL Debugging Considerations](#_glsl_vs_hlsl_debugging_considerations)
- [GLSL_vs_HLSL_Debugging_Considerations](#_glsl_vs_hlsl_debugging_considerations)

## Content

Setting up a proper development environment can significantly improve productivity when working with Vulkan. This chapter covers how to configure popular IDEs for Vulkan development, with a focus on CMake integration.

Microsoft Visual Studio provides robust support for Vulkan development on Windows:

Install the [Vulkan SDK](https://vulkan.lunarg.com/) which provides the necessary headers, libraries, and tools.

In your Visual Studio project:

* 
Add the Vulkan SDK include directory to your project’s include paths (`$(VULKAN_SDK)/Include`)

* 
Add the Vulkan SDK library directory to your project’s library paths (`$(VULKAN_SDK)/Lib` or `$(VULKAN_SDK)/Lib32`)

* 
Link against `vulkan-1.lib`

To improve IntelliSense support for Vulkan:

Ensure your project includes the Vulkan SDK include directory

For better autocompletion, add the following to your precompiled header or a common header file:

#define VK_USE_PLATFORM_WIN32_KHR
#include 

Visual Studio has excellent CMake integration:

Open a CMake project in Visual Studio:

* 
File → Open → CMake…​

* 
Select your CMakeLists.txt file

Configure Vulkan in your CMakeLists.txt:

# Find Vulkan package
find_package(Vulkan REQUIRED)

# Add include directories
include_directories(${Vulkan_INCLUDE_DIRS})

# Create your executable
add_executable(your_app main.cpp)

# Link against Vulkan
target_link_libraries(your_app ${Vulkan_LIBRARIES})

Configure CMake settings in Visual Studio:

* 
Right-click on CMakeLists.txt → CMake Settings

* 
Add any additional CMake variables or configuration options

Visual Studio can be configured to work with Vulkan debugging and profiling tools:

Enable the Vulkan validation layers by setting the `VK_LAYER_PATH` environment variable in your project’s debugging properties

Configure RenderDoc integration:

* 
Install [RenderDoc](https://renderdoc.org/)

* 
In Visual Studio, go to Debug → Graphics → Start Graphics Debugging

* 
RenderDoc can capture and analyze Vulkan API calls

For profiling Vulkan applications:

* 
For NVIDIA GPUs, use [NVIDIA Nsight Graphics](development_tools.html#profiling) which integrates directly with Visual Studio

* 
For AMD GPUs, use [AMD Radeon GPU Profiler (RGP)](development_tools.html#profiling) through the Radeon Developer Panel

* 
For Intel GPUs, use [Intel Graphics Performance Analyzers (GPA)](development_tools.html#profiling)

* 
For cross-vendor profiling, consider [VKtracer](development_tools.html#profiling) or [GFXReconstruct](development_tools.html#profiling)

For more detailed information on profiling tools, see the [Profiling section](development_tools.html#profiling) in the Development Tools chapter.

VS Code is a lightweight but powerful editor that can be configured for Vulkan development:

Install the [Vulkan SDK](https://vulkan.lunarg.com/)

Install the following VS Code extensions:

* 
C/C++ extension by Microsoft

* 
CMake Tools (if using CMake)

* 
Shader languages support (GLSL, HLSL)

VS Code has excellent CMake integration through the CMake Tools extension:

Install the CMake Tools extension

Configure your CMakeLists.txt:

cmake_minimum_required(VERSION 3.10)
project(VulkanProject)

# Find Vulkan package
find_package(Vulkan REQUIRED)

# Create your executable
add_executable(your_app main.cpp)

# Link against Vulkan
target_link_libraries(your_app PUBLIC Vulkan::Vulkan)

Configure CMake in VS Code:

* 
Create a `.vscode/settings.json` file:

{
    "cmake.configureOnOpen": true,
    "cmake.buildDirectory": "${workspaceFolder}/build",
    "cmake.generator": "Ninja"
}

Create a `.vscode/tasks.json` file to configure build tasks:

{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "build",
            "type": "shell",
            "command": "cmake --build build",
            "group": {
                "kind": "build",
                "isDefault": true
            }
        }
    ]
}

Create a `.vscode/launch.json` file for debugging:

{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Debug Vulkan Application",
            "type": "cppdbg",
            "request": "launch",
            "program": "${workspaceFolder}/build/your_app",
            "args": [],
            "stopAtEntry": false,
            "cwd": "${workspaceFolder}",
            "environment": [
                {"name": "VK_LAYER_PATH", "value": "path/to/vulkan/sdk/layers"}
            ],
            "externalConsole": false
        }
    ]
}

VS Code can be integrated with various Vulkan profiling tools:

RenderDoc integration:

* 
Install the RenderDoc extension for VS Code

* 
Configure launch tasks to start RenderDoc with your application

* 
Analyze captured frames directly from VS Code

External profiling tools:

* 
Use [RenderDoc](development_tools.html#profiling) for frame capture and analysis

* 
For cross-platform profiling, use [VKtracer](development_tools.html#profiling) or [GFXReconstruct](development_tools.html#profiling)

* 
For vendor-specific profiling, launch the appropriate tool from the command line or use their VS Code extensions if available

For more detailed information on profiling tools, see the [Profiling section](development_tools.html#profiling) in the Development Tools chapter.

JetBrains CLion provides excellent support for Vulkan development with powerful code analysis and debugging capabilities:

Install the [Vulkan SDK](https://vulkan.lunarg.com/)

In CLion:

* 
Open your project’s CMakeLists.txt

* 
Configure the Vulkan include and library paths in your CMake configuration

CLion has built-in CMake support:

Create a new CMake project or open an existing one

Configure your CMakeLists.txt:

cmake_minimum_required(VERSION 3.10)
project(VulkanProject)

# Find Vulkan package
find_package(Vulkan REQUIRED)

# Create your executable
add_executable(your_app main.cpp)

# Link against Vulkan
target_link_libraries(your_app PUBLIC Vulkan::Vulkan)

CLion will automatically detect changes to CMakeLists.txt and reload the project

For more advanced configuration, you can modify CMake settings:

* 
File → Settings → Build, Execution, Deployment → CMake

* 
Add profiles for different build types (Debug, Release, etc.)

Create a Run/Debug Configuration for your Vulkan application:

* 
Go to Run → Edit Configurations

* 
Add a new configuration for your application

* 
In the Environment Variables section, add `VK_LAYER_PATH` pointing to your Vulkan SDK layers directory

For enhanced debugging:

* 
Enable the Vulkan validation layers in your application

* 
Configure RenderDoc integration by launching your application through RenderDoc

CLion can be integrated with various Vulkan profiling tools:

External profiling tools:

* 
Use [RenderDoc](development_tools.html#profiling) for frame capture and analysis

* 
For cross-platform profiling, use [VKtracer](development_tools.html#profiling) or [GFXReconstruct](development_tools.html#profiling)

Vendor-specific profiling:

* 
For NVIDIA GPUs, configure [NVIDIA Nsight Graphics](development_tools.html#profiling) as an external tool

* 
For AMD GPUs, use [AMD Radeon GPU Profiler (RGP)](development_tools.html#profiling) through the Radeon Developer Panel

* 
For Intel GPUs, configure [Intel Graphics Performance Analyzers (GPA)](development_tools.html#profiling) as an external tool

Configure external tools in CLion:

* 
Go to File → Settings → Tools → External Tools

* 
Add your profiling tools with appropriate command-line arguments

* 
Access them via Tools → External Tools in the menu

For more detailed information on profiling tools, see the [Profiling section](development_tools.html#profiling) in the Development Tools chapter.

Apple’s Xcode IDE can be used for Vulkan development on macOS, typically through MoltenVK, which is a Vulkan implementation that runs on Apple’s Metal API.

Install the [Vulkan SDK for macOS](https://vulkan.lunarg.com/sdk/home#mac), which includes MoltenVK

In your Xcode project:

* 
Add the Vulkan SDK include directory to your project’s include paths

* 
Add the MoltenVK framework to your project

* 
Link against the necessary libraries

Xcode can be used with CMake projects:

Generate an Xcode project from your CMake project:

cmake -G Xcode -B build .

Configure your CMakeLists.txt for macOS and MoltenVK:

cmake_minimum_required(VERSION 3.10)
project(VulkanProject)

# Find Vulkan package
find_package(Vulkan REQUIRED)

# Create your executable
add_executable(your_app main.cpp)

# Link against Vulkan
target_link_libraries(your_app PUBLIC Vulkan::Vulkan)

# For macOS, you might need to add MoltenVK-specific configuration
if(APPLE)
    # Add MoltenVK framework path
    set(MOLTENVK_PATH "$ENV{VULKAN_SDK}/MoltenVK/MoltenVK.xcframework")
    target_link_libraries(your_app PUBLIC "-framework Metal" "-framework
    MetalKit" "-framework Cocoa")

    # If using MoltenVK as a framework
    target_link_libraries(your_app PUBLIC "${MOLTENVK_PATH}")
endif()

Open the generated Xcode project:

open build/YourProject.xcodeproj

Configure debugging in Xcode:

* 
Edit your scheme (Product → Scheme → Edit Scheme)

* 
In the Run section, go to Arguments

* 
Add environment variables for Vulkan validation layers:

* 
`VK_LAYER_PATH` pointing to your Vulkan SDK layers directory

* 
`VK_ICD_FILENAMES` pointing to your MoltenVK ICD JSON file

For enhanced debugging:

* 
Enable the Vulkan validation layers in your application

* 
Use Xcode’s built-in debugging tools

* 
Consider using RenderDoc (though support on macOS may be limited)

Profiling Vulkan applications on macOS through MoltenVK has some limitations, but several options are available:

Xcode Instruments:

* 
Use Xcode’s built-in Instruments tool (Xcode → Product → Profile)

* 
The Metal System Trace instrument can help analyze GPU performance

* 
The Time Profiler can identify CPU bottlenecks in your Vulkan application

MoltenVK-specific profiling:

* 
Enable MoltenVK’s performance tracking features

* 
Add the following to your environment variables:

* 
`MVK_CONFIG_TRACE_VULKAN_CALLS=1` to log Vulkan API calls

* 
`MVK_CONFIG_PERFORMANCE_TRACKING=1` to enable performance tracking

External profiling tools:

* 
For cross-platform profiling, consider [VKtracer](development_tools.html#profiling) which works on macOS

* 
[GFXReconstruct](development_tools.html#profiling) can be used to capture and replay Vulkan API calls

For more detailed information on profiling tools, see the [Profiling section](development_tools.html#profiling) in the Development Tools chapter.

When using Vulkan on macOS through MoltenVK, keep in mind:

Not all Vulkan features are supported by MoltenVK, as it translates Vulkan to Metal

Check the [MoltenVK documentation](https://github.com/KhronosGroup/MoltenVK) for supported features and limitations

Use the `VK_MVK_moltenvk` extension for MoltenVK-specific functionality

Consider using the Vulkan Portability subset for better cross-platform compatibility

Android Studio is the official IDE for Android development and provides excellent support for Vulkan development on Android devices:

Install [Android Studio](https://developer.android.com/studio)

Install the Android NDK (Native Development Kit) through the SDK Manager:

* 
Open Android Studio → Tools → SDK Manager

* 
Select the "SDK Tools" tab

* 
Check "NDK (Side by side)" and "CMake"

* 
Click "Apply" to download and install

Configure your project for Vulkan:

* 
Create a new Android project with Native C support or add C to an existing project

* 
In your `app/build.gradle` file, ensure the minimum SDK version supports Vulkan:

android {
    defaultConfig {
        minSdkVersion 24 // Vulkan requires Android 7.0 (API level 24) or higher
        // ...
    }
    // ...
}

Add Vulkan headers to your project:

* 
The Vulkan headers are included in the Android NDK

* 
In your `CMakeLists.txt`, add:

# Find the Vulkan package
find_package(Vulkan REQUIRED)

# Include Vulkan headers
include_directories(${VULKAN_INCLUDE_DIRS})

# Link against Vulkan
target_link_libraries(your_native_lib Vulkan::Vulkan)

Configure your Android manifest to require Vulkan:

    
    

    
    

    

Android Studio uses CMake for native code projects:

Configure your `CMakeLists.txt` for Android and Vulkan:

cmake_minimum_required(VERSION 3.10)
project(VulkanAndroidProject)

# Find Vulkan package
find_package(Vulkan REQUIRED)

# Add your source files
add_library(native-lib SHARED
    native-lib.cpp
    vulkan_wrapper.cpp
    # Add other source files
)

# Include directories
target_include_directories(native-lib PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}/include
    ${VULKAN_INCLUDE_DIRS}
)

# Link against libraries
target_link_libraries(native-lib
    android
    log
    Vulkan::Vulkan
)

Configure the CMake settings in your `app/build.gradle`:

android {
    // ...
    defaultConfig {
        // ...
        externalNativeBuild {
            cmake {
                cppFlags "-std=c++17"
                arguments "-DANDROID_STL=c++_shared"
            }
        }
    }

    externalNativeBuild {
        cmake {
            path "src/main/cpp/CMakeLists.txt"
            version "3.10.2"
        }
    }
}

Android Studio provides several tools for debugging and profiling Vulkan applications:

Native debugging:

* 
Set breakpoints in your C++ code

* 
Use the debugger to step through your Vulkan code

* 
Inspect variables and memory

GPU debugging and profiling:

* 
Use [Android GPU Inspector (AGI)](development_tools.html#profiling) for GPU profiling and debugging

* 
AGI can be launched directly from Android Studio via Tools → Android → Android GPU Inspector

* 
Capture Vulkan API calls, analyze GPU workloads, and identify performance bottlenecks

System tracing:

* 
Use Android Studio’s built-in System Trace tool (Profiler → System Trace)

* 
Analyze CPU, GPU, and system-level performance

For Qualcomm Adreno GPUs:

* 
Use [Qualcomm Snapdragon Profiler](development_tools.html#profiling) for detailed GPU analysis

* 
Provides Vulkan-specific insights for Adreno GPUs

For more information on profiling tools for Vulkan on Android, see the [Profiling section](development_tools.html#profiling) in the Development Tools chapter.

While the previous sections covered specific IDEs in detail, many developers may use other development environments or prefer a more universal approach. This section provides general guidelines for configuring any IDE for Vulkan development, with a focus on using CMake as a cross-platform build system.

Regardless of which IDE you use, the following steps are essential for Vulkan development:

Install the [Vulkan SDK](https://vulkan.lunarg.com/) for your platform

* 
Ensure the SDK’s bin directory is in your system PATH

* 
Note the location of the SDK for include and library paths

Configure your IDE’s include paths to find Vulkan headers:

* 
Add `$(VULKAN_SDK)/Include` or equivalent to your include paths

* 
For platform-specific development, include the appropriate platform headers

Configure library paths to find Vulkan libraries:

* 
Add `$(VULKAN_SDK)/Lib` or equivalent to your library paths

* 
Link against the appropriate Vulkan library (`vulkan-1.lib` on Windows, `libvulkan.so` on Linux, etc.)

Install necessary development tools:

* 
Shader compilers (glslangValidator, DXC, slangc)

* 
Validation layer tools

* 
Debugging and profiling tools (RenderDoc, GPU-specific tools)

CMake provides a consistent way to configure Vulkan projects across different IDEs and platforms:

Create a basic CMakeLists.txt for your Vulkan project:

cmake_minimum_required(VERSION 3.10)
project(VulkanProject)

# Find Vulkan package
find_package(Vulkan REQUIRED)

# Create your executable
add_executable(your_app main.cpp)

# Modern CMake approach with target_* commands
target_include_directories(your_app PRIVATE ${Vulkan_INCLUDE_DIRS})
target_link_libraries(your_app PRIVATE Vulkan::Vulkan)

# Platform-specific configurations
if(WIN32)
    target_compile_definitions(your_app PRIVATE VK_USE_PLATFORM_WIN32_KHR)
elseif(APPLE)
    target_compile_definitions(your_app PRIVATE VK_USE_PLATFORM_MACOS_MVK)
    # Link against Metal framework for MoltenVK
    target_link_libraries(your_app PRIVATE "-framework Metal" "-framework MetalKit" "-framework Cocoa")
elseif(UNIX AND NOT APPLE)
    # Linux-specific configuration
    target_compile_definitions(your_app PRIVATE VK_USE_PLATFORM_XCB_KHR)
    # You might need to link against XCB or Wayland libraries
endif()

Configure your IDE to use CMake:

* 
Most modern IDEs have built-in CMake support or plugins

* 
For IDEs without direct CMake support, you can generate project files:

* 
For Visual Studio: `cmake -G "Visual Studio 16 2019" -A x64 -B build .`

* 
For Xcode: `cmake -G Xcode -B build .`

* 
For Makefiles: `cmake -G "Unix Makefiles" -B build .`

Shader compilation in CMake:

# Function to compile GLSL shaders to SPIR-V
function(compile_shader TARGET_NAME SHADER_SOURCE SHADER_OUTPUT)
    add_custom_command(
        OUTPUT ${SHADER_OUTPUT}
        COMMAND ${CMAKE_COMMAND} -E make_directory "${CMAKE_CURRENT_BINARY_DIR}/shaders"
        COMMAND $ENV{VULKAN_SDK}/bin/glslangValidator -V "${SHADER_SOURCE}" -o "${SHADER_OUTPUT}"
        DEPENDS ${SHADER_SOURCE}
        COMMENT "Compiling ${SHADER_SOURCE} to ${SHADER_OUTPUT}"
    )
    add_custom_target(${TARGET_NAME} DEPENDS ${SHADER_OUTPUT})
endfunction()

# Example usage
compile_shader(
    compile_vertex_shader
    ${CMAKE_CURRENT_SOURCE_DIR}/shaders/shader.vert
    ${CMAKE_CURRENT_BINARY_DIR}/shaders/vert.spv
)
add_dependencies(your_app compile_vertex_shader)

Regardless of the IDE, these debugging techniques apply to all Vulkan applications:

Enable validation layers:

* 
Set environment variables in your IDE’s debug configuration:

* 
`VK_LAYER_PATH` pointing to your Vulkan SDK layers directory

* 
`VK_INSTANCE_LAYERS=VK_LAYER_KHRONOS_validation` to enable validation

Configure your application to use debug callbacks:

// Set up debug messenger
VkDebugUtilsMessengerCreateInfoEXT createInfo = {};
createInfo.sType = VK_STRUCTURE_TYPE_DEBUG_UTILS_MESSENGER_CREATE_INFO_EXT;
createInfo.messageSeverity = VK_DEBUG_UTILS_MESSAGE_SEVERITY_VERBOSE_BIT_EXT |
                             VK_DEBUG_UTILS_MESSAGE_SEVERITY_WARNING_BIT_EXT |
                             VK_DEBUG_UTILS_MESSAGE_SEVERITY_ERROR_BIT_EXT;
createInfo.messageType = VK_DEBUG_UTILS_MESSAGE_TYPE_GENERAL_BIT_EXT |
                         VK_DEBUG_UTILS_MESSAGE_TYPE_VALIDATION_BIT_EXT |
                         VK_DEBUG_UTILS_MESSAGE_TYPE_PERFORMANCE_BIT_EXT;
createInfo.pfnUserCallback = debugCallback;  // Your callback function

Use external debugging tools:

* 
RenderDoc works with most IDEs and platforms

* 
Configure your IDE to launch your application through RenderDoc

* 
For GPU-specific debugging, use vendor tools as described in the [Debugging section](development_tools.html#debugging)

For profiling Vulkan applications in any IDE:

Configure your IDE to launch external profiling tools:

* 
Create custom run configurations or external tool integrations

* 
Set up keyboard shortcuts for common profiling tasks

Use universal profiling tools:

* 
[RenderDoc](development_tools.html#profiling) for frame capture and basic profiling

* 
[VKtracer](development_tools.html#profiling) for cross-vendor API tracing

* 
[GFXReconstruct](development_tools.html#profiling) for capture and replay

For detailed GPU profiling:

* 
Use vendor-specific tools as described in the [Profiling section](development_tools.html#profiling)

* 
Configure your IDE to set the necessary environment variables for these tools

When setting up any IDE for Vulkan development, ensure you’ve addressed these key points:

✓ Vulkan SDK is properly installed and configured

✓ Include and library paths are correctly set

✓ Build system (preferably CMake) is configured

✓ Shader compilation is integrated into the build process

✓ Debugging with validation layers is enabled

✓ Profiling tools are accessible

✓ Platform-specific considerations are addressed

By following these universal principles, you can configure virtually any IDE for effective Vulkan development, leveraging the power of CMake for cross-platform compatibility and consistent build processes.

Debugging shaders in Vulkan applications presents unique challenges compared to debugging CPU code. This section covers tools, techniques, and IDE integrations for effective shader debugging.

Several tools are available for debugging Vulkan shaders:

[RenderDoc](https://renderdoc.org/) is one of the most powerful tools for shader debugging:

Shader Inspection:

* 
View and edit shader code at runtime

* 
Inspect shader inputs and outputs

* 
Analyze shader resources (textures, buffers, etc.)

Shader Debugging:

* 
Step through shader execution line by line

* 
Inspect variable values at each step

* 
View shader register contents

* 
Visualize texture accesses and sampling operations

IDE Integration:

* 
Visual Studio: Use the RenderDoc plugin or launch via Debug → Graphics → Start Graphics Debugging

* 
VS Code: Use the RenderDoc extension

* 
CLion/Android Studio: Configure as an external tool

VS Code launch.json example for RenderDoc integration

{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Launch with RenderDoc",
            "type": "cppvsdbg",
            "request": "launch",
            "program": "path/to/renderdoc.exe",
            "args": ["--capture-file", "${workspaceFolder}/capture.rdc", "${workspaceFolder}/build/your_app.exe"],
            "stopAtEntry": false,
            "cwd": "${workspaceFolder}",
            "environment": []
        }
    ]
}

The Vulkan validation layers include GPU-Assisted Validation, which instruments shader code to detect errors:

* 
Enable in your application:

// Enable GPU-Assisted Validation
VkValidationFeaturesEXT validationFeatures{};
validationFeatures.sType = VK_STRUCTURE_TYPE_VALIDATION_FEATURES_EXT;
validationFeatures.enabledValidationFeatureCount = 1;
VkValidationFeatureEnableEXT enabledFeatures[] = {VK_VALIDATION_FEATURE_ENABLE_GPU_ASSISTED_EXT};
validationFeatures.pEnabledValidationFeatures = enabledFeatures;

// Add to instance creation info
VkInstanceCreateInfo createInfo{};
createInfo.pNext = &validationFeatures;

* 
IDE Integration:

* 
Add the above code to your debug builds

* 
Configure environment variables in your IDE’s debug configuration:

VS Code environment variables configuration example

{
    "environment": [
        {"name": "VK_LAYER_PATH", "value": "path/to/vulkan/sdk/layers"},
        {"name": "VK_INSTANCE_LAYERS", "value": "VK_LAYER_KHRONOS_validation"}
    ]
}

The Shader printf feature allows you to print values from within your shaders:

* 
GLSL Implementation:

#version 450
#extension GL_EXT_debug_printf : enable

void main() {
    vec4 color = vec4(1.0, 0.0, 0.0, 1.0);
    debugPrintfEXT("Fragment color: %f, %f, %f, %f", color.r, color.g, color.b, color.a);
    // Rest of shader code...
}

* 
HLSL Implementation:

[[vk::ext_capability(5056)]] // SPV_KHR_non_semantic_info
[[vk::ext_extension("SPV_KHR_non_semantic_info")]]
float4 main() : SV_TARGET
{
    float4 color = float4(1.0, 0.0, 0.0, 1.0);
    printf("Fragment color: %f, %f, %f, %f\n", color.r, color.g, color.b, color.a);
    return color;
}

* 
Enable in your application:

// Enable Shader printf
VkValidationFeaturesEXT validationFeatures{};
validationFeatures.sType = VK_STRUCTURE_TYPE_VALIDATION_FEATURES_EXT;
validationFeatures.enabledValidationFeatureCount = 1;
VkValidationFeatureEnableEXT enabledFeatures[] = {VK_VALIDATION_FEATURE_ENABLE_DEBUG_PRINTF_EXT};
validationFeatures.pEnabledValidationFeatures = enabledFeatures;

// Add to instance creation info
VkInstanceCreateInfo createInfo{};
createInfo.pNext = &validationFeatures;

* 
Using environment variables (fast path):

* 
Environment variables provide a quicker way to enable shader printf without code changes

* 
These variables help avoid common configuration issues where shader printf appears not to work

* 
Key environment variables:

`VK_VALIDATION_FEATURES=DEBUG_PRINTF`: Enables shader printf while disabling other validation

* 
`VK_VALIDATION_FEATURES=+DEBUG_PRINTF,-CORE_VALIDATION`: Enables shader printf and disables core validation

* 
`VK_LAYER_ENABLES`: Controls which validation layers are enabled

* 
`VK_DBG_LAYER_LEVEL`: Controls the log level for validation messages

* 
`VK_LAYER_PRINTF_ONLY_PRESET`: Preset that enables only shader printf functionality while disabling other validation features

* 
`VK_LAYER_PRINTF_TO_STDOUT`: Redirects shader printf output to stdout instead of the debug callback

Example configuration:

# Enable shader printf and disable core validation
export VK_VALIDATION_FEATURES=+DEBUG_PRINTF,-CORE_VALIDATION
# Set debug log level to verbose
export VK_DBG_LAYER_LEVEL=info

# Alternative: Use the printf-only preset (simpler approach)
export VK_LAYER_PRINTF_ONLY_PRESET=1

# Optional: Redirect printf output to stdout instead of debug callback
export VK_LAYER_PRINTF_TO_STDOUT=1

IDE Integration:

Configure your IDE to capture debug output

For Visual Studio: Debug → Windows → Output

For VS Code: Add "console": "integratedTerminal" to your launch.json

Set environment variables in your IDE’s debug configuration

Vendor-specific tools offer advanced shader debugging capabilities:

NVIDIA Nsight Graphics:

* 
Shader Profiler: Analyze shader performance

* 
Shader Debugger: Step through shader execution

* 
Resource Viewer: Inspect textures and buffers

* 
Visual Studio integration available

AMD Radeon GPU Analyzer (RGA):

* 
Static shader analysis

* 
Disassembly view

* 
Register usage statistics

* 
Performance suggestions

Intel Graphics Debugger:

* 
Shader debugging

* 
API tracing

* 
Resource inspection

* 
Performance analysis

Configure RenderDoc integration:

* 
Install the RenderDoc plugin for Visual Studio

* 
Use Debug → Graphics → Start Graphics Debugging

* 
Capture frames and analyze shaders

Configure shader printf environment variables:

* 
Right-click on your project → Properties → Debugging

* 
In the "Environment" field, add the following:

`VK_VALIDATION_FEATURES=+DEBUG_PRINTF,-CORE_VALIDATION`

* 
`VK_DBG_LAYER_LEVEL=info`

* 
Or use the simpler approach: `VK_LAYER_PRINTF_ONLY_PRESET=1`

* 
Optionally add: `VK_LAYER_PRINTF_TO_STDOUT=1` to redirect output to stdout

These environment variables provide a fast path for enabling shader printf without code changes

Output will appear in the Debug → Windows → Output window (or in the console if using stdout redirection)

Configure NVIDIA Nsight integration:

* 
Install NVIDIA Nsight Graphics

* 
Use Extensions → NVIDIA → Start Graphics Debugging

* 
Use the shader debugger to step through shader code

Configure AMD integration:

* 
Install AMD Radeon Developer Panel

* 
Configure as an external tool

* 
Capture and analyze shader performance

Configure RenderDoc integration:

* 
Install the RenderDoc extension

* 
Add a launch configuration to start your application with RenderDoc

* 
Analyze captured frames

Configure shader debugging environment:

* 
Add validation layer environment variables to launch.json

* 
Configure terminal output capture for shader printf

* 
Use the fast path environment variables for quick shader printf setup

* 
You can use `VK_LAYER_PRINTF_ONLY_PRESET` for a simpler approach

* 
Use `VK_LAYER_PRINTF_TO_STDOUT` to redirect output to stdout

VS Code launch.json for shader debugging with standard approach

{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Debug Vulkan Shaders",
            "type": "cppdbg",
            "request": "launch",
            "program": "${workspaceFolder}/build/your_app",
            "args": [],
            "stopAtEntry": false,
            "cwd": "${workspaceFolder}",
            "environment": [
                {"name": "VK_LAYER_PATH", "value": "path/to/vulkan/sdk/layers"},
                {"name": "VK_INSTANCE_LAYERS", "value": "VK_LAYER_KHRONOS_validation"},
                {"name": "VK_VALIDATION_FEATURES", "value": "+DEBUG_PRINTF,-CORE_VALIDATION"},
                {"name": "VK_DBG_LAYER_LEVEL", "value": "info"}
            ],
            "console": "integratedTerminal"
        }
    ]
}

VS Code launch.json for shader debugging with printf-only preset

{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Debug Vulkan Shaders (Printf Only)",
            "type": "cppdbg",
            "request": "launch",
            "program": "${workspaceFolder}/build/your_app",
            "args": [],
            "stopAtEntry": false,
            "cwd": "${workspaceFolder}",
            "environment": [
                {"name": "VK_LAYER_PATH", "value": "path/to/vulkan/sdk/layers"},
                {"name": "VK_LAYER_PRINTF_ONLY_PRESET", "value": "1"},
                {"name": "VK_LAYER_PRINTF_TO_STDOUT", "value": "1"}
            ],
            "console": "integratedTerminal"
        }
    ]
}

Configure RenderDoc as an external tool:

* 
Go to File → Settings → Tools → External Tools

* 
Add RenderDoc with appropriate command-line arguments

* 
Create a run configuration that uses this external tool

Configure shader debugging environment:

* 
Go to Run → Edit Configurations → Select your configuration

* 
Click on "Environment Variables" and add:

`VK_VALIDATION_FEATURES=+DEBUG_PRINTF,-CORE_VALIDATION`

* 
`VK_DBG_LAYER_LEVEL=info`

* 
Or use the simpler approach: `VK_LAYER_PRINTF_ONLY_PRESET=1`

* 
Optionally add: `VK_LAYER_PRINTF_TO_STDOUT=1` to redirect output to stdout

These environment variables provide a fast path for enabling shader printf without code changes

Enable console output capture for shader printf by selecting "Allow parallel run"

Configure shader debugging on macOS:

* 
MoltenVK has limited shader debugging support

* 
Edit your scheme (Product → Scheme → Edit Scheme)

* 
In the Run section, go to Arguments → Environment Variables and add:

`VK_VALIDATION_FEATURES=+DEBUG_PRINTF,-CORE_VALIDATION`

* 
`VK_DBG_LAYER_LEVEL=info`

* 
Or use the simpler approach: `VK_LAYER_PRINTF_ONLY_PRESET=1`

* 
Optionally add: `VK_LAYER_PRINTF_TO_STDOUT=1` to redirect output to stdout

These environment variables provide a fast path for enabling shader printf without code changes

Configure shader printf output capture by enabling "Show Debug Output" in the Options tab

Alternative approaches:

* 
Use RenderDoc on a different platform for shader debugging

* 
Use Metal shader debugging tools for MoltenVK applications

Configure Android GPU Inspector (AGI):

* 
Launch AGI from Tools → Android → Android GPU Inspector

* 
Capture frames and analyze shaders

* 
Inspect shader resources and performance

Configure shader debugging for Android:

* 
Add validation layer configuration to your application

* 
For shader printf, add the following to your AndroidManifest.xml:

    
    
    

    
    

    
    

* 
These meta-data entries provide a fast path for enabling shader printf without code changes

* 
Use logcat to capture shader printf output with the filter tag "Vulkan"

**Start with validation layers**: Enable validation layers to catch basic shader errors before using more advanced debugging tools.

**Use shader printf strategically**: Add printf statements at key points in your shader code to track execution flow and variable values.

**Simplify shaders during debugging**: Temporarily simplify complex shaders to isolate issues.

**Debug with simple scenes**: Use simple test scenes that isolate the shader being debugged.

**Check shader compilation**: Verify that shaders compile correctly before runtime debugging:

* 
Use `glslangValidator` for GLSL shaders

* 
Use `dxc` with the `-Zi` flag for HLSL shaders to include debug information

**Visualize intermediate results**: Output intermediate calculations to color to visually debug complex algorithms.

**Compare against reference implementations**: Implement the same algorithm on CPU and compare results.

**Use debug views**: Create special debug views that visualize specific shader attributes (normals, UVs, etc.).

GLSL Debugging:

* 
Use `GL_EXT_debug_printf` extension for printf functionality

* 
RenderDoc has excellent support for GLSL shader debugging

* 
Use `glslangValidator` with `-g` flag to include debug information

HLSL Debugging:

* 
Use the DirectX Shader Compiler (DXC) with debugging flags

* 
Add the `-Zi` flag to include debug information

* 
Use the `-Od` flag to disable optimizations for better debugging

* 
HLSL printf requires special extensions as shown in the example above

# Compile HLSL with debug information
dxc.exe -spirv -T ps_6_0 -E main -Zi -Od shader.hlsl -Fo shader.spv

For more information on debugging tools, see the [Debugging section](development_tools.html#debugging) in the Development Tools chapter.
