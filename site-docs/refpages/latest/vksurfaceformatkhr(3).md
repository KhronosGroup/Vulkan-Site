# VkSurfaceFormatKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSurfaceFormatKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSurfaceFormatKHR - Structure describing a supported swapchain format-color space pair

The `VkSurfaceFormatKHR` structure is defined as:

// Provided by VK_KHR_surface
typedef struct VkSurfaceFormatKHR {
    VkFormat           format;
    VkColorSpaceKHR    colorSpace;
} VkSurfaceFormatKHR;

* 
`format` is a [VkFormat](VkFormat.html) that is compatible with the specified
surface.

* 
`colorSpace` is a presentation [VkColorSpaceKHR](VkColorSpaceKHR.html) that is
compatible with the surface.

[VK_KHR_surface](VK_KHR_surface.html), [VkColorSpaceKHR](VkColorSpaceKHR.html), [VkFormat](VkFormat.html), [VkSurfaceFormat2KHR](VkSurfaceFormat2KHR.html), [vkGetPhysicalDeviceSurfaceFormatsKHR](vkGetPhysicalDeviceSurfaceFormatsKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkSurfaceFormatKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
