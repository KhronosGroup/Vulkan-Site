# VkSurfaceFormat2KHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSurfaceFormat2KHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSurfaceFormat2KHR - Structure describing a supported swapchain format tuple

The `VkSurfaceFormat2KHR` structure is defined as:

// Provided by VK_KHR_get_surface_capabilities2
typedef struct VkSurfaceFormat2KHR {
    VkStructureType       sType;
    void*                 pNext;
    VkSurfaceFormatKHR    surfaceFormat;
} VkSurfaceFormat2KHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`surfaceFormat` is a [VkSurfaceFormatKHR](VkSurfaceFormatKHR.html) structure describing a
format-color space pair that is compatible with the specified surface.

If the [`imageCompressionControlSwapchain`](../../../../spec/latest/chapters/features.html#features-imageCompressionControlSwapchain) feature is supported and a
[VkImageCompressionPropertiesEXT](VkImageCompressionPropertiesEXT.html) structure is included in the
`pNext` chain of this structure, then it will be filled with the
compression properties that are supported for the `surfaceFormat`.

Valid Usage

* 
[](#VUID-VkSurfaceFormat2KHR-pNext-06750) VUID-VkSurfaceFormat2KHR-pNext-06750

If the `[VK_EXT_image_compression_control_swapchain](VK_EXT_image_compression_control_swapchain.html)` extension is
not supported, the
`pNext` chain **must** not include an
[VkImageCompressionPropertiesEXT](VkImageCompressionPropertiesEXT.html) structure

Valid Usage (Implicit)

* 
[](#VUID-VkSurfaceFormat2KHR-sType-sType) VUID-VkSurfaceFormat2KHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SURFACE_FORMAT_2_KHR](VkStructureType.html)

* 
[](#VUID-VkSurfaceFormat2KHR-pNext-pNext) VUID-VkSurfaceFormat2KHR-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkImageCompressionPropertiesEXT](VkImageCompressionPropertiesEXT.html)

* 
[](#VUID-VkSurfaceFormat2KHR-sType-unique) VUID-VkSurfaceFormat2KHR-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

[VK_KHR_get_surface_capabilities2](VK_KHR_get_surface_capabilities2.html), [VkStructureType](VkStructureType.html), [VkSurfaceFormatKHR](VkSurfaceFormatKHR.html), [vkGetPhysicalDeviceSurfaceFormats2KHR](vkGetPhysicalDeviceSurfaceFormats2KHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkSurfaceFormat2KHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
