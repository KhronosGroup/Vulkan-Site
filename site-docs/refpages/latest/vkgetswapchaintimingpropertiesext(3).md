# vkGetSwapchainTimingPropertiesEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetSwapchainTimingPropertiesEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetSwapchainTimingPropertiesEXT - Obtain the display timing properties of the PE’s display

The implementation maintains an internal monotonically increasing counter
which updates when the presentation engine’s timing properties are modified.

To query the presentation engine’s current timing properties for a given
swapchain, call:

// Provided by VK_EXT_present_timing
VkResult vkGetSwapchainTimingPropertiesEXT(
    VkDevice                                    device,
    VkSwapchainKHR                              swapchain,
    VkSwapchainTimingPropertiesEXT*             pSwapchainTimingProperties,
    uint64_t*                                   pSwapchainTimingPropertiesCounter);

* 
`device` is the device associated with `swapchain`.

* 
`swapchain` is the swapchain to obtain timing properties for.

* 
`pSwapchainTimingProperties` is a pointer to an instance of the
[VkSwapchainTimingPropertiesEXT](VkSwapchainTimingPropertiesEXT.html) structure.

* 
`pSwapchainTimingPropertiesCounter` is `NULL` or a pointer to a
64-bit unsigned integer set by the implementation to the current value
of the swapchain’s internal timing properties counter.

If `vkGetSwapchainTimingPropertiesEXT` returns [VK_NOT_READY](VkResult.html), the
implementation was not able to determine the current refresh cycle duration.
Some platforms **may** not provide timing properties until after at least one
image has been presented to the `swapchain`.
If timing properties change for the `swapchain`, these platforms **may**
not provide updated results until after at least one additional image has
been presented to the `swapchain`.

Valid Usage (Implicit)

* 
[](#VUID-vkGetSwapchainTimingPropertiesEXT-device-parameter) VUID-vkGetSwapchainTimingPropertiesEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetSwapchainTimingPropertiesEXT-swapchain-parameter) VUID-vkGetSwapchainTimingPropertiesEXT-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](VkSwapchainKHR.html) handle

* 
[](#VUID-vkGetSwapchainTimingPropertiesEXT-pSwapchainTimingProperties-parameter) VUID-vkGetSwapchainTimingPropertiesEXT-pSwapchainTimingProperties-parameter

 `pSwapchainTimingProperties` **must** be a valid pointer to a [VkSwapchainTimingPropertiesEXT](VkSwapchainTimingPropertiesEXT.html) structure

* 
[](#VUID-vkGetSwapchainTimingPropertiesEXT-pSwapchainTimingPropertiesCounter-parameter) VUID-vkGetSwapchainTimingPropertiesEXT-pSwapchainTimingPropertiesCounter-parameter

 If `pSwapchainTimingPropertiesCounter` is not `NULL`, `pSwapchainTimingPropertiesCounter` **must** be a valid pointer to a `uint64_t` value

* 
[](#VUID-vkGetSwapchainTimingPropertiesEXT-swapchain-parent) VUID-vkGetSwapchainTimingPropertiesEXT-swapchain-parent

 `swapchain` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `swapchain` **must** be externally synchronized

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_NOT_READY](VkResult.html)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_SURFACE_LOST_KHR](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_EXT_present_timing](VK_EXT_present_timing.html), [VkDevice](VkDevice.html), [VkSwapchainKHR](VkSwapchainKHR.html), [VkSwapchainTimingPropertiesEXT](VkSwapchainTimingPropertiesEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetSwapchainTimingPropertiesEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
