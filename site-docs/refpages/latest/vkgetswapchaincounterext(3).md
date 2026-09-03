# vkGetSwapchainCounterEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetSwapchainCounterEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetSwapchainCounterEXT - Query the current value of a surface counter

The requested counters become active when the first presentation command for
the associated swapchain is processed by the presentation engine.
To query the value of an active counter, use:

// Provided by VK_EXT_display_control
VkResult vkGetSwapchainCounterEXT(
    VkDevice                                    device,
    VkSwapchainKHR                              swapchain,
    VkSurfaceCounterFlagBitsEXT                 counter,
    uint64_t*                                   pCounterValue);

* 
`device` is the [VkDevice](VkDevice.html) associated with `swapchain`.

* 
`swapchain` is the swapchain from which to query the counter value.

* 
`counter` is a [VkSurfaceCounterFlagBitsEXT](VkSurfaceCounterFlagBitsEXT.html) value specifying
the counter to query.

* 
`pCounterValue` will return the current value of the counter.

If a counter is not available because the swapchain is out of date, the
implementation **may** return [VK_ERROR_OUT_OF_DATE_KHR](VkResult.html).

Valid Usage

* 
[](#VUID-vkGetSwapchainCounterEXT-swapchain-01245) VUID-vkGetSwapchainCounterEXT-swapchain-01245

One or more present commands on `swapchain` **must** have been
processed by the presentation engine

Valid Usage (Implicit)

* 
[](#VUID-vkGetSwapchainCounterEXT-device-parameter) VUID-vkGetSwapchainCounterEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetSwapchainCounterEXT-swapchain-parameter) VUID-vkGetSwapchainCounterEXT-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](VkSwapchainKHR.html) handle

* 
[](#VUID-vkGetSwapchainCounterEXT-counter-parameter) VUID-vkGetSwapchainCounterEXT-counter-parameter

 `counter` **must** be a valid [VkSurfaceCounterFlagBitsEXT](VkSurfaceCounterFlagBitsEXT.html) value

* 
[](#VUID-vkGetSwapchainCounterEXT-pCounterValue-parameter) VUID-vkGetSwapchainCounterEXT-pCounterValue-parameter

 `pCounterValue` **must** be a valid pointer to a `uint64_t` value

* 
[](#VUID-vkGetSwapchainCounterEXT-swapchain-parent) VUID-vkGetSwapchainCounterEXT-swapchain-parent

 `swapchain` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

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
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_EXT_display_control](VK_EXT_display_control.html), [VkDevice](VkDevice.html), [VkSurfaceCounterFlagBitsEXT](VkSurfaceCounterFlagBitsEXT.html), [VkSwapchainKHR](VkSwapchainKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetSwapchainCounterEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
