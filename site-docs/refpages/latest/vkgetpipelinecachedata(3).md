# vkGetPipelineCacheData(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPipelineCacheData.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPipelineCacheData - Get the data store from a pipeline cache

Data **can** be retrieved from a pipeline cache object using the command:

// Provided by VK_VERSION_1_0
VkResult vkGetPipelineCacheData(
    VkDevice                                    device,
    VkPipelineCache                             pipelineCache,
    size_t*                                     pDataSize,
    void*                                       pData);

* 
`device` is the logical device that owns the pipeline cache.

* 
`pipelineCache` is the pipeline cache to retrieve data from.

* 
`pDataSize` is a pointer to a `size_t` value related to the
amount of data in the pipeline cache, as described below.

* 
`pData` is either `NULL` or a pointer to a buffer.

If `pData` is `NULL`, then the maximum size of the data that **can** be
retrieved from the pipeline cache, in bytes, is returned in `pDataSize`.
Otherwise, `pDataSize` **must** point to a variable set by the application
to the size of the buffer, in bytes, pointed to by `pData`, and on
return the variable is overwritten with the amount of data actually written
to `pData`.
If `pDataSize` is less than the maximum size that **can** be retrieved by
the pipeline cache, at most `pDataSize` bytes will be written to
`pData`, and [VK_INCOMPLETE](VkResult.html) will be returned instead of
[VK_SUCCESS](VkResult.html), to indicate that not all of the pipeline cache was
returned.

Any data written to `pData` is valid and **can** be provided as the
`pInitialData` member of the [VkPipelineCacheCreateInfo](VkPipelineCacheCreateInfo.html) structure
passed to `vkCreatePipelineCache`.

Two calls to `vkGetPipelineCacheData` with the same parameters **must**
retrieve the same data unless a command that modifies the contents of the
cache is called between them.

The initial bytes written to `pData` **must** be a header as described in
the [Pipeline Cache Header](../../../../spec/latest/chapters/pipelines.html#pipelines-cache-header) section.

If `pDataSize` is less than what is necessary to store this header,
nothing will be written to `pData` and zero will be written to
`pDataSize`.

|  | This query does not behave consistently with the behavior described in
| --- | --- |
[Opaque Binary Data Results](../../../../spec/latest/chapters/fundamentals.html#fundamentals-binaryresults), for historical
reasons.

If the amount of data available is larger than the passed `pDataSize`,
the query returns up to the size of the passed buffer, and signals overflow
with a [VK_INCOMPLETE](VkResult.html) success status instead of returning a
[VK_ERROR_NOT_ENOUGH_SPACE_KHR](VkResult.html) error status. |

Valid Usage

* 
[](#VUID-vkGetPipelineCacheData-pipelineCache-11834) VUID-vkGetPipelineCacheData-pipelineCache-11834

`pipelineCache` **must** not have been created with the
`headerVersion` member of
[VkPipelineCacheCreateInfo](VkPipelineCacheCreateInfo.html)::`pInitialData` equal to
[VK_PIPELINE_CACHE_HEADER_VERSION_DATA_GRAPH_QCOM](VkPipelineCacheHeaderVersion.html)

Valid Usage (Implicit)

* 
[](#VUID-vkGetPipelineCacheData-device-parameter) VUID-vkGetPipelineCacheData-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetPipelineCacheData-pipelineCache-parameter) VUID-vkGetPipelineCacheData-pipelineCache-parameter

 `pipelineCache` **must** be a valid [VkPipelineCache](VkPipelineCache.html) handle

* 
[](#VUID-vkGetPipelineCacheData-pDataSize-parameter) VUID-vkGetPipelineCacheData-pDataSize-parameter

 `pDataSize` **must** be a valid pointer to a `size_t` value

* 
[](#VUID-vkGetPipelineCacheData-pData-parameter) VUID-vkGetPipelineCacheData-pData-parameter

 If the value referenced by `pDataSize` is not `0`, and `pData` is not `NULL`, `pData` **must** be a valid pointer to an array of `pDataSize` bytes

* 
[](#VUID-vkGetPipelineCacheData-pipelineCache-parent) VUID-vkGetPipelineCacheData-pipelineCache-parent

 `pipelineCache` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](VkResult.html)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDevice](VkDevice.html), [VkPipelineCache](VkPipelineCache.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#vkGetPipelineCacheData).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
