# vkCmdSetCoarseSampleOrderNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetCoarseSampleOrderNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetCoarseSampleOrderNV - Set order of coverage samples for coarse fragments dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the order of coverage
samples in fragments larger than one pixel, call:

// Provided by VK_NV_shading_rate_image
void vkCmdSetCoarseSampleOrderNV(
    VkCommandBuffer                             commandBuffer,
    VkCoarseSampleOrderTypeNV                   sampleOrderType,
    uint32_t                                    customSampleOrderCount,
    const VkCoarseSampleOrderCustomNV*          pCustomSampleOrders);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`sampleOrderType` specifies the mechanism used to order coverage
samples in fragments larger than one pixel.

* 
`customSampleOrderCount` specifies the number of custom sample
orderings to use when ordering coverage samples.

* 
`pCustomSampleOrders` is a pointer to an array of
[VkCoarseSampleOrderCustomNV](VkCoarseSampleOrderCustomNV.html) structures, each structure specifying
the coverage sample order for a single combination of fragment area and
coverage sample count.

If `sampleOrderType` is [VK_COARSE_SAMPLE_ORDER_TYPE_CUSTOM_NV](VkCoarseSampleOrderTypeNV.html), the
coverage sample order used for any combination of fragment area and coverage
sample count not enumerated in `pCustomSampleOrders` will be identical
to that used for [VK_COARSE_SAMPLE_ORDER_TYPE_DEFAULT_NV](VkCoarseSampleOrderTypeNV.html).

This command sets the order of coverage samples for subsequent drawing
commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_VIEWPORT_COARSE_SAMPLE_ORDER_NV](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineViewportCoarseSampleOrderStateCreateInfoNV](VkPipelineViewportCoarseSampleOrderStateCreateInfoNV.html) values used to
create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetCoarseSampleOrderNV-sampleOrderType-02081) VUID-vkCmdSetCoarseSampleOrderNV-sampleOrderType-02081

If `sampleOrderType` is not
[VK_COARSE_SAMPLE_ORDER_TYPE_CUSTOM_NV](VkCoarseSampleOrderTypeNV.html),
`customSamplerOrderCount` **must** be `0`

* 
[](#VUID-vkCmdSetCoarseSampleOrderNV-pCustomSampleOrders-02235) VUID-vkCmdSetCoarseSampleOrderNV-pCustomSampleOrders-02235

The array `pCustomSampleOrders` **must** not contain two structures
with matching values for both the `shadingRate` and
`sampleCount` members

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetCoarseSampleOrderNV-commandBuffer-parameter) VUID-vkCmdSetCoarseSampleOrderNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetCoarseSampleOrderNV-sampleOrderType-parameter) VUID-vkCmdSetCoarseSampleOrderNV-sampleOrderType-parameter

 `sampleOrderType` **must** be a valid [VkCoarseSampleOrderTypeNV](VkCoarseSampleOrderTypeNV.html) value

* 
[](#VUID-vkCmdSetCoarseSampleOrderNV-pCustomSampleOrders-parameter) VUID-vkCmdSetCoarseSampleOrderNV-pCustomSampleOrders-parameter

 If `customSampleOrderCount` is not `0`, `pCustomSampleOrders` **must** be a valid pointer to an array of `customSampleOrderCount` valid [VkCoarseSampleOrderCustomNV](VkCoarseSampleOrderCustomNV.html) structures

* 
[](#VUID-vkCmdSetCoarseSampleOrderNV-commandBuffer-recording) VUID-vkCmdSetCoarseSampleOrderNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetCoarseSampleOrderNV-commandBuffer-cmdpool) VUID-vkCmdSetCoarseSampleOrderNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetCoarseSampleOrderNV-videocoding) VUID-vkCmdSetCoarseSampleOrderNV-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetCoarseSampleOrderNV is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_NV_shading_rate_image](VK_NV_shading_rate_image.html), [VkCoarseSampleOrderCustomNV](VkCoarseSampleOrderCustomNV.html), [VkCoarseSampleOrderTypeNV](VkCoarseSampleOrderTypeNV.html), [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#vkCmdSetCoarseSampleOrderNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
