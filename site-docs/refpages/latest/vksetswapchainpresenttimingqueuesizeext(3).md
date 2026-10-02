# vkSetSwapchainPresentTimingQueueSizeEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkSetSwapchainPresentTimingQueueSizeEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkSetSwapchainPresentTimingQueueSizeEXT - Allocate memory for the swapchain-internal timing results queue

In order to collect timing information about presentation, a swapchain needs
an internal queue to store asynchronously updated results until applications
collect them.

To allocate the swapchain’s internal timing results queue, call:

// Provided by VK_EXT_present_timing
VkResult vkSetSwapchainPresentTimingQueueSizeEXT(
    VkDevice                                    device,
    VkSwapchainKHR                              swapchain,
    uint32_t                                    size);

* 
`device` is the device associated with `swapchain`.

* 
`swapchain` is the swapchain to allocate a results queue for.

* 
`size` is the requested number of slots in the internal results
queue.

If this function is called multiple times, the internal queue is reallocated
to fit the new `size`.
If the new `size` is less than the current number of outstanding
results, [VK_NOT_READY](VkResult.html) is returned and no allocation is performed.

Valid Usage

* 
[](#VUID-vkSetSwapchainPresentTimingQueueSizeEXT-swapchain-12229) VUID-vkSetSwapchainPresentTimingQueueSizeEXT-swapchain-12229

`swapchain` **must** have been created with
`VkSwapchainCreateInfoKHR`::`flags` containing
[VK_SWAPCHAIN_CREATE_PRESENT_TIMING_BIT_EXT](VkSwapchainCreateFlagBitsKHR.html)

Valid Usage (Implicit)

* 
[](#VUID-vkSetSwapchainPresentTimingQueueSizeEXT-device-parameter) VUID-vkSetSwapchainPresentTimingQueueSizeEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkSetSwapchainPresentTimingQueueSizeEXT-swapchain-parameter) VUID-vkSetSwapchainPresentTimingQueueSizeEXT-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](VkSwapchainKHR.html) handle

* 
[](#VUID-vkSetSwapchainPresentTimingQueueSizeEXT-swapchain-parent) VUID-vkSetSwapchainPresentTimingQueueSizeEXT-swapchain-parent

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
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_EXT_present_timing](VK_EXT_present_timing.html), [VkDevice](VkDevice.html), [VkSwapchainKHR](VkSwapchainKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkSetSwapchainPresentTimingQueueSizeEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
