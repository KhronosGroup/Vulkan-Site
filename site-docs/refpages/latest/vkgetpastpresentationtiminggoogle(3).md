# vkGetPastPresentationTimingGOOGLE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPastPresentationTimingGOOGLE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPastPresentationTimingGOOGLE - Obtain timing of a previously-presented image

The implementation will maintain a limited amount of history of timing
information about previous presents.
Because of the asynchronous nature of the presentation engine, the timing
information for a given [vkQueuePresentKHR](vkQueuePresentKHR.html) command will become
available some time later.
These time values can be asynchronously queried, and will be returned if
available.
All time values are in nanoseconds, relative to a monotonically-increasing
clock (e.g. `CLOCK_MONOTONIC` (see clock_gettime(2)) on Android and Linux).

To asynchronously query the presentation engine, for newly-available timing
information about one or more previous presents to a given swapchain, call:

// Provided by VK_GOOGLE_display_timing
VkResult vkGetPastPresentationTimingGOOGLE(
    VkDevice                                    device,
    VkSwapchainKHR                              swapchain,
    uint32_t*                                   pPresentationTimingCount,
    VkPastPresentationTimingGOOGLE*             pPresentationTimings);

* 
`device` is the device associated with `swapchain`.

* 
`swapchain` is the swapchain to obtain presentation timing
information duration for.

* 
`pPresentationTimingCount` is a pointer to an integer related to the
number of `VkPastPresentationTimingGOOGLE` structures to query, as
described below.

* 
`pPresentationTimings` is either `NULL` or a pointer to an array of
`VkPastPresentationTimingGOOGLE` structures.

If `pPresentationTimings` is `NULL`, then the number of newly-available
timing records for the given `swapchain` is returned in
`pPresentationTimingCount`.
Otherwise, `pPresentationTimingCount` **must** point to a variable set by
the user to the number of elements in the `pPresentationTimings` array,
and on return the variable is overwritten with the number of structures
actually written to `pPresentationTimings`.
If the value of `pPresentationTimingCount` is less than the number of
newly-available timing records, at most `pPresentationTimingCount`
structures will be written, and [VK_INCOMPLETE](VkResult.html) will be returned instead
of [VK_SUCCESS](VkResult.html), to indicate that not all the available timing records
were returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPastPresentationTimingGOOGLE-device-parameter) VUID-vkGetPastPresentationTimingGOOGLE-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetPastPresentationTimingGOOGLE-swapchain-parameter) VUID-vkGetPastPresentationTimingGOOGLE-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](VkSwapchainKHR.html) handle

* 
[](#VUID-vkGetPastPresentationTimingGOOGLE-pPresentationTimingCount-parameter) VUID-vkGetPastPresentationTimingGOOGLE-pPresentationTimingCount-parameter

 `pPresentationTimingCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPastPresentationTimingGOOGLE-pPresentationTimings-parameter) VUID-vkGetPastPresentationTimingGOOGLE-pPresentationTimings-parameter

 If the value referenced by `pPresentationTimingCount` is not `0`, and `pPresentationTimings` is not `NULL`, `pPresentationTimings` **must** be a valid pointer to an array of `pPresentationTimingCount` [VkPastPresentationTimingGOOGLE](VkPastPresentationTimingGOOGLE.html) structures

* 
[](#VUID-vkGetPastPresentationTimingGOOGLE-swapchain-parent) VUID-vkGetPastPresentationTimingGOOGLE-swapchain-parent

 `swapchain` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `swapchain` **must** be externally synchronized

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
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_SURFACE_LOST_KHR](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_GOOGLE_display_timing](VK_GOOGLE_display_timing.html), [VkDevice](VkDevice.html), [VkPastPresentationTimingGOOGLE](VkPastPresentationTimingGOOGLE.html), [VkSwapchainKHR](VkSwapchainKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetPastPresentationTimingGOOGLE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
