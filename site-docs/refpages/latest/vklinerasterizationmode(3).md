# VkLineRasterizationMode(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkLineRasterizationMode.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkLineRasterizationMode - Line rasterization modes

Possible values of
[VkPipelineRasterizationLineStateCreateInfo](VkPipelineRasterizationLineStateCreateInfo.html)::`lineRasterizationMode`,
specifying the line rasterization mode, are:

// Provided by VK_VERSION_1_4
typedef enum VkLineRasterizationMode {
    VK_LINE_RASTERIZATION_MODE_DEFAULT = 0,
    VK_LINE_RASTERIZATION_MODE_RECTANGULAR = 1,
    VK_LINE_RASTERIZATION_MODE_BRESENHAM = 2,
    VK_LINE_RASTERIZATION_MODE_RECTANGULAR_SMOOTH = 3,
  // Provided by VK_EXT_line_rasterization
    VK_LINE_RASTERIZATION_MODE_DEFAULT_EXT = VK_LINE_RASTERIZATION_MODE_DEFAULT,
  // Provided by VK_EXT_line_rasterization
    VK_LINE_RASTERIZATION_MODE_RECTANGULAR_EXT = VK_LINE_RASTERIZATION_MODE_RECTANGULAR,
  // Provided by VK_EXT_line_rasterization
    VK_LINE_RASTERIZATION_MODE_BRESENHAM_EXT = VK_LINE_RASTERIZATION_MODE_BRESENHAM,
  // Provided by VK_EXT_line_rasterization
    VK_LINE_RASTERIZATION_MODE_RECTANGULAR_SMOOTH_EXT = VK_LINE_RASTERIZATION_MODE_RECTANGULAR_SMOOTH,
  // Provided by VK_KHR_line_rasterization
    VK_LINE_RASTERIZATION_MODE_DEFAULT_KHR = VK_LINE_RASTERIZATION_MODE_DEFAULT,
  // Provided by VK_KHR_line_rasterization
    VK_LINE_RASTERIZATION_MODE_RECTANGULAR_KHR = VK_LINE_RASTERIZATION_MODE_RECTANGULAR,
  // Provided by VK_KHR_line_rasterization
    VK_LINE_RASTERIZATION_MODE_BRESENHAM_KHR = VK_LINE_RASTERIZATION_MODE_BRESENHAM,
  // Provided by VK_KHR_line_rasterization
    VK_LINE_RASTERIZATION_MODE_RECTANGULAR_SMOOTH_KHR = VK_LINE_RASTERIZATION_MODE_RECTANGULAR_SMOOTH,
} VkLineRasterizationMode;

// Provided by VK_KHR_line_rasterization
// Equivalent to VkLineRasterizationMode
typedef VkLineRasterizationMode VkLineRasterizationModeKHR;

// Provided by VK_EXT_line_rasterization
// Equivalent to VkLineRasterizationMode
typedef VkLineRasterizationMode VkLineRasterizationModeEXT;

* 
[VK_LINE_RASTERIZATION_MODE_DEFAULT](#) is equivalent to
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR](#) if
[VkPhysicalDeviceLimits](VkPhysicalDeviceLimits.html)::`strictLines` is [VK_TRUE](VK_TRUE.html),
otherwise lines are drawn as non-`strictLines` parallelograms.
Both of these modes are defined in [Basic Line    Segment Rasterization](../../../../spec/latest/chapters/primsrast.html#primsrast-lines-basic).

* 
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR](#) specifies lines drawn as if
they were rectangles extruded from the line

* 
[VK_LINE_RASTERIZATION_MODE_BRESENHAM](#) specifies lines drawn by
determining which pixel diamonds the line intersects and exits, as
defined in [Bresenham Line Segment    Rasterization](../../../../spec/latest/chapters/primsrast.html#primsrast-lines-bresenham).

* 
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR_SMOOTH](#) specifies lines
drawn if they were rectangles extruded from the line, with alpha
falloff, as defined in [Smooth Lines](../../../../spec/latest/chapters/primsrast.html#primsrast-lines-smooth).

[VK_EXT_line_rasterization](VK_EXT_line_rasterization.html), [VK_KHR_line_rasterization](VK_KHR_line_rasterization.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkPipelineRasterizationLineStateCreateInfo](VkPipelineRasterizationLineStateCreateInfo.html), [vkCmdSetLineRasterizationModeEXT](vkCmdSetLineRasterizationModeEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#VkLineRasterizationMode).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
