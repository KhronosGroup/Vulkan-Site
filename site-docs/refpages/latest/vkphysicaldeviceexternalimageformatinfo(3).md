# VkPhysicalDeviceExternalImageFormatInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceExternalImageFormatInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceExternalImageFormatInfo - Structure specifying external image creation parameters

To determine the image capabilities compatible with an external memory
handle type, add a [VkPhysicalDeviceExternalImageFormatInfo](#) structure
to the `pNext` chain of the [VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html)
structure and a `VkExternalImageFormatProperties` structure to the
`pNext` chain of the [VkImageFormatProperties2](VkImageFormatProperties2.html) structure.

The `VkPhysicalDeviceExternalImageFormatInfo` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkPhysicalDeviceExternalImageFormatInfo {
    VkStructureType                       sType;
    const void*                           pNext;
    VkExternalMemoryHandleTypeFlagBits    handleType;
} VkPhysicalDeviceExternalImageFormatInfo;

// Provided by VK_KHR_external_memory_capabilities
// Equivalent to VkPhysicalDeviceExternalImageFormatInfo
typedef VkPhysicalDeviceExternalImageFormatInfo VkPhysicalDeviceExternalImageFormatInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`handleType` is a [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) value
specifying the memory handle type that will be used with the memory
associated with the image.

If `handleType` is 0, [vkGetPhysicalDeviceImageFormatProperties2](vkGetPhysicalDeviceImageFormatProperties2.html)
will behave as if [VkPhysicalDeviceExternalImageFormatInfo](#) was not
present, and [VkExternalImageFormatProperties](VkExternalImageFormatProperties.html) will be ignored.

If `handleType` is not compatible with the `format`, `type`,
`tiling`, `usage`, and `flags` specified in
[VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html), then
[vkGetPhysicalDeviceImageFormatProperties2](vkGetPhysicalDeviceImageFormatProperties2.html) returns
[VK_ERROR_FORMAT_NOT_SUPPORTED](VkResult.html).

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceExternalImageFormatInfo-sType-sType) VUID-VkPhysicalDeviceExternalImageFormatInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_EXTERNAL_IMAGE_FORMAT_INFO](VkStructureType.html)

* 
[](#VUID-VkPhysicalDeviceExternalImageFormatInfo-handleType-parameter) VUID-VkPhysicalDeviceExternalImageFormatInfo-handleType-parameter

 If `handleType` is not `0`, `handleType` **must** be a valid [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html)

[VK_KHR_external_memory_capabilities](VK_KHR_external_memory_capabilities.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkExternalMemoryHandleTypeFlagBits](VkExternalMemoryHandleTypeFlagBits.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/capabilities.html#VkPhysicalDeviceExternalImageFormatInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
