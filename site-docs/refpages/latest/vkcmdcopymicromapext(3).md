# vkCmdCopyMicromapEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdCopyMicromapEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdCopyMicromapEXT - Copy a micromap

To copy a micromap call:

// Provided by VK_EXT_opacity_micromap
void vkCmdCopyMicromapEXT(
    VkCommandBuffer                             commandBuffer,
    const VkCopyMicromapInfoEXT*                pInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pInfo` is a pointer to a [VkCopyMicromapInfoEXT](VkCopyMicromapInfoEXT.html) structure
defining the copy operation.

This command copies the `pInfo->src` micromap to the `pInfo->dst`
micromap in the manner specified by `pInfo->mode`.

Accesses to `pInfo->src` and `pInfo->dst` **must** be
[synchronized](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies) with the
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](VkPipelineStageFlagBits2.html)
[pipeline stage](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages) and an
[access type](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types) of
[VK_ACCESS_2_MICROMAP_READ_BIT_EXT](VkAccessFlagBits2.html) or
[VK_ACCESS_2_MICROMAP_WRITE_BIT_EXT](VkAccessFlagBits2.html) as appropriate.

Valid Usage

* 
[](#VUID-vkCmdCopyMicromapEXT-buffer-07529) VUID-vkCmdCopyMicromapEXT-buffer-07529

The `buffer` used to create `pInfo->src` **must** be bound to
device memory

* 
[](#VUID-vkCmdCopyMicromapEXT-buffer-07530) VUID-vkCmdCopyMicromapEXT-buffer-07530

The `buffer` used to create `pInfo->dst` **must** be bound to
device memory

Valid Usage (Implicit)

* 
[](#VUID-vkCmdCopyMicromapEXT-commandBuffer-parameter) VUID-vkCmdCopyMicromapEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdCopyMicromapEXT-pInfo-parameter) VUID-vkCmdCopyMicromapEXT-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkCopyMicromapInfoEXT](VkCopyMicromapInfoEXT.html) structure

* 
[](#VUID-vkCmdCopyMicromapEXT-commandBuffer-recording) VUID-vkCmdCopyMicromapEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdCopyMicromapEXT-commandBuffer-cmdpool) VUID-vkCmdCopyMicromapEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdCopyMicromapEXT-renderpass) VUID-vkCmdCopyMicromapEXT-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdCopyMicromapEXT-suspended) VUID-vkCmdCopyMicromapEXT-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdCopyMicromapEXT-videocoding) VUID-vkCmdCopyMicromapEXT-videocoding

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

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT | Action |

Conditional Rendering

vkCmdCopyMicromapEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html), [VkCommandBuffer](VkCommandBuffer.html), [VkCopyMicromapInfoEXT](VkCopyMicromapInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_EXT_opacity_micromap/micromaps.html#vkCmdCopyMicromapEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
