# vkCmdBindResourceHeapEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdBindResourceHeapEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdBindResourceHeapEXT - Binds a resource heap to a command buffer

To bind a resource heap to a command buffer, call:

// Provided by VK_EXT_descriptor_heap
void vkCmdBindResourceHeapEXT(
    VkCommandBuffer                             commandBuffer,
    const VkBindHeapInfoEXT*                    pBindInfo);

* 
`commandBuffer` is the command buffer that the resource heap will be
bound to.

* 
`pBindInfo` is a [VkBindHeapInfoEXT](VkBindHeapInfoEXT.html) specifying the device
address range used for the heap and any implementation reservations.

Addresses in the range defined by `pBindInfo->heapRange` are bound as
the resource heap.
The application **can** access resources and data through this heap anywhere
except for the reserved range specified by
`pBindInfo->reservedRangeOffset`.
Addresses in the range [`pBindInfo->reservedRangeOffset`,
`pBindInfo->reservedRangeOffset` + 
[`minResourceHeapReservedRange`](../../../../spec/latest/chapters/limits.html#limits-minResourceHeapReservedRange))
are reserved for the implementation and **must** not be accessed by the
application at any time from when this command is recorded until there are
no command buffers with that range bound.

Shaders executed by commands recorded after this command **can** use the
specified resource heap to access resources.
`pBindInfo->heapRange.address` will be available to shaders to access
resources through the `ResourceHeapEXT` `BuiltIn` or via
[shader bindings](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings).

When `vkCmdBindResourceHeapEXT` is recorded, it
[immediately invalidates all non-heap descriptor state](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-invalidate-sets).
Similarly, recording any non-heap descriptor state commands immediately
invalidates state set by this command.

Valid Usage

* 
[](#VUID-vkCmdBindResourceHeapEXT-pBindInfo-11232) VUID-vkCmdBindResourceHeapEXT-pBindInfo-11232

The sum of `pBindInfo->reservedRangeOffset` and
`pBindInfo->reservedRangeSize` **must** be less than or equal to
`pBindInfo->heapRange.size`

* 
[](#VUID-vkCmdBindResourceHeapEXT-pBindInfo-11233) VUID-vkCmdBindResourceHeapEXT-pBindInfo-11233

`pBindInfo->reservedRangeSize` **must** be greater than or equal to
[`minResourceHeapReservedRange`](../../../../spec/latest/chapters/limits.html#limits-minResourceHeapReservedRange)

* 
[](#VUID-vkCmdBindResourceHeapEXT-pBindInfo-11234) VUID-vkCmdBindResourceHeapEXT-pBindInfo-11234

`pBindInfo->heapRange.size` **must**be less than or equal to
[`maxResourceHeapSize`](../../../../spec/latest/chapters/limits.html#limits-maxResourceHeapSize)

* 
[](#VUID-vkCmdBindResourceHeapEXT-pBindInfo-11235) VUID-vkCmdBindResourceHeapEXT-pBindInfo-11235

`pBindInfo->heapRange.address` **must** be a multiple of
[`resourceHeapAlignment`](../../../../spec/latest/chapters/limits.html#limits-resourceHeapAlignment)

* 
[](#VUID-vkCmdBindResourceHeapEXT-pBindInfo-11435) VUID-vkCmdBindResourceHeapEXT-pBindInfo-11435

`pBindInfo->reservedRangeOffset` **must** be a multiple of
[`bufferDescriptorAlignment`](../../../../spec/latest/chapters/limits.html#limits-bufferDescriptorAlignment)

* 
[](#VUID-vkCmdBindResourceHeapEXT-pBindInfo-11436) VUID-vkCmdBindResourceHeapEXT-pBindInfo-11436

`pBindInfo->reservedRangeOffset` **must** be a multiple of
[`imageDescriptorAlignment`](../../../../spec/latest/chapters/limits.html#limits-imageDescriptorAlignment)

* 
[](#VUID-vkCmdBindResourceHeapEXT-pBindInfo-11236) VUID-vkCmdBindResourceHeapEXT-pBindInfo-11236

Memory bound to addresses in the range
[`pBindInfo->heapRange.address` + 
`pBindInfo->reservedRangeOffset`, `pBindInfo->heapRange.address`
+  `pBindInfo->reservedRangeOffset` + 
`pBindInfo->reservedRangeSize`) **must** not be
[bound to any other command buffer as a    reserved range](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-reservedranges) for any heap unless the reserved range matches exactly
and it is the same heap type

* 
[](#VUID-vkCmdBindResourceHeapEXT-heapRange-11237) VUID-vkCmdBindResourceHeapEXT-heapRange-11237

`heapRange` **must** be a device address range allocated to the
application from a buffer created with the
[VK_BUFFER_USAGE_DESCRIPTOR_HEAP_BIT_EXT](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdBindResourceHeapEXT-commandBuffer-11238) VUID-vkCmdBindResourceHeapEXT-commandBuffer-11238

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](VkCommandBufferInheritanceDescriptorHeapInfoEXT.html)::`pResourceHeapBindInfo`
equal to `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBindResourceHeapEXT-commandBuffer-parameter) VUID-vkCmdBindResourceHeapEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdBindResourceHeapEXT-pBindInfo-parameter) VUID-vkCmdBindResourceHeapEXT-pBindInfo-parameter

 `pBindInfo` **must** be a valid pointer to a valid [VkBindHeapInfoEXT](VkBindHeapInfoEXT.html) structure

* 
[](#VUID-vkCmdBindResourceHeapEXT-commandBuffer-recording) VUID-vkCmdBindResourceHeapEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBindResourceHeapEXT-commandBuffer-cmdpool) VUID-vkCmdBindResourceHeapEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdBindResourceHeapEXT-videocoding) VUID-vkCmdBindResourceHeapEXT-videocoding

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

vkCmdBindResourceHeapEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), [VkBindHeapInfoEXT](VkBindHeapInfoEXT.html), [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorheaps.html#vkCmdBindResourceHeapEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
