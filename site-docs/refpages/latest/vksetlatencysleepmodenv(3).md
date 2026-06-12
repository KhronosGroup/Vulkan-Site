# vkSetLatencySleepModeNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkSetLatencySleepModeNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkSetLatencySleepModeNV - Enable or Disable low latency mode on a swapchain

To enable or disable low latency mode on a swapchain, call:

// Provided by VK_NV_low_latency2
VkResult vkSetLatencySleepModeNV(
    VkDevice                                    device,
    VkSwapchainKHR                              swapchain,
    const VkLatencySleepModeInfoNV*             pSleepModeInfo);

* 
`device` is the device associated with `swapchain`.

* 
`swapchain` is the swapchain to enable or disable low latency mode
on.

* 
`pSleepModeInfo` is `NULL` or a pointer to a
[VkLatencySleepModeInfoNV](VkLatencySleepModeInfoNV.html) structure specifying the parameters of
the latency sleep mode.

If `pSleepModeInfo` is `NULL`, `vkSetLatencySleepModeNV` will
disable low latency mode, low latency boost, and set the minimum present
interval previously specified by [VkLatencySleepModeInfoNV](VkLatencySleepModeInfoNV.html) to zero on
`swapchain`.
As an exception to the normal rules for objects which are externally
synchronized, the swapchain passed to `vkSetLatencySleepModeNV` **may** be
simultaneously used by other threads in calls to functions other than
[vkDestroySwapchainKHR](vkDestroySwapchainKHR.html).
Access to the swapchain data associated with this extension **must** be atomic
within the implementation.

Valid Usage (Implicit)

* 
[](#VUID-vkSetLatencySleepModeNV-device-parameter) VUID-vkSetLatencySleepModeNV-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkSetLatencySleepModeNV-swapchain-parameter) VUID-vkSetLatencySleepModeNV-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](VkSwapchainKHR.html) handle

* 
[](#VUID-vkSetLatencySleepModeNV-pSleepModeInfo-parameter) VUID-vkSetLatencySleepModeNV-pSleepModeInfo-parameter

 `pSleepModeInfo` **must** be a valid pointer to a valid [VkLatencySleepModeInfoNV](VkLatencySleepModeInfoNV.html) structure

* 
[](#VUID-vkSetLatencySleepModeNV-swapchain-parent) VUID-vkSetLatencySleepModeNV-swapchain-parent

 `swapchain` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INITIALIZATION_FAILED](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_NV_low_latency2](VK_NV_low_latency2.html), [VkDevice](VkDevice.html), [VkLatencySleepModeInfoNV](VkLatencySleepModeInfoNV.html), [VkSwapchainKHR](VkSwapchainKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkSetLatencySleepModeNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
