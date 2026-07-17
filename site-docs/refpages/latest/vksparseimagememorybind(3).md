# VkSparseImageMemoryBind(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSparseImageMemoryBind.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSparseImageMemoryBind - Structure specifying sparse image memory bind

The `VkSparseImageMemoryBind` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkSparseImageMemoryBind {
    VkImageSubresource         subresource;
    VkOffset3D                 offset;
    VkExtent3D                 extent;
    VkDeviceMemory             memory;
    VkDeviceSize               memoryOffset;
    VkSparseMemoryBindFlags    flags;
} VkSparseImageMemoryBind;

* 
`subresource` is the image *aspect* and region of interest in the
image.

* 
`offset` are the coordinates of the first texel within the image
subresource to bind.

* 
`extent` is the size in texels of the region within the image
subresource to bind.
The extent **must** be a multiple of the sparse image block dimensions,
except when binding sparse image blocks along the edge of an image
subresource it **can** instead be such that any coordinate of
`offset` +  `extent` equals the corresponding
dimensions of the image subresource.

* 
`memory` is the [VkDeviceMemory](VkDeviceMemory.html) object that the sparse image
blocks of the image are bound to.
If `memory` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the sparse image blocks are
unbound.

* 
`memoryOffset` is an offset into [VkDeviceMemory](VkDeviceMemory.html) object.
If `memory` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), this value is ignored.

* 
`flags` are sparse memory binding flags.

Valid Usage

* 
[](#VUID-VkSparseImageMemoryBind-memory-01104) VUID-VkSparseImageMemoryBind-memory-01104

If the [`sparseResidencyAliased`](../../../../spec/latest/chapters/features.html#features-sparseResidencyAliased)
feature is not enabled, and if any other resources are bound to ranges
of `memory`, the range of `memory` being bound **must** not overlap
with those bound ranges

* 
[](#VUID-VkSparseImageMemoryBind-memory-01105) VUID-VkSparseImageMemoryBind-memory-01105

`memory` and `memoryOffset` **must** match the memory requirements
of the calling command’s `image`, as described in section
[Resource Memory Association](../../../../spec/latest/chapters/resources.html#resources-association)

* 
[](#VUID-VkSparseImageMemoryBind-offset-01107) VUID-VkSparseImageMemoryBind-offset-01107

`offset.x` **must** be a multiple of the sparse image block width
(`VkSparseImageFormatProperties`::`imageGranularity.width`) of
the image

* 
[](#VUID-VkSparseImageMemoryBind-extent-09388) VUID-VkSparseImageMemoryBind-extent-09388

`extent.width` **must** be greater than `0`

* 
[](#VUID-VkSparseImageMemoryBind-extent-01108) VUID-VkSparseImageMemoryBind-extent-01108

`extent.width` **must** either be a multiple of the sparse image block
width of the image, or else (`extent.width` + 
`offset.x`) **must** equal the width of the image subresource

* 
[](#VUID-VkSparseImageMemoryBind-offset-01109) VUID-VkSparseImageMemoryBind-offset-01109

`offset.y` **must** be a multiple of the sparse image block height
(`VkSparseImageFormatProperties`::`imageGranularity.height`) of
the image

* 
[](#VUID-VkSparseImageMemoryBind-extent-09389) VUID-VkSparseImageMemoryBind-extent-09389

`extent.height` **must** be greater than `0`

* 
[](#VUID-VkSparseImageMemoryBind-extent-01110) VUID-VkSparseImageMemoryBind-extent-01110

`extent.height` **must** either be a multiple of the sparse image block
height of the image, or else (`extent.height` + 
`offset.y`) **must** equal the height of the image subresource

* 
[](#VUID-VkSparseImageMemoryBind-offset-01111) VUID-VkSparseImageMemoryBind-offset-01111

`offset.z` **must** be a multiple of the sparse image block depth
(`VkSparseImageFormatProperties`::`imageGranularity.depth`) of
the image

* 
[](#VUID-VkSparseImageMemoryBind-extent-09390) VUID-VkSparseImageMemoryBind-extent-09390

`extent.depth` **must** be greater than `0`

* 
[](#VUID-VkSparseImageMemoryBind-extent-01112) VUID-VkSparseImageMemoryBind-extent-01112

`extent.depth` **must** either be a multiple of the sparse image block
depth of the image, or else (`extent.depth` + 
`offset.z`) **must** equal the depth of the image subresource

* 
[](#VUID-VkSparseImageMemoryBind-memory-02732) VUID-VkSparseImageMemoryBind-memory-02732

If `memory` was created with
[VkExportMemoryAllocateInfo](VkExportMemoryAllocateInfo.html)::`handleTypes` not equal to `0`, at
least one handle type it contained **must** also have been set in
[VkExternalMemoryImageCreateInfo](VkExternalMemoryImageCreateInfo.html)::`handleTypes` when the image
was created

* 
[](#VUID-VkSparseImageMemoryBind-memory-02733) VUID-VkSparseImageMemoryBind-memory-02733

If `memory` was created by a memory import operation, the external
handle type of the imported memory **must** also have been set in
[VkExternalMemoryImageCreateInfo](VkExternalMemoryImageCreateInfo.html)::`handleTypes` when
`image` was created

Valid Usage (Implicit)

* 
[](#VUID-VkSparseImageMemoryBind-subresource-parameter) VUID-VkSparseImageMemoryBind-subresource-parameter

 `subresource` **must** be a valid [VkImageSubresource](VkImageSubresource.html) structure

* 
[](#VUID-VkSparseImageMemoryBind-memory-parameter) VUID-VkSparseImageMemoryBind-memory-parameter

 If `memory` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `memory` **must** be a valid [VkDeviceMemory](VkDeviceMemory.html) handle

* 
[](#VUID-VkSparseImageMemoryBind-flags-parameter) VUID-VkSparseImageMemoryBind-flags-parameter

 `flags` **must** be a valid combination of [VkSparseMemoryBindFlagBits](VkSparseMemoryBindFlagBits.html) values

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDeviceMemory](VkDeviceMemory.html), `VkDeviceSize`, [VkExtent3D](VkExtent3D.html), [VkImageSubresource](VkImageSubresource.html), [VkOffset3D](VkOffset3D.html), [VkSparseImageMemoryBindInfo](VkSparseImageMemoryBindInfo.html), [VkSparseMemoryBindFlags](VkSparseMemoryBindFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/sparsemem.html#VkSparseImageMemoryBind).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
