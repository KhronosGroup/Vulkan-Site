# VkPipelineDepthStencilStateCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineDepthStencilStateCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineDepthStencilStateCreateInfo - Structure specifying parameters of a newly created pipeline depth stencil state

The `VkPipelineDepthStencilStateCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkPipelineDepthStencilStateCreateInfo {
    VkStructureType                           sType;
    const void*                               pNext;
    VkPipelineDepthStencilStateCreateFlags    flags;
    VkBool32                                  depthTestEnable;
    VkBool32                                  depthWriteEnable;
    VkCompareOp                               depthCompareOp;
    VkBool32                                  depthBoundsTestEnable;
    VkBool32                                  stencilTestEnable;
    VkStencilOpState                          front;
    VkStencilOpState                          back;
    float                                     minDepthBounds;
    float                                     maxDepthBounds;
} VkPipelineDepthStencilStateCreateInfo;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of
[VkPipelineDepthStencilStateCreateFlagBits](VkPipelineDepthStencilStateCreateFlagBits.html) specifying additional
depth/stencil state information.

* 
`depthTestEnable` controls whether [depth testing](../../../../spec/latest/chapters/fragops.html#fragops-depth)
is enabled.

* 
`depthWriteEnable` controls whether [depth    writes](../../../../spec/latest/chapters/fragops.html#fragops-depth-write) are enabled when `depthTestEnable` is [VK_TRUE](VK_TRUE.html).
Depth writes are always disabled when `depthTestEnable` is
[VK_FALSE](VK_FALSE.html).

* 
`depthCompareOp` is a [VkCompareOp](VkCompareOp.html) value specifying the
comparison operator to use in the [Depth    Comparison](../../../../spec/latest/chapters/fragops.html#fragops-depth-comparison) step of the [depth test](../../../../spec/latest/chapters/fragops.html#fragops-depth).

* 
`depthBoundsTestEnable` controls whether [depth bounds    testing](../../../../spec/latest/chapters/fragops.html#fragops-dbt) is enabled.

* 
`stencilTestEnable` controls whether [stencil    testing](../../../../spec/latest/chapters/fragops.html#fragops-stencil) is enabled.

* 
`front` and `back` are [VkStencilOpState](VkStencilOpState.html) values controlling
the corresponding parameters of the [stencil test](../../../../spec/latest/chapters/fragops.html#fragops-stencil).

* 
`minDepthBounds` is the minimum depth bound used in the
[depth bounds test](../../../../spec/latest/chapters/fragops.html#fragops-dbt).

* 
`maxDepthBounds` is the maximum depth bound used in the
[depth bounds test](../../../../spec/latest/chapters/fragops.html#fragops-dbt).

Valid Usage

* 
[](#VUID-VkPipelineDepthStencilStateCreateInfo-depthBoundsTestEnable-00598) VUID-VkPipelineDepthStencilStateCreateInfo-depthBoundsTestEnable-00598

If the [`depthBounds`](../../../../spec/latest/chapters/features.html#features-depthBounds) feature is not
enabled, `depthBoundsTestEnable` **must** be [VK_FALSE](VK_FALSE.html)

* 
[](#VUID-VkPipelineDepthStencilStateCreateInfo-separateStencilMaskRef-04453) VUID-VkPipelineDepthStencilStateCreateInfo-separateStencilMaskRef-04453

If the `[VK_KHR_portability_subset](VK_KHR_portability_subset.html)` extension is enabled, and
[VkPhysicalDevicePortabilitySubsetFeaturesKHR](VkPhysicalDevicePortabilitySubsetFeaturesKHR.html)::`separateStencilMaskRef`
is [VK_FALSE](VK_FALSE.html), and the value of
[VkPipelineDepthStencilStateCreateInfo](#)::`stencilTestEnable` is
[VK_TRUE](VK_TRUE.html), and the value of
[VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html)::`cullMode` is
[VK_CULL_MODE_NONE](VkCullModeFlagBits.html), the value of `reference` in each of the
[VkStencilOpState](VkStencilOpState.html) structs in `front` and `back` **must** be
the same

* 
[](#VUID-VkPipelineDepthStencilStateCreateInfo-rasterizationOrderDepthAttachmentAccess-06463) VUID-VkPipelineDepthStencilStateCreateInfo-rasterizationOrderDepthAttachmentAccess-06463

If the [    `rasterizationOrderDepthAttachmentAccess`](../../../../spec/latest/chapters/features.html#features-rasterizationOrderDepthAttachmentAccess) feature is not enabled,
`flags` **must** not include
[VK_PIPELINE_DEPTH_STENCIL_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_DEPTH_ACCESS_BIT_EXT](VkPipelineDepthStencilStateCreateFlagBits.html)

* 
[](#VUID-VkPipelineDepthStencilStateCreateInfo-rasterizationOrderStencilAttachmentAccess-06464) VUID-VkPipelineDepthStencilStateCreateInfo-rasterizationOrderStencilAttachmentAccess-06464

If the [    `rasterizationOrderStencilAttachmentAccess`](../../../../spec/latest/chapters/features.html#features-rasterizationOrderStencilAttachmentAccess) feature is not
enabled, `flags` **must** not include
[VK_PIPELINE_DEPTH_STENCIL_STATE_CREATE_RASTERIZATION_ORDER_ATTACHMENT_STENCIL_ACCESS_BIT_EXT](VkPipelineDepthStencilStateCreateFlagBits.html)

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineDepthStencilStateCreateInfo-sType-sType) VUID-VkPipelineDepthStencilStateCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_DEPTH_STENCIL_STATE_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkPipelineDepthStencilStateCreateInfo-pNext-pNext) VUID-VkPipelineDepthStencilStateCreateInfo-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkPipelineDepthStencilStateCreateInfo-flags-parameter) VUID-VkPipelineDepthStencilStateCreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkPipelineDepthStencilStateCreateFlagBits](VkPipelineDepthStencilStateCreateFlagBits.html) values

* 
[](#VUID-VkPipelineDepthStencilStateCreateInfo-depthCompareOp-parameter) VUID-VkPipelineDepthStencilStateCreateInfo-depthCompareOp-parameter

 `depthCompareOp` **must** be a valid [VkCompareOp](VkCompareOp.html) value

* 
[](#VUID-VkPipelineDepthStencilStateCreateInfo-front-parameter) VUID-VkPipelineDepthStencilStateCreateInfo-front-parameter

 `front` **must** be a valid [VkStencilOpState](VkStencilOpState.html) structure

* 
[](#VUID-VkPipelineDepthStencilStateCreateInfo-back-parameter) VUID-VkPipelineDepthStencilStateCreateInfo-back-parameter

 `back` **must** be a valid [VkStencilOpState](VkStencilOpState.html) structure

[VK_VERSION_1_0](VK_VERSION_1_0.html), `VkBool32`, [VkCompareOp](VkCompareOp.html), [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), [VkPipelineDepthStencilStateCreateFlags](VkPipelineDepthStencilStateCreateFlags.html), [VkStencilOpState](VkStencilOpState.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fragops.html#VkPipelineDepthStencilStateCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
