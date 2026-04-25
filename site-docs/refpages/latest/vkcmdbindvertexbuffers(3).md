# vkCmdBindVertexBuffers(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdBindVertexBuffers.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdBindVertexBuffers - Bind vertex buffers to a command buffer

To bind vertex buffers to a command buffer for use in subsequent drawing
commands, call:

// Provided by VK_VERSION_1_0
void vkCmdBindVertexBuffers(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    firstBinding,
    uint32_t                                    bindingCount,
    const VkBuffer*                             pBuffers,
    const VkDeviceSize*                         pOffsets);

* 
`commandBuffer` is the command buffer into which the command is
recorded.

* 
`firstBinding` is the index of the first vertex input binding whose
state is updated by the command.

* 
`bindingCount` is the number of vertex input bindings whose state is
updated by the command.

* 
`pBuffers` is a pointer to an array of buffer handles.

* 
`pOffsets` is a pointer to an array of buffer offsets.

The values taken from elements i of `pBuffers` and `pOffsets`
replace the current state for the vertex input binding
`firstBinding` +  i, for i in [0,
`bindingCount`).
The vertex input binding is updated to start at the offset indicated by
`pOffsets`[i] from the start of the buffer `pBuffers`[i].
All vertex input attributes that use each of these bindings will use these
updated addresses in their address calculations for subsequent drawing
commands.
If the [`nullDescriptor`](../../../../spec/latest/chapters/features.html#features-nullDescriptor) feature is enabled,
elements of `pBuffers` **can** be [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and **can** be used by
the vertex shader.
If a vertex input attribute is bound to a vertex input binding that is
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), the values taken from memory are considered to be
zero, and missing G, B, or A components are
[filled with (0](../../../../spec/latest/chapters/fxvertex.html#fxvertex-input-extraction).

Valid Usage

* 
[](#VUID-vkCmdBindVertexBuffers-firstBinding-00624) VUID-vkCmdBindVertexBuffers-firstBinding-00624

`firstBinding` **must** be less than
`VkPhysicalDeviceLimits`::`maxVertexInputBindings`

* 
[](#VUID-vkCmdBindVertexBuffers-firstBinding-00625) VUID-vkCmdBindVertexBuffers-firstBinding-00625

The sum of `firstBinding` and `bindingCount` **must** be less than
or equal to `VkPhysicalDeviceLimits`::`maxVertexInputBindings`

* 
[](#VUID-vkCmdBindVertexBuffers-pOffsets-00626) VUID-vkCmdBindVertexBuffers-pOffsets-00626

All elements of `pOffsets` **must** be less than the size of the
corresponding element in `pBuffers`

* 
[](#VUID-vkCmdBindVertexBuffers-pBuffers-00627) VUID-vkCmdBindVertexBuffers-pBuffers-00627

All elements of `pBuffers` **must** have been created with the
[VK_BUFFER_USAGE_VERTEX_BUFFER_BIT](VkBufferUsageFlagBits.html) flag

* 
[](#VUID-vkCmdBindVertexBuffers-pBuffers-00628) VUID-vkCmdBindVertexBuffers-pBuffers-00628

Each element of `pBuffers` that is non-sparse **must** be bound
completely and contiguously to a single `VkDeviceMemory` object

* 
[](#VUID-vkCmdBindVertexBuffers-pBuffers-04001) VUID-vkCmdBindVertexBuffers-pBuffers-04001

If the [`nullDescriptor`](../../../../spec/latest/chapters/features.html#features-nullDescriptor) feature is not
enabled, all elements of `pBuffers` **must** not be
[VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-vkCmdBindVertexBuffers-pBuffers-04002) VUID-vkCmdBindVertexBuffers-pBuffers-04002

If an element of `pBuffers` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), then the
corresponding element of `pOffsets` **must** be zero

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBindVertexBuffers-commandBuffer-parameter) VUID-vkCmdBindVertexBuffers-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdBindVertexBuffers-pBuffers-parameter) VUID-vkCmdBindVertexBuffers-pBuffers-parameter

 `pBuffers` **must** be a valid pointer to an array of `bindingCount` valid or [VK_NULL_HANDLE](VK_NULL_HANDLE.html) [VkBuffer](VkBuffer.html) handles

* 
[](#VUID-vkCmdBindVertexBuffers-pOffsets-parameter) VUID-vkCmdBindVertexBuffers-pOffsets-parameter

 `pOffsets` **must** be a valid pointer to an array of `bindingCount` `VkDeviceSize` values

* 
[](#VUID-vkCmdBindVertexBuffers-commandBuffer-recording) VUID-vkCmdBindVertexBuffers-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBindVertexBuffers-commandBuffer-cmdpool) VUID-vkCmdBindVertexBuffers-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdBindVertexBuffers-videocoding) VUID-vkCmdBindVertexBuffers-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBindVertexBuffers-bindingCount-arraylength) VUID-vkCmdBindVertexBuffers-bindingCount-arraylength

 `bindingCount` **must** be greater than `0`

* 
[](#VUID-vkCmdBindVertexBuffers-commonparent) VUID-vkCmdBindVertexBuffers-commonparent

 Both of `commandBuffer`, and the elements of `pBuffers` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

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

vkCmdBindVertexBuffers is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkBuffer](VkBuffer.html), [VkCommandBuffer](VkCommandBuffer.html), `VkDeviceSize`

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fxvertex.html#vkCmdBindVertexBuffers).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
