# VK_EXT_line_rasterization(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_line_rasterization.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_line_rasterization](#VK_EXT_line_rasterization)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to VK_KHR_line_rasterization](#_promotion_to_vk_khr_line_rasterization)
- [Promotion_to_VK_KHR_line_rasterization](#_promotion_to_vk_khr_line_rasterization)
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

VK_EXT_line_rasterization - device extension

**Name String**

`VK_EXT_line_rasterization`

**Extension Type**

Device extension

**Registered Extension Number**

260

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Deprecation State**

* 
*Promoted* to
[VK_KHR_line_rasterization](VK_KHR_line_rasterization.html)
extension

Which in turn was *promoted* to
[Vulkan 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4-promotions)

**Special Use**

* 
[CAD support](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

**Contact**

* 
Jeff Bolz [jeffbolznv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_line_rasterization] @jeffbolznv%0A*Here describe the issue or question you have about the VK_EXT_line_rasterization extension*)

**Last Modified Date**

2019-05-09

**IP Status**

No known IP claims.

**Contributors**

* 
Jeff Bolz, NVIDIA

* 
Allen Jensen, NVIDIA

* 
Faith Ekstrand, Intel

This extension adds some line rasterization features that are commonly used
in CAD applications and supported in other APIs like OpenGL.
Bresenham-style line rasterization is supported, smooth rectangular lines
(coverage to alpha) are supported, and stippled lines are supported for all
three line rasterization modes.

All functionality in this extension is included in
`[VK_KHR_line_rasterization](VK_KHR_line_rasterization.html)`, with the suffix changed to KHR.
The original enum names are still available as aliases of the KHR
functionality.

* 
[vkCmdSetLineStippleEXT](vkCmdSetLineStipple.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceLineRasterizationFeaturesEXT](VkPhysicalDeviceLineRasterizationFeatures.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceLineRasterizationPropertiesEXT](VkPhysicalDeviceLineRasterizationProperties.html)

Extending [VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html):

* 
[VkPipelineRasterizationLineStateCreateInfoEXT](VkPipelineRasterizationLineStateCreateInfo.html)

* 
[VkLineRasterizationModeEXT](VkLineRasterizationMode.html)

* 
`VK_EXT_LINE_RASTERIZATION_EXTENSION_NAME`

* 
`VK_EXT_LINE_RASTERIZATION_SPEC_VERSION`

* 
Extending [VkDynamicState](VkDynamicState.html):

[VK_DYNAMIC_STATE_LINE_STIPPLE_EXT](VkDynamicState.html)

Extending [VkLineRasterizationMode](VkLineRasterizationMode.html):

* 
[VK_LINE_RASTERIZATION_MODE_BRESENHAM_EXT](VkLineRasterizationMode.html)

* 
[VK_LINE_RASTERIZATION_MODE_DEFAULT_EXT](VkLineRasterizationMode.html)

* 
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR_EXT](VkLineRasterizationMode.html)

* 
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR_SMOOTH_EXT](VkLineRasterizationMode.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LINE_RASTERIZATION_FEATURES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LINE_RASTERIZATION_PROPERTIES_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_RASTERIZATION_LINE_STATE_CREATE_INFO_EXT](VkStructureType.html)

1) Do we need to support Bresenham-style and smooth lines with more than one
rasterization sample? i.e. the equivalent of glDisable(GL_MULTISAMPLE) in
OpenGL when the framebuffer has more than one sample?

**RESOLVED**: Yes.
For simplicity, Bresenham line rasterization carries forward a few
restrictions from OpenGL, such as not supporting per-sample shading, alpha
to coverage, or alpha to one.

* 
Revision 1, 2019-05-09 (Jeff Bolz)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_line_rasterization).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
