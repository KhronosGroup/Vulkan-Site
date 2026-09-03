# VkPipelineRasterizationStateRasterizationOrderAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineRasterizationStateRasterizationOrderAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineRasterizationStateRasterizationOrderAMD - Structure defining rasterization order for a graphics pipeline

The rasterization order to use for a graphics pipeline is specified by
adding a `VkPipelineRasterizationStateRasterizationOrderAMD` structure
to the `pNext` chain of a [VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html)
structure.

The `VkPipelineRasterizationStateRasterizationOrderAMD` structure is
defined as:

// Provided by VK_AMD_rasterization_order
typedef struct VkPipelineRasterizationStateRasterizationOrderAMD {
    VkStructureType            sType;
    const void*                pNext;
    VkRasterizationOrderAMD    rasterizationOrder;
} VkPipelineRasterizationStateRasterizationOrderAMD;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`rasterizationOrder` is a [VkRasterizationOrderAMD](VkRasterizationOrderAMD.html) value
specifying the primitive rasterization order to use.

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineRasterizationStateRasterizationOrderAMD-sType-sType) VUID-VkPipelineRasterizationStateRasterizationOrderAMD-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_RASTERIZATION_STATE_RASTERIZATION_ORDER_AMD](VkStructureType.html)

* 
[](#VUID-VkPipelineRasterizationStateRasterizationOrderAMD-rasterizationOrder-parameter) VUID-VkPipelineRasterizationStateRasterizationOrderAMD-rasterizationOrder-parameter

 `rasterizationOrder` **must** be a valid [VkRasterizationOrderAMD](VkRasterizationOrderAMD.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html)

If the `[VK_AMD_rasterization_order](VK_AMD_rasterization_order.html)` device extension is not enabled
or the application does not request a particular rasterization order through
specifying a `VkPipelineRasterizationStateRasterizationOrderAMD`
structure then the rasterization order used by the graphics pipeline
defaults to [VK_RASTERIZATION_ORDER_STRICT_AMD](VkRasterizationOrderAMD.html).

[VK_AMD_rasterization_order](VK_AMD_rasterization_order.html), [VkRasterizationOrderAMD](VkRasterizationOrderAMD.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#VkPipelineRasterizationStateRasterizationOrderAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
