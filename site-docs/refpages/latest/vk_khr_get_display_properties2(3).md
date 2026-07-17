# VK_KHR_get_display_properties2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_get_display_properties2.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_get_display_properties2](#VK_KHR_get_display_properties2)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_get_display_properties2 - instance extension

**Name String**

`VK_KHR_get_display_properties2`

**Extension Type**

Instance extension

**Registered Extension Number**

122

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_display](VK_KHR_display.html)

**Contact**

* 
James Jones [cubanismo](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_get_display_properties2] @cubanismo%0A*Here describe the issue or question you have about the VK_KHR_get_display_properties2 extension*)

**Last Modified Date**

2017-02-21

**IP Status**

No known IP claims.

**Contributors**

* 
Ian Elliott, Google

* 
James Jones, NVIDIA

This extension provides new queries for device display properties and
capabilities that can be easily extended by other extensions, without
introducing any further queries.
This extension can be considered the `[VK_KHR_display](VK_KHR_display.html)` equivalent of
the `[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)` extension.

* 
[vkGetDisplayModeProperties2KHR](vkGetDisplayModeProperties2KHR.html)

* 
[vkGetDisplayPlaneCapabilities2KHR](vkGetDisplayPlaneCapabilities2KHR.html)

* 
[vkGetPhysicalDeviceDisplayPlaneProperties2KHR](vkGetPhysicalDeviceDisplayPlaneProperties2KHR.html)

* 
[vkGetPhysicalDeviceDisplayProperties2KHR](vkGetPhysicalDeviceDisplayProperties2KHR.html)

* 
[VkDisplayModeProperties2KHR](VkDisplayModeProperties2KHR.html)

* 
[VkDisplayPlaneCapabilities2KHR](VkDisplayPlaneCapabilities2KHR.html)

* 
[VkDisplayPlaneInfo2KHR](VkDisplayPlaneInfo2KHR.html)

* 
[VkDisplayPlaneProperties2KHR](VkDisplayPlaneProperties2KHR.html)

* 
[VkDisplayProperties2KHR](VkDisplayProperties2KHR.html)

* 
`VK_KHR_GET_DISPLAY_PROPERTIES_2_EXTENSION_NAME`

* 
`VK_KHR_GET_DISPLAY_PROPERTIES_2_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_DISPLAY_MODE_PROPERTIES_2_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DISPLAY_PLANE_CAPABILITIES_2_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DISPLAY_PLANE_INFO_2_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DISPLAY_PLANE_PROPERTIES_2_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_DISPLAY_PROPERTIES_2_KHR](VkStructureType.html)

1) What should this extension be named?

**RESOLVED**: `VK_KHR_get_display_properties2`.
Other alternatives:

* 
`VK_KHR_display2`

* 
One extension, combined with `VK_KHR_surface_capabilites2`.

2) Should extensible input structs be added for these new functions:

**RESOLVED**:

* 
[vkGetPhysicalDeviceDisplayProperties2KHR](vkGetPhysicalDeviceDisplayProperties2KHR.html): No.
The only current input is a [VkPhysicalDevice](VkPhysicalDevice.html).
Other inputs would not make sense.

* 
[vkGetPhysicalDeviceDisplayPlaneProperties2KHR](vkGetPhysicalDeviceDisplayPlaneProperties2KHR.html): No.
The only current input is a [VkPhysicalDevice](VkPhysicalDevice.html).
Other inputs would not make sense.

* 
[vkGetDisplayModeProperties2KHR](vkGetDisplayModeProperties2KHR.html): No.
The only current inputs are a [VkPhysicalDevice](VkPhysicalDevice.html) and a
[VkDisplayModeKHR](VkDisplayModeKHR.html).
Other inputs would not make sense.

3) Should additional display query functions be extended?

**RESOLVED**:

* 
[vkGetDisplayPlaneSupportedDisplaysKHR](vkGetDisplayPlaneSupportedDisplaysKHR.html): No.
Extensions should instead extend
[vkGetDisplayPlaneCapabilitiesKHR](vkGetDisplayPlaneCapabilitiesKHR.html)().

* 
Revision 1, 2017-02-21 (James Jones)

Initial draft.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_get_display_properties2).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
