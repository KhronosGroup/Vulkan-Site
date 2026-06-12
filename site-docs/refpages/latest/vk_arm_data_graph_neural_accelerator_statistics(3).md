# VK_ARM_data_graph_neural_accelerator_statistics(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_ARM_data_graph_neural_accelerator_statistics.html

## Table of Contents

- [Name](#_name)
- [VK_ARM_data_graph_neural_accelerator_statistics](#VK_ARM_data_graph_neural_accelerator_statistics)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [New SPIR-V Capabilities](#_new_spir_v_capabilities)
- [New_SPIR-V_Capabilities](#_new_spir_v_capabilities)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_ARM_data_graph_neural_accelerator_statistics - device extension

**Name String**

`VK_ARM_data_graph_neural_accelerator_statistics`

**Extension Type**

Device extension

**Registered Extension Number**

677

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**Contact**

* 
Kevin Petit [kpet](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_ARM_data_graph_neural_accelerator_statistics] @kpet%0A*Here describe the issue or question you have about the VK_ARM_data_graph_neural_accelerator_statistics extension*)

**Last Modified Date**

2026-04-28

**Interactions and External Dependencies**

* 
None

**IP Status**

No known IP claims.

**Contributors**

* 
Kévin Petit, Arm Ltd.

* 
Emma Lynn Mulier (Benyossef), Arm Ltd.

This extension adds support for getting data graph execution statistics for
Arm neural accelerators.

* 
Extending [VkDataGraphPipelineCreateInfoARM](VkDataGraphPipelineCreateInfoARM.html):

[VkDataGraphPipelineNeuralStatisticsCreateInfoARM](VkDataGraphPipelineNeuralStatisticsCreateInfoARM.html)

Extending [VkDataGraphPipelineSessionCreateInfoARM](VkDataGraphPipelineSessionCreateInfoARM.html):

* 
[VkDataGraphPipelineSessionNeuralStatisticsCreateInfoARM](VkDataGraphPipelineSessionNeuralStatisticsCreateInfoARM.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceDataGraphNeuralAcceleratorStatisticsFeaturesARM](VkPhysicalDeviceDataGraphNeuralAcceleratorStatisticsFeaturesARM.html)

* 
[VkNeuralAcceleratorStatisticsModeARM](VkNeuralAcceleratorStatisticsModeARM.html)

* 
`VK_ARM_DATA_GRAPH_NEURAL_ACCELERATOR_STATISTICS_EXTENSION_NAME`

* 
`VK_ARM_DATA_GRAPH_NEURAL_ACCELERATOR_STATISTICS_SPEC_VERSION`

* 
Extending [VkDataGraphPipelinePropertyARM](VkDataGraphPipelinePropertyARM.html):

[VK_DATA_GRAPH_PIPELINE_PROPERTY_NEURAL_ACCELERATOR_DEBUG_DATABASE_ARM](VkDataGraphPipelinePropertyARM.html)

* 
[VK_DATA_GRAPH_PIPELINE_PROPERTY_NEURAL_ACCELERATOR_STATISTICS_INFO_ARM](VkDataGraphPipelinePropertyARM.html)

Extending [VkDataGraphPipelineSessionBindPointARM](VkDataGraphPipelineSessionBindPointARM.html):

* 
[VK_DATA_GRAPH_PIPELINE_SESSION_BIND_POINT_NEURAL_ACCELERATOR_STATISTICS_ARM](VkDataGraphPipelineSessionBindPointARM.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_NEURAL_STATISTICS_CREATE_INFO_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_SESSION_NEURAL_STATISTICS_CREATE_INFO_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DATA_GRAPH_NEURAL_ACCELERATOR_STATISTICS_FEATURES_ARM](VkStructureType.html)

None.

None.

* 
Revision 1, 2026-04-28 (Kévin Petit)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_ARM_data_graph_neural_accelerator_statistics).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
