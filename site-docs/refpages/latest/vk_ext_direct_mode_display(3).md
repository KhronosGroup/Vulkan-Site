# VK_EXT_direct_mode_display(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_direct_mode_display.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_direct_mode_display](#VK_EXT_direct_mode_display)
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

VK_EXT_direct_mode_display - instance extension

**Name String**

`VK_EXT_direct_mode_display`

**Extension Type**

Instance extension

**Registered Extension Number**

89

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_display](VK_KHR_display.html)

**Contact**

* 
James Jones [cubanismo](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_direct_mode_display] @cubanismo%0A*Here describe the issue or question you have about the VK_EXT_direct_mode_display extension*)

**Last Modified Date**

2016-12-13

**IP Status**

No known IP claims.

**Contributors**

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

This is extension, along with related platform extensions, allows
applications to take exclusive control of displays associated with a native
windowing system.
This is especially useful for virtual reality applications that wish to hide
HMDs (head mounted displays) from the native platform’s display management
system, desktop, and/or other applications.

* 
[vkReleaseDisplayEXT](vkReleaseDisplayEXT.html)

* 
`VK_EXT_DIRECT_MODE_DISPLAY_EXTENSION_NAME`

* 
`VK_EXT_DIRECT_MODE_DISPLAY_SPEC_VERSION`

1) Should this extension and its related platform-specific extensions
leverage `[VK_KHR_display](VK_KHR_display.html)`, or provide separate equivalent interfaces.

**RESOLVED**: Use `[VK_KHR_display](VK_KHR_display.html)` concepts and objects.
`[VK_KHR_display](VK_KHR_display.html)` can be used to enumerate all displays on the system,
including those attached to/in use by a window system or native platform,
but `[VK_KHR_display_swapchain](VK_KHR_display_swapchain.html)` will fail to create a swapchain on
in-use displays.
This extension and its platform-specific children will allow applications to
grab in-use displays away from window systems and/or native platforms,
allowing them to be used with `[VK_KHR_display_swapchain](VK_KHR_display_swapchain.html)`.

2) Are separate calls needed to acquire displays and enable direct mode?

**RESOLVED**: No, these operations happen in one combined command.
Acquiring a display puts it into direct mode.

* 
Revision 1, 2016-12-13 (James Jones)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_direct_mode_display).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
