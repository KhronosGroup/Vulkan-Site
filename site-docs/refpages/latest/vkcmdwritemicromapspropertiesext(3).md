# vkCmdWriteMicromapsPropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdWriteMicromapsPropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdWriteMicromapsPropertiesEXT - Write micromap result parameters to query results.

To query micromap size parameters call:

// Provided by VK_EXT_opacity_micromap
void vkCmdWriteMicromapsPropertiesEXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    micromapCount,
    const VkMicromapEXT*                        pMicromaps,
    VkQueryType                                 queryType,
    VkQueryPool                                 queryPool,
    uint32_t                                    firstQuery);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`micromapCount` is the count of micromaps for which to query the
property.

* 
`pMicromaps` is a pointer to an array of existing previously built
micromaps.

* 
`queryType` is a [VkQueryType](VkQueryType.html) value specifying the type of
queries managed by the pool.

* 
`queryPool` is the query pool that will manage the results of the
query.

* 
`firstQuery` is the first query index within the query pool that
will contain the `micromapCount` number of results.

Accesses to any of the micromaps listed in `pMicromaps` **must** be
[synchronized](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](VkPipelineStageFlagBits2.html)
[pipeline stage](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages) and an
[access type](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types) of
[VK_ACCESS_2_MICROMAP_READ_BIT_EXT](VkAccessFlagBits2.html).

* 
If `queryType` is
[VK_QUERY_TYPE_MICROMAP_SERIALIZATION_SIZE_EXT](VkQueryType.html), then the value
written out is the number of bytes required by a serialized micromap.

* 
If `queryType` is [VK_QUERY_TYPE_MICROMAP_COMPACTED_SIZE_EXT](VkQueryType.html),
then the value written out is the number of bytes required by a
compacted micromap.

Valid Usage

* 
[](#VUID-vkCmdWriteMicromapsPropertiesEXT-queryPool-07525) VUID-vkCmdWriteMicromapsPropertiesEXT-queryPool-07525

`queryPool` **must** have been created with a `queryType` matching
`queryType`

* 
[](#VUID-vkCmdWriteMicromapsPropertiesEXT-queryPool-07526) VUID-vkCmdWriteMicromapsPropertiesEXT-queryPool-07526

The queries identified by `queryPool` and `firstQuery` **must** be
*unavailable*

* 
[](#VUID-vkCmdWriteMicromapsPropertiesEXT-buffer-07527) VUID-vkCmdWriteMicromapsPropertiesEXT-buffer-07527

The `buffer` used to create each micromap in `pMicrmaps` **must**
be bound to device memory

* 
[](#VUID-vkCmdWriteMicromapsPropertiesEXT-query-07528) VUID-vkCmdWriteMicromapsPropertiesEXT-query-07528

The sum of `query` plus `micromapCount` **must** be less than or
equal to the number of queries in `queryPool`

* 
[](#VUID-vkCmdWriteMicromapsPropertiesEXT-pMicromaps-07501) VUID-vkCmdWriteMicromapsPropertiesEXT-pMicromaps-07501

All micromaps in `pMicromaps` **must** have been constructed prior to
the execution of this command

* 
[](#VUID-vkCmdWriteMicromapsPropertiesEXT-pMicromaps-07502) VUID-vkCmdWriteMicromapsPropertiesEXT-pMicromaps-07502

All micromaps in `pMicromaps` **must** have been constructed with
[VK_BUILD_MICROMAP_ALLOW_COMPACTION_BIT_EXT](VkBuildMicromapFlagBitsEXT.html) if `queryType` is
[VK_QUERY_TYPE_MICROMAP_COMPACTED_SIZE_EXT](VkQueryType.html)

* 
[](#VUID-vkCmdWriteMicromapsPropertiesEXT-queryType-07503) VUID-vkCmdWriteMicromapsPropertiesEXT-queryType-07503

`queryType` **must** be [VK_QUERY_TYPE_MICROMAP_COMPACTED_SIZE_EXT](VkQueryType.html)
or [VK_QUERY_TYPE_MICROMAP_SERIALIZATION_SIZE_EXT](VkQueryType.html)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdWriteMicromapsPropertiesEXT-commandBuffer-parameter) VUID-vkCmdWriteMicromapsPropertiesEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdWriteMicromapsPropertiesEXT-pMicromaps-parameter) VUID-vkCmdWriteMicromapsPropertiesEXT-pMicromaps-parameter

 `pMicromaps` **must** be a valid pointer to an array of `micromapCount` valid [VkMicromapEXT](VkMicromapEXT.html) handles

* 
[](#VUID-vkCmdWriteMicromapsPropertiesEXT-queryType-parameter) VUID-vkCmdWriteMicromapsPropertiesEXT-queryType-parameter

 `queryType` **must** be a valid [VkQueryType](VkQueryType.html) value

* 
[](#VUID-vkCmdWriteMicromapsPropertiesEXT-queryPool-parameter) VUID-vkCmdWriteMicromapsPropertiesEXT-queryPool-parameter

 `queryPool` **must** be a valid [VkQueryPool](VkQueryPool.html) handle

* 
[](#VUID-vkCmdWriteMicromapsPropertiesEXT-commandBuffer-recording) VUID-vkCmdWriteMicromapsPropertiesEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdWriteMicromapsPropertiesEXT-commandBuffer-cmdpool) VUID-vkCmdWriteMicromapsPropertiesEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdWriteMicromapsPropertiesEXT-renderpass) VUID-vkCmdWriteMicromapsPropertiesEXT-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdWriteMicromapsPropertiesEXT-suspended) VUID-vkCmdWriteMicromapsPropertiesEXT-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdWriteMicromapsPropertiesEXT-videocoding) VUID-vkCmdWriteMicromapsPropertiesEXT-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdWriteMicromapsPropertiesEXT-micromapCount-arraylength) VUID-vkCmdWriteMicromapsPropertiesEXT-micromapCount-arraylength

 `micromapCount` **must** be greater than `0`

* 
[](#VUID-vkCmdWriteMicromapsPropertiesEXT-commonparent) VUID-vkCmdWriteMicromapsPropertiesEXT-commonparent

 Each of `commandBuffer`, `queryPool`, and the elements of `pMicromaps` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT | Action |

Conditional Rendering

vkCmdWriteMicromapsPropertiesEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html), [VkCommandBuffer](VkCommandBuffer.html), [VkMicromapEXT](VkMicromapEXT.html), [VkQueryPool](VkQueryPool.html), [VkQueryType](VkQueryType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_EXT_opacity_micromap/micromaps.html#vkCmdWriteMicromapsPropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
