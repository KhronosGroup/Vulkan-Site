# vkMergePipelineCaches(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkMergePipelineCaches.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkMergePipelineCaches - Combine the data stores of pipeline caches

Pipeline cache objects **can** be merged using the command:

// Provided by VK_VERSION_1_0
VkResult vkMergePipelineCaches(
    VkDevice                                    device,
    VkPipelineCache                             dstCache,
    uint32_t                                    srcCacheCount,
    const VkPipelineCache*                      pSrcCaches);

* 
`device` is the logical device that owns the pipeline cache objects.

* 
`dstCache` is the handle of the pipeline cache to merge results
into.

* 
`srcCacheCount` is the length of the `pSrcCaches` array.

* 
`pSrcCaches` is a pointer to an array of pipeline cache handles,
which will be merged into `dstCache`.
The previous contents of `dstCache` are included after the merge.

|  | The details of the merge operation are implementation-dependent, but
| --- | --- |
implementations **should** merge the contents of the specified pipelines and
prune duplicate entries. |

Valid Usage

* 
[](#VUID-vkMergePipelineCaches-dstCache-00770) VUID-vkMergePipelineCaches-dstCache-00770

`dstCache` **must** not appear in the list of source caches

* 
[](#VUID-vkMergePipelineCaches-dstCache-10202) VUID-vkMergePipelineCaches-dstCache-10202

Host access to `dstCache` **must** be externally synchronized
if it was not created with
[VK_PIPELINE_CACHE_CREATE_INTERNALLY_SYNCHRONIZED_MERGE_BIT_KHR](VkPipelineCacheCreateFlagBits.html)

* 
[](#VUID-vkMergePipelineCaches-dstCache-11832) VUID-vkMergePipelineCaches-dstCache-11832

`dstCache` **must** not have been created with the `headerVersion`
member of [VkPipelineCacheCreateInfo](VkPipelineCacheCreateInfo.html)::`pInitialData` equal to
[VK_PIPELINE_CACHE_HEADER_VERSION_DATA_GRAPH_QCOM](VkPipelineCacheHeaderVersion.html)

* 
[](#VUID-vkMergePipelineCaches-headerVersion-11833) VUID-vkMergePipelineCaches-headerVersion-11833

Each member of pSrcCaches **must** not have been created with the
`headerVersion` member of
[VkPipelineCacheCreateInfo](VkPipelineCacheCreateInfo.html)::`pInitialData` equal to
[VK_PIPELINE_CACHE_HEADER_VERSION_DATA_GRAPH_QCOM](VkPipelineCacheHeaderVersion.html)

Valid Usage (Implicit)

* 
[](#VUID-vkMergePipelineCaches-device-parameter) VUID-vkMergePipelineCaches-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkMergePipelineCaches-dstCache-parameter) VUID-vkMergePipelineCaches-dstCache-parameter

 `dstCache` **must** be a valid [VkPipelineCache](VkPipelineCache.html) handle

* 
[](#VUID-vkMergePipelineCaches-pSrcCaches-parameter) VUID-vkMergePipelineCaches-pSrcCaches-parameter

 `pSrcCaches` **must** be a valid pointer to an array of `srcCacheCount` valid [VkPipelineCache](VkPipelineCache.html) handles

* 
[](#VUID-vkMergePipelineCaches-srcCacheCount-arraylength) VUID-vkMergePipelineCaches-srcCacheCount-arraylength

 `srcCacheCount` **must** be greater than `0`

* 
[](#VUID-vkMergePipelineCaches-dstCache-parent) VUID-vkMergePipelineCaches-dstCache-parent

 `dstCache` **must** have been created, allocated, or retrieved from `device`

* 
[](#VUID-vkMergePipelineCaches-pSrcCaches-parent) VUID-vkMergePipelineCaches-pSrcCaches-parent

 Each element of `pSrcCaches` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

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

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#vkMergePipelineCaches).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
