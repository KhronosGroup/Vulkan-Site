# vkCmdSetSampleMaskEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetSampleMaskEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetSampleMaskEXT - Specify the sample mask dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the sample mask, call:

// Provided by VK_EXT_extended_dynamic_state3, VK_EXT_shader_object
void vkCmdSetSampleMaskEXT(
    VkCommandBuffer                             commandBuffer,
    VkSampleCountFlagBits                       samples,
    const VkSampleMask*                         pSampleMask);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`samples` specifies the number of sample bits in the
`pSampleMask`.

* 
`pSampleMask` is a pointer to an array of `VkSampleMask`
values, where the array size is based on the `samples` parameter.
If the [`maintenance10`](../../../../spec/latest/chapters/features.html#features-maintenance10) feature is
enabled, and this parameter is set to `NULL`, it is treated as if the
mask has all bits set to `1`.

This command sets the sample mask for subsequent drawing commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_SAMPLE_MASK_EXT](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineMultisampleStateCreateInfo](VkPipelineMultisampleStateCreateInfo.html)::`pSampleMask` value used to
create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetSampleMaskEXT-None-09423) VUID-vkCmdSetSampleMaskEXT-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3SampleMask`](#features-extendedDynamicState3SampleMask) feature is
enabled

* 
The [`shaderObject`](../../../../spec/latest/chapters/features.html#features-shaderObject) feature is enabled

[](#VUID-vkCmdSetSampleMaskEXT-pSampleMask-10999) VUID-vkCmdSetSampleMaskEXT-pSampleMask-10999

`pSampleMask` **must** not be `NULL`
if the [`maintenance10`](../../../../spec/latest/chapters/features.html#features-maintenance10) feature is not
enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetSampleMaskEXT-commandBuffer-parameter) VUID-vkCmdSetSampleMaskEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetSampleMaskEXT-samples-parameter) VUID-vkCmdSetSampleMaskEXT-samples-parameter

 `samples` **must** be a valid [VkSampleCountFlagBits](VkSampleCountFlagBits.html) value

* 
[](#VUID-vkCmdSetSampleMaskEXT-pSampleMask-parameter) VUID-vkCmdSetSampleMaskEXT-pSampleMask-parameter

 If `pSampleMask` is not `NULL`, `pSampleMask` **must** be a valid pointer to an array of    `VkSampleMask` values

* 
[](#VUID-vkCmdSetSampleMaskEXT-commandBuffer-recording) VUID-vkCmdSetSampleMaskEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetSampleMaskEXT-commandBuffer-cmdpool) VUID-vkCmdSetSampleMaskEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetSampleMaskEXT-videocoding) VUID-vkCmdSetSampleMaskEXT-videocoding

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

vkCmdSetSampleMaskEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html), [VK_EXT_shader_object](VK_EXT_shader_object.html), [VkCommandBuffer](VkCommandBuffer.html), [VkSampleCountFlagBits](VkSampleCountFlagBits.html), `VkSampleMask`

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fragops.html#vkCmdSetSampleMaskEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
