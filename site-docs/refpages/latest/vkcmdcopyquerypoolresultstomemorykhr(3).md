# vkCmdCopyQueryPoolResultsToMemoryKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdCopyQueryPoolResultsToMemoryKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdCopyQueryPoolResultsToMemoryKHR - Copy the results of queries in a query pool to a memory range

To copy query statuses and numerical results directly to buffer memory,
call:

// Provided by VK_KHR_device_address_commands
void vkCmdCopyQueryPoolResultsToMemoryKHR(
    VkCommandBuffer                             commandBuffer,
    VkQueryPool                                 queryPool,
    uint32_t                                    firstQuery,
    uint32_t                                    queryCount,
    const VkStridedDeviceAddressRangeKHR*       pDstRange,
    VkAddressCommandFlagsKHR                    dstFlags,
    VkQueryResultFlags                          queryResultFlags);

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
`pDstRange` is a pointer to a [VkStridedDeviceAddressRangeKHR](VkStridedDeviceAddressRangeKHR.html)
describing a range of memory addressed with a stride that will receive
the results of the copy command.

* 
`dstFlags` is a [VkAddressCommandFlagsKHR](VkAddressCommandFlagsKHR.html) value defining the
flags for the destination address range.

* 
`queryResultFlags` is a bitmask of [VkQueryResultFlagBits](VkQueryResultFlagBits.html)
specifying how and when results are returned.

