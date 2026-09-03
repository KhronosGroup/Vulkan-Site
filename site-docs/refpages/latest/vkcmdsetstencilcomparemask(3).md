# vkCmdSetStencilCompareMask(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetStencilCompareMask.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetStencilCompareMask - Set stencil compare mask dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the stencil compare mask,
call:

// Provided by VK_VERSION_1_0
void vkCmdSetStencilCompareMask(
    VkCommandBuffer                             commandBuffer,
    VkStencilFaceFlags                          faceMask,
    uint32_t                                    compareMask);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`faceMask` is a bitmask of [VkStencilFaceFlagBits](VkStencilFaceFlagBits.html) specifying
the set of stencil state for which to update the compare mask.

* 
`compareMask` is the new value to use as the stencil compare mask.

This command sets the stencil compare mask for subsequent drawing commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_STENCIL_COMPARE_MASK](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkStencilOpState](VkStencilOpState.html)::`compareMask` value used to create the currently
active pipeline, for both front and back faces.

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetStencilCompareMask-commandBuffer-parameter) VUID-vkCmdSetStencilCompareMask-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetStencilCompareMask-faceMask-parameter) VUID-vkCmdSetStencilCompareMask-faceMask-parameter

 `faceMask` **must** be a valid combination of [VkStencilFaceFlagBits](VkStencilFaceFlagBits.html) values

* 
[](#VUID-vkCmdSetStencilCompareMask-faceMask-requiredbitmask) VUID-vkCmdSetStencilCompareMask-faceMask-requiredbitmask

 `faceMask` **must** not be `0`

* 
[](#VUID-vkCmdSetStencilCompareMask-commandBuffer-recording) VUID-vkCmdSetStencilCompareMask-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetStencilCompareMask-commandBuffer-cmdpool) VUID-vkCmdSetStencilCompareMask-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetStencilCompareMask-videocoding) VUID-vkCmdSetStencilCompareMask-videocoding

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

vkCmdSetStencilCompareMask is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandBuffer](VkCommandBuffer.html), [VkStencilFaceFlags](VkStencilFaceFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fragops.html#vkCmdSetStencilCompareMask).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
