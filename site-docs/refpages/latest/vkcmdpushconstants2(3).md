# vkCmdPushConstants2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdPushConstants2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdPushConstants2 - Update the values of push constants

To update push constants, call:

// Provided by VK_VERSION_1_4
void vkCmdPushConstants2(
    VkCommandBuffer                             commandBuffer,
    const VkPushConstantsInfo*                  pPushConstantsInfo);

// Provided by VK_KHR_maintenance6
// Equivalent to vkCmdPushConstants2
void vkCmdPushConstants2KHR(
    VkCommandBuffer                             commandBuffer,
    const VkPushConstantsInfo*                  pPushConstantsInfo);

* 
`commandBuffer` is the command buffer in which the push constant
update will be recorded.

* 
`pPushConstantsInfo` is a pointer to a [VkPushConstantsInfo](VkPushConstantsInfo.html)
structure.

Valid Usage

* 
[](#VUID-vkCmdPushConstants2-commandBuffer-11295) VUID-vkCmdPushConstants2-commandBuffer-11295

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](VkCommandBufferInheritanceDescriptorHeapInfoEXT.html)::`pSamplerHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdPushConstants2-commandBuffer-11296) VUID-vkCmdPushConstants2-commandBuffer-11296

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](VkCommandBufferInheritanceDescriptorHeapInfoEXT.html)::`pResourceHeapBindInfo`
equal to `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdPushConstants2-commandBuffer-parameter) VUID-vkCmdPushConstants2-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdPushConstants2-pPushConstantsInfo-parameter) VUID-vkCmdPushConstants2-pPushConstantsInfo-parameter

 `pPushConstantsInfo` **must** be a valid pointer to a valid [VkPushConstantsInfo](VkPushConstantsInfo.html) structure

* 
[](#VUID-vkCmdPushConstants2-commandBuffer-recording) VUID-vkCmdPushConstants2-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdPushConstants2-commandBuffer-cmdpool) VUID-vkCmdPushConstants2-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdPushConstants2-videocoding) VUID-vkCmdPushConstants2-videocoding

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

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdPushConstants2 is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_maintenance6](VK_KHR_maintenance6.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkCommandBuffer](VkCommandBuffer.html), [VkPushConstantsInfo](VkPushConstantsInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#vkCmdPushConstants2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
