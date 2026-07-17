# VkImageFormatConstraintsInfoFUCHSIA(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageFormatConstraintsInfoFUCHSIA.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageFormatConstraintsInfoFUCHSIA - Structure image-based buffer collection constraints

The `VkImageFormatConstraintsInfoFUCHSIA` structure is defined as:

// Provided by VK_FUCHSIA_buffer_collection
typedef struct VkImageFormatConstraintsInfoFUCHSIA {
    VkStructureType                         sType;
    const void*                             pNext;
    VkImageCreateInfo                       imageCreateInfo;
    VkFormatFeatureFlags                    requiredFormatFeatures;
    VkImageFormatConstraintsFlagsFUCHSIA    flags;
    uint64_t                                sysmemPixelFormat;
    uint32_t                                colorSpaceCount;
    const VkSysmemColorSpaceFUCHSIA*        pColorSpaces;
} VkImageFormatConstraintsInfoFUCHSIA;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure

* 
`imageCreateInfo` is the [VkImageCreateInfo](VkImageCreateInfo.html) used to create a
[VkImage](VkImage.html) that is to use memory from the
[VkBufferCollectionFUCHSIA](VkBufferCollectionFUCHSIA.html)

* 
`requiredFormatFeatures` is a bitmask of
[VkFormatFeatureFlagBits](VkFormatFeatureFlagBits.html) specifying required features of the
buffers in the buffer collection

* 
`flags` is reserved for future use

* 
`sysmemPixelFormat` is a `PixelFormatType` value from the
`fuchsia.sysmem/image_formats.fidl` FIDL interface

* 
`colorSpaceCount` is the element count of `pColorSpaces`

* 
`pColorSpaces` is a pointer to an array of
[VkSysmemColorSpaceFUCHSIA](VkSysmemColorSpaceFUCHSIA.html) structs of size `colorSpaceCount`

Valid Usage (Implicit)

* 
[](#VUID-VkImageFormatConstraintsInfoFUCHSIA-sType-sType) VUID-VkImageFormatConstraintsInfoFUCHSIA-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_FORMAT_CONSTRAINTS_INFO_FUCHSIA](VkStructureType.html)

* 
[](#VUID-VkImageFormatConstraintsInfoFUCHSIA-pNext-pNext) VUID-VkImageFormatConstraintsInfoFUCHSIA-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkImageFormatConstraintsInfoFUCHSIA-imageCreateInfo-parameter) VUID-VkImageFormatConstraintsInfoFUCHSIA-imageCreateInfo-parameter

 `imageCreateInfo` **must** be a valid [VkImageCreateInfo](VkImageCreateInfo.html) structure

* 
[](#VUID-VkImageFormatConstraintsInfoFUCHSIA-requiredFormatFeatures-parameter) VUID-VkImageFormatConstraintsInfoFUCHSIA-requiredFormatFeatures-parameter

 `requiredFormatFeatures` **must** be a valid combination of [VkFormatFeatureFlagBits](VkFormatFeatureFlagBits.html) values

* 
[](#VUID-VkImageFormatConstraintsInfoFUCHSIA-requiredFormatFeatures-requiredbitmask) VUID-VkImageFormatConstraintsInfoFUCHSIA-requiredFormatFeatures-requiredbitmask

 `requiredFormatFeatures` **must** not be `0`

* 
[](#VUID-VkImageFormatConstraintsInfoFUCHSIA-flags-zerobitmask) VUID-VkImageFormatConstraintsInfoFUCHSIA-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-VkImageFormatConstraintsInfoFUCHSIA-pColorSpaces-parameter) VUID-VkImageFormatConstraintsInfoFUCHSIA-pColorSpaces-parameter

 `pColorSpaces` **must** be a valid pointer to an array of `colorSpaceCount` valid [VkSysmemColorSpaceFUCHSIA](VkSysmemColorSpaceFUCHSIA.html) structures

* 
[](#VUID-VkImageFormatConstraintsInfoFUCHSIA-colorSpaceCount-arraylength) VUID-VkImageFormatConstraintsInfoFUCHSIA-colorSpaceCount-arraylength

 `colorSpaceCount` **must** be greater than `0`

[VK_FUCHSIA_buffer_collection](VK_FUCHSIA_buffer_collection.html), [VkFormatFeatureFlags](VkFormatFeatureFlags.html), [VkImageConstraintsInfoFUCHSIA](VkImageConstraintsInfoFUCHSIA.html), [VkImageCreateInfo](VkImageCreateInfo.html), [VkImageFormatConstraintsFlagsFUCHSIA](VkImageFormatConstraintsFlagsFUCHSIA.html), [VkStructureType](VkStructureType.html), [VkSysmemColorSpaceFUCHSIA](VkSysmemColorSpaceFUCHSIA.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageFormatConstraintsInfoFUCHSIA).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
