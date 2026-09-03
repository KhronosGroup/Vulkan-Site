# VkOffset2D(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkOffset2D.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkOffset2D - Structure specifying a two-dimensional offset

A two-dimensional offset is defined by the structure:

// Provided by VK_VERSION_1_0
typedef struct VkOffset2D {
    int32_t    x;
    int32_t    y;
} VkOffset2D;

* 
`x` is the x offset.

* 
`y` is the y offset.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDisplayPlaneCapabilitiesKHR](VkDisplayPlaneCapabilitiesKHR.html), [VkImageViewSampleWeightCreateInfoQCOM](VkImageViewSampleWeightCreateInfoQCOM.html), [VkRect2D](VkRect2D.html), [VkRectLayerKHR](VkRectLayerKHR.html), [VkRenderPassFragmentDensityMapOffsetEndInfoEXT](VkRenderPassFragmentDensityMapOffsetEndInfoEXT.html), [VkTilePropertiesQCOM](VkTilePropertiesQCOM.html), [VkVideoDecodeH264CapabilitiesKHR](VkVideoDecodeH264CapabilitiesKHR.html), [VkVideoPictureResourceInfoKHR](VkVideoPictureResourceInfoKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fundamentals.html#VkOffset2D).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
