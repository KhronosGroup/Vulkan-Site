# vkCmdBeginQuery(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdBeginQuery.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdBeginQuery - Begin a query

To begin a query, call:

// Provided by VK_VERSION_1_0
void vkCmdBeginQuery(
    VkCommandBuffer                             commandBuffer,
    VkQueryPool                                 queryPool,
    uint32_t                                    query,
    VkQueryControlFlags                         flags);

* 
`commandBuffer` is the command buffer into which this command will
be recorded.

* 
`queryPool` is the query pool that will manage the results of the
query.

* 
`query` is the query index within the query pool that will contain
the results.

* 
`flags` is a bitmask of [VkQueryControlFlagBits](VkQueryControlFlagBits.html) specifying
constraints on the types of queries that **can** be performed.

If the `queryType` of the pool is [VK_QUERY_TYPE_OCCLUSION](VkQueryType.html) and
`flags` contains [VK_QUERY_CONTROL_PRECISE_BIT](VkQueryControlFlagBits.html), an implementation
**must** return a result that matches the actual number of samples passed.
This is described in more detail in [Occlusion Queries](../../../../spec/latest/chapters/queries.html#queries-occlusion).

Calling `vkCmdBeginQuery` is equivalent to calling
[vkCmdBeginQueryIndexedEXT](vkCmdBeginQueryIndexedEXT.html) with the `index` parameter set to zero.

After beginning a query, that query is considered *active* within the
command buffer it was called in until that same query is ended.
Queries active in a primary command buffer when secondary command buffers
are executed are considered active for those secondary command buffers.

Furthermore, if the query is started within a video coding scope, the
following command buffer states are initialized for the query type:

* 
 The *active_query_index* is set
to the value specified by `query`.

* 
 The *last activatable
query index* is also set to the value specified by `query`.

Each [video coding operation](../../../../spec/latest/chapters/videocoding.html#video-coding) stores a result to the query
corresponding to the current active query index, followed by incrementing
the active query index.
If the active query index gets incremented past the last activatable query
index, issuing any further video coding operations results in **undefined**
behavior.

|  | In practice, this means that currently no more than a single video coding
| --- | --- |
operation **must** be issued between a begin and end query pair. |

This command defines an execution dependency between other query commands
that reference the same query.

The first [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)
includes all commands which reference the queries in `queryPool`
indicated by `query` that occur earlier in
[submission order](../../../../spec/latest/chapters/synchronization.html#synchronization-submission-order).

The second [synchronization scope](../../../../spec/latest/chapters/synchronization.html#synchronization-dependencies-scopes)
includes all commands which reference the queries in `queryPool`
indicated by `query` that occur later in
[submission order](../../../../spec/latest/chapters/synchronization.html#synchronization-submission-order).

The operation of this command happens after the first scope and happens
before the second scope.

Valid Usage

* 
[](#VUID-vkCmdBeginQuery-None-00807) VUID-vkCmdBeginQuery-None-00807

All queries used by the command **must** be *unavailable*

* 
[](#VUID-vkCmdBeginQuery-queryType-02804) VUID-vkCmdBeginQuery-queryType-02804

The `queryType` used to create `queryPool` **must** not be
[VK_QUERY_TYPE_TIMESTAMP](VkQueryType.html)

* 
[](#VUID-vkCmdBeginQuery-queryType-04728) VUID-vkCmdBeginQuery-queryType-04728

The `queryType` used to create `queryPool` **must** not be
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_COMPACTED_SIZE_KHR](VkQueryType.html) or
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_SIZE_KHR](VkQueryType.html)

* 
[](#VUID-vkCmdBeginQuery-queryType-06741) VUID-vkCmdBeginQuery-queryType-06741

The `queryType` used to create `queryPool` **must** not be
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SIZE_KHR](VkQueryType.html) or
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_BOTTOM_LEVEL_POINTERS_KHR](VkQueryType.html)

* 
[](#VUID-vkCmdBeginQuery-queryType-04729) VUID-vkCmdBeginQuery-queryType-04729

The `queryType` used to create `queryPool` **must** not be
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_COMPACTED_SIZE_NV](VkQueryType.html)

* 
[](#VUID-vkCmdBeginQuery-queryType-00800) VUID-vkCmdBeginQuery-queryType-00800

If the [`occlusionQueryPrecise`](../../../../spec/latest/chapters/features.html#features-occlusionQueryPrecise)
feature is not enabled, or the `queryType` used to create
`queryPool` was not [VK_QUERY_TYPE_OCCLUSION](VkQueryType.html), `flags` **must**
not contain [VK_QUERY_CONTROL_PRECISE_BIT](VkQueryControlFlagBits.html)

* 
[](#VUID-vkCmdBeginQuery-query-00802) VUID-vkCmdBeginQuery-query-00802

`query` **must** be less than the number of queries in `queryPool`

* 
[](#VUID-vkCmdBeginQuery-queryType-00803) VUID-vkCmdBeginQuery-queryType-00803

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_OCCLUSION](VkQueryType.html), the `VkCommandPool` that
`commandBuffer` was allocated from **must** support graphics operations

* 
[](#VUID-vkCmdBeginQuery-queryType-00804) VUID-vkCmdBeginQuery-queryType-00804

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_PIPELINE_STATISTICS](VkQueryType.html) and any of the
`pipelineStatistics` indicate graphics operations, the
`VkCommandPool` that `commandBuffer` was allocated from **must**
support graphics operations

* 
[](#VUID-vkCmdBeginQuery-queryType-00805) VUID-vkCmdBeginQuery-queryType-00805

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_PIPELINE_STATISTICS](VkQueryType.html) and any of the
`pipelineStatistics` indicate compute operations, the
`VkCommandPool` that `commandBuffer` was allocated from **must**
support compute operations

* 
[](#VUID-vkCmdBeginQuery-commandBuffer-01885) VUID-vkCmdBeginQuery-commandBuffer-01885

`commandBuffer` **must** not be a protected command buffer

* 
[](#VUID-vkCmdBeginQuery-query-00808) VUID-vkCmdBeginQuery-query-00808

If called within a render pass instance, the sum of `query` and the
number of bits set in the current subpass’s view mask **must** be less than
or equal to the number of queries in `queryPool`

* 
[](#VUID-vkCmdBeginQuery-queryType-07126) VUID-vkCmdBeginQuery-queryType-07126

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_RESULT_STATUS_ONLY_KHR](VkQueryType.html), then the `VkCommandPool`
that `commandBuffer` was allocated from **must** have been created with
a queue family index that supports [result    status queries](../../../../spec/latest/chapters/queries.html#queries-result-status-only), as indicated by
[VkQueueFamilyQueryResultStatusPropertiesKHR](VkQueueFamilyQueryResultStatusPropertiesKHR.html)::`queryResultStatusSupport`

* 
[](#VUID-vkCmdBeginQuery-None-07127) VUID-vkCmdBeginQuery-None-07127

If there is a bound video session, then there **must** be no
[active](../../../../spec/latest/chapters/queries.html#queries-operation-active) queries

* 
[](#VUID-vkCmdBeginQuery-None-08370) VUID-vkCmdBeginQuery-None-08370

If there is a bound video session, then it **must** not have been created
with [VK_VIDEO_SESSION_CREATE_INLINE_QUERIES_BIT_KHR](VkVideoSessionCreateFlagBitsKHR.html)

* 
[](#VUID-vkCmdBeginQuery-queryType-07128) VUID-vkCmdBeginQuery-queryType-07128

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_RESULT_STATUS_ONLY_KHR](VkQueryType.html) and there is a bound video
session, then `queryPool` **must** have been created with a
[VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html) structure included in the `pNext` chain
of [VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html) identical to the one specified in
[VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html)::`pVideoProfile` the bound video
session was created with

* 
[](#VUID-vkCmdBeginQuery-queryType-07129) VUID-vkCmdBeginQuery-queryType-07129

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_VIDEO_ENCODE_FEEDBACK_KHR](VkQueryType.html), then there **must** be a
bound video session

* 
[](#VUID-vkCmdBeginQuery-queryType-07130) VUID-vkCmdBeginQuery-queryType-07130

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_VIDEO_ENCODE_FEEDBACK_KHR](VkQueryType.html) and there is a bound video
session, then `queryPool` **must** have been created with a
[VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html) structure included in the `pNext` chain
of [VkQueryPoolCreateInfo](VkQueryPoolCreateInfo.html) identical to the one specified in
[VkVideoSessionCreateInfoKHR](VkVideoSessionCreateInfoKHR.html)::`pVideoProfile` the bound video
session was created with

* 
[](#VUID-vkCmdBeginQuery-queryType-07131) VUID-vkCmdBeginQuery-queryType-07131

If the `queryType` used to create `queryPool` was not
[VK_QUERY_TYPE_RESULT_STATUS_ONLY_KHR](VkQueryType.html)
or [VK_QUERY_TYPE_VIDEO_ENCODE_FEEDBACK_KHR](VkQueryType.html),
then there **must** be no bound video session

* 
[](#VUID-vkCmdBeginQuery-None-10681) VUID-vkCmdBeginQuery-None-10681

This command **must** not be recorded when
[per-tile execution model](../../../../spec/latest/chapters/renderpass.html#renderpass-per-tile-execution-model) is
enabled

* 
[](#VUID-vkCmdBeginQuery-queryPool-01922) VUID-vkCmdBeginQuery-queryPool-01922

`queryPool` **must** have been created with a `queryType` that
differs from that of any queries that are
[active](../../../../spec/latest/chapters/queries.html#queries-operation-active) within `commandBuffer`

* 
[](#VUID-vkCmdBeginQuery-queryType-07070) VUID-vkCmdBeginQuery-queryType-07070

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_MESH_PRIMITIVES_GENERATED_EXT](VkQueryType.html) the
`VkCommandPool` that `commandBuffer` was allocated from **must**
support graphics operations

* 
[](#VUID-vkCmdBeginQuery-queryType-02327) VUID-vkCmdBeginQuery-queryType-02327

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_TRANSFORM_FEEDBACK_STREAM_EXT](VkQueryType.html) the
`VkCommandPool` that `commandBuffer` was allocated from **must**
support graphics operations

* 
[](#VUID-vkCmdBeginQuery-queryType-02328) VUID-vkCmdBeginQuery-queryType-02328

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_TRANSFORM_FEEDBACK_STREAM_EXT](VkQueryType.html) then
`VkPhysicalDeviceTransformFeedbackPropertiesEXT`::`transformFeedbackQueries`
**must** be supported

* 
[](#VUID-vkCmdBeginQuery-queryType-06687) VUID-vkCmdBeginQuery-queryType-06687

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_PRIMITIVES_GENERATED_EXT](VkQueryType.html) the `VkCommandPool`
that `commandBuffer` was allocated from **must** support graphics
operations

* 
[](#VUID-vkCmdBeginQuery-queryType-06688) VUID-vkCmdBeginQuery-queryType-06688

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_PRIMITIVES_GENERATED_EXT](VkQueryType.html) then
[`primitivesGeneratedQuery`](../../../../spec/latest/chapters/features.html#features-primitivesGeneratedQuery)
**must** be enabled

* 
[](#VUID-vkCmdBeginQuery-queryPool-07289) VUID-vkCmdBeginQuery-queryPool-07289

If `queryPool` was created with a `queryType` of
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](VkQueryType.html), then the
[VkQueryPoolPerformanceCreateInfoKHR](VkQueryPoolPerformanceCreateInfoKHR.html)::`queueFamilyIndex`
`queryPool` was created with **must** equal the queue family index of
the `VkCommandPool` that `commandBuffer` was allocated from

* 
[](#VUID-vkCmdBeginQuery-queryPool-03223) VUID-vkCmdBeginQuery-queryPool-03223

If `queryPool` was created with a `queryType` of
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](VkQueryType.html), the [    profiling lock](../../../../spec/latest/chapters/queries.html#profiling-lock) **must** have been held before [vkBeginCommandBuffer](vkBeginCommandBuffer.html)
was called on `commandBuffer`

* 
[](#VUID-vkCmdBeginQuery-queryPool-03224) VUID-vkCmdBeginQuery-queryPool-03224

If `queryPool` was created with a `queryType` of
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](VkQueryType.html) and one of the counters used
to create `queryPool` was
[VK_PERFORMANCE_COUNTER_SCOPE_COMMAND_BUFFER_KHR](VkPerformanceCounterScopeKHR.html), the query begin
**must** be the first recorded command in `commandBuffer`

* 
[](#VUID-vkCmdBeginQuery-queryPool-03225) VUID-vkCmdBeginQuery-queryPool-03225

If `queryPool` was created with a `queryType` of
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](VkQueryType.html) and one of the counters used
to create `queryPool` was
[VK_PERFORMANCE_COUNTER_SCOPE_RENDER_PASS_KHR](VkPerformanceCounterScopeKHR.html), the begin command
**must** not be recorded within a render pass instance

* 
[](#VUID-vkCmdBeginQuery-queryPool-03226) VUID-vkCmdBeginQuery-queryPool-03226

If `queryPool` was created with a `queryType` of
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](VkQueryType.html) and another query pool with a
`queryType` [VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](VkQueryType.html) has been used
within `commandBuffer`, its parent primary command buffer or
secondary command buffer recorded within the same parent primary command
buffer as `commandBuffer`, the
[    `performanceCounterMultipleQueryPools`](../../../../spec/latest/chapters/features.html#features-performanceCounterMultipleQueryPools) feature **must** be enabled

* 
[](#VUID-vkCmdBeginQuery-None-02863) VUID-vkCmdBeginQuery-None-02863

If `queryPool` was created with a `queryType` of
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](VkQueryType.html), this command **must** not be
recorded in a command buffer that, either directly or through secondary
command buffers, also contains a `vkCmdResetQueryPool` command
affecting the same query

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBeginQuery-commandBuffer-parameter) VUID-vkCmdBeginQuery-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdBeginQuery-queryPool-parameter) VUID-vkCmdBeginQuery-queryPool-parameter

 `queryPool` **must** be a valid [VkQueryPool](VkQueryPool.html) handle

* 
[](#VUID-vkCmdBeginQuery-flags-parameter) VUID-vkCmdBeginQuery-flags-parameter

 `flags` **must** be a valid combination of [VkQueryControlFlagBits](VkQueryControlFlagBits.html) values

* 
[](#VUID-vkCmdBeginQuery-commandBuffer-recording) VUID-vkCmdBeginQuery-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBeginQuery-commandBuffer-cmdpool) VUID-vkCmdBeginQuery-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html), [VK_QUEUE_VIDEO_DECODE_BIT_KHR](VkQueueFlagBits.html), or [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdBeginQuery-suspended) VUID-vkCmdBeginQuery-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdBeginQuery-commonparent) VUID-vkCmdBeginQuery-commonparent

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

vkCmdBeginQuery is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCommandBuffer](VkCommandBuffer.html), [VkQueryControlFlags](VkQueryControlFlags.html), [VkQueryPool](VkQueryPool.html), [vkCmdBeginQueryIndexedEXT](vkCmdBeginQueryIndexedEXT.html), [vkCmdEndQuery](vkCmdEndQuery.html), [vkCmdEndQueryIndexedEXT](vkCmdEndQueryIndexedEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#vkCmdBeginQuery).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
