# VK_QNX_screen_surface(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_QNX_screen_surface.html

## Table of Contents

- [Name](#_name)
- [VK_QNX_screen_surface](#VK_QNX_screen_surface)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Bitmasks](#_new_bitmasks)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_QNX_screen_surface - instance extension

**Name String**

`VK_QNX_screen_surface`

**Extension Type**

Instance extension

**Registered Extension Number**

379

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_surface](VK_KHR_surface.html)

**Contact**

* 
Mike Gorchak [mgorchak-blackberry](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_QNX_screen_surface] @mgorchak-blackberry%0A*Here describe the issue or question you have about the VK_QNX_screen_surface extension*)

**Last Modified Date**

2021-01-11

**IP Status**

No known IP claims.

**Contributors**

* 
Mike Gorchak, BlackBerry Limited

The `VK_QNX_screen_surface` extension is an instance extension.
It provides a mechanism to create a [VkSurfaceKHR](VkSurfaceKHR.html) object (defined by
the `[VK_KHR_surface](VK_KHR_surface.html)` extension) that refers to a QNX Screen
`window`, as well as a query to determine support for rendering to a QNX
Screen compositor.

* 
[vkCreateScreenSurfaceQNX](vkCreateScreenSurfaceQNX.html)

* 
[vkGetPhysicalDeviceScreenPresentationSupportQNX](vkGetPhysicalDeviceScreenPresentationSupportQNX.html)

* 
[VkScreenSurfaceCreateInfoQNX](VkScreenSurfaceCreateInfoQNX.html)

* 
[VkScreenSurfaceCreateFlagsQNX](VkScreenSurfaceCreateFlagsQNX.html)

* 
`VK_QNX_SCREEN_SURFACE_EXTENSION_NAME`

* 
`VK_QNX_SCREEN_SURFACE_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_SCREEN_SURFACE_CREATE_INFO_QNX](VkStructureType.html)

* 
Revision 1, 2021-01-11 (Mike Gorchak)

Initial draft.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_QNX_screen_surface).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
