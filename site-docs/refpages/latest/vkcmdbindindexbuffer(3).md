# vkCmdBindIndexBuffer(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdBindIndexBuffer.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdBindIndexBuffer - Bind an index buffer to a command buffer

To bind an index buffer to a command buffer, call:

// Provided by VK_VERSION_1_0
void vkCmdBindIndexBuffer(
    VkCommandBuffer                             commandBuffer,
    VkBuffer                                    buffer,
    VkDeviceSize                                offset,
    VkIndexType                                 indexType);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`buffer` is the buffer being bound.

* 
`offset` is the starting offset in bytes within `buffer` used in
index buffer address calculations.

* 
`indexType` is a [VkIndexType](VkIndexType.html) value specifying the size of the
indices.

`buffer` and `offset` specify the [bound index buffer range](../../../../spec/latest/chapters/drawing.html#index-buffer-range), with a range of memory bound from [`base` + 
`offset`, `base` +  `offset` +  `size`), where
`size` is from `offset` to the end of the `buffer`.

If the [`maintenance6`](../../../../spec/latest/chapters/features.html#features-maintenance6) feature is enabled,
`buffer` **can** be [VK_NULL_HANDLE](VK_NULL_HANDLE.html).
If `buffer` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html) and the [`nullDescriptor`](../../../../spec/latest/chapters/features.html#features-nullDescriptor) feature is enabled, every index fetched results in a
value of zero.

Valid Usage

* 
[](#VUID-vkCmdBindIndexBuffer-offset-08782) VUID-vkCmdBindIndexBuffer-offset-08782

`offset` **must** be less than the size of `buffer`

* 
[](#VUID-vkCmdBindIndexBuffer-offset-08783) VUID-vkCmdBindIndexBuffer-offset-08783

The sum of `offset` and the base address of the range of
`VkDeviceMemory` object that is backing `buffer`, **must** be a
multiple of the size of the type indicated by `indexType`

* 
[](#VUID-vkCmdBindIndexBuffer-buffer-08784) VUID-vkCmdBindIndexBuffer-buffer-08784

`buffer` **must** have been created with the
[VK_BUFFER_USAGE_INDEX_BUFFER_BIT](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdBindIndexBuffer-buffer-08785) VUID-vkCmdBindIndexBuffer-buffer-08785

If `buffer` is non-sparse then it **must** be bound completely and
contiguously to a single `VkDeviceMemory` object

* 
[](#VUID-vkCmdBindIndexBuffer-indexType-08786) VUID-vkCmdBindIndexBuffer-indexType-08786

`indexType` **must** not be [VK_INDEX_TYPE_NONE_KHR](VkIndexType.html)

* 
[](#VUID-vkCmdBindIndexBuffer-indexType-08787) VUID-vkCmdBindIndexBuffer-indexType-08787

If `indexType` is [VK_INDEX_TYPE_UINT8](VkIndexType.html), the
[`indexTypeUint8`](../../../../spec/latest/chapters/features.html#features-indexTypeUint8) feature **must** be
enabled

* 
[](#VUID-vkCmdBindIndexBuffer-None-09493) VUID-vkCmdBindIndexBuffer-None-09493

If the [`maintenance6`](../../../../spec/latest/chapters/features.html#features-maintenance6) feature is not
enabled,
`buffer` **must** not be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-vkCmdBindIndexBuffer-buffer-09494) VUID-vkCmdBindIndexBuffer-buffer-09494

If `buffer` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), offset **must** be zero

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBindIndexBuffer-commandBuffer-parameter) VUID-vkCmdBindIndexBuffer-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdBindIndexBuffer-buffer-parameter) VUID-vkCmdBindIndexBuffer-buffer-parameter

 If `buffer` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `buffer` **must** be a valid [VkBuffer](VkBuffer.html) handle

* 
[](#VUID-vkCmdBindIndexBuffer-indexType-parameter) VUID-vkCmdBindIndexBuffer-indexType-parameter

 `indexType` **must** be a valid [VkIndexType](VkIndexType.html) value

* 
[](#VUID-vkCmdBindIndexBuffer-commandBuffer-recording) VUID-vkCmdBindIndexBuffer-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBindIndexBuffer-commandBuffer-cmdpool) VUID-vkCmdBindIndexBuffer-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdBindIndexBuffer-videocoding) VUID-vkCmdBindIndexBuffer-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBindIndexBuffer-commonparent) VUID-vkCmdBindIndexBuffer-commonparent

 Both of `buffer`, and `commandBuffer` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdBindIndexBuffer is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkBuffer](VkBuffer.html), [VkCommandBuffer](VkCommandBuffer.html), `VkDeviceSize`, [VkIndexType](VkIndexType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/drawing.html#vkCmdBindIndexBuffer).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
