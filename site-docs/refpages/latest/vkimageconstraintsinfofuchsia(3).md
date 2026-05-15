# VkImageConstraintsInfoFUCHSIA(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageConstraintsInfoFUCHSIA.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageConstraintsInfoFUCHSIA - Structure of image-based buffer collection constraints

The `VkImageConstraintsInfoFUCHSIA` structure is defined as:

// Provided by VK_FUCHSIA_buffer_collection
typedef struct VkImageConstraintsInfoFUCHSIA {
    VkStructureType                               sType;
    const void*                                   pNext;
    uint32_t                                      formatConstraintsCount;
    const VkImageFormatConstraintsInfoFUCHSIA*    pFormatConstraints;
    VkBufferCollectionConstraintsInfoFUCHSIA      bufferCollectionConstraints;
    VkImageConstraintsInfoFlagsFUCHSIA            flags;
} VkImageConstraintsInfoFUCHSIA;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`formatConstraintsCount` is the number of elements in
`pFormatConstraints`.

* 
`pFormatConstraints` is a pointer to an array of
[VkImageFormatConstraintsInfoFUCHSIA](VkImageFormatConstraintsInfoFUCHSIA.html) structures of size
`formatConstraintsCount` that is used to further constrain buffer
collection format selection for image-based buffer collections.

* 
`bufferCollectionConstraints` is a
[VkBufferCollectionConstraintsInfoFUCHSIA](VkBufferCollectionConstraintsInfoFUCHSIA.html) structure used to supply
parameters for the negotiation and allocation for buffer-based buffer
collections.

* 
`flags` is a [VkImageConstraintsInfoFlagBitsFUCHSIA](VkImageConstraintsInfoFlagBitsFUCHSIA.html) value
specifying hints about the type of memory Sysmem should allocate for the
buffer collection.

Valid Usage

* 
[](#VUID-VkImageConstraintsInfoFUCHSIA-pFormatConstraints-06395) VUID-VkImageConstraintsInfoFUCHSIA-pFormatConstraints-06395

All elements of `pFormatConstraints` **must** have at least one bit set
in its
[VkImageFormatConstraintsInfoFUCHSIA](VkImageFormatConstraintsInfoFUCHSIA.html)::`requiredFormatFeatures`

* 
[](#VUID-VkImageConstraintsInfoFUCHSIA-pFormatConstraints-06396) VUID-VkImageConstraintsInfoFUCHSIA-pFormatConstraints-06396

If `pFormatConstraints->imageCreateInfo→usage` contains
[VK_IMAGE_USAGE_SAMPLED_BIT](VkImageUsageFlagBits.html), then
`pFormatConstraints->requiredFormatFeatures` **must** contain
[VK_FORMAT_FEATURE_SAMPLED_IMAGE_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-VkImageConstraintsInfoFUCHSIA-pFormatConstraints-06397) VUID-VkImageConstraintsInfoFUCHSIA-pFormatConstraints-06397

If `pFormatConstraints->imageCreateInfo→usage` contains
[VK_IMAGE_USAGE_STORAGE_BIT](VkImageUsageFlagBits.html), then
`pFormatConstraints->requiredFormatFeatures` **must** contain
[VK_FORMAT_FEATURE_STORAGE_IMAGE_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-VkImageConstraintsInfoFUCHSIA-pFormatConstraints-06398) VUID-VkImageConstraintsInfoFUCHSIA-pFormatConstraints-06398

If `pFormatConstraints->imageCreateInfo→usage` contains
[VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](VkImageUsageFlagBits.html), then
`pFormatConstraints->requiredFormatFeatures` **must** contain
[VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-VkImageConstraintsInfoFUCHSIA-pFormatConstraints-06399) VUID-VkImageConstraintsInfoFUCHSIA-pFormatConstraints-06399

If `pFormatConstraints->imageCreateInfo→usage` contains
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html), then
`pFormatConstraints->requiredFormatFeatures` **must** contain
[VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-VkImageConstraintsInfoFUCHSIA-pFormatConstraints-06400) VUID-VkImageConstraintsInfoFUCHSIA-pFormatConstraints-06400

If `pFormatConstraints->imageCreateInfo→usage` contains
[VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](VkImageUsageFlagBits.html), then
`pFormatConstraints->requiredFormatFeatures` **must** contain at least
one of [VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](VkFormatFeatureFlagBits.html) or
[VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](VkFormatFeatureFlagBits.html)

* 
[](#VUID-VkImageConstraintsInfoFUCHSIA-attachmentFragmentShadingRate-06401) VUID-VkImageConstraintsInfoFUCHSIA-attachmentFragmentShadingRate-06401

If the [    `attachmentFragmentShadingRate`](../../../../spec/latest/chapters/features.html#features-attachmentFragmentShadingRate) feature is enabled, and
`pFormatConstraints->imageCreateInfo→usage` contains
[VK_IMAGE_USAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkImageUsageFlagBits.html), then
`pFormatConstraints->requiredFormatFeatures` **must** contain
[VK_FORMAT_FEATURE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkFormatFeatureFlagBits.html)

Valid Usage (Implicit)

* 
[](#VUID-VkImageConstraintsInfoFUCHSIA-sType-sType) VUID-VkImageConstraintsInfoFUCHSIA-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_CONSTRAINTS_INFO_FUCHSIA](VkStructureType.html)

* 
[](#VUID-VkImageConstraintsInfoFUCHSIA-pNext-pNext) VUID-VkImageConstraintsInfoFUCHSIA-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkImageConstraintsInfoFUCHSIA-pFormatConstraints-parameter) VUID-VkImageConstraintsInfoFUCHSIA-pFormatConstraints-parameter

 `pFormatConstraints` **must** be a valid pointer to an array of `formatConstraintsCount` valid [VkImageFormatConstraintsInfoFUCHSIA](VkImageFormatConstraintsInfoFUCHSIA.html) structures

* 
[](#VUID-VkImageConstraintsInfoFUCHSIA-bufferCollectionConstraints-parameter) VUID-VkImageConstraintsInfoFUCHSIA-bufferCollectionConstraints-parameter

 `bufferCollectionConstraints` **must** be a valid [VkBufferCollectionConstraintsInfoFUCHSIA](VkBufferCollectionConstraintsInfoFUCHSIA.html) structure

* 
[](#VUID-VkImageConstraintsInfoFUCHSIA-flags-parameter) VUID-VkImageConstraintsInfoFUCHSIA-flags-parameter

 `flags` **must** be a valid combination of [VkImageConstraintsInfoFlagBitsFUCHSIA](VkImageConstraintsInfoFlagBitsFUCHSIA.html) values

* 
[](#VUID-VkImageConstraintsInfoFUCHSIA-formatConstraintsCount-arraylength) VUID-VkImageConstraintsInfoFUCHSIA-formatConstraintsCount-arraylength

 `formatConstraintsCount` **must** be greater than `0`

[VK_FUCHSIA_buffer_collection](VK_FUCHSIA_buffer_collection.html), [VkBufferCollectionConstraintsInfoFUCHSIA](VkBufferCollectionConstraintsInfoFUCHSIA.html), [VkImageConstraintsInfoFlagsFUCHSIA](VkImageConstraintsInfoFlagsFUCHSIA.html), [VkImageFormatConstraintsInfoFUCHSIA](VkImageFormatConstraintsInfoFUCHSIA.html), [VkStructureType](VkStructureType.html), [vkSetBufferCollectionImageConstraintsFUCHSIA](vkSetBufferCollectionImageConstraintsFUCHSIA.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageConstraintsInfoFUCHSIA).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
