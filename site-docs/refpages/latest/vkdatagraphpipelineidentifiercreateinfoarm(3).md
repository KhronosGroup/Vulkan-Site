# VkDataGraphPipelineIdentifierCreateInfoARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphPipelineIdentifierCreateInfoARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphPipelineIdentifierCreateInfoARM - Structure specifying an identifier for the newly created data graph pipeline

The `VkDataGraphPipelineIdentifierCreateInfoARM` structure is defined
as:

// Provided by VK_ARM_data_graph
typedef struct VkDataGraphPipelineIdentifierCreateInfoARM {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           identifierSize;
    const uint8_t*     pIdentifier;
} VkDataGraphPipelineIdentifierCreateInfoARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`identifierSize` is the size in bytes of the identifier data
accessible via `pIdentifier`.

* 
`pIdentifier` is a pointer to `identifierSize` bytes of data
that describe the pipeline being created.

The `pIdentifier` **can** be retrieved from the device by calling
[vkGetDataGraphPipelinePropertiesARM](vkGetDataGraphPipelinePropertiesARM.html) and searching the results for a
[VkDataGraphPipelinePropertyQueryResultARM](VkDataGraphPipelinePropertyQueryResultARM.html) structure with
`property` set to [VK_DATA_GRAPH_PIPELINE_PROPERTY_IDENTIFIER_ARM](VkDataGraphPipelinePropertyARM.html).

Valid Usage (Implicit)

* 
[](#VUID-VkDataGraphPipelineIdentifierCreateInfoARM-sType-sType) VUID-VkDataGraphPipelineIdentifierCreateInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_IDENTIFIER_CREATE_INFO_ARM](VkStructureType.html)

* 
[](#VUID-VkDataGraphPipelineIdentifierCreateInfoARM-pIdentifier-parameter) VUID-VkDataGraphPipelineIdentifierCreateInfoARM-pIdentifier-parameter

 `pIdentifier` **must** be a valid pointer to an array of `identifierSize` `uint8_t` values

* 
[](#VUID-VkDataGraphPipelineIdentifierCreateInfoARM-identifierSize-arraylength) VUID-VkDataGraphPipelineIdentifierCreateInfoARM-identifierSize-arraylength

 `identifierSize` **must** be greater than `0`

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDataGraphPipelineCreateInfoARM](VkDataGraphPipelineCreateInfoARM.html)

[VK_ARM_data_graph](VK_ARM_data_graph.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphPipelineIdentifierCreateInfoARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
