# VkPastPresentationTimingGOOGLE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPastPresentationTimingGOOGLE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPastPresentationTimingGOOGLE - Structure containing timing information about a previously-presented image

The `VkPastPresentationTimingGOOGLE` structure is defined as:

// Provided by VK_GOOGLE_display_timing
typedef struct VkPastPresentationTimingGOOGLE {
    uint32_t    presentID;
    uint64_t    desiredPresentTime;
    uint64_t    actualPresentTime;
    uint64_t    earliestPresentTime;
    uint64_t    presentMargin;
} VkPastPresentationTimingGOOGLE;

* 
`presentID` is an application-provided value that was given to a
previous `vkQueuePresentKHR` command via
[VkPresentTimeGOOGLE](VkPresentTimeGOOGLE.html)::`presentID` (see below).
It **can** be used to uniquely identify a previous present with the
[vkQueuePresentKHR](vkQueuePresentKHR.html) command.

* 
`desiredPresentTime` is an application-provided value that was given
to a previous [vkQueuePresentKHR](vkQueuePresentKHR.html) command via
[VkPresentTimeGOOGLE](VkPresentTimeGOOGLE.html)::`desiredPresentTime`.
If non-zero, it was used by the application to indicate that an image
not be presented any sooner than `desiredPresentTime`.

* 
`actualPresentTime` is the time when the image of the
`swapchain` was actually displayed.

* 
`earliestPresentTime` is the time when the image of the
`swapchain` could have been displayed.
This **may** differ from `actualPresentTime` if the application
requested that the image be presented no sooner than
[VkPresentTimeGOOGLE](VkPresentTimeGOOGLE.html)::`desiredPresentTime`.

* 
`presentMargin` is an indication of how early the
`vkQueuePresentKHR` command was processed compared to how soon it
needed to be processed, and still be presented at
`earliestPresentTime`.

The results for a given `swapchain` and `presentID` are only
returned once from `vkGetPastPresentationTimingGOOGLE`.

The application **can** use the `VkPastPresentationTimingGOOGLE` values to
occasionally adjust its timing.
For example, if `actualPresentTime` is later than expected (e.g. one
`refreshDuration` late), the application may increase its target IPD to
a higher multiple of `refreshDuration` (e.g. decrease its frame rate
from 60Hz to 30Hz).
If `actualPresentTime` and `earliestPresentTime` are consistently
different, and if `presentMargin` is consistently large enough, the
application may decrease its target IPD to a smaller multiple of
`refreshDuration` (e.g. increase its frame rate from 30Hz to 60Hz).
If `actualPresentTime` and `earliestPresentTime` are same, and if
`presentMargin` is consistently high, the application may delay the
start of its input-render-present loop in order to decrease the latency
between user input and the corresponding present (always leaving some margin
in case a new image takes longer to render than the previous image).
An application that desires its target IPD to always be the same as
`refreshDuration`, can also adjust features until
`actualPresentTime` is never late and `presentMargin` is
satisfactory.

[VK_GOOGLE_display_timing](VK_GOOGLE_display_timing.html), [vkGetPastPresentationTimingGOOGLE](vkGetPastPresentationTimingGOOGLE.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkPastPresentationTimingGOOGLE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
