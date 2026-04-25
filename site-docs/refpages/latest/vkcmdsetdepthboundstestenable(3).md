# vkCmdSetDepthBoundsTestEnable(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetDepthBoundsTestEnable.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetDepthBoundsTestEnable - Set depth bounds test enable dynamically for a command buffer

To [dynamically enable or disable](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the depth
bounds test, call:

// Provided by VK_VERSION_1_3
void vkCmdSetDepthBoundsTestEnable(
    VkCommandBuffer                             commandBuffer,
    VkBool32                                    depthBoundsTestEnable);

// Provided by VK_EXT_extended_dynamic_state, VK_EXT_shader_object
// Equivalent to vkCmdSetDepthBoundsTestEnable
void vkCmdSetDepthBoundsTestEnableEXT(
    VkCommandBuffer                             commandBuffer,
    VkBool32                                    depthBoundsTestEnable);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`depthBoundsTestEnable` specifies if the depth bounds test is
enabled.

This command sets the depth bounds enable for subsequent drawing commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_DEPTH_BOUNDS_TEST_ENABLE](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html)::`depthBoundsTestEnable`
value used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetDepthBoundsTestEnable-None-08971) VUID-vkCmdSetDepthBoundsTestEnable-None-08971

At least one of the following **must** be true:

the [`extendedDynamicState`](../../../../spec/latest/chapters/features.html#features-extendedDynamicState)
feature is enabled

* 
the [`shaderObject`](../../../../spec/latest/chapters/features.html#features-shaderObject) feature is enabled

* 
the value of [VkApplicationInfo](VkApplicationInfo.html)::`apiVersion` used to create
the [VkInstance](VkInstance.html) parent of `commandBuffer` is greater than or
equal to Version 1.3

[](#VUID-vkCmdSetDepthBoundsTestEnable-depthBounds-10010) VUID-vkCmdSetDepthBoundsTestEnable-depthBounds-10010

If the [`depthBounds`](../../../../spec/latest/chapters/features.html#features-depthBounds) feature is not
enabled, `depthBoundsTestEnable` **must** be [VK_FALSE](VK_FALSE.html)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetDepthBoundsTestEnable-commandBuffer-parameter) VUID-vkCmdSetDepthBoundsTestEnable-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetDepthBoundsTestEnable-commandBuffer-recording) VUID-vkCmdSetDepthBoundsTestEnable-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetDepthBoundsTestEnable-commandBuffer-cmdpool) VUID-vkCmdSetDepthBoundsTestEnable-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetDepthBoundsTestEnable-videocoding) VUID-vkCmdSetDepthBoundsTestEnable-videocoding

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

vkCmdSetDepthBoundsTestEnable is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_extended_dynamic_state](VK_EXT_extended_dynamic_state.html), [VK_EXT_shader_object](VK_EXT_shader_object.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), `VkBool32`, [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fragops.html#vkCmdSetDepthBoundsTestEnable).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
