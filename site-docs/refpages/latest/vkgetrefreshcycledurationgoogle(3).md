# vkGetRefreshCycleDurationGOOGLE(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetRefreshCycleDurationGOOGLE.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetRefreshCycleDurationGOOGLE - Obtain the RC duration of the PE’s display

To query the duration of a refresh cycle (RC) for the presentation engine’s
display, call:

// Provided by VK_GOOGLE_display_timing
VkResult vkGetRefreshCycleDurationGOOGLE(
    VkDevice                                    device,
    VkSwapchainKHR                              swapchain,
    VkRefreshCycleDurationGOOGLE*               pDisplayTimingProperties);

* 
`device` is the device associated with `swapchain`.

* 
`swapchain` is the swapchain to obtain the refresh duration for.

* 
`pDisplayTimingProperties` is a pointer to a
`VkRefreshCycleDurationGOOGLE` structure.

Valid Usage (Implicit)

* 
[](#VUID-vkGetRefreshCycleDurationGOOGLE-device-parameter) VUID-vkGetRefreshCycleDurationGOOGLE-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetRefreshCycleDurationGOOGLE-swapchain-parameter) VUID-vkGetRefreshCycleDurationGOOGLE-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](VkSwapchainKHR.html) handle

* 
[](#VUID-vkGetRefreshCycleDurationGOOGLE-pDisplayTimingProperties-parameter) VUID-vkGetRefreshCycleDurationGOOGLE-pDisplayTimingProperties-parameter

 `pDisplayTimingProperties` **must** be a valid pointer to a [VkRefreshCycleDurationGOOGLE](VkRefreshCycleDurationGOOGLE.html) structure

* 
[](#VUID-vkGetRefreshCycleDurationGOOGLE-swapchain-parent) VUID-vkGetRefreshCycleDurationGOOGLE-swapchain-parent

 `swapchain` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `swapchain` **must** be externally synchronized

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_DEVICE_LOST](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_SURFACE_LOST_KHR](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_GOOGLE_display_timing](VK_GOOGLE_display_timing.html), [VkDevice](VkDevice.html), [VkRefreshCycleDurationGOOGLE](VkRefreshCycleDurationGOOGLE.html), [VkSwapchainKHR](VkSwapchainKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetRefreshCycleDurationGOOGLE).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
