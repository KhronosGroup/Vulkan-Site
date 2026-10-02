# VkViewportCoordinateSwizzleNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkViewportCoordinateSwizzleNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkViewportCoordinateSwizzleNV - Specify how a viewport coordinate is swizzled

Possible values of the [VkViewportSwizzleNV](VkViewportSwizzleNV.html)::`x`, `y`, `z`,
and `w` members, specifying swizzling of the corresponding components of
primitives, are:

// Provided by VK_NV_viewport_swizzle
typedef enum VkViewportCoordinateSwizzleNV {
    VK_VIEWPORT_COORDINATE_SWIZZLE_POSITIVE_X_NV = 0,
    VK_VIEWPORT_COORDINATE_SWIZZLE_NEGATIVE_X_NV = 1,
    VK_VIEWPORT_COORDINATE_SWIZZLE_POSITIVE_Y_NV = 2,
    VK_VIEWPORT_COORDINATE_SWIZZLE_NEGATIVE_Y_NV = 3,
    VK_VIEWPORT_COORDINATE_SWIZZLE_POSITIVE_Z_NV = 4,
    VK_VIEWPORT_COORDINATE_SWIZZLE_NEGATIVE_Z_NV = 5,
    VK_VIEWPORT_COORDINATE_SWIZZLE_POSITIVE_W_NV = 6,
    VK_VIEWPORT_COORDINATE_SWIZZLE_NEGATIVE_W_NV = 7,
} VkViewportCoordinateSwizzleNV;

These values are described in detail in [Viewport Swizzle](../../../../spec/latest/chapters/vertexpostproc.html#vertexpostproc-viewport-swizzle).

[VK_NV_viewport_swizzle](VK_NV_viewport_swizzle.html), [VkViewportSwizzleNV](VkViewportSwizzleNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/vertexpostproc.html#VkViewportCoordinateSwizzleNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
