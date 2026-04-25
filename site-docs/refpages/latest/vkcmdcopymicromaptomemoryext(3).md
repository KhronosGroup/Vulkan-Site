# vkCmdCopyMicromapToMemoryEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdCopyMicromapToMemoryEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdCopyMicromapToMemoryEXT - Copy a micromap to device memory

To copy a micromap to device memory call:

// Provided by VK_EXT_opacity_micromap
void vkCmdCopyMicromapToMemoryEXT(
    VkCommandBuffer                             commandBuffer,
    const VkCopyMicromapToMemoryInfoEXT*        pInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pInfo` is an a pointer to a [VkCopyMicromapToMemoryInfoEXT](VkCopyMicromapToMemoryInfoEXT.html)
structure defining the copy operation.

Accesses to `pInfo->src` **must** be [synchronized](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies) with the [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](VkPipelineStageFlagBits2.html)
[pipeline stage](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages) and an
[access type](../../../../spec/latest/chapters/synchronization.html#synchronization-access-types) of
[VK_ACCESS_2_MICROMAP_READ_BIT_EXT](VkAccessFlagBits2.html).
Accesses to the buffer indicated by `pInfo->dst.deviceAddress` **must** be
synchronized with the [VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](VkPipelineStageFlagBits2.html)
pipeline stage and an access type of [VK_ACCESS_TRANSFER_WRITE_BIT](VkAccessFlagBits.html).

This command produces the same results as [vkCopyMicromapToMemoryEXT](vkCopyMicromapToMemoryEXT.html),
but writes its result to a device address, and is executed on the device
rather than the host.
The output **may** not necessarily be bit-for-bit identical, but it can be
equally used by either [vkCmdCopyMemoryToMicromapEXT](vkCmdCopyMemoryToMicromapEXT.html) or
[vkCopyMemoryToMicromapEXT](vkCopyMemoryToMicromapEXT.html).

The defined header structure for the serialized data consists of:

* 
[VK_UUID_SIZE](VK_UUID_SIZE.html) bytes of data matching
`VkPhysicalDeviceIDProperties`::`driverUUID`

* 
[VK_UUID_SIZE](VK_UUID_SIZE.html) bytes of data identifying the compatibility for
    comparison using [vkGetDeviceMicromapCompatibilityEXT](vkGetDeviceMicromapCompatibilityEXT.html)
The serialized data is written to the buffer (or read from the buffer)
according to the host endianness.

Valid Usage

* 
[](#VUID-vkCmdCopyMicromapToMemoryEXT-pInfo-07536) VUID-vkCmdCopyMicromapToMemoryEXT-pInfo-07536

`pInfo->dst.deviceAddress` **must** be a valid `VkDeviceAddress`

* 
[](#VUID-vkCmdCopyMicromapToMemoryEXT-pInfo-07537) VUID-vkCmdCopyMicromapToMemoryEXT-pInfo-07537

`pInfo->dst.deviceAddress` **must** be aligned to `256` bytes

* 
[](#VUID-vkCmdCopyMicromapToMemoryEXT-pInfo-07538) VUID-vkCmdCopyMicromapToMemoryEXT-pInfo-07538

If the buffer pointed to by `pInfo->dst.deviceAddress` is non-sparse
then it **must** be bound completely and contiguously to a single
[VkDeviceMemory](VkDeviceMemory.html) object

* 
[](#VUID-vkCmdCopyMicromapToMemoryEXT-buffer-07539) VUID-vkCmdCopyMicromapToMemoryEXT-buffer-07539

The `buffer` used to create `pInfo->src` **must** be bound to
device memory

Valid Usage (Implicit)

* 
[](#VUID-vkCmdCopyMicromapToMemoryEXT-commandBuffer-parameter) VUID-vkCmdCopyMicromapToMemoryEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdCopyMicromapToMemoryEXT-pInfo-parameter) VUID-vkCmdCopyMicromapToMemoryEXT-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkCopyMicromapToMemoryInfoEXT](VkCopyMicromapToMemoryInfoEXT.html) structure

* 
[](#VUID-vkCmdCopyMicromapToMemoryEXT-commandBuffer-recording) VUID-vkCmdCopyMicromapToMemoryEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdCopyMicromapToMemoryEXT-commandBuffer-cmdpool) VUID-vkCmdCopyMicromapToMemoryEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdCopyMicromapToMemoryEXT-renderpass) VUID-vkCmdCopyMicromapToMemoryEXT-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdCopyMicromapToMemoryEXT-suspended) VUID-vkCmdCopyMicromapToMemoryEXT-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdCopyMicromapToMemoryEXT-videocoding) VUID-vkCmdCopyMicromapToMemoryEXT-videocoding

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

vkCmdCopyMicromapToMemoryEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_opacity_micromap](VK_EXT_opacity_micromap.html), [VkCommandBuffer](VkCommandBuffer.html), [VkCopyMicromapToMemoryInfoEXT](VkCopyMicromapToMemoryInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_EXT_opacity_micromap/micromaps.html#vkCmdCopyMicromapToMemoryEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
