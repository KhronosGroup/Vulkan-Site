# VK_KHR_wayland_surface(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_wayland_surface.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_wayland_surface](#VK_KHR_wayland_surface)
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

VK_KHR_wayland_surface - instance extension

**Name String**

`VK_KHR_wayland_surface`

**Extension Type**

Instance extension

**Registered Extension Number**

7

**Revision**

6

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_surface](VK_KHR_surface.html)

**Contact**

* 
Jesse Hall [critsec](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_wayland_surface] @critsec%0A*Here describe the issue or question you have about the VK_KHR_wayland_surface extension*)

* 
Ian Elliott [ianelliottus](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_wayland_surface] @ianelliottus%0A*Here describe the issue or question you have about the VK_KHR_wayland_surface extension*)

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

The `VK_KHR_wayland_surface` extension is an instance extension.
It provides a mechanism to create a [VkSurfaceKHR](VkSurfaceKHR.html) object (defined by
the `[VK_KHR_surface](VK_KHR_surface.html)` extension) that refers to a Wayland
`wl_surface`, as well as a query to determine support for rendering to a
Wayland compositor.

* 
[vkCreateWaylandSurfaceKHR](vkCreateWaylandSurfaceKHR.html)

* 
[vkGetPhysicalDeviceWaylandPresentationSupportKHR](vkGetPhysicalDeviceWaylandPresentationSupportKHR.html)

* 
[VkWaylandSurfaceCreateInfoKHR](VkWaylandSurfaceCreateInfoKHR.html)

* 
[VkWaylandSurfaceCreateFlagsKHR](VkWaylandSurfaceCreateFlagsKHR.html)

* 
`VK_KHR_WAYLAND_SURFACE_EXTENSION_NAME`

* 
`VK_KHR_WAYLAND_SURFACE_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_WAYLAND_SURFACE_CREATE_INFO_KHR](VkStructureType.html)

1) Does Wayland need a way to query for compatibility between a particular
physical device and a specific Wayland display? This would be a more general
query than [vkGetPhysicalDeviceSurfaceSupportKHR](vkGetPhysicalDeviceSurfaceSupportKHR.html): if the
Wayland-specific query returned [VK_TRUE](VK_TRUE.html) for a ([VkPhysicalDevice](VkPhysicalDevice.html),
`struct wl_display*`) pair, then the physical device could be assumed to
support presentation to any [VkSurfaceKHR](VkSurfaceKHR.html) for surfaces on the display.

**RESOLVED**: Yes.
[vkGetPhysicalDeviceWaylandPresentationSupportKHR](vkGetPhysicalDeviceWaylandPresentationSupportKHR.html) was added to address
this issue.

2) Should we require surfaces created with [vkCreateWaylandSurfaceKHR](vkCreateWaylandSurfaceKHR.html)
to support the [VK_PRESENT_MODE_MAILBOX_KHR](VkPresentModeKHR.html) present mode?

**RESOLVED**: Yes.
Wayland is an inherently mailbox window system and mailbox support is
required for some Wayland compositor interactions to work as expected.
While handling these interactions may be possible with
[VK_PRESENT_MODE_FIFO_KHR](VkPresentModeKHR.html), it is much more difficult to do without
deadlock and requiring all Wayland applications to be able to support
implementations which only support [VK_PRESENT_MODE_FIFO_KHR](VkPresentModeKHR.html) would be
an onerous restriction on application developers.

* 
Revision 1, 2015-09-23 (Jesse Hall)

Initial draft, based on the previous contents of VK_EXT_KHR_swapchain
(later renamed VK_EXT_KHR_surface).

Revision 2, 2015-10-02 (James Jones)

* 
Added vkGetPhysicalDeviceWaylandPresentationSupportKHR() to resolve
issue #1.

* 
Adjusted wording of issue #1 to match the agreed-upon solution.

* 
Renamed “window” parameters to “surface” to match Wayland
conventions.

Revision 3, 2015-10-26 (Ian Elliott)

* 
Renamed from VK_EXT_KHR_wayland_surface to VK_KHR_wayland_surface.

Revision 4, 2015-11-03 (Daniel Rakos)

* 
Added allocation callbacks to vkCreateWaylandSurfaceKHR.

Revision 5, 2015-11-28 (Daniel Rakos)

* 
Updated the surface create function to take a pCreateInfo structure.

Revision 6, 2017-02-08 (Faith Ekstrand)

* 
Added the requirement that implementations support
[VK_PRESENT_MODE_MAILBOX_KHR](VkPresentModeKHR.html).

* 
Added wording about interactions between [vkQueuePresentKHR](vkQueuePresentKHR.html) and
the Wayland requests sent to the compositor.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_wayland_surface).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
