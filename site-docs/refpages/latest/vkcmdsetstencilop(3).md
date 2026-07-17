# vkCmdSetStencilOp(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetStencilOp.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetStencilOp - Set stencil operation dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the stencil operation, call:

// Provided by VK_VERSION_1_3
void vkCmdSetStencilOp(
    VkCommandBuffer                             commandBuffer,
    VkStencilFaceFlags                          faceMask,
    VkStencilOp                                 failOp,
    VkStencilOp                                 passOp,
    VkStencilOp                                 depthFailOp,
    VkCompareOp                                 compareOp);

// Provided by VK_EXT_extended_dynamic_state, VK_EXT_shader_object
// Equivalent to vkCmdSetStencilOp
void vkCmdSetStencilOpEXT(
    VkCommandBuffer                             commandBuffer,
    VkStencilFaceFlags                          faceMask,
    VkStencilOp                                 failOp,
    VkStencilOp                                 passOp,
    VkStencilOp                                 depthFailOp,
    VkCompareOp                                 compareOp);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`faceMask` is a bitmask of [VkStencilFaceFlagBits](VkStencilFaceFlagBits.html) specifying
the set of stencil state for which to update the stencil operation.

* 
`failOp` is a [VkStencilOp](VkStencilOp.html) value specifying the action
performed on samples that fail the stencil test.

* 
`passOp` is a [VkStencilOp](VkStencilOp.html) value specifying the action
performed on samples that pass both the depth and stencil tests.

* 
`depthFailOp` is a [VkStencilOp](VkStencilOp.html) value specifying the action
performed on samples that pass the stencil test and fail the depth test.

* 
`compareOp` is a [VkCompareOp](VkCompareOp.html) value specifying the comparison
operator used in the stencil test.

This command sets the stencil operation for subsequent drawing commands when
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with [VK_DYNAMIC_STATE_STENCIL_OP](VkDynamicState.html)
set in [VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the corresponding
`VkPipelineDepthStencilStateCreateInfo`::`failOp`, `passOp`,
`depthFailOp`, and `compareOp` values used to create the currently
active pipeline, for both front and back faces.

Valid Usage

* 
[](#VUID-vkCmdSetStencilOp-None-08971) VUID-vkCmdSetStencilOp-None-08971

At least one of the following **must** be true:

the [`extendedDynamicState`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState)
feature is enabled

* 
the [`shaderObject`](../../../../spec/latest/chapters/features.html#features-shaderObject) feature is enabled

* 
the value of [VkApplicationInfo](VkApplicationInfo.html)::`apiVersion` used to create
the [VkInstance](VkInstance.html) parent of `commandBuffer` is greater than or
equal to Version 1.3

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetStencilOp-commandBuffer-parameter) VUID-vkCmdSetStencilOp-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetStencilOp-faceMask-parameter) VUID-vkCmdSetStencilOp-faceMask-parameter

 `faceMask` **must** be a valid combination of [VkStencilFaceFlagBits](VkStencilFaceFlagBits.html) values

* 
[](#VUID-vkCmdSetStencilOp-faceMask-requiredbitmask) VUID-vkCmdSetStencilOp-faceMask-requiredbitmask

 `faceMask` **must** not be `0`

* 
[](#VUID-vkCmdSetStencilOp-failOp-parameter) VUID-vkCmdSetStencilOp-failOp-parameter

 `failOp` **must** be a valid [VkStencilOp](VkStencilOp.html) value

* 
[](#VUID-vkCmdSetStencilOp-passOp-parameter) VUID-vkCmdSetStencilOp-passOp-parameter

 `passOp` **must** be a valid [VkStencilOp](VkStencilOp.html) value

* 
[](#VUID-vkCmdSetStencilOp-depthFailOp-parameter) VUID-vkCmdSetStencilOp-depthFailOp-parameter

 `depthFailOp` **must** be a valid [VkStencilOp](VkStencilOp.html) value

* 
[](#VUID-vkCmdSetStencilOp-compareOp-parameter) VUID-vkCmdSetStencilOp-compareOp-parameter

 `compareOp` **must** be a valid [VkCompareOp](VkCompareOp.html) value

* 
[](#VUID-vkCmdSetStencilOp-commandBuffer-recording) VUID-vkCmdSetStencilOp-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetStencilOp-commandBuffer-cmdpool) VUID-vkCmdSetStencilOp-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetStencilOp-videocoding) VUID-vkCmdSetStencilOp-videocoding

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

vkCmdSetStencilOp is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_extended_dynamic_state](VK_EXT_extended_dynamic_state.html), [VK_EXT_shader_object](VK_EXT_shader_object.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkCommandBuffer](VkCommandBuffer.html), [VkCompareOp](VkCompareOp.html), [VkStencilFaceFlags](VkStencilFaceFlags.html), [VkStencilOp](VkStencilOp.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fragops.html#vkCmdSetStencilOp).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
