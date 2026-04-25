# VkPhysicalDeviceSparseImageFormatInfo2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPhysicalDeviceSparseImageFormatInfo2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPhysicalDeviceSparseImageFormatInfo2 - Structure specifying sparse image format inputs

The `VkPhysicalDeviceSparseImageFormatInfo2` structure is defined as:

// Provided by VK_VERSION_1_1
typedef struct VkPhysicalDeviceSparseImageFormatInfo2 {
    VkStructureType          sType;
    const void*              pNext;
    VkFormat                 format;
    VkImageType              type;
    VkSampleCountFlagBits    samples;
    VkImageUsageFlags        usage;
    VkImageTiling            tiling;
} VkPhysicalDeviceSparseImageFormatInfo2;

// Provided by VK_KHR_get_physical_device_properties2
// Equivalent to VkPhysicalDeviceSparseImageFormatInfo2
typedef VkPhysicalDeviceSparseImageFormatInfo2 VkPhysicalDeviceSparseImageFormatInfo2KHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`format` is the image format.

* 
`type` is the dimensionality of the image.

* 
`samples` is a [VkSampleCountFlagBits](VkSampleCountFlagBits.html) value specifying the
number of samples per texel.

* 
`usage` is a bitmask describing the intended usage of the image.

* 
`tiling` is the tiling arrangement of the texel blocks in memory.

Valid Usage

* 
[](#VUID-VkPhysicalDeviceSparseImageFormatInfo2-samples-01095) VUID-VkPhysicalDeviceSparseImageFormatInfo2-samples-01095

`samples` **must** be a valid [VkSampleCountFlagBits](VkSampleCountFlagBits.html) value that is
set in `VkImageFormatProperties`::`sampleCounts` returned by
`vkGetPhysicalDeviceImageFormatProperties` with `format`,
`type`, `tiling`, and `usage` equal to those in this command

Valid Usage (Implicit)

* 
[](#VUID-VkPhysicalDeviceSparseImageFormatInfo2-sType-sType) VUID-VkPhysicalDeviceSparseImageFormatInfo2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SPARSE_IMAGE_FORMAT_INFO_2](VkStructureType.html)

* 
[](#VUID-VkPhysicalDeviceSparseImageFormatInfo2-pNext-pNext) VUID-VkPhysicalDeviceSparseImageFormatInfo2-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkPhysicalDeviceSparseImageFormatInfo2-format-parameter) VUID-VkPhysicalDeviceSparseImageFormatInfo2-format-parameter

 `format` **must** be a valid [VkFormat](VkFormat.html) value

* 
[](#VUID-VkPhysicalDeviceSparseImageFormatInfo2-type-parameter) VUID-VkPhysicalDeviceSparseImageFormatInfo2-type-parameter

 `type` **must** be a valid [VkImageType](VkImageType.html) value

* 
[](#VUID-VkPhysicalDeviceSparseImageFormatInfo2-samples-parameter) VUID-VkPhysicalDeviceSparseImageFormatInfo2-samples-parameter

 `samples` **must** be a valid [VkSampleCountFlagBits](VkSampleCountFlagBits.html) value

* 
[](#VUID-VkPhysicalDeviceSparseImageFormatInfo2-usage-parameter) VUID-VkPhysicalDeviceSparseImageFormatInfo2-usage-parameter

 `usage` **must** be a valid combination of [VkImageUsageFlagBits](VkImageUsageFlagBits.html) values

* 
[](#VUID-VkPhysicalDeviceSparseImageFormatInfo2-usage-requiredbitmask) VUID-VkPhysicalDeviceSparseImageFormatInfo2-usage-requiredbitmask

 `usage` **must** not be `0`

* 
[](#VUID-VkPhysicalDeviceSparseImageFormatInfo2-tiling-parameter) VUID-VkPhysicalDeviceSparseImageFormatInfo2-tiling-parameter

 `tiling` **must** be a valid [VkImageTiling](VkImageTiling.html) value

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkFormat](VkFormat.html), [VkImageTiling](VkImageTiling.html), [VkImageType](VkImageType.html), [VkImageUsageFlags](VkImageUsageFlags.html), [VkSampleCountFlagBits](VkSampleCountFlagBits.html), [VkStructureType](VkStructureType.html), [vkGetPhysicalDeviceSparseImageFormatProperties2](vkGetPhysicalDeviceSparseImageFormatProperties2.html), [vkGetPhysicalDeviceSparseImageFormatProperties2](vkGetPhysicalDeviceSparseImageFormatProperties2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/sparsemem.html#VkPhysicalDeviceSparseImageFormatInfo2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
