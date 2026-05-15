# VK_ARM_data_graph(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_ARM_data_graph.html

## Table of Contents

- [Name](#_name)
- [VK_ARM_data_graph](#VK_ARM_data_graph)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Object Types](#_new_object_types)
- [New_Object_Types](#_new_object_types)
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

VK_ARM_data_graph - device extension

**Name String**

`VK_ARM_data_graph`

**Extension Type**

Device extension

**Registered Extension Number**

508

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[Vulkan Version 1.3](../../../../spec/latest/appendices/versions.html#versions-1.3)

and

[VK_KHR_maintenance5](VK_KHR_maintenance5.html)

and

[VK_KHR_deferred_host_operations](VK_KHR_deferred_host_operations.html)

**API Interactions**

* 
Interacts with VK_ARM_tensors

**SPIR-V Dependencies**

* 
[SPV_ARM_graph](https://github.khronos.org/SPIRV-Registry/extensions/ARM/SPV_ARM_graph.html)

**Contact**

* 
Kevin Petit [kpet](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_ARM_data_graph] @kpet%0A*Here describe the issue or question you have about the VK_ARM_data_graph extension*)

**Last Modified Date**

2025-06-18

**Interactions and External Dependencies**

* 
This extension requires [`SPV_ARM_graph`](https://github.khronos.org/SPIRV-Registry/extensions/EXT/SPV_ARM_graph.html)

* 
This extension interacts with `[VK_EXT_mutable_descriptor_type](VK_EXT_mutable_descriptor_type.html)`

* 
This extension interacts with `[VK_EXT_pipeline_protected_access](VK_EXT_pipeline_protected_access.html)`

* 
This extension interacts with `[VK_ARM_tensors](VK_ARM_tensors.html)`

* 
This extension interacts with `[VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html)`

* 
This extension interacts with `[VK_KHR_maintenance6](VK_KHR_maintenance6.html)`

**IP Status**

No known IP claims.

**Contributors**

* 
Kévin Petit, Arm Ltd.

* 
Emma Ben Yossef, Arm Ltd.

* 
Stefano Bucciarelli, Arm Ltd.

* 
Marco Cattani, Arm Ltd.

* 
Aaron DeBattista, Arm Ltd.

* 
Jan-Harald Fredriksen, Arm Ltd.

* 
Einar Hov, Arm Ltd.

* 
Robert Hughes, Arm Ltd.

* 
Oualid Khelifi, Arm Ltd.

* 
Derek Lamberti, Arm Ltd.

* 
Chetan Mistry, Arm Ltd.

* 
Georgios Teneketzis, Arm Ltd.

* 
Matthew Netsch, Qualcomm Technologies, Inc

This extension adds support for a new type of pipeline, data graph
pipelines, that provide an encapsulation construct for computational graphs
operating on full resources (e.g. ML/AI graphs, image processing pipelines,
etc).
This extension only supports tensor resources and does not define any
operations that can be used within those graphs.
These operations will be defined by separate extensions.

* 
[VkDataGraphPipelineSessionARM](VkDataGraphPipelineSessionARM.html)

* 
[vkBindDataGraphPipelineSessionMemoryARM](vkBindDataGraphPipelineSessionMemoryARM.html)

* 
[vkCmdDispatchDataGraphARM](vkCmdDispatchDataGraphARM.html)

* 
[vkCreateDataGraphPipelineSessionARM](vkCreateDataGraphPipelineSessionARM.html)

* 
[vkCreateDataGraphPipelinesARM](vkCreateDataGraphPipelinesARM.html)

* 
[vkDestroyDataGraphPipelineSessionARM](vkDestroyDataGraphPipelineSessionARM.html)

* 
[vkGetDataGraphPipelineAvailablePropertiesARM](vkGetDataGraphPipelineAvailablePropertiesARM.html)

* 
[vkGetDataGraphPipelinePropertiesARM](vkGetDataGraphPipelinePropertiesARM.html)

* 
[vkGetDataGraphPipelineSessionBindPointRequirementsARM](vkGetDataGraphPipelineSessionBindPointRequirementsARM.html)

* 
[vkGetDataGraphPipelineSessionMemoryRequirementsARM](vkGetDataGraphPipelineSessionMemoryRequirementsARM.html)

* 
[vkGetPhysicalDeviceQueueFamilyDataGraphProcessingEnginePropertiesARM](vkGetPhysicalDeviceQueueFamilyDataGraphProcessingEnginePropertiesARM.html)

* 
[vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM](vkGetPhysicalDeviceQueueFamilyDataGraphPropertiesARM.html)

* 
[VkBindDataGraphPipelineSessionMemoryInfoARM](VkBindDataGraphPipelineSessionMemoryInfoARM.html)

* 
[VkDataGraphPipelineConstantARM](VkDataGraphPipelineConstantARM.html)

* 
[VkDataGraphPipelineCreateInfoARM](VkDataGraphPipelineCreateInfoARM.html)

* 
[VkDataGraphPipelineDispatchInfoARM](VkDataGraphPipelineDispatchInfoARM.html)

* 
[VkDataGraphPipelineInfoARM](VkDataGraphPipelineInfoARM.html)

* 
[VkDataGraphPipelinePropertyQueryResultARM](VkDataGraphPipelinePropertyQueryResultARM.html)

* 
[VkDataGraphPipelineResourceInfoARM](VkDataGraphPipelineResourceInfoARM.html)

* 
[VkDataGraphPipelineSessionBindPointRequirementARM](VkDataGraphPipelineSessionBindPointRequirementARM.html)

* 
[VkDataGraphPipelineSessionBindPointRequirementsInfoARM](VkDataGraphPipelineSessionBindPointRequirementsInfoARM.html)

* 
[VkDataGraphPipelineSessionCreateInfoARM](VkDataGraphPipelineSessionCreateInfoARM.html)

* 
[VkDataGraphPipelineSessionMemoryRequirementsInfoARM](VkDataGraphPipelineSessionMemoryRequirementsInfoARM.html)

* 
[VkPhysicalDeviceDataGraphOperationSupportARM](VkPhysicalDeviceDataGraphOperationSupportARM.html)

* 
[VkPhysicalDeviceDataGraphProcessingEngineARM](VkPhysicalDeviceDataGraphProcessingEngineARM.html)

* 
[VkPhysicalDeviceQueueFamilyDataGraphProcessingEngineInfoARM](VkPhysicalDeviceQueueFamilyDataGraphProcessingEngineInfoARM.html)

* 
[VkQueueFamilyDataGraphProcessingEnginePropertiesARM](VkQueueFamilyDataGraphProcessingEnginePropertiesARM.html)

* 
[VkQueueFamilyDataGraphPropertiesARM](VkQueueFamilyDataGraphPropertiesARM.html)

* 
Extending [VkDataGraphPipelineCreateInfoARM](VkDataGraphPipelineCreateInfoARM.html):

[VkDataGraphPipelineCompilerControlCreateInfoARM](VkDataGraphPipelineCompilerControlCreateInfoARM.html)

* 
[VkDataGraphPipelineIdentifierCreateInfoARM](VkDataGraphPipelineIdentifierCreateInfoARM.html)

* 
[VkDataGraphPipelineShaderModuleCreateInfoARM](VkDataGraphPipelineShaderModuleCreateInfoARM.html)

Extending [VkDataGraphPipelineCreateInfoARM](VkDataGraphPipelineCreateInfoARM.html), [VkDescriptorPoolCreateInfo](VkDescriptorPoolCreateInfo.html), [VkCommandPoolCreateInfo](VkCommandPoolCreateInfo.html):

* 
[VkDataGraphProcessingEngineCreateInfoARM](VkDataGraphProcessingEngineCreateInfoARM.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceDataGraphFeaturesARM](VkPhysicalDeviceDataGraphFeaturesARM.html)

If [VK_ARM_tensors](VK_ARM_tensors.html) is supported:

* 
Extending [VkDataGraphPipelineConstantARM](VkDataGraphPipelineConstantARM.html):

[VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM](VkDataGraphPipelineConstantTensorSemiStructuredSparsityInfoARM.html)

* 
[VkDataGraphPipelineDispatchFlagBitsARM](VkDataGraphPipelineDispatchFlagBitsARM.html)

* 
[VkDataGraphPipelinePropertyARM](VkDataGraphPipelinePropertyARM.html)

* 
[VkDataGraphPipelineSessionBindPointARM](VkDataGraphPipelineSessionBindPointARM.html)

* 
[VkDataGraphPipelineSessionBindPointTypeARM](VkDataGraphPipelineSessionBindPointTypeARM.html)

* 
[VkDataGraphPipelineSessionCreateFlagBitsARM](VkDataGraphPipelineSessionCreateFlagBitsARM.html)

* 
[VkPhysicalDeviceDataGraphOperationTypeARM](VkPhysicalDeviceDataGraphOperationTypeARM.html)

* 
[VkPhysicalDeviceDataGraphProcessingEngineTypeARM](VkPhysicalDeviceDataGraphProcessingEngineTypeARM.html)

* 
[VkDataGraphPipelineDispatchFlagsARM](VkDataGraphPipelineDispatchFlagsARM.html)

* 
[VkDataGraphPipelineSessionCreateFlagsARM](VkDataGraphPipelineSessionCreateFlagsARM.html)

* 
`VK_ARM_DATA_GRAPH_EXTENSION_NAME`

* 
`VK_ARM_DATA_GRAPH_SPEC_VERSION`

* 
[VK_MAX_PHYSICAL_DEVICE_DATA_GRAPH_OPERATION_SET_NAME_SIZE_ARM](VK_MAX_PHYSICAL_DEVICE_DATA_GRAPH_OPERATION_SET_NAME_SIZE_ARM.html)

* 
Extending [VkAccessFlagBits2](VkAccessFlagBits2.html):

[VK_ACCESS_2_DATA_GRAPH_READ_BIT_ARM](VkAccessFlagBits2.html)

* 
[VK_ACCESS_2_DATA_GRAPH_WRITE_BIT_ARM](VkAccessFlagBits2.html)

Extending [VkBufferUsageFlagBits2](VkBufferUsageFlagBits2.html):

* 
[VK_BUFFER_USAGE_2_DATA_GRAPH_FOREIGN_DESCRIPTOR_BIT_ARM](VkBufferUsageFlagBits2.html)

Extending [VkFormatFeatureFlagBits2](VkFormatFeatureFlagBits2.html):

* 
[VK_FORMAT_FEATURE_2_TENSOR_DATA_GRAPH_BIT_ARM](VkFormatFeatureFlagBits2.html)

Extending [VkObjectType](VkObjectType.html):

* 
[VK_OBJECT_TYPE_DATA_GRAPH_PIPELINE_SESSION_ARM](VkObjectType.html)

Extending [VkPipelineBindPoint](VkPipelineBindPoint.html):

* 
[VK_PIPELINE_BIND_POINT_DATA_GRAPH_ARM](VkPipelineBindPoint.html)

Extending [VkPipelineStageFlagBits2](VkPipelineStageFlagBits2.html):

* 
[VK_PIPELINE_STAGE_2_DATA_GRAPH_BIT_ARM](VkPipelineStageFlagBits2.html)

Extending [VkQueueFlagBits](VkQueueFlagBits.html):

* 
[VK_QUEUE_DATA_GRAPH_BIT_ARM](VkQueueFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_BIND_DATA_GRAPH_PIPELINE_SESSION_MEMORY_INFO_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_COMPILER_CONTROL_CREATE_INFO_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_CONSTANT_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_CREATE_INFO_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_DISPATCH_INFO_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_IDENTIFIER_CREATE_INFO_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_INFO_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_PROPERTY_QUERY_RESULT_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_RESOURCE_INFO_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_SESSION_BIND_POINT_REQUIREMENTS_INFO_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_SESSION_BIND_POINT_REQUIREMENT_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_SESSION_CREATE_INFO_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_SESSION_MEMORY_REQUIREMENTS_INFO_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_SHADER_MODULE_CREATE_INFO_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DATA_GRAPH_PROCESSING_ENGINE_CREATE_INFO_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DATA_GRAPH_FEATURES_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_QUEUE_FAMILY_DATA_GRAPH_PROCESSING_ENGINE_INFO_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_QUEUE_FAMILY_DATA_GRAPH_PROCESSING_ENGINE_PROPERTIES_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_QUEUE_FAMILY_DATA_GRAPH_PROPERTIES_ARM](VkStructureType.html)

Extending [VkTensorUsageFlagBitsARM](VkTensorUsageFlagBitsARM.html):

* 
[VK_TENSOR_USAGE_DATA_GRAPH_BIT_ARM](VkTensorUsageFlagBitsARM.html)

If [VK_ARM_tensors](VK_ARM_tensors.html) is supported:

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_CONSTANT_TENSOR_SEMI_STRUCTURED_SPARSITY_INFO_ARM](VkStructureType.html)

* 
[GraphARM](../../../../spec/latest/appendices/spirvenv.html#spirvenv-capabilities-table-GraphARM)

1) Should graph pipeline resource info structures be integrated into
pipeline layouts? Would a new graph pipeline layout be a better fit?

**RESOLVED**: Graph pipeline resource info are passed separately at pipeline
creation time.

2) Do we need a new shader stage for graph pipelines for use in creating
descriptor set layouts?

**RESOLVED**: Currently using [VK_SHADER_STAGE_ALL](VkShaderStageFlagBits.html).

3) Should this extension provide applications with a way of knowing which
combinations of sparsity information implementations can take advantage of
when processing graph constants?

**RESOLVED**: No.
Describing the exact combinations is in some cases complex and it is always
valid for implementations to ignore the sparsity information and treat the
data as dense.
Specific implementations can provide guidance to application writers if they
so desire and applications are encouraged to always provide sparsity
information that they have.

* 
Revision 1, 2025-06-18 (Kévin Petit)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_ARM_data_graph).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
