# VK_KHR_display_swapchain(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_display_swapchain.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_display_swapchain](#VK_KHR_display_swapchain)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_display_swapchain - device extension

**Name String**

`VK_KHR_display_swapchain`

**Extension Type**

Device extension

**Registered Extension Number**

4

**Revision**

10

**Ratification Status**

Ratified

**Extension and Version Dependencies**

[VK_KHR_swapchain](VK_KHR_swapchain.html)

and

[VK_KHR_display](VK_KHR_display.html)

**Contact**

* 
James Jones [cubanismo](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_display_swapchain] @cubanismo%0A*Here describe the issue or question you have about the VK_KHR_display_swapchain extension*)

**Last Modified Date**

2017-03-13

**IP Status**

No known IP claims.

**Contributors**

* 
James Jones, NVIDIA

* 
Jeff Vigil, Qualcomm

* 
Jesse Hall, Google

This extension provides an API to create a swapchain directly on a device’s
display without any underlying window system.

* 
[vkCreateSharedSwapchainsKHR](vkCreateSharedSwapchainsKHR.html)

* 
Extending [VkPresentInfoKHR](VkPresentInfoKHR.html):

[VkDisplayPresentInfoKHR](VkDisplayPresentInfoKHR.html)

* 
`VK_KHR_DISPLAY_SWAPCHAIN_EXTENSION_NAME`

* 
`VK_KHR_DISPLAY_SWAPCHAIN_SPEC_VERSION`

* 
Extending [VkResult](VkResult.html):

[VK_ERROR_INCOMPATIBLE_DISPLAY_KHR](VkResult.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_DISPLAY_PRESENT_INFO_KHR](VkStructureType.html)

1) Should swapchains sharing images each hold a reference to the images, or
should it be up to the application to destroy the swapchains and images in
an order that avoids the need for reference counting?

**RESOLVED**: Take a reference.
The lifetime of presentable images is already complex enough.

2) Should the `srcRect` and `dstRect` parameters be specified as
part of the presentation command, or at swapchain creation time?

**RESOLVED**: As part of the presentation command.
This allows moving and scaling the image on the screen without the need to
respecify the mode or create a new swapchain and presentable images.

3) Should `srcRect` and `dstRect` be specified as rects, or separate
offset/extent values?

**RESOLVED**: As rects.
Specifying them separately might make it easier for hardware to expose
support for one but not the other, but in such cases applications must just
take care to obey the reported capabilities and not use non-zero offsets or
extents that require scaling, as appropriate.

4) How can applications create multiple swapchains that use the same images?

**RESOLVED**: By calling [vkCreateSharedSwapchainsKHR](vkCreateSharedSwapchainsKHR.html).

An earlier resolution used [vkCreateSwapchainKHR](vkCreateSwapchainKHR.html), chaining multiple
[VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html) structures through `pNext`.
In order to allow each swapchain to also allow other extension structs, a
level of indirection was used: [VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html)::`pNext`
pointed to a different structure, which had both `sType` and `pNext`
members for additional extensions, and also had a pointer to the next
[VkSwapchainCreateInfoKHR](VkSwapchainCreateInfoKHR.html) structure.
The number of swapchains to be created could only be found by walking this
linked list of alternating structures, and the `pSwapchains` out
parameter was reinterpreted to be an array of [VkSwapchainKHR](VkSwapchainKHR.html) handles.

Another option considered was a method to specify a “shared” swapchain
when creating a new swapchain, such that groups of swapchains using the same
images could be built up one at a time.
This was deemed unusable because drivers need to know all of the displays an
image will be used on when determining which internal formats and layouts to
use for that image.

5) Can [VkDisplayPresentInfoKHR](VkDisplayPresentInfoKHR.html) be used without calling
[vkCreateSharedSwapchainsKHR](vkCreateSharedSwapchainsKHR.html)?

**RESOLVED**: Yes.

The two bits of functionality were meant to be independent.
If the extension was created today, there would likely be two feature bits
for [VkDisplayPresentInfoKHR](VkDisplayPresentInfoKHR.html) and [vkCreateSharedSwapchainsKHR](vkCreateSharedSwapchainsKHR.html).

|  | The example code for the `[VK_KHR_display](VK_KHR_display.html)` and
| --- | --- |
`VK_KHR_display_swapchain` extensions was removed from the appendix after
revision 1.0.43.
The display swapchain creation example code was ported to the cube demo that
is shipped with the official Khronos SDK, and is being kept up-to-date in
that location (see:
[https://github.com/KhronosGroup/Vulkan-Tools/blob/main/cube/cube.c](https://github.com/KhronosGroup/Vulkan-Tools/blob/main/cube/cube.c)). |

* 
Revision 1, 2015-07-29 (James Jones)

Initial draft

Revision 2, 2015-08-21 (Ian Elliott)

* 
Renamed this extension and all of its enumerations, types, functions,
etc.
This makes it compliant with the proposed standard for Vulkan
extensions.

* 
Switched from “revision” to “version”, including use of the
VK_MAKE_VERSION macro in the header file.

Revision 3, 2015-09-01 (James Jones)

* 
Restore single-field revision number.

Revision 4, 2015-09-08 (James Jones)

* 
Allow creating multiple swapchains that share the same images using a
single call to vkCreateSwapchainKHR().

Revision 5, 2015-09-10 (Alon Or-bach)

* 
Removed underscores from SWAP_CHAIN in two enums.

Revision 6, 2015-10-02 (James Jones)

* 
Added support for smart panels/buffered displays.

Revision 7, 2015-10-26 (Ian Elliott)

* 
Renamed from VK_EXT_KHR_display_swapchain to VK_KHR_display_swapchain.

Revision 8, 2015-11-03 (Daniel Rakos)

* 
Updated sample code based on the changes to VK_KHR_swapchain.

Revision 9, 2015-11-10 (Jesse Hall)

* 
Replaced VkDisplaySwapchainCreateInfoKHR with
vkCreateSharedSwapchainsKHR, changing resolution of issue #4.

Revision 10, 2017-03-13 (James Jones)

* 
Closed all remaining issues.
The specification and implementations have been shipping with the
proposed resolutions for some time now.

* 
Removed the sample code and noted it has been integrated into the
official Vulkan SDK cube demo.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_display_swapchain).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
