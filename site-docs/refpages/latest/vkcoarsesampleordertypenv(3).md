# VkCoarseSampleOrderTypeNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCoarseSampleOrderTypeNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCoarseSampleOrderTypeNV - Shading rate image sample ordering types

The type [VkCoarseSampleOrderTypeNV](#) specifies the technique used to
order coverage samples in fragments larger than one pixel, and is defined
as:

// Provided by VK_NV_shading_rate_image
typedef enum VkCoarseSampleOrderTypeNV {
    VK_COARSE_SAMPLE_ORDER_TYPE_DEFAULT_NV = 0,
    VK_COARSE_SAMPLE_ORDER_TYPE_CUSTOM_NV = 1,
    VK_COARSE_SAMPLE_ORDER_TYPE_PIXEL_MAJOR_NV = 2,
    VK_COARSE_SAMPLE_ORDER_TYPE_SAMPLE_MAJOR_NV = 3,
} VkCoarseSampleOrderTypeNV;

* 
[VK_COARSE_SAMPLE_ORDER_TYPE_DEFAULT_NV](#) specifies that coverage
samples will be ordered in an implementation-dependent manner.

* 
[VK_COARSE_SAMPLE_ORDER_TYPE_CUSTOM_NV](#) specifies that coverage
samples will be ordered according to the array of custom orderings
provided in either the `pCustomSampleOrders` member of
`VkPipelineViewportCoarseSampleOrderStateCreateInfoNV` or the
`pCustomSampleOrders` member of [vkCmdSetCoarseSampleOrderNV](vkCmdSetCoarseSampleOrderNV.html).

* 
[VK_COARSE_SAMPLE_ORDER_TYPE_PIXEL_MAJOR_NV](#) specifies that coverage
samples will be ordered sequentially, sorted first by pixel coordinate
(in row-major order) and then by
[sample index](../../../../spec/latest/chapters/primsrast.html#primsrast-multisampling-coverage-mask).

* 
[VK_COARSE_SAMPLE_ORDER_TYPE_SAMPLE_MAJOR_NV](#) specifies that
coverage samples will be ordered sequentially, sorted first by
[sample index](../../../../spec/latest/chapters/primsrast.html#primsrast-multisampling-coverage-mask) and then by
pixel coordinate (in row-major order).

[VK_NV_shading_rate_image](VK_NV_shading_rate_image.html), [VkPipelineViewportCoarseSampleOrderStateCreateInfoNV](VkPipelineViewportCoarseSampleOrderStateCreateInfoNV.html), [vkCmdSetCoarseSampleOrderNV](vkCmdSetCoarseSampleOrderNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#VkCoarseSampleOrderTypeNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
