# VkQueryPoolCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkQueryPoolCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkQueryPoolCreateInfo - Structure specifying parameters of a newly created query pool

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
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkQueryPoolCreateFlagBits](VkQueryPoolCreateFlagBits.html)

* 
`queryType` is a [VkQueryType](VkQueryType.html) value specifying the type of
queries managed by the pool.

* 
`queryCount` is the number of queries managed by the pool.

* 
`pipelineStatistics`
is a bitmask of [VkQueryPipelineStatisticFlagBits](VkQueryPipelineStatisticFlagBits.html) specifying which
counters will be returned in queries on the new pool, as described below
in [Pipeline Statistics Queries](../../../../spec/latest/chapters/queries.html#queries-pipestats).
`pipelineStatistics` is ignored if `queryType` is not
[VK_QUERY_TYPE_PIPELINE_STATISTICS](VkQueryType.html).

Valid Usage

* 
[](#VUID-VkQueryPoolCreateInfo-queryType-00791) VUID-VkQueryPoolCreateInfo-queryType-00791

If the [    `pipelineStatisticsQuery`](../../../../spec/latest/chapters/features.html#features-pipelineStatisticsQuery) feature is not enabled, `queryType`
**must** not be [VK_QUERY_TYPE_PIPELINE_STATISTICS](VkQueryType.html)

* 
[](#VUID-VkQueryPoolCreateInfo-meshShaderQueries-07068) VUID-VkQueryPoolCreateInfo-meshShaderQueries-07068

If the [`meshShaderQueries`](../../../../spec/latest/chapters/features.html#features-meshShaderQueries) feature
is not enabled, `queryType` **must** not be
[VK_QUERY_TYPE_MESH_PRIMITIVES_GENERATED_EXT](VkQueryType.html)

* 
[](#VUID-VkQueryPoolCreateInfo-meshShaderQueries-07069) VUID-VkQueryPoolCreateInfo-meshShaderQueries-07069

If the [`meshShaderQueries`](../../../../spec/latest/chapters/features.html#features-meshShaderQueries) feature
is not enabled, and `queryType` is
[VK_QUERY_TYPE_PIPELINE_STATISTICS](VkQueryType.html), `pipelineStatistics` **must**
not contain
[VK_QUERY_PIPELINE_STATISTIC_TASK_SHADER_INVOCATIONS_BIT_EXT](VkQueryPipelineStatisticFlagBits.html) or
[VK_QUERY_PIPELINE_STATISTIC_MESH_SHADER_INVOCATIONS_BIT_EXT](VkQueryPipelineStatisticFlagBits.html)

* 
[](#VUID-VkQueryPoolCreateInfo-queryType-00792) VUID-VkQueryPoolCreateInfo-queryType-00792

If `queryType` is [VK_QUERY_TYPE_PIPELINE_STATISTICS](VkQueryType.html),
`pipelineStatistics` **must** be a valid combination of
[VkQueryPipelineStatisticFlagBits](VkQueryPipelineStatisticFlagBits.html) values

* 
[](#VUID-VkQueryPoolCreateInfo-queryType-09534) VUID-VkQueryPoolCreateInfo-queryType-09534

If `queryType` is [VK_QUERY_TYPE_PIPELINE_STATISTICS](VkQueryType.html),
`pipelineStatistics` **must** not be zero

* 
[](#VUID-VkQueryPoolCreateInfo-queryType-03222) VUID-VkQueryPoolCreateInfo-queryType-03222

If `queryType` is [VK_QUERY_TYPE_PERFORMANCE_QUERY_KHR](VkQueryType.html), the
`pNext` chain **must** include a
[VkQueryPoolPerformanceCreateInfoKHR](VkQueryPoolPerformanceCreateInfoKHR.html) structure

* 
[](#VUID-VkQueryPoolCreateInfo-queryCount-02763) VUID-VkQueryPoolCreateInfo-queryCount-02763

`queryCount` **must** be greater than 0

* 
[](#VUID-VkQueryPoolCreateInfo-queryType-11839) VUID-VkQueryPoolCreateInfo-queryType-11839

If `queryType` is [VK_QUERY_TYPE_RESULT_STATUS_ONLY_KHR](VkQueryType.html), then
at least one of the queue families of the device **must** support
[result status queries](../../../../spec/latest/chapters/queries.html#queries-result-status-only), as indicated by
[VkQueueFamilyQueryResultStatusPropertiesKHR](VkQueueFamilyQueryResultStatusPropertiesKHR.html)::`queryResultStatusSupport`

* 
[](#VUID-VkQueryPoolCreateInfo-pNext-10779) VUID-VkQueryPoolCreateInfo-pNext-10779

If the `pNext` chain includes a [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html)
structure and its `videoCodecOperation` member is
[VK_VIDEO_CODEC_OPERATION_DECODE_VP9_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the
[`videoDecodeVP9`](../../../../spec/latest/chapters/features.html#features-videoDecodeVP9) feature **must** be
enabled

* 
[](#VUID-VkQueryPoolCreateInfo-queryType-07133) VUID-VkQueryPoolCreateInfo-queryType-07133

If `queryType` is [VK_QUERY_TYPE_VIDEO_ENCODE_FEEDBACK_KHR](VkQueryType.html),
then the `pNext` chain **must** include a [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html)
structure with `videoCodecOperation` specifying an encode operation

* 
[](#VUID-VkQueryPoolCreateInfo-queryType-07906) VUID-VkQueryPoolCreateInfo-queryType-07906

If `queryType` is [VK_QUERY_TYPE_VIDEO_ENCODE_FEEDBACK_KHR](VkQueryType.html),
then the `pNext` chain **must** include a
[VkQueryPoolVideoEncodeFeedbackCreateInfoKHR](VkQueryPoolVideoEncodeFeedbackCreateInfoKHR.html) structure

* 
[](#VUID-VkQueryPoolCreateInfo-queryType-07907) VUID-VkQueryPoolCreateInfo-queryType-07907

If `queryType` is [VK_QUERY_TYPE_VIDEO_ENCODE_FEEDBACK_KHR](VkQueryType.html), and
the `pNext` chain includes a [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html) structure
and a [VkQueryPoolVideoEncodeFeedbackCreateInfoKHR](VkQueryPoolVideoEncodeFeedbackCreateInfoKHR.html) structure, then
[VkQueryPoolVideoEncodeFeedbackCreateInfoKHR](VkQueryPoolVideoEncodeFeedbackCreateInfoKHR.html)::`encodeFeedbackFlags`
**must** not contain any bits that are not set in
[VkVideoEncodeCapabilitiesKHR](VkVideoEncodeCapabilitiesKHR.html)::`supportedEncodeFeedbackFlags`,
as returned by [vkGetPhysicalDeviceVideoCapabilitiesKHR](vkGetPhysicalDeviceVideoCapabilitiesKHR.html) for the
[video profile](../../../../spec/latest/chapters/videocoding.html#video-profiles) described by
[VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html) and its `pNext` chain

* 
[](#VUID-VkQueryPoolCreateInfo-pNext-10248) VUID-VkQueryPoolCreateInfo-pNext-10248

If the `pNext` chain includes a [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html)
structure and its `videoCodecOperation` member is
[VK_VIDEO_CODEC_OPERATION_ENCODE_AV1_BIT_KHR](VkVideoCodecOperationFlagBitsKHR.html), then the
[`videoEncodeAV1`](../../../../spec/latest/chapters/features.html#features-videoEncodeAV1) feature **must** be
enabled

* 
[](#VUID-VkQueryPoolCreateInfo-pNext-10918) VUID-VkQueryPoolCreateInfo-pNext-10918

If the `pNext` chain includes a
[VkVideoEncodeProfileRgbConversionInfoVALVE](VkVideoEncodeProfileRgbConversionInfoVALVE.html) structure, then the
[`videoEncodeRgbConversion`](../../../../spec/latest/chapters/features.html#features-videoEncodeRgbConversion)
feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-VkQueryPoolCreateInfo-sType-sType) VUID-VkQueryPoolCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_QUERY_POOL_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkQueryPoolCreateInfo-pNext-pNext) VUID-VkQueryPoolCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkQueryPoolPerformanceCreateInfoKHR](VkQueryPoolPerformanceCreateInfoKHR.html), [VkQueryPoolPerformanceQueryCreateInfoINTEL](VkQueryPoolPerformanceQueryCreateInfoINTEL.html), [VkQueryPoolVideoEncodeFeedbackCreateInfoKHR](VkQueryPoolVideoEncodeFeedbackCreateInfoKHR.html), [VkVideoDecodeAV1ProfileInfoKHR](VkVideoDecodeAV1ProfileInfoKHR.html), [VkVideoDecodeH264ProfileInfoKHR](VkVideoDecodeH264ProfileInfoKHR.html), [VkVideoDecodeH265ProfileInfoKHR](VkVideoDecodeH265ProfileInfoKHR.html), [VkVideoDecodeUsageInfoKHR](VkVideoDecodeUsageInfoKHR.html), [VkVideoDecodeVP9ProfileInfoKHR](VkVideoDecodeVP9ProfileInfoKHR.html), [VkVideoEncodeAV1ProfileInfoKHR](VkVideoEncodeAV1ProfileInfoKHR.html), [VkVideoEncodeH264ProfileInfoKHR](VkVideoEncodeH264ProfileInfoKHR.html), [VkVideoEncodeH265ProfileInfoKHR](VkVideoEncodeH265ProfileInfoKHR.html), [VkVideoEncodeUsageInfoKHR](VkVideoEncodeUsageInfoKHR.html), or [VkVideoProfileInfoKHR](VkVideoProfileInfoKHR.html)

* 
[](#VUID-VkQueryPoolCreateInfo-sType-unique) VUID-VkQueryPoolCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkQueryPoolCreateInfo-flags-parameter) VUID-VkQueryPoolCreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkQueryPoolCreateFlagBits](VkQueryPoolCreateFlagBits.html) values

* 
[](#VUID-VkQueryPoolCreateInfo-queryType-parameter) VUID-VkQueryPoolCreateInfo-queryType-parameter

 `queryType` **must** be a valid [VkQueryType](VkQueryType.html) value

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkQueryPipelineStatisticFlags](VkQueryPipelineStatisticFlags.html), [VkQueryPoolCreateFlags](VkQueryPoolCreateFlags.html), [VkQueryType](VkQueryType.html), [VkStructureType](VkStructureType.html), [vkCreateQueryPool](vkCreateQueryPool.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/queries.html#VkQueryPoolCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
