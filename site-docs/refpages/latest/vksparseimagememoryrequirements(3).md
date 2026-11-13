# VkSparseImageMemoryRequirements(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSparseImageMemoryRequirements.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSparseImageMemoryRequirements - Structure specifying sparse image memory requirements

The `VkSparseImageMemoryRequirements` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkSparseImageMemoryRequirements {
    VkSparseImageFormatProperties    formatProperties;
    uint32_t                         imageMipTailFirstLod;
    VkDeviceSize                     imageMipTailSize;
    VkDeviceSize                     imageMipTailOffset;
    VkDeviceSize                     imageMipTailStride;
} VkSparseImageMemoryRequirements;

* 
`formatProperties` is a [VkSparseImageFormatProperties](VkSparseImageFormatProperties.html)
structure specifying properties of the image format.

* 
`imageMipTailFirstLod` is the first mip level at which image
subresources are included in the mip tail region.

* 
`imageMipTailSize` is the memory size (in bytes) of the mip tail
region.
If `formatProperties.flags` contains
[VK_SPARSE_IMAGE_FORMAT_SINGLE_MIPTAIL_BIT](VkSparseImageFormatFlagBits.html), this is the size of the
whole mip tail, otherwise this is the size of the mip tail of a single
array layer.
This value is guaranteed to be a multiple of the sparse block size in
bytes.

* 
`imageMipTailOffset` is the opaque memory offset used with
[VkSparseImageOpaqueMemoryBindInfo](VkSparseImageOpaqueMemoryBindInfo.html) to bind the mip tail region(s).

* 
`imageMipTailStride` is the offset stride between each array-layer’s
mip tail, if `formatProperties.flags` does not contain
[VK_SPARSE_IMAGE_FORMAT_SINGLE_MIPTAIL_BIT](VkSparseImageFormatFlagBits.html) (otherwise the value is
**undefined**).

[VK_VERSION_1_0](VK_VERSION_1_0.html), `VkDeviceSize`, [VkSparseImageFormatProperties](VkSparseImageFormatProperties.html), [VkSparseImageMemoryRequirements2](VkSparseImageMemoryRequirements2.html), [vkGetImageSparseMemoryRequirements](vkGetImageSparseMemoryRequirements.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/sparsemem.html#VkSparseImageMemoryRequirements).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
