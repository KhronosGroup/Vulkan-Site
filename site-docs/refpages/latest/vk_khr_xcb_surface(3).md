# VK_KHR_xcb_surface(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_xcb_surface.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_xcb_surface](#VK_KHR_xcb_surface)
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

VK_KHR_xcb_surface - instance extension

**Name String**

`VK_KHR_xcb_surface`

**Extension Type**

Instance extension

**Registered Extension Number**

6

**Revision**

6

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_surface](VK_KHR_surface.html)

**Contact**

* 
Jesse Hall [critsec](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_xcb_surface] @critsec%0A*Here describe the issue or question you have about the VK_KHR_xcb_surface extension*)

* 
Ian Elliott [ianelliottus](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_xcb_surface] @ianelliottus%0A*Here describe the issue or question you have about the VK_KHR_xcb_surface extension*)

**Last Modified Date**

2015-11-28

**IP Status**

No known IP claims.

**Contributors**

* 
Patrick Doane, Blizzard

* 
Faith Ekstrand, Intel

* 
Ian Elliott, LunarG

* 
Courtney Goeltzenleuchter, LunarG

* 
Jesse Hall, Google

* 
James Jones, NVIDIA

* 
Antoine Labour, Google

* 
Jon Leech, Khronos

* 
David Mao, AMD

* 
Norbert Nopper, Freescale

* 
Alon Or-bach, Samsung

* 
Daniel Rakos, AMD

* 
Graham Sellers, AMD

* 
Ray Smith, ARM

* 
Jeff Vigil, Qualcomm

* 
Chia-I Wu, LunarG

The `VK_KHR_xcb_surface` extension is an instance extension.
It provides a mechanism to create a [VkSurfaceKHR](VkSurfaceKHR.html) object (defined by
the `[VK_KHR_surface](VK_KHR_surface.html)` extension) that refers to an X11 `Window`,
using the XCB client-side library, as well as a query to determine support
for rendering via XCB.

* 
[vkCreateXcbSurfaceKHR](vkCreateXcbSurfaceKHR.html)

* 
[vkGetPhysicalDeviceXcbPresentationSupportKHR](vkGetPhysicalDeviceXcbPresentationSupportKHR.html)

* 
[VkXcbSurfaceCreateInfoKHR](VkXcbSurfaceCreateInfoKHR.html)

* 
[VkXcbSurfaceCreateFlagsKHR](VkXcbSurfaceCreateFlagsKHR.html)

* 
`VK_KHR_XCB_SURFACE_EXTENSION_NAME`

* 
`VK_KHR_XCB_SURFACE_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_XCB_SURFACE_CREATE_INFO_KHR](VkStructureType.html)

1) Does XCB need a way to query for compatibility between a particular
physical device and a specific screen? This would be a more general query
than [vkGetPhysicalDeviceSurfaceSupportKHR](vkGetPhysicalDeviceSurfaceSupportKHR.html): If it returned
[VK_TRUE](VK_TRUE.html), then the physical device could be assumed to support
presentation to any window on that screen.

**RESOLVED**: Yes, this is needed for toolkits that want to create a
[VkDevice](VkDevice.html) before creating a window.
To ensure the query is reliable, it must be made against a particular X
visual rather than the screen in general.

* 
Revision 1, 2015-09-23 (Jesse Hall)

Initial draft, based on the previous contents of VK_EXT_KHR_swapchain
(later renamed VK_EXT_KHR_surface).

Revision 2, 2015-10-02 (James Jones)

* 
Added presentation support query for an (xcb_connection_t*,
xcb_visualid_t) pair.

* 
Removed “root” parameter from CreateXcbSurfaceKHR(), as it is
redundant when a window on the same screen is specified as well.

* 
Adjusted wording of issue #1 and added agreed upon resolution.

Revision 3, 2015-10-14 (Ian Elliott)

* 
Removed “root” parameter from CreateXcbSurfaceKHR() in one more
place.

Revision 4, 2015-10-26 (Ian Elliott)

* 
Renamed from VK_EXT_KHR_xcb_surface to VK_KHR_xcb_surface.

Revision 5, 2015-10-23 (Daniel Rakos)

* 
Added allocation callbacks to vkCreateXcbSurfaceKHR.

Revision 6, 2015-11-28 (Daniel Rakos)

* 
Updated the surface create function to take a pCreateInfo structure.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_xcb_surface).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
