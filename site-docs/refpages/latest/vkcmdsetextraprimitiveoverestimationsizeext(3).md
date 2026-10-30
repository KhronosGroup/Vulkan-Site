# vkCmdSetExtraPrimitiveOverestimationSizeEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetExtraPrimitiveOverestimationSizeEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetExtraPrimitiveOverestimationSizeEXT - Specify the conservative rasterization extra primitive overestimation size dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the
`extraPrimitiveOverestimationSize`, call:

// Provided by VK_EXT_conservative_rasterization with VK_EXT_extended_dynamic_state3, VK_EXT_conservative_rasterization with VK_EXT_shader_object
void vkCmdSetExtraPrimitiveOverestimationSizeEXT(
    VkCommandBuffer                             commandBuffer,
    float                                       extraPrimitiveOverestimationSize);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`extraPrimitiveOverestimationSize` specifies the
`extraPrimitiveOverestimationSize`.

This command sets the `extraPrimitiveOverestimationSize` for subsequent
drawing commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_EXTRA_PRIMITIVE_OVERESTIMATION_SIZE_EXT](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineRasterizationConservativeStateCreateInfoEXT](VkPipelineRasterizationConservativeStateCreateInfoEXT.html)::`extraPrimitiveOverestimationSize`
value used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetExtraPrimitiveOverestimationSizeEXT-None-09423) VUID-vkCmdSetExtraPrimitiveOverestimationSizeEXT-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3ExtraPrimitiveOverestimationSize`](#features-extendedDynamicState3ExtraPrimitiveOverestimationSize) feature is
enabled

* 
The [`shaderObject`](../../../../spec/latest/chapters/features.html#features-shaderObject) feature is enabled

[](#VUID-vkCmdSetExtraPrimitiveOverestimationSizeEXT-extraPrimitiveOverestimationSize-07428) VUID-vkCmdSetExtraPrimitiveOverestimationSizeEXT-extraPrimitiveOverestimationSize-07428

`extraPrimitiveOverestimationSize` **must** be in the range of `0.0` to
`VkPhysicalDeviceConservativeRasterizationPropertiesEXT`::`maxExtraPrimitiveOverestimationSize`
inclusive

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetExtraPrimitiveOverestimationSizeEXT-commandBuffer-parameter) VUID-vkCmdSetExtraPrimitiveOverestimationSizeEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetExtraPrimitiveOverestimationSizeEXT-commandBuffer-recording) VUID-vkCmdSetExtraPrimitiveOverestimationSizeEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetExtraPrimitiveOverestimationSizeEXT-commandBuffer-cmdpool) VUID-vkCmdSetExtraPrimitiveOverestimationSizeEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetExtraPrimitiveOverestimationSizeEXT-videocoding) VUID-vkCmdSetExtraPrimitiveOverestimationSizeEXT-videocoding

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

vkCmdSetExtraPrimitiveOverestimationSizeEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_conservative_rasterization](VK_EXT_conservative_rasterization.html), [VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html), [VK_EXT_shader_object](VK_EXT_shader_object.html), [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/primsrast.html#vkCmdSetExtraPrimitiveOverestimationSizeEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
