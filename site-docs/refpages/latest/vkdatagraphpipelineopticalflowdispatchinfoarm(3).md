# VkDataGraphPipelineOpticalFlowDispatchInfoARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphPipelineOpticalFlowDispatchInfoARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphPipelineOpticalFlowDispatchInfoARM - Structure specifying parameters of a optical flow vector calculation

The [VkDataGraphPipelineOpticalFlowDispatchInfoARM](#) structure is defined
as:

// Provided by VK_ARM_data_graph_optical_flow
typedef struct VkDataGraphPipelineOpticalFlowDispatchInfoARM {
    VkStructureType                          sType;
    void*                                    pNext;
    VkDataGraphOpticalFlowExecuteFlagsARM    flags;
    uint32_t                                 meanFlowL1NormHint;
} VkDataGraphPipelineOpticalFlowDispatchInfoARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` are the [VkDataGraphOpticalFlowExecuteFlagsARM](VkDataGraphOpticalFlowExecuteFlagsARM.html) used for
this command.

* 
`meanFlowL1NormHint` is an integer used to hint to the
implementation that the mean L1 norm of flow vectors is expected to be
centered around this value (in number of pixels of the input image).
The implementation may use this value to influence how flow vectors are
computed.
Different values may result in different flow vectors and will affect
the cost of computing the flow vectors.
A value of 0 means that the application does not wish to provide a hint.

Valid Usage

* 
[](#VUID-VkDataGraphPipelineOpticalFlowDispatchInfoARM-meanFlowL1NormHint-09976) VUID-VkDataGraphPipelineOpticalFlowDispatchInfoARM-meanFlowL1NormHint-09976

`meanFlowL1NormHint`, when different from 0, **must** be less than or
equal to the maximum of the width or height of the input image provided
at pipeline creation time via
[VkDataGraphPipelineOpticalFlowCreateInfoARM](VkDataGraphPipelineOpticalFlowCreateInfoARM.html)::`width` or
[VkDataGraphPipelineOpticalFlowCreateInfoARM](VkDataGraphPipelineOpticalFlowCreateInfoARM.html)::`height`,
respectively

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphPipelineOpticalFlowDispatchInfoARM-sType-sType) VUID-VkDataGraphPipelineOpticalFlowDispatchInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_OPTICAL_FLOW_DISPATCH_INFO_ARM](VkStructureType.html)

* 
[](#VUID-VkDataGraphPipelineOpticalFlowDispatchInfoARM-flags-parameter) VUID-VkDataGraphPipelineOpticalFlowDispatchInfoARM-flags-parameter

 `flags` **must** be a valid combination of [VkDataGraphOpticalFlowExecuteFlagBitsARM](VkDataGraphOpticalFlowExecuteFlagBitsARM.html) values

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDataGraphPipelineDispatchInfoARM](VkDataGraphPipelineDispatchInfoARM.html)

[VK_ARM_data_graph_optical_flow](VK_ARM_data_graph_optical_flow.html), [VkDataGraphOpticalFlowExecuteFlagsARM](VkDataGraphOpticalFlowExecuteFlagsARM.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineOpticalFlowDispatchInfoARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
