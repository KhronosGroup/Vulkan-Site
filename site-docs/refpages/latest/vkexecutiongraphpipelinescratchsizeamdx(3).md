# VkExecutionGraphPipelineScratchSizeAMDX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkExecutionGraphPipelineScratchSizeAMDX.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkExecutionGraphPipelineScratchSizeAMDX - Structure describing the scratch space required to dispatch an execution graph

The `VkExecutionGraphPipelineScratchSizeAMDX` structure is defined as:

// Provided by VK_AMDX_shader_enqueue
typedef struct VkExecutionGraphPipelineScratchSizeAMDX {
    VkStructureType    sType;
    void*              pNext;
    VkDeviceSize       minSize;
    VkDeviceSize       maxSize;
    VkDeviceSize       sizeGranularity;
} VkExecutionGraphPipelineScratchSizeAMDX;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`minSize` indicates the minimum scratch space required for
dispatching the queried execution graph.

* 
`maxSize` indicates the maximum scratch space that can be used for
dispatching the queried execution graph.

* 
`sizeGranularity` indicates the granularity at which the scratch
space can be increased from `minSize`.

Applications **can** use any amount of scratch memory greater than
`minSize` for dispatching a graph, however only the values equal to
`minSize` + an integer multiple of `sizeGranularity` will be used.
Greater values **may** result in higher performance, up to `maxSize` which
indicates the most memory that an implementation can use effectively.

Valid Usage (Implicit)

* 
[](#VUID-VkExecutionGraphPipelineScratchSizeAMDX-sType-sType) VUID-VkExecutionGraphPipelineScratchSizeAMDX-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_EXECUTION_GRAPH_PIPELINE_SCRATCH_SIZE_AMDX](VkStructureType.html)

[VK_AMDX_shader_enqueue](VK_AMDX_shader_enqueue.html), `VkDeviceSize`, [VkStructureType](VkStructureType.html), [vkGetExecutionGraphPipelineScratchSizeAMDX](vkGetExecutionGraphPipelineScratchSizeAMDX.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/executiongraphs.html#VkExecutionGraphPipelineScratchSizeAMDX).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
