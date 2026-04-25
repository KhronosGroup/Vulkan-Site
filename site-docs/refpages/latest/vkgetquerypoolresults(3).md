# vkGetQueryPoolResults(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetQueryPoolResults.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetQueryPoolResults - Copy results of queries in a query pool to a host memory region

To retrieve status and results for a set of queries, call:

// Provided by VK_VERSION_1_0
VkResult vkGetQueryPoolResults(
    VkDevice                                    device,
    VkQueryPool                                 queryPool,
    uint32_t                                    firstQuery,
    uint32_t                                    queryCount,
    size_t                                      dataSize,
    void*                                       pData,
    VkDeviceSize                                stride,
    VkQueryResultFlags                          flags);

* 
`device` is the logical device that owns the query pool.

* 
`queryPool` is the query pool managing the queries containing the
desired results.

* 
`firstQuery` is the initial query index.

* 
`queryCount` is the number of queries to read.

* 
`dataSize` is the size in bytes of the buffer pointed to by
`pData`.

* 
`pData` is a pointer to an application-allocated buffer where the
results will be written

* 
`stride` is the stride in bytes between results for individual
queries within `pData`.

* 
`flags` is a bitmask of [VkQueryResultFlagBits](VkQueryResultFlagBits.html) specifying how
and when results are returned.

