# VkPastPresentationTimingFlagBitsEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPastPresentationTimingFlagBitsEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPastPresentationTimingFlagBitsEXT - Bitmask specifying past presentation timing query flags

Bits which **can** be set in
[VkPastPresentationTimingInfoEXT](VkPastPresentationTimingInfoEXT.html)::`flags`, specifying options for
queries of past presentation timing information, are:

// Provided by VK_EXT_present_timing
typedef enum VkPastPresentationTimingFlagBitsEXT {
    VK_PAST_PRESENTATION_TIMING_ALLOW_PARTIAL_RESULTS_BIT_EXT = 0x00000001,
    VK_PAST_PRESENTATION_TIMING_ALLOW_OUT_OF_ORDER_RESULTS_BIT_EXT = 0x00000002,
} VkPastPresentationTimingFlagBitsEXT;

* 
[VK_PAST_PRESENTATION_TIMING_ALLOW_PARTIAL_RESULTS_BIT_EXT](#)
specifies that [vkGetPastPresentationTimingEXT](vkGetPastPresentationTimingEXT.html) **may** return partial
results for presentation requests that have not completed all requested
present stages.

* 
[VK_PAST_PRESENTATION_TIMING_ALLOW_OUT_OF_ORDER_RESULTS_BIT_EXT](#)
specifies that [vkGetPastPresentationTimingEXT](vkGetPastPresentationTimingEXT.html) **may** return results
out of order with respect to the presentation order.

[VK_EXT_present_timing](VK_EXT_present_timing.html), [VkPastPresentationTimingFlagsEXT](VkPastPresentationTimingFlagsEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#VkPastPresentationTimingFlagBitsEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
