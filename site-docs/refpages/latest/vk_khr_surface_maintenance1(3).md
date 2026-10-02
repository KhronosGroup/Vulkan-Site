# VK_KHR_surface_maintenance1(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_surface_maintenance1.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_surface_maintenance1](#VK_KHR_surface_maintenance1)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_surface_maintenance1 - instance extension

**Name String**

`VK_KHR_surface_maintenance1`

**Extension Type**

Instance extension

**Registered Extension Number**

487

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_surface](VK_KHR_surface.html)

and

[VK_KHR_get_surface_capabilities2](VK_KHR_get_surface_capabilities2.html)

**Contact**

* 
Shahbaz Youssefi [syoussefi](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_surface_maintenance1] @syoussefi%0A*Here describe the issue or question you have about the VK_KHR_surface_maintenance1 extension*)

**Extension Proposal**

[VK_KHR_surface_maintenance1](../../../../features/latest/features/proposals/VK_KHR_surface_maintenance1.html)

**Last Modified Date**

2025-03-31

**Contributors**

* 
James Jones, NVIDIA

* 
Jeff Juliano, NVIDIA

* 
Lionel Landwerlin, Intel

* 
Shahbaz Youssefi, Google

* 
Chris Forbes, Google

* 
Ian Elliott, Google

* 
Hans-Kristian Arntzen, Valve

* 
Daniel Stone, Collabora

This extension is based off the `[VK_EXT_surface_maintenance1](VK_EXT_surface_maintenance1.html)`
extension.

`[VK_KHR_surface_maintenance1](#)` adds a collection of window system
integration features that were intentionally left out or overlooked in the
original `[VK_KHR_surface](VK_KHR_surface.html)` extension.

The new features are as follows:

* 
Allow querying number of min/max images from a surface for a particular
presentation mode.

* 
Allow querying a surface’s scaled presentation capabilities.

* 
Allow querying a surface for the set of presentation modes which can be
easily switched between without requiring swapchain recreation.

* 
Extending [VkPhysicalDeviceSurfaceInfo2KHR](VkPhysicalDeviceSurfaceInfo2KHR.html):

[VkSurfacePresentModeKHR](VkSurfacePresentModeKHR.html)

Extending [VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html):

* 
[VkSurfacePresentModeCompatibilityKHR](VkSurfacePresentModeCompatibilityKHR.html)

* 
[VkSurfacePresentScalingCapabilitiesKHR](VkSurfacePresentScalingCapabilitiesKHR.html)

* 
[VkPresentGravityFlagBitsKHR](VkPresentGravityFlagBitsKHR.html)

* 
[VkPresentScalingFlagBitsKHR](VkPresentScalingFlagBitsKHR.html)

* 
[VkPresentGravityFlagsKHR](VkPresentGravityFlagsKHR.html)

* 
[VkPresentScalingFlagsKHR](VkPresentScalingFlagsKHR.html)

* 
`VK_KHR_SURFACE_MAINTENANCE_1_EXTENSION_NAME`

* 
`VK_KHR_SURFACE_MAINTENANCE_1_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_SURFACE_PRESENT_MODE_COMPATIBILITY_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SURFACE_PRESENT_MODE_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SURFACE_PRESENT_SCALING_CAPABILITIES_KHR](VkStructureType.html)

* 
Revision 1, 2025-03-31 (Shahbaz Youssefi)

Based on VK_EXT_surface_maintenance1

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_surface_maintenance1).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
