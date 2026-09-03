# VK_KHR_android_surface(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_android_surface.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_android_surface](#VK_KHR_android_surface)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Base Types](#_new_base_types)
- [New_Base_Types](#_new_base_types)
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

VK_KHR_android_surface - instance extension

**Name String**

`VK_KHR_android_surface`

**Extension Type**

Instance extension

**Registered Extension Number**

9

**Revision**

6

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_surface](VK_KHR_surface.html)

**Contact**

* 
Jesse Hall [critsec](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_android_surface] @critsec%0A*Here describe the issue or question you have about the VK_KHR_android_surface extension*)

**Last Modified Date**

2016-01-14

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

The `VK_KHR_android_surface` extension is an instance extension.
It provides a mechanism to create a [VkSurfaceKHR](VkSurfaceKHR.html) object (defined by
the `[VK_KHR_surface](VK_KHR_surface.html)` extension) that refers to an
`ANativeWindow`, Android’s native surface type.
The `ANativeWindow` represents the producer endpoint of any buffer
queue, regardless of consumer endpoint.
Common consumer endpoints for `ANativeWindows` are the system window
compositor, video encoders, and application-specific compositors importing
the images through a `SurfaceTexture`.

* 
`ANativeWindow`

* 
[vkCreateAndroidSurfaceKHR](vkCreateAndroidSurfaceKHR.html)

* 
[VkAndroidSurfaceCreateInfoKHR](VkAndroidSurfaceCreateInfoKHR.html)

* 
[VkAndroidSurfaceCreateFlagsKHR](VkAndroidSurfaceCreateFlagsKHR.html)

* 
`VK_KHR_ANDROID_SURFACE_EXTENSION_NAME`

* 
`VK_KHR_ANDROID_SURFACE_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_ANDROID_SURFACE_CREATE_INFO_KHR](VkStructureType.html)

1) Does Android need a way to query for compatibility between a particular
physical device (and queue family?) and a specific Android display?

**RESOLVED**: No.
Currently on Android, any physical device is expected to be able to present
to the system compositor, and all queue families must support the necessary
image layout transitions and synchronization operations.

* 
Revision 1, 2015-09-23 (Jesse Hall)

Initial draft.

Revision 2, 2015-10-26 (Ian Elliott)

* 
Renamed from VK_EXT_KHR_android_surface to VK_KHR_android_surface.

Revision 3, 2015-11-03 (Daniel Rakos)

* 
Added allocation callbacks to surface creation function.

Revision 4, 2015-11-10 (Jesse Hall)

* 
Removed VK_ERROR_INVALID_ANDROID_WINDOW_KHR.

Revision 5, 2015-11-28 (Daniel Rakos)

* 
Updated the surface create function to take a pCreateInfo structure.

Revision 6, 2016-01-14 (James Jones)

* 
Moved VK_ERROR_NATIVE_WINDOW_IN_USE_KHR from the VK_KHR_android_surface
to the VK_KHR_surface extension.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_android_surface).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
