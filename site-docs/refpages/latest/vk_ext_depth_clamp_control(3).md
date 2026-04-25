# VK_EXT_depth_clamp_control(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_depth_clamp_control.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_depth_clamp_control](#VK_EXT_depth_clamp_control)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_depth_clamp_control - device extension

**Name String**

`VK_EXT_depth_clamp_control`

**Extension Type**

Device extension

**Registered Extension Number**

583

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
Jules Blok [jules](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_depth_clamp_control] @jules%0A*Here describe the issue or question you have about the VK_EXT_depth_clamp_control extension*)

**Extension Proposal**

[VK_EXT_depth_clamp_control](../../../../features/latest/features/proposals/VK_EXT_depth_clamp_control.html)

**Last Modified Date**

2024-07-15

**Contributors**

* 
Jules Blok, Independent

This extension allows the application to control the viewport depth clamp
range separately from the viewport `minDepth` and `maxDepth`.
This gives the ability for the application to restrict depth values to an
application-defined range rather than
the viewport depth range or the range defined in the
[VK_EXT_depth_clamp_zero_one](VK_EXT_depth_clamp_zero_one.html) extension.

It can be used to set a smaller or larger clamping range than the viewport
depth range without affecting the depth mapping of the viewport transform.
Another possible use of this extension is to restrict depth values beyond
the viewport depth range to a clamping range other than the [0, 1] range
defined in the [VK_EXT_depth_clamp_zero_one](VK_EXT_depth_clamp_zero_one.html) extension.

* 
[vkCmdSetDepthClampRangeEXT](vkCmdSetDepthClampRangeEXT.html)

* 
[VkDepthClampRangeEXT](VkDepthClampRangeEXT.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceDepthClampControlFeaturesEXT](VkPhysicalDeviceDepthClampControlFeaturesEXT.html)

Extending [VkPipelineViewportStateCreateInfo](VkPipelineViewportStateCreateInfo.html):

* 
[VkPipelineViewportDepthClampControlCreateInfoEXT](VkPipelineViewportDepthClampControlCreateInfoEXT.html)

* 
[VkDepthClampModeEXT](VkDepthClampModeEXT.html)

* 
`VK_EXT_DEPTH_CLAMP_CONTROL_EXTENSION_NAME`

* 
`VK_EXT_DEPTH_CLAMP_CONTROL_SPEC_VERSION`

* 
Extending [VkDynamicState](VkDynamicState.html):

[VK_DYNAMIC_STATE_DEPTH_CLAMP_RANGE_EXT](VkDynamicState.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEPTH_CLAMP_CONTROL_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_VIEWPORT_DEPTH_CLAMP_CONTROL_CREATE_INFO_EXT](VkStructureType.html)

1) Should the depth clamp range be a per-viewport parameter?

**RESOLVED**: No.
Because the depth clamp range was previously defined to be equal to the
viewport depth range, conformant runtimes are already handling the depth
clamp range as a per-viewport parameter.
However because of complexities from interactions with multiple viewports a
per-viewport clamp range is left to a future extensions if a use case
arises.

2) Should this pipeline state be dynamic?

**RESOLVED**: Yes.
Since the viewport depth range can already be a dynamic state conformant
runtimes are already able to handle the depth clamp range as a dynamic
state.

3) Can the depth clamp range be ignored when depth clamping is disabled?

**RESOLVED**: Yes.
This extension overrides the clamping range used only when depth clamping is
enabled.
The alternative would be highly unintuitive.
As a consequence the [VK_EXT_depth_clip_enable](VK_EXT_depth_clip_enable.html) extension is required
if depth clipping is desired in combination with this extension.

* 
Revision 1, 2024-02-13 (Jules Blok)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_depth_clamp_control).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
