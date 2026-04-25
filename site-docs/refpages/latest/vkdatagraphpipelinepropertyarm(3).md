# VkDataGraphPipelinePropertyARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphPipelinePropertyARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphPipelinePropertyARM - Enumeration describing the properties of a data graph pipeline that can be queried

Possible values of
[VkDataGraphPipelinePropertyQueryResultARM](VkDataGraphPipelinePropertyQueryResultARM.html)::`property`, specifying
the property of the data graph pipeline being queried, are:

// Provided by VK_ARM_data_graph
typedef enum VkDataGraphPipelinePropertyARM {
    VK_DATA_GRAPH_PIPELINE_PROPERTY_CREATION_LOG_ARM = 0,
    VK_DATA_GRAPH_PIPELINE_PROPERTY_IDENTIFIER_ARM = 1,
} VkDataGraphPipelinePropertyARM;

* 
[VK_DATA_GRAPH_PIPELINE_PROPERTY_CREATION_LOG_ARM](#) corresponds to a
human-readable log produced during the creation of a data graph
pipeline.
It **may** contain information about errors encountered during the creation
or other information generally useful for debugging.
This property **can** be queried for any data graph pipeline.

* 
[VK_DATA_GRAPH_PIPELINE_PROPERTY_IDENTIFIER_ARM](#) corresponds to an
opaque identifier for the data graph pipeline.
It **can** be used to create a graph pipeline from a pipeline cache without
the need to provide any creation data beyond the identifier, using a
[VkDataGraphPipelineIdentifierCreateInfoARM](VkDataGraphPipelineIdentifierCreateInfoARM.html) structure.

[VK_ARM_data_graph](VK_ARM_data_graph.html), [VkDataGraphPipelinePropertyQueryResultARM](VkDataGraphPipelinePropertyQueryResultARM.html), [vkGetDataGraphPipelineAvailablePropertiesARM](vkGetDataGraphPipelineAvailablePropertiesARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelinePropertyARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
