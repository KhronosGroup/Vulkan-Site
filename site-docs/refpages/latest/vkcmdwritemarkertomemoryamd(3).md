# vkCmdWriteMarkerToMemoryAMD(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdWriteMarkerToMemoryAMD.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdWriteMarkerToMemoryAMD - Execute a pipelined write of a marker value into a memory range

To write a 32-bit marker value into memory as a pipelined operation, call:

// Provided by VK_KHR_device_address_commands with VK_AMD_buffer_marker
void vkCmdWriteMarkerToMemoryAMD(
    VkCommandBuffer                             commandBuffer,
    const VkMemoryMarkerInfoAMD*                pInfo);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pInfo` specifies a pointer to an [VkMemoryMarkerInfoAMD](VkMemoryMarkerInfoAMD.html)
structure defining parameters of this command.

When `vkCmdWriteMarkerToMemoryAMD` is submitted to a queue, it defines
an execution dependency between prior operations and writing the marker
value, as well as a memory dependency from earlier
[buffer marker write commands](../../../../spec/latest/chapters/copies.html#copies-buffer-markers).

The first [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)
includes operations performed by operations that occur earlier in
[submission order](../../../../spec/latest/chapters/synchronization.html#synchronization-submission-order) in the pipeline stage
identified by `pInfo->stage`.
It additionally includes other [buffer marker write commands](../../../../spec/latest/chapters/copies.html#copies-buffer-markers) that occur earlier in [submission order](../../../../spec/latest/chapters/synchronization.html#synchronization-submission-order) that specified either the same `pInfo->stage` or a
stage that is [logically earlier](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages-order).

The second [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)
includes only the buffer marker write.

The first [access scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes)
includes only accesses performed by other [buffer marker write commands](../../../../spec/latest/chapters/copies.html#copies-buffer-markers).

The second [access scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-access-scopes) is
empty.

The access scope for buffer marker writes falls under the
[VK_ACCESS_TRANSFER_WRITE_BIT](VkAccessFlagBits.html) flag, and is performed by either
`pInfo->stage` or [VK_PIPELINE_STAGE_TRANSFER_BIT](VkPipelineStageFlagBits.html).
[Synchronization commands](../../../../spec/latest/chapters/synchronization.html#synchronization) should specify this access
flag and both pipeline stages when defining dependencies with this command.

|  | Similar to `vkCmdWriteTimestamp2`, if an implementation is unable to
| --- | --- |
write a marker at any specific pipeline stage, it **may** instead do so at any
logically later stage. |

|  | Implementations **may** only support a limited number of pipelined marker write
| --- | --- |
operations in flight at a given time.
Thus an excessive number of marker write operations **may** degrade command
execution performance. |

Valid Usage

* 
[](#VUID-vkCmdWriteMarkerToMemoryAMD-synchronization2-13042) VUID-vkCmdWriteMarkerToMemoryAMD-synchronization2-13042

The [`synchronization2`](../../../../spec/latest/chapters/features.html#features-synchronization2) feature **must**
be enabled

* 
[](#VUID-vkCmdWriteMarkerToMemoryAMD-pInfo-13043) VUID-vkCmdWriteMarkerToMemoryAMD-pInfo-13043

`pInfo->stage` **must** include only stages that are valid for the
queue family that was used to create the command pool that
`commandBuffer` was allocated from

* 
[](#VUID-vkCmdWriteMarkerToMemoryAMD-commandBuffer-13044) VUID-vkCmdWriteMarkerToMemoryAMD-commandBuffer-13044

If `commandBuffer` is an unprotected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`pInfo->dstFlags` **must** not include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-vkCmdWriteMarkerToMemoryAMD-commandBuffer-13045) VUID-vkCmdWriteMarkerToMemoryAMD-commandBuffer-13045

If `commandBuffer` is a protected command buffer and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`pInfo->dstFlags` **must** include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-vkCmdWriteMarkerToMemoryAMD-pInfo-13046) VUID-vkCmdWriteMarkerToMemoryAMD-pInfo-13046

If `pInfo->dstFlags` includes
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html), the buffer from which
`pInfo->dstRange` was queried **must** have been created with
[VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html)

* 
[](#VUID-vkCmdWriteMarkerToMemoryAMD-pInfo-13047) VUID-vkCmdWriteMarkerToMemoryAMD-pInfo-13047

If `pInfo->dstFlags` does not include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html), the buffer from which
`pInfo->dstRange` was queried **must** have been created without
[VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdWriteMarkerToMemoryAMD-commandBuffer-parameter) VUID-vkCmdWriteMarkerToMemoryAMD-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdWriteMarkerToMemoryAMD-pInfo-parameter) VUID-vkCmdWriteMarkerToMemoryAMD-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkMemoryMarkerInfoAMD](VkMemoryMarkerInfoAMD.html) structure

* 
[](#VUID-vkCmdWriteMarkerToMemoryAMD-commandBuffer-recording) VUID-vkCmdWriteMarkerToMemoryAMD-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdWriteMarkerToMemoryAMD-commandBuffer-cmdpool) VUID-vkCmdWriteMarkerToMemoryAMD-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), or [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdWriteMarkerToMemoryAMD-suspended) VUID-vkCmdWriteMarkerToMemoryAMD-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdWriteMarkerToMemoryAMD-videocoding) VUID-vkCmdWriteMarkerToMemoryAMD-videocoding

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

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_TRANSFER_BIT | Action |

Conditional Rendering

vkCmdWriteMarkerToMemoryAMD is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_AMD_buffer_marker](VK_AMD_buffer_marker.html), [VK_KHR_device_address_commands](VK_KHR_device_address_commands.html), [VkCommandBuffer](VkCommandBuffer.html), [VkMemoryMarkerInfoAMD](VkMemoryMarkerInfoAMD.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/copies.html#vkCmdWriteMarkerToMemoryAMD).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
