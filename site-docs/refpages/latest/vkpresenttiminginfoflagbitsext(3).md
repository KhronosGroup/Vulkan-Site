# VkPresentTimingInfoFlagBitsEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPresentTimingInfoFlagBitsEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPresentTimingInfoFlagBitsEXT - Bitmask specifying present timing info flags

Bits which **can** be set in [VkPresentTimingInfoEXT](VkPresentTimingInfoEXT.html)::`flags`,
specifying options for how to interpret timing information:

// Provided by VK_EXT_present_timing
typedef enum VkPresentTimingInfoFlagBitsEXT {
    VK_PRESENT_TIMING_INFO_PRESENT_AT_RELATIVE_TIME_BIT_EXT = 0x00000001,
    VK_PRESENT_TIMING_INFO_PRESENT_AT_NEAREST_REFRESH_CYCLE_BIT_EXT = 0x00000002,
} VkPresentTimingInfoFlagBitsEXT;

* 
[VK_PRESENT_TIMING_INFO_PRESENT_AT_RELATIVE_TIME_BIT_EXT](#) specifies
that `VkPresentTimingInfoEXT`::`targetTime` is to be interpreted
as a relative time from the previous presentation’s
[VK_PRESENT_STAGE_IMAGE_FIRST_PIXEL_VISIBLE_BIT_EXT](VkPresentStageFlagBitsEXT.html) stage.
If the `swapchain` has never been used to present an image, the
provided `targetTime` is ignored.

* 
[VK_PRESENT_TIMING_INFO_PRESENT_AT_NEAREST_REFRESH_CYCLE_BIT_EXT](#)
specifies that the application would prefer the image to be presented
earlier than the time specified in
`VkPresentTimingInfoEXT`::`targetTime` if that time falls within
the first half of a refresh cycle.
In that case, the presentation engine **may** choose to display the image
at the start of that refresh cycle.

[VK_EXT_present_timing](VK_EXT_present_timing.html), [VkPresentTimingInfoFlagsEXT](VkPresentTimingInfoFlagsEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkPresentTimingInfoFlagBitsEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
