# vkCmdCopyQueryPoolResults(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdCopyQueryPoolResults.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdCopyQueryPoolResults - Copy the results of queries in a query pool to a buffer object

To copy query statuses and numerical results directly to buffer memory,
call:

// Provided by VK_VERSION_1_0
void vkCmdCopyQueryPoolResults(
    VkCommandBuffer                             commandBuffer,
    VkQueryPool                                 queryPool,
    uint32_t                                    firstQuery,
    uint32_t                                    queryCount,
    VkBuffer                                    dstBuffer,
    VkDeviceSize                                dstOffset,
    VkDeviceSize                                stride,
    VkQueryResultFlags                          flags);

* 
`commandBuffer` is the command buffer into which this command will
be recorded.

* 
`queryPool` is the query pool managing the queries containing the
desired results.

* 
`firstQuery` is the initial query index.

* 
`queryCount` is the number of queries.
`firstQuery` and `queryCount` together define a range of
queries.

* 
`dstBuffer` is a [VkBuffer](VkBuffer.html) object that will receive the results
of the copy command.

* 
`dstOffset` is an offset into `dstBuffer`.

* 
`stride` is the stride in bytes between results for individual
queries within `dstBuffer`.
The required size of the backing memory for `dstBuffer` is
determined as described above for [vkGetQueryPoolResults](vkGetQueryPoolResults.html).

* 
`flags` is a bitmask of [VkQueryResultFlagBits](VkQueryResultFlagBits.html) specifying how
and when results are returned.

