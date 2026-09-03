# VkPipelineRasterizationProvokingVertexStateCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelineRasterizationProvokingVertexStateCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelineRasterizationProvokingVertexStateCreateInfoEXT - Structure specifying provoking vertex mode used by a graphics pipeline

For a given primitive topology, the pipeline’s provoking vertex mode
determines which vertex is the provoking vertex.
To specify the provoking vertex mode, include a
`VkPipelineRasterizationProvokingVertexStateCreateInfoEXT` structure in
the [VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html)::`pNext` chain when
creating the pipeline.

The `VkPipelineRasterizationProvokingVertexStateCreateInfoEXT` structure
is defined as:

// Provided by VK_EXT_provoking_vertex
typedef struct VkPipelineRasterizationProvokingVertexStateCreateInfoEXT {
    VkStructureType             sType;
    const void*                 pNext;
    VkProvokingVertexModeEXT    provokingVertexMode;
} VkPipelineRasterizationProvokingVertexStateCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`provokingVertexMode` is a [VkProvokingVertexModeEXT](VkProvokingVertexModeEXT.html) value
selecting the provoking vertex mode.

If this structure is not provided when creating the pipeline, the pipeline
will use the [VK_PROVOKING_VERTEX_MODE_FIRST_VERTEX_EXT](VkProvokingVertexModeEXT.html) mode.

If the [`provokingVertexModePerPipeline`](../../../../spec/latest/chapters/limits.html#limits-provokingVertexModePerPipeline) limit is [VK_FALSE](VK_FALSE.html), then all
pipelines bound within a render pass instance **must** have the same
`provokingVertexMode`.

Valid Usage

* 
[](#VUID-VkPipelineRasterizationProvokingVertexStateCreateInfoEXT-provokingVertexMode-04883) VUID-VkPipelineRasterizationProvokingVertexStateCreateInfoEXT-provokingVertexMode-04883

If `provokingVertexMode` is
[VK_PROVOKING_VERTEX_MODE_LAST_VERTEX_EXT](VkProvokingVertexModeEXT.html), then the
[`provokingVertexLast`](../../../../spec/latest/chapters/features.html#features-provokingVertexLast) feature
**must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-VkPipelineRasterizationProvokingVertexStateCreateInfoEXT-sType-sType) VUID-VkPipelineRasterizationProvokingVertexStateCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_RASTERIZATION_PROVOKING_VERTEX_STATE_CREATE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkPipelineRasterizationProvokingVertexStateCreateInfoEXT-provokingVertexMode-parameter) VUID-VkPipelineRasterizationProvokingVertexStateCreateInfoEXT-provokingVertexMode-parameter

 `provokingVertexMode` **must** be a valid [VkProvokingVertexModeEXT](VkProvokingVertexModeEXT.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html)

[VK_EXT_provoking_vertex](VK_EXT_provoking_vertex.html), [VkProvokingVertexModeEXT](VkProvokingVertexModeEXT.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/vertexpostproc.html#VkPipelineRasterizationProvokingVertexStateCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
