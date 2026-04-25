# vkCmdBindSamplerHeapEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdBindSamplerHeapEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdBindSamplerHeapEXT - Binds a sampler heap to a command buffer

To bind a sampler heap to a command buffer, call:

// Provided by VK_EXT_descriptor_heap
void vkCmdBindSamplerHeapEXT(
    VkCommandBuffer                             commandBuffer,
    const VkBindHeapInfoEXT*                    pBindInfo);

* 
`commandBuffer` is the command buffer that the sampler heap will be
bound to.

* 
`pBindInfo` is a [VkBindHeapInfoEXT](VkBindHeapInfoEXT.html) specifying the device
address range used for the heap and any implementation reservations.

Addresses in the range defined by `pBindInfo->heapRange` are bound as
the sampler heap.
The application **can** access samplers and data through this heap anywhere
except for the reserved range specified by
`pBindInfo->reservedRangeOffset`.
Addresses in the range [`pBindInfo->reservedRangeOffset`,
`pBindInfo->reservedRangeOffset` + 
[`minSamplerHeapReservedRange`](../../../../spec/latest/chapters/limits.html#limits-minSamplerHeapReservedRange)),
or in the range [`pBindInfo->reservedRangeOffset`,
`pBindInfo->reservedRangeOffset` + 
[`minSamplerHeapReservedRangeWithEmbedded`](../../../../spec/latest/chapters/limits.html#limits-minSamplerHeapReservedRangeWithEmbedded)) if embedded samplers will
be used, are reserved for the implementation and **must** not be accessed by
the application at any time from when this command is recorded until all
command buffers with that range bound (even invalid ones) have been reset or
freed.

|  | Implementations may require a larger sampler heap reservation to store
| --- | --- |
embedded sampler descriptors when used in a mapping, as advertised by
[`minSamplerHeapReservedRangeWithEmbedded`](../../../../spec/latest/chapters/limits.html#limits-minSamplerHeapReservedRangeWithEmbedded). |

Shaders executed by commands recorded after this command **can** use the
specified sampler heap to access resources.
`pBindInfo->heapRange.address` will be available to shaders to access
samplers and data through the `SamplerHeapEXT` `BuiltIn` or via
[shader bindings](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-bindings).

When `vkCmdBindSamplerHeapEXT` is recorded, it
[immediately invalidates all non-heap descriptor state](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-invalidate-sets).
Similarly, recording any non-heap descriptor state commands immediately
invalidates state set by this command.

Valid Usage

* 
[](#VUID-vkCmdBindSamplerHeapEXT-pBindInfo-11223) VUID-vkCmdBindSamplerHeapEXT-pBindInfo-11223

The sum of `pBindInfo->reservedRangeOffset` and
`pBindInfo->reservedRangeSize` **must** be less than or equal to
`pBindInfo->heapRange.size`

* 
[](#VUID-vkCmdBindSamplerHeapEXT-pBindInfo-11224) VUID-vkCmdBindSamplerHeapEXT-pBindInfo-11224

`pBindInfo->reservedRangeSize` **must** be greater than or equal to
[`minSamplerHeapReservedRange`](../../../../spec/latest/chapters/limits.html#limits-minSamplerHeapReservedRange)

* 
[](#VUID-vkCmdBindSamplerHeapEXT-pBindInfo-11225) VUID-vkCmdBindSamplerHeapEXT-pBindInfo-11225

`pBindInfo->heapRange.size` **must**be less than or equal to
[`maxSamplerHeapSize`](../../../../spec/latest/chapters/limits.html#limits-maxSamplerHeapSize)

* 
[](#VUID-vkCmdBindSamplerHeapEXT-pBindInfo-11226) VUID-vkCmdBindSamplerHeapEXT-pBindInfo-11226

`pBindInfo->heapRange.address` **must** be a multiple of
[`samplerHeapAlignment`](../../../../spec/latest/chapters/limits.html#limits-samplerHeapAlignment)

* 
[](#VUID-vkCmdBindSamplerHeapEXT-pBindInfo-11434) VUID-vkCmdBindSamplerHeapEXT-pBindInfo-11434

`pBindInfo->reservedRangeOffset` **must** be a multiple of
[`samplerDescriptorAlignment`](../../../../spec/latest/chapters/limits.html#limits-samplerDescriptorAlignment)

* 
[](#VUID-vkCmdBindSamplerHeapEXT-pBindInfo-11228) VUID-vkCmdBindSamplerHeapEXT-pBindInfo-11228

Memory bound to addresses in the range
[`pBindInfo->heapRange.address` + 
`pBindInfo->reservedRangeOffset`, `pBindInfo->heapRange.address`
+  `pBindInfo->reservedRangeOffset` + 
`pBindInfo->reservedRangeSize`) **must** not be
[bound to any other command buffer as a    reserved range](../../../../spec/latest/chapters/descriptorheaps.html#descriptorheaps-reservedranges) for any heap unless the reserved range matches exactly
and it is the same heap type

* 
[](#VUID-vkCmdBindSamplerHeapEXT-heapRange-11230) VUID-vkCmdBindSamplerHeapEXT-heapRange-11230

`heapRange` **must** be a device address range allocated to the
application from a buffer created with the
[VK_BUFFER_USAGE_DESCRIPTOR_HEAP_BIT_EXT](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdBindSamplerHeapEXT-commandBuffer-11231) VUID-vkCmdBindSamplerHeapEXT-commandBuffer-11231

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](VkCommandBufferInheritanceDescriptorHeapInfoEXT.html)::`pSamplerHeapBindInfo`
equal to `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBindSamplerHeapEXT-commandBuffer-parameter) VUID-vkCmdBindSamplerHeapEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdBindSamplerHeapEXT-pBindInfo-parameter) VUID-vkCmdBindSamplerHeapEXT-pBindInfo-parameter

 `pBindInfo` **must** be a valid pointer to a valid [VkBindHeapInfoEXT](VkBindHeapInfoEXT.html) structure

* 
[](#VUID-vkCmdBindSamplerHeapEXT-commandBuffer-recording) VUID-vkCmdBindSamplerHeapEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBindSamplerHeapEXT-commandBuffer-cmdpool) VUID-vkCmdBindSamplerHeapEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdBindSamplerHeapEXT-videocoding) VUID-vkCmdBindSamplerHeapEXT-videocoding

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

vkCmdBindSamplerHeapEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), [VkBindHeapInfoEXT](VkBindHeapInfoEXT.html), [VkCommandBuffer](VkCommandBuffer.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorheaps.html#vkCmdBindSamplerHeapEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
