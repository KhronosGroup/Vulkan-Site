# vkGetPastPresentationTimingEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPastPresentationTimingEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPastPresentationTimingEXT - Obtain timing of previously-presented images

Because of the asynchronous nature of the presentation engine, the timing
information for a given [vkQueuePresentKHR](vkQueuePresentKHR.html) command **may** only becomes
available some time after the presentation has occurred.
These time values **should** be asynchronously queried, and are returned if
available.
All time values are in nanoseconds, according to the time-domain being used.

To asynchronously query the presentation engine for newly-available timing
information about one or more previous presents to a given swapchain, call:

// Provided by VK_EXT_present_timing
VkResult vkGetPastPresentationTimingEXT(
    VkDevice                                    device,
    const VkPastPresentationTimingInfoEXT*      pPastPresentationTimingInfo,
    VkPastPresentationTimingPropertiesEXT*      pPastPresentationTimingProperties);

* 
`device` is the device associated with `swapchain`.

* 
`pPastPresentationTimingInfo` is a pointer to an instance of the
[VkPastPresentationTimingInfoEXT](VkPastPresentationTimingInfoEXT.html) structure.

* 
`pPastPresentationTimingProperties` is a pointer to an instance of
the [VkPastPresentationTimingPropertiesEXT](VkPastPresentationTimingPropertiesEXT.html) structure.

If upon return the value of
`VkPastPresentationTimingPropertiesEXT`::`presentationTimingCount`
is less than the number of available timing records for the given
`VkPastPresentationTimingInfoEXT`::`swapchain`, [VK_INCOMPLETE](VkResult.html)
is returned instead of [VK_SUCCESS](VkResult.html) to indicate that not all the
available values were returned.

Upon return, zero or more slots of the `swapchain` internal timing
results queue, equal to the number of entries written to
`VkPastPresentationTimingPropertiesEXT`::`pPresentationTimings` for
which `reportComplete` is [VK_TRUE](VK_TRUE.html), are made available for future
`vkQueuePresentKHR` calls.
Elements of `pPresentationTimings` are arranged in ascending order of
present ids.

Timing information **may** become available out of order with regards to their
associated [vkQueuePresentKHR](vkQueuePresentKHR.html) order.
[VK_PAST_PRESENTATION_TIMING_ALLOW_OUT_OF_ORDER_RESULTS_BIT_EXT](VkPastPresentationTimingFlagBitsEXT.html) **can** be
set in `VkPastPresentationTimingInfoEXT`::`flags` to allow
`vkGetPastPresentationTimingEXT` to return results in that same order.
Otherwise, results are returned in the order of their associated
[vkQueuePresentKHR](vkQueuePresentKHR.html) calls.

There is no requirement for any precise timing relationship between the
completion of a present stage and the availability of any associated timing
information.
However, results **must** be made available in finite time.

As an exception to the normal rules for objects which are externally
synchronized, `swapchain` **may** be simultaneously used by other threads
in calls to functions other than [vkDestroySwapchainKHR](vkDestroySwapchainKHR.html) and
[vkCreateSwapchainKHR](vkCreateSwapchainKHR.html) with `swapchain` used as an
`oldSwapchain`.
Access to the swapchain timing information **must** be atomic within the
implementation.

Valid Usage

* 
[](#VUID-vkGetPastPresentationTimingEXT-flags-12230) VUID-vkGetPastPresentationTimingEXT-flags-12230

If [VK_PAST_PRESENTATION_TIMING_ALLOW_OUT_OF_ORDER_RESULTS_BIT_EXT](VkPastPresentationTimingFlagBitsEXT.html)
is set in `VkPastPresentationTimingInfoEXT`::`flags`, the
`presentStageCount` value of each element of
`VkPastPresentationTimingPropertiesEXT`::`pPresentationTimings`
**must** be at least the maximum number of present stages set in
[VkPresentTimingInfoEXT](VkPresentTimingInfoEXT.html)::`presentStageQueries` among all
[vkQueuePresentKHR](vkQueuePresentKHR.html) calls, with a non-zero
`presentStageQueries`, for which complete results have not been
returned yet by a previous call

* 
[](#VUID-vkGetPastPresentationTimingEXT-flags-12231) VUID-vkGetPastPresentationTimingEXT-flags-12231

If [VK_PAST_PRESENTATION_TIMING_ALLOW_OUT_OF_ORDER_RESULTS_BIT_EXT](VkPastPresentationTimingFlagBitsEXT.html)
is not set in `VkPastPresentationTimingInfoEXT`::`flags`, the
`presentStageCount` value of each element of
`VkPastPresentationTimingPropertiesEXT`::`pPresentationTimings`
**must** be at least the number of present stages set in
`VkPresentTimingInfoEXT`::`presentStageQueries` for the earliest
call to `vkQueuePresentKHR`, with a non-zero
`presentStageQueries`, that corresponds to that element’s index and
for which complete results have not been returned yet by a previous call

Valid Usage (Implicit)

* 
[](#VUID-vkGetPastPresentationTimingEXT-device-parameter) VUID-vkGetPastPresentationTimingEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetPastPresentationTimingEXT-pPastPresentationTimingInfo-parameter) VUID-vkGetPastPresentationTimingEXT-pPastPresentationTimingInfo-parameter

 `pPastPresentationTimingInfo` **must** be a valid pointer to a valid [VkPastPresentationTimingInfoEXT](VkPastPresentationTimingInfoEXT.html) structure

* 
[](#VUID-vkGetPastPresentationTimingEXT-pPastPresentationTimingProperties-parameter) VUID-vkGetPastPresentationTimingEXT-pPastPresentationTimingProperties-parameter

 `pPastPresentationTimingProperties` **must** be a valid pointer to a [VkPastPresentationTimingPropertiesEXT](VkPastPresentationTimingPropertiesEXT.html) structure

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](VkResult.html)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_DEVICE_LOST](VkResult.html)

* 
[VK_ERROR_OUT_OF_DATE_KHR](VkResult.html)

* 
[VK_ERROR_SURFACE_LOST_KHR](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_EXT_present_timing](VK_EXT_present_timing.html), [VkDevice](VkDevice.html), [VkPastPresentationTimingInfoEXT](VkPastPresentationTimingInfoEXT.html), [VkPastPresentationTimingPropertiesEXT](VkPastPresentationTimingPropertiesEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetPastPresentationTimingEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