Any results written for a query are written according to
[a layout dependent on the query type](../../../../spec/latest/chapters/queries.html#queries-operation-memorylayout).

If no bits are set in `flags`, and all requested queries are in the
available state, results are written as an array of 32-bit unsigned integer
values.
Behavior when not all queries are available is described
[below](../../../../spec/latest/chapters/queries.html#queries-wait-bit-not-set).

If [VK_QUERY_RESULT_WITH_AVAILABILITY_BIT](VkQueryResultFlagBits.html) is set, results for all
queries in `queryPool` identified by `firstQuery` and
`queryCount` are copied to `pData`, along with an extra availability
or status
value written directly after the results of each query and interpreted as an
unsigned integer.
A value of zero indicates that the results are not yet available, otherwise
the query is complete and results are available.
The size of the availability
or status
values is 64 bits if [VK_QUERY_RESULT_64_BIT](VkQueryResultFlagBits.html) is set in `flags`.
Otherwise, it is 32 bits.

If [VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](VkQueryResultFlagBits.html) is set, results for all queries
in `queryPool` identified by `firstQuery` and `queryCount` are
copied to `pData`, along with an extra status value written directly
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

|  | If [VK_QUERY_RESULT_WITH_AVAILABILITY_BIT](VkQueryResultFlagBits.html)
| --- | --- |
or [VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](VkQueryResultFlagBits.html)
is set, the layout of data in the buffer is a *(result,availability)*
or *(result,status)*
pair for each query returned, and `stride` is the stride between each
pair. |

Results for any available query written by this command are final and
represent the final result of the query.
If [VK_QUERY_RESULT_PARTIAL_BIT](VkQueryResultFlagBits.html) is set, then for any query that is
unavailable, an intermediate result between zero and the final result value
is written for that query.
Otherwise, any result written by this command is **undefined**.

If [VK_QUERY_RESULT_64_BIT](VkQueryResultFlagBits.html) is set, results and, if returned,
availability
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

If [VK_QUERY_RESULT_WAIT_BIT](VkQueryResultFlagBits.html) is set, this command defines an execution
dependency with any earlier commands that writes one of the identified
queries.
The first [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)
includes all instances of [vkCmdEndQuery](vkCmdEndQuery.html),
[vkCmdEndQueryIndexedEXT](vkCmdEndQueryIndexedEXT.html),
[vkCmdWriteAccelerationStructuresPropertiesKHR](vkCmdWriteAccelerationStructuresPropertiesKHR.html),
[vkCmdWriteAccelerationStructuresPropertiesNV](vkCmdWriteAccelerationStructuresPropertiesNV.html),
[vkCmdWriteMicromapsPropertiesEXT](vkCmdWriteMicromapsPropertiesEXT.html),
[vkCmdWriteTimestamp2](vkCmdWriteTimestamp2.html),
and [vkCmdWriteTimestamp](vkCmdWriteTimestamp.html) that reference any query in `queryPool`
indicated by `firstQuery` and `queryCount`.
The second [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)
includes the host operations of this command.

If [VK_QUERY_RESULT_WAIT_BIT](VkQueryResultFlagBits.html) is not set, `vkGetQueryPoolResults`
**may** return [VK_NOT_READY](VkResult.html) if there are queries in the unavailable
state.

|  | Applications **must** take care to ensure that use of the
| --- | --- |
[VK_QUERY_RESULT_WAIT_BIT](VkQueryResultFlagBits.html) bit has the desired effect.

For example, if a query has been used previously and a command buffer
records the commands `vkCmdResetQueryPool`, `vkCmdBeginQuery`, and
`vkCmdEndQuery` for that query, then the query will remain in the
available state until
`vkResetQueryPool` is called or
the `vkCmdResetQueryPool` command executes on a queue.
Applications **can** use fences or events to ensure that a query has already
been reset before checking for its results or availability status.
Otherwise, a stale value could be returned from a previous use of the query.

The above also applies when [VK_QUERY_RESULT_WAIT_BIT](VkQueryResultFlagBits.html) is used in
combination with [VK_QUERY_RESULT_WITH_AVAILABILITY_BIT](VkQueryResultFlagBits.html).
In this case, the returned availability status **may** reflect the result of a
previous use of the query unless
`vkResetQueryPool` is called or
the `vkCmdResetQueryPool` command has been executed since the last use
of the query.

A similar situation can arise with the
[VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](VkQueryResultFlagBits.html) flag. |

|  | Applications **can** double-buffer query pool usage, with a pool per frame, and
| --- | --- |
reset queries at the end of the frame in which they are read. |

Valid Usage

* 
[](#VUID-vkGetQueryPoolResults-firstQuery-09436) VUID-vkGetQueryPoolResults-firstQuery-09436

`firstQuery` **must** be less than the number of queries in
`queryPool`

* 
[](#VUID-vkGetQueryPoolResults-firstQuery-09437) VUID-vkGetQueryPoolResults-firstQuery-09437

The sum of `firstQuery` and `queryCount` **must** be less than or
equal to the number of queries in `queryPool`

* 
[](#VUID-vkGetQueryPoolResults-queryCount-09438) VUID-vkGetQueryPoolResults-queryCount-09438

If `queryCount` is greater than 1, `stride` **must** not be zero

* 
[](#VUID-vkGetQueryPoolResults-queryType-09439) VUID-vkGetQueryPoolResults-queryType-09439

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_TIMESTAMP](VkQueryType.html), `flags` **must** not contain
[VK_QUERY_RESULT_PARTIAL_BIT](VkQueryResultFlagBits.html)

* 
[](#VUID-vkGetQueryPoolResults-queryType-09440) VUID-vkGetQueryPoolResults-queryType-09440

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](VkQueryType.html), `flags` **must** not
contain [VK_QUERY_RESULT_WITH_AVAILABILITY_BIT](VkQueryResultFlagBits.html),
[VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](VkQueryResultFlagBits.html),
[VK_QUERY_RESULT_PARTIAL_BIT](VkQueryResultFlagBits.html), or [VK_QUERY_RESULT_64_BIT](VkQueryResultFlagBits.html)

* 
[](#VUID-vkGetQueryPoolResults-queryType-09441) VUID-vkGetQueryPoolResults-queryType-09441

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](VkQueryType.html), the `queryPool` **must**
have been recorded once for each pass as retrieved via a call to
[vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR](vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR.html)

* 
[](#VUID-vkGetQueryPoolResults-queryType-11874) VUID-vkGetQueryPoolResults-queryType-11874

If the `queryType` used to create `queryPool` was not
[VK_QUERY_TYPE_RESULT_STATUS_ONLY_KHR](VkQueryType.html)
or [VK_QUERY_TYPE_VIDEO_ENCODE_FEEDBACK_KHR](VkQueryType.html),
then `flags` **must** not include
[VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](VkQueryResultFlagBits.html)

* 
[](#VUID-vkGetQueryPoolResults-queryType-09442) VUID-vkGetQueryPoolResults-queryType-09442

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_RESULT_STATUS_ONLY_KHR](VkQueryType.html), then `flags` **must**
include [VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](VkQueryResultFlagBits.html)

* 
[](#VUID-vkGetQueryPoolResults-flags-09443) VUID-vkGetQueryPoolResults-flags-09443

If `flags` includes [VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](VkQueryResultFlagBits.html),
then it **must** not include [VK_QUERY_RESULT_WITH_AVAILABILITY_BIT](VkQueryResultFlagBits.html)

* 
[](#VUID-vkGetQueryPoolResults-None-09401) VUID-vkGetQueryPoolResults-None-09401

All queries used by the command **must** not be uninitialized

* 
[](#VUID-vkGetQueryPoolResults-flags-02828) VUID-vkGetQueryPoolResults-flags-02828

If [VK_QUERY_RESULT_64_BIT](VkQueryResultFlagBits.html) is not set in `flags`
and the `queryType` used to create `queryPool` was not
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](VkQueryType.html),
then `pData` **must** be aligned to a multiple of `4`

* 
[](#VUID-vkGetQueryPoolResults-queryCount-12251) VUID-vkGetQueryPoolResults-queryCount-12251

If `queryCount` is greater than 1, [VK_QUERY_RESULT_64_BIT](VkQueryResultFlagBits.html) is
not set in `flags`
and the `queryType` used to create `queryPool` was not
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](VkQueryType.html),
then `stride` **must** be a multiple of `4`

* 
[](#VUID-vkGetQueryPoolResults-flags-00815) VUID-vkGetQueryPoolResults-flags-00815

If [VK_QUERY_RESULT_64_BIT](VkQueryResultFlagBits.html) is set in `flags` then `pData`
**must** be aligned to a multiple of `8`

* 
[](#VUID-vkGetQueryPoolResults-queryCount-12252) VUID-vkGetQueryPoolResults-queryCount-12252

If `queryCount` is greater than 1 and [VK_QUERY_RESULT_64_BIT](VkQueryResultFlagBits.html)
is set in `flags`, then `stride` **must** be a multiple of `8`

* 
[](#VUID-vkGetQueryPoolResults-stride-08993) VUID-vkGetQueryPoolResults-stride-08993

    If `queryCount` is greater than 1 and
    [VK_QUERY_RESULT_WITH_AVAILABILITY_BIT](VkQueryResultFlagBits.html) is set, `stride` **must**
    be large enough to contain the unsigned integer representing
    availability
or status
    in addition to the query result

* 
[](#VUID-vkGetQueryPoolResults-queryType-03229) VUID-vkGetQueryPoolResults-queryType-03229

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](VkQueryType.html), then `pData` **must** be
aligned to a multiple of the size of [VkPerformanceCounterResultKHR](VkPerformanceCounterResultKHR.html)

* 
[](#VUID-vkGetQueryPoolResults-queryCount-12253) VUID-vkGetQueryPoolResults-queryCount-12253

If `queryCount` is greater than 1 and the `queryType` used to
create `queryPool` was [VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](VkQueryType.html),
then `stride` **must** be a multiple of the size of
[VkPerformanceCounterResultKHR](VkPerformanceCounterResultKHR.html)

* 
[](#VUID-vkGetQueryPoolResults-queryType-04519) VUID-vkGetQueryPoolResults-queryType-04519

If `queryCount` is greater than 1 and the `queryType` used to
create `queryPool` was [VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](VkQueryType.html),
then `stride` **must** be large enough to contain the
[VkQueryPoolPerformanceCreateInfoKHR](VkQueryPoolPerformanceCreateInfoKHR.html)::`counterIndexCount` used
to create `queryPool` times the size of
[VkPerformanceCounterResultKHR](VkPerformanceCounterResultKHR.html)

* 
[](#VUID-vkGetQueryPoolResults-dataSize-00817) VUID-vkGetQueryPoolResults-dataSize-00817

`dataSize` **must** be large enough to contain the result of each
query, as described [here](../../../../spec/latest/chapters/queries.html#queries-operation-memorylayout)

Valid Usage (Implicit)

* 
[](#VUID-vkGetQueryPoolResults-device-parameter) VUID-vkGetQueryPoolResults-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetQueryPoolResults-queryPool-parameter) VUID-vkGetQueryPoolResults-queryPool-parameter

 `queryPool` **must** be a valid [VkQueryPool](VkQueryPool.html) handle

* 
[](#VUID-vkGetQueryPoolResults-pData-parameter) VUID-vkGetQueryPoolResults-pData-parameter

 `pData` **must** be a valid pointer to an array of `dataSize` bytes

* 
[](#VUID-vkGetQueryPoolResults-flags-parameter) VUID-vkGetQueryPoolResults-flags-parameter

 `flags` **must** be a valid combination of [VkQueryResultFlagBits](VkQueryResultFlagBits.html) values

* 
[](#VUID-vkGetQueryPoolResults-dataSize-arraylength) VUID-vkGetQueryPoolResults-dataSize-arraylength

 `dataSize` **must** be greater than `0`

* 
[](#VUID-vkGetQueryPoolResults-queryPool-parent) VUID-vkGetQueryPoolResults-queryPool-parent

 `queryPool` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_NOT_READY](VkResult.html)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_DEVICE_LOST](VkResult.html)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDevice](VkDevice.html), `VkDeviceSize`, [VkQueryPool](VkQueryPool.html), [VkQueryResultFlags](VkQueryResultFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#vkGetQueryPoolResults).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
