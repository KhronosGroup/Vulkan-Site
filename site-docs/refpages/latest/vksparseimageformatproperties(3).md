# VkSparseImageFormatProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSparseImageFormatProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSparseImageFormatProperties - Structure specifying sparse image format properties

The `VkSparseImageFormatProperties` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkSparseImageFormatProperties {
    VkImageAspectFlags          aspectMask;
    VkExtent3D                  imageGranularity;
    VkSparseImageFormatFlags    flags;
} VkSparseImageFormatProperties;

* 
`aspectMask` is a bitmask [VkImageAspectFlagBits](VkImageAspectFlagBits.html) specifying
which aspects of the image the properties apply to.

* 
`imageGranularity` is the width, height, and depth of the sparse
image block in texels.

* 
`flags` is a bitmask of [VkSparseImageFormatFlagBits](VkSparseImageFormatFlagBits.html) specifying
additional information about the sparse resource.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkExtent3D](VkExtent3D.html), [VkImageAspectFlags](VkImageAspectFlags.html), [VkSparseImageFormatFlags](VkSparseImageFormatFlags.html), [VkSparseImageFormatProperties2](VkSparseImageFormatProperties2.html), [VkSparseImageMemoryRequirements](VkSparseImageMemoryRequirements.html), [vkGetPhysicalDeviceSparseImageFormatProperties](vkGetPhysicalDeviceSparseImageFormatProperties.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/sparsemem.html#VkSparseImageFormatProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
