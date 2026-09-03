# VkPipelineViewportCoarseSampleOrderStateCreateInfoNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineViewportCoarseSampleOrderStateCreateInfoNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineViewportCoarseSampleOrderStateCreateInfoNV - Structure specifying parameters controlling sample order in coarse fragments

If the `pNext` chain of [VkPipelineViewportStateCreateInfo](VkPipelineViewportStateCreateInfo.html) includes
a `VkPipelineViewportCoarseSampleOrderStateCreateInfoNV` structure, then
that structure includes parameters controlling the order of coverage samples
in fragments larger than one pixel.

The `VkPipelineViewportCoarseSampleOrderStateCreateInfoNV` structure is
defined as:

// Provided by VK_NV_shading_rate_image
typedef struct VkPipelineViewportCoarseSampleOrderStateCreateInfoNV {
    VkStructureType                       sType;
    const void*                           pNext;
    VkCoarseSampleOrderTypeNV             sampleOrderType;
    uint32_t                              customSampleOrderCount;
    const VkCoarseSampleOrderCustomNV*    pCustomSampleOrders;
} VkPipelineViewportCoarseSampleOrderStateCreateInfoNV;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`sampleOrderType` specifies the mechanism used to order coverage
samples in fragments larger than one pixel.

* 
`customSampleOrderCount` specifies the number of custom sample
orderings to use when ordering coverage samples.

* 
`pCustomSampleOrders` is a pointer to an array of
`customSampleOrderCount` [VkCoarseSampleOrderCustomNV](VkCoarseSampleOrderCustomNV.html)
structures, each structure specifying the coverage sample order for a
single combination of fragment area and coverage sample count.

If this structure is not present, `sampleOrderType` is considered to be
[VK_COARSE_SAMPLE_ORDER_TYPE_DEFAULT_NV](VkCoarseSampleOrderTypeNV.html).

If `sampleOrderType` is [VK_COARSE_SAMPLE_ORDER_TYPE_CUSTOM_NV](VkCoarseSampleOrderTypeNV.html), the
coverage sample order used for any combination of fragment area and coverage
sample count not enumerated in `pCustomSampleOrders` will be identical
to that used for [VK_COARSE_SAMPLE_ORDER_TYPE_DEFAULT_NV](VkCoarseSampleOrderTypeNV.html).

If the pipeline was created with
[VK_DYNAMIC_STATE_VIEWPORT_COARSE_SAMPLE_ORDER_NV](VkDynamicState.html), the contents of this
structure (if present) are ignored, and the coverage sample order is instead
specified by [vkCmdSetCoarseSampleOrderNV](vkCmdSetCoarseSampleOrderNV.html).

Valid Usage

* 
[](#VUID-VkPipelineViewportCoarseSampleOrderStateCreateInfoNV-sampleOrderType-02072) VUID-VkPipelineViewportCoarseSampleOrderStateCreateInfoNV-sampleOrderType-02072

If `sampleOrderType` is not
[VK_COARSE_SAMPLE_ORDER_TYPE_CUSTOM_NV](VkCoarseSampleOrderTypeNV.html),
`customSamplerOrderCount` **must** be `0`

* 
[](#VUID-VkPipelineViewportCoarseSampleOrderStateCreateInfoNV-pCustomSampleOrders-02234) VUID-VkPipelineViewportCoarseSampleOrderStateCreateInfoNV-pCustomSampleOrders-02234

The array `pCustomSampleOrders` **must** not contain two structures
with matching values for both the `shadingRate` and
`sampleCount` members

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineViewportCoarseSampleOrderStateCreateInfoNV-sType-sType) VUID-VkPipelineViewportCoarseSampleOrderStateCreateInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_VIEWPORT_COARSE_SAMPLE_ORDER_STATE_CREATE_INFO_NV](VkStructureType.html)

* 
[](#VUID-VkPipelineViewportCoarseSampleOrderStateCreateInfoNV-sampleOrderType-parameter) VUID-VkPipelineViewportCoarseSampleOrderStateCreateInfoNV-sampleOrderType-parameter

 `sampleOrderType` **must** be a valid [VkCoarseSampleOrderTypeNV](VkCoarseSampleOrderTypeNV.html) value

* 
[](#VUID-VkPipelineViewportCoarseSampleOrderStateCreateInfoNV-pCustomSampleOrders-parameter) VUID-VkPipelineViewportCoarseSampleOrderStateCreateInfoNV-pCustomSampleOrders-parameter

 If `customSampleOrderCount` is not `0`, `pCustomSampleOrders` **must** be a valid pointer to an array of `customSampleOrderCount` valid [VkCoarseSampleOrderCustomNV](VkCoarseSampleOrderCustomNV.html) structures

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineViewportStateCreateInfo](VkPipelineViewportStateCreateInfo.html)

[VK_NV_shading_rate_image](VK_NV_shading_rate_image.html), [VkCoarseSampleOrderCustomNV](VkCoarseSampleOrderCustomNV.html), [VkCoarseSampleOrderTypeNV](VkCoarseSampleOrderTypeNV.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#VkPipelineViewportCoarseSampleOrderStateCreateInfoNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
