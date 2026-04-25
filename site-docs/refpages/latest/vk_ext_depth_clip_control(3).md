# VK_EXT_depth_clip_control(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_depth_clip_control.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_depth_clip_control](#VK_EXT_depth_clip_control)
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

VK_EXT_depth_clip_control - device extension

**Name String**

`VK_EXT_depth_clip_control`

**Extension Type**

Device extension

**Registered Extension Number**

356

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
[OpenGL / ES support](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

**Contact**

* 
Shahbaz Youssefi [syoussefi](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_depth_clip_control] @syoussefi%0A*Here describe the issue or question you have about the VK_EXT_depth_clip_control extension*)

**Last Modified Date**

2021-11-09

**Contributors**

* 
Spencer Fricke, Samsung Electronics

* 
Shahbaz Youssefi, Google

* 
Ralph Potter, Samsung Electronics

This extension allows the application to use the OpenGL depth range in NDC,
i.e. with depth in range [-1, 1], as opposed to Vulkan’s default of
[0, 1].
The purpose of this extension is to allow efficient layering of OpenGL over
Vulkan, by avoiding emulation in the pre-rasterization shader stages.
This emulation, which effectively duplicates gl_Position but with a
different depth value, costs ALU and consumes shader output components that
the implementation may not have to spare to meet OpenGL minimum
requirements.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceDepthClipControlFeaturesEXT](VkPhysicalDeviceDepthClipControlFeaturesEXT.html)

Extending [VkPipelineViewportStateCreateInfo](VkPipelineViewportStateCreateInfo.html):

* 
[VkPipelineViewportDepthClipControlCreateInfoEXT](VkPipelineViewportDepthClipControlCreateInfoEXT.html)

* 
`VK_EXT_DEPTH_CLIP_CONTROL_EXTENSION_NAME`

* 
`VK_EXT_DEPTH_CLIP_CONTROL_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_DEPTH_CLIP_CONTROL_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_VIEWPORT_DEPTH_CLIP_CONTROL_CREATE_INFO_EXT](VkStructureType.html)

1) Should this extension include an origin control option to match
GL_LOWER_LEFT found in ARB_clip_control?

**RESOLVED**: No.
The fix for porting over the origin is a simple y-axis flip.
The depth clip control is a much harder problem to solve than what this
extension is aimed to solve.
Adding an equivalent to GL_LOWER_LEFT would require more testing.

2) Should this pipeline state be dynamic?

**RESOLVED**: Yes.
The purpose of this extension is to emulate the OpenGL depth range, which is
expected to be globally fixed (in case of OpenGL ES) or very infrequently
changed (with `glClipControl` in OpenGL).

3) Should the control provided in this extension be an enum that could be
extended in the future?

**RESOLVED**: No.
It is highly unlikely that the depth range is changed to anything other than
[0, 1] in the future.
Should that happen a new extension will be required to extend such an enum,
and that extension might as well add a new structure to chain to
[VkPipelineViewportStateCreateInfo](VkPipelineViewportStateCreateInfo.html)::`pNext` instead.

* 
Revision 0, 2020-10-01 (Spencer Fricke)

Internal revisions

Revision 1, 2020-11-26 (Shahbaz Youssefi)

* 
Language fixes

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_depth_clip_control).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
