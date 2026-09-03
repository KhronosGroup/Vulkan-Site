# VkPipelineBinaryCreateInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineBinaryCreateInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineBinaryCreateInfoKHR - Structure specifying where to retrieve data for pipeline binary creation

The `VkPipelineBinaryCreateInfoKHR` structure is defined as:

// Provided by VK_KHR_pipeline_binary
typedef struct VkPipelineBinaryCreateInfoKHR {
    VkStructureType                          sType;
    const void*                              pNext;
    const VkPipelineBinaryKeysAndDataKHR*    pKeysAndDataInfo;
    VkPipeline                               pipeline;
    const VkPipelineCreateInfoKHR*           pPipelineCreateInfo;
} VkPipelineBinaryCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pKeysAndDataInfo` is `NULL` or a pointer to a
[VkPipelineBinaryKeysAndDataKHR](VkPipelineBinaryKeysAndDataKHR.html) structure that contains keys and
data to create the pipeline binaries from.

* 
`pipeline` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html) or a `VkPipeline` that
contains data to create the pipeline binaries from.

* 
`pPipelineCreateInfo` is `NULL` or a pointer to a
[VkPipelineCreateInfoKHR](VkPipelineCreateInfoKHR.html) structure with the pipeline creation info.
This is used to probe the implementation’s internal cache for pipeline
binaries.

When `pPipelineCreateInfo` is not `NULL`, an implementation will attempt
to retrieve pipeline binary data from an internal cache external to the
application if
[`pipelineBinaryInternalCache`](../../../../spec/latest/chapters/limits.html#limits-pipelineBinaryInternalCache) is
[VK_TRUE](VK_TRUE.html).
Applications **can** use this to determine if a pipeline **can** be created
without compilation.
If the implementation fails to create a pipeline binary due to missing an
internal cache entry, [VK_PIPELINE_BINARY_MISSING_KHR](VkResult.html) is returned.
If creation succeeds, the resulting binary **can** be used to create a
pipeline.
[VK_PIPELINE_BINARY_MISSING_KHR](VkResult.html) **may** be returned for any reason in this
situation, even if creating a pipeline binary with the same parameters that
succeeded earlier.

If
[`pipelineBinaryPrecompiledInternalCache`](../../../../spec/latest/chapters/limits.html#limits-pipelineBinaryPrecompiledInternalCache)
is [VK_TRUE](VK_TRUE.html), the implementation **may** be able to create pipeline
binaries even when `pPipelineCreateInfo` has not been used to create
binaries before by the application.

|  | On some platforms, internal pipeline caches may be pre-populated before
| --- | --- |
running the application. |

Valid Usage

* 
[](#VUID-VkPipelineBinaryCreateInfoKHR-pipeline-09607) VUID-VkPipelineBinaryCreateInfoKHR-pipeline-09607

If `pipeline` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `pipeline` **must** have
been created with [VK_PIPELINE_CREATE_2_CAPTURE_DATA_BIT_KHR](VkPipelineCreateFlagBits2.html)

* 
[](#VUID-VkPipelineBinaryCreateInfoKHR-pipeline-09608) VUID-VkPipelineBinaryCreateInfoKHR-pipeline-09608

If `pipeline` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
[vkReleaseCapturedPipelineDataKHR](vkReleaseCapturedPipelineDataKHR.html) **must** not have been called on
`pipeline` prior to this command

* 
[](#VUID-VkPipelineBinaryCreateInfoKHR-pipelineBinaryInternalCache-09609) VUID-VkPipelineBinaryCreateInfoKHR-pipelineBinaryInternalCache-09609

If
[`pipelineBinaryInternalCache`](../../../../spec/latest/chapters/limits.html#limits-pipelineBinaryInternalCache)
is [VK_FALSE](VK_FALSE.html) pPipelineCreateInfo **must** be `NULL`

* 
[](#VUID-VkPipelineBinaryCreateInfoKHR-device-09610) VUID-VkPipelineBinaryCreateInfoKHR-device-09610

If `device` was created with
[VkDevicePipelineBinaryInternalCacheControlKHR](VkDevicePipelineBinaryInternalCacheControlKHR.html)::`disableInternalCache`
set to [VK_TRUE](VK_TRUE.html), `pPipelineCreateInfo` **must** be `NULL`

* 
[](#VUID-VkPipelineBinaryCreateInfoKHR-pKeysAndDataInfo-09619) VUID-VkPipelineBinaryCreateInfoKHR-pKeysAndDataInfo-09619

One and only one of `pKeysAndDataInfo`, `pipeline`, or
`pPipelineCreateInfo` **must** be non-`NULL`

* 
[](#VUID-VkPipelineBinaryCreateInfoKHR-pPipelineCreateInfo-09606) VUID-VkPipelineBinaryCreateInfoKHR-pPipelineCreateInfo-09606

If `pPipelineCreateInfo` is not `NULL`, the `pNext` chain of
`pPipelineCreateInfo` **must** not set
[VkPipelineBinaryInfoKHR](VkPipelineBinaryInfoKHR.html)::`binaryCount` to a value greater than
`0`

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineBinaryCreateInfoKHR-sType-sType) VUID-VkPipelineBinaryCreateInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_BINARY_CREATE_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkPipelineBinaryCreateInfoKHR-pNext-pNext) VUID-VkPipelineBinaryCreateInfoKHR-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkPipelineBinaryCreateInfoKHR-pKeysAndDataInfo-parameter) VUID-VkPipelineBinaryCreateInfoKHR-pKeysAndDataInfo-parameter

 If `pKeysAndDataInfo` is not `NULL`, `pKeysAndDataInfo` **must** be a valid pointer to a valid [VkPipelineBinaryKeysAndDataKHR](VkPipelineBinaryKeysAndDataKHR.html) structure

* 
[](#VUID-VkPipelineBinaryCreateInfoKHR-pipeline-parameter) VUID-VkPipelineBinaryCreateInfoKHR-pipeline-parameter

 If `pipeline` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `pipeline` **must** be a valid [VkPipeline](VkPipeline.html) handle

* 
[](#VUID-VkPipelineBinaryCreateInfoKHR-pPipelineCreateInfo-parameter) VUID-VkPipelineBinaryCreateInfoKHR-pPipelineCreateInfo-parameter

 If `pPipelineCreateInfo` is not `NULL`, `pPipelineCreateInfo` **must** be a valid pointer to a valid [VkPipelineCreateInfoKHR](VkPipelineCreateInfoKHR.html) structure

[VK_KHR_pipeline_binary](VK_KHR_pipeline_binary.html), [VkPipeline](VkPipeline.html), [VkPipelineBinaryKeysAndDataKHR](VkPipelineBinaryKeysAndDataKHR.html), [VkPipelineCreateInfoKHR](VkPipelineCreateInfoKHR.html), [VkStructureType](VkStructureType.html), [vkCreatePipelineBinariesKHR](vkCreatePipelineBinariesKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineBinaryCreateInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