Any results written for a query are written according to
[a layout dependent on the query type](../../../../spec/latest/chapters/queries.html#queries-operation-memorylayout).

Results for any query in `queryPool` identified by `firstQuery` and
`queryCount` that is available are copied to `pDstRange`.

If [VK_QUERY_RESULT_WITH_AVAILABILITY_BIT](VkQueryResultFlagBits.html) is set, results for all
queries in `queryPool` identified by `firstQuery` and
`queryCount` are copied to `pDstRange`, along with an extra
availability value written directly after the results of each query and
interpreted as an unsigned integer.
A value of zero indicates that the results are not yet available, otherwise
the query is complete and results are available.

If [VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](VkQueryResultFlagBits.html) is set, results for all queries
in `queryPool` identified by `firstQuery` and `queryCount` are
copied to `pDstRange`, along with an extra status value written directly
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
[vkCmdEndQueryIndexedEXT](vkCmdEndQueryIndexedEXT.html),
[vkCmdWriteTimestamp2](vkCmdWriteTimestamp2.html),
[vkCmdEndQuery](vkCmdEndQuery.html), and [vkCmdWriteTimestamp](vkCmdWriteTimestamp.html) are excluded from this
scope.

The second [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)
includes all commands which reference the queries in `queryPool`
indicated by `query` that occur later in
[submission order](../../../../spec/latest/chapters/synchronization.html#synchronization-submission-order).

The operation of this command happens after the first scope and happens
before the second scope.

`vkCmdCopyQueryPoolResultsToMemoryKHR` is considered to be a transfer
operation, and its writes to buffer memory **must** be synchronized using
[VK_PIPELINE_STAGE_TRANSFER_BIT](VkPipelineStageFlagBits.html) and [VK_ACCESS_TRANSFER_WRITE_BIT](VkAccessFlagBits.html)
before using the results.

Valid Usage

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-13097) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-13097

If the range specified by `pDstRange` is not bound completely
to memory when accessed, `dstFlags` **must** not include
[VK_ADDRESS_COMMAND_FULLY_BOUND_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-13098) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-13098

If the buffer from which the range specified by `pDstRange` was
created with [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html), and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstFlags` **must** include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-13099) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-13099

If the buffer from which the range specified by `pDstRange` was
created without [VK_BUFFER_CREATE_PROTECTED_BIT](VkBufferCreateFlagBits.html), and
[`protectedNoFault`](../../../../spec/latest/chapters/devsandqueues.html#limits-protectedNoFault) is not supported,
`dstFlags` **must** not include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-dstFlags-13100) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-dstFlags-13100

`dstFlags` **must** not include both
[VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) and
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-13122) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-13122

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `pDstRange`, was created with
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html), `dstFlags` **must**
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) or
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-13123) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-13123

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `pDstRange`, was created without
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html), `dstFlags` **must** not
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-dstFlags-13101) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-dstFlags-13101

`dstFlags` **must** not include both
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) and
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-13124) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-13124

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `pDstRange`, was created with
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html),
`dstFlags` **must** include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html) or
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-13125) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-13125

If any buffer, which is bound to a range of [VkDeviceMemory](VkDeviceMemory.html) that
overlaps the range backing `pDstRange`, was created without
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](VkBufferUsageFlagBits.html),
`dstFlags` **must** not include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-firstQuery-09436) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-firstQuery-09436

`firstQuery` **must** be less than the number of queries in
`queryPool`

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-firstQuery-09437) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-firstQuery-09437

The sum of `firstQuery` and `queryCount` **must** be less than or
equal to the number of queries in `queryPool`

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-queryCount-09438) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-queryCount-09438

If `queryCount` is greater than 1, `stride` **must** not be zero

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-queryType-09439) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-queryType-09439

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_TIMESTAMP](VkQueryType.html), `queryResultFlags` **must** not contain
[VK_QUERY_RESULT_PARTIAL_BIT](VkQueryResultFlagBits.html)

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-queryType-09440) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-queryType-09440

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](VkQueryType.html), `queryResultFlags` **must** not
contain [VK_QUERY_RESULT_WITH_AVAILABILITY_BIT](VkQueryResultFlagBits.html),
[VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](VkQueryResultFlagBits.html),
[VK_QUERY_RESULT_PARTIAL_BIT](VkQueryResultFlagBits.html), or [VK_QUERY_RESULT_64_BIT](VkQueryResultFlagBits.html)

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-queryType-09441) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-queryType-09441

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](VkQueryType.html), the `queryPool` **must**
have been recorded once for each pass as retrieved via a call to
[vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR](vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR.html)

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-queryType-11874) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-queryType-11874

If the `queryType` used to create `queryPool` was not
[VK_QUERY_TYPE_RESULT_STATUS_ONLY_KHR](VkQueryType.html)
or [VK_QUERY_TYPE_VIDEO_ENCODE_FEEDBACK_KHR](VkQueryType.html),
then `queryResultFlags` **must** not include
[VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](VkQueryResultFlagBits.html)

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-queryType-09442) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-queryType-09442

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_RESULT_STATUS_ONLY_KHR](VkQueryType.html), then `queryResultFlags` **must**
include [VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](VkQueryResultFlagBits.html)

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-flags-09443) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-flags-09443

If `queryResultFlags` includes [VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](VkQueryResultFlagBits.html),
then it **must** not include [VK_QUERY_RESULT_WITH_AVAILABILITY_BIT](VkQueryResultFlagBits.html)

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-None-13076) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-None-13076

All queries used by the command **must** not be uninitialized when the
command is executed

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-flags-13077) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-flags-13077

If [VK_QUERY_RESULT_64_BIT](VkQueryResultFlagBits.html) is not set in `flags` then
`pDstRange->address` and `pDstRange->stride` **must** be multiples
of 4

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-flags-13078) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-flags-13078

If [VK_QUERY_RESULT_64_BIT](VkQueryResultFlagBits.html) is set in `flags` then
`pDstRange->address` and `pDstRange->stride` **must** be multiples
of 8

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-13079) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-13079

`pDstRange->size` **must** be large enough to contain the result of
each query, as described [here](../../../../spec/latest/chapters/queries.html#queries-operation-memorylayout)

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-13080) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-13080

The buffer from which the range defined by `pDstRange` was queried
**must** have been created with [VK_BUFFER_USAGE_TRANSFER_DST_BIT](VkBufferUsageFlagBits.html)
usage flag

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-queryType-13081) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-queryType-13081

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](VkQueryType.html),
[VkPhysicalDevicePerformanceQueryPropertiesKHR](VkPhysicalDevicePerformanceQueryPropertiesKHR.html)::`allowCommandBufferQueryCopies`
**must** be [VK_TRUE](VK_TRUE.html)

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-queryType-13082) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-queryType-13082

`vkCmdCopyQueryPoolResultsToMemoryKHR` **must** not be called if the
`queryType` used to create `queryPool` was
[VK_QUERY_TYPE_PERFORMANCE_QUERY_INTEL](VkQueryType.html)

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-None-13083) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-None-13083

All queries used by the command **must** not be active

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-None-13084) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-None-13084

All queries used by the command **must** have been made *available* by
prior executed commands

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-dstFlags-13085) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-dstFlags-13085

`dstFlags` **must** not include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](VkAddressCommandFlagBitsKHR.html)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-commandBuffer-parameter) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-queryPool-parameter) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-queryPool-parameter

 `queryPool` **must** be a valid [VkQueryPool](VkQueryPool.html) handle

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-parameter) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-parameter

 `pDstRange` **must** be a valid pointer to a valid [VkStridedDeviceAddressRangeKHR](VkStridedDeviceAddressRangeKHR.html) structure

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-dstFlags-parameter) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-dstFlags-parameter

 `dstFlags` **must** be a valid combination of [VkAddressCommandFlagBitsKHR](VkAddressCommandFlagBitsKHR.html) values

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-queryResultFlags-parameter) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-queryResultFlags-parameter

 `queryResultFlags` **must** be a valid combination of [VkQueryResultFlagBits](VkQueryResultFlagBits.html) values

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-commandBuffer-recording) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-commandBuffer-cmdpool) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_TRANSFER_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-renderpass) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-renderpass

 This command **must** only be called outside of a render pass instance

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-suspended) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-videocoding) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-commonparent) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-commonparent

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

Secondary | Outside | Outside | VK_QUEUE_TRANSFER_BIT | Action |

Conditional Rendering

vkCmdCopyQueryPoolResultsToMemoryKHR is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_KHR_device_address_commands](VK_KHR_device_address_commands.html), [VkAddressCommandFlagsKHR](VkAddressCommandFlagsKHR.html), [VkCommandBuffer](VkCommandBuffer.html), [VkQueryPool](VkQueryPool.html), [VkQueryResultFlags](VkQueryResultFlags.html), [VkStridedDeviceAddressRangeKHR](VkStridedDeviceAddressRangeKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#vkCmdCopyQueryPoolResultsToMemoryKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
