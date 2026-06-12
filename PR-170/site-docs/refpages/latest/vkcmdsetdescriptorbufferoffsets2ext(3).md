# vkCmdSetDescriptorBufferOffsets2EXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetDescriptorBufferOffsets2EXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetDescriptorBufferOffsets2EXT - Setting descriptor buffer offsets in a command buffer

To set descriptor buffer offsets in a command buffer, call:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_KHR_maintenance6 with VK_EXT_descriptor_buffer
void vkCmdSetDescriptorBufferOffsets2EXT(
    VkCommandBuffer                             commandBuffer,
    const VkSetDescriptorBufferOffsetsInfoEXT*  pSetDescriptorBufferOffsetsInfo);

* 
`commandBuffer` is the command buffer in which the descriptor buffer
offsets will be set.

* 
`pSetDescriptorBufferOffsetsInfo` is a pointer to a
`VkSetDescriptorBufferOffsetsInfoEXT` structure.

Valid Usage

* 
[](#VUID-vkCmdSetDescriptorBufferOffsets2EXT-commandBuffer-11295) VUID-vkCmdSetDescriptorBufferOffsets2EXT-commandBuffer-11295

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](VkCommandBufferInheritanceDescriptorHeapInfoEXT.html)::`pSamplerHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdSetDescriptorBufferOffsets2EXT-commandBuffer-11296) VUID-vkCmdSetDescriptorBufferOffsets2EXT-commandBuffer-11296

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](VkCommandBufferInheritanceDescriptorHeapInfoEXT.html)::`pResourceHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdSetDescriptorBufferOffsets2EXT-descriptorBuffer-09470) VUID-vkCmdSetDescriptorBufferOffsets2EXT-descriptorBuffer-09470

The [`descriptorBuffer`](../../../../spec/latest/chapters/features.html#features-descriptorBuffer) feature **must**
be enabled

* 
[](#VUID-vkCmdSetDescriptorBufferOffsets2EXT-pSetDescriptorBufferOffsetsInfo-09471) VUID-vkCmdSetDescriptorBufferOffsets2EXT-pSetDescriptorBufferOffsetsInfo-09471

Each bit in `pSetDescriptorBufferOffsetsInfo->stageFlags` **must** be a
stage supported by the `commandBuffer`’s parent
`VkCommandPool`’s queue family

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetDescriptorBufferOffsets2EXT-commandBuffer-parameter) VUID-vkCmdSetDescriptorBufferOffsets2EXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetDescriptorBufferOffsets2EXT-pSetDescriptorBufferOffsetsInfo-parameter) VUID-vkCmdSetDescriptorBufferOffsets2EXT-pSetDescriptorBufferOffsetsInfo-parameter

 `pSetDescriptorBufferOffsetsInfo` **must** be a valid pointer to a valid [VkSetDescriptorBufferOffsetsInfoEXT](VkSetDescriptorBufferOffsetsInfoEXT.html) structure

* 
[](#VUID-vkCmdSetDescriptorBufferOffsets2EXT-commandBuffer-recording) VUID-vkCmdSetDescriptorBufferOffsets2EXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetDescriptorBufferOffsets2EXT-commandBuffer-cmdpool) VUID-vkCmdSetDescriptorBufferOffsets2EXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_DATA_GRAPH_BIT_ARM](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetDescriptorBufferOffsets2EXT-videocoding) VUID-vkCmdSetDescriptorBufferOffsets2EXT-videocoding

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

VK_QUEUE_DATA_GRAPH_BIT_ARM

VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetDescriptorBufferOffsets2EXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html), [VK_KHR_maintenance6](VK_KHR_maintenance6.html), [VkCommandBuffer](VkCommandBuffer.html), [VkSetDescriptorBufferOffsetsInfoEXT](VkSetDescriptorBufferOffsetsInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#vkCmdSetDescriptorBufferOffsets2EXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
