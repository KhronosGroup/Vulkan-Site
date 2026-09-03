# VK_NV_display_stereo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_display_stereo.html

## Table of Contents

- [Name](#_name)
- [VK_NV_display_stereo](#VK_NV_display_stereo)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_display_stereo - instance extension

**Name String**

`VK_NV_display_stereo`

**Extension Type**

Instance extension

**Registered Extension Number**

552

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_display](VK_KHR_display.html)

and

[VK_KHR_get_display_properties2](VK_KHR_get_display_properties2.html)

**Contact**

* 
Russell Chou [russellcnv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_display_stereo] @russellcnv%0A*Here describe the issue or question you have about the VK_NV_display_stereo extension*)

**Extension Proposal**

[VK_NV_display_stereo](../../../../features/latest/features/proposals/VK_NV_display_stereo.html)

**Last Modified Date**

2024-11-20

**Contributors**

* 
Russell Chou, NVIDIA

* 
Jeff Juliano, NVIDIA

* 
James Jones, NVIDIA

This extension allows the application to choose which type of 3D stereo
hardware it wants to use so the driver can configure it properly.
This configuration is useful for swapchains created from display surfaces
because some environments do not have an intermediate windowing system
available for easy configuration.
This extension will override any stereo type configuration in the windowing
system.

For HDMI 3D, only some display modes support stereo rendering, and a new
structure is needed to expose that information to the application.

* 
Extending [VkDisplayModeProperties2KHR](VkDisplayModeProperties2KHR.html):

[VkDisplayModeStereoPropertiesNV](VkDisplayModeStereoPropertiesNV.html)

Extending [VkDisplaySurfaceCreateInfoKHR](VkDisplaySurfaceCreateInfoKHR.html):

* 
[VkDisplaySurfaceStereoCreateInfoNV](VkDisplaySurfaceStereoCreateInfoNV.html)

* 
[VkDisplaySurfaceStereoTypeNV](VkDisplaySurfaceStereoTypeNV.html)

* 
`VK_NV_DISPLAY_STEREO_EXTENSION_NAME`

* 
`VK_NV_DISPLAY_STEREO_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_DISPLAY_MODE_STEREO_PROPERTIES_NV](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DISPLAY_SURFACE_STEREO_CREATE_INFO_NV](VkStructureType.html)

* 
Revision 1, 2024-11-20 (Russell Chou)

Initial release

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_display_stereo).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
