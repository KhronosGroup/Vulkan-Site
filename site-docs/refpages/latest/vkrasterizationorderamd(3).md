# VkRasterizationOrderAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRasterizationOrderAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRasterizationOrderAMD - Specify rasterization order for a graphics pipeline

Possible values of
[VkPipelineRasterizationStateRasterizationOrderAMD](VkPipelineRasterizationStateRasterizationOrderAMD.html)::`rasterizationOrder`,
specifying the primitive rasterization order, are:

// Provided by VK_AMD_rasterization_order
typedef enum VkRasterizationOrderAMD {
    VK_RASTERIZATION_ORDER_STRICT_AMD = 0,
    VK_RASTERIZATION_ORDER_RELAXED_AMD = 1,
} VkRasterizationOrderAMD;

* 
[VK_RASTERIZATION_ORDER_STRICT_AMD](#) specifies that operations for
each primitive in a subpass **must** occur in [    primitive order](../../../../spec/latest/chapters/drawing.html#drawing-primitive-order).

* 
[VK_RASTERIZATION_ORDER_RELAXED_AMD](#) specifies that operations for
each primitive in a subpass **may** not occur in [    primitive order](../../../../spec/latest/chapters/drawing.html#drawing-primitive-order).

[VK_AMD_rasterization_order](VK_AMD_rasterization_order.html), [VkPipelineRasterizationStateRasterizationOrderAMD](VkPipelineRasterizationStateRasterizationOrderAMD.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#VkRasterizationOrderAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
