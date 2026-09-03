# VkViewportSwizzleNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkViewportSwizzleNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkViewportSwizzleNV - Structure specifying a viewport swizzle

The `VkViewportSwizzleNV` structure is defined as:

// Provided by VK_NV_viewport_swizzle
typedef struct VkViewportSwizzleNV {
    VkViewportCoordinateSwizzleNV    x;
    VkViewportCoordinateSwizzleNV    y;
    VkViewportCoordinateSwizzleNV    z;
    VkViewportCoordinateSwizzleNV    w;
} VkViewportSwizzleNV;

* 
`x` is a [VkViewportCoordinateSwizzleNV](VkViewportCoordinateSwizzleNV.html) value specifying the
swizzle operation to apply to the x component of the primitive

* 
`y` is a [VkViewportCoordinateSwizzleNV](VkViewportCoordinateSwizzleNV.html) value specifying the
swizzle operation to apply to the y component of the primitive

* 
`z` is a [VkViewportCoordinateSwizzleNV](VkViewportCoordinateSwizzleNV.html) value specifying the
swizzle operation to apply to the z component of the primitive

* 
`w` is a [VkViewportCoordinateSwizzleNV](VkViewportCoordinateSwizzleNV.html) value specifying the
swizzle operation to apply to the w component of the primitive

Valid Usage (Implicit)

* 
[](#VUID-VkViewportSwizzleNV-x-parameter) VUID-VkViewportSwizzleNV-x-parameter

 `x` **must** be a valid [VkViewportCoordinateSwizzleNV](VkViewportCoordinateSwizzleNV.html) value

* 
[](#VUID-VkViewportSwizzleNV-y-parameter) VUID-VkViewportSwizzleNV-y-parameter

 `y` **must** be a valid [VkViewportCoordinateSwizzleNV](VkViewportCoordinateSwizzleNV.html) value

* 
[](#VUID-VkViewportSwizzleNV-z-parameter) VUID-VkViewportSwizzleNV-z-parameter

 `z` **must** be a valid [VkViewportCoordinateSwizzleNV](VkViewportCoordinateSwizzleNV.html) value

* 
[](#VUID-VkViewportSwizzleNV-w-parameter) VUID-VkViewportSwizzleNV-w-parameter

 `w` **must** be a valid [VkViewportCoordinateSwizzleNV](VkViewportCoordinateSwizzleNV.html) value

[VK_NV_viewport_swizzle](VK_NV_viewport_swizzle.html), [VkPipelineViewportSwizzleStateCreateInfoNV](VkPipelineViewportSwizzleStateCreateInfoNV.html), [VkViewportCoordinateSwizzleNV](VkViewportCoordinateSwizzleNV.html), [vkCmdSetViewportSwizzleNV](vkCmdSetViewportSwizzleNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/vertexpostproc.html#VkViewportSwizzleNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
