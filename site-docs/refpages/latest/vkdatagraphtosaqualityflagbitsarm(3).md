# VkDataGraphTOSAQualityFlagBitsARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphTOSAQualityFlagBitsARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphTOSAQualityFlagBitsARM - Bits specifying quality properties for a TOSA profile or extension

Bits which **can** be set in
[VkDataGraphTOSANameQualityARM](VkDataGraphTOSANameQualityARM.html)::`qualityLevel`, describing the
quality of a TOSA profile or extension, are:

// Provided by VK_ARM_data_graph_instruction_set_tosa
typedef enum VkDataGraphTOSAQualityFlagBitsARM {
    VK_DATA_GRAPH_TOSA_QUALITY_ACCELERATED_ARM = 0x00000001,
    VK_DATA_GRAPH_TOSA_QUALITY_CONFORMANT_ARM = 0x00000002,
    VK_DATA_GRAPH_TOSA_QUALITY_EXPERIMENTAL_ARM = 0x00000004,
    VK_DATA_GRAPH_TOSA_QUALITY_DEPRECATED_ARM = 0x00000008,
} VkDataGraphTOSAQualityFlagBitsARM;

* 
[VK_DATA_GRAPH_TOSA_QUALITY_ACCELERATED_ARM](#) specifies that the
implementation of the TOSA profile or extension is accelerated.

* 
[VK_DATA_GRAPH_TOSA_QUALITY_CONFORMANT_ARM](#) specifies that the
implementation of the TOSA profile or extension is conformant.

* 
[VK_DATA_GRAPH_TOSA_QUALITY_EXPERIMENTAL_ARM](#) specifies that the
TOSA profile or extension is experimental.

* 
[VK_DATA_GRAPH_TOSA_QUALITY_DEPRECATED_ARM](#) specifies that the TOSA
profile or extension is deprecated.

[VK_ARM_data_graph_instruction_set_tosa](VK_ARM_data_graph_instruction_set_tosa.html), [VkDataGraphTOSAQualityFlagsARM](VkDataGraphTOSAQualityFlagsARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphTOSAQualityFlagBitsARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
