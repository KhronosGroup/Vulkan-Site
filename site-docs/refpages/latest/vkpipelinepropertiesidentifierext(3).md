# VkPipelinePropertiesIdentifierEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPipelinePropertiesIdentifierEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPipelinePropertiesIdentifierEXT - Structure used to retrieve pipeline properties

The `VkPipelinePropertiesIdentifierEXT` structure is defined as:

// Provided by VK_EXT_pipeline_properties
typedef struct VkPipelinePropertiesIdentifierEXT {
    VkStructureType    sType;
    void*              pNext;
    uint8_t            pipelineIdentifier[VK_UUID_SIZE];
} VkPipelinePropertiesIdentifierEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pipelineIdentifier` is an array of [VK_UUID_SIZE](VK_UUID_SIZE.html) `uint8_t`
values into which the pipeline identifier will be written.

Valid Usage (Implicit)

* 
[](#VUID-VkPipelinePropertiesIdentifierEXT-sType-sType) VUID-VkPipelinePropertiesIdentifierEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PIPELINE_PROPERTIES_IDENTIFIER_EXT](VkStructureType.html)

* 
[](#VUID-VkPipelinePropertiesIdentifierEXT-pNext-pNext) VUID-VkPipelinePropertiesIdentifierEXT-pNext-pNext

 `pNext` **must** be `NULL`

[VK_EXT_pipeline_properties](VK_EXT_pipeline_properties.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/pipelines.html#VkPipelinePropertiesIdentifierEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
