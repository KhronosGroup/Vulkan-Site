# VkPipelineCacheHeaderVersionDataGraphQCOM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineCacheHeaderVersionDataGraphQCOM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineCacheHeaderVersionDataGraphQCOM - Structure describing the layout of the pipeline cache header for data graphs

The data graph pipeline cache header is defined as:

// Provided by VK_QCOM_data_graph_model
typedef struct VkPipelineCacheHeaderVersionDataGraphQCOM {
    uint32_t                         headerSize;
    VkPipelineCacheHeaderVersion     headerVersion;
    VkDataGraphModelCacheTypeQCOM    cacheType;
    uint32_t                         cacheVersion;
    uint32_t                         toolchainVersion[VK_DATA_GRAPH_MODEL_TOOLCHAIN_VERSION_LENGTH_QCOM];
} VkPipelineCacheHeaderVersionDataGraphQCOM;

* 
`headerSize` is the length in bytes of the pipeline cache header.

* 
`headerVersion` is a [VkPipelineCacheHeaderVersion](VkPipelineCacheHeaderVersion.html) value
specifying the version of the header.
A consumer of the pipeline cache **should** use the cache version to
interpret the remainder of the cache header.
`headerVersion` **must** be written as exactly 4 bytes.

* 
`cacheType` is the [VkDataGraphModelCacheTypeQCOM](VkDataGraphModelCacheTypeQCOM.html) type of data
graph cache encoded in the data.

* 
`cacheVersion` is the version of the encoding of the data graph
cache.

* 
`toolchainVersion` is a null-terminated UTF-8 string specifying the
version of the compiler that built the data graph cache.

The application **should** verify that the header info is compatible with the
[VkDataGraphProcessingEngineCreateInfoARM](VkDataGraphProcessingEngineCreateInfoARM.html) passed during pipeline
creation.
Implementations **may** return [VK_PIPELINE_COMPILE_REQUIRED_EXT](VkResult.html) from
[vkCreateDataGraphPipelinesARM](vkCreateDataGraphPipelinesARM.html) if the cache is not compatible.

|  | This cache type is built using offline compilation, therefore Vulkan does
| --- | --- |
not define engine compatibility.
The application should refer to the offline compiler used to create the
cache for guidance on compatibility. |

Unlike most structures declared by the Vulkan API, all fields of this
structure are written with the least significant byte first, regardless of
host byte-order.

The C language specification does not define the packing of structure
members.
This layout assumes tight structure member packing, with members laid out in
the order listed in the structure, and the intended size of the structure is
28 bytes.
If a compiler produces code that diverges from that pattern, applications
**must** employ another method to set values at the correct offsets.

Valid Usage

* 
[](#VUID-VkPipelineCacheHeaderVersionDataGraphQCOM-None-11835) VUID-VkPipelineCacheHeaderVersionDataGraphQCOM-None-11835

The [dataGraphModel](../../../../spec/latest/chapters/features.html#features-dataGraphModelQCOM) feature **must** be
enabled

* 
[](#VUID-VkPipelineCacheHeaderVersionDataGraphQCOM-headerSize-11836) VUID-VkPipelineCacheHeaderVersionDataGraphQCOM-headerSize-11836

`headerSize` **must** be 28

* 
[](#VUID-VkPipelineCacheHeaderVersionDataGraphQCOM-headerVersion-11837) VUID-VkPipelineCacheHeaderVersionDataGraphQCOM-headerVersion-11837

`headerVersion` **must** be
[VK_PIPELINE_CACHE_HEADER_VERSION_DATA_GRAPH_QCOM](VkPipelineCacheHeaderVersion.html)

* 
[](#VUID-VkPipelineCacheHeaderVersionDataGraphQCOM-headerSize-11838) VUID-VkPipelineCacheHeaderVersionDataGraphQCOM-headerSize-11838

`headerSize` **must** not exceed the size of the pipeline cache

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineCacheHeaderVersionDataGraphQCOM-headerVersion-parameter) VUID-VkPipelineCacheHeaderVersionDataGraphQCOM-headerVersion-parameter

 `headerVersion` **must** be a valid [VkPipelineCacheHeaderVersion](VkPipelineCacheHeaderVersion.html) value

* 
[](#VUID-VkPipelineCacheHeaderVersionDataGraphQCOM-cacheType-parameter) VUID-VkPipelineCacheHeaderVersionDataGraphQCOM-cacheType-parameter

 `cacheType` **must** be a valid [VkDataGraphModelCacheTypeQCOM](VkDataGraphModelCacheTypeQCOM.html) value

[VK_QCOM_data_graph_model](VK_QCOM_data_graph_model.html), [VkDataGraphModelCacheTypeQCOM](VkDataGraphModelCacheTypeQCOM.html), [VkPipelineCacheHeaderVersion](VkPipelineCacheHeaderVersion.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelineCacheHeaderVersionDataGraphQCOM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
