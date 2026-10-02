# VkDataGraphTOSALevelARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDataGraphTOSALevelARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDataGraphTOSALevelARM - Enumeration describing a data graph TOSA level

The defined data graph TOSA levels are:

// Provided by VK_ARM_data_graph_instruction_set_tosa
typedef enum VkDataGraphTOSALevelARM {
    VK_DATA_GRAPH_TOSA_LEVEL_NONE_ARM = 0,
    VK_DATA_GRAPH_TOSA_LEVEL_8K_ARM = 1,
} VkDataGraphTOSALevelARM;

* 
[VK_DATA_GRAPH_TOSA_LEVEL_NONE_ARM](#) corresponds to the none TOSA
level, as described in the TOSA specification.

* 
[VK_DATA_GRAPH_TOSA_LEVEL_8K_ARM](#) corresponds to the 8K TOSA level,
as described in the TOSA specification.

[VK_ARM_data_graph_instruction_set_tosa](VK_ARM_data_graph_instruction_set_tosa.html), [VkQueueFamilyDataGraphTOSAPropertiesARM](VkQueueFamilyDataGraphTOSAPropertiesARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkDataGraphTOSALevelARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
