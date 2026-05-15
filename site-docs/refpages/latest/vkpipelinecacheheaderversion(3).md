# VkPipelineCacheHeaderVersion(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineCacheHeaderVersion.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineCacheHeaderVersion - Encode pipeline cache version

Possible values of the `headerVersion` value of the pipeline cache
header are:

// Provided by VK_VERSION_1_0
typedef enum VkPipelineCacheHeaderVersion {
    VK_PIPELINE_CACHE_HEADER_VERSION_ONE = 1,
  // Provided by VK_QCOM_data_graph_model
    VK_PIPELINE_CACHE_HEADER_VERSION_DATA_GRAPH_QCOM = 1000629000,
} VkPipelineCacheHeaderVersion;

* 
[VK_PIPELINE_CACHE_HEADER_VERSION_ONE](#) specifies version one of the
pipeline cache, described by [VkPipelineCacheHeaderVersionOne](VkPipelineCacheHeaderVersionOne.html).

* 
[VK_PIPELINE_CACHE_HEADER_VERSION_DATA_GRAPH_QCOM](#) specifies a
pipeline cache for offline built data graph models, described by
[VkPipelineCacheHeaderVersionDataGraphQCOM](VkPipelineCacheHeaderVersionDataGraphQCOM.html).

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkPipelineCacheHeaderVersionDataGraphQCOM](VkPipelineCacheHeaderVersionDataGraphQCOM.html), [VkPipelineCacheHeaderVersionOne](VkPipelineCacheHeaderVersionOne.html), [vkCreatePipelineCache](vkCreatePipelineCache.html), [vkGetPipelineCacheData](vkGetPipelineCacheData.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineCacheHeaderVersion).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
