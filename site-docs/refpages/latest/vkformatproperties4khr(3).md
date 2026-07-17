# VkFormatProperties4KHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkFormatProperties4KHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkFormatProperties4KHR - Structure specifying additional image format properties

The [VkFormatProperties4KHR](#) structure is defined as:

// Provided by VK_KHR_extended_flags
typedef struct VkFormatProperties4KHR {
    VkStructureType             sType;
    void*                       pNext;
    VkFormatFeatureFlags4KHR    linearTilingFeatures;
    VkFormatFeatureFlags4KHR    optimalTilingFeatures;
    VkFormatFeatureFlags4KHR    bufferFeatures;
} VkFormatProperties4KHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`linearTilingFeatures` is a bitmask of
[VkFormatFeatureFlagBits4KHR](VkFormatFeatureFlagBits4KHR.html) specifying features supported by
images created with a `tiling` parameter of
[VK_IMAGE_TILING_LINEAR](VkImageTiling.html).

* 
`optimalTilingFeatures` is a bitmask of
[VkFormatFeatureFlagBits4KHR](VkFormatFeatureFlagBits4KHR.html) specifying features supported by
images created with a `tiling` parameter of
[VK_IMAGE_TILING_OPTIMAL](VkImageTiling.html).

* 
`bufferFeatures` is a bitmask of [VkFormatFeatureFlagBits4KHR](VkFormatFeatureFlagBits4KHR.html)
specifying features supported by buffers.

To query supported format extended features which are properties of the
physical device, add a [VkFormatProperties4KHR](#) structure to the
`pNext` chain of [VkFormatProperties2](VkFormatProperties2.html).

|  | `VkFormatProperties4KHR` supports additional format feature bits beyond
| --- | --- |
those in [VkFormatProperties3](VkFormatProperties3.html). |

Valid Usage (Implicit)

* 
[](#VUID-VkFormatProperties4KHR-sType-sType) VUID-VkFormatProperties4KHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_FORMAT_PROPERTIES_4_KHR](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkFormatProperties2](VkFormatProperties2.html)

[VK_KHR_extended_flags](VK_KHR_extended_flags.html), [VkFormatFeatureFlags4KHR](VkFormatFeatureFlags4KHR.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/formats.html#VkFormatProperties4KHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
