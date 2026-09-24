# VK_ARM_data_graph_optical_flow(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_ARM_data_graph_optical_flow.html

## Table of Contents

- [Name](#_name)
- [VK_ARM_data_graph_optical_flow](#VK_ARM_data_graph_optical_flow)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_ARM_data_graph_optical_flow - device extension

**Name String**

`VK_ARM_data_graph_optical_flow`

**Extension Type**

Device extension

**Registered Extension Number**

632

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_ARM_data_graph](VK_ARM_data_graph.html)

**Contact**

* 
Kevin Petit [kpet](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_ARM_data_graph_optical_flow] @kpet%0A*Here describe the issue or question you have about the VK_ARM_data_graph_optical_flow extension*)

**Last Modified Date**

2026-04-08

**Contributors**

* 
Contributors to VK_NV_optical_flow

* 
Kevin Petit, Arm Ltd.

* 
Jan-Harald Fredriksen, Arm Ltd.

* 
Steve Suzuki, Arm Ltd.

* 
Liam O’Neil, Arm Ltd.

This extension allows applications to estimate the 2D displacement of pixels
between two images.

* 
[vkGetPhysicalDeviceQueueFamilyDataGraphEngineOperationPropertiesARM](vkGetPhysicalDeviceQueueFamilyDataGraphEngineOperationPropertiesARM.html)

* 
[vkGetPhysicalDeviceQueueFamilyDataGraphOpticalFlowImageFormatsARM](vkGetPhysicalDeviceQueueFamilyDataGraphOpticalFlowImageFormatsARM.html)

* 
[VkDataGraphOpticalFlowImageFormatPropertiesARM](VkDataGraphOpticalFlowImageFormatPropertiesARM.html)

* 
[VkDataGraphPipelineSingleNodeConnectionARM](VkDataGraphPipelineSingleNodeConnectionARM.html)

* 
[VkQueueFamilyDataGraphOpticalFlowPropertiesARM](VkQueueFamilyDataGraphOpticalFlowPropertiesARM.html)

* 
Extending [VkDataGraphPipelineCreateInfoARM](VkDataGraphPipelineCreateInfoARM.html):

[VkDataGraphPipelineOpticalFlowCreateInfoARM](VkDataGraphPipelineOpticalFlowCreateInfoARM.html)

* 
[VkDataGraphPipelineSingleNodeCreateInfoARM](VkDataGraphPipelineSingleNodeCreateInfoARM.html)

Extending [VkDataGraphPipelineDispatchInfoARM](VkDataGraphPipelineDispatchInfoARM.html):

* 
[VkDataGraphPipelineOpticalFlowDispatchInfoARM](VkDataGraphPipelineOpticalFlowDispatchInfoARM.html)

Extending [VkDataGraphPipelineResourceInfoARM](VkDataGraphPipelineResourceInfoARM.html):

* 
[VkDataGraphPipelineResourceInfoImageLayoutARM](VkDataGraphPipelineResourceInfoImageLayoutARM.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceDataGraphOpticalFlowFeaturesARM](VkPhysicalDeviceDataGraphOpticalFlowFeaturesARM.html)

Extending [VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html), [VkImageCreateInfo](VkImageCreateInfo.html):

* 
[VkDataGraphOpticalFlowImageFormatInfoARM](VkDataGraphOpticalFlowImageFormatInfoARM.html)

* 
[VkDataGraphOpticalFlowCreateFlagBitsARM](VkDataGraphOpticalFlowCreateFlagBitsARM.html)

* 
[VkDataGraphOpticalFlowExecuteFlagBitsARM](VkDataGraphOpticalFlowExecuteFlagBitsARM.html)

* 
[VkDataGraphOpticalFlowGridSizeFlagBitsARM](VkDataGraphOpticalFlowGridSizeFlagBitsARM.html)

* 
[VkDataGraphOpticalFlowImageUsageFlagBitsARM](VkDataGraphOpticalFlowImageUsageFlagBitsARM.html)

* 
[VkDataGraphOpticalFlowPerformanceLevelARM](VkDataGraphOpticalFlowPerformanceLevelARM.html)

* 
[VkDataGraphPipelineNodeConnectionTypeARM](VkDataGraphPipelineNodeConnectionTypeARM.html)

* 
[VkDataGraphPipelineNodeTypeARM](VkDataGraphPipelineNodeTypeARM.html)

* 
[VkDataGraphOpticalFlowCreateFlagsARM](VkDataGraphOpticalFlowCreateFlagsARM.html)

* 
[VkDataGraphOpticalFlowExecuteFlagsARM](VkDataGraphOpticalFlowExecuteFlagsARM.html)

