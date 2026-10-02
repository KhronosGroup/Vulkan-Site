# VK_KHR_maintenance11(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_maintenance11.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_maintenance11](#VK_KHR_maintenance11)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_maintenance11 - device extension

**Name String**

`VK_KHR_maintenance11`

**Extension Type**

Device extension

**Registered Extension Number**

658

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**API Interactions**

* 
Interacts with VK_EXT_mesh_shader

* 
Interacts with VK_EXT_shader_object

* 
Interacts with VK_KHR_extended_flags

* 
Interacts with VK_NV_mesh_shader

**Contact**

* 
Mike Blumenkrantz [zmike](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_maintenance11] @zmike%0A*Here describe the issue or question you have about the VK_KHR_maintenance11 extension*)

**Extension Proposal**

[VK_KHR_maintenance11](../../../../features/latest/features/proposals/VK_KHR_maintenance11.html)

**Last Modified Date**

2025-09-09

**Interactions and External Dependencies**
**Contributors**

* 
Mike Blumenkrantz, Valve

* 
Piers Daniell, NVIDIA

* 
Hans-Kristian Arntzen, Valve

* 
Caterina Shablia, Collabora

[VK_KHR_maintenance11](#) adds a collection of minor features, none of
which would warrant an entire extension of their own.

The new features are as follows:

* 
Add D3D compatibility for mismatch between `Arrayed` in shaders and
the arrayness of the underlying descriptor when the descriptor contains
a single array layer

* 
Clarify the pipeline depth clipping state when the pipeline is created
without [VK_DYNAMIC_STATE_DEPTH_CLIP_ENABLE_EXT](VkDynamicState.html) being set and the
[VkPipelineRasterizationDepthClipStateCreateInfoEXT](VkPipelineRasterizationDepthClipStateCreateInfoEXT.html) struct is not
present

* 
Add [VK_SHADER_CREATE_INDEPENDENT_SETS_BIT_KHR](VkShaderCreateFlagBitsEXT.html) to enable shader
object functionality to mimic
[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](VkPipelineLayoutCreateFlagBits.html) used for
graphics pipeline libraries, including a new pipeline layout creation
flag [VK_PIPELINE_LAYOUT_CREATE_NO_TASK_SHADER_BIT_KHR](VkPipelineLayoutCreateFlagBits.html) to ensure
pipeline layouts used with shader objects also created with
[VK_SHADER_CREATE_NO_TASK_SHADER_BIT_EXT](VkShaderCreateFlagBitsEXT.html) to be compatible

* 
Allow `queueFamilyIndexCount` of 1 in [VkBufferCreateInfo](VkBufferCreateInfo.html),
[VkPhysicalDeviceImageDrmFormatModifierInfoEXT](VkPhysicalDeviceImageDrmFormatModifierInfoEXT.html),
[VkTensorCreateInfoARM](VkTensorCreateInfoARM.html),
    and [VkImageCreateInfo](VkImageCreateInfo.html), when `sharingMode` is
    [VK_SHARING_MODE_CONCURRENT](VkSharingMode.html).

* 
Require `minImageTransferGranularity` to be (1,1,1) even on
transfer-only queues and add `optimalImageTransferGranularity` queue
family property to communicate the performance bump for copies not
aligned to the optimal granularity.

* 
When copying between a buffer and an image on a transfer-only queue, do
not require `bufferOffset` to be a multiple of 4.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceMaintenance11FeaturesKHR](VkPhysicalDeviceMaintenance11FeaturesKHR.html)

Extending [VkQueueFamilyProperties2](VkQueueFamilyProperties2.html):

* 
[VkQueueFamilyOptimalImageTransferGranularityPropertiesKHR](VkQueueFamilyOptimalImageTransferGranularityPropertiesKHR.html)

* 
`VK_KHR_MAINTENANCE_11_EXTENSION_NAME`

* 
`VK_KHR_MAINTENANCE_11_SPEC_VERSION`

* 
Extending [VkImageCreateFlagBits](VkImageCreateFlagBits.html):

[VK_IMAGE_CREATE_ALIAS_SINGLE_LAYER_DESCRIPTOR_BIT_KHR](VkImageCreateFlagBits.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_MAINTENANCE_11_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_QUEUE_FAMILY_OPTIMAL_IMAGE_TRANSFER_GRANULARITY_PROPERTIES_KHR](VkStructureType.html)

If [VK_EXT_shader_object](VK_EXT_shader_object.html) is supported:

* 
Extending [VkPipelineLayoutCreateFlagBits](VkPipelineLayoutCreateFlagBits.html):

[VK_PIPELINE_LAYOUT_CREATE_INDEPENDENT_SETS_BIT_EXT](VkPipelineLayoutCreateFlagBits.html)

Extending [VkShaderCreateFlagBitsEXT](VkShaderCreateFlagBitsEXT.html):

* 
[VK_SHADER_CREATE_INDEPENDENT_SETS_BIT_KHR](VkShaderCreateFlagBitsEXT.html)

If [VK_EXT_shader_object](VK_EXT_shader_object.html) and [VK_EXT_mesh_shader](VK_EXT_mesh_shader.html) or [VK_NV_mesh_shader](VK_NV_mesh_shader.html) is supported:

* 
Extending [VkPipelineLayoutCreateFlagBits](VkPipelineLayoutCreateFlagBits.html):

[VK_PIPELINE_LAYOUT_CREATE_NO_TASK_SHADER_BIT_KHR](VkPipelineLayoutCreateFlagBits.html)

If [VK_KHR_extended_flags](VK_KHR_extended_flags.html) is supported:

* 
Extending [VkImageCreateFlagBits2KHR](VkImageCreateFlagBits2KHR.html):

[VK_IMAGE_CREATE_2_ALIAS_SINGLE_LAYER_DESCRIPTOR_BIT_KHR](VkImageCreateFlagBits2KHR.html)

None.

* 
Revision 1, 2025-09-09 (Mike Blumenkrantz)

Initial revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_maintenance11).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
