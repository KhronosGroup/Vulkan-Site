# VkDataGraphPipelineSessionCreateFlagBitsARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphPipelineSessionCreateFlagBitsARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphPipelineSessionCreateFlagBitsARM - Bitmask specifying additional parameters of a data graph pipeline session

Bits which **can** be set in
[VkDataGraphPipelineSessionCreateInfoARM](VkDataGraphPipelineSessionCreateInfoARM.html)::`flags`, specifying
additional parameters of a data graph pipeline session, are:

// Provided by VK_ARM_data_graph
// Flag bits for VkDataGraphPipelineSessionCreateFlagBitsARM
typedef VkFlags64 VkDataGraphPipelineSessionCreateFlagBitsARM;
static const VkDataGraphPipelineSessionCreateFlagBitsARM VK_DATA_GRAPH_PIPELINE_SESSION_CREATE_PROTECTED_BIT_ARM = 0x00000001ULL;

* 
[VK_DATA_GRAPH_PIPELINE_SESSION_CREATE_PROTECTED_BIT_ARM](#) specifies
that the data graph pipeline session is backed by protected memory.

[VK_ARM_data_graph](VK_ARM_data_graph.html), [VkDataGraphPipelineSessionCreateFlagsARM](VkDataGraphPipelineSessionCreateFlagsARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineSessionCreateFlagBitsARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
