# VK_EXT_headless_surface(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_headless_surface.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_headless_surface](#VK_EXT_headless_surface)
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

VK_EXT_headless_surface - instance extension

**Name String**

`VK_EXT_headless_surface`

**Extension Type**

Instance extension

**Registered Extension Number**

257

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_surface](VK_KHR_surface.html)

**Contact**

* 
Lisa Wu [chengtianww](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_headless_surface] @chengtianww%0A*Here describe the issue or question you have about the VK_EXT_headless_surface extension*)

**Last Modified Date**

2019-03-21

**IP Status**

No known IP claims.

**Contributors**

* 
Ray Smith, Arm

The `VK_EXT_headless_surface` extension is an instance extension.
It provides a mechanism to create [VkSurfaceKHR](VkSurfaceKHR.html) objects independently
of any window system or display device.
The presentation operation for a swapchain created from a headless surface
is by default a no-op, resulting in no externally-visible result.

Because there is no real presentation target, future extensions can layer on
top of the headless surface to introduce arbitrary or customizable sets of
restrictions or features.
These could include features like saving to a file or restrictions to
emulate a particular presentation target.

This functionality is expected to be useful for application and driver
development because it allows any platform to expose an arbitrary or
customizable set of restrictions and features of a presentation engine.
This makes it a useful portable test target for applications targeting a
wide range of presentation engines where the actual target presentation
engines might be scarce, unavailable, or otherwise undesirable or
inconvenient to use for general Vulkan application development.

* 
[vkCreateHeadlessSurfaceEXT](vkCreateHeadlessSurfaceEXT.html)

* 
[VkHeadlessSurfaceCreateInfoEXT](VkHeadlessSurfaceCreateInfoEXT.html)

* 
[VkHeadlessSurfaceCreateFlagsEXT](VkHeadlessSurfaceCreateFlagsEXT.html)

* 
`VK_EXT_HEADLESS_SURFACE_EXTENSION_NAME`

* 
`VK_EXT_HEADLESS_SURFACE_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_HEADLESS_SURFACE_CREATE_INFO_EXT](VkStructureType.html)

* 
Revision 1, 2019-03-21 (Ray Smith)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_headless_surface).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
