# vkCmdSetTessellationDomainOriginEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetTessellationDomainOriginEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetTessellationDomainOriginEXT - Specify the origin of the tessellation domain space dynamically for a command buffer

To [dynamically set](../../../../spec/latest/chapters/pipelines.html#pipelines-dynamic-state) the origin of the
tessellation domain space, call:

// Provided by VK_EXT_extended_dynamic_state3 with VK_KHR_maintenance2 or VK_VERSION_1_1, VK_EXT_shader_object
void vkCmdSetTessellationDomainOriginEXT(
    VkCommandBuffer                             commandBuffer,
    VkTessellationDomainOrigin                  domainOrigin);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`domainOrigin` specifies the origin of the tessellation domain
space.

This command sets the origin of the tessellation domain space for subsequent
drawing commands
when drawing using [shader objects](../../../../spec/latest/chapters/shaders.html#shaders-objects), or
when the graphics pipeline is created with
[VK_DYNAMIC_STATE_TESSELLATION_DOMAIN_ORIGIN_EXT](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
Otherwise, this state is specified by the
[VkPipelineTessellationDomainOriginStateCreateInfo](VkPipelineTessellationDomainOriginStateCreateInfo.html)::`domainOrigin`
value used to create the currently active pipeline.

Valid Usage

* 
[](#VUID-vkCmdSetTessellationDomainOriginEXT-None-09423) VUID-vkCmdSetTessellationDomainOriginEXT-None-09423

At least one of the following **must** be true:

The [`extendedDynamicState3TessellationDomainOrigin`](#features-extendedDynamicState3TessellationDomainOrigin) feature is
enabled

* 
The [`shaderObject`](../../../../spec/latest/chapters/features.html#features-shaderObject) feature is enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetTessellationDomainOriginEXT-commandBuffer-parameter) VUID-vkCmdSetTessellationDomainOriginEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetTessellationDomainOriginEXT-domainOrigin-parameter) VUID-vkCmdSetTessellationDomainOriginEXT-domainOrigin-parameter

 `domainOrigin` **must** be a valid [VkTessellationDomainOrigin](VkTessellationDomainOrigin.html) value

* 
[](#VUID-vkCmdSetTessellationDomainOriginEXT-commandBuffer-recording) VUID-vkCmdSetTessellationDomainOriginEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetTessellationDomainOriginEXT-commandBuffer-cmdpool) VUID-vkCmdSetTessellationDomainOriginEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetTessellationDomainOriginEXT-videocoding) VUID-vkCmdSetTessellationDomainOriginEXT-videocoding

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

vkCmdSetTessellationDomainOriginEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_extended_dynamic_state3](VK_EXT_extended_dynamic_state3.html), [VK_EXT_shader_object](VK_EXT_shader_object.html), [VK_KHR_maintenance2](VK_KHR_maintenance2.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkCommandBuffer](VkCommandBuffer.html), [VkTessellationDomainOrigin](VkTessellationDomainOrigin.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/tessellation.html#vkCmdSetTessellationDomainOriginEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
