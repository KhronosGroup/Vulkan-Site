# vkCmdCopyMemoryToMicromapEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdCopyMemoryToMicromapEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdCopyMemoryToMicromapEXT - Copy device memory to a micromap

To copy device memory to a micromap call:

// Provided by VK_EXT_opacity_micromap
void vkCmdCopyMemoryToMicromapEXT(
    VkCommandBuffer                             commandBuffer,
    const VkCopyMemoryToMicromapInfoEXT*        pInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pInfo` is a pointer to a [VkCopyMemoryToMicromapInfoEXT](VkCopyMemoryToMicromapInfoEXT.html)
structure defining the copy operation.

Accesses to `pInfo->dst` **must** be [synchronized](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies) with the [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](VkPipelineStageFlagBits2.html)
[pipeline stage](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages) and an
[access type](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types) of
[VK_ACCESS_2_MICROMAP_READ_BIT_EXT](VkAccessFlagBits2.html).
Accesses to the buffer indicated by `pInfo->src.deviceAddress` **must** be
synchronized with the [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](VkPipelineStageFlagBits2.html)
pipeline stage and an access type of [VK_ACCESS_TRANSFER_READ_BIT](VkAccessFlagBits.html).

This command can accept micromaps produced by either
[vkCmdCopyMicromapToMemoryEXT](vkCmdCopyMicromapToMemoryEXT.html) or [vkCopyMicromapToMemoryEXT](vkCopyMicromapToMemoryEXT.html).

Valid Usage

* 
[](#VUID-vkCmdCopyMemoryToMicromapEXT-pInfo-07543) VUID-vkCmdCopyMemoryToMicromapEXT-pInfo-07543

`pInfo->src.deviceAddress` **must** be a valid `VkDeviceAddress`

* 
[](#VUID-vkCmdCopyMemoryToMicromapEXT-pInfo-07544) VUID-vkCmdCopyMemoryToMicromapEXT-pInfo-07544

`pInfo->src.deviceAddress` **must** be aligned to `256` bytes

* 
[](#VUID-vkCmdCopyMemoryToMicromapEXT-pInfo-07545) VUID-vkCmdCopyMemoryToMicromapEXT-pInfo-07545

If the buffer pointed to by `pInfo->src.deviceAddress` is non-sparse
then it **must** be bound completely and contiguously to a single
[VkDeviceMemory](VkDeviceMemory.html) object

* 
[](#VUID-vkCmdCopyMemoryToMicromapEXT-buffer-07546) VUID-vkCmdCopyMemoryToMicromapEXT-buffer-07546

The `buffer` used to create `pInfo->dst` **must** be bound to
device memory

Valid Usage (Implicit)

* 
[](#VUID-vkCmdCopyMemoryToMicromapEXT-commandBuffer-parameter) VUID-vkCmdCopyMemoryToMicromapEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdCopyMemoryToMicromapEXT-pInfo-parameter) VUID-vkCmdCopyMemoryToMicromapEXT-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkCopyMemoryToMicromapInfoEXT](VkCopyMemoryToMicromapInfoEXT.html) structure

* 
[](#VUID-vkCmdCopyMemoryToMicromapEXT-commandBuffer-recording) VUID-vkCmdCopyMemoryToMicromapEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdCopyMemoryToMicromapEXT-commandBuffer-cmdpool) VUID-vkCmdCopyMemoryToMicromapEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdCopyMemoryToMicromapEXT-renderpass) VUID-vkCmdCopyMemoryToMicromapEXT-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdCopyMemoryToMicromapEXT-suspended) VUID-vkCmdCopyMemoryToMicromapEXT-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdCopyMemoryToMicromapEXT-videocoding) VUID-vkCmdCopyMemoryToMicromapEXT-videocoding

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

vkCmdCopyMemoryToMicromapEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html), [VkCommandBuffer](VkCommandBuffer.html), [VkCopyMemoryToMicromapInfoEXT](VkCopyMemoryToMicromapInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_EXT_opacity_micromap/micromaps.html#vkCmdCopyMemoryToMicromapEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
