# VkDataGraphTOSANameQualityARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphTOSANameQualityARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphTOSANameQualityARM - Structure describing the name and quality level of a TOSA profile or extension

The `VkDataGraphTOSANameQualityARM` structure is defined as:

// Provided by VK_ARM_data_graph_instruction_set_tosa
typedef struct VkDataGraphTOSANameQualityARM {
    char                              name[VK_MAX_DATA_GRAPH_TOSA_NAME_SIZE_ARM];
    VkDataGraphTOSAQualityFlagsARM    qualityFlags;
} VkDataGraphTOSANameQualityARM;

* 
`name` is a pointer to a null-terminated UTF-8 string specifying the
name of the TOSA profile or extension.

* 
`qualityLevel` is a [VkDataGraphTOSAQualityFlagsARM](VkDataGraphTOSAQualityFlagsARM.html) describing
the quality of the support for the TOSA profile or extension.

[VK_ARM_data_graph_instruction_set_tosa](VK_ARM_data_graph_instruction_set_tosa.html), [VkDataGraphTOSAQualityFlagsARM](VkDataGraphTOSAQualityFlagsARM.html), [VkQueueFamilyDataGraphTOSAPropertiesARM](VkQueueFamilyDataGraphTOSAPropertiesARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphTOSANameQualityARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
