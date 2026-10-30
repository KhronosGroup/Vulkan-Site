# VK_EXT_display_surface_counter(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_display_surface_counter.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_display_surface_counter](#VK_EXT_display_surface_counter)
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

VK_EXT_display_surface_counter - instance extension

**Name String**

`VK_EXT_display_surface_counter`

**Extension Type**

Instance extension

**Registered Extension Number**

91

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_display](VK_KHR_display.html)

**Contact**

* 
James Jones [cubanismo](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_display_surface_counter] @cubanismo%0A*Here describe the issue or question you have about the VK_EXT_display_surface_counter extension*)

**Last Modified Date**

2016-12-13

**IP Status**

No known IP claims.

**Contributors**

* 
Pierre Boudier, NVIDIA

* 
James Jones, NVIDIA

* 
Damien Leone, NVIDIA

* 
Pierre-Loup Griffais, Valve

* 
Daniel Vetter, Intel

This extension defines a vertical blanking period counter associated with
display surfaces.
It provides a mechanism to query support for such a counter from a
[VkSurfaceKHR](VkSurfaceKHR.html) object.

* 
[vkGetPhysicalDeviceSurfaceCapabilities2EXT](vkGetPhysicalDeviceSurfaceCapabilities2EXT.html)

* 
[VkSurfaceCapabilities2EXT](VkSurfaceCapabilities2EXT.html)

* 
[VkSurfaceCounterFlagBitsEXT](VkSurfaceCounterFlagBitsEXT.html)

* 
[VkSurfaceCounterFlagsEXT](VkSurfaceCounterFlagsEXT.html)

* 
`VK_EXT_DISPLAY_SURFACE_COUNTER_EXTENSION_NAME`

* 
`VK_EXT_DISPLAY_SURFACE_COUNTER_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_SURFACE_CAPABILITIES2_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SURFACE_CAPABILITIES_2_EXT](VkStructureType.html)

* 
Revision 1, 2016-12-13 (James Jones)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_display_surface_counter).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
