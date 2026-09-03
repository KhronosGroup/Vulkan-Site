# VkSparseImageFormatFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSparseImageFormatFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSparseImageFormatFlagBits - Bitmask specifying additional information about a sparse image resource

Bits which **may** be set in [VkSparseImageFormatProperties](VkSparseImageFormatProperties.html)::`flags`,
specifying additional information about the sparse resource, are:

// Provided by VK_VERSION_1_0
typedef enum VkSparseImageFormatFlagBits {
    VK_SPARSE_IMAGE_FORMAT_SINGLE_MIPTAIL_BIT = 0x00000001,
    VK_SPARSE_IMAGE_FORMAT_ALIGNED_MIP_SIZE_BIT = 0x00000002,
    VK_SPARSE_IMAGE_FORMAT_NONSTANDARD_BLOCK_SIZE_BIT = 0x00000004,
} VkSparseImageFormatFlagBits;

* 
[VK_SPARSE_IMAGE_FORMAT_SINGLE_MIPTAIL_BIT](#) specifies that the image
uses a single mip tail region for all array layers.

* 
[VK_SPARSE_IMAGE_FORMAT_ALIGNED_MIP_SIZE_BIT](#) specifies that the
first mip level whose dimensions are not integer multiples of the
corresponding dimensions of the sparse image block begins the mip tail
region.

* 
[VK_SPARSE_IMAGE_FORMAT_NONSTANDARD_BLOCK_SIZE_BIT](#) specifies that
the image uses non-standard sparse image block dimensions, and the
`imageGranularity` values do not match the standard sparse image
block dimensions for the given format.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkSparseImageFormatFlags](VkSparseImageFormatFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/sparsemem.html#VkSparseImageFormatFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
