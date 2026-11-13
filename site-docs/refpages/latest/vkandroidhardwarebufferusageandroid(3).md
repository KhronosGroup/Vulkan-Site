# VkAndroidHardwareBufferUsageANDROID(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAndroidHardwareBufferUsageANDROID.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAndroidHardwareBufferUsageANDROID - Struct containing Android hardware buffer usage flags

To obtain optimal Android hardware buffer usage flags for specific image
creation parameters, add a `VkAndroidHardwareBufferUsageANDROID`
structure to the `pNext` chain of a [VkImageFormatProperties2](VkImageFormatProperties2.html)
structure passed to [vkGetPhysicalDeviceImageFormatProperties2](vkGetPhysicalDeviceImageFormatProperties2.html).
This structure is defined as:

// Provided by VK_ANDROID_external_memory_android_hardware_buffer
typedef struct VkAndroidHardwareBufferUsageANDROID {
    VkStructureType    sType;
    void*              pNext;
    uint64_t           androidHardwareBufferUsage;
} VkAndroidHardwareBufferUsageANDROID;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`androidHardwareBufferUsage` returns the Android hardware buffer
usage flags.

The `androidHardwareBufferUsage` field **must** include Android hardware
buffer usage flags listed in the
[AHardwareBuffer Usage Equivalence](../../../../spec/latest/chapters/memory.html#memory-external-android-hardware-buffer-usage) table when the corresponding Vulkan image usage or image
creation flags are included in the `usage` or `flags` fields of
[VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html).
It **must** include at least one GPU usage flag
(`AHARDWAREBUFFER_USAGE_GPU_*`), even if none of the corresponding Vulkan
usages or flags are requested.

|  | Requiring at least one GPU usage flag ensures that Android hardware buffer
| --- | --- |
memory will be allocated in a memory pool accessible to the Vulkan
implementation, and that specializing the memory layout based on usage flags
does not prevent it from being compatible with Vulkan.
Implementations **may** avoid unnecessary restrictions caused by this
requirement by using vendor usage flags to indicate that only the Vulkan
uses indicated in [VkImageFormatProperties2](VkImageFormatProperties2.html) are required. |

Valid Usage (Implicit)

* 
[](#VUID-VkAndroidHardwareBufferUsageANDROID-sType-sType) VUID-VkAndroidHardwareBufferUsageANDROID-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ANDROID_HARDWARE_BUFFER_USAGE_ANDROID](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageFormatProperties2](VkImageFormatProperties2.html)

[VK_ANDROID_external_memory_android_hardware_buffer](VK_ANDROID_external_memory_android_hardware_buffer.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/capabilities.html#VkAndroidHardwareBufferUsageANDROID).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
