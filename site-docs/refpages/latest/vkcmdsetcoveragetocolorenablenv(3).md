# vkCmdSetCoverageToColorEnableNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetCoverageToColorEnableNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetCoverageToColorEnableNV - Specify the coverage to color enable state dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the
`coverageToColorEnable` state, call:

// Provided by VK_EXT_extended_dynamic_state3 with VK_NV_fragment_coverage_to_color, VK_EXT_shader_object with VK_NV_fragment_coverage_to_color
void vkCmdSetCoverageToColorEnableNV(
    VkCommandBuffer                             commandBuffer,
    VkBool32                                    coverageToColorEnable);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`coverageToColorEnable` specifies the `coverageToColorEnable`
state.

This command sets the `coverageToColorEnable` state for subsequent
drawing commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_COVERAGE_TO_COLOR_ENABLE_NV](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineCoverageToColorStateCreateInfoNV](VkPipelineCoverageToColorStateCreateInfoNV.html)::`coverageToColorEnable`
value used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetCoverageToColorEnableNV-None-09423) VUID-vkCmdSetCoverageToColorEnableNV-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3CoverageToColorEnable`](#features-extendedDynamicState3CoverageToColorEnable) feature is
enabled

* 
The [`shaderObject`](../../../../spec/latest/chapters/features.html#features-shaderObject) feature is enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetCoverageToColorEnableNV-commandBuffer-parameter) VUID-vkCmdSetCoverageToColorEnableNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetCoverageToColorEnableNV-commandBuffer-recording) VUID-vkCmdSetCoverageToColorEnableNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetCoverageToColorEnableNV-commandBuffer-cmdpool) VUID-vkCmdSetCoverageToColorEnableNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetCoverageToColorEnableNV-videocoding) VUID-vkCmdSetCoverageToColorEnableNV-videocoding

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

vkCmdSetCoverageToColorEnableNV is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html), [VK_EXT_shader_object](VK_EXT_shader_object.html), [VK_NV_fragment_coverage_to_color](VK_NV_fragment_coverage_to_color.html), `VkBool32`, [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fragops.html#vkCmdSetCoverageToColorEnableNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
