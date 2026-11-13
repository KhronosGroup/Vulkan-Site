# VkNativeBufferUsageOHOS(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkNativeBufferUsageOHOS.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkNativeBufferUsageOHOS - The usage list of the OH_NativeBuffer object

To obtain optimal Open Harmony OS native buffer usage flags for specific
image creation parameters, add a `VkNativeBufferUsageOHOS` structure to
the `pNext` chain of a [VkImageFormatProperties2](VkImageFormatProperties2.html) structure passed
to [vkGetPhysicalDeviceImageFormatProperties2](vkGetPhysicalDeviceImageFormatProperties2.html).

The `VkNativeBufferUsageOHOS` structure is defined as:

// Provided by VK_OHOS_external_memory
typedef struct VkNativeBufferUsageOHOS {
    VkStructureType    sType;
    void*              pNext;
    uint64_t           OHOSNativeBufferUsage;
} VkNativeBufferUsageOHOS;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`OHOSNativeBufferUsage` returns the Open Harmony OS buffer usage
flags.

Valid Usage (Implicit)

* 
[](#VUID-VkNativeBufferUsageOHOS-sType-sType) VUID-VkNativeBufferUsageOHOS-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_NATIVE_BUFFER_USAGE_OHOS](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageFormatProperties2](VkImageFormatProperties2.html)

[VK_OHOS_external_memory](VK_OHOS_external_memory.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkNativeBufferUsageOHOS).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
