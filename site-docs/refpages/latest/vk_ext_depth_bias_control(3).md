# VK_EXT_depth_bias_control(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_depth_bias_control.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_depth_bias_control](#VK_EXT_depth_bias_control)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_depth_bias_control - device extension

**Name String**

`VK_EXT_depth_bias_control`

**Extension Type**

Device extension

**Registered Extension Number**

284

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Special Use**

* 
[D3D support](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

**Contact**

* 
Joshua Ashton [Joshua-Ashton](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_depth_bias_control] @Joshua-Ashton%0A*Here describe the issue or question you have about the VK_EXT_depth_bias_control extension*)

**Extension Proposal**

[VK_EXT_depth_bias_control](../../../../features/latest/features/proposals/VK_EXT_depth_bias_control.html)

**Last Modified Date**

2023-02-15

**IP Status**

No known IP claims.

**Contributors**

* 
Joshua Ashton, VALVE

* 
Hans-Kristian Arntzen, VALVE

* 
Mike Blumenkrantz, VALVE

* 
Georg Lehmann, VALVE

* 
Piers Daniell, NVIDIA

* 
Lionel Landwerlin, INTEL

* 
Tobias Hector, AMD

* 
Ricardo Garcia, IGALIA

* 
Jan-Harald Fredriksen, ARM

* 
Shahbaz Youssefi, GOOGLE

* 
Tom Olson, ARM

This extension adds a new structure, `VkDepthBiasRepresentationInfoEXT`,
that can be added to a `pNext` chain of
`VkPipelineRasterizationStateCreateInfo` and allows setting the scaling
and representation of depth bias for a pipeline.

This state can also be set dynamically by using the new structure mentioned
above in combination with the new `vkCmdSetDepthBias2EXT` command.

* 
[vkCmdSetDepthBias2EXT](vkCmdSetDepthBias2EXT.html)

* 
[VkDepthBiasInfoEXT](VkDepthBiasInfoEXT.html)

* 
Extending [VkDepthBiasInfoEXT](VkDepthBiasInfoEXT.html), [VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html):

[VkDepthBiasRepresentationInfoEXT](VkDepthBiasRepresentationInfoEXT.html)

Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

* 
[VkPhysicalDeviceDepthBiasControlFeaturesEXT](VkPhysicalDeviceDepthBiasControlFeaturesEXT.html)

* 
[VkDepthBiasRepresentationEXT](VkDepthBiasRepresentationEXT.html)

* 
`VK_EXT_DEPTH_BIAS_CONTROL_EXTENSION_NAME`

* 
`VK_EXT_DEPTH_BIAS_CONTROL_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_DEPTH_BIAS_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DEPTH_BIAS_REPRESENTATION_INFO_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEPTH_BIAS_CONTROL_FEATURES_EXT](VkStructureType.html)

* 
Revision 1, 2022-09-22 (Joshua Ashton)

Initial draft.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_depth_bias_control).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
