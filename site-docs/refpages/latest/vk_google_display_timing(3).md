# VK_GOOGLE_display_timing(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_GOOGLE_display_timing.html

## Table of Contents

- [Name](#_name)
- [VK_GOOGLE_display_timing](#VK_GOOGLE_display_timing)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_GOOGLE_display_timing - device extension

**Name String**

`VK_GOOGLE_display_timing`

**Extension Type**

Device extension

**Registered Extension Number**

93

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

[VK_KHR_swapchain](VK_KHR_swapchain.html)

**Contact**

* 
Ian Elliott [ianelliottus](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_GOOGLE_display_timing] @ianelliottus%0A*Here describe the issue or question you have about the VK_GOOGLE_display_timing extension*)

**Last Modified Date**

2017-02-14

**IP Status**

No known IP claims.

**Contributors**

* 
Ian Elliott, Google

* 
Jesse Hall, Google

This device extension allows an application that uses the
`[VK_KHR_swapchain](VK_KHR_swapchain.html)` extension to obtain information about the
presentation engine’s display, to obtain timing information about each
present, and to schedule a present to happen no earlier than a desired time.
An application can use this to minimize various visual anomalies (e.g.
stuttering).

Traditional game and real-time animation applications need to correctly
position their geometry for when the presentable image will be presented to
the user.
To accomplish this, applications need various timing information about the
presentation engine’s display.
They need to know when presentable images were actually presented, and when
they could have been presented.
Applications also need to tell the presentation engine to display an image
no sooner than a given time.
This allows the application to avoid stuttering, so the animation looks
smooth to the user.

This extension treats variable-refresh-rate (VRR) displays as if they are
fixed-refresh-rate (FRR) displays.

* 
[vkGetPastPresentationTimingGOOGLE](vkGetPastPresentationTimingGOOGLE.html)

* 
[vkGetRefreshCycleDurationGOOGLE](vkGetRefreshCycleDurationGOOGLE.html)

* 
[VkPastPresentationTimingGOOGLE](VkPastPresentationTimingGOOGLE.html)

* 
[VkPresentTimeGOOGLE](VkPresentTimeGOOGLE.html)

* 
[VkRefreshCycleDurationGOOGLE](VkRefreshCycleDurationGOOGLE.html)

* 
Extending [VkPresentInfoKHR](VkPresentInfoKHR.html):

[VkPresentTimesInfoGOOGLE](VkPresentTimesInfoGOOGLE.html)

* 
`VK_GOOGLE_DISPLAY_TIMING_EXTENSION_NAME`

* 
`VK_GOOGLE_DISPLAY_TIMING_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_PRESENT_TIMES_INFO_GOOGLE](VkStructureType.html)

|  | The example code for the this extension (like the `[VK_KHR_surface](VK_KHR_surface.html)`
| --- | --- |
and `VK_GOOGLE_display_timing` extensions) is contained in the cube demo
that is shipped with the official Khronos SDK, and is being kept up-to-date
in that location (see:
[https://github.com/KhronosGroup/Vulkan-Tools/blob/main/cube/cube.c](https://github.com/KhronosGroup/Vulkan-Tools/blob/main/cube/cube.c) ). |

* 
Revision 1, 2017-02-14 (Ian Elliott)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_GOOGLE_display_timing).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
