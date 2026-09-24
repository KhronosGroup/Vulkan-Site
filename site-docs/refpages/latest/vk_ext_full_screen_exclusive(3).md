# VK_EXT_full_screen_exclusive(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_full_screen_exclusive.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_full_screen_exclusive](#VK_EXT_full_screen_exclusive)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enums](#_new_enums)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_full_screen_exclusive - device extension

**Name String**

`VK_EXT_full_screen_exclusive`

**Extension Type**

Device extension

**Registered Extension Number**

256

**Revision**

4

**Ratification Status**

Ratified

**Extension and Version Dependencies**

     [VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html)

     or

     [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

and

[VK_KHR_surface](VK_KHR_surface.html)

and

[VK_KHR_get_surface_capabilities2](VK_KHR_get_surface_capabilities2.html)

and

[VK_KHR_swapchain](VK_KHR_swapchain.html)

**API Interactions**

* 
Interacts with VK_VERSION_1_1

* 
Interacts with VK_KHR_device_group

* 
Interacts with VK_KHR_win32_surface

**Contact**

* 
James Jones [cubanismo](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_full_screen_exclusive] @cubanismo%0A*Here describe the issue or question you have about the VK_EXT_full_screen_exclusive extension*)

**Last Modified Date**

2019-03-12

**IP Status**

No known IP claims.

**Interactions and External Dependencies**

* 
Interacts with Vulkan 1.1

* 
Interacts with `[VK_KHR_device_group](VK_KHR_device_group.html)`

* 
Interacts with `[VK_KHR_win32_surface](VK_KHR_win32_surface.html)`

**Contributors**

* 
Hans-Kristian Arntzen, ARM

* 
Slawomir Grajewski, Intel

* 
Tobias Hector, AMD

* 
James Jones, NVIDIA

* 
Daniel Rakos, AMD

* 
Jeff Juliano, NVIDIA

* 
Joshua Schnarr, NVIDIA

* 
Aaron Hagan, AMD

This extension allows applications to set the policy for swapchain creation
and presentation mechanisms relating to full-screen access.
Implementations may be able to acquire exclusive access to a particular
display for an application window that covers the whole screen.
This can increase performance on some systems by bypassing composition,
however it can also result in disruptive or expensive transitions in the
underlying windowing system when a change occurs.

Applications can choose between explicitly disallowing or allowing this
behavior, letting the implementation decide, or managing this mode of
operation directly using the new [vkAcquireFullScreenExclusiveModeEXT](vkAcquireFullScreenExclusiveModeEXT.html)
and [vkReleaseFullScreenExclusiveModeEXT](vkReleaseFullScreenExclusiveModeEXT.html) commands.

* 
[vkAcquireFullScreenExclusiveModeEXT](vkAcquireFullScreenExclusiveModeEXT.html)

* 
[vkGetPhysicalDeviceSurfacePresentModes2EXT](vkGetPhysicalDeviceSurfacePresentModes2EXT.html)

* 
[vkReleaseFullScreenExclusiveModeEXT](vkReleaseFullScreenExclusiveModeEXT.html)

If [VK_KHR_device_group](VK_KHR_device_group.html) or [Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1) is supported:

* 
[vkGetDeviceGroupSurfacePresentModes2EXT](vkGetDeviceGroupSurfacePresentModes2EXT.html)

* 
Extending [VkPhysicalDeviceSurfaceInfo2KHR](VkPhysicalDeviceSurfaceInfo2KHR.html), [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html):

[VkSurfaceFullScreenExclusiveInfoEXT](VkSurfaceFullScreenExclusiveInfoEXT.html)

Extending [VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html):

* 
[VkSurfaceCapabilitiesFullScreenExclusiveEXT](VkSurfaceCapabilitiesFullScreenExclusiveEXT.html)

If [VK_KHR_win32_surface](VK_KHR_win32_surface.html) is supported:

* 
Extending [VkPhysicalDeviceSurfaceInfo2KHR](VkPhysicalDeviceSurfaceInfo2KHR.html), [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html):

[VkSurfaceFullScreenExclusiveWin32InfoEXT](VkSurfaceFullScreenExclusiveWin32InfoEXT.html)

* 
[VkFullScreenExclusiveEXT](VkFullScreenExclusiveEXT.html)

* 
`VK_EXT_FULL_SCREEN_EXCLUSIVE_EXTENSION_NAME`

* 
`VK_EXT_FULL_SCREEN_EXCLUSIVE_SPEC_VERSION`

* 
Extending [VkResult](VkResult.html):

[VK_ERROR_FULL_SCREEN_EXCLUSIVE_MODE_LOST_EXT](VkResult.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_SURFACE_CAPABILITIES_FULL_SCREEN_EXCLUSIVE_EXT](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SURFACE_FULL_SCREEN_EXCLUSIVE_INFO_EXT](VkStructureType.html)

If [VK_KHR_win32_surface](VK_KHR_win32_surface.html) is supported:

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_SURFACE_FULL_SCREEN_EXCLUSIVE_WIN32_INFO_EXT](VkStructureType.html)

1) What should the extension & flag be called?

**RESOLVED**: VK_EXT_full_screen_exclusive.

Other options considered (prior to the app-controlled mode) were:

* 
VK_EXT_smooth_fullscreen_transition

* 
VK_EXT_fullscreen_behavior

* 
VK_EXT_fullscreen_preference

* 
VK_EXT_fullscreen_hint

* 
VK_EXT_fast_fullscreen_transition

* 
VK_EXT_avoid_fullscreen_exclusive

2) Do we need more than a boolean toggle?

**RESOLVED**: Yes.

Using an enum with default/allowed/disallowed/app-controlled enables
applications to accept driver default behavior, specifically override it in
either direction without implying the driver is ever required to use
full-screen exclusive mechanisms, or manage this mode explicitly.

3) Should this be a KHR or EXT extension?

**RESOLVED**: EXT, in order to allow it to be shipped faster.

4) Can the fullscreen hint affect the surface capabilities, and if so,
should the hint also be specified as input when querying the surface
capabilities?

**RESOLVED**: Yes on both accounts.

While the hint does not guarantee a particular fullscreen mode will be used
when the swapchain is created, it can sometimes imply particular modes will
NOT be used.
If the driver determines that it will opt-out of using a particular mode
based on the policy, and knows it can only support certain capabilities if
that mode is used, it would be confusing at best to the application to
report those capabilities in such cases.
Not allowing implementations to report this state to applications could
result in situations where applications are unable to determine why
swapchain creation fails when they specify certain hint values, which could
result in never- terminating surface creation loops.

5) Should full-screen be one word or two?

**RESOLVED**: Two words.

"Fullscreen" is not in my dictionary, and web searches did not turn up
definitive proof that it is a colloquially accepted compound word.
Documentation for the corresponding Windows API mechanisms dithers.
The text consistently uses a hyphen, but none-the-less, there is a
SetFullscreenState method in the DXGI swapchain object.
Given this inconclusive external guidance, it is best to adhere to the
Vulkan style guidelines and avoid inventing new compound words.

* 
Revision 4, 2019-03-12 (Tobias Hector)

Added application-controlled mode, and related functions

* 
Tidied up appendix

Revision 3, 2019-01-03 (James Jones)

* 
Renamed to VK_EXT_full_screen_exclusive

* 
Made related adjustments to the tri-state enumerant names.

Revision 2, 2018-11-27 (James Jones)

* 
Renamed to VK_KHR_fullscreen_behavior

* 
Switched from boolean flag to tri-state enum

Revision 1, 2018-11-06 (James Jones)

* 
Internal revision

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_full_screen_exclusive).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
