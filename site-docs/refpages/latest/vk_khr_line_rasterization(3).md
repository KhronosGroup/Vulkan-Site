# VK_KHR_line_rasterization(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_line_rasterization.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_line_rasterization](#VK_KHR_line_rasterization)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Promotion to Vulkan 1.4](#_promotion_to_vulkan_1_4)
- [Promotion_to_Vulkan_1.4](#_promotion_to_vulkan_1_4)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_line_rasterization - device extension

**Name String**

`VK_KHR_line_rasterization`

**Extension Type**

Device extension

**Registered Extension Number**

535

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
Piers Daniell [pdaniell-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_line_rasterization] @pdaniell-nv%0A*Here describe the issue or question you have about the VK_KHR_line_rasterization extension*)

**Last Modified Date**

2023-06-08

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

* 
[vkCmdSetLineStippleKHR](vkCmdSetLineStipple.html)

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceLineRasterizationFeaturesKHR](VkPhysicalDeviceLineRasterizationFeatures.html)

Extending [VkPhysicalDeviceProperties2](VkPhysicalDeviceProperties2.html):

* 
[VkPhysicalDeviceLineRasterizationPropertiesKHR](VkPhysicalDeviceLineRasterizationProperties.html)

Extending [VkPipelineRasterizationStateCreateInfo](VkPipelineRasterizationStateCreateInfo.html):

* 
[VkPipelineRasterizationLineStateCreateInfoKHR](VkPipelineRasterizationLineStateCreateInfo.html)

* 
[VkLineRasterizationModeKHR](VkLineRasterizationMode.html)

* 
`VK_KHR_LINE_RASTERIZATION_EXTENSION_NAME`

* 
`VK_KHR_LINE_RASTERIZATION_SPEC_VERSION`

* 
Extending [VkDynamicState](VkDynamicState.html):

[VK_DYNAMIC_STATE_LINE_STIPPLE_KHR](VkDynamicState.html)

Extending [VkLineRasterizationMode](VkLineRasterizationMode.html):

* 
[VK_LINE_RASTERIZATION_MODE_BRESENHAM_KHR](VkLineRasterizationMode.html)

* 
[VK_LINE_RASTERIZATION_MODE_DEFAULT_KHR](VkLineRasterizationMode.html)

* 
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR_KHR](VkLineRasterizationMode.html)

* 
[VK_LINE_RASTERIZATION_MODE_RECTANGULAR_SMOOTH_KHR](VkLineRasterizationMode.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LINE_RASTERIZATION_FEATURES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_LINE_RASTERIZATION_PROPERTIES_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_PIPELINE_RASTERIZATION_LINE_STATE_CREATE_INFO_KHR](VkStructureType.html)

Functionality in this extension is included in core Vulkan 1.4 with the KHR
suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

When [Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4) is supported, the
[`bresenhamLines`](../../../../spec/latest/chapters/features.html#features-bresenhamLines) feature must be supported.

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

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_line_rasterization).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
