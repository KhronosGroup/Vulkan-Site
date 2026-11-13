# vkCmdBindDescriptorSets2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdBindDescriptorSets2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdBindDescriptorSets2 - Binds descriptor sets to a command buffer

To bind one or more descriptor sets to a command buffer, call:

// Provided by VK_VERSION_1_4
void vkCmdBindDescriptorSets2(
    VkCommandBuffer                             commandBuffer,
    const VkBindDescriptorSetsInfo*             pBindDescriptorSetsInfo);

// Provided by VK_KHR_maintenance6
// Equivalent to vkCmdBindDescriptorSets2
void vkCmdBindDescriptorSets2KHR(
    VkCommandBuffer                             commandBuffer,
    const VkBindDescriptorSetsInfo*             pBindDescriptorSetsInfo);

* 
`commandBuffer` is the command buffer that the descriptor sets will
be bound to.

* 
`pBindDescriptorSetsInfo` is a pointer to a
`VkBindDescriptorSetsInfo` structure.

Valid Usage

* 
[](#VUID-vkCmdBindDescriptorSets2-commandBuffer-11295) VUID-vkCmdBindDescriptorSets2-commandBuffer-11295

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](VkCommandBufferInheritanceDescriptorHeapInfoEXT.html)::`pSamplerHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdBindDescriptorSets2-commandBuffer-11296) VUID-vkCmdBindDescriptorSets2-commandBuffer-11296

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](VkCommandBufferInheritanceDescriptorHeapInfoEXT.html)::`pResourceHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdBindDescriptorSets2-pBindDescriptorSetsInfo-09467) VUID-vkCmdBindDescriptorSets2-pBindDescriptorSetsInfo-09467

Each bit in `pBindDescriptorSetsInfo->stageFlags` **must** be a stage
supported by the `commandBuffer`’s parent `VkCommandPool`’s
queue family

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBindDescriptorSets2-commandBuffer-parameter) VUID-vkCmdBindDescriptorSets2-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdBindDescriptorSets2-pBindDescriptorSetsInfo-parameter) VUID-vkCmdBindDescriptorSets2-pBindDescriptorSetsInfo-parameter

 `pBindDescriptorSetsInfo` **must** be a valid pointer to a valid [VkBindDescriptorSetsInfo](VkBindDescriptorSetsInfo.html) structure

* 
[](#VUID-vkCmdBindDescriptorSets2-commandBuffer-recording) VUID-vkCmdBindDescriptorSets2-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBindDescriptorSets2-commandBuffer-cmdpool) VUID-vkCmdBindDescriptorSets2-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdBindDescriptorSets2-videocoding) VUID-vkCmdBindDescriptorSets2-videocoding

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

vkCmdBindDescriptorSets2 is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_maintenance6](VK_KHR_maintenance6.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkBindDescriptorSetsInfo](VkBindDescriptorSetsInfo.html), [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#vkCmdBindDescriptorSets2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
