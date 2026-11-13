# VK_EXT_acquire_xlib_display(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_acquire_xlib_display.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_acquire_xlib_display](#VK_EXT_acquire_xlib_display)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_acquire_xlib_display - instance extension

**Name String**

`VK_EXT_acquire_xlib_display`

**Extension Type**

Instance extension

**Registered Extension Number**

90

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_EXT_direct_mode_display](VK_EXT_direct_mode_display.html)

**Contact**

* 
James Jones [cubanismo](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_acquire_xlib_display] @cubanismo%0A*Here describe the issue or question you have about the VK_EXT_acquire_xlib_display extension*)

**Last Modified Date**

2016-12-13

**IP Status**

No known IP claims.

**Contributors**

* 
Dave Airlie, Red Hat

* 
Pierre Boudier, NVIDIA

* 
James Jones, NVIDIA

* 
Damien Leone, NVIDIA

* 
Pierre-Loup Griffais, Valve

* 
Liam Middlebrook, NVIDIA

* 
Daniel Vetter, Intel

This extension allows an application to take exclusive control on a display
currently associated with an X11 screen.
When control is acquired, the display will be deassociated from the X11
screen until control is released or the specified display connection is
closed.
Essentially, the X11 screen will behave as if the monitor has been unplugged
until control is released.

* 
[vkAcquireXlibDisplayEXT](vkAcquireXlibDisplayEXT.html)

* 
[vkGetRandROutputDisplayEXT](vkGetRandROutputDisplayEXT.html)

* 
`VK_EXT_ACQUIRE_XLIB_DISPLAY_EXTENSION_NAME`

* 
`VK_EXT_ACQUIRE_XLIB_DISPLAY_SPEC_VERSION`

1) Should [vkAcquireXlibDisplayEXT](vkAcquireXlibDisplayEXT.html) take an RandR display ID, or a
Vulkan display handle as input?

**RESOLVED**: A Vulkan display handle.
Otherwise there would be no way to specify handles to displays that had been
prevented from being included in the X11 display list by some native
platform or vendor-specific mechanism.

2) How does an application figure out which RandR display corresponds to a
Vulkan display?

**RESOLVED**: A new function, [vkGetRandROutputDisplayEXT](vkGetRandROutputDisplayEXT.html), is introduced
for this purpose.

3) Should [vkGetRandROutputDisplayEXT](vkGetRandROutputDisplayEXT.html) be part of this extension, or a
general Vulkan / RandR or Vulkan / Xlib extension?

**RESOLVED**: To avoid yet another extension, include it in this extension.

* 
Revision 1, 2016-12-13 (James Jones)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_acquire_xlib_display).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
