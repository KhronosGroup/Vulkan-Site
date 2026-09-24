# vkCmdSetCoverageModulationTableNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetCoverageModulationTableNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetCoverageModulationTableNV - Specify the coverage modulation table dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the
`pCoverageModulationTable` state, call:

// Provided by VK_EXT_extended_dynamic_state3 with VK_NV_framebuffer_mixed_samples, VK_EXT_shader_object with VK_NV_framebuffer_mixed_samples
void vkCmdSetCoverageModulationTableNV(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    coverageModulationTableCount,
    const float*                                pCoverageModulationTable);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`coverageModulationTableCount` specifies the number of elements in
`pCoverageModulationTable`.

* 
`pCoverageModulationTable` specifies the table of modulation factors
containing a value for each number of covered samples.

This command sets the table of modulation factors for subsequent drawing
commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_COVERAGE_MODULATION_TABLE_NV](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineCoverageModulationStateCreateInfoNV](VkPipelineCoverageModulationStateCreateInfoNV.html)::`coverageModulationTableCount`,
and
[VkPipelineCoverageModulationStateCreateInfoNV](VkPipelineCoverageModulationStateCreateInfoNV.html)::`pCoverageModulationTable`
values used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetCoverageModulationTableNV-None-09423) VUID-vkCmdSetCoverageModulationTableNV-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3CoverageModulationTable`](#features-extendedDynamicState3CoverageModulationTable) feature is
enabled

* 
The [`shaderObject`](../../../../spec/latest/chapters/features.html#features-shaderObject) feature is enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetCoverageModulationTableNV-commandBuffer-parameter) VUID-vkCmdSetCoverageModulationTableNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetCoverageModulationTableNV-pCoverageModulationTable-parameter) VUID-vkCmdSetCoverageModulationTableNV-pCoverageModulationTable-parameter

 `pCoverageModulationTable` **must** be a valid pointer to an array of `coverageModulationTableCount` `float` values

* 
[](#VUID-vkCmdSetCoverageModulationTableNV-commandBuffer-recording) VUID-vkCmdSetCoverageModulationTableNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetCoverageModulationTableNV-commandBuffer-cmdpool) VUID-vkCmdSetCoverageModulationTableNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetCoverageModulationTableNV-videocoding) VUID-vkCmdSetCoverageModulationTableNV-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdSetCoverageModulationTableNV-coverageModulationTableCount-arraylength) VUID-vkCmdSetCoverageModulationTableNV-coverageModulationTableCount-arraylength

 `coverageModulationTableCount` **must** be greater than `0`

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

vkCmdSetCoverageModulationTableNV is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html), [VK_EXT_shader_object](VK_EXT_shader_object.html), [VK_NV_framebuffer_mixed_samples](VK_NV_framebuffer_mixed_samples.html), [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fragops.html#vkCmdSetCoverageModulationTableNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