* 
[VkDataGraphOpticalFlowGridSizeFlagsARM](VkDataGraphOpticalFlowGridSizeFlagsARM.html)

* 
[VkDataGraphOpticalFlowImageUsageFlagsARM](VkDataGraphOpticalFlowImageUsageFlagsARM.html)

* 
`VK_ARM_DATA_GRAPH_OPTICAL_FLOW_EXTENSION_NAME`

* 
`VK_ARM_DATA_GRAPH_OPTICAL_FLOW_SPEC_VERSION`

* 
Extending [VkDataGraphPipelineNodeConnectionTypeARM](VkDataGraphPipelineNodeConnectionTypeARM.html):

[VK_DATA_GRAPH_PIPELINE_NODE_CONNECTION_TYPE_OPTICAL_FLOW_COST_ARM](VkDataGraphPipelineNodeConnectionTypeARM.html)

* 
[VK_DATA_GRAPH_PIPELINE_NODE_CONNECTION_TYPE_OPTICAL_FLOW_FLOW_VECTOR_ARM](VkDataGraphPipelineNodeConnectionTypeARM.html)

* 
[VK_DATA_GRAPH_PIPELINE_NODE_CONNECTION_TYPE_OPTICAL_FLOW_HINT_ARM](VkDataGraphPipelineNodeConnectionTypeARM.html)

* 
[VK_DATA_GRAPH_PIPELINE_NODE_CONNECTION_TYPE_OPTICAL_FLOW_INPUT_ARM](VkDataGraphPipelineNodeConnectionTypeARM.html)

* 
[VK_DATA_GRAPH_PIPELINE_NODE_CONNECTION_TYPE_OPTICAL_FLOW_REFERENCE_ARM](VkDataGraphPipelineNodeConnectionTypeARM.html)

Extending [VkDataGraphPipelineNodeTypeARM](VkDataGraphPipelineNodeTypeARM.html):

* 
[VK_DATA_GRAPH_PIPELINE_NODE_TYPE_OPTICAL_FLOW_ARM](VkDataGraphPipelineNodeTypeARM.html)

Extending [VkDataGraphPipelineSessionBindPointARM](VkDataGraphPipelineSessionBindPointARM.html):

* 
[VK_DATA_GRAPH_PIPELINE_SESSION_BIND_POINT_OPTICAL_FLOW_CACHE_ARM](VkDataGraphPipelineSessionBindPointARM.html)

Extending [VkDataGraphPipelineSessionCreateFlagBitsARM](VkDataGraphPipelineSessionCreateFlagBitsARM.html):

* 
[VK_DATA_GRAPH_PIPELINE_SESSION_CREATE_OPTICAL_FLOW_CACHE_BIT_ARM](VkDataGraphPipelineSessionCreateFlagBitsARM.html)

Extending [VkFormatFeatureFlagBits2](VkFormatFeatureFlagBits2.html):

* 
[VK_FORMAT_FEATURE_2_DATA_GRAPH_OPTICAL_FLOW_COST_BIT_ARM](VkFormatFeatureFlagBits2.html)

* 
[VK_FORMAT_FEATURE_2_DATA_GRAPH_OPTICAL_FLOW_IMAGE_BIT_ARM](VkFormatFeatureFlagBits2.html)

* 
[VK_FORMAT_FEATURE_2_DATA_GRAPH_OPTICAL_FLOW_VECTOR_BIT_ARM](VkFormatFeatureFlagBits2.html)

Extending [VkPhysicalDeviceDataGraphOperationTypeARM](VkPhysicalDeviceDataGraphOperationTypeARM.html):

* 
[VK_PHYSICAL_DEVICE_DATA_GRAPH_OPERATION_TYPE_OPTICAL_FLOW_ARM](VkPhysicalDeviceDataGraphOperationTypeARM.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_DATA_GRAPH_OPTICAL_FLOW_IMAGE_FORMAT_INFO_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DATA_GRAPH_OPTICAL_FLOW_IMAGE_FORMAT_PROPERTIES_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_OPTICAL_FLOW_CREATE_INFO_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_OPTICAL_FLOW_DISPATCH_INFO_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_RESOURCE_INFO_IMAGE_LAYOUT_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_SINGLE_NODE_CONNECTION_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DATA_GRAPH_PIPELINE_SINGLE_NODE_CREATE_INFO_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DATA_GRAPH_OPTICAL_FLOW_FEATURES_ARM](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_QUEUE_FAMILY_DATA_GRAPH_OPTICAL_FLOW_PROPERTIES_ARM](VkStructureType.html)

* 
Revision 1, 2026-04-08 (Kevin Petit)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_ARM_data_graph_optical_flow).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
