# VkPipelineCacheCreateFlagBits(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineCacheCreateFlagBits.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineCacheCreateFlagBits - Bitmask specifying the behavior of the pipeline cache

Bits which **can** be set in [VkPipelineCacheCreateInfo](VkPipelineCacheCreateInfo.html)::`flags`,
specifying behavior of the pipeline cache, are:

// Provided by VK_VERSION_1_0, VK_KHR_maintenance8, VK_EXT_pipeline_creation_cache_control
typedef enum VkPipelineCacheCreateFlagBits {
  // Provided by VK_VERSION_1_3
    VK_PIPELINE_CACHE_CREATE_EXTERNALLY_SYNCHRONIZED_BIT = 0x00000001,
  // Provided by VK_KHR_maintenance8
    VK_PIPELINE_CACHE_CREATE_INTERNALLY_SYNCHRONIZED_MERGE_BIT_KHR = 0x00000008,
  // Provided by VK_EXT_pipeline_creation_cache_control
    VK_PIPELINE_CACHE_CREATE_EXTERNALLY_SYNCHRONIZED_BIT_EXT = VK_PIPELINE_CACHE_CREATE_EXTERNALLY_SYNCHRONIZED_BIT,
} VkPipelineCacheCreateFlagBits;

* 
[VK_PIPELINE_CACHE_CREATE_EXTERNALLY_SYNCHRONIZED_BIT](#) specifies
that all commands that modify the created [VkPipelineCache](VkPipelineCache.html) will be
[externally synchronized](../../../../spec/latest/chapters/fundamentals.html#fundamentals-threadingbehavior).
When set, the implementation **may** skip any unnecessary processing needed
to support simultaneous modification from multiple threads where
allowed.

* 
[VK_PIPELINE_CACHE_CREATE_INTERNALLY_SYNCHRONIZED_MERGE_BIT_KHR](#)
specifies that when the created [VkPipelineCache](VkPipelineCache.html) is used as the
`dstCache` parameter of [vkMergePipelineCaches](vkMergePipelineCaches.html), it does not
need to be [externally synchronized](../../../../spec/latest/chapters/fundamentals.html#fundamentals-threadingbehavior).
This flag is mutually exclusive with
[VK_PIPELINE_CACHE_CREATE_EXTERNALLY_SYNCHRONIZED_BIT](#).

[VK_EXT_pipeline_creation_cache_control](VK_EXT_pipeline_creation_cache_control.html), [VK_KHR_maintenance8](VK_KHR_maintenance8.html), [VK_VERSION_1_0](VK_VERSION_1_0.html), [VkPipelineCacheCreateFlags](VkPipelineCacheCreateFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineCacheCreateFlagBits).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
