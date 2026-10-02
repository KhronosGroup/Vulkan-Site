# VK_EXT_pipeline_robustness(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_pipeline_robustness.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_pipeline_robustness](#VK_EXT_pipeline_robustness)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Promotion to Vulkan 1.4](#_promotion_to_vulkan_1_4)
- [Promotion_to_Vulkan_1.4](#_promotion_to_vulkan_1_4)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_pipeline_robustness - device extension

**Name String**

`VK_EXT_pipeline_robustness`

**Extension Type**

Device extension

**Registered Extension Number**

69

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4-promotions)

**Contact**

* 
Jarred Davies

**Last Modified Date**

2022-07-12

**Interactions and External Dependencies**

* 
Interacts with `[VK_EXT_robustness2](VK_EXT_robustness2.html)`

* 
Interacts with `[VK_EXT_image_robustness](VK_EXT_image_robustness.html)`

* 
Interacts with `[VK_KHR_ray_tracing_pipeline](VK_KHR_ray_tracing_pipeline.html)`

**Contributors**

* 
Jarred Davies, Imagination Technologies

* 
Alex Walters, Imagination Technologies

* 
Piers Daniell, NVIDIA

* 
Graeme Leese, Broadcom Corporation

* 
Jeff Leger, Qualcomm Technologies, Inc.

* 
Faith Ekstrand, Intel

* 
Lionel Landwerlin, Intel

* 
Shahbaz Youssefi, Google, Inc.

This extension allows users to request robustness on a per-pipeline stage
basis.

As [`robustBufferAccess`](../../../../spec/latest/chapters/features.html#features-robustBufferAccess) and other
robustness features may have an adverse effect on performance, this
extension is designed to allow users to request robust behavior only where
it may be needed.

* 
Extending [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html), [VkComputePipelineCreateInfo](VkComputePipelineCreateInfo.html), [VkPipelineShaderStageCreateInfo](VkPipelineShaderStageCreateInfo.html), [VkRayTracingPipelineCreateInfoKHR](VkRayTracingPipelineCreateInfoKHR.html):

[VkPipelineRobustnessCreateInfoEXT](VkPipelineRobustnessCreateInfo.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDevicePipelineRobustnessFeaturesEXT](VkPhysicalDevicePipelineRobustnessFeatures.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDevicePipelineRobustnessPropertiesEXT](VkPhysicalDevicePipelineRobustnessProperties.html)

* 
[VkPipelineRobustnessBufferBehaviorEXT](VkPipelineRobustnessBufferBehavior.html)

* 
[VkPipelineRobustnessImageBehaviorEXT](VkPipelineRobustnessImageBehavior.html)

* 
`VK_EXT_PIPELINE_ROBUSTNESS_EXTENSION_NAME`

* 
`VK_EXT_PIPELINE_ROBUSTNESS_SPEC_VERSION`

* 
Extending [VkPipelineRobustnessBufferBehavior](VkPipelineRobustnessBufferBehavior.html):

[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_DEVICE_DEFAULT_EXT](VkPipelineRobustnessBufferBehavior.html)

* 
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_DISABLED_EXT](VkPipelineRobustnessBufferBehavior.html)

* 
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_2_EXT](VkPipelineRobustnessBufferBehavior.html)

* 
[VK_PIPELINE_ROBUSTNESS_BUFFER_BEHAVIOR_ROBUST_BUFFER_ACCESS_EXT](VkPipelineRobustnessBufferBehavior.html)

Extending [VkPipelineRobustnessImageBehavior](VkPipelineRobustnessImageBehavior.html):

* 
[VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_DEVICE_DEFAULT_EXT](VkPipelineRobustnessImageBehavior.html)

* 
[VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_DISABLED_EXT](VkPipelineRobustnessImageBehavior.html)

* 
[VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_ROBUST_IMAGE_ACCESS_2_EXT](VkPipelineRobustnessImageBehavior.html)

* 
[VK_PIPELINE_ROBUSTNESS_IMAGE_BEHAVIOR_ROBUST_IMAGE_ACCESS_EXT](VkPipelineRobustnessImageBehavior.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_ROBUSTNESS_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_PIPELINE_ROBUSTNESS_PROPERTIES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_ROBUSTNESS_CREATE_INFO_EXT](VkStructureType.html)

Functionality in this extension is included in core Vulkan 1.4 with the EXT
suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
Revision 1, 2022-07-12 (Jarred Davies)

Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_pipeline_robustness).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
