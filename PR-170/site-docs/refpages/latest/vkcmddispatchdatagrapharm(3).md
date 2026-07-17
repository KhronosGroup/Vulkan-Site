# vkCmdDispatchDataGraphARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdDispatchDataGraphARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdDispatchDataGraphARM - Dispatch a data graph pipeline within a session

To record a data graph pipeline dispatch, call:

// Provided by VK_ARM_data_graph
void vkCmdDispatchDataGraphARM(
    VkCommandBuffer                             commandBuffer,
    VkDataGraphPipelineSessionARM               session,
    const VkDataGraphPipelineDispatchInfoARM*   pInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`session` is the [VkDataGraphPipelineSessionARM](VkDataGraphPipelineSessionARM.html) that data graph
pipeline being dispatched will use.

* 
`pInfo` is `NULL` or a pointer to a
[VkDataGraphPipelineDispatchInfoARM](VkDataGraphPipelineDispatchInfoARM.html) structure.

Valid Usage

* 
[](#VUID-vkCmdDispatchDataGraphARM-session-09796) VUID-vkCmdDispatchDataGraphARM-session-09796

For each of the session bind point requirements returned by
[vkGetDataGraphPipelineSessionBindPointRequirementsARM](vkGetDataGraphPipelineSessionBindPointRequirementsARM.html) for
`session`,
[VkDataGraphPipelineSessionBindPointRequirementARM](VkDataGraphPipelineSessionBindPointRequirementARM.html)::`numObjects`
objects **must** have been bound to `session`

* 
[](#VUID-vkCmdDispatchDataGraphARM-dataGraphPipeline-09951) VUID-vkCmdDispatchDataGraphARM-dataGraphPipeline-09951

The [VkPipeline](VkPipeline.html) bound to the pipeline bind point used by this
command **must** be identical to the `dataGraphPipeline` used to create
`session`

* 
[](#VUID-vkCmdDispatchDataGraphARM-None-09797) VUID-vkCmdDispatchDataGraphARM-None-09797

For each set *n* that is statically used by a bound data graph pipeline,
a descriptor set **must** have been bound to *n* at the same pipeline bind
point, with a [VkPipelineLayout](VkPipelineLayout.html) that is compatible for set *n*,
with the [VkPipelineLayout](VkPipelineLayout.html) used to create the current
[VkPipeline](VkPipeline.html), as described in [Pipeline Layout Compatibility](../../../../spec/latest/chapters/descriptorsets.html#descriptors-compatibility)

* 
[](#VUID-vkCmdDispatchDataGraphARM-None-09935) VUID-vkCmdDispatchDataGraphARM-None-09935

Descriptors in each bound descriptor set, specified via
[vkCmdBindDescriptorSets](vkCmdBindDescriptorSets.html), **must** be valid as described by
[descriptor validity](../../../../spec/latest/chapters/descriptorsets.html#descriptor-validity) if they are statically used
by
the [VkPipeline](VkPipeline.html) bound to the pipeline bind point used by this
command and the bound [VkPipeline](VkPipeline.html) was not created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](VkPipelineCreateFlagBits.html)

* 
[](#VUID-vkCmdDispatchDataGraphARM-None-09936) VUID-vkCmdDispatchDataGraphARM-None-09936

If the descriptors used by the [VkPipeline](VkPipeline.html) bound to the pipeline
bind point were specified via [vkCmdBindDescriptorSets](vkCmdBindDescriptorSets.html), the bound
[VkPipeline](VkPipeline.html) **must** have been created without
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](VkPipelineCreateFlagBits.html)

* 
[](#VUID-vkCmdDispatchDataGraphARM-None-09937) VUID-vkCmdDispatchDataGraphARM-None-09937

Descriptors in bound descriptor buffers, specified via
[vkCmdSetDescriptorBufferOffsetsEXT](vkCmdSetDescriptorBufferOffsetsEXT.html), **must** be valid if they are
dynamically used by the [VkPipeline](VkPipeline.html) bound to the pipeline bind
point used by this command and the bound [VkPipeline](VkPipeline.html) was created
with [VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](VkPipelineCreateFlagBits.html)

* 
[](#VUID-vkCmdDispatchDataGraphARM-None-09938) VUID-vkCmdDispatchDataGraphARM-None-09938

If the descriptors used by the [VkPipeline](VkPipeline.html) bound to the pipeline
bind point were specified via [vkCmdSetDescriptorBufferOffsetsEXT](vkCmdSetDescriptorBufferOffsetsEXT.html),
the bound [VkPipeline](VkPipeline.html) **must** have been created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](VkPipelineCreateFlagBits.html)

* 
[](#VUID-vkCmdDispatchDataGraphARM-None-09939) VUID-vkCmdDispatchDataGraphARM-None-09939

If a descriptor is dynamically used with a [VkPipeline](VkPipeline.html) created with
[VK_PIPELINE_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](VkPipelineCreateFlagBits.html), the descriptor
memory **must** be resident

* 
[](#VUID-vkCmdDispatchDataGraphARM-None-09799) VUID-vkCmdDispatchDataGraphARM-None-09799

A valid data graph pipeline **must** be bound to the
[VK_PIPELINE_BIND_POINT_DATA_GRAPH_ARM](VkPipelineBindPoint.html) pipeline bind point used by
this command

* 
[](#VUID-vkCmdDispatchDataGraphARM-pDescription-09930) VUID-vkCmdDispatchDataGraphARM-pDescription-09930

If a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](VkDescriptorType.html) descriptor is accessed as a
result of this command, then the underlying [VkTensorARM](VkTensorARM.html) object
**must** have been created with a
[VkTensorCreateInfoARM](VkTensorCreateInfoARM.html)::`pDescription` whose `usage` member
contained [VK_TENSOR_USAGE_DATA_GRAPH_BIT_ARM](VkTensorUsageFlagBitsARM.html)

* 
[](#VUID-vkCmdDispatchDataGraphARM-pipeline-09940) VUID-vkCmdDispatchDataGraphARM-pipeline-09940

If the [VkPipeline](VkPipeline.html) bound to the pipeline bind point used by this
command was created with a
[VkDataGraphProcessingEngineCreateInfoARM](VkDataGraphProcessingEngineCreateInfoARM.html) structure in the
`pNext` chain of [VkDataGraphPipelineCreateInfoARM](VkDataGraphPipelineCreateInfoARM.html) that
included a foreign data graph processing engine in its
`pProcessingEngines` member, then all
[VK_DESCRIPTOR_TYPE_TENSOR_ARM](VkDescriptorType.html) descriptors accessed as a result of
this command **must** be [VkTensorARM](VkTensorARM.html) objects that have been bound to
memory allocated with
[VkExportMemoryAllocateInfo](VkExportMemoryAllocateInfo.html)::`handleTypes` with set bits that
are a subset of the bits in
[VkQueueFamilyDataGraphProcessingEnginePropertiesARM](VkQueueFamilyDataGraphProcessingEnginePropertiesARM.html)::`foreignMemoryHandleTypes`
structure queried via
[vkGetPhysicalDeviceQueueFamilyDataGraphProcessingEnginePropertiesARM](vkGetPhysicalDeviceQueueFamilyDataGraphProcessingEnginePropertiesARM.html)
with a `queueFamilyIndex` matching the one the command pool used to
create `commandBuffer` was created for and an identical
`engineType`, for all the foreign data graph processing engines that
were part of the [VkDataGraphProcessingEngineCreateInfoARM](VkDataGraphProcessingEngineCreateInfoARM.html) used to
create the [VkPipeline](VkPipeline.html)

* 
[](#VUID-vkCmdDispatchDataGraphARM-pNext-09952) VUID-vkCmdDispatchDataGraphARM-pNext-09952

If the [VkPipeline](VkPipeline.html) bound to the pipeline bind point used by this
command was created with a
[VkDataGraphProcessingEngineCreateInfoARM](VkDataGraphProcessingEngineCreateInfoARM.html) structure in the
`pNext` chain of [VkDataGraphPipelineCreateInfoARM](VkDataGraphPipelineCreateInfoARM.html) that
included a foreign data graph processing engine in its
`pProcessingEngines` member, then all `session` bound memory
**must** have been allocated with
[VkExportMemoryAllocateInfo](VkExportMemoryAllocateInfo.html)::`handleTypes` with set bits that
are a subset of the bits in
[VkQueueFamilyDataGraphProcessingEnginePropertiesARM](VkQueueFamilyDataGraphProcessingEnginePropertiesARM.html)::`foreignMemoryHandleTypes`
structure queried via
[vkGetPhysicalDeviceQueueFamilyDataGraphProcessingEnginePropertiesARM](vkGetPhysicalDeviceQueueFamilyDataGraphProcessingEnginePropertiesARM.html)
with a `queueFamilyIndex` matching the one the command pool used to
create `commandBuffer` was created for and an identical
`engineType`, for all the foreign data graph processing engines that
were part of the [VkDataGraphProcessingEngineCreateInfoARM](VkDataGraphProcessingEngineCreateInfoARM.html) used to
create the [VkPipeline](VkPipeline.html)

* 
[](#VUID-vkCmdDispatchDataGraphARM-commandBuffer-09800) VUID-vkCmdDispatchDataGraphARM-commandBuffer-09800

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
any resource accessed by bound data graph pipelines **must** not be a
protected resource

* 
[](#VUID-vkCmdDispatchDataGraphARM-commandBuffer-09801) VUID-vkCmdDispatchDataGraphARM-commandBuffer-09801

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
any resource written to by the `VkPipeline` object bound to the bind
point used by this command **must** not be an unprotected resource

* 
[](#VUID-vkCmdDispatchDataGraphARM-commandBuffer-09941) VUID-vkCmdDispatchDataGraphARM-commandBuffer-09941

All the operations used by the bound data graph pipeline **must** be
supported on the queue family for which the command pool out of which
`commandBuffer` was allocated, as reported by
[vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM](vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM.html)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdDispatchDataGraphARM-commandBuffer-parameter) VUID-vkCmdDispatchDataGraphARM-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdDispatchDataGraphARM-session-parameter) VUID-vkCmdDispatchDataGraphARM-session-parameter

 `session` **must** be a valid [VkDataGraphPipelineSessionARM](VkDataGraphPipelineSessionARM.html) handle

* 
[](#VUID-vkCmdDispatchDataGraphARM-pInfo-parameter) VUID-vkCmdDispatchDataGraphARM-pInfo-parameter

 If `pInfo` is not `NULL`, `pInfo` **must** be a valid pointer to a valid [VkDataGraphPipelineDispatchInfoARM](VkDataGraphPipelineDispatchInfoARM.html) structure

* 
[](#VUID-vkCmdDispatchDataGraphARM-commandBuffer-recording) VUID-vkCmdDispatchDataGraphARM-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdDispatchDataGraphARM-commandBuffer-cmdpool) VUID-vkCmdDispatchDataGraphARM-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_DATA_GRAPH_BIT_ARM](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdDispatchDataGraphARM-renderpass) VUID-vkCmdDispatchDataGraphARM-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdDispatchDataGraphARM-suspended) VUID-vkCmdDispatchDataGraphARM-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdDispatchDataGraphARM-videocoding) VUID-vkCmdDispatchDataGraphARM-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdDispatchDataGraphARM-commonparent) VUID-vkCmdDispatchDataGraphARM-commonparent

 Both of `commandBuffer`, and `session` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_DATA_GRAPH_BIT_ARM | Action |

Conditional Rendering

vkCmdDispatchDataGraphARM is affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_ARM_data_graph](VK_ARM_data_graph.html), [VkCommandBuffer](VkCommandBuffer.html), [VkDataGraphPipelineDispatchInfoARM](VkDataGraphPipelineDispatchInfoARM.html), [VkDataGraphPipelineSessionARM](VkDataGraphPipelineSessionARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#vkCmdDispatchDataGraphARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
