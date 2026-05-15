# VK_SEC_ubm_surface(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_SEC_ubm_surface.html

## Table of Contents

- [Name](#_name)
- [VK_SEC_ubm_surface](#VK_SEC_ubm_surface)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_SEC_ubm_surface - instance extension

**Name String**

`VK_SEC_ubm_surface`

**Extension Type**

Instance extension

**Registered Extension Number**

665

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_surface](VK_KHR_surface.html)

**Contact**

* 
Minji Choe [minjichoe](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_SEC_ubm_surface] @minjichoe%0A*Here describe the issue or question you have about the VK_SEC_ubm_surface extension*)

**Last Modified Date**

2026-01-26

**IP Status**

No known IP claims.

**Contributors**

* 
Ralph Potter, Samsung

* 
Isaac Hong, Samsung

* 
Jaeyoung Park, Samsung

* 
Changhwan Lee, Samsung

* 
Minji Choe, Samsung

* 
Krzysztof Buben, Samsung

* 
Mikolaj Chadzynski, Samsung

* 
Bohdan Soproniuk, Samsung

The `VK_SEC_ubm_surface` extension is an instance extension.
It provides a mechanism to create a [VkSurfaceKHR](VkSurfaceKHR.html) object (defined by
the `[VK_KHR_surface](VK_KHR_surface.html)` extension) that refers to a UBM
`ubm_surface`, as well as a query to determine support for rendering to a
UBM compositor.

* 
[vkCreateUbmSurfaceSEC](vkCreateUbmSurfaceSEC.html)

* 
[vkGetPhysicalDeviceUbmPresentationSupportSEC](vkGetPhysicalDeviceUbmPresentationSupportSEC.html)

* 
[VkUbmSurfaceCreateInfoSEC](VkUbmSurfaceCreateInfoSEC.html)

* 
[VkUbmSurfaceCreateFlagsSEC](VkUbmSurfaceCreateFlagsSEC.html)

* 
`VK_SEC_UBM_SURFACE_EXTENSION_NAME`

* 
`VK_SEC_UBM_SURFACE_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_UBM_SURFACE_CREATE_INFO_SEC](VkStructureType.html)

1) Does UBM need a way to query for compatibility between a particular
physical device and a specific screen? This would be a more general query
than [vkGetPhysicalDeviceSurfaceSupportKHR](vkGetPhysicalDeviceSurfaceSupportKHR.html): If it returned
[VK_TRUE](VK_TRUE.html), then the physical device could be assumed to support
presentation to any window on that screen.

**RESOLVED**: Yes.
[vkGetPhysicalDeviceUbmPresentationSupportSEC](vkGetPhysicalDeviceUbmPresentationSupportSEC.html) was added to address this
issue.

* 
Revision 1, 2026-01-30 (Krzysztof Buben)

Initial draft, based on the previous contents of VK_EXT_KHR_swapchain
(later renamed VK_EXT_KHR_surface).

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_SEC_ubm_surface).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
