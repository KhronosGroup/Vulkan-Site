# Vulkan Versions & Porting Guide

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/versions.html

## Table of Contents

- [Instance and Device](#_instance_and_device)
- [Instance_and_Device](#_instance_and_device)
- [Header](#_header)
- [SPIR-V](#_spir_v)
- [Extensions](#_extensions)
- [Structs and enums](#_structs_and_enums)
- [Structs_and_enums](#_structs_and_enums)
- [Functions](#_functions)
- [Features](#_features)
- [Limits](#_limits)
- [Vulkan 1.1 Features Breakdown](#_vulkan_1_1_features_breakdown)
- [Vulkan_1.1_Features_Breakdown](#_vulkan_1_1_features_breakdown)
- [Subgroups](#_subgroups)
- [Protected Memory](#_protected_memory)
- [Device Groups](#_device_groups)
- [External Memory and Synchronization](#_external_memory_and_synchronization)
- [External_Memory_and_Synchronization](#_external_memory_and_synchronization)
- [Other Notable Features](#_other_notable_features)
- [Other_Notable_Features](#_other_notable_features)
- [Vulkan 1.2 Features Breakdown](#_vulkan_1_2_features_breakdown)
- [Vulkan_1.2_Features_Breakdown](#_vulkan_1_2_features_breakdown)
- [Descriptor Indexing](#_descriptor_indexing)
- [Timeline Semaphores](#_timeline_semaphores)
- [Buffer Device Address](#_buffer_device_address)
- [Buffer_Device_Address](#_buffer_device_address)
- [Shader Atomic Operations](#_shader_atomic_operations)
- [Shader_Atomic_Operations](#_shader_atomic_operations)
- [Other Notable Features](#_other_notable_features_2)
- [Other_Notable_Features](#_other_notable_features_2)
- [Vulkan 1.3 Features Breakdown](#_vulkan_1_3_features_breakdown)
- [Vulkan_1.3_Features_Breakdown](#_vulkan_1_3_features_breakdown)
- [Dynamic Rendering](#_dynamic_rendering)
- [Synchronization2](#_synchronization2)
- [Extended Dynamic State](#_extended_dynamic_state)
- [Extended_Dynamic_State](#_extended_dynamic_state)
- [Other Notable Features](#_other_notable_features_3)
- [Other_Notable_Features](#_other_notable_features_3)
- [Vulkan 1.4 Features Breakdown](#_vulkan_1_4_features_breakdown)
- [Vulkan_1.4_Features_Breakdown](#_vulkan_1_4_features_breakdown)
- [Dynamic Rendering Local Read](#_dynamic_rendering_local_read)
- [Dynamic_Rendering_Local_Read](#_dynamic_rendering_local_read)
- [Line Rasterization](#_line_rasterization)
- [Memory Management Improvements](#_memory_management_improvements)
- [Memory_Management_Improvements](#_memory_management_improvements)
- [Shader Enhancements](#_shader_enhancements)
- [Other Notable Features](#_other_notable_features_4)
- [Other_Notable_Features](#_other_notable_features_4)
- [Porting from Vulkan 1.0 to Any Version](#_porting_from_vulkan_1_0_to_any_version)
- [Porting_from_Vulkan_1.0_to_Any_Version](#_porting_from_vulkan_1_0_to_any_version)
- [General Porting Checklist](#_general_porting_checklist)
- [General_Porting_Checklist](#_general_porting_checklist)
- [Version-Specific Considerations](#_version_specific_considerations)
- [Vulkan 1.1 Specific](#_vulkan_1_1_specific)
- [Vulkan_1.1_Specific](#_vulkan_1_1_specific)
- [Vulkan 1.2 Specific](#_vulkan_1_2_specific)
- [Vulkan_1.2_Specific](#_vulkan_1_2_specific)
- [Vulkan 1.3 Specific](#_vulkan_1_3_specific)
- [Vulkan_1.3_Specific](#_vulkan_1_3_specific)
- [Vulkan 1.4 Specific](#_vulkan_1_4_specific)
- [Vulkan_1.4_Specific](#_vulkan_1_4_specific)
- [Backward Compatibility Considerations](#_backward_compatibility_considerations)
- [Backward_Compatibility_Considerations](#_backward_compatibility_considerations)
- [Requesting Features from Different Versions](#_requesting_features_from_different_versions)
- [Requesting_Features_from_Different_Versions](#_requesting_features_from_different_versions)
- [Core Version Features](#_core_version_features)
- [Core_Version_Features](#_core_version_features)
- [Extension Features](#_extension_features)
- [Best Practices](#_best_practices)

## Content

Vulkan works on a [major, minor, patch](https://docs.vulkan.org/spec/latest/chapters/extensions.html#extendingvulkan-coreversions-versionnumbers) versioning system. Currently, there are 5 minor version releases of Vulkan (1.0, 1.1, 1.2, 1.3, and 1.4) which are backward compatible with each other. An application can use [vkEnumerateInstanceVersion](https://docs.vulkan.org/spec/latest/chapters/initialization.html#vkEnumerateInstanceVersion) to check what version of a Vulkan instance is supported. There is also a [white paper](https://www.lunarg.com/wp-content/uploads/2019/02/Vulkan-1.1-Compatibility-Statement_01_19.pdf) by LunarG on how to query and check for the supported version.

It is important to remember there is a difference between the instance-level version and device-level version. It is possible that the loader and implementations will support different versions. The [Querying Version Support](https://docs.vulkan.org/spec/latest/chapters/extensions.html#extendingvulkan-coreversions-queryingversionsupport) section in the Vulkan Spec goes into details on how to query for supported versions at both the instance and device level.

There is only one supported header for all major releases of Vulkan. This means that there is no such thing as “Vulkan 1.0 headers” as all headers for a minor and patch version are unified. This should not be confused with the ability to generate a 1.0 version of the [Vulkan Spec](vulkan_spec.html#vulkan-spec), as the Vulkan Spec and header of the same patch version will match. An example would be that the generated 1.0.42 Vulkan Spec will match the 1.x.42 header.

It is highly recommended that developers try to keep up to date with the latest header files released. The Vulkan SDK comes in many versions which map to the header version it will have been packaged for.

Every minor version of Vulkan maps to a version of [SPIR-V that must be supported](https://docs.vulkan.org/spec/latest/appendices/spirvenv.html).

* 
Vulkan 1.0 supports SPIR-V 1.0

* 
Vulkan 1.1 supports SPIR-V 1.3 and below

* 
Vulkan 1.2 supports SPIR-V 1.5 and below

* 
Vulkan 1.3 supports SPIR-V 1.6 and below

* 
Vulkan 1.4 supports SPIR-V 1.6 and below

It is up to the application to make sure that the SPIR-V in `VkShaderModule` is of a valid version to the corresponding Vulkan version.

Between minor versions of Vulkan, [some extensions](https://docs.vulkan.org/spec/latest/appendices/versions.html#versions-1.1) get [promoted](https://docs.vulkan.org/spec/latest/chapters/extensions.html#extendingvulkan-compatibility-promotion) to the [core version](https://docs.vulkan.org/spec/latest/chapters/extensions.html#extendingvulkan-coreversions). When targeting a newer minor version of Vulkan, an application will not need to enable the newly promoted extensions at the instance and device creation. However, if an application wants to keep backward compatibility, it will need to enable the extensions.

For a summary of what is new in each version, check out the [Vulkan Release Summary](vulkan_release_summary.html#vulkan-release-summary)

Structs and enums are dependent on the header file being used and not the version of the instance or device queried. For example, the struct `VkPhysicalDeviceFeatures2` used to be `VkPhysicalDeviceFeatures2KHR` before Vulkan 1.1 was released. Regardless of the 1.x version of Vulkan being used, an application should use `VkPhysicalDeviceFeatures2` in its code as it matches the newest header version. For applications that did have `VkPhysicalDeviceFeatures2KHR` in the code, there is no need to worry as the Vulkan header also aliases any promoted structs and enums (`typedef VkPhysicalDeviceFeatures2 VkPhysicalDeviceFeatures2KHR;`).

The reason for using the newer naming is that the Vulkan Spec itself will only refer to `VkPhysicalDeviceFeatures2` regardless of what version of the Vulkan Spec is generated. Using the newer naming makes it easier to quickly search for where the structure is used.

Since functions are used to interact with the loader and implementations, there needs to be a little more care when working between minor versions. As an example, let’s look at `vkGetPhysicalDeviceFeatures2KHR` which was promoted to core as `vkGetPhysicalDeviceFeatures2` from Vulkan 1.0 to Vulkan 1.1. Looking at the Vulkan header both are declared.

typedef void (VKAPI_PTR *PFN_vkGetPhysicalDeviceFeatures2)(VkPhysicalDevice physicalDevice, VkPhysicalDeviceFeatures2* pFeatures);
// ...
typedef void (VKAPI_PTR *PFN_vkGetPhysicalDeviceFeatures2KHR)(VkPhysicalDevice physicalDevice, VkPhysicalDeviceFeatures2* pFeatures);

The main difference is when calling `vkGetInstanceProcAddr(instance, “vkGetPhysicalDeviceFeatures2”);` a Vulkan 1.0 implementation may not be aware of `vkGetPhysicalDeviceFeatures2` existence and `vkGetInstanceProcAddr` will return `NULL`. To be backward compatible with Vulkan 1.0 in this situation, the application should query for `vkGetPhysicalDeviceFeatures2KHR` as a 1.1 Vulkan implementation will likely have the function directly pointed to the `vkGetPhysicalDeviceFeatures2` function pointer internally.

|  | The `vkGetPhysicalDeviceFeatures2KHR` function will only exist in a Vulkan 1.0 implementation if it is supported as an extension. |
| --- | --- |

Between minor versions, it is possible that some feature bits are added, removed, made optional, or made mandatory. All details of features that have changed are described in the [Core Revisions](https://docs.vulkan.org/spec/latest/appendices/versions.html) section.

The [Feature Requirements](https://docs.vulkan.org/spec/latest/chapters/features.html#features-requirements) section in the Vulkan Spec can be used to view the list of features that are required from implementations across minor versions.

Vulkan versions 1.0 through 1.3 share the same minimum/maximum limit requirements. Vulkan 1.4 introduced changes to some of these limits, notably increasing the guaranteed minimum value for `maxPushConstantsSize` from 128 bytes to 256 bytes. Any changes to limits are listed in the [Limit Requirements](https://docs.vulkan.org/spec/latest/chapters/limits.html#limits-minmax) section of the Vulkan Spec.

Vulkan 1.1 was released on March 7, 2018, and introduced several significant features:

|  | [Vulkan Spec: Vulkan 1.1](https://docs.vulkan.org/spec/latest/appendices/versions.html#versions-1.1) |
| --- | --- |

Subgroups provide a way for invocations within a workgroup to communicate with each other without using shared memory or barriers. This enables more efficient parallel algorithms and can significantly improve performance for certain workloads.

[Vulkan Spec: Subgroups](https://registry.khronos.org/vulkan/specs/latest/html/vkspec.html) |
[Vulkan Samples: Extensions](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/extensions)

Key capabilities:

* 
Basic vote operations (all, any, ballot)

* 
Shuffle operations (swap data between invocations)

* 
Arithmetic operations (add, min, max across subgroup)

* 
Broadcast values from one invocation to all others

Protected memory provides a mechanism to protect content from being read or modified by unauthorized processes or applications. This is particularly important for DRM content and secure applications.

[Vulkan Spec: Protected Memory](https://docs.vulkan.org/spec/latest/chapters/memory.html#memory-protected-memory)

Key capabilities:

* 
Create protected memory allocations

* 
Submit protected command buffers

* 
Render to protected swapchain images

Device groups allow an application to treat multiple physical devices as a single logical device, enabling features like:

[Vulkan Spec: Device Groups](https://registry.khronos.org/vulkan/specs/latest/html/vkspec.html) |
[Vulkan Samples: Extensions](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/extensions)

* 
Cross-device memory operations

* 
Peer-to-peer memory access

* 
Multi-GPU rendering

These features allow Vulkan to share resources with other APIs and systems:

[Vulkan Spec: External Memory](https://docs.vulkan.org/spec/latest/chapters/memory.html#memory-external) |
[Vulkan Spec: External Synchronization](https://docs.vulkan.org/spec/latest/chapters/synchronization.html#synchronization-external)

* 
Import/export memory objects

* 
Import/export semaphores and fences

* 
Coordinate with other graphics APIs or the operating system

* 
16-bit storage: Support for 16-bit integer and floating-point types in storage buffers and push constants

* 
Variable pointers: Allow pointers to storage buffers to be dynamically indexed

* 
Multiview rendering: Render to multiple layers of a framebuffer in a single pass

* 
SPIR-V 1.3 support: New shader capabilities

* 
YCbCr conversion: Hardware-accelerated color space conversion

* 
Maintenance updates: Various quality-of-life improvements

Vulkan 1.2 was released on January 15, 2020, and built upon the foundation of Vulkan 1.1:

|  | [Vulkan Spec: Vulkan 1.2](https://docs.vulkan.org/spec/latest/appendices/versions.html#versions-1.2) |
| --- | --- |

Descriptor indexing provides more flexibility in how descriptors are accessed from shaders:

[Vulkan Spec: Descriptor Indexing](https://docs.vulkan.org/spec/latest/chapters/descriptorsets.html#descriptorsets-updates-after-bind) |
[Vulkan Sample: Descriptor Indexing](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/extensions/descriptor_indexing)

* 
Update-after-bind descriptors

* 
Runtime-sized descriptor arrays

* 
Partially bound descriptors

* 
Non-uniform indexing

Timeline semaphores extend the binary semaphore model with a more flexible synchronization primitive:

[Vulkan Spec: Timeline Semaphores](https://docs.vulkan.org/spec/latest/chapters/synchronization.html#synchronization-semaphores-timeline) |
[Khronos Blog: Timeline Semaphores](https://www.khronos.org/blog/vulkan-timeline-semaphores)

* 
Assign timeline values to signal and wait operations

* 
Signal and wait on multiple points in a timeline

* 
Query current timeline value

* 
Signal from host without queue submission

Buffer device address allows shaders to directly access buffer memory using 64-bit addresses:

[Vulkan Spec: Buffer Device Address](https://docs.vulkan.org/spec/latest/chapters/descriptorsets.html#descriptorsets-bufferdeviceaddress) |
[Vulkan Sample: Buffer Device Address](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/extensions/buffer_device_address)

* 
Get a 64-bit GPU address for a buffer

* 
Pass buffer addresses through push constants or descriptors

* 
Access buffer data using pointers in shaders

* 
Enables data structures like linked lists and trees in shaders

Enhanced atomic operations in shaders:

[Vulkan Spec: SPIR-V Capabilities](https://docs.vulkan.org/spec/latest/appendices/spirvenv.html#spirvenv-capabilities)

* 
64-bit integer atomics

* 
Floating-point atomics

* 
Shared memory atomics

* 
8-bit storage: Support for 8-bit integer types in storage buffers and push constants

* 
Shader float controls: Fine-grained control over floating-point behavior

* 
Depth/stencil resolve: Control how depth and stencil attachments are
resolved in multi-sampled rendering

* 
Scalar block layout: More flexible memory layout for shader blocks

* 
Imageless framebuffers: Create framebuffers without specifying image views

* 
Uniform buffer standard layout: Standardized memory layout for uniform buffers

* 
Draw indirect count: Specify the number of draw commands in an indirect draw

Vulkan 1.3 was released on January 25, 2022:

|  | [Vulkan Spec: Vulkan 1.3](https://docs.vulkan.org/spec/latest/appendices/versions.html#versions-1.3) |
| --- | --- |

Dynamic rendering simplifies the rendering process by removing the need for render pass objects:

[Vulkan Spec: Dynamic Rendering](https://docs.vulkan.org/spec/latest/chapters/renderpass.html#dynamic-render) |
[Khronos Blog: Streamlining Render Passes](https://www.khronos.org/blog/streamlining-render-passes) |
[Vulkan Sample: Dynamic Rendering](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/extensions/dynamic_rendering)

* 
Begin and end rendering directly

* 
Specify attachments at render time

* 
More flexible rendering workflows

* 
Easier porting from other APIs

Synchronization2 provides a more streamlined API for synchronization:

[Vulkan Spec: Synchronization2](https://docs.vulkan.org/spec/latest/chapters/synchronization.html#synchronization-pipeline-barriers-2) |
[Vulkan Sample: Synchronization2](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/extensions/synchronization_2)

* 
Simplified barrier usage

* 
More explicit memory dependency specification

* 
Better performance through more precise synchronization

* 
Easier to use correctly

Extended dynamic state allows more pipeline states to be specified at command buffer recording time:

[Vulkan Spec: Extended Dynamic State](https://docs.vulkan.org/features/latest/features/proposals/VK_EXT_extended_dynamic_state3.html) |
[Vulkan Samples: Extensions](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/extensions)

* 
Vertex input bindings and attributes

* 
Primitive topology

* 
Viewport with count

* 
Scissor with count

* 
Depth test enable and write enable

* 
Depth compares op and bounds

* 
Stencil test enables and ops

* 
Stencil writes mask and reference

* 
Blend constants

* 
Inline uniform blocks: Small uniform data embedded directly in descriptor sets

* 
Pipeline creation cache control: More control over pipeline compilation

* 
Private data: Attach arbitrary data to Vulkan objects

* 
Shader demote to helper invocation: Control helper invocations in fragment shaders

* 
Subgroup size control: Specify required subgroup sizes

* 
Zero-initialize workgroup memory: Automatically initialize workgroup shared variables

* 
Format feature flags 2: More detailed format capability reporting

* 
Copy commands 2: More flexible copy operations

Vulkan 1.4 was released on December 3, 2024:

|  | [Vulkan Spec: Vulkan 1.4](https://docs.vulkan.org/spec/latest/appendices/versions.html#versions-1.4) |
| --- | --- |

Extends dynamic rendering to allow reading from attachments during rendering:

[Vulkan Spec: Dynamic Rendering Local Read](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_dynamic_rendering_local_read.html#_description)

* 
Read from color attachments during rendering

* 
Implement techniques like deferred shading more efficiently

* 
Reduce memory bandwidth by avoiding intermediate buffers

* 
Simplify rendering algorithms that need to read previous results

Provides more control over line rendering:

[Vulkan Spec: Line Rasterization](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_line_rasterization.html#_description)

* 
Specify line rasterization mode (bresenham, rectangular, etc.)

* 
Control line width and stipple patterns

* 
Improve line rendering quality and consistency across implementations

* 
Better match the behavior of other graphics APIs

Several features that improve memory management:

[Vulkan Spec: Map Memory 2](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_map_memory2.html#_description) |
[Vulkan Spec: Load/Store Op None](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_load_store_op_none.html#_description) |
[Vulkan Spec: Maintenance 5](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_maintenance5.html#_description)

* 
Map Memory 2: More flexible memory mapping

* 
Load/Store Op None: Skip unnecessary load/store operations

* 
Maintenance 5 & 6: Various quality-of-life improvements

* 
Global Priority: Specify queue priorities for system-level scheduling

New shader capabilities:

[Vulkan Spec: Shader Subgroup Rotate](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_shader_subgroup_rotate.html#_description) |
[Vulkan Spec: Shader Expect/Assume](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_shader_expect_assume.html#_description) |
[Vulkan Spec: Shader Float Controls 2](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_shader_float_controls2.html#_description)

* 
Shader Subgroup Rotate: Rotate values within a subgroup

* 
Shader Expect/Assume: Provide hints to the compiler for optimization

* 
Shader Float Controls 2: More control over floating-point behavior

* 
Vertex Attribute Divisor: Instance-rate vertex attributes

* 
Push Descriptor: Update descriptors directly in command buffers [Spec](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_push_descriptor.html#_description)

* 
Index Type UINT8: Support for 8-bit indices [Spec](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_index_type_uint8.html#_description)

* 
Host Image Copy: Copy image data directly from host memory [Spec](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_EXT_host_image_copy.html#_description)

* 
Pipeline Protected Access: More flexible protected memory access [Spec](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_EXT_pipeline_protected_access.html#_description)

* 
Pipeline Robustness: Improved handling of out-of-bounds accesses [Spec](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_EXT_pipeline_robustness.html#_description)

This section provides a consolidated guide for porting applications from Vulkan 1.0 to any newer version (1.1, 1.2, 1.3, or 1.4).

|  | [Vulkan Spec: Compatibility](https://docs.vulkan.org/spec/latest/chapters/extensions.html#extendingvulkan-compatibility) \|
| --- | --- |
[Vulkan Spec: Extension Promotion](https://docs.vulkan.org/spec/latest/chapters/extensions.html#extendingvulkan-compatibility-promotion) |

**Update SDK and headers**

* 
Ensure you’re using the Vulkan SDK that matches your target version or later

* 
Update header files to the latest version

**Instance creation**

* 
Update `VkApplicationInfo::apiVersion` to your target version (e.g., `VK_API_VERSION_1_4`)

* 
Use `vkEnumerateInstanceVersion` to check for support of your target version

**Device selection**

* 
Check for support of your target version on physical devices

* 
Select devices that support required features for your target version

**Feature adoption**

* 
Replace extension usage with core functionality where applicable

* 
Update structure names (e.g., `VkPhysicalDeviceFeatures2KHR` → `VkPhysicalDeviceFeatures2`)

* 
Update function names (e.g., `vkGetPhysicalDeviceFeatures2KHR` → `vkGetPhysicalDeviceFeatures2`)

* 
Enable version-specific features through the appropriate feature structs:

Vulkan 1.1: `VkPhysicalDeviceVulkan11Features`

* 
Vulkan 1.2: `VkPhysicalDeviceVulkan12Features`

* 
Vulkan 1.3: `VkPhysicalDeviceVulkan13Features`

* 
Vulkan 1.4: `VkPhysicalDeviceVulkan14Features`

**SPIR-V updates**

* 
Update shaders to use the appropriate SPIR-V version for your target Vulkan version:

Vulkan 1.1: SPIR-V 1.3 and all prior SPIR-V versions

* 
Vulkan 1.2: SPIR-V 1.5 and all prior SPIR-V versions

* 
Vulkan 1.3: SPIR-V 1.6 and all prior SPIR-V versions

* 
Vulkan 1.4: SPIR-V 1.6 and all prior SPIR-V versions

Recompile shaders with an updated compiler

**Testing**

* 
Test on both your original version and target version if backward compatibility is needed

* 
Verify all features work as expected

* 
Use `vkEnumerateInstanceVersion` to check for 1.1 support (this function was introduced in 1.1)

* 
Consider adopting subgroups for improved parallel processing

* 
Take advantage of protected memory if needed for secure content

* 
Utilize device groups for multi-GPU scenarios

* 
Implement external memory and synchronization for interoperability

* 
Consider adopting descriptor indexing for more flexible descriptor access

* 
Use timeline semaphores for simplified synchronization

* 
Take advantage of the buffer device address for pointer-based buffer access

* 
Implement shader atomic operations for advanced compute workloads

* 
Use a uniform buffer standard layout for more predictable memory layouts

* 
Consider replacing render passes with dynamic rendering for simplified rendering

* 
Migrate to Synchronization2 API for more streamlined synchronization

* 
Take advantage of the extended dynamic state to reduce pipeline count

* 
Use inline uniform blocks for small uniform data

* 
Implement zero-initialize workgroup memory for safer compute shaders

* 
Take advantage of dynamic rendering local read for accessing pixel data directly during rendering (provides an interface to pixel local reads)

* 
Update line rendering code to use improved line rasterization features

* 
Use map memory 2 for more flexible memory mapping

* 
Implement shader subgroup rotate and other shader enhancements

* 
Consider push descriptors for descriptor updates where appropriate (note: some vendors may not recommend their use due to performance considerations)

When targeting multiple Vulkan versions, follow these guidelines:

* 
**Feature detection**: Always check for specific feature support rather than assuming availability based on a version

* 
**Extension fallback**: For each core feature you use, check if it’s available as an extension on older versions

* 
**Structure and function names**: Use the non-KHR/EXT names from the latest headers, but be aware of compatibility issues

* 
**Extension enabling**: On older versions, explicitly enable extensions that were later promoted to core

* 
**Testing**: Test thoroughly on all targeted versions to ensure compatibility

**Example of handling both extension and core functionality:**

// Check if dynamic rendering is available (either as extension or core)
bool hasDynamicRendering = false;
if (deviceVersion >= VK_API_VERSION_1_3) {
    // In Vulkan 1.3+, dynamic rendering is core functionality
    VkPhysicalDeviceVulkan13Features features13 = {};
    features13.sType = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_3_FEATURES;

    VkPhysicalDeviceFeatures2 features2 = {};
    features2.sType = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FEATURES_2;
    features2.pNext = &features13;

    vkGetPhysicalDeviceFeatures2(physicalDevice, &features2);

    hasDynamicRendering = features13.dynamicRendering;
} else {
    // Check for the extension on older versions
    // [Extension checking code here]
}

// Use the feature if available
if (hasDynamicRendering) {
    // [Dynamic rendering implementation]
} else {
    // [Fallback implementation using render passes]
}

|  | [Vulkan Spec: Features](https://docs.vulkan.org/spec/latest/chapters/features.html) \|
| --- | --- |
[Vulkan Spec: Feature Requirements](https://docs.vulkan.org/spec/latest/chapters/features.html#features-requirements) |

To request features from a specific Vulkan core version:

* 
**Specify the Vulkan version in instance creation**:

VkApplicationInfo appInfo = {};
appInfo.apiVersion = VK_API_VERSION_1_4; // Request Vulkan 1.4

* 
**Query for feature support**:

// For Vulkan 1.1 features
VkPhysicalDeviceVulkan11Features features11 = {};
features11.sType = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_1_FEATURES;

// For Vulkan 1.2 features
VkPhysicalDeviceVulkan12Features features12 = {};
features12.sType = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_2_FEATURES;

// For Vulkan 1.3 features
VkPhysicalDeviceVulkan13Features features13 = {};
features13.sType = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_3_FEATURES;

// For Vulkan 1.4 features
VkPhysicalDeviceVulkan14Features features14 = {};
features14.sType = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_VULKAN_1_4_FEATURES;

// Chain them together
features14.pNext = &features13;
features13.pNext = &features12;
features12.pNext = &features11;

VkPhysicalDeviceFeatures2 features2 = {};
features2.sType = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FEATURES_2;
features2.pNext = &features14;

vkGetPhysicalDeviceFeatures2(physicalDevice, &features2);

* 
**Enable the features during device creation**:

// Use the same structures, now with desired features enabled
VkDeviceCreateInfo createInfo = {};
createInfo.sType = VK_STRUCTURE_TYPE_DEVICE_CREATE_INFO;
createInfo.pNext = &features14; // Points to the start of our chain
// ... other device creation parameters ...

vkCreateDevice(physicalDevice, &createInfo, nullptr, &device);

For features that are available as extensions in earlier Vulkan versions:

[Vulkan Spec: Extensions](https://docs.vulkan.org/spec/latest/chapters/extensions.html) |
[Vulkan Spec: Extension Discovery](https://docs.vulkan.org/spec/latest/chapters/extensions.html#extensions-discovery)

**Check for extension support**:

uint32_t extensionCount;
vkEnumerateDeviceExtensionProperties(physicalDevice, nullptr, &extensionCount, nullptr);
std::vector extensions(extensionCount);
vkEnumerateDeviceExtensionProperties(physicalDevice, nullptr, &extensionCount, extensions.data());

bool hasExtension = false;
for (const auto& extension : extensions) {
    if (strcmp(extension.extensionName, "VK_KHR_dynamic_rendering") == 0) {
        hasExtension = true;
        break;
    }
}

* 
**Enable the extension**:

const char* enabledExtensions[] = { "VK_KHR_dynamic_rendering" };

VkDeviceCreateInfo createInfo = {};
createInfo.sType = VK_STRUCTURE_TYPE_DEVICE_CREATE_INFO;
createInfo.enabledExtensionCount = 1;
createInfo.ppEnabledExtensionNames = enabledExtensions;
// ... other device creation parameters ...

* 
**Query and enable extension-specific features if needed**:

// Example for VK_EXT_descriptor_indexing
VkPhysicalDeviceDescriptorIndexingFeaturesEXT indexingFeatures = {};
indexingFeatures.sType = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DESCRIPTOR_INDEXING_FEATURES_EXT;

VkPhysicalDeviceFeatures2 features2 = {};
features2.sType = VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_FEATURES_2;
features2.pNext = &indexingFeatures;

vkGetPhysicalDeviceFeatures2(physicalDevice, &features2);

// Then enable during device creation
VkDeviceCreateInfo createInfo = {};
createInfo.sType = VK_STRUCTURE_TYPE_DEVICE_CREATE_INFO;
createInfo.pNext = &indexingFeatures;
// ... other device creation parameters ...

[Vulkan Spec: Versioning and Compatibility](https://docs.vulkan.org/spec/latest/appendices/spirvenv.html#spirvenv-compatibility-versioning) |
[Vulkan Samples: Performance Best Practices](https://github.com/KhronosGroup/Vulkan-Samples/tree/main/samples/performance)

**Graceful fallbacks**: Always check for feature support and have fallback paths for unsupported features.

**Minimum required version**: Clearly document the minimum Vulkan version your application requires.

**Feature detection over version detection**: When possible, check for specific features rather than assuming they exist based on the Vulkan version.

**Extension prioritization**: Prefer core functionality over extensions when targeting newer Vulkan versions.

**Testing**: Test on a variety of implementations to ensure compatibility.
