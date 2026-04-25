# Queries

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/queries.html

## Table of Contents

- [Query Pools](#queries-pools)
- [Query Operation](#queries-operation)
- [Occlusion Queries](#queries-occlusion)
- [Pipeline Statistics Queries](#queries-pipestats)
- [Pipeline_Statistics_Queries](#queries-pipestats)
- [Timestamp Queries](#queries-timestamps)
- [Performance Queries](#queries-performance)
- [Profiling Lock](#profiling-lock)
- [Transform Feedback Queries](#queries-transform-feedback)
- [Transform_Feedback_Queries](#queries-transform-feedback)
- [Primitives Generated Queries](#queries-primitives-generated)
- [Primitives_Generated_Queries](#queries-primitives-generated)
- [Mesh Shader Queries](#queries-mesh-shader)
- [Mesh_Shader_Queries](#queries-mesh-shader)
- [Intel Performance Queries](#queries-performance-intel)
- [Intel_Performance_Queries](#queries-performance-intel)
- [Result Status Queries](#queries-result-status-only)
- [Result_Status_Queries](#queries-result-status-only)
- [Video Encode Feedback Queries](#queries-video-encode-feedback)
- [Video_Encode_Feedback_Queries](#queries-video-encode-feedback)

## Content

*Queries* provide a mechanism to return information about the processing of
a sequence of Vulkan commands.
Query operations are asynchronous, and as such, their results are not
returned immediately.
Instead, their results, and their availability status are stored in a
[Query Pool](#queries-pools).
The state of these queries **can** be read back on the host, or copied to a
buffer object on the device.

The supported query types are:

* 
[Occlusion Queries](#queries-occlusion)

* 
[Pipeline Statistics Queries](#queries-pipestats)

* 
[Timestamp Queries](#queries-timestamps)

* 
[Result Status Queries](#queries-result-status-only)

* 
[Video Encode Feedback Queries](#queries-video-encode-feedback)

* 
[Performance Queries](#queries-performance)

* 
[Transform Feedback Queries](#queries-transform-feedback)

* 
[Intel Performance Queries](#queries-performance-intel)

* 
[Mesh Shader Queries](#queries-mesh-shader)

Several additional queries with specific purposes associated with ray
tracing are available if the corresponding extensions are supported, as
described for [VkQueryType](#VkQueryType).

Queries are managed using *query pool* objects.
Each query pool is a collection of a specific number of queries of a
particular type.

Query pools are represented by `VkQueryPool` handles:

// Provided by VK_VERSION_1_0
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkQueryPool)

To create a query pool, call:

// Provided by VK_VERSION_1_0
VkResult vkCreateQueryPool(
    VkDevice                                    device,
    const VkQueryPoolCreateInfo*                pCreateInfo,
    const VkAllocationCallbacks*                pAllocator,
    VkQueryPool*                                pQueryPool);

* 
`device` is the logical device that creates the query pool.

* 
`pCreateInfo` is a pointer to a [VkQueryPoolCreateInfo](#VkQueryPoolCreateInfo)
structure containing the number and type of queries to be managed by the
pool.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

* 
`pQueryPool` is a pointer to a [VkQueryPool](#VkQueryPool) handle in which the
resulting query pool object is returned.

Valid Usage

* 
[](#VUID-vkCreateQueryPool-device-09663) VUID-vkCreateQueryPool-device-09663

`device` **must** support at least one queue family with one of the
[VK_QUEUE_VIDEO_ENCODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits),
[VK_QUEUE_VIDEO_DECODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits),
[VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) capabilities

Valid Usage (Implicit)

* 
[](#VUID-vkCreateQueryPool-device-parameter) VUID-vkCreateQueryPool-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkCreateQueryPool-pCreateInfo-parameter) VUID-vkCreateQueryPool-pCreateInfo-parameter

 `pCreateInfo` **must** be a valid pointer to a valid [VkQueryPoolCreateInfo](#VkQueryPoolCreateInfo) structure

* 
[](#VUID-vkCreateQueryPool-pAllocator-parameter) VUID-vkCreateQueryPool-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkCreateQueryPool-pQueryPool-parameter) VUID-vkCreateQueryPool-pQueryPool-parameter

 `pQueryPool` **must** be a valid pointer to a [VkQueryPool](#VkQueryPool) handle

* 
[](#VUID-vkCreateQueryPool-device-queuecount) VUID-vkCreateQueryPool-device-queuecount

 The device **must** have been created with at least `1` queue

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkQueryPoolCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkQueryPoolCreateInfo {
    VkStructureType                  sType;
    const void*                      pNext;
    VkQueryPoolCreateFlags           flags;
    VkQueryType                      queryType;
    uint32_t                         queryCount;
    VkQueryPipelineStatisticFlags    pipelineStatistics;
} VkQueryPoolCreateInfo;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkQueryPoolCreateFlagBits](#VkQueryPoolCreateFlagBits)

* 
`queryType` is a [VkQueryType](#VkQueryType) value specifying the type of
queries managed by the pool.

* 
`queryCount` is the number of queries managed by the pool.

* 
`pipelineStatistics`
is a bitmask of [VkQueryPipelineStatisticFlagBits](#VkQueryPipelineStatisticFlagBits) specifying which
counters will be returned in queries on the new pool, as described below
in [Pipeline Statistics Queries](#queries-pipestats).
`pipelineStatistics` is ignored if `queryType` is not
[VK_QUERY_TYPE_PIPELINE_STATISTICS](#VkQueryType).

Valid Usage

* 
[](#VUID-VkQueryPoolCreateInfo-queryType-00791) VUID-VkQueryPoolCreateInfo-queryType-00791

If the [    `pipelineStatisticsQuery`](features.html#features-pipelineStatisticsQuery) feature is not enabled, `queryType`
**must** not be [VK_QUERY_TYPE_PIPELINE_STATISTICS](#VkQueryType)

* 
[](#VUID-VkQueryPoolCreateInfo-meshShaderQueries-07068) VUID-VkQueryPoolCreateInfo-meshShaderQueries-07068

If the [`meshShaderQueries`](features.html#features-meshShaderQueries) feature
is not enabled, `queryType` **must** not be
[VK_QUERY_TYPE_MESH_PRIMITIVES_GENERATED_EXT](#VkQueryType)

* 
[](#VUID-VkQueryPoolCreateInfo-meshShaderQueries-07069) VUID-VkQueryPoolCreateInfo-meshShaderQueries-07069

If the [`meshShaderQueries`](features.html#features-meshShaderQueries) feature
is not enabled, and `queryType` is
[VK_QUERY_TYPE_PIPELINE_STATISTICS](#VkQueryType), `pipelineStatistics` **must**
not contain
[VK_QUERY_PIPELINE_STATISTIC_TASK_SHADER_INVOCATIONS_BIT_EXT](#VkQueryPipelineStatisticFlagBits) or
[VK_QUERY_PIPELINE_STATISTIC_MESH_SHADER_INVOCATIONS_BIT_EXT](#VkQueryPipelineStatisticFlagBits)

* 
[](#VUID-VkQueryPoolCreateInfo-queryType-00792) VUID-VkQueryPoolCreateInfo-queryType-00792

If `queryType` is [VK_QUERY_TYPE_PIPELINE_STATISTICS](#VkQueryType),
`pipelineStatistics` **must** be a valid combination of
[VkQueryPipelineStatisticFlagBits](#VkQueryPipelineStatisticFlagBits) values

* 
[](#VUID-VkQueryPoolCreateInfo-queryType-09534) VUID-VkQueryPoolCreateInfo-queryType-09534

If `queryType` is [VK_QUERY_TYPE_PIPELINE_STATISTICS](#VkQueryType),
`pipelineStatistics` **must** not be zero

* 
[](#VUID-VkQueryPoolCreateInfo-queryType-03222) VUID-VkQueryPoolCreateInfo-queryType-03222

If `queryType` is [VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](#VkQueryType), the
`pNext` chain **must** include a
[VkQueryPoolPerformanceCreateInfoKHR](#VkQueryPoolPerformanceCreateInfoKHR) structure

* 
[](#VUID-VkQueryPoolCreateInfo-queryCount-02763) VUID-VkQueryPoolCreateInfo-queryCount-02763

`queryCount` **must** be greater than 0

* 
[](#VUID-VkQueryPoolCreateInfo-queryType-11839) VUID-VkQueryPoolCreateInfo-queryType-11839

If `queryType` is [VK_QUERY_TYPE_RESULT_STATUS_ONLY_KHR](#VkQueryType), then
at least one of the queue families of the device **must** support
[result status queries](#queries-result-status-only), as indicated by
[VkQueueFamilyQueryResultStatusPropertiesKHR](devsandqueues.html#VkQueueFamilyQueryResultStatusPropertiesKHR)::`queryResultStatusSupport`

* 
[](#VUID-VkQueryPoolCreateInfo-pNext-10779) VUID-VkQueryPoolCreateInfo-pNext-10779

If the `pNext` chain includes a [VkVideoProfileInfoKHR](videocoding.html#VkVideoProfileInfoKHR)
structure and its `videoCodecOperation` member is
[VK_VIDEO_CODEC_OPERATION_DECODE_VP9_BIT_KHR](videocoding.html#VkVideoCodecOperationFlagBitsKHR), then the
[`videoDecodeVP9`](features.html#features-videoDecodeVP9) feature **must** be
enabled

* 
[](#VUID-VkQueryPoolCreateInfo-queryType-07133) VUID-VkQueryPoolCreateInfo-queryType-07133

If `queryType` is [VK_QUERY_TYPE_VIDEO_ENCODE_FEEDBACK_KHR](#VkQueryType),
then the `pNext` chain **must** include a [VkVideoProfileInfoKHR](videocoding.html#VkVideoProfileInfoKHR)
structure with `videoCodecOperation` specifying an encode operation

* 
[](#VUID-VkQueryPoolCreateInfo-queryType-07906) VUID-VkQueryPoolCreateInfo-queryType-07906

If `queryType` is [VK_QUERY_TYPE_VIDEO_ENCODE_FEEDBACK_KHR](#VkQueryType),
then the `pNext` chain **must** include a
[VkQueryPoolVideoEncodeFeedbackCreateInfoKHR](#VkQueryPoolVideoEncodeFeedbackCreateInfoKHR) structure

* 
[](#VUID-VkQueryPoolCreateInfo-queryType-07907) VUID-VkQueryPoolCreateInfo-queryType-07907

If `queryType` is [VK_QUERY_TYPE_VIDEO_ENCODE_FEEDBACK_KHR](#VkQueryType), and
the `pNext` chain includes a [VkVideoProfileInfoKHR](videocoding.html#VkVideoProfileInfoKHR) structure
and a [VkQueryPoolVideoEncodeFeedbackCreateInfoKHR](#VkQueryPoolVideoEncodeFeedbackCreateInfoKHR) structure, then
[VkQueryPoolVideoEncodeFeedbackCreateInfoKHR](#VkQueryPoolVideoEncodeFeedbackCreateInfoKHR)::`encodeFeedbackFlags`
**must** not contain any bits that are not set in
[VkVideoEncodeCapabilitiesKHR](videocoding.html#VkVideoEncodeCapabilitiesKHR)::`supportedEncodeFeedbackFlags`,
as returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](videocoding.html#vkGetPhysicalDeviceVideoCapabilitiesKHR) for the
[video profile](videocoding.html#video-profiles) described by
[VkVideoProfileInfoKHR](videocoding.html#VkVideoProfileInfoKHR) and its `pNext` chain

* 
[](#VUID-VkQueryPoolCreateInfo-pNext-10248) VUID-VkQueryPoolCreateInfo-pNext-10248

If the `pNext` chain includes a [VkVideoProfileInfoKHR](videocoding.html#VkVideoProfileInfoKHR)
structure and its `videoCodecOperation` member is
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](videocoding.html#VkVideoCodecOperationFlagBitsKHR), then the
[`videoEncodeAV1`](features.html#features-videoEncodeAV1) feature **must** be
enabled

* 
[](#VUID-VkQueryPoolCreateInfo-pNext-10918) VUID-VkQueryPoolCreateInfo-pNext-10918

If the `pNext` chain includes a
[VkVideoEncodeProfileRgbConversionInfoVALVE](videocoding.html#VkVideoEncodeProfileRgbConversionInfoVALVE) structure, then the
[`videoEncodeRgbConversion`](features.html#features-videoEncodeRgbConversion)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-VkQueryPoolCreateInfo-sType-sType) VUID-VkQueryPoolCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_QUERY_POOL_CREATE_INFO](fundamentals.html#VkStructureType)

* 
[](#VUID-VkQueryPoolCreateInfo-pNext-pNext) VUID-VkQueryPoolCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkQueryPoolPerformanceCreateInfoKHR](#VkQueryPoolPerformanceCreateInfoKHR), [VkQueryPoolPerformanceQueryCreateInfoINTEL](#VkQueryPoolPerformanceQueryCreateInfoINTEL), [VkQueryPoolVideoEncodeFeedbackCreateInfoKHR](#VkQueryPoolVideoEncodeFeedbackCreateInfoKHR), [VkVideoDecodeAV1ProfileInfoKHR](videocoding.html#VkVideoDecodeAV1ProfileInfoKHR), [VkVideoDecodeH264ProfileInfoKHR](videocoding.html#VkVideoDecodeH264ProfileInfoKHR), [VkVideoDecodeH265ProfileInfoKHR](videocoding.html#VkVideoDecodeH265ProfileInfoKHR), [VkVideoDecodeUsageInfoKHR](videocoding.html#VkVideoDecodeUsageInfoKHR), [VkVideoDecodeVP9ProfileInfoKHR](videocoding.html#VkVideoDecodeVP9ProfileInfoKHR), [VkVideoEncodeAV1ProfileInfoKHR](videocoding.html#VkVideoEncodeAV1ProfileInfoKHR), [VkVideoEncodeH264ProfileInfoKHR](videocoding.html#VkVideoEncodeH264ProfileInfoKHR), [VkVideoEncodeH265ProfileInfoKHR](videocoding.html#VkVideoEncodeH265ProfileInfoKHR), [VkVideoEncodeUsageInfoKHR](videocoding.html#VkVideoEncodeUsageInfoKHR), or [VkVideoProfileInfoKHR](videocoding.html#VkVideoProfileInfoKHR)

* 
[](#VUID-VkQueryPoolCreateInfo-sType-unique) VUID-VkQueryPoolCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkQueryPoolCreateInfo-flags-parameter) VUID-VkQueryPoolCreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkQueryPoolCreateFlagBits](#VkQueryPoolCreateFlagBits) values

* 
[](#VUID-VkQueryPoolCreateInfo-queryType-parameter) VUID-VkQueryPoolCreateInfo-queryType-parameter

 `queryType` **must** be a valid [VkQueryType](#VkQueryType) value

Bits which **can** be set in [VkQueryPoolCreateInfo](#VkQueryPoolCreateInfo)::`flags`,
specifying options for query pools, are:

// Provided by VK_VERSION_1_0
typedef enum VkQueryPoolCreateFlagBits {
  // Provided by VK_KHR_maintenance9
    VK_QUERY_POOL_CREATE_RESET_BIT_KHR = 0x00000001,
} VkQueryPoolCreateFlagBits;

* 
[VK_QUERY_POOL_CREATE_RESET_BIT_KHR](#VkQueryPoolCreateFlagBits) specifies that queries in the
query pool are initialized on creation and do not need to be reset
before first use.

// Provided by VK_VERSION_1_0
typedef VkFlags VkQueryPoolCreateFlags;

`VkQueryPoolCreateFlags` is a bitmask type for setting a mask of zero or
more [VkQueryPoolCreateFlagBits](#VkQueryPoolCreateFlagBits).

The `VkQueryPoolPerformanceCreateInfoKHR` structure is defined as:

// Provided by VK_KHR_performance_query
typedef struct VkQueryPoolPerformanceCreateInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           queueFamilyIndex;
    uint32_t           counterIndexCount;
    const uint32_t*    pCounterIndices;
} VkQueryPoolPerformanceCreateInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`queueFamilyIndex` is the queue family index to create this
performance query pool for.

* 
`counterIndexCount` is the length of the `pCounterIndices`
array.

* 
`pCounterIndices` is a pointer to an array of indices into the
[vkEnumeratePhysicalDeviceQueueFamilyPerformanceQueryCountersKHR](devsandqueues.html#vkEnumeratePhysicalDeviceQueueFamilyPerformanceQueryCountersKHR)::`pCounters`
to enable in this performance query pool.

Valid Usage

* 
[](#VUID-VkQueryPoolPerformanceCreateInfoKHR-queueFamilyIndex-03236) VUID-VkQueryPoolPerformanceCreateInfoKHR-queueFamilyIndex-03236

`queueFamilyIndex` **must** be a valid queue family index of the device

* 
[](#VUID-VkQueryPoolPerformanceCreateInfoKHR-performanceCounterQueryPools-03237) VUID-VkQueryPoolPerformanceCreateInfoKHR-performanceCounterQueryPools-03237

The [    `performanceCounterQueryPools`](features.html#features-performanceCounterQueryPools) feature **must** be enabled

* 
[](#VUID-VkQueryPoolPerformanceCreateInfoKHR-pCounterIndices-03321) VUID-VkQueryPoolPerformanceCreateInfoKHR-pCounterIndices-03321

Each element of `pCounterIndices` **must** be in the range of counters
reported by
`vkEnumeratePhysicalDeviceQueueFamilyPerformanceQueryCountersKHR`
for the queue family specified in `queueFamilyIndex`

Valid Usage (Implicit)

* 
[](#VUID-VkQueryPoolPerformanceCreateInfoKHR-sType-sType) VUID-VkQueryPoolPerformanceCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_QUERY_POOL_PERFORMANCE_CREATE_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkQueryPoolPerformanceCreateInfoKHR-pCounterIndices-parameter) VUID-VkQueryPoolPerformanceCreateInfoKHR-pCounterIndices-parameter

 `pCounterIndices` **must** be a valid pointer to an array of `counterIndexCount` `uint32_t` values

* 
[](#VUID-VkQueryPoolPerformanceCreateInfoKHR-counterIndexCount-arraylength) VUID-VkQueryPoolPerformanceCreateInfoKHR-counterIndexCount-arraylength

 `counterIndexCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkQueryPoolCreateInfo](#VkQueryPoolCreateInfo)

To query the number of passes required to query a performance query pool on
a physical device, call:

// Provided by VK_KHR_performance_query
void vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR(
    VkPhysicalDevice                            physicalDevice,
    const VkQueryPoolPerformanceCreateInfoKHR*  pPerformanceQueryCreateInfo,
    uint32_t*                                   pNumPasses);

* 
`physicalDevice` is the handle to the physical device whose queue
family performance query counter properties will be queried.

* 
`pPerformanceQueryCreateInfo` is a pointer to a
`VkQueryPoolPerformanceCreateInfoKHR` of the performance query that
is to be created.

* 
`pNumPasses` is a pointer to an integer related to the number of
passes required to query the performance query pool, as described below.

The `pPerformanceQueryCreateInfo` member
`VkQueryPoolPerformanceCreateInfoKHR`::`queueFamilyIndex` **must** be a
queue family of `physicalDevice`.
The number of passes required to capture the counters specified in the
`pPerformanceQueryCreateInfo` member
`VkQueryPoolPerformanceCreateInfoKHR`::`pCounters` is returned in
`pNumPasses`.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR-physicalDevice-parameter) VUID-vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR-pPerformanceQueryCreateInfo-parameter) VUID-vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR-pPerformanceQueryCreateInfo-parameter

 `pPerformanceQueryCreateInfo` **must** be a valid pointer to a valid [VkQueryPoolPerformanceCreateInfoKHR](#VkQueryPoolPerformanceCreateInfoKHR) structure

* 
[](#VUID-vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR-pNumPasses-parameter) VUID-vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR-pNumPasses-parameter

 `pNumPasses` **must** be a valid pointer to a `uint32_t` value

To destroy a query pool, call:

// Provided by VK_VERSION_1_0
void vkDestroyQueryPool(
    VkDevice                                    device,
    VkQueryPool                                 queryPool,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the query pool.

* 
`queryPool` is the query pool to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyQueryPool-queryPool-00793) VUID-vkDestroyQueryPool-queryPool-00793

All submitted commands that refer to `queryPool` **must** have
completed execution

* 
[](#VUID-vkDestroyQueryPool-queryPool-00794) VUID-vkDestroyQueryPool-queryPool-00794

If `VkAllocationCallbacks` were provided when `queryPool` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyQueryPool-queryPool-00795) VUID-vkDestroyQueryPool-queryPool-00795

If no `VkAllocationCallbacks` were provided when `queryPool` was
created, `pAllocator` **must** be `NULL`

|  | Applications **can** verify that `queryPool` **can** be destroyed by checking
| --- | --- |
that `vkGetQueryPoolResults`() without the
[VK_QUERY_RESULT_PARTIAL_BIT](#VkQueryResultFlagBits) flag returns [VK_SUCCESS](fundamentals.html#VkResult) for all
queries that are used in command buffers submitted for execution. |

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyQueryPool-device-parameter) VUID-vkDestroyQueryPool-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkDestroyQueryPool-queryPool-parameter) VUID-vkDestroyQueryPool-queryPool-parameter

 If `queryPool` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `queryPool` **must** be a valid [VkQueryPool](#VkQueryPool) handle

* 
[](#VUID-vkDestroyQueryPool-pAllocator-parameter) VUID-vkDestroyQueryPool-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](memory.html#VkAllocationCallbacks) structure

* 
[](#VUID-vkDestroyQueryPool-queryPool-parent) VUID-vkDestroyQueryPool-queryPool-parent

 If `queryPool` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `queryPool` **must** be externally synchronized

Possible values of [VkQueryPoolCreateInfo](#VkQueryPoolCreateInfo)::`queryType`, specifying
the type of queries managed by the pool, are:

// Provided by VK_VERSION_1_0
typedef enum VkQueryType {
    VK_QUERY_TYPE_OCCLUSION = 0,
    VK_QUERY_TYPE_PIPELINE_STATISTICS = 1,
    VK_QUERY_TYPE_TIMESTAMP = 2,
  // Provided by VK_KHR_video_queue
    VK_QUERY_TYPE_RESULT_STATUS_ONLY_KHR = 1000023000,
  // Provided by VK_EXT_transform_feedback
    VK_QUERY_TYPE_TRANSFORM_FEEDBACK_STREAM_EXT = 1000028004,
  // Provided by VK_KHR_performance_query
    VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR = 1000116000,
  // Provided by VK_KHR_acceleration_structure
    VK_QUERY_TYPE_ACCELERATION_STRUCTURE_COMPACTED_SIZE_KHR = 1000150000,
  // Provided by VK_KHR_acceleration_structure
    VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_SIZE_KHR = 1000150001,
  // Provided by VK_NV_ray_tracing
    VK_QUERY_TYPE_ACCELERATION_STRUCTURE_COMPACTED_SIZE_NV = 1000165000,
  // Provided by VK_INTEL_performance_query
    VK_QUERY_TYPE_PERFORMANCE_QUERY_INTEL = 1000210000,
  // Provided by VK_KHR_video_encode_queue
    VK_QUERY_TYPE_VIDEO_ENCODE_FEEDBACK_KHR = 1000299000,
  // Provided by VK_EXT_mesh_shader
    VK_QUERY_TYPE_MESH_PRIMITIVES_GENERATED_EXT = 1000328000,
  // Provided by VK_EXT_primitives_generated_query
    VK_QUERY_TYPE_PRIMITIVES_GENERATED_EXT = 1000382000,
  // Provided by VK_KHR_ray_tracing_maintenance1
    VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_BOTTOM_LEVEL_POINTERS_KHR = 1000386000,
  // Provided by VK_KHR_ray_tracing_maintenance1
    VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SIZE_KHR = 1000386001,
  // Provided by VK_EXT_opacity_micromap
    VK_QUERY_TYPE_MICROMAP_SERIALIZATION_SIZE_EXT = 1000396000,
  // Provided by VK_EXT_opacity_micromap
    VK_QUERY_TYPE_MICROMAP_COMPACTED_SIZE_EXT = 1000396001,
} VkQueryType;

* 
[VK_QUERY_TYPE_OCCLUSION](#VkQueryType) specifies an [    occlusion query](#queries-occlusion).

* 
[VK_QUERY_TYPE_PIPELINE_STATISTICS](#VkQueryType) specifies a [    pipeline statistics query](#queries-pipestats).

* 
[VK_QUERY_TYPE_TIMESTAMP](#VkQueryType) specifies a [    timestamp query](#queries-timestamps).

* 
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](#VkQueryType) specifies a
[performance query](#queries-performance).

* 
[VK_QUERY_TYPE_TRANSFORM_FEEDBACK_STREAM_EXT](#VkQueryType) specifies a
[transform feedback query](#queries-transform-feedback).

* 
[VK_QUERY_TYPE_PRIMITIVES_GENERATED_EXT](#VkQueryType) specifies a
[primitives generated query](#queries-primitives-generated).

* 
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_COMPACTED_SIZE_KHR](#VkQueryType) specifies
a [acceleration structure size query](accelstructures.html#acceleration-structure-copying)
for use with [vkCmdWriteAccelerationStructuresPropertiesKHR](accelstructures.html#vkCmdWriteAccelerationStructuresPropertiesKHR) or
[vkWriteAccelerationStructuresPropertiesKHR](accelstructures.html#vkWriteAccelerationStructuresPropertiesKHR).

* 
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_SIZE_KHR](#VkQueryType)
specifies a [serialization acceleration    structure size query](accelstructures.html#acceleration-structure-copying).

* 
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SIZE_KHR](#VkQueryType) specifies an
[acceleration structure size query](accelstructures.html#acceleration-structure-copying)
for use with [vkCmdWriteAccelerationStructuresPropertiesKHR](accelstructures.html#vkCmdWriteAccelerationStructuresPropertiesKHR) or
[vkWriteAccelerationStructuresPropertiesKHR](accelstructures.html#vkWriteAccelerationStructuresPropertiesKHR).

* 
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_BOTTOM_LEVEL_POINTERS_KHR](#VkQueryType)
specifies a [serialization acceleration structure    pointer count query](accelstructures.html#serialized-as-header).

* 
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_COMPACTED_SIZE_NV](#VkQueryType) specifies
an [acceleration structure size query](accelstructures.html#acceleration-structure-copying)
for use with [vkCmdWriteAccelerationStructuresPropertiesNV](accelstructures.html#vkCmdWriteAccelerationStructuresPropertiesNV).

* 
[VK_QUERY_TYPE_PERFORMANCE_QUERY_INTEL](#VkQueryType) specifies a
[Intel performance query](#queries-performance-intel).

* 
[VK_QUERY_TYPE_RESULT_STATUS_ONLY_KHR](#VkQueryType) specifies a
[result status query](#queries-result-status-only).

* 
[VK_QUERY_TYPE_VIDEO_ENCODE_FEEDBACK_KHR](#VkQueryType) specifies a
[video encode feedback query](#queries-video-encode-feedback).

* 
[VK_QUERY_TYPE_MESH_PRIMITIVES_GENERATED_EXT](#VkQueryType) specifies a
[generated mesh primitives query](#queries-mesh-shader).

The operation of queries is controlled by the commands
[vkCmdBeginQuery](#vkCmdBeginQuery), [vkCmdEndQuery](#vkCmdEndQuery),
[vkCmdBeginQueryIndexedEXT](#vkCmdBeginQueryIndexedEXT), [vkCmdEndQueryIndexedEXT](#vkCmdEndQueryIndexedEXT),
[vkCmdResetQueryPool](#vkCmdResetQueryPool), [vkCmdCopyQueryPoolResults](#vkCmdCopyQueryPoolResults),
[vkCmdWriteAccelerationStructuresPropertiesKHR](accelstructures.html#vkCmdWriteAccelerationStructuresPropertiesKHR),
[vkCmdWriteAccelerationStructuresPropertiesNV](accelstructures.html#vkCmdWriteAccelerationStructuresPropertiesNV),
[vkCmdWriteMicromapsPropertiesEXT](VK_EXT_opacity_micromap/micromaps.html#vkCmdWriteMicromapsPropertiesEXT),
[vkCmdCopyQueryPoolResultsToMemoryKHR](#vkCmdCopyQueryPoolResultsToMemoryKHR),
[vkCmdWriteTimestamp2](#vkCmdWriteTimestamp2),
and [vkCmdWriteTimestamp](#vkCmdWriteTimestamp).

In order for a `VkCommandBuffer` to record query management commands,
the queue family for which its `VkCommandPool` was created **must** support
the appropriate type of operations (graphics, compute) suitable for the
query type of a given query pool.

Each query in a query pool has a status that is either *unavailable* or
*available*, and also has state to store the numerical results of a query
operation of the type requested when the query pool was created.
Resetting a query via [vkCmdResetQueryPool](#vkCmdResetQueryPool)
or [vkResetQueryPool](#vkResetQueryPool)
sets the status to unavailable and makes the numerical results **undefined**.
A query is made available by the operation of [vkCmdEndQuery](#vkCmdEndQuery),
[vkCmdEndQueryIndexedEXT](#vkCmdEndQueryIndexedEXT),
[vkCmdWriteAccelerationStructuresPropertiesKHR](accelstructures.html#vkCmdWriteAccelerationStructuresPropertiesKHR),
[vkCmdWriteAccelerationStructuresPropertiesNV](accelstructures.html#vkCmdWriteAccelerationStructuresPropertiesNV),
[vkCmdWriteMicromapsPropertiesEXT](VK_EXT_opacity_micromap/micromaps.html#vkCmdWriteMicromapsPropertiesEXT),
[vkCmdWriteTimestamp2](#vkCmdWriteTimestamp2),
or [vkCmdWriteTimestamp](#vkCmdWriteTimestamp).
Both the availability status and numerical results **can** be retrieved by
calling either [vkGetQueryPoolResults](#vkGetQueryPoolResults) or
[vkCmdCopyQueryPoolResults](#vkCmdCopyQueryPoolResults).

After query pool creation,
where [VK_QUERY_POOL_CREATE_RESET_BIT_KHR](#VkQueryPoolCreateFlagBits) was not set in
[VkQueryPoolCreateInfo](#VkQueryPoolCreateInfo)::`flags`
each query is in an uninitialized state and **must** be reset before it is
used.
Queries **must** also be reset between uses.

If a logical device includes multiple physical devices, then each command
that writes a query **must** execute on a single physical device, and any call
to [vkCmdBeginQuery](#vkCmdBeginQuery) **must** execute the corresponding [vkCmdEndQuery](#vkCmdEndQuery)
command on the same physical device.

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

The first [synchronization scope](synchronization.html#synchronization-dependencies-scopes)
includes all commands which reference the queries in `queryPool`
indicated by `firstQuery` and `queryCount` that occur earlier in
[submission order](synchronization.html#synchronization-submission-order).

The second [synchronization scope](synchronization.html#synchronization-dependencies-scopes)
includes all commands which reference the queries in `queryPool`
indicated by `firstQuery` and `queryCount` that occur later in
[submission order](synchronization.html#synchronization-submission-order).

The operation of this command happens after the first scope and happens
before the second scope.

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](#VkQueryType), this command sets the status of
query indices [`firstQuery`, `firstQuery` + 
`queryCount` - 1] to unavailable for each pass of `queryPool`, as
indicated by a call to
[vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR](#vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR).

|  | Because `vkCmdResetQueryPool` resets all the passes of the indicated
| --- | --- |
queries, applications must not record a `vkCmdResetQueryPool` command
for a `queryPool` created with [VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](#VkQueryType)
in a command buffer that needs to be submitted multiple times as indicated
by a call to [vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR](#vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR).
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
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](#VkQueryType), this command **must** not be
recorded in a command buffer that, either directly or through secondary
command buffers, also contains begin commands for a query from the set
of queries [`firstQuery`, `firstQuery` + 
`queryCount` - 1]

Valid Usage (Implicit)

* 
[](#VUID-vkCmdResetQueryPool-commandBuffer-parameter) VUID-vkCmdResetQueryPool-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdResetQueryPool-queryPool-parameter) VUID-vkCmdResetQueryPool-queryPool-parameter

 `queryPool` **must** be a valid [VkQueryPool](#VkQueryPool) handle

* 
[](#VUID-vkCmdResetQueryPool-commandBuffer-recording) VUID-vkCmdResetQueryPool-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdResetQueryPool-commandBuffer-cmdpool) VUID-vkCmdResetQueryPool-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_OPTICAL_FLOW_BIT_NV](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_VIDEO_DECODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits) operations

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

 Both of `commandBuffer`, and `queryPool` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_OPTICAL_FLOW_BIT_NV

VK_QUEUE_VIDEO_DECODE_BIT_KHR

VK_QUEUE_VIDEO_ENCODE_BIT_KHR | Action |

Conditional Rendering

vkCmdResetQueryPool is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To reset a range of queries in a query pool on the host, call:

// Provided by VK_VERSION_1_2
void vkResetQueryPool(
    VkDevice                                    device,
    VkQueryPool                                 queryPool,
    uint32_t                                    firstQuery,
    uint32_t                                    queryCount);

// Provided by VK_EXT_host_query_reset
// Equivalent to vkResetQueryPool
void vkResetQueryPoolEXT(
    VkDevice                                    device,
    VkQueryPool                                 queryPool,
    uint32_t                                    firstQuery,
    uint32_t                                    queryCount);

* 
`device` is the logical device that owns the query pool.

* 
`queryPool` is the handle of the query pool managing the queries
being reset.

* 
`firstQuery` is the initial query index to reset.

* 
`queryCount` is the number of queries to reset.

This command sets the status of query indices [`firstQuery`,
`firstQuery` +  `queryCount` - 1] to unavailable.

If `queryPool` is [VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](#VkQueryType) this command
sets the status of query indices [`firstQuery`, `firstQuery`
+  `queryCount` - 1] to unavailable for each pass.

Valid Usage

* 
[](#VUID-vkResetQueryPool-firstQuery-09436) VUID-vkResetQueryPool-firstQuery-09436

`firstQuery` **must** be less than the number of queries in
`queryPool`

* 
[](#VUID-vkResetQueryPool-firstQuery-09437) VUID-vkResetQueryPool-firstQuery-09437

The sum of `firstQuery` and `queryCount` **must** be less than or
equal to the number of queries in `queryPool`

* 
[](#VUID-vkResetQueryPool-None-02665) VUID-vkResetQueryPool-None-02665

The [`hostQueryReset`](features.html#features-hostQueryReset) feature **must** be
enabled

* 
[](#VUID-vkResetQueryPool-firstQuery-02741) VUID-vkResetQueryPool-firstQuery-02741

Submitted commands that refer to the range specified by `firstQuery`
and `queryCount` in `queryPool` **must** have completed execution

* 
[](#VUID-vkResetQueryPool-firstQuery-02742) VUID-vkResetQueryPool-firstQuery-02742

The range of queries specified by `firstQuery` and `queryCount`
in `queryPool` **must** not be in use by calls to
[vkGetQueryPoolResults](#vkGetQueryPoolResults) or `vkResetQueryPool` in other threads

Valid Usage (Implicit)

* 
[](#VUID-vkResetQueryPool-device-parameter) VUID-vkResetQueryPool-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkResetQueryPool-queryPool-parameter) VUID-vkResetQueryPool-queryPool-parameter

 `queryPool` **must** be a valid [VkQueryPool](#VkQueryPool) handle

* 
[](#VUID-vkResetQueryPool-queryPool-parent) VUID-vkResetQueryPool-queryPool-parent

 `queryPool` **must** have been created, allocated, or retrieved from `device`

Once queries are reset and ready for use, query commands **can** be issued to a
command buffer.
Pipeline statistics queries count pipeline stage invocations
and occlusion queries count drawn samples
resulting from commands that are recorded between a [vkCmdBeginQuery](#vkCmdBeginQuery)
command and a [vkCmdEndQuery](#vkCmdEndQuery) command within a specified command buffer,
effectively scoping a set of dispatching
and/or drawing
commands.
Timestamp queries write timestamps to a query pool.
Performance queries record performance counters to a query pool.

A query **must** begin and end in the same command buffer, although if it is a
primary command buffer, and the [`inheritedQueries`](features.html#features-inheritedQueries) feature is enabled, it **can** execute secondary
command buffers during the query operation.
For a secondary command buffer to be executed while a query is active, it
**must** set the `occlusionQueryEnable`, `queryFlags`, and/or
`pipelineStatistics` members of [VkCommandBufferInheritanceInfo](cmdbuffers.html#VkCommandBufferInheritanceInfo) to
conservative values, as described in the [Command Buffer Recording](cmdbuffers.html#commandbuffers-recording) section.
A query **must** either begin and end inside the same subpass of a render pass
instance, or **must** both begin and end outside of a render pass instance
(i.e. contain entire render pass instances).

If queries are used while executing a render pass instance that has
multiview enabled, the query uses N consecutive query indices in the
query pool (starting at `query`) where N is the number of bits set
in the view mask in the subpass the query is used in.
How the numerical results of the query are distributed among the queries is
implementation-dependent.
For example, some implementations **may** write each view’s results to a
distinct query, while other implementations **may** write the total result to
the first query and write zero to the other queries.
However, the sum of the results in all the queries **must** accurately reflect
the total result of the query summed over all views.
Applications **can** sum the results from all the queries to compute the total
result.

Queries used with multiview rendering **must** not span subpasses, i.e. they
**must** begin and end in the same subpass.

A query **must** either begin and end inside the same video coding scope, or
**must** both begin and end outside of a video coding scope and **must** not
contain entire video coding scopes.

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
`flags` is a bitmask of [VkQueryControlFlagBits](#VkQueryControlFlagBits) specifying
constraints on the types of queries that **can** be performed.

If the `queryType` of the pool is [VK_QUERY_TYPE_OCCLUSION](#VkQueryType) and
`flags` contains [VK_QUERY_CONTROL_PRECISE_BIT](#VkQueryControlFlagBits), an implementation
**must** return a result that matches the actual number of samples passed.
This is described in more detail in [Occlusion Queries](#queries-occlusion).

Calling `vkCmdBeginQuery` is equivalent to calling
[vkCmdBeginQueryIndexedEXT](#vkCmdBeginQueryIndexedEXT) with the `index` parameter set to zero.

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

Each [video coding operation](videocoding.html#video-coding) stores a result to the query
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

The first [synchronization scope](synchronization.html#synchronization-dependencies-scopes)
includes all commands which reference the queries in `queryPool`
indicated by `query` that occur earlier in
[submission order](synchronization.html#synchronization-submission-order).

The second [synchronization scope](synchronization.html#synchronization-dependencies-scopes)
includes all commands which reference the queries in `queryPool`
indicated by `query` that occur later in
[submission order](synchronization.html#synchronization-submission-order).

The operation of this command happens after the first scope and happens
before the second scope.

Valid Usage

* 
[](#VUID-vkCmdBeginQuery-None-00807) VUID-vkCmdBeginQuery-None-00807

All queries used by the command **must** be *unavailable*

* 
[](#VUID-vkCmdBeginQuery-queryType-02804) VUID-vkCmdBeginQuery-queryType-02804

The `queryType` used to create `queryPool` **must** not be
[VK_QUERY_TYPE_TIMESTAMP](#VkQueryType)

* 
[](#VUID-vkCmdBeginQuery-queryType-04728) VUID-vkCmdBeginQuery-queryType-04728

The `queryType` used to create `queryPool` **must** not be
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_COMPACTED_SIZE_KHR](#VkQueryType) or
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_SIZE_KHR](#VkQueryType)

* 
[](#VUID-vkCmdBeginQuery-queryType-06741) VUID-vkCmdBeginQuery-queryType-06741

The `queryType` used to create `queryPool` **must** not be
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SIZE_KHR](#VkQueryType) or
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_BOTTOM_LEVEL_POINTERS_KHR](#VkQueryType)

* 
[](#VUID-vkCmdBeginQuery-queryType-04729) VUID-vkCmdBeginQuery-queryType-04729

The `queryType` used to create `queryPool` **must** not be
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_COMPACTED_SIZE_NV](#VkQueryType)

* 
[](#VUID-vkCmdBeginQuery-queryType-00800) VUID-vkCmdBeginQuery-queryType-00800

If the [`occlusionQueryPrecise`](features.html#features-occlusionQueryPrecise)
feature is not enabled, or the `queryType` used to create
`queryPool` was not [VK_QUERY_TYPE_OCCLUSION](#VkQueryType), `flags` **must**
not contain [VK_QUERY_CONTROL_PRECISE_BIT](#VkQueryControlFlagBits)

* 
[](#VUID-vkCmdBeginQuery-query-00802) VUID-vkCmdBeginQuery-query-00802

`query` **must** be less than the number of queries in `queryPool`

* 
[](#VUID-vkCmdBeginQuery-queryType-00803) VUID-vkCmdBeginQuery-queryType-00803

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_OCCLUSION](#VkQueryType), the `VkCommandPool` that
`commandBuffer` was allocated from **must** support graphics operations

* 
[](#VUID-vkCmdBeginQuery-queryType-00804) VUID-vkCmdBeginQuery-queryType-00804

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_PIPELINE_STATISTICS](#VkQueryType) and any of the
`pipelineStatistics` indicate graphics operations, the
`VkCommandPool` that `commandBuffer` was allocated from **must**
support graphics operations

* 
[](#VUID-vkCmdBeginQuery-queryType-00805) VUID-vkCmdBeginQuery-queryType-00805

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_PIPELINE_STATISTICS](#VkQueryType) and any of the
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
[VK_QUERY_TYPE_RESULT_STATUS_ONLY_KHR](#VkQueryType), then the `VkCommandPool`
that `commandBuffer` was allocated from **must** have been created with
a queue family index that supports [result    status queries](#queries-result-status-only), as indicated by
[VkQueueFamilyQueryResultStatusPropertiesKHR](devsandqueues.html#VkQueueFamilyQueryResultStatusPropertiesKHR)::`queryResultStatusSupport`

* 
[](#VUID-vkCmdBeginQuery-None-07127) VUID-vkCmdBeginQuery-None-07127

If there is a bound video session, then there **must** be no
[active](#queries-operation-active) queries

* 
[](#VUID-vkCmdBeginQuery-None-08370) VUID-vkCmdBeginQuery-None-08370

If there is a bound video session, then it **must** not have been created
with [VK_VIDEO_SESSION_CREATE_INLINE_QUERIES_BIT_KHR](videocoding.html#VkVideoSessionCreateFlagBitsKHR)

* 
[](#VUID-vkCmdBeginQuery-queryType-07128) VUID-vkCmdBeginQuery-queryType-07128

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_RESULT_STATUS_ONLY_KHR](#VkQueryType) and there is a bound video
session, then `queryPool` **must** have been created with a
[VkVideoProfileInfoKHR](videocoding.html#VkVideoProfileInfoKHR) structure included in the `pNext` chain
of [VkQueryPoolCreateInfo](#VkQueryPoolCreateInfo) identical to the one specified in
[VkVideoSessionCreateInfoKHR](videocoding.html#VkVideoSessionCreateInfoKHR)::`pVideoProfile` the bound video
session was created with

* 
[](#VUID-vkCmdBeginQuery-queryType-07129) VUID-vkCmdBeginQuery-queryType-07129

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_VIDEO_ENCODE_FEEDBACK_KHR](#VkQueryType), then there **must** be a
bound video session

* 
[](#VUID-vkCmdBeginQuery-queryType-07130) VUID-vkCmdBeginQuery-queryType-07130

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_VIDEO_ENCODE_FEEDBACK_KHR](#VkQueryType) and there is a bound video
session, then `queryPool` **must** have been created with a
[VkVideoProfileInfoKHR](videocoding.html#VkVideoProfileInfoKHR) structure included in the `pNext` chain
of [VkQueryPoolCreateInfo](#VkQueryPoolCreateInfo) identical to the one specified in
[VkVideoSessionCreateInfoKHR](videocoding.html#VkVideoSessionCreateInfoKHR)::`pVideoProfile` the bound video
session was created with

* 
[](#VUID-vkCmdBeginQuery-queryType-07131) VUID-vkCmdBeginQuery-queryType-07131

If the `queryType` used to create `queryPool` was not
[VK_QUERY_TYPE_RESULT_STATUS_ONLY_KHR](#VkQueryType)
or [VK_QUERY_TYPE_VIDEO_ENCODE_FEEDBACK_KHR](#VkQueryType),
then there **must** be no bound video session

* 
[](#VUID-vkCmdBeginQuery-None-10681) VUID-vkCmdBeginQuery-None-10681

This command **must** not be recorded when
[per-tile execution model](renderpass.html#renderpass-per-tile-execution-model) is
enabled

* 
[](#VUID-vkCmdBeginQuery-queryPool-01922) VUID-vkCmdBeginQuery-queryPool-01922

`queryPool` **must** have been created with a `queryType` that
differs from that of any queries that are
[active](#queries-operation-active) within `commandBuffer`

* 
[](#VUID-vkCmdBeginQuery-queryType-07070) VUID-vkCmdBeginQuery-queryType-07070

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_MESH_PRIMITIVES_GENERATED_EXT](#VkQueryType) the
`VkCommandPool` that `commandBuffer` was allocated from **must**
support graphics operations

* 
[](#VUID-vkCmdBeginQuery-queryType-02327) VUID-vkCmdBeginQuery-queryType-02327

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_TRANSFORM_FEEDBACK_STREAM_EXT](#VkQueryType) the
`VkCommandPool` that `commandBuffer` was allocated from **must**
support graphics operations

* 
[](#VUID-vkCmdBeginQuery-queryType-02328) VUID-vkCmdBeginQuery-queryType-02328

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_TRANSFORM_FEEDBACK_STREAM_EXT](#VkQueryType) then
`VkPhysicalDeviceTransformFeedbackPropertiesEXT`::`transformFeedbackQueries`
**must** be supported

* 
[](#VUID-vkCmdBeginQuery-queryType-06687) VUID-vkCmdBeginQuery-queryType-06687

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_PRIMITIVES_GENERATED_EXT](#VkQueryType) the `VkCommandPool`
that `commandBuffer` was allocated from **must** support graphics
operations

* 
[](#VUID-vkCmdBeginQuery-queryType-06688) VUID-vkCmdBeginQuery-queryType-06688

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_PRIMITIVES_GENERATED_EXT](#VkQueryType) then
[`primitivesGeneratedQuery`](features.html#features-primitivesGeneratedQuery)
**must** be enabled

* 
[](#VUID-vkCmdBeginQuery-queryPool-07289) VUID-vkCmdBeginQuery-queryPool-07289

If `queryPool` was created with a `queryType` of
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](#VkQueryType), then the
[VkQueryPoolPerformanceCreateInfoKHR](#VkQueryPoolPerformanceCreateInfoKHR)::`queueFamilyIndex`
`queryPool` was created with **must** equal the queue family index of
the `VkCommandPool` that `commandBuffer` was allocated from

* 
[](#VUID-vkCmdBeginQuery-queryPool-03223) VUID-vkCmdBeginQuery-queryPool-03223

If `queryPool` was created with a `queryType` of
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](#VkQueryType), the [    profiling lock](#profiling-lock) **must** have been held before [vkBeginCommandBuffer](cmdbuffers.html#vkBeginCommandBuffer)
was called on `commandBuffer`

* 
[](#VUID-vkCmdBeginQuery-queryPool-03224) VUID-vkCmdBeginQuery-queryPool-03224

If `queryPool` was created with a `queryType` of
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](#VkQueryType) and one of the counters used
to create `queryPool` was
[VK_PERFORMANCE_COUNTER_SCOPE_COMMAND_BUFFER_KHR](devsandqueues.html#VkPerformanceCounterScopeKHR), the query begin
**must** be the first recorded command in `commandBuffer`

* 
[](#VUID-vkCmdBeginQuery-queryPool-03225) VUID-vkCmdBeginQuery-queryPool-03225

If `queryPool` was created with a `queryType` of
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](#VkQueryType) and one of the counters used
to create `queryPool` was
[VK_PERFORMANCE_COUNTER_SCOPE_RENDER_PASS_KHR](devsandqueues.html#VkPerformanceCounterScopeKHR), the begin command
**must** not be recorded within a render pass instance

* 
[](#VUID-vkCmdBeginQuery-queryPool-03226) VUID-vkCmdBeginQuery-queryPool-03226

If `queryPool` was created with a `queryType` of
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](#VkQueryType) and another query pool with a
`queryType` [VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](#VkQueryType) has been used
within `commandBuffer`, its parent primary command buffer or
secondary command buffer recorded within the same parent primary command
buffer as `commandBuffer`, the
[    `performanceCounterMultipleQueryPools`](features.html#features-performanceCounterMultipleQueryPools) feature **must** be enabled

* 
[](#VUID-vkCmdBeginQuery-None-02863) VUID-vkCmdBeginQuery-None-02863

If `queryPool` was created with a `queryType` of
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](#VkQueryType), this command **must** not be
recorded in a command buffer that, either directly or through secondary
command buffers, also contains a `vkCmdResetQueryPool` command
affecting the same query

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBeginQuery-commandBuffer-parameter) VUID-vkCmdBeginQuery-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBeginQuery-queryPool-parameter) VUID-vkCmdBeginQuery-queryPool-parameter

 `queryPool` **must** be a valid [VkQueryPool](#VkQueryPool) handle

* 
[](#VUID-vkCmdBeginQuery-flags-parameter) VUID-vkCmdBeginQuery-flags-parameter

 `flags` **must** be a valid combination of [VkQueryControlFlagBits](#VkQueryControlFlagBits) values

* 
[](#VUID-vkCmdBeginQuery-commandBuffer-recording) VUID-vkCmdBeginQuery-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBeginQuery-commandBuffer-cmdpool) VUID-vkCmdBeginQuery-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_VIDEO_DECODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdBeginQuery-suspended) VUID-vkCmdBeginQuery-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdBeginQuery-commonparent) VUID-vkCmdBeginQuery-commonparent

 Both of `commandBuffer`, and `queryPool` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Both | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_VIDEO_DECODE_BIT_KHR

VK_QUEUE_VIDEO_ENCODE_BIT_KHR | Action

State |

Conditional Rendering

vkCmdBeginQuery is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To begin an indexed query, call:

// Provided by VK_EXT_transform_feedback
void vkCmdBeginQueryIndexedEXT(
    VkCommandBuffer                             commandBuffer,
    VkQueryPool                                 queryPool,
    uint32_t                                    query,
    VkQueryControlFlags                         flags,
    uint32_t                                    index);

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
`flags` is a bitmask of [VkQueryControlFlagBits](#VkQueryControlFlagBits) specifying
constraints on the types of queries that **can** be performed.

* 
`index` is the query type specific index.
When the query type is [VK_QUERY_TYPE_TRANSFORM_FEEDBACK_STREAM_EXT](#VkQueryType)
or [VK_QUERY_TYPE_PRIMITIVES_GENERATED_EXT](#VkQueryType),
the index represents the vertex stream.

The `vkCmdBeginQueryIndexedEXT` command operates the same as the
[vkCmdBeginQuery](#vkCmdBeginQuery) command, except that it also accepts a query type
specific `index` parameter.

This command defines an execution dependency between other query commands
that reference the same query index.

The first [synchronization scope](synchronization.html#synchronization-dependencies-scopes)
includes all commands which reference the queries in `queryPool`
indicated by `query` and `index` that occur earlier in
[submission order](synchronization.html#synchronization-submission-order).

The second [synchronization scope](synchronization.html#synchronization-dependencies-scopes)
includes all commands which reference the queries in `queryPool`
indicated by `query` and `index` that occur later in
[submission order](synchronization.html#synchronization-submission-order).

The operation of this command happens after the first scope and happens
before the second scope.

Valid Usage

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-None-00807) VUID-vkCmdBeginQueryIndexedEXT-None-00807

All queries used by the command **must** be *unavailable*

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-queryType-02804) VUID-vkCmdBeginQueryIndexedEXT-queryType-02804

The `queryType` used to create `queryPool` **must** not be
[VK_QUERY_TYPE_TIMESTAMP](#VkQueryType)

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-queryType-04728) VUID-vkCmdBeginQueryIndexedEXT-queryType-04728

The `queryType` used to create `queryPool` **must** not be
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_COMPACTED_SIZE_KHR](#VkQueryType) or
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_SIZE_KHR](#VkQueryType)

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-queryType-06741) VUID-vkCmdBeginQueryIndexedEXT-queryType-06741

The `queryType` used to create `queryPool` **must** not be
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SIZE_KHR](#VkQueryType) or
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_SERIALIZATION_BOTTOM_LEVEL_POINTERS_KHR](#VkQueryType)

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-queryType-04729) VUID-vkCmdBeginQueryIndexedEXT-queryType-04729

The `queryType` used to create `queryPool` **must** not be
[VK_QUERY_TYPE_ACCELERATION_STRUCTURE_COMPACTED_SIZE_NV](#VkQueryType)

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-queryType-00800) VUID-vkCmdBeginQueryIndexedEXT-queryType-00800

If the [`occlusionQueryPrecise`](features.html#features-occlusionQueryPrecise)
feature is not enabled, or the `queryType` used to create
`queryPool` was not [VK_QUERY_TYPE_OCCLUSION](#VkQueryType), `flags` **must**
not contain [VK_QUERY_CONTROL_PRECISE_BIT](#VkQueryControlFlagBits)

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-query-00802) VUID-vkCmdBeginQueryIndexedEXT-query-00802

`query` **must** be less than the number of queries in `queryPool`

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-queryType-00803) VUID-vkCmdBeginQueryIndexedEXT-queryType-00803

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_OCCLUSION](#VkQueryType), the `VkCommandPool` that
`commandBuffer` was allocated from **must** support graphics operations

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-queryType-00804) VUID-vkCmdBeginQueryIndexedEXT-queryType-00804

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_PIPELINE_STATISTICS](#VkQueryType) and any of the
`pipelineStatistics` indicate graphics operations, the
`VkCommandPool` that `commandBuffer` was allocated from **must**
support graphics operations

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-queryType-00805) VUID-vkCmdBeginQueryIndexedEXT-queryType-00805

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_PIPELINE_STATISTICS](#VkQueryType) and any of the
`pipelineStatistics` indicate compute operations, the
`VkCommandPool` that `commandBuffer` was allocated from **must**
support compute operations

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-commandBuffer-01885) VUID-vkCmdBeginQueryIndexedEXT-commandBuffer-01885

`commandBuffer` **must** not be a protected command buffer

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-query-00808) VUID-vkCmdBeginQueryIndexedEXT-query-00808

If called within a render pass instance, the sum of `query` and the
number of bits set in the current subpass’s view mask **must** be less than
or equal to the number of queries in `queryPool`

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-queryType-07126) VUID-vkCmdBeginQueryIndexedEXT-queryType-07126

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_RESULT_STATUS_ONLY_KHR](#VkQueryType), then the `VkCommandPool`
that `commandBuffer` was allocated from **must** have been created with
a queue family index that supports [result    status queries](#queries-result-status-only), as indicated by
[VkQueueFamilyQueryResultStatusPropertiesKHR](devsandqueues.html#VkQueueFamilyQueryResultStatusPropertiesKHR)::`queryResultStatusSupport`

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-None-07127) VUID-vkCmdBeginQueryIndexedEXT-None-07127

If there is a bound video session, then there **must** be no
[active](#queries-operation-active) queries

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-None-08370) VUID-vkCmdBeginQueryIndexedEXT-None-08370

If there is a bound video session, then it **must** not have been created
with [VK_VIDEO_SESSION_CREATE_INLINE_QUERIES_BIT_KHR](videocoding.html#VkVideoSessionCreateFlagBitsKHR)

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-queryType-07128) VUID-vkCmdBeginQueryIndexedEXT-queryType-07128

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_RESULT_STATUS_ONLY_KHR](#VkQueryType) and there is a bound video
session, then `queryPool` **must** have been created with a
[VkVideoProfileInfoKHR](videocoding.html#VkVideoProfileInfoKHR) structure included in the `pNext` chain
of [VkQueryPoolCreateInfo](#VkQueryPoolCreateInfo) identical to the one specified in
[VkVideoSessionCreateInfoKHR](videocoding.html#VkVideoSessionCreateInfoKHR)::`pVideoProfile` the bound video
session was created with

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-queryType-07129) VUID-vkCmdBeginQueryIndexedEXT-queryType-07129

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_VIDEO_ENCODE_FEEDBACK_KHR](#VkQueryType), then there **must** be a
bound video session

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-queryType-07130) VUID-vkCmdBeginQueryIndexedEXT-queryType-07130

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_VIDEO_ENCODE_FEEDBACK_KHR](#VkQueryType) and there is a bound video
session, then `queryPool` **must** have been created with a
[VkVideoProfileInfoKHR](videocoding.html#VkVideoProfileInfoKHR) structure included in the `pNext` chain
of [VkQueryPoolCreateInfo](#VkQueryPoolCreateInfo) identical to the one specified in
[VkVideoSessionCreateInfoKHR](videocoding.html#VkVideoSessionCreateInfoKHR)::`pVideoProfile` the bound video
session was created with

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-queryType-07131) VUID-vkCmdBeginQueryIndexedEXT-queryType-07131

If the `queryType` used to create `queryPool` was not
[VK_QUERY_TYPE_RESULT_STATUS_ONLY_KHR](#VkQueryType)
or [VK_QUERY_TYPE_VIDEO_ENCODE_FEEDBACK_KHR](#VkQueryType),
then there **must** be no bound video session

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-None-10681) VUID-vkCmdBeginQueryIndexedEXT-None-10681

This command **must** not be recorded when
[per-tile execution model](renderpass.html#renderpass-per-tile-execution-model) is
enabled

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-queryPool-04753) VUID-vkCmdBeginQueryIndexedEXT-queryPool-04753

If the `queryPool` was created with the same `queryType` as that
of another [active](#queries-operation-active) query within
`commandBuffer`, then `index` **must** not match the index used for
the active query

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-queryType-02338) VUID-vkCmdBeginQueryIndexedEXT-queryType-02338

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_TRANSFORM_FEEDBACK_STREAM_EXT](#VkQueryType) the
`VkCommandPool` that `commandBuffer` was allocated from **must**
support graphics operations

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-queryType-02339) VUID-vkCmdBeginQueryIndexedEXT-queryType-02339

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_TRANSFORM_FEEDBACK_STREAM_EXT](#VkQueryType) the `index`
parameter **must** be less than
`VkPhysicalDeviceTransformFeedbackPropertiesEXT`::`maxTransformFeedbackStreams`

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-queryType-06692) VUID-vkCmdBeginQueryIndexedEXT-queryType-06692

If the `queryType` used to create `queryPool` was not
[VK_QUERY_TYPE_TRANSFORM_FEEDBACK_STREAM_EXT](#VkQueryType)
and not [VK_QUERY_TYPE_PRIMITIVES_GENERATED_EXT](#VkQueryType),
the `index` **must** be zero

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-queryType-06689) VUID-vkCmdBeginQueryIndexedEXT-queryType-06689

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_PRIMITIVES_GENERATED_EXT](#VkQueryType) the `VkCommandPool`
that `commandBuffer` was allocated from **must** support graphics
operations

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-queryType-06690) VUID-vkCmdBeginQueryIndexedEXT-queryType-06690

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_PRIMITIVES_GENERATED_EXT](#VkQueryType) the `index` parameter
**must** be less than
`VkPhysicalDeviceTransformFeedbackPropertiesEXT`::`maxTransformFeedbackStreams`

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-queryType-06691) VUID-vkCmdBeginQueryIndexedEXT-queryType-06691

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_PRIMITIVES_GENERATED_EXT](#VkQueryType) and the
[    `primitivesGeneratedQueryWithNonZeroStreams`](features.html#features-primitivesGeneratedQueryWithNonZeroStreams) feature is not
enabled, the `index` parameter **must** be zero

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-queryType-06693) VUID-vkCmdBeginQueryIndexedEXT-queryType-06693

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_PRIMITIVES_GENERATED_EXT](#VkQueryType) then
[`primitivesGeneratedQuery`](features.html#features-primitivesGeneratedQuery)
**must** be enabled

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-queryType-02341) VUID-vkCmdBeginQueryIndexedEXT-queryType-02341

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_TRANSFORM_FEEDBACK_STREAM_EXT](#VkQueryType) then
`VkPhysicalDeviceTransformFeedbackPropertiesEXT`::`transformFeedbackQueries`
**must** be supported

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-queryType-07071) VUID-vkCmdBeginQueryIndexedEXT-queryType-07071

The `queryType` used to create `queryPool` **must** not be
[VK_QUERY_TYPE_MESH_PRIMITIVES_GENERATED_EXT](#VkQueryType)

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-queryPool-07289) VUID-vkCmdBeginQueryIndexedEXT-queryPool-07289

If `queryPool` was created with a `queryType` of
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](#VkQueryType), then the
[VkQueryPoolPerformanceCreateInfoKHR](#VkQueryPoolPerformanceCreateInfoKHR)::`queueFamilyIndex`
`queryPool` was created with **must** equal the queue family index of
the `VkCommandPool` that `commandBuffer` was allocated from

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-queryPool-03223) VUID-vkCmdBeginQueryIndexedEXT-queryPool-03223

If `queryPool` was created with a `queryType` of
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](#VkQueryType), the [    profiling lock](#profiling-lock) **must** have been held before [vkBeginCommandBuffer](cmdbuffers.html#vkBeginCommandBuffer)
was called on `commandBuffer`

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-queryPool-03224) VUID-vkCmdBeginQueryIndexedEXT-queryPool-03224

If `queryPool` was created with a `queryType` of
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](#VkQueryType) and one of the counters used
to create `queryPool` was
[VK_PERFORMANCE_COUNTER_SCOPE_COMMAND_BUFFER_KHR](devsandqueues.html#VkPerformanceCounterScopeKHR), the query begin
**must** be the first recorded command in `commandBuffer`

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-queryPool-03225) VUID-vkCmdBeginQueryIndexedEXT-queryPool-03225

If `queryPool` was created with a `queryType` of
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](#VkQueryType) and one of the counters used
to create `queryPool` was
[VK_PERFORMANCE_COUNTER_SCOPE_RENDER_PASS_KHR](devsandqueues.html#VkPerformanceCounterScopeKHR), the begin command
**must** not be recorded within a render pass instance

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-queryPool-03226) VUID-vkCmdBeginQueryIndexedEXT-queryPool-03226

If `queryPool` was created with a `queryType` of
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](#VkQueryType) and another query pool with a
`queryType` [VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](#VkQueryType) has been used
within `commandBuffer`, its parent primary command buffer or
secondary command buffer recorded within the same parent primary command
buffer as `commandBuffer`, the
[    `performanceCounterMultipleQueryPools`](features.html#features-performanceCounterMultipleQueryPools) feature **must** be enabled

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-None-02863) VUID-vkCmdBeginQueryIndexedEXT-None-02863

If `queryPool` was created with a `queryType` of
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](#VkQueryType), this command **must** not be
recorded in a command buffer that, either directly or through secondary
command buffers, also contains a `vkCmdResetQueryPool` command
affecting the same query

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-commandBuffer-parameter) VUID-vkCmdBeginQueryIndexedEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-queryPool-parameter) VUID-vkCmdBeginQueryIndexedEXT-queryPool-parameter

 `queryPool` **must** be a valid [VkQueryPool](#VkQueryPool) handle

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-flags-parameter) VUID-vkCmdBeginQueryIndexedEXT-flags-parameter

 `flags` **must** be a valid combination of [VkQueryControlFlagBits](#VkQueryControlFlagBits) values

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-commandBuffer-recording) VUID-vkCmdBeginQueryIndexedEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-commandBuffer-cmdpool) VUID-vkCmdBeginQueryIndexedEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_VIDEO_DECODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-suspended) VUID-vkCmdBeginQueryIndexedEXT-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-videocoding) VUID-vkCmdBeginQueryIndexedEXT-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBeginQueryIndexedEXT-commonparent) VUID-vkCmdBeginQueryIndexedEXT-commonparent

 Both of `commandBuffer`, and `queryPool` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_VIDEO_DECODE_BIT_KHR

VK_QUEUE_VIDEO_ENCODE_BIT_KHR | Action

State |

Conditional Rendering

vkCmdBeginQueryIndexedEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Bits which **can** be set in [vkCmdBeginQuery](#vkCmdBeginQuery)::`flags`, specifying
constraints on the types of queries that **can** be performed, are:

// Provided by VK_VERSION_1_0
typedef enum VkQueryControlFlagBits {
    VK_QUERY_CONTROL_PRECISE_BIT = 0x00000001,
} VkQueryControlFlagBits;

* 
[VK_QUERY_CONTROL_PRECISE_BIT](#VkQueryControlFlagBits) specifies the precision of
[occlusion queries](#queries-occlusion).

// Provided by VK_VERSION_1_0
typedef VkFlags VkQueryControlFlags;

`VkQueryControlFlags` is a bitmask type for setting a mask of zero or
more [VkQueryControlFlagBits](#VkQueryControlFlagBits).

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

The first [synchronization scope](synchronization.html#synchronization-dependencies-scopes)
includes all commands which reference the queries in `queryPool`
indicated by `query` that occur earlier in
[submission order](synchronization.html#synchronization-submission-order).

The second [synchronization scope](synchronization.html#synchronization-dependencies-scopes)
includes only the operation of this command.

Calling `vkCmdEndQuery` is equivalent to calling
[vkCmdEndQueryIndexedEXT](#vkCmdEndQueryIndexedEXT) with the `index` parameter set to zero.

Valid Usage

* 
[](#VUID-vkCmdEndQuery-None-01923) VUID-vkCmdEndQuery-None-01923

All queries used by the command **must** be
[active](#queries-operation-active)

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
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](#VkQueryType) and one or more of the
counters used to create `queryPool` was
[VK_PERFORMANCE_COUNTER_SCOPE_COMMAND_BUFFER_KHR](devsandqueues.html#VkPerformanceCounterScopeKHR), the
[vkCmdEndQuery](#vkCmdEndQuery) **must** be the last recorded command in
`commandBuffer`

* 
[](#VUID-vkCmdEndQuery-queryPool-03228) VUID-vkCmdEndQuery-queryPool-03228

If `queryPool` was created with a `queryType` of
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](#VkQueryType) and one or more of the
counters used to create `queryPool` was
[VK_PERFORMANCE_COUNTER_SCOPE_RENDER_PASS_KHR](devsandqueues.html#VkPerformanceCounterScopeKHR), the
[vkCmdEndQuery](#vkCmdEndQuery) **must** not be recorded within a render pass instance

* 
[](#VUID-vkCmdEndQuery-None-07007) VUID-vkCmdEndQuery-None-07007

If called within a subpass of a render pass instance, the corresponding
`vkCmdBeginQuery`* command **must** have been called previously within
the same subpass

* 
[](#VUID-vkCmdEndQuery-None-10682) VUID-vkCmdEndQuery-None-10682

This command **must** not be recorded when
[per-tile execution model](renderpass.html#renderpass-per-tile-execution-model) is
enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdEndQuery-commandBuffer-parameter) VUID-vkCmdEndQuery-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdEndQuery-queryPool-parameter) VUID-vkCmdEndQuery-queryPool-parameter

 `queryPool` **must** be a valid [VkQueryPool](#VkQueryPool) handle

* 
[](#VUID-vkCmdEndQuery-commandBuffer-recording) VUID-vkCmdEndQuery-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdEndQuery-commandBuffer-cmdpool) VUID-vkCmdEndQuery-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_VIDEO_DECODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdEndQuery-suspended) VUID-vkCmdEndQuery-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdEndQuery-commonparent) VUID-vkCmdEndQuery-commonparent

 Both of `commandBuffer`, and `queryPool` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Both | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_VIDEO_DECODE_BIT_KHR

VK_QUEUE_VIDEO_ENCODE_BIT_KHR | Action

State |

Conditional Rendering

vkCmdEndQuery is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To end an indexed query after the set of desired drawing or dispatching
commands is recorded, call:

// Provided by VK_EXT_transform_feedback
void vkCmdEndQueryIndexedEXT(
    VkCommandBuffer                             commandBuffer,
    VkQueryPool                                 queryPool,
    uint32_t                                    query,
    uint32_t                                    index);

* 
`commandBuffer` is the command buffer into which this command will
be recorded.

* 
`queryPool` is the query pool that is managing the results of the
query.

* 
`query` is the query index within the query pool where the result is
stored.

* 
`index` is the query type specific index.

The command completes the query in `queryPool` identified by `query`
and `index`, and marks it as available.

The `vkCmdEndQueryIndexedEXT` command operates the same as the
[vkCmdEndQuery](#vkCmdEndQuery) command, except that it also accepts a query type
specific `index` parameter.

This command defines an execution dependency between other query commands
that reference the same query index.

The first [synchronization scope](synchronization.html#synchronization-dependencies-scopes)
includes all commands which reference the queries in `queryPool`
indicated by `query` that occur earlier in
[submission order](synchronization.html#synchronization-submission-order).

The second [synchronization scope](synchronization.html#synchronization-dependencies-scopes)
includes only the operation of this command.

Valid Usage

* 
[](#VUID-vkCmdEndQueryIndexedEXT-None-02342) VUID-vkCmdEndQueryIndexedEXT-None-02342

All queries used by the command **must** be
[active](#queries-operation-active)

* 
[](#VUID-vkCmdEndQueryIndexedEXT-query-02343) VUID-vkCmdEndQueryIndexedEXT-query-02343

`query` **must** be less than the number of queries in `queryPool`

* 
[](#VUID-vkCmdEndQueryIndexedEXT-commandBuffer-02344) VUID-vkCmdEndQueryIndexedEXT-commandBuffer-02344

`commandBuffer` **must** not be a protected command buffer

* 
[](#VUID-vkCmdEndQueryIndexedEXT-query-02345) VUID-vkCmdEndQueryIndexedEXT-query-02345

If `vkCmdEndQueryIndexedEXT` is called within a render pass
instance, the sum of `query` and the number of bits set in the
current subpass’s view mask **must** be less than or equal to the number of
queries in `queryPool`

* 
[](#VUID-vkCmdEndQueryIndexedEXT-queryType-06694) VUID-vkCmdEndQueryIndexedEXT-queryType-06694

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_TRANSFORM_FEEDBACK_STREAM_EXT](#VkQueryType)
or [VK_QUERY_TYPE_PRIMITIVES_GENERATED_EXT](#VkQueryType),
the `index` parameter **must** be less than
`VkPhysicalDeviceTransformFeedbackPropertiesEXT`::`maxTransformFeedbackStreams`

* 
[](#VUID-vkCmdEndQueryIndexedEXT-queryType-06695) VUID-vkCmdEndQueryIndexedEXT-queryType-06695

If the `queryType` used to create `queryPool` was not
[VK_QUERY_TYPE_TRANSFORM_FEEDBACK_STREAM_EXT](#VkQueryType)
and not [VK_QUERY_TYPE_PRIMITIVES_GENERATED_EXT](#VkQueryType),
the `index` **must** be zero

* 
[](#VUID-vkCmdEndQueryIndexedEXT-queryType-06696) VUID-vkCmdEndQueryIndexedEXT-queryType-06696

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_TRANSFORM_FEEDBACK_STREAM_EXT](#VkQueryType)
or [VK_QUERY_TYPE_PRIMITIVES_GENERATED_EXT](#VkQueryType),
`index` **must** equal the `index` used to begin the query

* 
[](#VUID-vkCmdEndQueryIndexedEXT-None-07007) VUID-vkCmdEndQueryIndexedEXT-None-07007

If called within a subpass of a render pass instance, the corresponding
`vkCmdBeginQuery`* command **must** have been called previously within
the same subpass

* 
[](#VUID-vkCmdEndQueryIndexedEXT-None-10682) VUID-vkCmdEndQueryIndexedEXT-None-10682

This command **must** not be recorded when
[per-tile execution model](renderpass.html#renderpass-per-tile-execution-model) is
enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdEndQueryIndexedEXT-commandBuffer-parameter) VUID-vkCmdEndQueryIndexedEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdEndQueryIndexedEXT-queryPool-parameter) VUID-vkCmdEndQueryIndexedEXT-queryPool-parameter

 `queryPool` **must** be a valid [VkQueryPool](#VkQueryPool) handle

* 
[](#VUID-vkCmdEndQueryIndexedEXT-commandBuffer-recording) VUID-vkCmdEndQueryIndexedEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdEndQueryIndexedEXT-commandBuffer-cmdpool) VUID-vkCmdEndQueryIndexedEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_VIDEO_DECODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdEndQueryIndexedEXT-suspended) VUID-vkCmdEndQueryIndexedEXT-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdEndQueryIndexedEXT-videocoding) VUID-vkCmdEndQueryIndexedEXT-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdEndQueryIndexedEXT-commonparent) VUID-vkCmdEndQueryIndexedEXT-commonparent

 Both of `commandBuffer`, and `queryPool` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_VIDEO_DECODE_BIT_KHR

VK_QUEUE_VIDEO_ENCODE_BIT_KHR | Action

State |

Conditional Rendering

vkCmdEndQueryIndexedEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

An application **can** retrieve results either by requesting they be written
into application-provided memory, or by requesting they be copied into a
`VkBuffer`.
In either case, the layout in memory is defined as follows:

* 
The first query’s result is written starting at the first byte requested
by the command, and each subsequent query’s result begins `stride`
bytes later.

* 
Each query writes results in a tightly packed array of result values as
follows:

Occlusion queries write one unsigned integer value - the number of
samples passed.

* 
Pipeline statistics queries write one unsigned integer value for each
bit that is enabled in the `pipelineStatistics` when the pool is
created, and the statistics values are written in bit order starting
from the least significant bit.

* 
Timestamp queries write one unsigned integer value.

* 
Performance queries write one [VkPerformanceCounterResultKHR](#VkPerformanceCounterResultKHR) value
for each [VkPerformanceCounterKHR](devsandqueues.html#VkPerformanceCounterKHR) in the query.

* 
Transform feedback queries write two unsigned integer values; the first
integer is the number of primitives successfully written to the
corresponding transform feedback buffer and the second is the number of
primitives output to the vertex stream, regardless of whether they were
successfully captured or not.
In other words, if the transform feedback buffer was sized too small
for the number of primitives output by the vertex stream, the first
integer represents the number of primitives actually written and the
second is the number that would have been written if all the transform
feedback buffers associated with that vertex stream were large enough.

* 
Primitives generated queries write one unsigned integer value: the
number of primitives output to the vertex stream, regardless of whether
transform feedback is active or not, or whether they were successfully
captured by transform feedback or not.
This is identical to the second integer result value produced by
transform feedback queries if transform feedback is active.

* 
Mesh shader queries write a single unsigned integer.

* 
Video encode feedback queries write one or more signed or unsigned
integer values for each bit that is enabled in
[VkQueryPoolVideoEncodeFeedbackCreateInfoKHR](#VkQueryPoolVideoEncodeFeedbackCreateInfoKHR)::`encodeFeedbackFlags`
when the pool is created, and the feedback values are written in bit
order starting from the least significant bit, as described
[here](#queries-video-encode-feedback).

If [VK_QUERY_RESULT_WITH_AVAILABILITY_BIT](#VkQueryResultFlagBits) is specified, an
additional unsigned integer result value is written indicating whether
the query’s result is available, with any non-zero value indicating that
it is available.

If [VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](#VkQueryResultFlagBits) is specified, an additional
signed integer result value is written indicating the status of the
query result.
Positive values indicate success, negative values indicate failure, and
zero indicates that the result is not yet available.
Specific error codes are as defined in the [VkQueryResultStatusKHR](#VkQueryResultStatusKHR)
enumeration.

The bit width of all integer result values written by all query types is
either 32- or 64-bits, as requested by the command.
The only exceptions are the [VkPerformanceCounterResultKHR](#VkPerformanceCounterResultKHR) values
written by performance queries whose type is determined by the
`unit` member of the corresponding [VkPerformanceCounterKHR](devsandqueues.html#VkPerformanceCounterKHR).

If more than one query is retrieved and `stride` is not at least as
large as the size of the array of values corresponding to a single
query, the values written to memory are **undefined**.

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
`flags` is a bitmask of [VkQueryResultFlagBits](#VkQueryResultFlagBits) specifying how
and when results are returned.

Any results written for a query are written according to
[a layout dependent on the query type](#queries-operation-memorylayout).

If no bits are set in `flags`, and all requested queries are in the
available state, results are written as an array of 32-bit unsigned integer
values.
Behavior when not all queries are available is described
[below](#queries-wait-bit-not-set).

If [VK_QUERY_RESULT_WITH_AVAILABILITY_BIT](#VkQueryResultFlagBits) is set, results for all
queries in `queryPool` identified by `firstQuery` and
`queryCount` are copied to `pData`, along with an extra availability
or status
value written directly after the results of each query and interpreted as an
unsigned integer.
A value of zero indicates that the results are not yet available, otherwise
the query is complete and results are available.
The size of the availability
or status
values is 64 bits if [VK_QUERY_RESULT_64_BIT](#VkQueryResultFlagBits) is set in `flags`.
Otherwise, it is 32 bits.

If [VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](#VkQueryResultFlagBits) is set, results for all queries
in `queryPool` identified by `firstQuery` and `queryCount` are
copied to `pData`, along with an extra status value written directly
after the results of each query and interpreted as a signed integer.
A value of zero indicates that the results are not yet available.
Positive values indicate that the operations within the query completed
successfully, and the query results are valid.
Negative values indicate that the operations within the query completed
unsuccessfully.

[VkQueryResultStatusKHR](#VkQueryResultStatusKHR) defines specific meaning for values returned
here, though implementations are free to return other values.

If the status value written is negative, indicating that the operations
within the query completed unsuccessfully, then all other results written by
this command are **undefined** unless otherwise specified for any of the
results of the used query type.

|  | If [VK_QUERY_RESULT_WITH_AVAILABILITY_BIT](#VkQueryResultFlagBits)
| --- | --- |
or [VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](#VkQueryResultFlagBits)
is set, the layout of data in the buffer is a *(result,availability)*
or *(result,status)*
pair for each query returned, and `stride` is the stride between each
pair. |

Results for any available query written by this command are final and
represent the final result of the query.
If [VK_QUERY_RESULT_PARTIAL_BIT](#VkQueryResultFlagBits) is set, then for any query that is
unavailable, an intermediate result between zero and the final result value
is written for that query.
Otherwise, any result written by this command is **undefined**.

If [VK_QUERY_RESULT_64_BIT](#VkQueryResultFlagBits) is set, results and, if returned,
availability
or status
values for all queries are written as an array of 64-bit values.
If the `queryPool` was created with
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](#VkQueryType), results for each query are
written as an array of the type indicated by
[VkPerformanceCounterKHR](devsandqueues.html#VkPerformanceCounterKHR)::`storage` for the counter being queried.
Otherwise, results and availability
or status
values are written as an array of 32-bit values.
If an unsigned integer query’s value overflows the result type, the value
**may** either wrap or saturate.
If the [`maintenance7`](features.html#features-maintenance7) feature is enabled, for
an unsigned integer query, the 32-bit result value **must** be equal to the 32
least significant bits of the equivalent 64-bit result value.
If a signed integer query’s value overflows the result type, the value is
**undefined**.
If a floating-point query’s value is not representable as the result type,
the value is **undefined**.

If [VK_QUERY_RESULT_WAIT_BIT](#VkQueryResultFlagBits) is set, this command defines an execution
dependency with any earlier commands that writes one of the identified
queries.
The first [synchronization scope](synchronization.html#synchronization-dependencies-scopes)
includes all instances of [vkCmdEndQuery](#vkCmdEndQuery),
[vkCmdEndQueryIndexedEXT](#vkCmdEndQueryIndexedEXT),
[vkCmdWriteAccelerationStructuresPropertiesKHR](accelstructures.html#vkCmdWriteAccelerationStructuresPropertiesKHR),
[vkCmdWriteAccelerationStructuresPropertiesNV](accelstructures.html#vkCmdWriteAccelerationStructuresPropertiesNV),
[vkCmdWriteMicromapsPropertiesEXT](VK_EXT_opacity_micromap/micromaps.html#vkCmdWriteMicromapsPropertiesEXT),
[vkCmdWriteTimestamp2](#vkCmdWriteTimestamp2),
and [vkCmdWriteTimestamp](#vkCmdWriteTimestamp) that reference any query in `queryPool`
indicated by `firstQuery` and `queryCount`.
The second [synchronization scope](synchronization.html#synchronization-dependencies-scopes)
includes the host operations of this command.

If [VK_QUERY_RESULT_WAIT_BIT](#VkQueryResultFlagBits) is not set, `vkGetQueryPoolResults`
**may** return [VK_NOT_READY](fundamentals.html#VkResult) if there are queries in the unavailable
state.

|  | Applications **must** take care to ensure that use of the
| --- | --- |
[VK_QUERY_RESULT_WAIT_BIT](#VkQueryResultFlagBits) bit has the desired effect.

For example, if a query has been used previously and a command buffer
records the commands `vkCmdResetQueryPool`, `vkCmdBeginQuery`, and
`vkCmdEndQuery` for that query, then the query will remain in the
available state until
`vkResetQueryPool` is called or
the `vkCmdResetQueryPool` command executes on a queue.
Applications **can** use fences or events to ensure that a query has already
been reset before checking for its results or availability status.
Otherwise, a stale value could be returned from a previous use of the query.

The above also applies when [VK_QUERY_RESULT_WAIT_BIT](#VkQueryResultFlagBits) is used in
combination with [VK_QUERY_RESULT_WITH_AVAILABILITY_BIT](#VkQueryResultFlagBits).
In this case, the returned availability status **may** reflect the result of a
previous use of the query unless
`vkResetQueryPool` is called or
the `vkCmdResetQueryPool` command has been executed since the last use
of the query.

A similar situation can arise with the
[VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](#VkQueryResultFlagBits) flag. |

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
[VK_QUERY_TYPE_TIMESTAMP](#VkQueryType), `flags` **must** not contain
[VK_QUERY_RESULT_PARTIAL_BIT](#VkQueryResultFlagBits)

* 
[](#VUID-vkGetQueryPoolResults-queryType-09440) VUID-vkGetQueryPoolResults-queryType-09440

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](#VkQueryType), `flags` **must** not
contain [VK_QUERY_RESULT_WITH_AVAILABILITY_BIT](#VkQueryResultFlagBits),
[VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](#VkQueryResultFlagBits),
[VK_QUERY_RESULT_PARTIAL_BIT](#VkQueryResultFlagBits), or [VK_QUERY_RESULT_64_BIT](#VkQueryResultFlagBits)

* 
[](#VUID-vkGetQueryPoolResults-queryType-09441) VUID-vkGetQueryPoolResults-queryType-09441

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](#VkQueryType), the `queryPool` **must**
have been recorded once for each pass as retrieved via a call to
[vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR](#vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR)

* 
[](#VUID-vkGetQueryPoolResults-queryType-11874) VUID-vkGetQueryPoolResults-queryType-11874

If the `queryType` used to create `queryPool` was not
[VK_QUERY_TYPE_RESULT_STATUS_ONLY_KHR](#VkQueryType)
or [VK_QUERY_TYPE_VIDEO_ENCODE_FEEDBACK_KHR](#VkQueryType),
then `flags` **must** not include
[VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](#VkQueryResultFlagBits)

* 
[](#VUID-vkGetQueryPoolResults-queryType-09442) VUID-vkGetQueryPoolResults-queryType-09442

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_RESULT_STATUS_ONLY_KHR](#VkQueryType), then `flags` **must**
include [VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](#VkQueryResultFlagBits)

* 
[](#VUID-vkGetQueryPoolResults-flags-09443) VUID-vkGetQueryPoolResults-flags-09443

If `flags` includes [VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](#VkQueryResultFlagBits),
then it **must** not include [VK_QUERY_RESULT_WITH_AVAILABILITY_BIT](#VkQueryResultFlagBits)

* 
[](#VUID-vkGetQueryPoolResults-None-09401) VUID-vkGetQueryPoolResults-None-09401

All queries used by the command **must** not be uninitialized

* 
[](#VUID-vkGetQueryPoolResults-flags-02828) VUID-vkGetQueryPoolResults-flags-02828

If [VK_QUERY_RESULT_64_BIT](#VkQueryResultFlagBits) is not set in `flags`
and the `queryType` used to create `queryPool` was not
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](#VkQueryType),
then `pData` **must** be aligned to a multiple of `4`

* 
[](#VUID-vkGetQueryPoolResults-queryCount-12251) VUID-vkGetQueryPoolResults-queryCount-12251

If `queryCount` is greater than 1, [VK_QUERY_RESULT_64_BIT](#VkQueryResultFlagBits) is
not set in `flags`
and the `queryType` used to create `queryPool` was not
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](#VkQueryType),
then `stride` **must** be a multiple of `4`

* 
[](#VUID-vkGetQueryPoolResults-flags-00815) VUID-vkGetQueryPoolResults-flags-00815

If [VK_QUERY_RESULT_64_BIT](#VkQueryResultFlagBits) is set in `flags` then `pData`
**must** be aligned to a multiple of `8`

* 
[](#VUID-vkGetQueryPoolResults-queryCount-12252) VUID-vkGetQueryPoolResults-queryCount-12252

If `queryCount` is greater than 1 and [VK_QUERY_RESULT_64_BIT](#VkQueryResultFlagBits)
is set in `flags`, then `stride` **must** be a multiple of `8`

* 
[](#VUID-vkGetQueryPoolResults-stride-08993) VUID-vkGetQueryPoolResults-stride-08993

    If `queryCount` is greater than 1 and
    [VK_QUERY_RESULT_WITH_AVAILABILITY_BIT](#VkQueryResultFlagBits) is set, `stride` **must**
    be large enough to contain the unsigned integer representing
    availability
or status
    in addition to the query result

* 
[](#VUID-vkGetQueryPoolResults-queryType-03229) VUID-vkGetQueryPoolResults-queryType-03229

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](#VkQueryType), then `pData` **must** be
aligned to a multiple of the size of [VkPerformanceCounterResultKHR](#VkPerformanceCounterResultKHR)

* 
[](#VUID-vkGetQueryPoolResults-queryCount-12253) VUID-vkGetQueryPoolResults-queryCount-12253

If `queryCount` is greater than 1 and the `queryType` used to
create `queryPool` was [VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](#VkQueryType),
then `stride` **must** be a multiple of the size of
[VkPerformanceCounterResultKHR](#VkPerformanceCounterResultKHR)

* 
[](#VUID-vkGetQueryPoolResults-queryType-04519) VUID-vkGetQueryPoolResults-queryType-04519

If `queryCount` is greater than 1 and the `queryType` used to
create `queryPool` was [VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](#VkQueryType),
then `stride` **must** be large enough to contain the
[VkQueryPoolPerformanceCreateInfoKHR](#VkQueryPoolPerformanceCreateInfoKHR)::`counterIndexCount` used
to create `queryPool` times the size of
[VkPerformanceCounterResultKHR](#VkPerformanceCounterResultKHR)

* 
[](#VUID-vkGetQueryPoolResults-dataSize-00817) VUID-vkGetQueryPoolResults-dataSize-00817

`dataSize` **must** be large enough to contain the result of each
query, as described [here](#queries-operation-memorylayout)

Valid Usage (Implicit)

* 
[](#VUID-vkGetQueryPoolResults-device-parameter) VUID-vkGetQueryPoolResults-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetQueryPoolResults-queryPool-parameter) VUID-vkGetQueryPoolResults-queryPool-parameter

 `queryPool` **must** be a valid [VkQueryPool](#VkQueryPool) handle

* 
[](#VUID-vkGetQueryPoolResults-pData-parameter) VUID-vkGetQueryPoolResults-pData-parameter

 `pData` **must** be a valid pointer to an array of `dataSize` bytes

* 
[](#VUID-vkGetQueryPoolResults-flags-parameter) VUID-vkGetQueryPoolResults-flags-parameter

 `flags` **must** be a valid combination of [VkQueryResultFlagBits](#VkQueryResultFlagBits) values

* 
[](#VUID-vkGetQueryPoolResults-dataSize-arraylength) VUID-vkGetQueryPoolResults-dataSize-arraylength

 `dataSize` **must** be greater than `0`

* 
[](#VUID-vkGetQueryPoolResults-queryPool-parent) VUID-vkGetQueryPoolResults-queryPool-parent

 `queryPool` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_NOT_READY](fundamentals.html#VkResult)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_DEVICE_LOST](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

Bits which **can** be set in [vkGetQueryPoolResults](#vkGetQueryPoolResults)::`flags` and
[vkCmdCopyQueryPoolResults](#vkCmdCopyQueryPoolResults)::`flags`, specifying how and when
results are returned, are:

// Provided by VK_VERSION_1_0
typedef enum VkQueryResultFlagBits {
    VK_QUERY_RESULT_64_BIT = 0x00000001,
    VK_QUERY_RESULT_WAIT_BIT = 0x00000002,
    VK_QUERY_RESULT_WITH_AVAILABILITY_BIT = 0x00000004,
    VK_QUERY_RESULT_PARTIAL_BIT = 0x00000008,
  // Provided by VK_KHR_video_queue
    VK_QUERY_RESULT_WITH_STATUS_BIT_KHR = 0x00000010,
} VkQueryResultFlagBits;

* 
[VK_QUERY_RESULT_64_BIT](#VkQueryResultFlagBits) specifies the results will be written as an
array of 64-bit unsigned integer values.
If this bit is not set, the results will be written as an array of
32-bit unsigned integer values.

* 
[VK_QUERY_RESULT_WAIT_BIT](#VkQueryResultFlagBits) specifies that Vulkan will wait for each
query’s status to become available before retrieving its results.

* 
[VK_QUERY_RESULT_WITH_AVAILABILITY_BIT](#VkQueryResultFlagBits) specifies that the
availability status accompanies the results.

* 
[VK_QUERY_RESULT_PARTIAL_BIT](#VkQueryResultFlagBits) specifies that returning partial
results is acceptable.

* 
[VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](#VkQueryResultFlagBits) specifies that the last value
returned in the query is a [VkQueryResultStatusKHR](#VkQueryResultStatusKHR) value.
See [result status query](#queries-result-status-only) for information
on how an application can determine whether the use of this flag bit is
supported.

// Provided by VK_VERSION_1_0
typedef VkFlags VkQueryResultFlags;

`VkQueryResultFlags` is a bitmask type for setting a mask of zero or
more [VkQueryResultFlagBits](#VkQueryResultFlagBits).

Specific status codes that **can** be returned from a query are:

// Provided by VK_KHR_video_queue
typedef enum VkQueryResultStatusKHR {
    VK_QUERY_RESULT_STATUS_ERROR_KHR = -1,
    VK_QUERY_RESULT_STATUS_NOT_READY_KHR = 0,
    VK_QUERY_RESULT_STATUS_COMPLETE_KHR = 1,
  // Provided by VK_KHR_video_encode_queue
    VK_QUERY_RESULT_STATUS_INSUFFICIENT_BITSTREAM_BUFFER_RANGE_KHR = -1000299000,
} VkQueryResultStatusKHR;

* 
[VK_QUERY_RESULT_STATUS_NOT_READY_KHR](#VkQueryResultStatusKHR) specifies that the query
result is not yet available.

* 
[VK_QUERY_RESULT_STATUS_ERROR_KHR](#VkQueryResultStatusKHR) specifies that operations did not
complete successfully.

* 
[VK_QUERY_RESULT_STATUS_COMPLETE_KHR](#VkQueryResultStatusKHR) specifies that operations
completed successfully and the query result is available.

* 
[VK_QUERY_RESULT_STATUS_INSUFFICIENT_BITSTREAM_BUFFER_RANGE_KHR](#VkQueryResultStatusKHR)
specifies that a video encode operation did not complete successfully
due to the destination video bitstream buffer range not being
sufficiently large to fit the encoded bitstream data.

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
`pDstRange` is a pointer to a [VkStridedDeviceAddressRangeKHR](fundamentals.html#VkStridedDeviceAddressRangeKHR)
describing a range of memory addressed with a stride that will receive
the results of the copy command.

* 
`dstFlags` is a [VkAddressCommandFlagsKHR](fundamentals.html#VkAddressCommandFlagsKHR) value defining the
flags for the destination address range.

* 
`queryResultFlags` is a bitmask of [VkQueryResultFlagBits](#VkQueryResultFlagBits)
specifying how and when results are returned.

Any results written for a query are written according to
[a layout dependent on the query type](#queries-operation-memorylayout).

Results for any query in `queryPool` identified by `firstQuery` and
`queryCount` that is available are copied to `pDstRange`.

If [VK_QUERY_RESULT_WITH_AVAILABILITY_BIT](#VkQueryResultFlagBits) is set, results for all
queries in `queryPool` identified by `firstQuery` and
`queryCount` are copied to `pDstRange`, along with an extra
availability value written directly after the results of each query and
interpreted as an unsigned integer.
A value of zero indicates that the results are not yet available, otherwise
the query is complete and results are available.

If [VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](#VkQueryResultFlagBits) is set, results for all queries
in `queryPool` identified by `firstQuery` and `queryCount` are
copied to `pDstRange`, along with an extra status value written directly
after the results of each query and interpreted as a signed integer.
A value of zero indicates that the results are not yet available.
Positive values indicate that the operations within the query completed
successfully, and the query results are valid.
Negative values indicate that the operations within the query completed
unsuccessfully.

[VkQueryResultStatusKHR](#VkQueryResultStatusKHR) defines specific meaning for values returned
here, though implementations are free to return other values.

If the status value written is negative, indicating that the operations
within the query completed unsuccessfully, then all other results written by
this command are **undefined** unless otherwise specified for any of the
results of the used query type.

Results for any available query written by this command are final and
represent the final result of the query.
If [VK_QUERY_RESULT_PARTIAL_BIT](#VkQueryResultFlagBits) is set, then for any query that is
unavailable, an intermediate result between zero and the final result value
is written for that query.
Otherwise, any result written by this command is **undefined**.

If [VK_QUERY_RESULT_64_BIT](#VkQueryResultFlagBits) is set, results and availability
or status
values for all queries are written as an array of 64-bit values.
If the `queryPool` was created with
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](#VkQueryType), results for each query are
written as an array of the type indicated by
[VkPerformanceCounterKHR](devsandqueues.html#VkPerformanceCounterKHR)::`storage` for the counter being queried.
Otherwise, results and availability
or status
values are written as an array of 32-bit values.
If an unsigned integer query’s value overflows the result type, the value
**may** either wrap or saturate.
If the [`maintenance7`](features.html#features-maintenance7) feature is enabled, for
an unsigned integer query, the 32-bit result value **must** be equal to the 32
least significant bits of the equivalent 64-bit result value.
If a signed integer query’s value overflows the result type, the value is
**undefined**.
If a floating-point query’s value is not representable as the result type,
the value is **undefined**.

This command defines an execution dependency between other query commands
that reference the same query.

The first [synchronization scope](synchronization.html#synchronization-dependencies-scopes)
includes all commands which reference the queries in `queryPool`
indicated by `query` that occur earlier in
[submission order](synchronization.html#synchronization-submission-order).
If `flags` does not include [VK_QUERY_RESULT_WAIT_BIT](#VkQueryResultFlagBits),
[vkCmdEndQueryIndexedEXT](#vkCmdEndQueryIndexedEXT),
[vkCmdWriteTimestamp2](#vkCmdWriteTimestamp2),
[vkCmdEndQuery](#vkCmdEndQuery), and [vkCmdWriteTimestamp](#vkCmdWriteTimestamp) are excluded from this
scope.

The second [synchronization scope](synchronization.html#synchronization-dependencies-scopes)
includes all commands which reference the queries in `queryPool`
indicated by `query` that occur later in
[submission order](synchronization.html#synchronization-submission-order).

The operation of this command happens after the first scope and happens
before the second scope.

`vkCmdCopyQueryPoolResultsToMemoryKHR` is considered to be a transfer
operation, and its writes to buffer memory **must** be synchronized using
[VK_PIPELINE_STAGE_TRANSFER_BIT](synchronization.html#VkPipelineStageFlagBits) and [VK_ACCESS_TRANSFER_WRITE_BIT](synchronization.html#VkAccessFlagBits)
before using the results.

Valid Usage

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-13097) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-13097

If the range specified by `pDstRange` is not bound completely
to memory when accessed, `dstFlags` **must** not include
[VK_ADDRESS_COMMAND_FULLY_BOUND_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-13098) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-13098

If the buffer from which the range specified by `pDstRange` was
created with [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits), and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
`dstFlags` **must** include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-13099) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-13099

If the buffer from which the range specified by `pDstRange` was
created without [VK_BUFFER_CREATE_PROTECTED_BIT](resources.html#VkBufferCreateFlagBits), and
[`protectedNoFault`](devsandqueues.html#limits-protectedNoFault) is not supported,
`dstFlags` **must** not include
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-dstFlags-13100) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-dstFlags-13100

`dstFlags` **must** not include both
[VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR) and
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-13122) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-13122

If any buffer, which is bound to a range of [VkDeviceMemory](memory.html#VkDeviceMemory) that
overlaps the range backing `pDstRange`, was created with
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits), `dstFlags` **must**
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR) or
[VK_ADDRESS_COMMAND_UNKNOWN_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-13123) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-13123

If any buffer, which is bound to a range of [VkDeviceMemory](memory.html#VkDeviceMemory) that
overlaps the range backing `pDstRange`, was created without
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits), `dstFlags` **must** not
include [VK_ADDRESS_COMMAND_STORAGE_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-dstFlags-13101) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-dstFlags-13101

`dstFlags` **must** not include both
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR) and
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-13124) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-13124

If any buffer, which is bound to a range of [VkDeviceMemory](memory.html#VkDeviceMemory) that
overlaps the range backing `pDstRange`, was created with
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits),
`dstFlags` **must** include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR) or
[VK_ADDRESS_COMMAND_UNKNOWN_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-13125) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-13125

If any buffer, which is bound to a range of [VkDeviceMemory](memory.html#VkDeviceMemory) that
overlaps the range backing `pDstRange`, was created without
[VK_BUFFER_USAGE_TRANSFORM_FEEDBACK_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits),
`dstFlags` **must** not include
[VK_ADDRESS_COMMAND_TRANSFORM_FEEDBACK_BUFFER_USAGE_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

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
[VK_QUERY_TYPE_TIMESTAMP](#VkQueryType), `queryResultFlags` **must** not contain
[VK_QUERY_RESULT_PARTIAL_BIT](#VkQueryResultFlagBits)

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-queryType-09440) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-queryType-09440

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](#VkQueryType), `queryResultFlags` **must** not
contain [VK_QUERY_RESULT_WITH_AVAILABILITY_BIT](#VkQueryResultFlagBits),
[VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](#VkQueryResultFlagBits),
[VK_QUERY_RESULT_PARTIAL_BIT](#VkQueryResultFlagBits), or [VK_QUERY_RESULT_64_BIT](#VkQueryResultFlagBits)

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-queryType-09441) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-queryType-09441

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](#VkQueryType), the `queryPool` **must**
have been recorded once for each pass as retrieved via a call to
[vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR](#vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR)

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-queryType-11874) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-queryType-11874

If the `queryType` used to create `queryPool` was not
[VK_QUERY_TYPE_RESULT_STATUS_ONLY_KHR](#VkQueryType)
or [VK_QUERY_TYPE_VIDEO_ENCODE_FEEDBACK_KHR](#VkQueryType),
then `queryResultFlags` **must** not include
[VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](#VkQueryResultFlagBits)

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-queryType-09442) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-queryType-09442

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_RESULT_STATUS_ONLY_KHR](#VkQueryType), then `queryResultFlags` **must**
include [VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](#VkQueryResultFlagBits)

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-flags-09443) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-flags-09443

If `queryResultFlags` includes [VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](#VkQueryResultFlagBits),
then it **must** not include [VK_QUERY_RESULT_WITH_AVAILABILITY_BIT](#VkQueryResultFlagBits)

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-None-13076) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-None-13076

All queries used by the command **must** not be uninitialized when the
command is executed

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-flags-13077) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-flags-13077

If [VK_QUERY_RESULT_64_BIT](#VkQueryResultFlagBits) is not set in `flags` then
`pDstRange->address` and `pDstRange->stride` **must** be multiples
of 4

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-flags-13078) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-flags-13078

If [VK_QUERY_RESULT_64_BIT](#VkQueryResultFlagBits) is set in `flags` then
`pDstRange->address` and `pDstRange->stride` **must** be multiples
of 8

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-13079) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-13079

`pDstRange->size` **must** be large enough to contain the result of
each query, as described [here](#queries-operation-memorylayout)

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-13080) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-13080

The buffer from which the range defined by `pDstRange` was queried
**must** have been created with [VK_BUFFER_USAGE_TRANSFER_DST_BIT](resources.html#VkBufferUsageFlagBits)
usage flag

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-queryType-13081) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-queryType-13081

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](#VkQueryType),
[VkPhysicalDevicePerformanceQueryPropertiesKHR](limits.html#VkPhysicalDevicePerformanceQueryPropertiesKHR)::`allowCommandBufferQueryCopies`
**must** be [VK_TRUE](fundamentals.html#VK_TRUE)

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-queryType-13082) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-queryType-13082

`vkCmdCopyQueryPoolResultsToMemoryKHR` **must** not be called if the
`queryType` used to create `queryPool` was
[VK_QUERY_TYPE_PERFORMANCE_QUERY_INTEL](#VkQueryType)

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
[VK_ADDRESS_COMMAND_PROTECTED_BIT_KHR](fundamentals.html#VkAddressCommandFlagBitsKHR)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-commandBuffer-parameter) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-queryPool-parameter) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-queryPool-parameter

 `queryPool` **must** be a valid [VkQueryPool](#VkQueryPool) handle

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-parameter) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-pDstRange-parameter

 `pDstRange` **must** be a valid pointer to a valid [VkStridedDeviceAddressRangeKHR](fundamentals.html#VkStridedDeviceAddressRangeKHR) structure

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-dstFlags-parameter) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-dstFlags-parameter

 `dstFlags` **must** be a valid combination of [VkAddressCommandFlagBitsKHR](fundamentals.html#VkAddressCommandFlagBitsKHR) values

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-queryResultFlags-parameter) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-queryResultFlags-parameter

 `queryResultFlags` **must** be a valid combination of [VkQueryResultFlagBits](#VkQueryResultFlagBits) values

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-commandBuffer-recording) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-commandBuffer-cmdpool) VUID-vkCmdCopyQueryPoolResultsToMemoryKHR-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_TRANSFER_BIT](devsandqueues.html#VkQueueFlagBits) operations

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

 Both of `commandBuffer`, and `queryPool` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_TRANSFER_BIT | Action |

Conditional Rendering

vkCmdCopyQueryPoolResultsToMemoryKHR is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

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
`dstBuffer` is a [VkBuffer](resources.html#VkBuffer) object that will receive the results
of the copy command.

* 
`dstOffset` is an offset into `dstBuffer`.

* 
`stride` is the stride in bytes between results for individual
queries within `dstBuffer`.
The required size of the backing memory for `dstBuffer` is
determined as described above for [vkGetQueryPoolResults](#vkGetQueryPoolResults).

* 
`flags` is a bitmask of [VkQueryResultFlagBits](#VkQueryResultFlagBits) specifying how
and when results are returned.

Any results written for a query are written according to
[a layout dependent on the query type](#queries-operation-memorylayout).

Results for any query in `queryPool` identified by `firstQuery` and
`queryCount` that is available are copied to `dstBuffer`.

If [VK_QUERY_RESULT_WITH_AVAILABILITY_BIT](#VkQueryResultFlagBits) is set, results for all
queries in `queryPool` identified by `firstQuery` and
`queryCount` are copied to `dstBuffer`, along with an extra
availability value written directly after the results of each query and
interpreted as an unsigned integer.
A value of zero indicates that the results are not yet available, otherwise
the query is complete and results are available.

If [VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](#VkQueryResultFlagBits) is set, results for all queries
in `queryPool` identified by `firstQuery` and `queryCount` are
copied to `dstBuffer`, along with an extra status value written directly
after the results of each query and interpreted as a signed integer.
A value of zero indicates that the results are not yet available.
Positive values indicate that the operations within the query completed
successfully, and the query results are valid.
Negative values indicate that the operations within the query completed
unsuccessfully.

[VkQueryResultStatusKHR](#VkQueryResultStatusKHR) defines specific meaning for values returned
here, though implementations are free to return other values.

If the status value written is negative, indicating that the operations
within the query completed unsuccessfully, then all other results written by
this command are **undefined** unless otherwise specified for any of the
results of the used query type.

Results for any available query written by this command are final and
represent the final result of the query.
If [VK_QUERY_RESULT_PARTIAL_BIT](#VkQueryResultFlagBits) is set, then for any query that is
unavailable, an intermediate result between zero and the final result value
is written for that query.
Otherwise, any result written by this command is **undefined**.

If [VK_QUERY_RESULT_64_BIT](#VkQueryResultFlagBits) is set, results and availability
or status
values for all queries are written as an array of 64-bit values.
If the `queryPool` was created with
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](#VkQueryType), results for each query are
written as an array of the type indicated by
[VkPerformanceCounterKHR](devsandqueues.html#VkPerformanceCounterKHR)::`storage` for the counter being queried.
Otherwise, results and availability
or status
values are written as an array of 32-bit values.
If an unsigned integer query’s value overflows the result type, the value
**may** either wrap or saturate.
If the [`maintenance7`](features.html#features-maintenance7) feature is enabled, for
an unsigned integer query, the 32-bit result value **must** be equal to the 32
least significant bits of the equivalent 64-bit result value.
If a signed integer query’s value overflows the result type, the value is
**undefined**.
If a floating-point query’s value is not representable as the result type,
the value is **undefined**.

This command defines an execution dependency between other query commands
that reference the same query.

The first [synchronization scope](synchronization.html#synchronization-dependencies-scopes)
includes all commands which reference the queries in `queryPool`
indicated by `query` that occur earlier in
[submission order](synchronization.html#synchronization-submission-order).
If `flags` does not include [VK_QUERY_RESULT_WAIT_BIT](#VkQueryResultFlagBits),
[vkCmdEndQuery](#vkCmdEndQuery),
[vkCmdEndQueryIndexedEXT](#vkCmdEndQueryIndexedEXT),
[vkCmdWriteAccelerationStructuresPropertiesKHR](accelstructures.html#vkCmdWriteAccelerationStructuresPropertiesKHR),
[vkCmdWriteAccelerationStructuresPropertiesNV](accelstructures.html#vkCmdWriteAccelerationStructuresPropertiesNV),
[vkCmdWriteMicromapsPropertiesEXT](VK_EXT_opacity_micromap/micromaps.html#vkCmdWriteMicromapsPropertiesEXT),
[vkCmdWriteTimestamp2](#vkCmdWriteTimestamp2),
and [vkCmdWriteTimestamp](#vkCmdWriteTimestamp) are excluded from this scope.

The second [synchronization scope](synchronization.html#synchronization-dependencies-scopes)
includes all commands which reference the queries in `queryPool`
indicated by `query` that occur later in
[submission order](synchronization.html#synchronization-submission-order).

The operation of this command happens after the first scope and happens
before the second scope.

`vkCmdCopyQueryPoolResults` is considered to be a transfer operation,
and its writes to buffer memory **must** be synchronized using
[VK_PIPELINE_STAGE_TRANSFER_BIT](synchronization.html#VkPipelineStageFlagBits) and [VK_ACCESS_TRANSFER_WRITE_BIT](synchronization.html#VkAccessFlagBits)
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
[VK_QUERY_TYPE_TIMESTAMP](#VkQueryType), `flags` **must** not contain
[VK_QUERY_RESULT_PARTIAL_BIT](#VkQueryResultFlagBits)

* 
[](#VUID-vkCmdCopyQueryPoolResults-queryType-09440) VUID-vkCmdCopyQueryPoolResults-queryType-09440

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](#VkQueryType), `flags` **must** not
contain [VK_QUERY_RESULT_WITH_AVAILABILITY_BIT](#VkQueryResultFlagBits),
[VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](#VkQueryResultFlagBits),
[VK_QUERY_RESULT_PARTIAL_BIT](#VkQueryResultFlagBits), or [VK_QUERY_RESULT_64_BIT](#VkQueryResultFlagBits)

* 
[](#VUID-vkCmdCopyQueryPoolResults-queryType-09441) VUID-vkCmdCopyQueryPoolResults-queryType-09441

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](#VkQueryType), the `queryPool` **must**
have been recorded once for each pass as retrieved via a call to
[vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR](#vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR)

* 
[](#VUID-vkCmdCopyQueryPoolResults-queryType-11874) VUID-vkCmdCopyQueryPoolResults-queryType-11874

If the `queryType` used to create `queryPool` was not
[VK_QUERY_TYPE_RESULT_STATUS_ONLY_KHR](#VkQueryType)
or [VK_QUERY_TYPE_VIDEO_ENCODE_FEEDBACK_KHR](#VkQueryType),
then `flags` **must** not include
[VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](#VkQueryResultFlagBits)

* 
[](#VUID-vkCmdCopyQueryPoolResults-queryType-09442) VUID-vkCmdCopyQueryPoolResults-queryType-09442

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_RESULT_STATUS_ONLY_KHR](#VkQueryType), then `flags` **must**
include [VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](#VkQueryResultFlagBits)

* 
[](#VUID-vkCmdCopyQueryPoolResults-flags-09443) VUID-vkCmdCopyQueryPoolResults-flags-09443

If `flags` includes [VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](#VkQueryResultFlagBits),
then it **must** not include [VK_QUERY_RESULT_WITH_AVAILABILITY_BIT](#VkQueryResultFlagBits)

* 
[](#VUID-vkCmdCopyQueryPoolResults-None-09402) VUID-vkCmdCopyQueryPoolResults-None-09402

All queries used by the command **must** not be uninitialized when the
command is executed

* 
[](#VUID-vkCmdCopyQueryPoolResults-dstOffset-00819) VUID-vkCmdCopyQueryPoolResults-dstOffset-00819

`dstOffset` **must** be less than the size of `dstBuffer`

* 
[](#VUID-vkCmdCopyQueryPoolResults-flags-00822) VUID-vkCmdCopyQueryPoolResults-flags-00822

If [VK_QUERY_RESULT_64_BIT](#VkQueryResultFlagBits) is not set in `flags` then
`dstOffset` **must** be a multiple of `4`

* 
[](#VUID-vkCmdCopyQueryPoolResults-queryCount-12254) VUID-vkCmdCopyQueryPoolResults-queryCount-12254

If `queryCount` is greater than 1 and [VK_QUERY_RESULT_64_BIT](#VkQueryResultFlagBits)
is not set in `flags` then `stride` **must** be a multiple of `4`

* 
[](#VUID-vkCmdCopyQueryPoolResults-flags-00823) VUID-vkCmdCopyQueryPoolResults-flags-00823

If [VK_QUERY_RESULT_64_BIT](#VkQueryResultFlagBits) is set in `flags` then
`dstOffset` **must** be a multiple of `8`

* 
[](#VUID-vkCmdCopyQueryPoolResults-queryCount-12255) VUID-vkCmdCopyQueryPoolResults-queryCount-12255

If `queryCount` is greater than 1 and [VK_QUERY_RESULT_64_BIT](#VkQueryResultFlagBits)
is set in `flags` then `stride` **must** be a multiple of `8`

* 
[](#VUID-vkCmdCopyQueryPoolResults-dstBuffer-00824) VUID-vkCmdCopyQueryPoolResults-dstBuffer-00824

`dstBuffer` **must** have enough storage, from `dstOffset`, to
contain the result of each query, as described
[here](#queries-operation-memorylayout)

* 
[](#VUID-vkCmdCopyQueryPoolResults-dstBuffer-00825) VUID-vkCmdCopyQueryPoolResults-dstBuffer-00825

`dstBuffer` **must** have been created with the
[VK_BUFFER_USAGE_TRANSFER_DST_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdCopyQueryPoolResults-dstBuffer-00826) VUID-vkCmdCopyQueryPoolResults-dstBuffer-00826

If `dstBuffer` is non-sparse then it **must** be bound completely and
contiguously to a single `VkDeviceMemory` object

* 
[](#VUID-vkCmdCopyQueryPoolResults-queryType-03232) VUID-vkCmdCopyQueryPoolResults-queryType-03232

If the `queryType` used to create `queryPool` was
[VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](#VkQueryType),
[VkPhysicalDevicePerformanceQueryPropertiesKHR](limits.html#VkPhysicalDevicePerformanceQueryPropertiesKHR)::`allowCommandBufferQueryCopies`
**must** be [VK_TRUE](fundamentals.html#VK_TRUE)

* 
[](#VUID-vkCmdCopyQueryPoolResults-queryType-02734) VUID-vkCmdCopyQueryPoolResults-queryType-02734

[vkCmdCopyQueryPoolResults](#vkCmdCopyQueryPoolResults) **must** not be called if the
`queryType` used to create `queryPool` was
[VK_QUERY_TYPE_PERFORMANCE_QUERY_INTEL](#VkQueryType)

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

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdCopyQueryPoolResults-queryPool-parameter) VUID-vkCmdCopyQueryPoolResults-queryPool-parameter

 `queryPool` **must** be a valid [VkQueryPool](#VkQueryPool) handle

* 
[](#VUID-vkCmdCopyQueryPoolResults-dstBuffer-parameter) VUID-vkCmdCopyQueryPoolResults-dstBuffer-parameter

 `dstBuffer` **must** be a valid [VkBuffer](resources.html#VkBuffer) handle

* 
[](#VUID-vkCmdCopyQueryPoolResults-flags-parameter) VUID-vkCmdCopyQueryPoolResults-flags-parameter

 `flags` **must** be a valid combination of [VkQueryResultFlagBits](#VkQueryResultFlagBits) values

* 
[](#VUID-vkCmdCopyQueryPoolResults-commandBuffer-recording) VUID-vkCmdCopyQueryPoolResults-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdCopyQueryPoolResults-commandBuffer-cmdpool) VUID-vkCmdCopyQueryPoolResults-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

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

 Each of `commandBuffer`, `dstBuffer`, and `queryPool` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Outside | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | Action |

Conditional Rendering

vkCmdCopyQueryPoolResults is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Rendering operations such as clears, MSAA resolves, attachment load/store
operations, and blits **may** count towards the results of queries.
This behavior is implementation-dependent and **may** vary depending on the
path used within an implementation.
For example, some implementations have several types of clears, some of
which **may** include vertices and some not.

Occlusion queries track the number of samples that pass the per-fragment
tests for a set of drawing commands.
As such, occlusion queries are only available on queue families supporting
graphics operations.
The application **can** then use these results to inform future rendering
decisions.
An occlusion query is begun and ended by calling `vkCmdBeginQuery` and
`vkCmdEndQuery`, respectively.
When an occlusion query begins, the count of passing samples always starts
at zero.
For each drawing command, the count is incremented as described in
[Sample Counting](fragops.html#fragops-samplecount).
If `flags` does not contain [VK_QUERY_CONTROL_PRECISE_BIT](#VkQueryControlFlagBits) an
implementation **may** generate any non-zero result value for the query if the
count of passing samples is non-zero.

|  | Not setting [VK_QUERY_CONTROL_PRECISE_BIT](#VkQueryControlFlagBits) mode **may** be more efficient
| --- | --- |
on some implementations, and **should** be used where it is sufficient to know
a boolean result on whether any samples passed the per-fragment tests.
In this case, some implementations **may** only return zero or one, regardless
of the actual number of samples passing the per-fragment tests.

Setting [VK_QUERY_CONTROL_PRECISE_BIT](#VkQueryControlFlagBits) does not guarantee that different
implementations return the same number of samples in an occlusion query.
Some implementations may kill fragments in the
[pre-rasterization shader stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization), and these killed fragments do not contribute to the final result of
the query.
It is possible that some implementations generate a zero result value for
the query, while others generate a non-zero value. |

When an occlusion query finishes, the result for that query is marked as
available.
The application **can** then either copy the result to a buffer (via
`vkCmdCopyQueryPoolResults`) or request it be put into host memory (via
`vkGetQueryPoolResults`).

|  | If occluding geometry is not drawn first, samples **can** pass the depth test,
| --- | --- |
but still not be visible in a final image. |

Pipeline statistics queries allow the application to sample a specified set
of `VkPipeline` counters.
These counters are accumulated by Vulkan for a set of
either drawing or
dispatching commands while a pipeline statistics query is active.
As such, pipeline statistics queries are available on queue families
supporting
either graphics or
compute operations.
The availability of pipeline statistics queries is indicated by the
`pipelineStatisticsQuery` member of the `VkPhysicalDeviceFeatures`
object (see `vkGetPhysicalDeviceFeatures` and `vkCreateDevice` for
detecting and requesting this query type on a `VkDevice`).

A pipeline statistics query is begun and ended by calling
`vkCmdBeginQuery` and `vkCmdEndQuery`, respectively.
When a pipeline statistics query begins, all statistics counters are set to
zero.
While the query is active, the pipeline type determines which set of
statistics are available, but these **must** be configured on the query pool
when it is created.
If a statistic counter is issued on a command buffer that does not support
the corresponding operation, or the counter corresponds to a shading stage
which is missing from any of the pipelines used while the query is active,
the value of that counter is **undefined** after the query has been made
available.
At least one statistic counter relevant to the operations supported on the
recording command buffer **must** be enabled.

Bits which **can** be set in
[VkQueryPoolCreateInfo](#VkQueryPoolCreateInfo)::`pipelineStatistics` for query pools and in
[VkCommandBufferInheritanceInfo](cmdbuffers.html#VkCommandBufferInheritanceInfo)::`pipelineStatistics` for secondary
command buffers, individually enabling pipeline statistics counters, are:

// Provided by VK_VERSION_1_0
typedef enum VkQueryPipelineStatisticFlagBits {
    VK_QUERY_PIPELINE_STATISTIC_INPUT_ASSEMBLY_VERTICES_BIT = 0x00000001,
    VK_QUERY_PIPELINE_STATISTIC_INPUT_ASSEMBLY_PRIMITIVES_BIT = 0x00000002,
    VK_QUERY_PIPELINE_STATISTIC_VERTEX_SHADER_INVOCATIONS_BIT = 0x00000004,
    VK_QUERY_PIPELINE_STATISTIC_GEOMETRY_SHADER_INVOCATIONS_BIT = 0x00000008,
    VK_QUERY_PIPELINE_STATISTIC_GEOMETRY_SHADER_PRIMITIVES_BIT = 0x00000010,
    VK_QUERY_PIPELINE_STATISTIC_CLIPPING_INVOCATIONS_BIT = 0x00000020,
    VK_QUERY_PIPELINE_STATISTIC_CLIPPING_PRIMITIVES_BIT = 0x00000040,
    VK_QUERY_PIPELINE_STATISTIC_FRAGMENT_SHADER_INVOCATIONS_BIT = 0x00000080,
    VK_QUERY_PIPELINE_STATISTIC_TESSELLATION_CONTROL_SHADER_PATCHES_BIT = 0x00000100,
    VK_QUERY_PIPELINE_STATISTIC_TESSELLATION_EVALUATION_SHADER_INVOCATIONS_BIT = 0x00000200,
    VK_QUERY_PIPELINE_STATISTIC_COMPUTE_SHADER_INVOCATIONS_BIT = 0x00000400,
  // Provided by VK_EXT_mesh_shader
    VK_QUERY_PIPELINE_STATISTIC_TASK_SHADER_INVOCATIONS_BIT_EXT = 0x00000800,
  // Provided by VK_EXT_mesh_shader
    VK_QUERY_PIPELINE_STATISTIC_MESH_SHADER_INVOCATIONS_BIT_EXT = 0x00001000,
  // Provided by VK_HUAWEI_cluster_culling_shader
    VK_QUERY_PIPELINE_STATISTIC_CLUSTER_CULLING_SHADER_INVOCATIONS_BIT_HUAWEI = 0x00002000,
} VkQueryPipelineStatisticFlagBits;

* 
[VK_QUERY_PIPELINE_STATISTIC_INPUT_ASSEMBLY_VERTICES_BIT](#VkQueryPipelineStatisticFlagBits) specifies
that queries managed by the pool will count the number of vertices
processed by the [input assembly](drawing.html#drawing) stage.
Vertices corresponding to incomplete primitives **may** contribute to the
count.

* 
[VK_QUERY_PIPELINE_STATISTIC_INPUT_ASSEMBLY_PRIMITIVES_BIT](#VkQueryPipelineStatisticFlagBits)
specifies that queries managed by the pool will count the number of
primitives processed by the [input assembly](drawing.html#drawing) stage.
If primitive restart is enabled, restarting the primitive topology has
no effect on the count.
Incomplete primitives **may** be counted.

* 
[VK_QUERY_PIPELINE_STATISTIC_VERTEX_SHADER_INVOCATIONS_BIT](#VkQueryPipelineStatisticFlagBits)
specifies that queries managed by the pool will count the number of
vertex shader invocations.
This counter’s value is incremented each time a vertex shader is
[invoked](shaders.html#shaders-vertex-execution).

* 
[VK_QUERY_PIPELINE_STATISTIC_GEOMETRY_SHADER_INVOCATIONS_BIT](#VkQueryPipelineStatisticFlagBits)
specifies that queries managed by the pool will count the number of
geometry shader invocations.
This counter’s value is incremented each time a geometry shader is
[invoked](shaders.html#shaders-geometry-execution).
In the case of [instanced geometry shaders](geometry.html#geometry-invocations), the
geometry shader invocations count is incremented for each separate
instanced invocation.

* 
[VK_QUERY_PIPELINE_STATISTIC_GEOMETRY_SHADER_PRIMITIVES_BIT](#VkQueryPipelineStatisticFlagBits)
specifies that queries managed by the pool will count the number of
primitives generated by geometry shader invocations.
The counter’s value is incremented each time the geometry shader emits a
primitive.
Restarting primitive topology using the SPIR-V instructions
`OpEndPrimitive` or `OpEndStreamPrimitive` has no effect on the
geometry shader output primitives count.

* 
[VK_QUERY_PIPELINE_STATISTIC_CLIPPING_INVOCATIONS_BIT](#VkQueryPipelineStatisticFlagBits) specifies
that queries managed by the pool will count the number of primitives
processed by the [Primitive Clipping](vertexpostproc.html#vertexpostproc-clipping) stage of
the pipeline.
The counter’s value is incremented each time a primitive reaches the
primitive clipping stage.

* 
[VK_QUERY_PIPELINE_STATISTIC_CLIPPING_PRIMITIVES_BIT](#VkQueryPipelineStatisticFlagBits) specifies that
queries managed by the pool will count the number of primitives output
by the [Primitive Clipping](vertexpostproc.html#vertexpostproc-clipping) stage of the
pipeline.
The counter’s value is incremented each time a primitive passes the
primitive clipping stage.
The actual number of primitives output by the primitive clipping stage
for a particular input primitive is implementation-dependent but **must**
satisfy the following conditions:

If at least one vertex of the input primitive lies inside the clipping
volume, the counter is incremented by one or more.

* 
Otherwise, the counter is incremented by zero or more.

[VK_QUERY_PIPELINE_STATISTIC_FRAGMENT_SHADER_INVOCATIONS_BIT](#VkQueryPipelineStatisticFlagBits)
specifies that queries managed by the pool will count the number of
fragment shader invocations.
The counter’s value is incremented each time the fragment shader is
[invoked](fragops.html#fragops-shader).

[VK_QUERY_PIPELINE_STATISTIC_TESSELLATION_CONTROL_SHADER_PATCHES_BIT](#VkQueryPipelineStatisticFlagBits)
specifies that queries managed by the pool will count the number of
patches processed by the tessellation control shader.
The counter’s value is incremented once for each patch for which a
tessellation control shader is
[invoked](shaders.html#shaders-tessellation-control-execution).

[VK_QUERY_PIPELINE_STATISTIC_TESSELLATION_EVALUATION_SHADER_INVOCATIONS_BIT](#VkQueryPipelineStatisticFlagBits)
specifies that queries managed by the pool will count the number of
invocations of the tessellation evaluation shader.
The counter’s value is incremented each time the tessellation evaluation
shader is [invoked](shaders.html#shaders-tessellation-evaluation-execution).

[VK_QUERY_PIPELINE_STATISTIC_COMPUTE_SHADER_INVOCATIONS_BIT](#VkQueryPipelineStatisticFlagBits)
specifies that queries managed by the pool will count the number of
compute shader invocations.
The counter’s value is incremented every time the compute shader is
invoked.
Implementations **may** skip the execution of certain compute shader
invocations or execute additional compute shader invocations for
implementation-dependent reasons as long as the results of rendering
otherwise remain unchanged.

[VK_QUERY_PIPELINE_STATISTIC_TASK_SHADER_INVOCATIONS_BIT_EXT](#VkQueryPipelineStatisticFlagBits)
specifies that queries managed by the pool will count the number of task
shader invocations.
The counter’s value is incremented every time the task shader is
invoked.

[VK_QUERY_PIPELINE_STATISTIC_MESH_SHADER_INVOCATIONS_BIT_EXT](#VkQueryPipelineStatisticFlagBits)
specifies that queries managed by the pool will count the number of mesh
shader invocations.
The counter’s value is incremented every time the mesh shader is
invoked.

These values are intended to measure relative statistics on one
implementation.
Various device architectures will count these values differently.
Any or all counters **may** be affected by the issues described in
[Query Operation](#queries-operation-undefined).

This counting difference is especially true if the pipeline contains mesh or
task shaders, which may affect several of the counters in unexpected ways.

|  | For example, tile-based rendering devices **may** need to replay the scene
| --- | --- |
multiple times, affecting some of the counts. |

If a pipeline has `rasterizerDiscardEnable` enabled, implementations
**may** discard primitives after the final
[pre-rasterization shader stage](pipelines.html#pipelines-graphics-subsets-pre-rasterization).
As a result, if `rasterizerDiscardEnable` is enabled, the clipping input
and output primitives counters **may** not be incremented.

When a pipeline statistics query finishes, the result for that query is
marked as available.
The application **can** copy the result to a buffer (via
`vkCmdCopyQueryPoolResults`), or request it be put into host memory (via
`vkGetQueryPoolResults`).

// Provided by VK_VERSION_1_0
typedef VkFlags VkQueryPipelineStatisticFlags;

`VkQueryPipelineStatisticFlags` is a bitmask type for setting a mask of
zero or more [VkQueryPipelineStatisticFlagBits](#VkQueryPipelineStatisticFlagBits).

*Timestamps* provide applications with a mechanism for monotonically
tracking the execution of commands.
A timestamp is an integer value generated by the `VkPhysicalDevice`.
Unlike other queries, timestamps do not operate over a range, and so do not
use [vkCmdBeginQuery](#vkCmdBeginQuery) or [vkCmdEndQuery](#vkCmdEndQuery).
The mechanism is built around a set of commands that allow the application
to tell the `VkPhysicalDevice` to write timestamp values to a
[query pool](#queries-pools) and then either read timestamp values on the
host (using [vkGetQueryPoolResults](#vkGetQueryPoolResults)) or copy timestamp values to a
`VkBuffer` (using [vkCmdCopyQueryPoolResults](#vkCmdCopyQueryPoolResults)).

The number of valid bits in a timestamp value is determined by the
`VkQueueFamilyProperties`::`timestampValidBits` property of the
queue on which the timestamp is written.
Timestamps are supported on any queue which reports a non-zero value for
`timestampValidBits` via [vkGetPhysicalDeviceQueueFamilyProperties](devsandqueues.html#vkGetPhysicalDeviceQueueFamilyProperties).
If the [`timestampComputeAndGraphics`](limits.html#limits-timestampComputeAndGraphics) limit is [VK_TRUE](fundamentals.html#VK_TRUE), timestamps are
supported by every queue family that supports either graphics or compute
operations (see [VkQueueFamilyProperties](devsandqueues.html#VkQueueFamilyProperties)).

The number of nanoseconds it takes for a timestamp value to be incremented
by 1 **can** be obtained from
`VkPhysicalDeviceLimits`::`timestampPeriod` after a call to
`vkGetPhysicalDeviceProperties`.

To request a timestamp and write the value to memory, call:

// Provided by VK_VERSION_1_3
void vkCmdWriteTimestamp2(
    VkCommandBuffer                             commandBuffer,
    VkPipelineStageFlags2                       stage,
    VkQueryPool                                 queryPool,
    uint32_t                                    query);

// Provided by VK_KHR_synchronization2
// Equivalent to vkCmdWriteTimestamp2
void vkCmdWriteTimestamp2KHR(
    VkCommandBuffer                             commandBuffer,
    VkPipelineStageFlags2                       stage,
    VkQueryPool                                 queryPool,
    uint32_t                                    query);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`stage` specifies a stage of the pipeline.

* 
`queryPool` is the query pool that will manage the timestamp.

* 
`query` is the query within the query pool that will contain the
timestamp.

When `vkCmdWriteTimestamp2` is submitted to a queue, it defines an
execution dependency on commands that were submitted before it, and writes a
timestamp to a query pool.

The first [synchronization scope](synchronization.html#synchronization-dependencies-scopes)
includes all commands that occur earlier in
[submission order](synchronization.html#synchronization-submission-order).
The synchronization scope is limited to operations on the pipeline stage
specified by `stage`.

The second [synchronization scope](synchronization.html#synchronization-dependencies-scopes)
includes only the timestamp write operation.

|  | Implementations may write the timestamp at any stage that is
| --- | --- |
[logically later](synchronization.html#synchronization-pipeline-stages-order) than `stage`. |

Any timestamp write that [happens-after](synchronization.html#synchronization-dependencies-execution) another timestamp write in the same submission **must** not
have a lower value unless its value overflows the maximum supported integer
bit width of the query.
If
`[VK_KHR_calibrated_timestamps](../appendices/extensions.html#VK_KHR_calibrated_timestamps)`
or
`[VK_EXT_calibrated_timestamps](../appendices/extensions.html#VK_EXT_calibrated_timestamps)`
is enabled, this extends to timestamp writes across all submissions on the
same logical device: any timestamp write that
[happens-after](synchronization.html#synchronization-dependencies-execution) another **must** not
have a lower value unless its value overflows the maximum supported integer
bit width of the query.
Timestamps written by this command **must** be in the
[VK_TIME_DOMAIN_DEVICE_KHR](synchronization.html#VkTimeDomainEXT)
[time domain](synchronization.html#VkTimeDomainKHR).
If an overflow occurs, the timestamp value **must** wrap back to zero.

If `vkCmdWriteTimestamp2` is called while executing a render pass
instance that has multiview enabled, the timestamp uses N consecutive
query indices in the query pool (starting at `query`) where N is
the number of bits set in the view mask of the subpass
or dynamic render pass
the command is executed in.
The resulting query values are determined by an implementation-dependent
choice of one of the following behaviors:

* 
The first query is a timestamp value and (if more than one bit is set in
the view mask) zero is written to the remaining queries.

* 
All N queries are timestamp values.

Either way, if two timestamps are written in the same subpass
or dynamic render pass
with multiview enabled, each of the N consecutive queries written for
a timestamp **must** not have a lower value than the queries with corresponding
indices written by the timestamp that happens-before unless the value
overflows the maximum supported integer bit width of the query.

Valid Usage

* 
[](#VUID-vkCmdWriteTimestamp2-stage-03929) VUID-vkCmdWriteTimestamp2-stage-03929

If the [`geometryShader`](features.html#features-geometryShader) feature is not
enabled, `stage` **must** not contain
[VK_PIPELINE_STAGE_2_GEOMETRY_SHADER_BIT](synchronization.html#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-vkCmdWriteTimestamp2-stage-03930) VUID-vkCmdWriteTimestamp2-stage-03930

If the [`tessellationShader`](features.html#features-tessellationShader) feature
is not enabled, `stage` **must** not contain
[VK_PIPELINE_STAGE_2_TESSELLATION_CONTROL_SHADER_BIT](synchronization.html#VkPipelineStageFlagBits2KHR) or
[VK_PIPELINE_STAGE_2_TESSELLATION_EVALUATION_SHADER_BIT](synchronization.html#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-vkCmdWriteTimestamp2-stage-03931) VUID-vkCmdWriteTimestamp2-stage-03931

If the [`conditionalRendering`](features.html#features-conditionalRendering)
feature is not enabled, `stage` **must** not contain
[VK_PIPELINE_STAGE_2_CONDITIONAL_RENDERING_BIT_EXT](synchronization.html#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-vkCmdWriteTimestamp2-stage-03932) VUID-vkCmdWriteTimestamp2-stage-03932

If the [`fragmentDensityMap`](features.html#features-fragmentDensityMap) feature
is not enabled, `stage` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_DENSITY_PROCESS_BIT_EXT](synchronization.html#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-vkCmdWriteTimestamp2-stage-03933) VUID-vkCmdWriteTimestamp2-stage-03933

If the [`transformFeedback`](features.html#features-transformFeedback) feature
is not enabled, `stage` **must** not contain
[VK_PIPELINE_STAGE_2_TRANSFORM_FEEDBACK_BIT_EXT](synchronization.html#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-vkCmdWriteTimestamp2-stage-03934) VUID-vkCmdWriteTimestamp2-stage-03934

If the [`meshShader`](features.html#features-meshShader) feature is not enabled,
`stage` **must** not contain
[VK_PIPELINE_STAGE_2_MESH_SHADER_BIT_EXT](synchronization.html#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-vkCmdWriteTimestamp2-stage-03935) VUID-vkCmdWriteTimestamp2-stage-03935

If the [`taskShader`](features.html#features-taskShader) feature is not enabled,
`stage` **must** not contain
[VK_PIPELINE_STAGE_2_TASK_SHADER_BIT_EXT](synchronization.html#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-vkCmdWriteTimestamp2-stage-07316) VUID-vkCmdWriteTimestamp2-stage-07316

If neither of the [`shadingRateImage`](features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) features are enabled,
`stage` **must** not contain
[VK_PIPELINE_STAGE_2_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](synchronization.html#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-vkCmdWriteTimestamp2-stage-04957) VUID-vkCmdWriteTimestamp2-stage-04957

If the [`subpassShading`](features.html#features-subpassShading) feature is not
enabled, `stage` **must** not contain
[VK_PIPELINE_STAGE_2_SUBPASS_SHADER_BIT_HUAWEI](synchronization.html#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-vkCmdWriteTimestamp2-stage-04995) VUID-vkCmdWriteTimestamp2-stage-04995

If the [`invocationMask`](features.html#features-invocationMask) feature is not
enabled, `stage` **must** not contain
[VK_PIPELINE_STAGE_2_INVOCATION_MASK_BIT_HUAWEI](synchronization.html#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-vkCmdWriteTimestamp2-stage-07946) VUID-vkCmdWriteTimestamp2-stage-07946

If neither the [VK_NV_ray_tracing](../appendices/extensions.html#VK_NV_ray_tracing) extension or the
[`rayTracingPipeline`](features.html#features-rayTracingPipeline) feature are
enabled, `stage` **must** not contain
[VK_PIPELINE_STAGE_2_RAY_TRACING_SHADER_BIT_KHR](synchronization.html#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-vkCmdWriteTimestamp2-stage-10751) VUID-vkCmdWriteTimestamp2-stage-10751

If the [`accelerationStructure`](features.html#features-accelerationStructure)
feature is not enabled, `stage` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_BUILD_BIT_KHR](synchronization.html#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-vkCmdWriteTimestamp2-stage-10752) VUID-vkCmdWriteTimestamp2-stage-10752

If the [`rayTracingMaintenance1`](features.html#features-rayTracingMaintenance1)
feature is not enabled, `stage` **must** not contain
[VK_PIPELINE_STAGE_2_ACCELERATION_STRUCTURE_COPY_BIT_KHR](synchronization.html#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-vkCmdWriteTimestamp2-stage-10753) VUID-vkCmdWriteTimestamp2-stage-10753

If the [`micromap`](features.html#features-micromap) feature is not enabled,
`stage` **must** not contain
[VK_PIPELINE_STAGE_2_MICROMAP_BUILD_BIT_EXT](synchronization.html#VkPipelineStageFlagBits2KHR)

* 
[](#VUID-vkCmdWriteTimestamp2-synchronization2-03858) VUID-vkCmdWriteTimestamp2-synchronization2-03858

The [`synchronization2`](features.html#features-synchronization2) feature **must**
be enabled

* 
[](#VUID-vkCmdWriteTimestamp2-stage-03859) VUID-vkCmdWriteTimestamp2-stage-03859

`stage` **must** only include a single pipeline stage

* 
[](#VUID-vkCmdWriteTimestamp2-stage-03860) VUID-vkCmdWriteTimestamp2-stage-03860

`stage` **must** only include stages valid for the queue family that
was used to create the command pool that `commandBuffer` was
allocated from

* 
[](#VUID-vkCmdWriteTimestamp2-queryPool-03861) VUID-vkCmdWriteTimestamp2-queryPool-03861

`queryPool` **must** have been created with a `queryType` of
[VK_QUERY_TYPE_TIMESTAMP](#VkQueryType)

* 
[](#VUID-vkCmdWriteTimestamp2-timestampValidBits-03863) VUID-vkCmdWriteTimestamp2-timestampValidBits-03863

The command pool’s queue family **must** support a non-zero
`timestampValidBits`

* 
[](#VUID-vkCmdWriteTimestamp2-query-04903) VUID-vkCmdWriteTimestamp2-query-04903

`query` **must** be less than the number of queries in `queryPool`

* 
[](#VUID-vkCmdWriteTimestamp2-None-03864) VUID-vkCmdWriteTimestamp2-None-03864

All queries used by the command **must** be *unavailable*

* 
[](#VUID-vkCmdWriteTimestamp2-query-03865) VUID-vkCmdWriteTimestamp2-query-03865

If `vkCmdWriteTimestamp2` is called within a render pass instance,
the sum of `query` and the number of bits set in the current
subpass’s view mask **must** be less than or equal to the number of queries
in `queryPool`

* 
[](#VUID-vkCmdWriteTimestamp2-None-10639) VUID-vkCmdWriteTimestamp2-None-10639

This command **must** not be recorded when
[per-tile execution model](renderpass.html#renderpass-per-tile-execution-model) is
enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdWriteTimestamp2-commandBuffer-parameter) VUID-vkCmdWriteTimestamp2-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdWriteTimestamp2-stage-parameter) VUID-vkCmdWriteTimestamp2-stage-parameter

 `stage` **must** be a valid combination of [VkPipelineStageFlagBits2](synchronization.html#VkPipelineStageFlagBits2) values

* 
[](#VUID-vkCmdWriteTimestamp2-queryPool-parameter) VUID-vkCmdWriteTimestamp2-queryPool-parameter

 `queryPool` **must** be a valid [VkQueryPool](#VkQueryPool) handle

* 
[](#VUID-vkCmdWriteTimestamp2-commandBuffer-recording) VUID-vkCmdWriteTimestamp2-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdWriteTimestamp2-commandBuffer-cmdpool) VUID-vkCmdWriteTimestamp2-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_TRANSFER_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_VIDEO_DECODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdWriteTimestamp2-suspended) VUID-vkCmdWriteTimestamp2-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdWriteTimestamp2-commonparent) VUID-vkCmdWriteTimestamp2-commonparent

 Both of `commandBuffer`, and `queryPool` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Both | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_TRANSFER_BIT

VK_QUEUE_VIDEO_DECODE_BIT_KHR

VK_QUEUE_VIDEO_ENCODE_BIT_KHR | Action |

Conditional Rendering

vkCmdWriteTimestamp2 is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To request a timestamp and write the value to memory, call:

|  | This functionality is superseded by [vkCmdWriteTimestamp2](#vkCmdWriteTimestamp2). See [Legacy Functionality](../appendices/legacy.html#deprecation-sync2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
void vkCmdWriteTimestamp(
    VkCommandBuffer                             commandBuffer,
    VkPipelineStageFlagBits                     pipelineStage,
    VkQueryPool                                 queryPool,
    uint32_t                                    query);

* 
`commandBuffer` is the command buffer into which the command will be
recorded.

* 
`pipelineStage` is a [VkPipelineStageFlagBits](synchronization.html#VkPipelineStageFlagBits) value, specifying
a stage of the pipeline.

* 
`queryPool` is the query pool that will manage the timestamp.

* 
`query` is the query within the query pool that will contain the
timestamp.

When `vkCmdWriteTimestamp` is submitted to a queue, it defines an
execution dependency on commands that were submitted before it, and writes a
timestamp to a query pool.

The first [synchronization scope](synchronization.html#synchronization-dependencies-scopes)
includes all commands that occur earlier in
[submission order](synchronization.html#synchronization-submission-order).
The synchronization scope is limited to operations on the pipeline stage
specified by `pipelineStage`.

The second [synchronization scope](synchronization.html#synchronization-dependencies-scopes)
includes only the timestamp write operation.

|  | Implementations may write the timestamp at any stage that is
| --- | --- |
[logically later](synchronization.html#synchronization-pipeline-stages-order) than `stage`. |

Any timestamp write that [happens-after](synchronization.html#synchronization-dependencies-execution) another timestamp write in the same submission **must** not
have a lower value unless its value overflows the maximum supported integer
bit width of the query.
If
`[VK_KHR_calibrated_timestamps](../appendices/extensions.html#VK_KHR_calibrated_timestamps)`
or
`[VK_EXT_calibrated_timestamps](../appendices/extensions.html#VK_EXT_calibrated_timestamps)`
is enabled, this extends to timestamp writes across all submissions on the
same logical device: any timestamp write that
[happens-after](synchronization.html#synchronization-dependencies-execution) another **must** not
have a lower value unless its value overflows the maximum supported integer
bit width of the query.
Timestamps written by this command **must** be in the
[VK_TIME_DOMAIN_DEVICE_KHR](synchronization.html#VkTimeDomainEXT)
[time domain](synchronization.html#VkTimeDomainKHR).
If an overflow occurs, the timestamp value **must** wrap back to zero.

If `vkCmdWriteTimestamp` is called while executing a render pass
instance that has multiview enabled, the timestamp uses N consecutive
query indices in the query pool (starting at `query`) where N is
the number of bits set in the view mask of the subpass
or dynamic render pass
the command is executed in.
The resulting query values are determined by an implementation-dependent
choice of one of the following behaviors:

* 
The first query is a timestamp value and (if more than one bit is set in
the view mask) zero is written to the remaining queries.

* 
All N queries are timestamp values.

Either way, if two timestamps are written in the same subpass
or dynamic render pass
with multiview enabled, each of the N consecutive queries written for
a timestamp **must** not have a lower value than the queries with corresponding
indices written by the timestamp that happens-before unless the value
overflows the maximum supported integer bit width of the query.

Valid Usage

* 
[](#VUID-vkCmdWriteTimestamp-pipelineStage-04074) VUID-vkCmdWriteTimestamp-pipelineStage-04074

`pipelineStage` **must** be a
[valid stage](synchronization.html#synchronization-pipeline-stages-supported) for the queue
family that was used to create the command pool that `commandBuffer`
was allocated from

* 
[](#VUID-vkCmdWriteTimestamp-pipelineStage-04075) VUID-vkCmdWriteTimestamp-pipelineStage-04075

If the [`geometryShader`](features.html#features-geometryShader) feature is not
enabled, `pipelineStage` **must** not be
[VK_PIPELINE_STAGE_GEOMETRY_SHADER_BIT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdWriteTimestamp-pipelineStage-04076) VUID-vkCmdWriteTimestamp-pipelineStage-04076

If the [`tessellationShader`](features.html#features-tessellationShader) feature
is not enabled, `pipelineStage` **must** not be
[VK_PIPELINE_STAGE_TESSELLATION_CONTROL_SHADER_BIT](synchronization.html#VkPipelineStageFlagBits) or
[VK_PIPELINE_STAGE_TESSELLATION_EVALUATION_SHADER_BIT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdWriteTimestamp-pipelineStage-04077) VUID-vkCmdWriteTimestamp-pipelineStage-04077

If the [`conditionalRendering`](features.html#features-conditionalRendering)
feature is not enabled, `pipelineStage` **must** not be
[VK_PIPELINE_STAGE_CONDITIONAL_RENDERING_BIT_EXT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdWriteTimestamp-pipelineStage-04078) VUID-vkCmdWriteTimestamp-pipelineStage-04078

If the [`fragmentDensityMap`](features.html#features-fragmentDensityMap) feature
is not enabled, `pipelineStage` **must** not be
[VK_PIPELINE_STAGE_FRAGMENT_DENSITY_PROCESS_BIT_EXT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdWriteTimestamp-pipelineStage-04079) VUID-vkCmdWriteTimestamp-pipelineStage-04079

If the [`transformFeedback`](features.html#features-transformFeedback) feature
is not enabled, `pipelineStage` **must** not be
[VK_PIPELINE_STAGE_TRANSFORM_FEEDBACK_BIT_EXT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdWriteTimestamp-pipelineStage-04080) VUID-vkCmdWriteTimestamp-pipelineStage-04080

If the [`meshShader`](features.html#features-meshShader) feature is not enabled,
`pipelineStage` **must** not be
[VK_PIPELINE_STAGE_MESH_SHADER_BIT_EXT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdWriteTimestamp-pipelineStage-07077) VUID-vkCmdWriteTimestamp-pipelineStage-07077

If the [`taskShader`](features.html#features-taskShader) feature is not enabled,
`pipelineStage` **must** not be
[VK_PIPELINE_STAGE_TASK_SHADER_BIT_EXT](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdWriteTimestamp-shadingRateImage-07314) VUID-vkCmdWriteTimestamp-shadingRateImage-07314

If neither of the [`shadingRateImage`](features.html#features-shadingRateImage)
or the [    `attachmentFragmentShadingRate`](features.html#features-attachmentFragmentShadingRate) features are enabled,
`pipelineStage` **must** not be
[VK_PIPELINE_STAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdWriteTimestamp-synchronization2-06489) VUID-vkCmdWriteTimestamp-synchronization2-06489

If the [`synchronization2`](features.html#features-synchronization2) feature is
not enabled, `pipelineStage` **must** not be
[VK_PIPELINE_STAGE_NONE](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdWriteTimestamp-rayTracingPipeline-07943) VUID-vkCmdWriteTimestamp-rayTracingPipeline-07943

If neither of the [VK_NV_ray_tracing](../appendices/extensions.html#VK_NV_ray_tracing) extension or the
[`rayTracingPipeline`](features.html#features-rayTracingPipeline) feature are
enabled, `pipelineStage` **must** not be
[VK_PIPELINE_STAGE_RAY_TRACING_SHADER_BIT_KHR](synchronization.html#VkPipelineStageFlagBits)

* 
[](#VUID-vkCmdWriteTimestamp-queryPool-01416) VUID-vkCmdWriteTimestamp-queryPool-01416

`queryPool` **must** have been created with a `queryType` of
[VK_QUERY_TYPE_TIMESTAMP](#VkQueryType)

* 
[](#VUID-vkCmdWriteTimestamp-timestampValidBits-00829) VUID-vkCmdWriteTimestamp-timestampValidBits-00829

The command pool’s queue family **must** support a non-zero
`timestampValidBits`

* 
[](#VUID-vkCmdWriteTimestamp-query-04904) VUID-vkCmdWriteTimestamp-query-04904

`query` **must** be less than the number of queries in `queryPool`

* 
[](#VUID-vkCmdWriteTimestamp-None-00830) VUID-vkCmdWriteTimestamp-None-00830

All queries used by the command **must** be *unavailable*

* 
[](#VUID-vkCmdWriteTimestamp-query-00831) VUID-vkCmdWriteTimestamp-query-00831

If `vkCmdWriteTimestamp` is called within a render pass instance,
the sum of `query` and the number of bits set in the current
subpass’s view mask **must** be less than or equal to the number of queries
in `queryPool`

* 
[](#VUID-vkCmdWriteTimestamp-None-10640) VUID-vkCmdWriteTimestamp-None-10640

This command **must** not be recorded when
[per-tile execution model](renderpass.html#renderpass-per-tile-execution-model) is
enabled

Valid Usage (Implicit)

* 
[](#VUID-vkCmdWriteTimestamp-commandBuffer-parameter) VUID-vkCmdWriteTimestamp-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdWriteTimestamp-pipelineStage-parameter) VUID-vkCmdWriteTimestamp-pipelineStage-parameter

 `pipelineStage` **must** be a valid [VkPipelineStageFlagBits](synchronization.html#VkPipelineStageFlagBits) value

* 
[](#VUID-vkCmdWriteTimestamp-queryPool-parameter) VUID-vkCmdWriteTimestamp-queryPool-parameter

 `queryPool` **must** be a valid [VkQueryPool](#VkQueryPool) handle

* 
[](#VUID-vkCmdWriteTimestamp-commandBuffer-recording) VUID-vkCmdWriteTimestamp-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdWriteTimestamp-commandBuffer-cmdpool) VUID-vkCmdWriteTimestamp-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_OPTICAL_FLOW_BIT_NV](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_TRANSFER_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_VIDEO_DECODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_VIDEO_ENCODE_BIT_KHR](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdWriteTimestamp-suspended) VUID-vkCmdWriteTimestamp-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdWriteTimestamp-commonparent) VUID-vkCmdWriteTimestamp-commonparent

 Both of `commandBuffer`, and `queryPool` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Both | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_OPTICAL_FLOW_BIT_NV

VK_QUEUE_TRANSFER_BIT

VK_QUEUE_VIDEO_DECODE_BIT_KHR

VK_QUEUE_VIDEO_ENCODE_BIT_KHR | Action |

Conditional Rendering

vkCmdWriteTimestamp is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

*Performance queries* provide applications with a mechanism for getting
performance counter information about the execution of command buffers,
render passes, and commands.

Each queue family advertises the performance counters that **can** be queried
on a queue of that family via a call to
[vkEnumeratePhysicalDeviceQueueFamilyPerformanceQueryCountersKHR](devsandqueues.html#vkEnumeratePhysicalDeviceQueueFamilyPerformanceQueryCountersKHR).
Implementations **may** limit access to performance counters based on platform
requirements or only to specialized drivers for development purposes.

|  | This may include no performance counters being enumerated, or a reduced set.
| --- | --- |
Please refer to platform-specific documentation for guidance on any such
restrictions. |

Performance queries use the existing [vkCmdBeginQuery](#vkCmdBeginQuery) and
[vkCmdEndQuery](#vkCmdEndQuery) to control what command buffers, render passes, or
commands to get performance information for.

Implementations **may** require multiple passes where the command buffer,
render passes, or commands being recorded are the same and are executed on
the same queue to record performance counter data.
This is achieved by submitting the same batch and providing a
[VkPerformanceQuerySubmitInfoKHR](cmdbuffers.html#VkPerformanceQuerySubmitInfoKHR) structure containing a counter pass
index.
The number of passes required for a given performance query pool **can** be
queried via a call to
[vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR](#vkGetPhysicalDeviceQueueFamilyPerformanceQueryPassesKHR).

|  | Command buffers recorded with
| --- | --- |
[VK_COMMAND_BUFFER_USAGE_ONE_TIME_SUBMIT_BIT](cmdbuffers.html#VkCommandBufferUsageFlagBits) **must** not be re-submitted.
Changing command buffer usage bits **may** affect performance.
To avoid this, the application **should** re-record any command buffers with
the [VK_COMMAND_BUFFER_USAGE_ONE_TIME_SUBMIT_BIT](cmdbuffers.html#VkCommandBufferUsageFlagBits) when multiple counter
passes are required. |

Performance counter results from a performance query pool **can** be obtained
with the command [vkGetQueryPoolResults](#vkGetQueryPoolResults).

The `VkPerformanceCounterResultKHR` union is defined as:

// Provided by VK_KHR_performance_query
typedef union VkPerformanceCounterResultKHR {
    int32_t     int32;
    int64_t     int64;
    uint32_t    uint32;
    uint64_t    uint64;
    float       float32;
    double      float64;
} VkPerformanceCounterResultKHR;

* 
`int32` is a 32-bit signed integer value.

* 
`int64` is a 64-bit signed integer value.

* 
`uint32` is a 32-bit unsigned integer value.

* 
`uint64` is a 64-bit unsigned integer value.

* 
`float32` is a 32-bit floating-point value.

* 
`float64` is a 64-bit floating-point value.

Performance query results are returned in an array of
`VkPerformanceCounterResultKHR` unions containing the data associated
with each counter in the query, stored in the same order as the counters
supplied in `pCounterIndices` when creating the performance query.
[VkPerformanceCounterKHR](devsandqueues.html#VkPerformanceCounterKHR)::`storage` specifies how to parse the
counter data.

To record and submit a command buffer containing a performance query pool
the profiling lock **must** be held.
The profiling lock **must** be acquired prior to any call to
[vkBeginCommandBuffer](cmdbuffers.html#vkBeginCommandBuffer) that will be using a performance query pool.
The profiling lock **must** be held while any command buffer containing a
performance query pool is in the *recording*, *executable*, or *pending
state*.
To acquire the profiling lock, call:

// Provided by VK_KHR_performance_query
VkResult vkAcquireProfilingLockKHR(
    VkDevice                                    device,
    const VkAcquireProfilingLockInfoKHR*        pInfo);

* 
`device` is the logical device to profile.

* 
`pInfo` is a pointer to a [VkAcquireProfilingLockInfoKHR](#VkAcquireProfilingLockInfoKHR)
structure containing information about how the profiling is to be
acquired.

Implementations **may** allow multiple actors to hold the profiling lock
concurrently.

Valid Usage (Implicit)

* 
[](#VUID-vkAcquireProfilingLockKHR-device-parameter) VUID-vkAcquireProfilingLockKHR-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkAcquireProfilingLockKHR-pInfo-parameter) VUID-vkAcquireProfilingLockKHR-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkAcquireProfilingLockInfoKHR](#VkAcquireProfilingLockInfoKHR) structure

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

* 
[VK_TIMEOUT](fundamentals.html#VkResult)

The `VkAcquireProfilingLockInfoKHR` structure is defined as:

// Provided by VK_KHR_performance_query
typedef struct VkAcquireProfilingLockInfoKHR {
    VkStructureType                   sType;
    const void*                       pNext;
    VkAcquireProfilingLockFlagsKHR    flags;
    uint64_t                          timeout;
} VkAcquireProfilingLockInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is reserved for future use.

* 
`timeout` indicates how long the function waits, in nanoseconds, if
the profiling lock is not available.

Valid Usage (Implicit)

* 
[](#VUID-VkAcquireProfilingLockInfoKHR-sType-sType) VUID-VkAcquireProfilingLockInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACQUIRE_PROFILING_LOCK_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkAcquireProfilingLockInfoKHR-pNext-pNext) VUID-VkAcquireProfilingLockInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkAcquireProfilingLockInfoKHR-flags-zerobitmask) VUID-VkAcquireProfilingLockInfoKHR-flags-zerobitmask

 `flags` **must** be `0`

If `timeout` is 0, `vkAcquireProfilingLockKHR` will not block while
attempting to acquire the profiling lock.
If `timeout` is `UINT64_MAX`, the function will not return until the
profiling lock was acquired.

// Provided by VK_KHR_performance_query
typedef enum VkAcquireProfilingLockFlagBitsKHR {
} VkAcquireProfilingLockFlagBitsKHR;

// Provided by VK_KHR_performance_query
typedef VkFlags VkAcquireProfilingLockFlagsKHR;

[VkAcquireProfilingLockFlagsKHR](#VkAcquireProfilingLockFlagsKHR) is a bitmask type for setting a mask,
but is currently reserved for future use.

To release the profiling lock, call:

// Provided by VK_KHR_performance_query
void vkReleaseProfilingLockKHR(
    VkDevice                                    device);

* 
`device` is the logical device to cease profiling on.

Valid Usage

* 
[](#VUID-vkReleaseProfilingLockKHR-device-03235) VUID-vkReleaseProfilingLockKHR-device-03235

The profiling lock of `device` **must** have been held via a previous
successful call to [vkAcquireProfilingLockKHR](#vkAcquireProfilingLockKHR)

Valid Usage (Implicit)

* 
[](#VUID-vkReleaseProfilingLockKHR-device-parameter) VUID-vkReleaseProfilingLockKHR-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

Transform feedback queries track the number of primitives attempted to be
written and actually written, by the vertex stream being captured, to a
transform feedback buffer.
This query is updated during drawing commands while transform feedback is
active.
The number of primitives actually written will be less than the number
attempted to be written if the bound transform feedback buffer size was too
small for the number of primitives actually drawn.
Primitives are not written beyond the bound range of the transform feedback
buffer.
A transform feedback query is begun and ended by calling
`vkCmdBeginQuery` and `vkCmdEndQuery`, respectively to query for
vertex stream zero.
`vkCmdBeginQueryIndexedEXT` and `vkCmdEndQueryIndexedEXT` **can** be
used to begin and end transform feedback queries for any supported vertex
stream.
When a transform feedback query begins, the count of primitives written and
primitives needed starts from zero.
For each drawing command, the count is incremented as vertex attribute
outputs are captured to the transform feedback buffers while transform
feedback is active.

When a transform feedback query finishes, the result for that query is
marked as available.
The application **can** then either copy the result to a buffer (via
`vkCmdCopyQueryPoolResults`) or request it be put into host memory (via
`vkGetQueryPoolResults`).

When a generated primitive query for a vertex stream is active, the
primitives-generated count is incremented every time a primitive emitted to
that stream reaches the transform feedback stage, whether or not transform
feedback is active.
A primitives generated query is begun and ended by calling
`vkCmdBeginQuery` and `vkCmdEndQuery`, respectively to query for
vertex stream zero.
`vkCmdBeginQueryIndexedEXT` and `vkCmdEndQueryIndexedEXT` **can** be
used to begin and end primitives generated queries for any supported vertex
stream.
When a primitives generated query begins, the count of primitives generated
starts from zero.

When a primitives generated query finishes, the result for that query is
marked as available.
The application **can** then either copy the result to a buffer (via
`vkCmdCopyQueryPoolResults`) or request it be put into host memory (via
`vkGetQueryPoolResults`).

|  | The result of this query is typically identical to
| --- | --- |
[VK_QUERY_PIPELINE_STATISTIC_CLIPPING_INVOCATIONS_BIT](#VkQueryPipelineStatisticFlagBits), but the
primitives generated query is deterministic, i.e. it must be identical to
the number of primitives processed.
[VK_QUERY_PIPELINE_STATISTIC_CLIPPING_INVOCATIONS_BIT](#VkQueryPipelineStatisticFlagBits) may vary for
implementation-dependent reasons, e.g. the same primitive may be processed
multiple times for purposes of clipping. |

When a generated mesh primitives query is active, the
mesh-primitives-generated count is incremented every time a primitive
emitted from the mesh shader stage reaches the fragment shader stage.
When a generated mesh primitives query begins, the mesh-primitives-generated
count starts from zero.

Mesh and task shader pipeline statistics queries function the same way that
invocation queries work for other shader stages, counting the number of
times the respective shader stage has been run.
When the statistics query begins, the invocation counters start from zero.

Intel performance queries allow an application to capture performance data
for a set of commands.
Performance queries are used in a similar way than other types of queries.
A main difference with existing queries is that the resulting data should be
handed over to a library capable to produce human readable results rather
than being read directly by an application.

Prior to creating a performance query pool, initialize the device for
performance queries with the call:

// Provided by VK_INTEL_performance_query
VkResult vkInitializePerformanceApiINTEL(
    VkDevice                                    device,
    const VkInitializePerformanceApiInfoINTEL*  pInitializeInfo);

* 
`device` is the logical device used for the queries.

* 
`pInitializeInfo` is a pointer to a
[VkInitializePerformanceApiInfoINTEL](#VkInitializePerformanceApiInfoINTEL) structure specifying
initialization parameters.

Valid Usage (Implicit)

* 
[](#VUID-vkInitializePerformanceApiINTEL-device-parameter) VUID-vkInitializePerformanceApiINTEL-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkInitializePerformanceApiINTEL-pInitializeInfo-parameter) VUID-vkInitializePerformanceApiINTEL-pInitializeInfo-parameter

 `pInitializeInfo` **must** be a valid pointer to a valid [VkInitializePerformanceApiInfoINTEL](#VkInitializePerformanceApiInfoINTEL) structure

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_TOO_MANY_OBJECTS](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkInitializePerformanceApiInfoINTEL` structure is defined as :

// Provided by VK_INTEL_performance_query
typedef struct VkInitializePerformanceApiInfoINTEL {
    VkStructureType    sType;
    const void*        pNext;
    void*              pUserData;
} VkInitializePerformanceApiInfoINTEL;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pUserData` is NULL or a pointer for application data.

Valid Usage (Implicit)

* 
[](#VUID-VkInitializePerformanceApiInfoINTEL-sType-sType) VUID-VkInitializePerformanceApiInfoINTEL-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_INITIALIZE_PERFORMANCE_API_INFO_INTEL](fundamentals.html#VkStructureType)

* 
[](#VUID-VkInitializePerformanceApiInfoINTEL-pNext-pNext) VUID-VkInitializePerformanceApiInfoINTEL-pNext-pNext

 `pNext` **must** be `NULL`

Once performance query operations have completed, uninitialize the device
for performance queries with the call:

// Provided by VK_INTEL_performance_query
void vkUninitializePerformanceApiINTEL(
    VkDevice                                    device);

* 
`device` is the logical device used for the queries.

Valid Usage (Implicit)

* 
[](#VUID-vkUninitializePerformanceApiINTEL-device-parameter) VUID-vkUninitializePerformanceApiINTEL-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

Some performance query features of a device can be discovered with the call:

// Provided by VK_INTEL_performance_query
VkResult vkGetPerformanceParameterINTEL(
    VkDevice                                    device,
    VkPerformanceParameterTypeINTEL             parameter,
    VkPerformanceValueINTEL*                    pValue);

* 
`device` is the logical device to query.

* 
`parameter` is the parameter to query.

* 
`pValue` is a pointer to a [VkPerformanceValueINTEL](#VkPerformanceValueINTEL) structure
in which the type and value of the parameter are returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPerformanceParameterINTEL-device-parameter) VUID-vkGetPerformanceParameterINTEL-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetPerformanceParameterINTEL-parameter-parameter) VUID-vkGetPerformanceParameterINTEL-parameter-parameter

 `parameter` **must** be a valid [VkPerformanceParameterTypeINTEL](#VkPerformanceParameterTypeINTEL) value

* 
[](#VUID-vkGetPerformanceParameterINTEL-pValue-parameter) VUID-vkGetPerformanceParameterINTEL-pValue-parameter

 `pValue` **must** be a valid pointer to a [VkPerformanceValueINTEL](#VkPerformanceValueINTEL) structure

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_TOO_MANY_OBJECTS](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

Possible values of [vkGetPerformanceParameterINTEL](#vkGetPerformanceParameterINTEL)::`parameter`,
specifying a performance query feature, are:

// Provided by VK_INTEL_performance_query
typedef enum VkPerformanceParameterTypeINTEL {
    VK_PERFORMANCE_PARAMETER_TYPE_HW_COUNTERS_SUPPORTED_INTEL = 0,
    VK_PERFORMANCE_PARAMETER_TYPE_STREAM_MARKER_VALID_BITS_INTEL = 1,
} VkPerformanceParameterTypeINTEL;

* 
[VK_PERFORMANCE_PARAMETER_TYPE_HW_COUNTERS_SUPPORTED_INTEL](#VkPerformanceParameterTypeINTEL) has a
boolean result which tells whether hardware counters can be captured.

* 
[VK_PERFORMANCE_PARAMETER_TYPE_STREAM_MARKER_VALID_BITS_INTEL](#VkPerformanceParameterTypeINTEL) has a
32 bits integer result which tells how many bits can be written into the
`VkPerformanceValueINTEL` value.

The `VkPerformanceValueINTEL` structure is defined as:

// Provided by VK_INTEL_performance_query
typedef struct VkPerformanceValueINTEL {
    VkPerformanceValueTypeINTEL    type;
    VkPerformanceValueDataINTEL    data;
} VkPerformanceValueINTEL;

* 
`type` is a [VkPerformanceValueTypeINTEL](#VkPerformanceValueTypeINTEL) value specifying the
type of the returned data.

* 
`data` is a [VkPerformanceValueDataINTEL](#VkPerformanceValueDataINTEL) union specifying the
value of the returned data.

Possible values of [VkPerformanceValueINTEL](#VkPerformanceValueINTEL)::`type`, specifying the
type of the data returned in [VkPerformanceValueINTEL](#VkPerformanceValueINTEL)::`data`, are:

* 
[VK_PERFORMANCE_VALUE_TYPE_UINT32_INTEL](#VkPerformanceValueTypeINTEL) specifies that unsigned
32-bit integer data is returned in `data.value32`.

* 
[VK_PERFORMANCE_VALUE_TYPE_UINT64_INTEL](#VkPerformanceValueTypeINTEL) specifies that unsigned
64-bit integer data is returned in `data.value64`.

* 
[VK_PERFORMANCE_VALUE_TYPE_FLOAT_INTEL](#VkPerformanceValueTypeINTEL) specifies that
floating-point data is returned in `data.valueFloat`.

* 
[VK_PERFORMANCE_VALUE_TYPE_BOOL_INTEL](#VkPerformanceValueTypeINTEL) specifies that
`VkBool32` data is returned in `data.valueBool`.

* 
[VK_PERFORMANCE_VALUE_TYPE_STRING_INTEL](#VkPerformanceValueTypeINTEL) specifies that a pointer to
a null-terminated UTF-8 string is returned in `data.valueString`.
The pointer is valid for the lifetime of the `device` parameter
passed to [vkGetPerformanceParameterINTEL](#vkGetPerformanceParameterINTEL).

// Provided by VK_INTEL_performance_query
typedef enum VkPerformanceValueTypeINTEL {
    VK_PERFORMANCE_VALUE_TYPE_UINT32_INTEL = 0,
    VK_PERFORMANCE_VALUE_TYPE_UINT64_INTEL = 1,
    VK_PERFORMANCE_VALUE_TYPE_FLOAT_INTEL = 2,
    VK_PERFORMANCE_VALUE_TYPE_BOOL_INTEL = 3,
    VK_PERFORMANCE_VALUE_TYPE_STRING_INTEL = 4,
} VkPerformanceValueTypeINTEL;

The `VkPerformanceValueDataINTEL` union is defined as:

// Provided by VK_INTEL_performance_query
typedef union VkPerformanceValueDataINTEL {
    uint32_t       value32;
    uint64_t       value64;
    float          valueFloat;
    VkBool32       valueBool;
    const char*    valueString;
} VkPerformanceValueDataINTEL;

* 
`value32` represents 32-bit integer data.

* 
`value64` represents 64-bit integer data.

* 
`valueFloat` represents floating-point data.

* 
`valueBool` represents `VkBool32` data.

* 
`valueString` represents a pointer to a null-terminated UTF-8
string.

The correct member of the union is determined by the associated
[VkPerformanceValueTypeINTEL](#VkPerformanceValueTypeINTEL) value.

The `VkQueryPoolPerformanceQueryCreateInfoINTEL` structure is defined
as:

// Provided by VK_INTEL_performance_query
typedef struct VkQueryPoolPerformanceQueryCreateInfoINTEL {
    VkStructureType                 sType;
    const void*                     pNext;
    VkQueryPoolSamplingModeINTEL    performanceCountersSampling;
} VkQueryPoolPerformanceQueryCreateInfoINTEL;

// Provided by VK_INTEL_performance_query
// Equivalent to VkQueryPoolPerformanceQueryCreateInfoINTEL
typedef VkQueryPoolPerformanceQueryCreateInfoINTEL VkQueryPoolCreateInfoINTEL;

To create a pool for Intel performance queries, set
[VkQueryPoolCreateInfo](#VkQueryPoolCreateInfo)::`queryType` to
[VK_QUERY_TYPE_PERFORMANCE_QUERY_INTEL](#VkQueryType) and add a
`VkQueryPoolPerformanceQueryCreateInfoINTEL` structure to the
`pNext` chain of the [VkQueryPoolCreateInfo](#VkQueryPoolCreateInfo) structure.

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`performanceCountersSampling` describe how performance queries
should be captured.

Valid Usage (Implicit)

* 
[](#VUID-VkQueryPoolPerformanceQueryCreateInfoINTEL-sType-sType) VUID-VkQueryPoolPerformanceQueryCreateInfoINTEL-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_QUERY_POOL_PERFORMANCE_QUERY_CREATE_INFO_INTEL](fundamentals.html#VkStructureType)

* 
[](#VUID-VkQueryPoolPerformanceQueryCreateInfoINTEL-performanceCountersSampling-parameter) VUID-VkQueryPoolPerformanceQueryCreateInfoINTEL-performanceCountersSampling-parameter

 `performanceCountersSampling` **must** be a valid [VkQueryPoolSamplingModeINTEL](#VkQueryPoolSamplingModeINTEL) value

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkQueryPoolCreateInfo](#VkQueryPoolCreateInfo)

Possible values of
[VkQueryPoolPerformanceQueryCreateInfoINTEL](#VkQueryPoolPerformanceQueryCreateInfoINTEL)::`performanceCountersSampling`
are:

// Provided by VK_INTEL_performance_query
typedef enum VkQueryPoolSamplingModeINTEL {
    VK_QUERY_POOL_SAMPLING_MODE_MANUAL_INTEL = 0,
} VkQueryPoolSamplingModeINTEL;

* 
[VK_QUERY_POOL_SAMPLING_MODE_MANUAL_INTEL](#VkQueryPoolSamplingModeINTEL) is the default mode in
which the application calls [vkCmdBeginQuery](#vkCmdBeginQuery) and
[vkCmdEndQuery](#vkCmdEndQuery) to record performance data.

To help associate query results with a particular point at which an
application emitted commands, markers can be set into the command buffers
with the call:

// Provided by VK_INTEL_performance_query
VkResult vkCmdSetPerformanceMarkerINTEL(
    VkCommandBuffer                             commandBuffer,
    const VkPerformanceMarkerInfoINTEL*         pMarkerInfo);

The last marker set onto a command buffer before the end of a query will be
part of the query result.

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetPerformanceMarkerINTEL-commandBuffer-parameter) VUID-vkCmdSetPerformanceMarkerINTEL-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetPerformanceMarkerINTEL-pMarkerInfo-parameter) VUID-vkCmdSetPerformanceMarkerINTEL-pMarkerInfo-parameter

 `pMarkerInfo` **must** be a valid pointer to a valid [VkPerformanceMarkerInfoINTEL](#VkPerformanceMarkerInfoINTEL) structure

* 
[](#VUID-vkCmdSetPerformanceMarkerINTEL-commandBuffer-recording) VUID-vkCmdSetPerformanceMarkerINTEL-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetPerformanceMarkerINTEL-commandBuffer-cmdpool) VUID-vkCmdSetPerformanceMarkerINTEL-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_TRANSFER_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetPerformanceMarkerINTEL-suspended) VUID-vkCmdSetPerformanceMarkerINTEL-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdSetPerformanceMarkerINTEL-videocoding) VUID-vkCmdSetPerformanceMarkerINTEL-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_TRANSFER_BIT | Action

State |

Conditional Rendering

vkCmdSetPerformanceMarkerINTEL is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_TOO_MANY_OBJECTS](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkPerformanceMarkerInfoINTEL` structure is defined as:

// Provided by VK_INTEL_performance_query
typedef struct VkPerformanceMarkerInfoINTEL {
    VkStructureType    sType;
    const void*        pNext;
    uint64_t           marker;
} VkPerformanceMarkerInfoINTEL;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`marker` is the marker value that will be recorded into the opaque
query results.

Valid Usage (Implicit)

* 
[](#VUID-VkPerformanceMarkerInfoINTEL-sType-sType) VUID-VkPerformanceMarkerInfoINTEL-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PERFORMANCE_MARKER_INFO_INTEL](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPerformanceMarkerInfoINTEL-pNext-pNext) VUID-VkPerformanceMarkerInfoINTEL-pNext-pNext

 `pNext` **must** be `NULL`

When monitoring the behavior of an application within the dataset generated
by the entire set of applications running on the system, it is useful to
identify draw calls within a potentially huge amount of performance data.
To do so, application can generate stream markers that will be used to trace
back a particular draw call with a particular performance data item.

// Provided by VK_INTEL_performance_query
VkResult vkCmdSetPerformanceStreamMarkerINTEL(
    VkCommandBuffer                             commandBuffer,
    const VkPerformanceStreamMarkerInfoINTEL*   pMarkerInfo);

* 
`commandBuffer` is a [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) into which a stream
marker is added.

* 
`pMarkerInfo` is a pointer to a
[VkPerformanceStreamMarkerInfoINTEL](#VkPerformanceStreamMarkerInfoINTEL) structure describing the marker
to insert.

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetPerformanceStreamMarkerINTEL-commandBuffer-parameter) VUID-vkCmdSetPerformanceStreamMarkerINTEL-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetPerformanceStreamMarkerINTEL-pMarkerInfo-parameter) VUID-vkCmdSetPerformanceStreamMarkerINTEL-pMarkerInfo-parameter

 `pMarkerInfo` **must** be a valid pointer to a valid [VkPerformanceStreamMarkerInfoINTEL](#VkPerformanceStreamMarkerInfoINTEL) structure

* 
[](#VUID-vkCmdSetPerformanceStreamMarkerINTEL-commandBuffer-recording) VUID-vkCmdSetPerformanceStreamMarkerINTEL-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetPerformanceStreamMarkerINTEL-commandBuffer-cmdpool) VUID-vkCmdSetPerformanceStreamMarkerINTEL-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_TRANSFER_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetPerformanceStreamMarkerINTEL-suspended) VUID-vkCmdSetPerformanceStreamMarkerINTEL-suspended

 This command **must** not be called between suspended render pass instances

* 
[](#VUID-vkCmdSetPerformanceStreamMarkerINTEL-videocoding) VUID-vkCmdSetPerformanceStreamMarkerINTEL-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_TRANSFER_BIT | Action

State |

Conditional Rendering

vkCmdSetPerformanceStreamMarkerINTEL is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_TOO_MANY_OBJECTS](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkPerformanceStreamMarkerInfoINTEL` structure is defined as:

// Provided by VK_INTEL_performance_query
typedef struct VkPerformanceStreamMarkerInfoINTEL {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           marker;
} VkPerformanceStreamMarkerInfoINTEL;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`marker` is the marker value that will be recorded into the reports
consumed by an external application.

Valid Usage

* 
[](#VUID-VkPerformanceStreamMarkerInfoINTEL-marker-02735) VUID-VkPerformanceStreamMarkerInfoINTEL-marker-02735

The value written by the application into `marker` **must** only used
the valid bits as reported by [vkGetPerformanceParameterINTEL](#vkGetPerformanceParameterINTEL) with
the [VK_PERFORMANCE_PARAMETER_TYPE_STREAM_MARKER_VALID_BITS_INTEL](#VkPerformanceParameterTypeINTEL)

Valid Usage (Implicit)

* 
[](#VUID-VkPerformanceStreamMarkerInfoINTEL-sType-sType) VUID-VkPerformanceStreamMarkerInfoINTEL-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PERFORMANCE_STREAM_MARKER_INFO_INTEL](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPerformanceStreamMarkerInfoINTEL-pNext-pNext) VUID-VkPerformanceStreamMarkerInfoINTEL-pNext-pNext

 `pNext` **must** be `NULL`

Some applications might want measure the effect of a set of commands with a
different settings.
It is possible to override a particular settings using :

// Provided by VK_INTEL_performance_query
VkResult vkCmdSetPerformanceOverrideINTEL(
    VkCommandBuffer                             commandBuffer,
    const VkPerformanceOverrideInfoINTEL*       pOverrideInfo);

* 
`commandBuffer` is the command buffer where the override takes
place.

* 
`pOverrideInfo` is a pointer to a
[VkPerformanceOverrideInfoINTEL](#VkPerformanceOverrideInfoINTEL) structure selecting the parameter
to override.

Valid Usage

* 
[](#VUID-vkCmdSetPerformanceOverrideINTEL-pOverrideInfo-02736) VUID-vkCmdSetPerformanceOverrideINTEL-pOverrideInfo-02736

`pOverrideInfo` **must** not be used with a
[VkPerformanceOverrideTypeINTEL](#VkPerformanceOverrideTypeINTEL) that is not reported available by
`vkGetPerformanceParameterINTEL`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetPerformanceOverrideINTEL-commandBuffer-parameter) VUID-vkCmdSetPerformanceOverrideINTEL-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetPerformanceOverrideINTEL-pOverrideInfo-parameter) VUID-vkCmdSetPerformanceOverrideINTEL-pOverrideInfo-parameter

 `pOverrideInfo` **must** be a valid pointer to a valid [VkPerformanceOverrideInfoINTEL](#VkPerformanceOverrideInfoINTEL) structure

* 
[](#VUID-vkCmdSetPerformanceOverrideINTEL-commandBuffer-recording) VUID-vkCmdSetPerformanceOverrideINTEL-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetPerformanceOverrideINTEL-commandBuffer-cmdpool) VUID-vkCmdSetPerformanceOverrideINTEL-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_TRANSFER_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetPerformanceOverrideINTEL-videocoding) VUID-vkCmdSetPerformanceOverrideINTEL-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT

VK_QUEUE_TRANSFER_BIT | State |

Conditional Rendering

vkCmdSetPerformanceOverrideINTEL is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_TOO_MANY_OBJECTS](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkPerformanceOverrideInfoINTEL` structure is defined as:

// Provided by VK_INTEL_performance_query
typedef struct VkPerformanceOverrideInfoINTEL {
    VkStructureType                   sType;
    const void*                       pNext;
    VkPerformanceOverrideTypeINTEL    type;
    VkBool32                          enable;
    uint64_t                          parameter;
} VkPerformanceOverrideInfoINTEL;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`type` is the particular [VkPerformanceOverrideTypeINTEL](#VkPerformanceOverrideTypeINTEL) to
set.

* 
`enable` defines whether the override is enabled.

* 
`parameter` is a potential required parameter for the override.

Valid Usage (Implicit)

* 
[](#VUID-VkPerformanceOverrideInfoINTEL-sType-sType) VUID-VkPerformanceOverrideInfoINTEL-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PERFORMANCE_OVERRIDE_INFO_INTEL](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPerformanceOverrideInfoINTEL-pNext-pNext) VUID-VkPerformanceOverrideInfoINTEL-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkPerformanceOverrideInfoINTEL-type-parameter) VUID-VkPerformanceOverrideInfoINTEL-type-parameter

 `type` **must** be a valid [VkPerformanceOverrideTypeINTEL](#VkPerformanceOverrideTypeINTEL) value

Possible values of [VkPerformanceOverrideInfoINTEL](#VkPerformanceOverrideInfoINTEL)::`type`,
specifying performance override types, are:

// Provided by VK_INTEL_performance_query
typedef enum VkPerformanceOverrideTypeINTEL {
    VK_PERFORMANCE_OVERRIDE_TYPE_NULL_HARDWARE_INTEL = 0,
    VK_PERFORMANCE_OVERRIDE_TYPE_FLUSH_GPU_CACHES_INTEL = 1,
} VkPerformanceOverrideTypeINTEL;

* 
[VK_PERFORMANCE_OVERRIDE_TYPE_NULL_HARDWARE_INTEL](#VkPerformanceOverrideTypeINTEL) turns all
rendering operations into noop.

* 
[VK_PERFORMANCE_OVERRIDE_TYPE_FLUSH_GPU_CACHES_INTEL](#VkPerformanceOverrideTypeINTEL) stalls the
stream of commands until all previously emitted commands have completed
and all caches been flushed and invalidated.

Before submitting command buffers containing performance queries commands to
a device queue, the application **must** acquire and set a performance query
configuration.
The configuration can be released once all command buffers containing
performance query commands are not in a pending state.

// Provided by VK_INTEL_performance_query
VK_DEFINE_NON_DISPATCHABLE_HANDLE(VkPerformanceConfigurationINTEL)

To acquire a device performance configuration, call:

// Provided by VK_INTEL_performance_query
VkResult vkAcquirePerformanceConfigurationINTEL(
    VkDevice                                    device,
    const VkPerformanceConfigurationAcquireInfoINTEL* pAcquireInfo,
    VkPerformanceConfigurationINTEL*            pConfiguration);

* 
`device` is the logical device that the performance query commands
will be submitted to.

* 
`pAcquireInfo` is a pointer to a
[VkPerformanceConfigurationAcquireInfoINTEL](#VkPerformanceConfigurationAcquireInfoINTEL) structure, specifying
the performance configuration to acquire.

* 
`pConfiguration` is a pointer to a
`VkPerformanceConfigurationINTEL` handle in which the resulting
configuration object is returned.

Valid Usage (Implicit)

* 
[](#VUID-vkAcquirePerformanceConfigurationINTEL-device-parameter) VUID-vkAcquirePerformanceConfigurationINTEL-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkAcquirePerformanceConfigurationINTEL-pAcquireInfo-parameter) VUID-vkAcquirePerformanceConfigurationINTEL-pAcquireInfo-parameter

 `pAcquireInfo` **must** be a valid pointer to a valid [VkPerformanceConfigurationAcquireInfoINTEL](#VkPerformanceConfigurationAcquireInfoINTEL) structure

* 
[](#VUID-vkAcquirePerformanceConfigurationINTEL-pConfiguration-parameter) VUID-vkAcquirePerformanceConfigurationINTEL-pConfiguration-parameter

 `pConfiguration` **must** be a valid pointer to a [VkPerformanceConfigurationINTEL](#VkPerformanceConfigurationINTEL) handle

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_TOO_MANY_OBJECTS](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

The `VkPerformanceConfigurationAcquireInfoINTEL` structure is defined
as:

// Provided by VK_INTEL_performance_query
typedef struct VkPerformanceConfigurationAcquireInfoINTEL {
    VkStructureType                        sType;
    const void*                            pNext;
    VkPerformanceConfigurationTypeINTEL    type;
} VkPerformanceConfigurationAcquireInfoINTEL;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`type` is one of the [VkPerformanceConfigurationTypeINTEL](#VkPerformanceConfigurationTypeINTEL) type
of performance configuration that will be acquired.

Valid Usage (Implicit)

* 
[](#VUID-VkPerformanceConfigurationAcquireInfoINTEL-sType-sType) VUID-VkPerformanceConfigurationAcquireInfoINTEL-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PERFORMANCE_CONFIGURATION_ACQUIRE_INFO_INTEL](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPerformanceConfigurationAcquireInfoINTEL-pNext-pNext) VUID-VkPerformanceConfigurationAcquireInfoINTEL-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkPerformanceConfigurationAcquireInfoINTEL-type-parameter) VUID-VkPerformanceConfigurationAcquireInfoINTEL-type-parameter

 `type` **must** be a valid [VkPerformanceConfigurationTypeINTEL](#VkPerformanceConfigurationTypeINTEL) value

Possible values of
[VkPerformanceConfigurationAcquireInfoINTEL](#VkPerformanceConfigurationAcquireInfoINTEL)::`type`, specifying
performance configuration types, are:

// Provided by VK_INTEL_performance_query
typedef enum VkPerformanceConfigurationTypeINTEL {
    VK_PERFORMANCE_CONFIGURATION_TYPE_COMMAND_QUEUE_METRICS_DISCOVERY_ACTIVATED_INTEL = 0,
} VkPerformanceConfigurationTypeINTEL;

To set a performance configuration, call:

// Provided by VK_INTEL_performance_query
VkResult vkQueueSetPerformanceConfigurationINTEL(
    VkQueue                                     queue,
    VkPerformanceConfigurationINTEL             configuration);

* 
`queue` is the queue on which the configuration will be used.

* 
`configuration` is the configuration to use.

Valid Usage (Implicit)

* 
[](#VUID-vkQueueSetPerformanceConfigurationINTEL-queue-parameter) VUID-vkQueueSetPerformanceConfigurationINTEL-queue-parameter

 `queue` **must** be a valid [VkQueue](devsandqueues.html#VkQueue) handle

* 
[](#VUID-vkQueueSetPerformanceConfigurationINTEL-configuration-parameter) VUID-vkQueueSetPerformanceConfigurationINTEL-configuration-parameter

 `configuration` **must** be a valid [VkPerformanceConfigurationINTEL](#VkPerformanceConfigurationINTEL) handle

* 
[](#VUID-vkQueueSetPerformanceConfigurationINTEL-commonparent) VUID-vkQueueSetPerformanceConfigurationINTEL-commonparent

 Both of `configuration`, and `queue` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `queue` **must** be externally synchronized
if it was not created with
[VK_DEVICE_QUEUE_CREATE_INTERNALLY_SYNCHRONIZED_BIT_KHR](devsandqueues.html#VkDeviceQueueCreateFlagBits)

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| - | - | - | Any | - |

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_TOO_MANY_OBJECTS](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

To release a device performance configuration, call:

// Provided by VK_INTEL_performance_query
VkResult vkReleasePerformanceConfigurationINTEL(
    VkDevice                                    device,
    VkPerformanceConfigurationINTEL             configuration);

* 
`device` is the device associated to the configuration object to
release.

* 
`configuration` is the configuration object to release.

Valid Usage

* 
[](#VUID-vkReleasePerformanceConfigurationINTEL-configuration-02737) VUID-vkReleasePerformanceConfigurationINTEL-configuration-02737

`configuration` **must** not be released before all command buffers
submitted while the configuration was set are in
[pending state](cmdbuffers.html#commandbuffers-lifecycle)

Valid Usage (Implicit)

* 
[](#VUID-vkReleasePerformanceConfigurationINTEL-device-parameter) VUID-vkReleasePerformanceConfigurationINTEL-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkReleasePerformanceConfigurationINTEL-configuration-parameter) VUID-vkReleasePerformanceConfigurationINTEL-configuration-parameter

 If `configuration` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `configuration` **must** be a valid [VkPerformanceConfigurationINTEL](#VkPerformanceConfigurationINTEL) handle

* 
[](#VUID-vkReleasePerformanceConfigurationINTEL-configuration-parent) VUID-vkReleasePerformanceConfigurationINTEL-configuration-parent

 If `configuration` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `configuration` **must** be externally synchronized

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_TOO_MANY_OBJECTS](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

Result status queries serve a single purpose: allowing the application to
determine whether a set of operations have completed successfully or not, as
indicated by the [VkQueryResultStatusKHR](#VkQueryResultStatusKHR) value written when retrieving
the result of a query using the [VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](#VkQueryResultFlagBits)
flag.

Unlike other query types, result status queries do not track or maintain any
other data beyond the completion status, thus no other data is written when
retrieving their results.

Support for result status queries is indicated by
[VkQueueFamilyQueryResultStatusPropertiesKHR](devsandqueues.html#VkQueueFamilyQueryResultStatusPropertiesKHR)::`queryResultStatusSupport`
, as returned by [vkGetPhysicalDeviceQueueFamilyProperties2](devsandqueues.html#vkGetPhysicalDeviceQueueFamilyProperties2) for the
queue family in question.

Video encode feedback queries allow the application to capture feedback
values generated by video encode operations.
As such, video encode feedback queries are available on queue families
supporting video encode operations.
The availability of individual video encode feedback values is indicated by
the bits of
[VkVideoEncodeCapabilitiesKHR](videocoding.html#VkVideoEncodeCapabilitiesKHR)::`supportedEncodeFeedbackFlags`, as
returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](videocoding.html#vkGetPhysicalDeviceVideoCapabilitiesKHR) for the
[video profile](videocoding.html#video-profiles) the queries are intended to be used with.

The set of enabled video encode feedback values **must** be configured on the
query pool when it is created using the `encodeFeedbackFlags` member of
the [VkQueryPoolVideoEncodeFeedbackCreateInfoKHR](#VkQueryPoolVideoEncodeFeedbackCreateInfoKHR) included in the
`pNext` chain of [VkQueryPoolCreateInfo](#VkQueryPoolCreateInfo).

The `VkQueryPoolVideoEncodeFeedbackCreateInfoKHR` structure is defined
as:

// Provided by VK_KHR_video_encode_queue
typedef struct VkQueryPoolVideoEncodeFeedbackCreateInfoKHR {
    VkStructureType                  sType;
    const void*                      pNext;
    VkVideoEncodeFeedbackFlagsKHR    encodeFeedbackFlags;
} VkQueryPoolVideoEncodeFeedbackCreateInfoKHR;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`encodeFeedbackFlags` is a bitmask of
[VkVideoEncodeFeedbackFlagBitsKHR](#VkVideoEncodeFeedbackFlagBitsKHR) values specifying the set of
enabled video encode feedback values captured by queries of the new
pool.

Valid Usage (Implicit)

* 
[](#VUID-VkQueryPoolVideoEncodeFeedbackCreateInfoKHR-sType-sType) VUID-VkQueryPoolVideoEncodeFeedbackCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_QUERY_POOL_VIDEO_ENCODE_FEEDBACK_CREATE_INFO_KHR](fundamentals.html#VkStructureType)

* 
[](#VUID-VkQueryPoolVideoEncodeFeedbackCreateInfoKHR-encodeFeedbackFlags-parameter) VUID-VkQueryPoolVideoEncodeFeedbackCreateInfoKHR-encodeFeedbackFlags-parameter

 `encodeFeedbackFlags` **must** be a valid combination of [VkVideoEncodeFeedbackFlagBitsKHR](#VkVideoEncodeFeedbackFlagBitsKHR) values

* 
[](#VUID-VkQueryPoolVideoEncodeFeedbackCreateInfoKHR-encodeFeedbackFlags-requiredbitmask) VUID-VkQueryPoolVideoEncodeFeedbackCreateInfoKHR-encodeFeedbackFlags-requiredbitmask

 `encodeFeedbackFlags` **must** not be `0`

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkQueryPoolCreateInfo](#VkQueryPoolCreateInfo)

Bits which **can** be set in
[VkQueryPoolVideoEncodeFeedbackCreateInfoKHR](#VkQueryPoolVideoEncodeFeedbackCreateInfoKHR)::`encodeFeedbackFlags`
for video encode feedback query pools are:

// Provided by VK_KHR_video_encode_queue
typedef enum VkVideoEncodeFeedbackFlagBitsKHR {
    VK_VIDEO_ENCODE_FEEDBACK_BITSTREAM_BUFFER_OFFSET_BIT_KHR = 0x00000001,
    VK_VIDEO_ENCODE_FEEDBACK_BITSTREAM_BYTES_WRITTEN_BIT_KHR = 0x00000002,
    VK_VIDEO_ENCODE_FEEDBACK_BITSTREAM_HAS_OVERRIDES_BIT_KHR = 0x00000004,
} VkVideoEncodeFeedbackFlagBitsKHR;

* 
[VK_VIDEO_ENCODE_FEEDBACK_BITSTREAM_BUFFER_OFFSET_BIT_KHR](#VkVideoEncodeFeedbackFlagBitsKHR) specifies
that queries managed by the pool will capture the byte offset of the
bitstream data written by the video encode operation to the bitstream
buffer specified in [VkVideoEncodeInfoKHR](videocoding.html#VkVideoEncodeInfoKHR)::`dstBuffer` relative
to the offset specified in
[VkVideoEncodeInfoKHR](videocoding.html#VkVideoEncodeInfoKHR)::`dstBufferOffset`.
For the first video encode operation issued by any
[video encode command](videocoding.html#video-encode-commands), this value will always
be zero, meaning that bitstream data is always written to the buffer
specified in [VkVideoEncodeInfoKHR](videocoding.html#VkVideoEncodeInfoKHR)::`dstBuffer` starting from
the offset specified in
[VkVideoEncodeInfoKHR](videocoding.html#VkVideoEncodeInfoKHR)::`dstBufferOffset`.

* 
[VK_VIDEO_ENCODE_FEEDBACK_BITSTREAM_BYTES_WRITTEN_BIT_KHR](#VkVideoEncodeFeedbackFlagBitsKHR) specifies
that queries managed by the pool will capture the number of bytes
written by the video encode operation to the bitstream buffer specified
in [VkVideoEncodeInfoKHR](videocoding.html#VkVideoEncodeInfoKHR)::`dstBuffer`.

* 
[VK_VIDEO_ENCODE_FEEDBACK_BITSTREAM_HAS_OVERRIDES_BIT_KHR](#VkVideoEncodeFeedbackFlagBitsKHR) specifies
that queries managed by the pool will capture a boolean value indicating
that the data written to the bitstream buffer specified in
[VkVideoEncodeInfoKHR](videocoding.html#VkVideoEncodeInfoKHR)::`dstBuffer` contains
[overridden parameters](videocoding.html#encode-overrides).

When retrieving the results of video encode feedback queries, the values
corresponding to each enabled video encode feedback are written in the order
of the bits defined above, followed by an optional value indicating
availability or result status if [VK_QUERY_RESULT_WITH_AVAILABILITY_BIT](#VkQueryResultFlagBits)
or [VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](#VkQueryResultFlagBits) is specified, respectively.

If the result status of a video encode feedback query is negative, then the
results of all enabled video encode feedback values will be **undefined**.

|  | Applications should always specify [VK_QUERY_RESULT_WITH_STATUS_BIT_KHR](#VkQueryResultFlagBits)
| --- | --- |
when retrieving the results of video encode feedback queries and ignore such
**undefined** video encode feedback values for any
[unsuccessfully](videocoding.html#encode-unsuccessful) completed video encode operations. |

// Provided by VK_KHR_video_encode_queue
typedef VkFlags VkVideoEncodeFeedbackFlagsKHR;

`VkVideoEncodeFeedbackFlagsKHR` is a bitmask type for setting a mask of
zero or more [VkVideoEncodeFeedbackFlagBitsKHR](#VkVideoEncodeFeedbackFlagBitsKHR).
