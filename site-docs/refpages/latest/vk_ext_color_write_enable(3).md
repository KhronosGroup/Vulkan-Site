# VK_EXT_color_write_enable(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_color_write_enable.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_color_write_enable](#VK_EXT_color_write_enable)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_color_write_enable - device extension

**Name String**

`VK_EXT_color_write_enable`

**Extension Type**

Device extension

**Registered Extension Number**

382

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Sharif Elcott [selcott](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_color_write_enable] @selcott%0A*Here describe the issue or question you have about the VK_EXT_color_write_enable extension*)

**Last Modified Date**

2020-02-25

**IP Status**

No known IP claims.

**Contributors**

* 
Sharif Elcott, Google

* 
Tobias Hector, AMD

* 
Piers Daniell, NVIDIA

This extension allows for selectively enabling and disabling writes to
output color attachments via a pipeline dynamic state.

The intended use cases for this new state are mostly identical to those of
colorWriteMask, such as selectively disabling writes to avoid feedback loops
between subpasses or bandwidth savings for unused outputs.
By making the state dynamic, one additional benefit is the ability to reduce
pipeline counts and pipeline switching via shaders that write a superset of
the desired data of which subsets are selected dynamically.
The reason for a new state, colorWriteEnable, rather than making
colorWriteMask dynamic is that, on many implementations, the more flexible
per-component semantics of the colorWriteMask state cannot be made dynamic
in a performant manner.

* 
[vkCmdSetColorWriteEnableEXT](vkCmdSetColorWriteEnableEXT.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceColorWriteEnableFeaturesEXT](VkPhysicalDeviceColorWriteEnableFeaturesEXT.html)

Extending [VkPipelineColorBlendStateCreateInfo](VkPipelineColorBlendStateCreateInfo.html):

* 
[VkPipelineColorWriteCreateInfoEXT](VkPipelineColorWriteCreateInfoEXT.html)

* 
`VK_EXT_COLOR_WRITE_ENABLE_EXTENSION_NAME`

* 
`VK_EXT_COLOR_WRITE_ENABLE_SPEC_VERSION`

* 
Extending [VkDynamicState](VkDynamicState.html):

[VK_DYNAMIC_STATE_COLOR_WRITE_ENABLE_EXT](VkDynamicState.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_COLOR_WRITE_ENABLE_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_COLOR_WRITE_CREATE_INFO_EXT](VkStructureType.html)

* 
Revision 1, 2020-01-25 (Sharif Elcott)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_color_write_enable).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
