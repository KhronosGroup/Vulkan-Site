# vkCmdResetQueryPool(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdResetQueryPool.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdResetQueryPool - Reset queries in a query pool

To reset a range of queries in a query pool on a queue, call:

// Provided by VK_VERSION_1_0
void vkCmdResetQueryPool(
    VkCommandBuffer                             commandBuffer,
    VkQueryPool                                 queryPool,
    uint32_t                                    firstQuery,
    uint32_t                                    queryCount);

* 
`commandBuffer` is the command buffer into which this command will
be recorded.

* 
`queryPool` is the handle of the query pool managing the queries
being reset.

* 
`firstQuery` is the initial query index to reset.

* 
`queryCount` is the number of queries to reset.

When executed on a queue, this command sets the status of query indices
[`firstQuery`, `firstQuery` +  `queryCount` - 1] to
unavailable.

This command defines an execution dependency between other query commands
that reference the same query.

The first [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)
includes all commands which reference the queries in `queryPool`
indicated by `firstQuery` and `queryCount` that occur earlier in
[submission order](../../../../spec/latest/chapters/synchronization.html#synchronization-submission-order).

The second [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)
includes all commands which reference the queries in `queryPool`
indicated by `firstQuery` and `queryCount` that occur later in
[submission order](../../../../spec/latest/chapters/synchronization.html#synchronization-submission-order).

The operation of this command happens after the first scope and happens
before the second scope.

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](VkQueryType.html), this command sets the status of
query indices [`firstQuery`, `firstQuery` + 
`queryCount` - 1] to unavailable for each pass of `queryPool`, as
indicated by a call to
[vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR](vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR.html).

|  | Because `vkCmdResetQueryPool` resets all the passes of the indicated
| --- | --- |
queries, applications must not record a `vkCmdResetQueryPool` command
for a `queryPool` created with [VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](VkQueryType.html)
in a command buffer that needs to be submitted multiple times as indicated
by a call to [vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR](vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR.html).
Otherwise applications will never be able to complete the recorded queries. |

Valid Usage

* 
[](#VUID-vkCmdResetQueryPool-firstQuery-09436) VUID-vkCmdResetQueryPool-firstQuery-09436

`firstQuery` **must** be less than the number of queries in
`queryPool`

* 
[](#VUID-vkCmdResetQueryPool-firstQuery-09437) VUID-vkCmdResetQueryPool-firstQuery-09437

The sum of `firstQuery` and `queryCount` **must** be less than or
equal to the number of queries in `queryPool`

* 
[](#VUID-vkCmdResetQueryPool-None-02841) VUID-vkCmdResetQueryPool-None-02841

All queries used by the command **must** not be active

* 
[](#VUID-vkCmdResetQueryPool-firstQuery-02862) VUID-vkCmdResetQueryPool-firstQuery-02862

If `queryPool` was created with
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](VkQueryType.html), this command **must** not be
recorded in a command buffer that, either directly or through secondary
command buffers, also contains begin commands for a query from the set
of queries [`firstQuery`, `firstQuery` + 
`queryCount` - 1]

Valid Usage (Implicit)

* 
[](#VUID-vkCmdResetQueryPool-commandBuffer-parameter) VUID-vkCmdResetQueryPool-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdResetQueryPool-queryPool-parameter) VUID-vkCmdResetQueryPool-queryPool-parameter

 `queryPool` **must** be a valid [VkQueryPool](VkQueryPool.html) handle

* 
[](#VUID-vkCmdResetQueryPool-commandBuffer-recording) VUID-vkCmdResetQueryPool-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdResetQueryPool-commandBuffer-cmdpool) VUID-vkCmdResetQueryPool-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), [VK_QUEUE_OPTICAL_FLOW_BIT_NV](VkQueueFlagBits.html), [VK_QUEUE_VIDEO_DECODE_BIT_KHR](VkQueueFlagBits.html), or [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdResetQueryPool-renderpass) VUID-vkCmdResetQueryPool-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdResetQueryPool-suspended) VUID-vkCmdResetQueryPool-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdResetQueryPool-videocoding) VUID-vkCmdResetQueryPool-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdResetQueryPool-commonparent) VUID-vkCmdResetQueryPool-commonparent

 Both of `commandBuffer`, and `queryPool` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_OPTICAL_FLOW_BIT_NV

VK_QUEUE_VIDEO_DECODE_BIT_KHR

VK_QUEUE_VIDEO_ENCODE_BIT_KHR | Action |

Conditional Rendering

vkCmdResetQueryPool is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandBuffer](VkCommandBuffer.html), [VkQueryPool](VkQueryPool.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#vkCmdResetQueryPool).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
