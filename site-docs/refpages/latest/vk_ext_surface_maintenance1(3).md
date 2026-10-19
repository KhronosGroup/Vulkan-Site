# VK_EXT_surface_maintenance1(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_surface_maintenance1.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_surface_maintenance1](#VK_EXT_surface_maintenance1)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to VK_KHR_surface_maintenance1](#_promotion_to_vk_khr_surface_maintenance1)
- [Promotion_to_VK_KHR_surface_maintenance1](#_promotion_to_vk_khr_surface_maintenance1)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_surface_maintenance1 - instance extension

**Name String**

`VK_EXT_surface_maintenance1`

**Extension Type**

Instance extension

**Registered Extension Number**

275

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_surface](VK_KHR_surface.html)

and

[VK_KHR_get_surface_capabilities2](VK_KHR_get_surface_capabilities2.html)

**Deprecation State**

* 
*Promoted* to
[VK_KHR_surface_maintenance1](VK_KHR_surface_maintenance1.html)
extension

**Contact**

* 
Shahbaz Youssefi [syoussefi](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_surface_maintenance1] @syoussefi%0A*Here describe the issue or question you have about the VK_EXT_surface_maintenance1 extension*)

**Extension Proposal**

[VK_EXT_surface_maintenance1](../../../../features/latest/features/proposals/VK_EXT_surface_maintenance1.html)

**Last Modified Date**

2022-12-16

**Interactions and External Dependencies**

* 
Promoted to `[VK_KHR_surface_maintenance1](VK_KHR_surface_maintenance1.html)`

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

`[VK_EXT_surface_maintenance1](#)` adds a collection of window system
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

All functionality in this extension is included in
`[VK_KHR_surface_maintenance1](VK_KHR_surface_maintenance1.html)`, with the suffix changed to KHR.
The original type, enum, and command names are still available as aliases of
the KHR functionality.

* 
Extending [VkPhysicalDeviceSurfaceInfo2KHR](VkPhysicalDeviceSurfaceInfo2KHR.html):

[VkSurfacePresentModeEXT](VkSurfacePresentModeKHR.html)

Extending [VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html):

* 
[VkSurfacePresentModeCompatibilityEXT](VkSurfacePresentModeCompatibilityKHR.html)

* 
[VkSurfacePresentScalingCapabilitiesEXT](VkSurfacePresentScalingCapabilitiesKHR.html)

* 
[VkPresentGravityFlagBitsEXT](VkPresentGravityFlagBitsKHR.html)

* 
[VkPresentScalingFlagBitsEXT](VkPresentScalingFlagBitsKHR.html)

* 
[VkPresentGravityFlagsEXT](VkPresentGravityFlagsKHR.html)

* 
[VkPresentScalingFlagsEXT](VkPresentScalingFlagsKHR.html)

* 
`VK_EXT_SURFACE_MAINTENANCE_1_EXTENSION_NAME`

* 
`VK_EXT_SURFACE_MAINTENANCE_1_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_SURFACE_PRESENT_MODE_COMPATIBILITY_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SURFACE_PRESENT_MODE_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SURFACE_PRESENT_SCALING_CAPABILITIES_EXT](VkStructureType.html)

* 
Revision 0, 2019-02-27 (Lionel Landwerlin)

Internal revisions

Revision 0, 2020-06-15 (James Jones)

* 
Internal revisions

Revision 1, 2022-11-09 (Shahbaz Youssefi)

* 
Add functionality and complete spec

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_surface_maintenance1).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
