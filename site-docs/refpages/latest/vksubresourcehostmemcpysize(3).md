# VkSubresourceHostMemcpySize(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSubresourceHostMemcpySize.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSubresourceHostMemcpySize - Memory size needed to copy to or from an image on the host with VK_HOST_IMAGE_COPY_MEMCPY_BIT

To query the memory size needed to copy to or from an image using
[vkCopyMemoryToImage](vkCopyMemoryToImage.html) or [vkCopyImageToMemory](vkCopyImageToMemory.html) when the
[VK_HOST_IMAGE_COPY_MEMCPY_BIT](VkHostImageCopyFlagBits.html) flag is specified, add a
[VkSubresourceHostMemcpySize](#) structure to the `pNext` chain of the
[VkSubresourceLayout2](VkSubresourceLayout2.html) structure in a call to
[vkGetImageSubresourceLayout2](vkGetImageSubresourceLayout2.html).

The `VkSubresourceHostMemcpySize` structure is defined as:

// Provided by VK_VERSION_1_4
typedef struct VkSubresourceHostMemcpySize {
    VkStructureType    sType;
    void*              pNext;
    VkDeviceSize       size;
} VkSubresourceHostMemcpySize;

// Provided by VK_EXT_host_image_copy
// Equivalent to VkSubresourceHostMemcpySize
typedef VkSubresourceHostMemcpySize VkSubresourceHostMemcpySizeEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`size` is the size in bytes of the image subresource.

Valid Usage (Implicit)

* 
[](#VUID-VkSubresourceHostMemcpySize-sType-sType) VUID-VkSubresourceHostMemcpySize-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SUBRESOURCE_HOST_MEMCPY_SIZE](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSubresourceLayout2](VkSubresourceLayout2.html)

[VK_EXT_host_image_copy](VK_EXT_host_image_copy.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), `VkDeviceSize`, [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkSubresourceHostMemcpySize).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
