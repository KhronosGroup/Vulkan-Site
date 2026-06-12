# vkCmdSetRepresentativeFragmentTestEnableNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetRepresentativeFragmentTestEnableNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetRepresentativeFragmentTestEnableNV - Specify the representative fragment test enable dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the
`representativeFragmentTestEnable` state, call:

// Provided by VK_EXT_extended_dynamic_state3 with VK_NV_representative_fragment_test, VK_EXT_shader_object with VK_NV_representative_fragment_test
void vkCmdSetRepresentativeFragmentTestEnableNV(
    VkCommandBuffer                             commandBuffer,
    VkBool32                                    representativeFragmentTestEnable);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`representativeFragmentTestEnable` specifies the
`representativeFragmentTestEnable` state.

This command sets the `representativeFragmentTestEnable` state for
subsequent drawing commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_REPRESENTATIVE_FRAGMENT_TEST_ENABLE_NV](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineRepresentativeFragmentTestStateCreateInfoNV](VkPipelineRepresentativeFragmentTestStateCreateInfoNV.html)::`representativeFragmentTestEnable`
value used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetRepresentativeFragmentTestEnableNV-None-09423) VUID-vkCmdSetRepresentativeFragmentTestEnableNV-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3RepresentativeFragmentTestEnable`](#features-extendedDynamicState3RepresentativeFragmentTestEnable) feature is
enabled

* 
The [`shaderObject`](../../../../spec/latest/chapters/features.html#features-shaderObject) feature is enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetRepresentativeFragmentTestEnableNV-commandBuffer-parameter) VUID-vkCmdSetRepresentativeFragmentTestEnableNV-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetRepresentativeFragmentTestEnableNV-commandBuffer-recording) VUID-vkCmdSetRepresentativeFragmentTestEnableNV-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetRepresentativeFragmentTestEnableNV-commandBuffer-cmdpool) VUID-vkCmdSetRepresentativeFragmentTestEnableNV-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetRepresentativeFragmentTestEnableNV-videocoding) VUID-vkCmdSetRepresentativeFragmentTestEnableNV-videocoding

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

vkCmdSetRepresentativeFragmentTestEnableNV is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html), [VK_EXT_shader_object](VK_EXT_shader_object.html), [VK_NV_representative_fragment_test](VK_NV_representative_fragment_test.html), `VkBool32`, [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fragops.html#vkCmdSetRepresentativeFragmentTestEnableNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
