# vkCmdSetDepthBias(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetDepthBias.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetDepthBias - Set depth bias factors and clamp dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the depth bias parameters,
call:

// Provided by VK_VERSION_1_0
void vkCmdSetDepthBias(
    VkCommandBuffer                             commandBuffer,
    float                                       depthBiasConstantFactor,
    float                                       depthBiasClamp,
    float                                       depthBiasSlopeFactor);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`depthBiasConstantFactor` is a scalar factor controlling the
constant depth value added to each fragment.

* 
`depthBiasClamp` is the maximum (or minimum) depth bias of a
fragment.

* 
`depthBiasSlopeFactor` is a scalar factor applied to a fragment’s
slope in depth bias calculations.

This command sets the depth bias parameters for subsequent drawing commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with [VK_DYNAMIC_STATE_DEPTH_BIAS](VkDynamicState.html)
set in [VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the corresponding
[VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html)::`depthBiasConstantFactor`,
`depthBiasClamp`, and `depthBiasSlopeFactor` values used to create
the currently active pipeline.

Calling this function is equivalent to calling `vkCmdSetDepthBias2EXT`
without a `VkDepthBiasRepresentationInfoEXT` in the pNext chain of
`VkDepthBiasInfoEXT`.

Valid Usage

* 
[](#VUID-vkCmdSetDepthBias-depthBiasClamp-00790) VUID-vkCmdSetDepthBias-depthBiasClamp-00790

If the [`depthBiasClamp`](../../../../spec/latest/chapters/features.html#features-depthBiasClamp) feature is not
enabled, `depthBiasClamp` **must** be `0.0`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetDepthBias-commandBuffer-parameter) VUID-vkCmdSetDepthBias-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetDepthBias-commandBuffer-recording) VUID-vkCmdSetDepthBias-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetDepthBias-commandBuffer-cmdpool) VUID-vkCmdSetDepthBias-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetDepthBias-videocoding) VUID-vkCmdSetDepthBias-videocoding

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

vkCmdSetDepthBias is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#vkCmdSetDepthBias).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
