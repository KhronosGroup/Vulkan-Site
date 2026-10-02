# VkPolygonMode(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPolygonMode.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPolygonMode - Control polygon rasterization mode

Possible values of the
[VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html)::`polygonMode` property of
the currently active pipeline, specifying the method of rasterization for
polygons, are:

// Provided by VK_VERSION_1_0
typedef enum VkPolygonMode {
    VK_POLYGON_MODE_FILL = 0,
    VK_POLYGON_MODE_LINE = 1,
    VK_POLYGON_MODE_POINT = 2,
  // Provided by VK_NV_fill_rectangle
    VK_POLYGON_MODE_FILL_RECTANGLE_NV = 1000153000,
} VkPolygonMode;

* 
[VK_POLYGON_MODE_POINT](#) specifies that polygon vertices are drawn as
points.

* 
[VK_POLYGON_MODE_LINE](#) specifies that polygon edges are drawn as
line segments.

* 
[VK_POLYGON_MODE_FILL](#) specifies that polygons are rendered using
the polygon rasterization rules in this section.

* 
[VK_POLYGON_MODE_FILL_RECTANGLE_NV](#) specifies that polygons are
rendered using polygon rasterization rules, modified to consider a
sample within the primitive if the sample location is inside the
axis-aligned bounding box of the triangle after projection.
Note that the barycentric weights used in attribute interpolation **can**
extend outside the range [0,1] when these primitives are shaded.
Special treatment is given to a sample position on the boundary edge of
the bounding box.
In such a case, if two rectangles lie on either side of a common edge
(with identical endpoints) on which a sample position lies, then exactly
one of the triangles **must** produce a fragment that covers that sample
during rasterization.

Polygons rendered in [VK_POLYGON_MODE_FILL_RECTANGLE_NV](#) mode **may** be
clipped by the frustum or by user clip planes.
If clipping is applied, the triangle is culled rather than clipped.

Area calculation and facingness are determined for
[VK_POLYGON_MODE_FILL_RECTANGLE_NV](#) mode using the triangle’s vertices.

These modes affect only the final rasterization of polygons: in particular,
a polygon’s vertices are shaded and the polygon is clipped and possibly
culled before these modes are applied.

If `VkPhysicalDeviceMaintenance5Properties`::`polygonModePointSize`
is [VK_TRUE](VK_TRUE.html), the point size of the final rasterization of polygons is
taken from `PointSize` when [polygon mode](../../../../spec/latest/chapters/primsrast.html#primsrast-polygonmode) is
[VK_POLYGON_MODE_POINT](#).

Otherwise, if
`VkPhysicalDeviceMaintenance5Properties`::`polygonModePointSize` is
[VK_FALSE](VK_FALSE.html), the point size of the final rasterization of polygons is 1.0
when [polygon mode](../../../../spec/latest/chapters/primsrast.html#primsrast-polygonmode) is [VK_POLYGON_MODE_POINT](#).

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html), [vkCmdSetPolygonModeEXT](vkCmdSetPolygonModeEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#VkPolygonMode).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
