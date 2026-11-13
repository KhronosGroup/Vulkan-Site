# vkCmdSetPatchControlPointsEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetPatchControlPointsEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetPatchControlPointsEXT - Specify the number of control points per patch dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the number of control points
per patch, call:

// Provided by VK_EXT_extended_dynamic_state2, VK_EXT_shader_object
void vkCmdSetPatchControlPointsEXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    patchControlPoints);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`patchControlPoints` specifies the number of control points per
patch.

This command sets the number of control points per patch for subsequent
drawing commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_PATCH_CONTROL_POINTS_EXT](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineTessellationStateCreateInfo](VkPipelineTessellationStateCreateInfo.html)::`patchControlPoints` value
used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetPatchControlPointsEXT-None-09422) VUID-vkCmdSetPatchControlPointsEXT-None-09422

At least one of the following **must** be true:

The [`extendedDynamicState2PatchControlPoints`](#features-extendedDynamicState2PatchControlPoints) feature is
enabled

* 
The [`shaderObject`](../../../../spec/latest/chapters/features.html#features-shaderObject) feature is enabled

[](#VUID-vkCmdSetPatchControlPointsEXT-patchControlPoints-04874) VUID-vkCmdSetPatchControlPointsEXT-patchControlPoints-04874

`patchControlPoints` **must** be greater than zero and less than or
equal to `VkPhysicalDeviceLimits`::`maxTessellationPatchSize`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetPatchControlPointsEXT-commandBuffer-parameter) VUID-vkCmdSetPatchControlPointsEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetPatchControlPointsEXT-commandBuffer-recording) VUID-vkCmdSetPatchControlPointsEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetPatchControlPointsEXT-commandBuffer-cmdpool) VUID-vkCmdSetPatchControlPointsEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetPatchControlPointsEXT-videocoding) VUID-vkCmdSetPatchControlPointsEXT-videocoding

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

vkCmdSetPatchControlPointsEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_extended_dynamic_state2](VK_EXT_extended_dynamic_state2.html), [VK_EXT_shader_object](VK_EXT_shader_object.html), [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#vkCmdSetPatchControlPointsEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
