# VkExtent3D(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExtent3D.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExtent3D - Structure specifying a three-dimensional extent

A three-dimensional extent is defined by the structure:

// Provided by VK_VERSION_1_0
typedef struct VkExtent3D {
    uint32_t    width;
    uint32_t    height;
    uint32_t    depth;
} VkExtent3D;

* 
`width` is the width of the extent.

* 
`height` is the height of the extent.

* 
`depth` is the depth of the extent.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkBufferImageCopy](VkBufferImageCopy.html), [VkBufferImageCopy2](VkBufferImageCopy2.html), [VkCopyMemoryToImageIndirectCommandKHR](VkCopyMemoryToImageIndirectCommandKHR.html), [VkDeviceMemoryImageCopyKHR](VkDeviceMemoryImageCopyKHR.html), [VkImageCopy](VkImageCopy.html), [VkImageCopy2](VkImageCopy2.html), [VkImageCreateInfo](VkImageCreateInfo.html), [VkImageFormatProperties](VkImageFormatProperties.html), [VkImageResolve](VkImageResolve.html), [VkImageResolve2](VkImageResolve2.html), [VkImageToMemoryCopy](VkImageToMemoryCopy.html), [VkMemoryToImageCopy](VkMemoryToImageCopy.html), [VkQueueFamilyProperties](VkQueueFamilyProperties.html), [VkSparseImageFormatProperties](VkSparseImageFormatProperties.html), [VkSparseImageMemoryBind](VkSparseImageMemoryBind.html), [VkTilePropertiesQCOM](VkTilePropertiesQCOM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fundamentals.html#VkExtent3D).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
