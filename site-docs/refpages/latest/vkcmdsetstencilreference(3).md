# vkCmdSetStencilReference(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetStencilReference.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetStencilReference - Set stencil reference value dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the stencil reference value,
call:

// Provided by VK_VERSION_1_0
void vkCmdSetStencilReference(
    VkCommandBuffer                             commandBuffer,
    VkStencilFaceFlags                          faceMask,
    uint32_t                                    reference);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`faceMask` is a bitmask of [VkStencilFaceFlagBits](VkStencilFaceFlagBits.html) specifying
the set of stencil state for which to update the reference value, as
described above for [vkCmdSetStencilCompareMask](vkCmdSetStencilCompareMask.html).

* 
`reference` is the new value to use as the stencil reference value.

This command sets the stencil reference value for subsequent drawing
commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_STENCIL_REFERENCE](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html)::`reference` value used to
create the currently active pipeline, for both front and back faces.

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetStencilReference-commandBuffer-parameter) VUID-vkCmdSetStencilReference-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetStencilReference-faceMask-parameter) VUID-vkCmdSetStencilReference-faceMask-parameter

 `faceMask` **must** be a valid combination of [VkStencilFaceFlagBits](VkStencilFaceFlagBits.html) values

* 
[](#VUID-vkCmdSetStencilReference-faceMask-requiredbitmask) VUID-vkCmdSetStencilReference-faceMask-requiredbitmask

 `faceMask` **must** not be `0`

* 
[](#VUID-vkCmdSetStencilReference-commandBuffer-recording) VUID-vkCmdSetStencilReference-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetStencilReference-commandBuffer-cmdpool) VUID-vkCmdSetStencilReference-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetStencilReference-videocoding) VUID-vkCmdSetStencilReference-videocoding

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

vkCmdSetStencilReference is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandBuffer](VkCommandBuffer.html), [VkStencilFaceFlags](VkStencilFaceFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fragops.html#vkCmdSetStencilReference).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
