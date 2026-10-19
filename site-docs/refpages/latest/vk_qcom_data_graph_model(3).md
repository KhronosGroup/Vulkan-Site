# VK_QCOM_data_graph_model(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_QCOM_data_graph_model.html

## Table of Contents

- [Name](#_name)
- [VK_QCOM_data_graph_model](#VK_QCOM_data_graph_model)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_QCOM_data_graph_model - device extension

**Name String**

`VK_QCOM_data_graph_model`

**Extension Type**

Device extension

**Registered Extension Number**

630

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_ARM_data_graph](VK_ARM_data_graph.html)

**Contact**

* 
Matthew Netsch [mnetsch](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_QCOM_data_graph_model] @mnetsch%0A*Here describe the issue or question you have about the VK_QCOM_data_graph_model extension*)

**Extension Proposal**

[VK_QCOM_data_graph_model](../../../../features/latest/features/proposals/VK_QCOM_data_graph_model.html)

**Last Modified Date**

2025-06-24

**Interactions and External Dependencies**

* 
This extension interacts with `[VK_ARM_tensors](VK_ARM_tensors.html)`

**Contributors**

* 
Matthew Netsch, Qualcomm Technologies, Inc

* 
Rob VanReenen, Qualcomm Technologies, Inc

* 
Balaji Calidas, Qualcomm Technologies, Inc

* 
Jacob Yenney, Qualcomm Technologies, Inc

* 
Kévin Petit, Arm Ltd.

This extension supports new
[VkPhysicalDeviceDataGraphProcessingEngineTypeARM](VkPhysicalDeviceDataGraphProcessingEngineTypeARM.html), and
[VkPhysicalDeviceDataGraphOperationTypeARM](VkPhysicalDeviceDataGraphOperationTypeARM.html) types for data graph
pipelines added in `[VK_ARM_data_graph](VK_ARM_data_graph.html)`.

A new pipeline cache type is also added to seamlessly import ML models such
as ONNX through QNN workflow, and run them on the device or an external
compute engine.

* 
[VkPipelineCacheHeaderVersionDataGraphQCOM](VkPipelineCacheHeaderVersionDataGraphQCOM.html)

* 
Extending [VkDataGraphPipelineCreateInfoARM](VkDataGraphPipelineCreateInfoARM.html):

[VkDataGraphPipelineBuiltinModelCreateInfoQCOM](VkDataGraphPipelineBuiltinModelCreateInfoQCOM.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceDataGraphModelFeaturesQCOM](VkPhysicalDeviceDataGraphModelFeaturesQCOM.html)

* 
[VkDataGraphModelCacheTypeQCOM](VkDataGraphModelCacheTypeQCOM.html)

* 
[VK_DATA_GRAPH_MODEL_TOOLCHAIN_VERSION_LENGTH_QCOM](VK_DATA_GRAPH_MODEL_TOOLCHAIN_VERSION_LENGTH_QCOM.html)

* 
`VK_QCOM_DATA_GRAPH_MODEL_EXTENSION_NAME`

* 
`VK_QCOM_DATA_GRAPH_MODEL_SPEC_VERSION`

* 
Extending [VkPhysicalDeviceDataGraphOperationTypeARM](VkPhysicalDeviceDataGraphOperationTypeARM.html):

[VK_PHYSICAL_DEVICE_DATA_GRAPH_OPERATION_TYPE_BUILTIN_MODEL_QCOM](VkPhysicalDeviceDataGraphOperationTypeARM.html)

* 
[VK_PHYSICAL_DEVICE_DATA_GRAPH_OPERATION_TYPE_NEURAL_MODEL_QCOM](VkPhysicalDeviceDataGraphOperationTypeARM.html)

Extending [VkPhysicalDeviceDataGraphProcessingEngineTypeARM](VkPhysicalDeviceDataGraphProcessingEngineTypeARM.html):

* 
[VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_COMPUTE_QCOM](VkPhysicalDeviceDataGraphProcessingEngineTypeARM.html)

* 
[VK_PHYSICAL_DEVICE_DATA_GRAPH_PROCESSING_ENGINE_TYPE_NEURAL_QCOM](VkPhysicalDeviceDataGraphProcessingEngineTypeARM.html)

Extending [VkPipelineCacheHeaderVersion](VkPipelineCacheHeaderVersion.html):

* 
[VK_PIPELINE_CACHE_HEADER_VERSION_DATA_GRAPH_QCOM](VkPipelineCacheHeaderVersion.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_BUILTIN_MODEL_CREATE_INFO_QCOM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DATA_GRAPH_MODEL_FEATURES_QCOM](VkStructureType.html)

* 
Revision 1, 2025-06-24 (Matthew Netsch)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_QCOM_data_graph_model).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
