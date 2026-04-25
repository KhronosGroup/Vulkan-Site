# vkCmdEndQuery(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdEndQuery.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdEndQuery - Ends a query

To end a query after the set of desired commands is recorded, call:

// Provided by VK_VERSION_1_0
void vkCmdEndQuery(
    VkCommandBuffer                             commandBuffer,
    VkQueryPool                                 queryPool,
    uint32_t                                    query);

* 
`commandBuffer` is the command buffer into which this command will
be recorded.

* 
`queryPool` is the query pool that is managing the results of the
query.

* 
`query` is the query index within the query pool where the result is
stored.

The command completes the query in `queryPool` identified by
`query`, and marks it as available.

This command defines an execution dependency between other query commands
that reference the same query.

The first [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)
includes all commands which reference the queries in `queryPool`
indicated by `query` that occur earlier in
[submission order](../../../../spec/latest/chapters/synchronization.html#synchronization-submission-order).

The second [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)
includes only the operation of this command.

Calling `vkCmdEndQuery` is equivalent to calling
[vkCmdEndQueryIndexedEXT](vkCmdEndQueryIndexedEXT.html) with the `index` parameter set to zero.

Valid Usage

* 
[](#VUID-vkCmdEndQuery-None-01923) VUID-vkCmdEndQuery-None-01923

All queries used by the command **must** be
[active](../../../../spec/latest/chapters/queries.html#queries-operation-active)

* 
[](#VUID-vkCmdEndQuery-query-00810) VUID-vkCmdEndQuery-query-00810

`query` **must** be less than the number of queries in `queryPool`

* 
[](#VUID-vkCmdEndQuery-commandBuffer-01886) VUID-vkCmdEndQuery-commandBuffer-01886

`commandBuffer` **must** not be a protected command buffer

* 
[](#VUID-vkCmdEndQuery-query-00812) VUID-vkCmdEndQuery-query-00812

If `vkCmdEndQuery` is called within a render pass instance, the sum
of `query` and the number of bits set in the current subpass’s view
mask **must** be less than or equal to the number of queries in
`queryPool`

* 
[](#VUID-vkCmdEndQuery-queryPool-03227) VUID-vkCmdEndQuery-queryPool-03227

If `queryPool` was created with a `queryType` of
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](VkQueryType.html) and one or more of the
counters used to create `queryPool` was
[VK_PERFORMANCE_COUNTER_SCOPE_COMMAND_BUFFER_KHR](VkPerformanceCounterScopeKHR.html), the
[vkCmdEndQuery](#) **must** be the last recorded command in
`commandBuffer`

* 
[](#VUID-vkCmdEndQuery-queryPool-03228) VUID-vkCmdEndQuery-queryPool-03228

If `queryPool` was created with a `queryType` of
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](VkQueryType.html) and one or more of the
counters used to create `queryPool` was
[VK_PERFORMANCE_COUNTER_SCOPE_RENDER_PASS_KHR](VkPerformanceCounterScopeKHR.html), the
[vkCmdEndQuery](#) **must** not be recorded within a render pass instance

* 
[](#VUID-vkCmdEndQuery-None-07007) VUID-vkCmdEndQuery-None-07007

If called within a subpass of a render pass instance, the corresponding
`vkCmdBeginQuery`* command **must** have been called previously within
the same subpass

* 
[](#VUID-vkCmdEndQuery-None-10682) VUID-vkCmdEndQuery-None-10682

This command **must** not be recorded when
[per-tile execution model](../../../../spec/latest/chapters/renderpass.html#renderpass-per-tile-execution-model) is
enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdEndQuery-commandBuffer-parameter) VUID-vkCmdEndQuery-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdEndQuery-queryPool-parameter) VUID-vkCmdEndQuery-queryPool-parameter

 `queryPool` **must** be a valid [VkQueryPool](VkQueryPool.html) handle

* 
[](#VUID-vkCmdEndQuery-commandBuffer-recording) VUID-vkCmdEndQuery-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdEndQuery-commandBuffer-cmdpool) VUID-vkCmdEndQuery-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), [VK_QUEUE_VIDEO_DECODE_BIT_KHR](VkQueueFlagBits.html), or [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdEndQuery-suspended) VUID-vkCmdEndQuery-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdEndQuery-commonparent) VUID-vkCmdEndQuery-commonparent

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

Secondary | Both | Both | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_VIDEO_DECODE_BIT_KHR

VK_QUEUE_VIDEO_ENCODE_BIT_KHR | Action

State |

Conditional Rendering

vkCmdEndQuery is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandBuffer](VkCommandBuffer.html), [VkQueryPool](VkQueryPool.html), [vkCmdBeginQuery](vkCmdBeginQuery.html), [vkCmdBeginQueryIndexedEXT](vkCmdBeginQueryIndexedEXT.html), [vkCmdEndQueryIndexedEXT](vkCmdEndQueryIndexedEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#vkCmdEndQuery).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
