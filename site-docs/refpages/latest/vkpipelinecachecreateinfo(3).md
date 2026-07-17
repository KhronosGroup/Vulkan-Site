# VkPipelineCacheCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineCacheCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineCacheCreateInfo - Structure specifying parameters of a newly created pipeline cache

The `VkPipelineCacheCreateInfo` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkPipelineCacheCreateInfo {
    VkStructureType               sType;
    const void*                   pNext;
    VkPipelineCacheCreateFlags    flags;
    size_t                        initialDataSize;
    const void*                   pInitialData;
} VkPipelineCacheCreateInfo;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkPipelineCacheCreateFlagBits](VkPipelineCacheCreateFlagBits.html)
specifying the behavior of the pipeline cache.

* 
`initialDataSize` is the number of bytes in `pInitialData`.
If `initialDataSize` is zero, the pipeline cache will initially be
empty.

* 
`pInitialData` is a pointer to previously retrieved pipeline cache
data.
If the pipeline cache data is incompatible (as defined below) with the
device, the pipeline cache will be initially empty.
If `initialDataSize` is zero, `pInitialData` is ignored.

Valid Usage

* 
[](#VUID-VkPipelineCacheCreateInfo-initialDataSize-00768) VUID-VkPipelineCacheCreateInfo-initialDataSize-00768

If `initialDataSize` is not `0`, it **must** be equal to the size of
`pInitialData`, as returned by `vkGetPipelineCacheData` when
`pInitialData` was originally retrieved

* 
[](#VUID-VkPipelineCacheCreateInfo-initialDataSize-00769) VUID-VkPipelineCacheCreateInfo-initialDataSize-00769

If `initialDataSize` is not `0`, `pInitialData` **must** have been
retrieved from a previous call to `vkGetPipelineCacheData`

* 
[](#VUID-VkPipelineCacheCreateInfo-pipelineCreationCacheControl-02892) VUID-VkPipelineCacheCreateInfo-pipelineCreationCacheControl-02892

If the [    `pipelineCreationCacheControl`](../../../../spec/latest/chapters/features.html#features-pipelineCreationCacheControl) feature is not enabled, `flags`
**must** not include
[VK_PIPELINE_CACHE_CREATE_EXTERNALLY_SYNCHRONIZED_BIT](VkPipelineCacheCreateFlagBits.html)

* 
[](#VUID-VkPipelineCacheCreateInfo-maintenance8-10200) VUID-VkPipelineCacheCreateInfo-maintenance8-10200

If the [`maintenance8`](../../../../spec/latest/chapters/features.html#features-maintenance8) feature is not
enabled, `flags` **must** not include
[VK_PIPELINE_CACHE_CREATE_INTERNALLY_SYNCHRONIZED_MERGE_BIT_KHR](VkPipelineCacheCreateFlagBits.html)

* 
[](#VUID-VkPipelineCacheCreateInfo-flags-10201) VUID-VkPipelineCacheCreateInfo-flags-10201

If `flags` includes
[VK_PIPELINE_CACHE_CREATE_EXTERNALLY_SYNCHRONIZED_BIT](VkPipelineCacheCreateFlagBits.html), it **must** not
include
[VK_PIPELINE_CACHE_CREATE_INTERNALLY_SYNCHRONIZED_MERGE_BIT_KHR](VkPipelineCacheCreateFlagBits.html)

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineCacheCreateInfo-sType-sType) VUID-VkPipelineCacheCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_CACHE_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkPipelineCacheCreateInfo-pNext-pNext) VUID-VkPipelineCacheCreateInfo-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkPipelineCacheCreateInfo-flags-parameter) VUID-VkPipelineCacheCreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkPipelineCacheCreateFlagBits](VkPipelineCacheCreateFlagBits.html) values

* 
[](#VUID-VkPipelineCacheCreateInfo-pInitialData-parameter) VUID-VkPipelineCacheCreateInfo-pInitialData-parameter

 If `initialDataSize` is not `0`, `pInitialData` **must** be a valid pointer to an array of `initialDataSize` bytes

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkPipelineCacheCreateFlags](VkPipelineCacheCreateFlags.html), [VkStructureType](VkStructureType.html), [vkCreatePipelineCache](vkCreatePipelineCache.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineCacheCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
