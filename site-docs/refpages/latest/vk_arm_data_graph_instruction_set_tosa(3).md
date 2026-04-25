# VK_ARM_data_graph_instruction_set_tosa(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_ARM_data_graph_instruction_set_tosa.html

## Table of Contents

- [Name](#_name)
- [VK_ARM_data_graph_instruction_set_tosa](#VK_ARM_data_graph_instruction_set_tosa)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_ARM_data_graph_instruction_set_tosa - device extension

**Name String**

`VK_ARM_data_graph_instruction_set_tosa`

**Extension Type**

Device extension

**Registered Extension Number**

509

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_ARM_data_graph](VK_ARM_data_graph.html)

**Contact**

* 
Kevin Petit [kpet](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_ARM_data_graph_instruction_set_tosa] @kpet%0A*Here describe the issue or question you have about the VK_ARM_data_graph_instruction_set_tosa extension*)

**Last Modified Date**

2026-03-30

**Interactions and External Dependencies**

* 
This extension requires [the
TOSA SPIR-V 001000.1 extended instruction set](https://github.khronos.org/SPIRV-Registry//extended/TOSA.001000.1.html)

**IP Status**

No known IP claims.

**Contributors**

* 
Kévin Petit, Arm Ltd.

This extensions adds support for the `TOSA.001000.1` extended instruction
set for use in data graphs as defined by [VK_ARM_data_graph](VK_ARM_data_graph.html).
It also adds detailed queries to report the TOSA profiles, levels, and
extensions that are supported along with the quality of the implementation
(e.g. accelerated, experimental, deprecated, etc).

* 
[vkGetPhysicalDeviceQueueFamilyDataGraphEngineOperationPropertiesARM](vkGetPhysicalDeviceQueueFamilyDataGraphEngineOperationPropertiesARM.html)

* 
[VkDataGraphTOSANameQualityARM](VkDataGraphTOSANameQualityARM.html)

* 
[VkQueueFamilyDataGraphTOSAPropertiesARM](VkQueueFamilyDataGraphTOSAPropertiesARM.html)

* 
[VkDataGraphTOSALevelARM](VkDataGraphTOSALevelARM.html)

* 
[VkDataGraphTOSAQualityFlagBitsARM](VkDataGraphTOSAQualityFlagBitsARM.html)

* 
[VkDataGraphTOSAQualityFlagsARM](VkDataGraphTOSAQualityFlagsARM.html)

* 
`VK_ARM_DATA_GRAPH_INSTRUCTION_SET_TOSA_EXTENSION_NAME`

* 
`VK_ARM_DATA_GRAPH_INSTRUCTION_SET_TOSA_SPEC_VERSION`

* 
[VK_MAX_DATA_GRAPH_TOSA_NAME_SIZE_ARM](VK_MAX_DATA_GRAPH_TOSA_NAME_SIZE_ARM.html)

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_QUEUE_FAMILY_DATA_GRAPH_TOSA_PROPERTIES_ARM](VkStructureType.html)

None.

None.

* 
Revision 1, 2026-03-30 (Kévin Petit)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_ARM_data_graph_instruction_set_tosa).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
