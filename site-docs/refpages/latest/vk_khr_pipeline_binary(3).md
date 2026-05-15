# VK_KHR_pipeline_binary(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_pipeline_binary.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_pipeline_binary](#VK_KHR_pipeline_binary)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Object Types](#_new_object_types)
- [New_Object_Types](#_new_object_types)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_pipeline_binary - device extension

**Name String**

`VK_KHR_pipeline_binary`

**Extension Type**

Device extension

**Registered Extension Number**

484

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_maintenance5](VK_KHR_maintenance5.html)

or

[Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4)

**Contact**

* 
Stu Smith [stu-s](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_pipeline_binary] @stu-s%0A*Here describe the issue or question you have about the VK_KHR_pipeline_binary extension*)

**Extension Proposal**

[VK_KHR_pipeline_binary](../../../../features/latest/features/proposals/VK_KHR_pipeline_binary.html)

**Last Modified Date**

2024-07-01

**Contributors**

* 
Stu Smith, AMD

* 
Tobias Hector, AMD

* 
Alan Harrison, AMD

* 
Maciej Jesionowski, AMD

* 
Younggwan Kim, Arm

* 
Jan-Harald Fredriksen, Arm

* 
Ting Wei, Arm

* 
Chris Glover, Google

* 
Shahbaz Youssefi, Google

* 
Jakub Kuderski, Google

* 
Piotr Byszewski, Mobica

* 
Piers Daniell, NVIDIA

* 
Ralph Potter, Samsung

* 
Matthew Netsch, Qualcomm

* 
Hans-Kristian Arntzen, Valve

* 
Samuel Pitoiset, Valve

* 
Tatsuyuki Ishi, Valve

This extension provides a method to obtain binary data associated with
individual pipelines such that applications can manage caching themselves
instead of using VkPipelineCache objects.

* 
[VkPipelineBinaryKHR](VkPipelineBinaryKHR.html)

* 
[vkCreatePipelineBinariesKHR](vkCreatePipelineBinariesKHR.html)

* 
[vkDestroyPipelineBinaryKHR](vkDestroyPipelineBinaryKHR.html)

* 
[vkGetPipelineBinaryDataKHR](vkGetPipelineBinaryDataKHR.html)

* 
[vkGetPipelineKeyKHR](vkGetPipelineKeyKHR.html)

* 
[vkReleaseCapturedPipelineDataKHR](vkReleaseCapturedPipelineDataKHR.html)

* 
[VkPipelineBinaryCreateInfoKHR](VkPipelineBinaryCreateInfoKHR.html)

* 
[VkPipelineBinaryDataInfoKHR](VkPipelineBinaryDataInfoKHR.html)

* 
[VkPipelineBinaryDataKHR](VkPipelineBinaryDataKHR.html)

* 
[VkPipelineBinaryHandlesInfoKHR](VkPipelineBinaryHandlesInfoKHR.html)

* 
[VkPipelineBinaryKeyKHR](VkPipelineBinaryKeyKHR.html)

* 
[VkPipelineBinaryKeysAndDataKHR](VkPipelineBinaryKeysAndDataKHR.html)

* 
[VkPipelineCreateInfoKHR](VkPipelineCreateInfoKHR.html)

* 
[VkReleaseCapturedPipelineDataInfoKHR](VkReleaseCapturedPipelineDataInfoKHR.html)

* 
Extending [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkDevicePipelineBinaryInternalCacheControlKHR](VkDevicePipelineBinaryInternalCacheControlKHR.html)

Extending [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), [VkComputePipelineCreateInfo](VkComputePipelineCreateInfo.html), [VkRayTracingPipelineCreateInfoKHR](VkRayTracingPipelineCreateInfoKHR.html):

* 
[VkPipelineBinaryInfoKHR](VkPipelineBinaryInfoKHR.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDevicePipelineBinaryFeaturesKHR](VkPhysicalDevicePipelineBinaryFeaturesKHR.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDevicePipelineBinaryPropertiesKHR](VkPhysicalDevicePipelineBinaryPropertiesKHR.html)

* 
`VK_KHR_PIPELINE_BINARY_EXTENSION_NAME`

* 
`VK_KHR_PIPELINE_BINARY_SPEC_VERSION`

* 
[VK_MAX_PIPELINE_BINARY_KEY_SIZE_KHR](VK_MAX_PIPELINE_BINARY_KEY_SIZE_KHR.html)

* 
Extending [VkObjectType](VkObjectType.html):

[VK_OBJECT_TYPE_PIPELINE_BINARY_KHR](VkObjectType.html)

Extending [VkPipelineCreateFlagBits2](VkPipelineCreateFlagBits2.html):

* 
[VK_PIPELINE_CREATE_2_CAPTURE_DATA_BIT_KHR](VkPipelineCreateFlagBits2.html)

Extending [VkResult](VkResult.html):

* 
[VK_ERROR_NOT_ENOUGH_SPACE_KHR](VkResult.html)

* 
[VK_PIPELINE_BINARY_MISSING_KHR](VkResult.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_DEVICE_PIPELINE_BINARY_INTERNAL_CACHE_CONTROL_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_BINARY_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_BINARY_PROPERTIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_BINARY_CREATE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_BINARY_DATA_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_BINARY_HANDLES_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_BINARY_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_BINARY_KEY_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_CREATE_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RELEASE_CAPTURED_PIPELINE_DATA_INFO_KHR](VkStructureType.html)

* 
Revision 1, 2021-12-10 (Chris Glover)

Initial draft.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_pipeline_binary).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
