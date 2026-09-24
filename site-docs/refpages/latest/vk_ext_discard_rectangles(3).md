# VK_EXT_discard_rectangles(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_discard_rectangles.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_discard_rectangles](#VK_EXT_discard_rectangles)
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

VK_EXT_discard_rectangles - device extension

**Name String**

`VK_EXT_discard_rectangles`

**Extension Type**

Device extension

**Registered Extension Number**

100

**Revision**

2

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Contact**

* 
Piers Daniell [pdaniell-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_discard_rectangles] @pdaniell-nv%0A*Here describe the issue or question you have about the VK_EXT_discard_rectangles extension*)

**Last Modified Date**

2023-01-18

**Interactions and External Dependencies**

* 
Interacts with `[VK_KHR_device_group](VK_KHR_device_group.html)`

* 
Interacts with Vulkan 1.1

**Contributors**

* 
Daniel Koch, NVIDIA

* 
Jeff Bolz, NVIDIA

This extension provides additional orthogonally aligned “discard
rectangles” specified in framebuffer-space coordinates that restrict
rasterization of all points, lines, and triangles.

From zero to an implementation-dependent limit (specified by
`maxDiscardRectangles`) number of discard rectangles can be operational
at once.
When one or more discard rectangles are active, rasterized fragments can
either survive if the fragment is within any of the operational discard
rectangles ([VK_DISCARD_RECTANGLE_MODE_INCLUSIVE_EXT](VkDiscardRectangleModeEXT.html) mode) or be
rejected if the fragment is within any of the operational discard rectangles
([VK_DISCARD_RECTANGLE_MODE_EXCLUSIVE_EXT](VkDiscardRectangleModeEXT.html) mode).

These discard rectangles operate orthogonally to the existing scissor test
functionality.
The discard rectangles can be different for each physical device in a device
group by specifying the device mask and setting discard rectangle dynamic
state.

Version 2 of this extension introduces new dynamic states
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_ENABLE_EXT](VkDynamicState.html) and
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_MODE_EXT](VkDynamicState.html), and the corresponding
functions [vkCmdSetDiscardRectangleEnableEXT](vkCmdSetDiscardRectangleEnableEXT.html) and
[vkCmdSetDiscardRectangleModeEXT](vkCmdSetDiscardRectangleModeEXT.html).
Applications that use these dynamic states must ensure the implementation
advertises at least `specVersion` `2` of this extension.

* 
[vkCmdSetDiscardRectangleEXT](vkCmdSetDiscardRectangleEXT.html)

* 
[vkCmdSetDiscardRectangleEnableEXT](vkCmdSetDiscardRectangleEnableEXT.html)

* 
[vkCmdSetDiscardRectangleModeEXT](vkCmdSetDiscardRectangleModeEXT.html)

* 
Extending [VkGraphicsPipelineCreateInfo](VkGraphicsPipelineCreateInfo.html):

[VkPipelineDiscardRectangleStateCreateInfoEXT](VkPipelineDiscardRectangleStateCreateInfoEXT.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceDiscardRectanglePropertiesEXT](VkPhysicalDeviceDiscardRectanglePropertiesEXT.html)

* 
[VkDiscardRectangleModeEXT](VkDiscardRectangleModeEXT.html)

* 
[VkPipelineDiscardRectangleStateCreateFlagsEXT](VkPipelineDiscardRectangleStateCreateFlagsEXT.html)

* 
`VK_EXT_DISCARD_RECTANGLES_EXTENSION_NAME`

* 
`VK_EXT_DISCARD_RECTANGLES_SPEC_VERSION`

* 
Extending [VkDynamicState](VkDynamicState.html):

[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_ENABLE_EXT](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_EXT](VkDynamicState.html)

* 
[VK_DYNAMIC_STATE_DISCARD_RECTANGLE_MODE_EXT](VkDynamicState.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DISCARD_RECTANGLE_PROPERTIES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_DISCARD_RECTANGLE_STATE_CREATE_INFO_EXT](VkStructureType.html)

* 
Revision 2, 2023-01-18 (Piers Daniell)

Add dynamic states for discard rectangle enable/disable and mode.

Revision 1, 2016-12-22 (Piers Daniell)

* 
Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_discard_rectangles).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