Any results written for a query are written according to
[a layout dependent on the query type](../../../../spec/latest/chapters/queries.html#queries-operation-memorylayout).

Results for any query in `queryPool` identified by `firstQuery` and
`queryCount` that is available are copied to `dstBuffer`.

If [VK_QUERY_RESULT_WITH_AVAILABILITY_BIT](VkQueryResultFlagBits.html) is set, results for all
queries in `queryPool` identified by `firstQuery` and
`queryCount` are copied to `dstBuffer`, along with an extra
availability value written directly after the results of each query and
interpreted as an unsigned integer.
A value of zero indicates that the results are not yet available, otherwise
the query is complete and results are available.

If [VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](VkQueryResultFlagBits.html) is set, results for all queries
in `queryPool` identified by `firstQuery` and `queryCount` are
copied to `dstBuffer`, along with an extra status value written directly
after the results of each query and interpreted as a signed integer.
A value of zero indicates that the results are not yet available.
Positive values indicate that the operations within the query completed
successfully, and the query results are valid.
Negative values indicate that the operations within the query completed
unsuccessfully.

[VkQueryResultStatusKHR](VkQueryResultStatusKHR.html) defines specific meaning for values returned
here, though implementations are free to return other values.

If the status value written is negative, indicating that the operations
within the query completed unsuccessfully, then all other results written by
this command are **undefined** unless otherwise specified for any of the
results of the used query type.

Results for any available query written by this command are final and
represent the final result of the query.
If [VK_QUERY_RESULT_PARTIAL_BIT](VkQueryResultFlagBits.html) is set, then for any query that is
unavailable, an intermediate result between zero and the final result value
is written for that query.
Otherwise, any result written by this command is **undefined**.

If [VK_QUERY_RESULT_64_BIT](VkQueryResultFlagBits.html) is set, results and availability
or status
values for all queries are written as an array of 64-bit values.
If the `queryPool` was created with
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](VkQueryType.html), results for each query are
written as an array of the type indicated by
[VkPerformanceCounterKHR](VkPerformanceCounterKHR.html)::`storage` for the counter being queried.
Otherwise, results and availability
or status
values are written as an array of 32-bit values.
If an unsigned integer query’s value overflows the result type, the value
**may** either wrap or saturate.
If the [`maintenance7`](../../../../spec/latest/chapters/features.html#features-maintenance7) feature is enabled, for
an unsigned integer query, the 32-bit result value **must** be equal to the 32
least significant bits of the equivalent 64-bit result value.
If a signed integer query’s value overflows the result type, the value is
**undefined**.
If a floating-point query’s value is not representable as the result type,
the value is **undefined**.

This command defines an execution dependency between other query commands
that reference the same query.

The first [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)
includes all commands which reference the queries in `queryPool`
indicated by `query` that occur earlier in
[submission order](../../../../spec/latest/chapters/synchronization.html#synchronization-submission-order).
If `flags` does not include [VK_QUERY_RESULT_WAIT_BIT](VkQueryResultFlagBits.html),
[vkCmdEndQuery](vkCmdEndQuery.html),
[vkCmdEndQueryIndexedEXT](vkCmdEndQueryIndexedEXT.html),
[vkCmdWriteAccelerationStructuresPropertiesKHR](vkCmdWriteAccelerationStructuresPropertiesKHR.html),
[vkCmdWriteAccelerationStructuresPropertiesNV](vkCmdWriteAccelerationStructuresPropertiesNV.html),
[vkCmdWriteMicromapsPropertiesEXT](vkCmdWriteMicromapsPropertiesEXT.html),
[vkCmdWriteTimestamp2](vkCmdWriteTimestamp2.html),
and [vkCmdWriteTimestamp](vkCmdWriteTimestamp.html) are excluded from this scope.

The second [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)
includes all commands which reference the queries in `queryPool`
indicated by `query` that occur later in
[submission order](../../../../spec/latest/chapters/synchronization.html#synchronization-submission-order).

The operation of this command happens after the first scope and happens
before the second scope.

`vkCmdCopyQueryPoolResults` is considered to be a transfer operation,
and its writes to buffer memory **must** be synchronized using
[VK_PIPELINE_STAGE_TRANSFER_BIT](VkPipelineStageFlagBits.html) and [VK_ACCESS_TRANSFER_WRITE_BIT](VkAccessFlagBits.html)
before using the results.

Valid Usage

* 
[](#VUID-vkCmdCopyQueryPoolResults-firstQuery-09436) VUID-vkCmdCopyQueryPoolResults-firstQuery-09436

`firstQuery` **must** be less than the number of queries in
`queryPool`

* 
[](#VUID-vkCmdCopyQueryPoolResults-firstQuery-09437) VUID-vkCmdCopyQueryPoolResults-firstQuery-09437

The sum of `firstQuery` and `queryCount` **must** be less than or
equal to the number of queries in `queryPool`

* 
[](#VUID-vkCmdCopyQueryPoolResults-queryCount-09438) VUID-vkCmdCopyQueryPoolResults-queryCount-09438

If `queryCount` is greater than 1, `stride` **must** not be zero

* 
[](#VUID-vkCmdCopyQueryPoolResults-queryType-09439) VUID-vkCmdCopyQueryPoolResults-queryType-09439

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_TIMESTAMP](VkQueryType.html), `flags` **must** not contain
[VK_QUERY_RESULT_PARTIAL_BIT](VkQueryResultFlagBits.html)

* 
[](#VUID-vkCmdCopyQueryPoolResults-queryType-09440) VUID-vkCmdCopyQueryPoolResults-queryType-09440

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](VkQueryType.html), `flags` **must** not
contain [VK_QUERY_RESULT_WITH_AVAILABILITY_BIT](VkQueryResultFlagBits.html),
[VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](VkQueryResultFlagBits.html),
[VK_QUERY_RESULT_PARTIAL_BIT](VkQueryResultFlagBits.html), or [VK_QUERY_RESULT_64_BIT](VkQueryResultFlagBits.html)

* 
[](#VUID-vkCmdCopyQueryPoolResults-queryType-09441) VUID-vkCmdCopyQueryPoolResults-queryType-09441

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](VkQueryType.html), the `queryPool` **must**
have been recorded once for each pass as retrieved via a call to
[vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR](vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR.html)

* 
[](#VUID-vkCmdCopyQueryPoolResults-queryType-11874) VUID-vkCmdCopyQueryPoolResults-queryType-11874

If the `queryType` used to create `queryPool` was not
[VK_QUERY_TYPE_RESULT_STATUS_ONLY_KHR](VkQueryType.html)
or [VK_QUERY_TYPE_VIDEO_ENCODE_FEEDBACK_KHR](VkQueryType.html),
then `flags` **must** not include
[VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](VkQueryResultFlagBits.html)

* 
[](#VUID-vkCmdCopyQueryPoolResults-queryType-09442) VUID-vkCmdCopyQueryPoolResults-queryType-09442

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_RESULT_STATUS_ONLY_KHR](VkQueryType.html), then `flags` **must**
include [VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](VkQueryResultFlagBits.html)

* 
[](#VUID-vkCmdCopyQueryPoolResults-flags-09443) VUID-vkCmdCopyQueryPoolResults-flags-09443

If `flags` includes [VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](VkQueryResultFlagBits.html),
then it **must** not include [VK_QUERY_RESULT_WITH_AVAILABILITY_BIT](VkQueryResultFlagBits.html)

* 
[](#VUID-vkCmdCopyQueryPoolResults-None-09402) VUID-vkCmdCopyQueryPoolResults-None-09402

All queries used by the command **must** not be uninitialized when the
command is executed

* 
[](#VUID-vkCmdCopyQueryPoolResults-dstOffset-00819) VUID-vkCmdCopyQueryPoolResults-dstOffset-00819

`dstOffset` **must** be less than the size of `dstBuffer`

* 
[](#VUID-vkCmdCopyQueryPoolResults-flags-00822) VUID-vkCmdCopyQueryPoolResults-flags-00822

If [VK_QUERY_RESULT_64_BIT](VkQueryResultFlagBits.html) is not set in `flags` then
`dstOffset` **must** be a multiple of `4`

* 
[](#VUID-vkCmdCopyQueryPoolResults-queryCount-12254) VUID-vkCmdCopyQueryPoolResults-queryCount-12254

If `queryCount` is greater than 1 and [VK_QUERY_RESULT_64_BIT](VkQueryResultFlagBits.html)
is not set in `flags` then `stride` **must** be a multiple of `4`

* 
[](#VUID-vkCmdCopyQueryPoolResults-flags-00823) VUID-vkCmdCopyQueryPoolResults-flags-00823

If [VK_QUERY_RESULT_64_BIT](VkQueryResultFlagBits.html) is set in `flags` then
`dstOffset` **must** be a multiple of `8`

* 
[](#VUID-vkCmdCopyQueryPoolResults-queryCount-12255) VUID-vkCmdCopyQueryPoolResults-queryCount-12255

If `queryCount` is greater than 1 and [VK_QUERY_RESULT_64_BIT](VkQueryResultFlagBits.html)
is set in `flags` then `stride` **must** be a multiple of `8`

* 
[](#VUID-vkCmdCopyQueryPoolResults-dstBuffer-00824) VUID-vkCmdCopyQueryPoolResults-dstBuffer-00824

`dstBuffer` **must** have enough storage, from `dstOffset`, to
contain the result of each query, as described
[here](../../../../spec/latest/chapters/queries.html#queries-operation-memorylayout)

* 
[](#VUID-vkCmdCopyQueryPoolResults-dstBuffer-00825) VUID-vkCmdCopyQueryPoolResults-dstBuffer-00825

`dstBuffer` **must** have been created with the
[VK_BUFFER_USAGE_TRANSFER_DST_BIT](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-vkCmdCopyQueryPoolResults-dstBuffer-00826) VUID-vkCmdCopyQueryPoolResults-dstBuffer-00826

If `dstBuffer` is non-sparse then it **must** be bound completely and
contiguously to a single `VkDeviceMemory` object

* 
[](#VUID-vkCmdCopyQueryPoolResults-queryType-03232) VUID-vkCmdCopyQueryPoolResults-queryType-03232

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](VkQueryType.html),
[VkPhysicalDevicePerformanceQueryPropertiesKHR](VkPhysicalDevicePerformanceQueryPropertiesKHR.html)::`allowCommandBufferQueryCopies`
**must** be [VK_TRUE](VK_TRUE.html)

* 
[](#VUID-vkCmdCopyQueryPoolResults-queryType-02734) VUID-vkCmdCopyQueryPoolResults-queryType-02734

[vkCmdCopyQueryPoolResults](#) **must** not be called if the
`queryType` used to create `queryPool` was
[VK_QUERY_TYPE_PERFORMANCE_QUERY_INTEL](VkQueryType.html)

* 
[](#VUID-vkCmdCopyQueryPoolResults-None-07429) VUID-vkCmdCopyQueryPoolResults-None-07429

All queries used by the command **must** not be active

* 
[](#VUID-vkCmdCopyQueryPoolResults-None-08752) VUID-vkCmdCopyQueryPoolResults-None-08752

All queries used by the command **must** have been made *available* by
prior executed commands

Valid Usage (Implicit)

* 
[](#VUID-vkCmdCopyQueryPoolResults-commandBuffer-parameter) VUID-vkCmdCopyQueryPoolResults-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdCopyQueryPoolResults-queryPool-parameter) VUID-vkCmdCopyQueryPoolResults-queryPool-parameter

 `queryPool` **must** be a valid [VkQueryPool](VkQueryPool.html) handle

* 
[](#VUID-vkCmdCopyQueryPoolResults-dstBuffer-parameter) VUID-vkCmdCopyQueryPoolResults-dstBuffer-parameter

 `dstBuffer` **must** be a valid [VkBuffer](VkBuffer.html) handle

* 
[](#VUID-vkCmdCopyQueryPoolResults-flags-parameter) VUID-vkCmdCopyQueryPoolResults-flags-parameter

 `flags` **must** be a valid combination of [VkQueryResultFlagBits](VkQueryResultFlagBits.html) values

* 
[](#VUID-vkCmdCopyQueryPoolResults-commandBuffer-recording) VUID-vkCmdCopyQueryPoolResults-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdCopyQueryPoolResults-commandBuffer-cmdpool) VUID-vkCmdCopyQueryPoolResults-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdCopyQueryPoolResults-renderpass) VUID-vkCmdCopyQueryPoolResults-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdCopyQueryPoolResults-suspended) VUID-vkCmdCopyQueryPoolResults-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdCopyQueryPoolResults-videocoding) VUID-vkCmdCopyQueryPoolResults-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdCopyQueryPoolResults-commonparent) VUID-vkCmdCopyQueryPoolResults-commonparent

 Each of `commandBuffer`, `dstBuffer`, and `queryPool` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

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

VK_QUEUE_GRAPHICS_BIT | Action |

Conditional Rendering

vkCmdCopyQueryPoolResults is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkBuffer](VkBuffer.html), [VkCommandBuffer](VkCommandBuffer.html), `VkDeviceSize`, [VkQueryPool](VkQueryPool.html), [VkQueryResultFlags](VkQueryResultFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#vkCmdCopyQueryPoolResults).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
