# VkCommandBufferInheritanceInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCommandBufferInheritanceInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCommandBufferInheritanceInfo - Structure specifying command buffer inheritance information

If the command buffer is a secondary command buffer, then the
`VkCommandBufferInheritanceInfo` structure defines any state that will
be inherited from the primary command buffer:

// Provided by VK_VERSION_1_0
typedef struct VkCommandBufferInheritanceInfo {
    VkStructureType                  sType;
    const void*                      pNext;
    VkRenderPass                     renderPass;
    uint32_t                         subpass;
    VkFramebuffer                    framebuffer;
    VkBool32                         occlusionQueryEnable;
    VkQueryControlFlags              queryFlags;
    VkQueryPipelineStatisticFlags    pipelineStatistics;
} VkCommandBufferInheritanceInfo;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`renderPass` is a [VkRenderPass](VkRenderPass.html) object defining which render
passes the `VkCommandBuffer` will be [    compatible](../../../../spec/latest/chapters/renderpass.html#renderpass-compatibility) with and **can** be executed within.

* 
`subpass` is the index of the subpass within the render pass
instance that the `VkCommandBuffer` will be executed within.

* 
`framebuffer` **can** refer to the [VkFramebuffer](VkFramebuffer.html) object that the
`VkCommandBuffer` will be rendering to if it is executed within a
render pass instance.
It **can** be [VK_NULL_HANDLE](VK_NULL_HANDLE.html) if the framebuffer is not known.

|  | Specifying the exact framebuffer that the secondary command buffer will be
| --- | --- |
executed with **may** result in better performance at command buffer execution
time. |

* 
`occlusionQueryEnable` specifies whether the command buffer **can** be
executed while an occlusion query is active in the primary command
buffer.
If this is [VK_TRUE](VK_TRUE.html), then this command buffer **can** be executed
whether the primary command buffer has an occlusion query active or not.
If this is [VK_FALSE](VK_FALSE.html), then the primary command buffer **must** not
have an occlusion query active.

* 
`queryFlags` specifies the query flags that **can** be used by an
active occlusion query in the primary command buffer when this secondary
command buffer is executed.
If this value includes the [VK_QUERY_CONTROL_PRECISE_BIT](VkQueryControlFlagBits.html) bit, then
the active query **can** return boolean results or actual sample counts.
If this bit is not set, then the active query **must** not use the
[VK_QUERY_CONTROL_PRECISE_BIT](VkQueryControlFlagBits.html) bit.

* 
`pipelineStatistics` is a bitmask of
[VkQueryPipelineStatisticFlagBits](VkQueryPipelineStatisticFlagBits.html) specifying the set of pipeline
statistics that **can** be counted by an active query in the primary
command buffer when this secondary command buffer is executed.
If this value includes a given bit, then this command buffer **can** be
executed whether the primary command buffer has a pipeline statistics
query active that includes this bit or not.
If this value excludes a given bit, then the active pipeline statistics
query **must** not be from a query pool that counts that statistic.

If the [VkCommandBuffer](VkCommandBuffer.html) will not be executed within a render pass
instance,
or if the render pass instance was begun with [vkCmdBeginRendering](vkCmdBeginRendering.html),
`renderPass`, `subpass`, and `framebuffer` are ignored.

Valid Usage

* 
[](#VUID-VkCommandBufferInheritanceInfo-occlusionQueryEnable-00056) VUID-VkCommandBufferInheritanceInfo-occlusionQueryEnable-00056

If the [`inheritedQueries`](../../../../spec/latest/chapters/features.html#features-inheritedQueries) feature is
not enabled, `occlusionQueryEnable` **must** be [VK_FALSE](VK_FALSE.html)

* 
[](#VUID-VkCommandBufferInheritanceInfo-queryFlags-00057) VUID-VkCommandBufferInheritanceInfo-queryFlags-00057

If the [`inheritedQueries`](../../../../spec/latest/chapters/features.html#features-inheritedQueries) feature is
enabled, `queryFlags` **must** be a valid combination of
[VkQueryControlFlagBits](VkQueryControlFlagBits.html) values

* 
[](#VUID-VkCommandBufferInheritanceInfo-queryFlags-02788) VUID-VkCommandBufferInheritanceInfo-queryFlags-02788

If the [`inheritedQueries`](../../../../spec/latest/chapters/features.html#features-inheritedQueries) feature is
not enabled, `queryFlags` **must** be `0`

* 
[](#VUID-VkCommandBufferInheritanceInfo-pipelineStatistics-02789) VUID-VkCommandBufferInheritanceInfo-pipelineStatistics-02789

If the [    `pipelineStatisticsQuery`](../../../../spec/latest/chapters/features.html#features-pipelineStatisticsQuery) feature is enabled,
`pipelineStatistics` **must** be a valid combination of
[VkQueryPipelineStatisticFlagBits](VkQueryPipelineStatisticFlagBits.html) values

* 
[](#VUID-VkCommandBufferInheritanceInfo-pipelineStatistics-00058) VUID-VkCommandBufferInheritanceInfo-pipelineStatistics-00058

If the [    `pipelineStatisticsQuery`](../../../../spec/latest/chapters/features.html#features-pipelineStatisticsQuery) feature is not enabled,
`pipelineStatistics` **must** be `0`

Valid Usage (Implicit)

* 
[](#VUID-VkCommandBufferInheritanceInfo-sType-sType) VUID-VkCommandBufferInheritanceInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_COMMAND_BUFFER_INHERITANCE_INFO](VkStructureType.html)

* 
[](#VUID-VkCommandBufferInheritanceInfo-pNext-pNext) VUID-VkCommandBufferInheritanceInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkAttachmentSampleCountInfoAMD](VkAttachmentSampleCountInfoAMD.html), [VkCommandBufferInheritanceConditionalRenderingInfoEXT](VkCommandBufferInheritanceConditionalRenderingInfoEXT.html), [VkCommandBufferInheritanceDescriptorHeapInfoEXT](VkCommandBufferInheritanceDescriptorHeapInfoEXT.html), [VkCommandBufferInheritanceRenderPassTransformInfoQCOM](VkCommandBufferInheritanceRenderPassTransformInfoQCOM.html), [VkCommandBufferInheritanceRenderingInfo](VkCommandBufferInheritanceRenderingInfo.html), [VkCommandBufferInheritanceViewportScissorInfoNV](VkCommandBufferInheritanceViewportScissorInfoNV.html), [VkCustomResolveCreateInfoEXT](VkCustomResolveCreateInfoEXT.html), [VkExternalFormatANDROID](VkExternalFormatANDROID.html), [VkExternalFormatOHOS](VkExternalFormatOHOS.html), [VkMultiviewPerViewAttributesInfoNVX](VkMultiviewPerViewAttributesInfoNVX.html), [VkRenderPassTileShadingCreateInfoQCOM](VkRenderPassTileShadingCreateInfoQCOM.html), [VkRenderingAttachmentLocationInfo](VkRenderingAttachmentLocationInfo.html), [VkRenderingInputAttachmentIndexInfo](VkRenderingInputAttachmentIndexInfo.html), or [VkTileMemoryBindInfoQCOM](VkTileMemoryBindInfoQCOM.html)

* 
[](#VUID-VkCommandBufferInheritanceInfo-sType-unique) VUID-VkCommandBufferInheritanceInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkCommandBufferInheritanceInfo-commonparent) VUID-VkCommandBufferInheritanceInfo-commonparent

 Both of `framebuffer`, and `renderPass` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), `VkBool32`, [VkCommandBufferBeginInfo](VkCommandBufferBeginInfo.html), [VkFramebuffer](VkFramebuffer.html), [VkQueryControlFlags](VkQueryControlFlags.html), [VkQueryPipelineStatisticFlags](VkQueryPipelineStatisticFlags.html), [VkRenderPass](VkRenderPass.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferInheritanceInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
