# VkPipelineRasterizationLineStateCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineRasterizationLineStateCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineRasterizationLineStateCreateInfo - Structure specifying parameters of a newly created pipeline line rasterization state

Line segment rasterization options are controlled by the
[VkPipelineRasterizationLineStateCreateInfo](#) structure.

The `VkPipelineRasterizationLineStateCreateInfo` structure is defined
as:

// Provided by VK_VERSION_1_4
typedef struct VkPipelineRasterizationLineStateCreateInfo {
    VkStructureType            sType;
    const void*                pNext;
    VkLineRasterizationMode    lineRasterizationMode;
    VkBool32                   stippledLineEnable;
    uint32_t                   lineStippleFactor;
    uint16_t                   lineStipplePattern;
} VkPipelineRasterizationLineStateCreateInfo;

// Provided by VK_KHR_line_rasterization
// Equivalent to VkPipelineRasterizationLineStateCreateInfo
typedef VkPipelineRasterizationLineStateCreateInfo VkPipelineRasterizationLineStateCreateInfoKHR;

// Provided by VK_EXT_line_rasterization
// Equivalent to VkPipelineRasterizationLineStateCreateInfo
typedef VkPipelineRasterizationLineStateCreateInfo VkPipelineRasterizationLineStateCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`lineRasterizationMode` is a [VkLineRasterizationMode](VkLineRasterizationMode.html) value
selecting the style of line rasterization.

* 
`stippledLineEnable` enables [stippled    line rasterization](../../../../spec/latest/chapters/primsrast.html#primsrast-lines-stipple).

* 
`lineStippleFactor` is the repeat factor used in stippled line
rasterization.

* 
`lineStipplePattern` is the bit pattern used in stippled line
rasterization.

If `stippledLineEnable` is [VK_FALSE](VK_FALSE.html), the values of
`lineStippleFactor` and `lineStipplePattern` are ignored.

Valid Usage

* 
[](#VUID-VkPipelineRasterizationLineStateCreateInfo-lineRasterizationMode-02768) VUID-VkPipelineRasterizationLineStateCreateInfo-lineRasterizationMode-02768

If `lineRasterizationMode` is
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR](VkLineRasterizationMode.html), then the
[`rectangularLines`](../../../../spec/latest/chapters/features.html#features-rectangularLines) feature **must** be
enabled

* 
[](#VUID-VkPipelineRasterizationLineStateCreateInfo-lineRasterizationMode-02769) VUID-VkPipelineRasterizationLineStateCreateInfo-lineRasterizationMode-02769

If `lineRasterizationMode` is
[VK_LINE_RASTERIZATION_MODE_BRESENHAM](VkLineRasterizationMode.html), then the
[`bresenhamLines`](../../../../spec/latest/chapters/features.html#features-bresenhamLines) feature **must** be
enabled

* 
[](#VUID-VkPipelineRasterizationLineStateCreateInfo-lineRasterizationMode-02770) VUID-VkPipelineRasterizationLineStateCreateInfo-lineRasterizationMode-02770

If `lineRasterizationMode` is
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR_SMOOTH](VkLineRasterizationMode.html), then the
[`smoothLines`](../../../../spec/latest/chapters/features.html#features-smoothLines) feature **must** be enabled

* 
[](#VUID-VkPipelineRasterizationLineStateCreateInfo-stippledLineEnable-02771) VUID-VkPipelineRasterizationLineStateCreateInfo-stippledLineEnable-02771

If `stippledLineEnable` is [VK_TRUE](VK_TRUE.html) and
`lineRasterizationMode` is
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR](VkLineRasterizationMode.html), then the
[`stippledRectangularLines`](../../../../spec/latest/chapters/features.html#features-stippledRectangularLines)
feature **must** be enabled

* 
[](#VUID-VkPipelineRasterizationLineStateCreateInfo-stippledLineEnable-02772) VUID-VkPipelineRasterizationLineStateCreateInfo-stippledLineEnable-02772

If `stippledLineEnable` is [VK_TRUE](VK_TRUE.html) and
`lineRasterizationMode` is
[VK_LINE_RASTERIZATION_MODE_BRESENHAM](VkLineRasterizationMode.html), then the
[`stippledBresenhamLines`](../../../../spec/latest/chapters/features.html#features-stippledBresenhamLines)
feature **must** be enabled

* 
[](#VUID-VkPipelineRasterizationLineStateCreateInfo-stippledLineEnable-02773) VUID-VkPipelineRasterizationLineStateCreateInfo-stippledLineEnable-02773

If `stippledLineEnable` is [VK_TRUE](VK_TRUE.html) and
`lineRasterizationMode` is
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR_SMOOTH](VkLineRasterizationMode.html), then the
[`stippledSmoothLines`](../../../../spec/latest/chapters/features.html#features-stippledSmoothLines) feature
**must** be enabled

* 
[](#VUID-VkPipelineRasterizationLineStateCreateInfo-stippledLineEnable-02774) VUID-VkPipelineRasterizationLineStateCreateInfo-stippledLineEnable-02774

If `stippledLineEnable` is [VK_TRUE](VK_TRUE.html) and
`lineRasterizationMode` is [VK_LINE_RASTERIZATION_MODE_DEFAULT](VkLineRasterizationMode.html),
then the [    `stippledRectangularLines`](../../../../spec/latest/chapters/features.html#features-stippledRectangularLines) feature **must** be enabled and
[VkPhysicalDeviceLimits](VkPhysicalDeviceLimits.html)::`strictLines` **must** be [VK_TRUE](VK_TRUE.html)

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineRasterizationLineStateCreateInfo-sType-sType) VUID-VkPipelineRasterizationLineStateCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_RASTERIZATION_LINE_STATE_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkPipelineRasterizationLineStateCreateInfo-lineRasterizationMode-parameter) VUID-VkPipelineRasterizationLineStateCreateInfo-lineRasterizationMode-parameter

 `lineRasterizationMode` **must** be a valid [VkLineRasterizationMode](VkLineRasterizationMode.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html)

[VK_EXT_line_rasterization](VK_EXT_line_rasterization.html), [VK_KHR_line_rasterization](VK_KHR_line_rasterization.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), `VkBool32`, [VkLineRasterizationMode](VkLineRasterizationMode.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#VkPipelineRasterizationLineStateCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
