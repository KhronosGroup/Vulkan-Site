# VkQueueFamilyDataGraphTOSAPropertiesARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkQueueFamilyDataGraphTOSAPropertiesARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkQueueFamilyDataGraphTOSAPropertiesARM - Structure describing the TOSA properties of a processing engine and operation set for a specific queue family of a physical device

The `VkQueueFamilyDataGraphTOSAPropertiesARM` structure is defined as:

// Provided by VK_ARM_data_graph_instruction_set_tosa
typedef struct VkQueueFamilyDataGraphTOSAPropertiesARM {
    VkStructureType                         sType;
    void*                                   pNext;
    uint32_t                                profileCount;
    const VkDataGraphTOSANameQualityARM*    pProfiles;
    uint32_t                                extensionCount;
    const VkDataGraphTOSANameQualityARM*    pExtensions;
    VkDataGraphTOSALevelARM                 level;
} VkQueueFamilyDataGraphTOSAPropertiesARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`profileCount` is the length of the `pProfiles` array.

* 
`pProfiles` is a pointer to an array of
[VkDataGraphTOSANameQualityARM](VkDataGraphTOSANameQualityARM.html) structures describing the TOSA
profiles supported.

* 
`extensionCount` is the length of the `pExtensions` array.

* 
`pExtensions` is a pointer to an array of
[VkDataGraphTOSANameQualityARM](VkDataGraphTOSANameQualityARM.html) structures describing the TOSA
extensions supported.

* 
`level` is a [VkDataGraphTOSALevelARM](VkDataGraphTOSALevelARM.html) describing the TOSA level
supported.

Valid Usage (Implicit)

* 
[](#VUID-VkQueueFamilyDataGraphTOSAPropertiesARM-sType-sType) VUID-VkQueueFamilyDataGraphTOSAPropertiesARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_QUEUE_FAMILY_DATA_GRAPH_TOSA_PROPERTIES_ARM](VkStructureType.html)

* 
[](#VUID-VkQueueFamilyDataGraphTOSAPropertiesARM-pNext-pNext) VUID-VkQueueFamilyDataGraphTOSAPropertiesARM-pNext-pNext

 `pNext` **must** be `NULL`

[VK_ARM_data_graph_instruction_set_tosa](VK_ARM_data_graph_instruction_set_tosa.html), [VkDataGraphTOSALevelARM](VkDataGraphTOSALevelARM.html), [VkDataGraphTOSANameQualityARM](VkDataGraphTOSANameQualityARM.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#VkQueueFamilyDataGraphTOSAPropertiesARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
