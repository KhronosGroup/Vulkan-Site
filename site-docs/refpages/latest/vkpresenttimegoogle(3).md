# VkPresentTimeGOOGLE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPresentTimeGOOGLE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPresentTimeGOOGLE - The earliest time image should be presented

The `VkPresentTimeGOOGLE` structure is defined as:

// Provided by VK_GOOGLE_display_timing
typedef struct VkPresentTimeGOOGLE {
    uint32_t    presentID;
    uint64_t    desiredPresentTime;
} VkPresentTimeGOOGLE;

* 
`presentID` is an application-provided identification value, that
**can** be used with the results of
[vkGetPastPresentationTimingGOOGLE](vkGetPastPresentationTimingGOOGLE.html), in order to uniquely identify
this present.
In order to be useful to the application, it **should** be unique within
some period of time that is meaningful to the application.

* 
`desiredPresentTime` specifies that the image given **should** not be
displayed to the user any earlier than this time.
`desiredPresentTime` is a time in nanoseconds, relative to a
monotonically-increasing clock (e.g. `CLOCK_MONOTONIC` (see
clock_gettime(2)) on Android and Linux).
A value of zero specifies that the presentation engine **may** display the
image at any time.
This is useful when the application desires to provide `presentID`,

but does not need a specific pname:desiredPresentTime.

[VK_GOOGLE_display_timing](VK_GOOGLE_display_timing.html), [VkPresentTimesInfoGOOGLE](VkPresentTimesInfoGOOGLE.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkPresentTimeGOOGLE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
