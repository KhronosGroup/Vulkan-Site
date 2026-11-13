# VK_KHR_get_surface_capabilities2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_get_surface_capabilities2.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_get_surface_capabilities2](#VK_KHR_get_surface_capabilities2)
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

VK_KHR_get_surface_capabilities2 - instance extension

**Name String**

`VK_KHR_get_surface_capabilities2`

**Extension Type**

Instance extension

**Registered Extension Number**

120

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_surface](VK_KHR_surface.html)

**Contact**

* 
James Jones [cubanismo](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_get_surface_capabilities2] @cubanismo%0A*Here describe the issue or question you have about the VK_KHR_get_surface_capabilities2 extension*)

**Last Modified Date**

2017-02-27

**IP Status**

No known IP claims.

**Contributors**

* 
Ian Elliott, Google

* 
James Jones, NVIDIA

* 
Alon Or-bach, Samsung

This extension provides new queries for device surface capabilities that can
be easily extended by other extensions, without introducing any further
queries.
This extension can be considered the `[VK_KHR_surface](VK_KHR_surface.html)` equivalent of
the `[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)` extension.

* 
[vkGetPhysicalDeviceSurfaceCapabilities2KHR](vkGetPhysicalDeviceSurfaceCapabilities2KHR.html)

* 
[vkGetPhysicalDeviceSurfaceFormats2KHR](vkGetPhysicalDeviceSurfaceFormats2KHR.html)

* 
[VkPhysicalDeviceSurfaceInfo2KHR](VkPhysicalDeviceSurfaceInfo2KHR.html)

* 
[VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html)

* 
[VkSurfaceFormat2KHR](VkSurfaceFormat2KHR.html)

* 
`VK_KHR_GET_SURFACE_CAPABILITIES_2_EXTENSION_NAME`

* 
`VK_KHR_GET_SURFACE_CAPABILITIES_2_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PHYSICAL_DEVICE_SURFACE_INFO_2_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SURFACE_CAPABILITIES_2_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SURFACE_FORMAT_2_KHR](VkStructureType.html)

1) What should this extension be named?

**RESOLVED**: `VK_KHR_get_surface_capabilities2`.
Other alternatives:

* 
`VK_KHR_surface2`

* 
One extension, combining a separate display-specific query extension.

2) Should additional WSI query functions be extended?

**RESOLVED**:

* 
[vkGetPhysicalDeviceSurfaceCapabilitiesKHR](vkGetPhysicalDeviceSurfaceCapabilitiesKHR.html): Yes.
The need for this motivated the extension.

* 
[vkGetPhysicalDeviceSurfaceSupportKHR](vkGetPhysicalDeviceSurfaceSupportKHR.html): No.
Currently only has boolean output.
Extensions should instead extend
[vkGetPhysicalDeviceSurfaceCapabilities2KHR](vkGetPhysicalDeviceSurfaceCapabilities2KHR.html).

* 
[vkGetPhysicalDeviceSurfaceFormatsKHR](vkGetPhysicalDeviceSurfaceFormatsKHR.html): Yes.

* 
[vkGetPhysicalDeviceSurfacePresentModesKHR](vkGetPhysicalDeviceSurfacePresentModesKHR.html): No.
Recent discussion concluded this introduced too much variability for
applications to deal with.
Extensions should instead extend
[vkGetPhysicalDeviceSurfaceCapabilities2KHR](vkGetPhysicalDeviceSurfaceCapabilities2KHR.html).

* 
[vkGetPhysicalDeviceXlibPresentationSupportKHR](vkGetPhysicalDeviceXlibPresentationSupportKHR.html): Not in this
extension.

* 
[vkGetPhysicalDeviceXcbPresentationSupportKHR](vkGetPhysicalDeviceXcbPresentationSupportKHR.html): Not in this
extension.

* 
[vkGetPhysicalDeviceWaylandPresentationSupportKHR](vkGetPhysicalDeviceWaylandPresentationSupportKHR.html): Not in this
extension.

* 
[vkGetPhysicalDeviceWin32PresentationSupportKHR](vkGetPhysicalDeviceWin32PresentationSupportKHR.html): Not in this
extension.

* 
Revision 1, 2017-02-27 (James Jones)

Initial draft.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_get_surface_capabilities2).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
