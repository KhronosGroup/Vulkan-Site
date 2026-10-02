# vkCmdPushDescriptorSet2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdPushDescriptorSet2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdPushDescriptorSet2 - Pushes descriptor updates into a command buffer

To push descriptor updates into a command buffer, call:

// Provided by VK_VERSION_1_4
void vkCmdPushDescriptorSet2(
    VkCommandBuffer                             commandBuffer,
    const VkPushDescriptorSetInfo*              pPushDescriptorSetInfo);

// Provided by VK_KHR_maintenance6 with VK_KHR_push_descriptor
// Equivalent to vkCmdPushDescriptorSet2
void vkCmdPushDescriptorSet2KHR(
    VkCommandBuffer                             commandBuffer,
    const VkPushDescriptorSetInfo*              pPushDescriptorSetInfo);

* 
`commandBuffer` is the command buffer that the descriptors will be
recorded in.

* 
`pPushDescriptorSetInfo` is a pointer to a
`VkPushDescriptorSetInfo` structure.

Valid Usage

* 
[](#VUID-vkCmdPushDescriptorSet2-commandBuffer-11295) VUID-vkCmdPushDescriptorSet2-commandBuffer-11295

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](VkCommandBufferInheritanceDescriptorHeapInfoEXT.html)::`pSamplerHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdPushDescriptorSet2-commandBuffer-11296) VUID-vkCmdPushDescriptorSet2-commandBuffer-11296

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](VkCommandBufferInheritanceDescriptorHeapInfoEXT.html)::`pResourceHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdPushDescriptorSet2-pPushDescriptorSetInfo-09468) VUID-vkCmdPushDescriptorSet2-pPushDescriptorSetInfo-09468

Each bit in `pPushDescriptorSetInfo->stageFlags` **must** be a stage
supported by the `commandBuffer`’s parent `VkCommandPool`’s
queue family

* 
[](#VUID-vkCmdPushDescriptorSet2-None-10357) VUID-vkCmdPushDescriptorSet2-None-10357

If the [VK_KHR_push_descriptor](VK_KHR_push_descriptor.html) extension is not enabled,
[`pushDescriptor`](../../../../spec/latest/chapters/features.html#features-pushDescriptor) **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdPushDescriptorSet2-commandBuffer-parameter) VUID-vkCmdPushDescriptorSet2-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdPushDescriptorSet2-pPushDescriptorSetInfo-parameter) VUID-vkCmdPushDescriptorSet2-pPushDescriptorSetInfo-parameter

 `pPushDescriptorSetInfo` **must** be a valid pointer to a valid [VkPushDescriptorSetInfo](VkPushDescriptorSetInfo.html) structure

* 
[](#VUID-vkCmdPushDescriptorSet2-commandBuffer-recording) VUID-vkCmdPushDescriptorSet2-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdPushDescriptorSet2-commandBuffer-cmdpool) VUID-vkCmdPushDescriptorSet2-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdPushDescriptorSet2-videocoding) VUID-vkCmdPushDescriptorSet2-videocoding

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

vkCmdPushDescriptorSet2 is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_maintenance6](VK_KHR_maintenance6.html), [VK_KHR_push_descriptor](VK_KHR_push_descriptor.html), [VK_VERSION_1_4](VK_VERSION_1_4.html), [VkCommandBuffer](VkCommandBuffer.html), [VkPushDescriptorSetInfo](VkPushDescriptorSetInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#vkCmdPushDescriptorSet2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
