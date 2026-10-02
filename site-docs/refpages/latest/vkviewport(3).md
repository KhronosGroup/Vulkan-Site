# VkViewport(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkViewport.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkViewport - Structure specifying a viewport

The `VkViewport` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkViewport {
    float    x;
    float    y;
    float    width;
    float    height;
    float    minDepth;
    float    maxDepth;
} VkViewport;

* 
`x` and `y` are the viewport’s upper left corner (x,y).

* 
`width` and `height` are the viewport’s width and height,
respectively.

* 
`minDepth` and `maxDepth` are the depth range for the viewport.

|  | Despite their names, `minDepth` **can** be less than, equal to, or greater
| --- | --- |
than `maxDepth`. |

The framebuffer depth coordinate `z`f **may** be represented using
either a fixed-point or floating-point representation.
However, a floating-point representation **must** be used if the depth/stencil
attachment has a floating-point depth component.
If an m-bit fixed-point representation is used, we assume that it
represents each value   , where k ∈ {
0, 1, …​, 2m-1 }, as k (e.g. 1.0 is represented in binary as a
string of all ones).

The viewport parameters shown in the above equations are found from these
values as

ox = `x` +  `width` / 2

oy = `y` +  `height` / 2

oz = `minDepth`
(or (`maxDepth` + `minDepth`) / 2 if
[VkPipelineViewportDepthClipControlCreateInfoEXT](VkPipelineViewportDepthClipControlCreateInfoEXT.html)::`negativeOneToOne`
is [VK_TRUE](VK_TRUE.html))

px = `width`

py = `height`

pz = `maxDepth` - `minDepth`
(or (`maxDepth` - `minDepth`) / 2 if
[VkPipelineViewportDepthClipControlCreateInfoEXT](VkPipelineViewportDepthClipControlCreateInfoEXT.html)::`negativeOneToOne`
is [VK_TRUE](VK_TRUE.html))

If a render pass transform is enabled, the values (px,py) and
(ox, oy) defining the viewport are transformed as described in
[render pass transform](../../../../spec/latest/chapters/vertexpostproc.html#vertexpostproc-renderpass-transform) before
participating in the viewport transform.

The application **can** specify a negative term for `height`, which has the
effect of negating the y coordinate in clip space before performing the
transform.
When using a negative `height`, the application **should** also adjust the
`y` value to point to the lower left corner of the viewport instead of
the upper left corner.
Using the negative `height` allows the application to avoid having to
negate the y component of the `Position` output from the last
[pre-rasterization shader stage](../../../../spec/latest/chapters/pipelines.html#pipelines-graphics-subsets-pre-rasterization).

The width and height of the [implementation-dependent maximum viewport dimensions](../../../../spec/latest/chapters/limits.html#limits-maxViewportDimensions) **must** be greater than
or equal to the width and height of the largest image which **can** be created
and attached to a framebuffer.

The floating-point viewport bounds are represented with an
[implementation-dependent precision](../../../../spec/latest/chapters/limits.html#limits-viewportSubPixelBits).

Valid Usage

* 
[](#VUID-VkViewport-width-01770) VUID-VkViewport-width-01770

`width` **must** be greater than `0.0`

* 
[](#VUID-VkViewport-width-01771) VUID-VkViewport-width-01771

`width` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxViewportDimensions`[0]

* 
[](#VUID-VkViewport-apiVersion-07917) VUID-VkViewport-apiVersion-07917

If the [VK_KHR_maintenance1](VK_KHR_maintenance1.html) extension is not enabled, the
[VK_AMD_negative_viewport_height](VK_AMD_negative_viewport_height.html) extension is not enabled, and
[VkPhysicalDeviceProperties](VkPhysicalDeviceProperties.html)::`apiVersion` is less than Vulkan
1.1, `height` **must** be greater than `0.0`

* 
[](#VUID-VkViewport-height-01773) VUID-VkViewport-height-01773

The absolute value of `height` **must** be less than or equal to
`VkPhysicalDeviceLimits`::`maxViewportDimensions`[1]

* 
[](#VUID-VkViewport-x-01774) VUID-VkViewport-x-01774

`x` **must** be greater than or equal to `viewportBoundsRange`[0]

* 
[](#VUID-VkViewport-x-01232) VUID-VkViewport-x-01232

(`x` +  `width`) **must** be less than or equal to
`viewportBoundsRange`[1]

* 
[](#VUID-VkViewport-y-01775) VUID-VkViewport-y-01775

`y` **must** be greater than or equal to `viewportBoundsRange`[0]

* 
[](#VUID-VkViewport-y-01776) VUID-VkViewport-y-01776

`y` **must** be less than or equal to `viewportBoundsRange`[1]

* 
[](#VUID-VkViewport-y-01777) VUID-VkViewport-y-01777

(`y` +  `height`) **must** be greater than or equal to
`viewportBoundsRange`[0]

* 
[](#VUID-VkViewport-y-01233) VUID-VkViewport-y-01233

(`y` +  `height`) **must** be less than or equal to
`viewportBoundsRange`[1]

* 
[](#VUID-VkViewport-minDepth-01234) VUID-VkViewport-minDepth-01234

If the `[VK_EXT_depth_range_unrestricted](VK_EXT_depth_range_unrestricted.html)` extension is not
enabled,
`minDepth` **must** be between `0.0` and `1.0`, inclusive

* 
[](#VUID-VkViewport-maxDepth-01235) VUID-VkViewport-maxDepth-01235

If the `[VK_EXT_depth_range_unrestricted](VK_EXT_depth_range_unrestricted.html)` extension is not
enabled,
`maxDepth` **must** be between `0.0` and `1.0`, inclusive

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandBufferInheritanceViewportScissorInfoNV](VkCommandBufferInheritanceViewportScissorInfoNV.html), [VkPipelineViewportStateCreateInfo](VkPipelineViewportStateCreateInfo.html), [vkCmdSetViewport](vkCmdSetViewport.html), [vkCmdSetViewportWithCount](vkCmdSetViewportWithCount.html), [vkCmdSetViewportWithCount](vkCmdSetViewportWithCount.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/vertexpostproc.html#VkViewport).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
