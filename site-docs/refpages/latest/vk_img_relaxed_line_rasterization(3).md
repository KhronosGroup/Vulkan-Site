# VK_IMG_relaxed_line_rasterization(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_IMG_relaxed_line_rasterization.html

## Table of Contents

- [Name](#_name)
- [VK_IMG_relaxed_line_rasterization](#VK_IMG_relaxed_line_rasterization)
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

VK_IMG_relaxed_line_rasterization - device extension

**Name String**

`VK_IMG_relaxed_line_rasterization`

**Extension Type**

Device extension

**Registered Extension Number**

111

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Special Use**

* 
[OpenGL / ES support](../../../../spec/latest/chapters/extensions.html#extendingvulkan-compatibility-specialuse)

**Contact**

* 
James Fitzpatrick [jamesfitzpatrick](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_IMG_relaxed_line_rasterization] @jamesfitzpatrick%0A*Here describe the issue or question you have about the VK_IMG_relaxed_line_rasterization extension*)

**Last Modified Date**

2023-10-22

**IP Status**

No known IP claims.

**Contributors**

* 
James Fitzpatrick, Imagination

* 
Andrew Garrard, Imagination

* 
Alex Walters, Imagination

OpenGL specifies that implementations should rasterize lines using the
diamond exit rule (a slightly modified version of Bresenham’s algorithm).
To implement OpenGL some implementations have a device-level compatibility
mode to rasterize lines according to the OpenGL specification.

This extension allows OpenGL emulation layers to enable the OpenGL
compatible line rasterization mode of such implementations.

* 
Extending [VkPhysicalDeviceFeatures2](VkPhysicalDeviceFeatures2.html), [VkDeviceCreateInfo](VkDeviceCreateInfo.html):

[VkPhysicalDeviceRelaxedLineRasterizationFeaturesIMG](VkPhysicalDeviceRelaxedLineRasterizationFeaturesIMG.html)

* 
`VK_IMG_RELAXED_LINE_RASTERIZATION_EXTENSION_NAME`

* 
`VK_IMG_RELAXED_LINE_RASTERIZATION_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_RELAXED_LINE_RASTERIZATION_FEATURES_IMG](VkStructureType.html)

None.

* 
Revision 1, 2023-10-22 (James Fitzpatrick)

Initial version

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_IMG_relaxed_line_rasterization).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
