# VkImageViewType(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageViewType.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageViewType - Image view types

The types of image views that **can** be created are:

// Provided by VK_VERSION_1_0
typedef enum VkImageViewType {
    VK_IMAGE_VIEW_TYPE_1D = 0,
    VK_IMAGE_VIEW_TYPE_2D = 1,
    VK_IMAGE_VIEW_TYPE_3D = 2,
    VK_IMAGE_VIEW_TYPE_CUBE = 3,
    VK_IMAGE_VIEW_TYPE_1D_ARRAY = 4,
    VK_IMAGE_VIEW_TYPE_2D_ARRAY = 5,
    VK_IMAGE_VIEW_TYPE_CUBE_ARRAY = 6,
} VkImageViewType;

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkImageViewCreateInfo](VkImageViewCreateInfo.html), [VkPhysicalDeviceImageViewImageFormatInfoEXT](VkPhysicalDeviceImageViewImageFormatInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageViewType).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
