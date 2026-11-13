# vkCmdSetCoverageReductionModeNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetCoverageReductionModeNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetCoverageReductionModeNV - Specify the coverage reduction mode dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the
`coverageReductionMode` state, call:

// Provided by VK_EXT_extended_dynamic_state3 with VK_NV_coverage_reduction_mode, VK_EXT_shader_object with VK_NV_coverage_reduction_mode
void vkCmdSetCoverageReductionModeNV(
    VkCommandBuffer                             commandBuffer,
    VkCoverageReductionModeNV                   coverageReductionMode);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`coverageReductionMode` specifies the `coverageReductionMode`
state.

This command sets the `coverageReductionMode` state for subsequent
drawing commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_COVERAGE_REDUCTION_MODE_NV](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineCoverageReductionStateCreateInfoNV](VkPipelineCoverageReductionStateCreateInfoNV.html)::`coverageReductionMode`
value used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetCoverageReductionModeNV-None-09423) VUID-vkCmdSetCoverageReductionModeNV-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3CoverageReductionMode`](#features-extendedDynamicState3CoverageReductionMode) feature is
enabled

* 
The [`shaderObject`](../../../../spec/latest/chapters/features.html#features-shaderObject) feature is enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetCoverageReductionModeNV-commandBuffer-parameter) VUID-vkCmdSetCoverageReductionModeNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetCoverageReductionModeNV-coverageReductionMode-parameter) VUID-vkCmdSetCoverageReductionModeNV-coverageReductionMode-parameter

 `coverageReductionMode` **must** be a valid [VkCoverageReductionModeNV](VkCoverageReductionModeNV.html) value

* 
[](#VUID-vkCmdSetCoverageReductionModeNV-commandBuffer-recording) VUID-vkCmdSetCoverageReductionModeNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetCoverageReductionModeNV-commandBuffer-cmdpool) VUID-vkCmdSetCoverageReductionModeNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetCoverageReductionModeNV-videocoding) VUID-vkCmdSetCoverageReductionModeNV-videocoding

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

vkCmdSetCoverageReductionModeNV is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html), [VK_EXT_shader_object](VK_EXT_shader_object.html), [VK_NV_coverage_reduction_mode](VK_NV_coverage_reduction_mode.html), [VkCommandBuffer](VkCommandBuffer.html), [VkCoverageReductionModeNV](VkCoverageReductionModeNV.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fragops.html#vkCmdSetCoverageReductionModeNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
