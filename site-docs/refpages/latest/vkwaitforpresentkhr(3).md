# vkWaitForPresentKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkWaitForPresentKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkWaitForPresentKHR - Wait for presentation

When the [`presentWait`](../../../../spec/latest/chapters/features.html#features-presentWait) feature is enabled, an
application **can** wait for an image to be presented to the user by first
specifying a presentId for the target presentation by adding a
[VkPresentIdKHR](VkPresentIdKHR.html) structure to the `pNext` chain of the
[VkPresentInfoKHR](VkPresentInfoKHR.html) structure and then waiting for that presentation to
complete by calling:

// Provided by VK_KHR_present_wait
VkResult vkWaitForPresentKHR(
    VkDevice                                    device,
    VkSwapchainKHR                              swapchain,
    uint64_t                                    presentId,
    uint64_t                                    timeout);

* 
`device` is the device associated with `swapchain`.

* 
`swapchain` is the non-retired swapchain on which an image was
queued for presentation.

* 
`presentId` is the presentation presentId to wait for.

* 
`timeout` is the timeout period in units of nanoseconds.
`timeout` is adjusted to the closest value allowed by the
implementation-dependent timeout accuracy, which **may** be substantially
longer than one nanosecond, and **may** be longer than the requested
period.

The call to `vkWaitForPresentKHR` will block until either the presentId
associated with `swapchain` is greater than or equal to `presentId`,
or `timeout` nanoseconds passes.
When the swapchain becomes OUT_OF_DATE, the call will either return
[VK_SUCCESS](VkResult.html) (if the image was delivered to the presentation engine and
may have been presented to the user) or will return early with status
[VK_ERROR_OUT_OF_DATE_KHR](VkResult.html) (if the image could not be presented to the
user).

There is no requirement for any precise timing relationship between the
presentation of the image to the user and the update of the presentId value,
but implementations **should** make this as close as possible to the
presentation of the first pixel in the next image being presented to the
user.

For [VK_PRESENT_MODE_MAILBOX_KHR](VkPresentModeKHR.html) (or other present mode where images
may be replaced in the presentation queue) any wait of this type associated
with such an image **must** be signaled no later than a wait associated with
the replacing image would be signaled.

As an exception to the normal rules for objects which are externally
synchronized, the `swapchain` passed to `vkWaitForPresentKHR` **may**
be simultaneously used by other threads in calls to functions other than
[vkDestroySwapchainKHR](vkDestroySwapchainKHR.html).
Access to the swapchain data associated with this extension **must** be atomic
within the implementation.

Valid Usage

* 
[](#VUID-vkWaitForPresentKHR-swapchain-04997) VUID-vkWaitForPresentKHR-swapchain-04997

`swapchain` **must** not be in the retired state

* 
[](#VUID-vkWaitForPresentKHR-presentWait-06234) VUID-vkWaitForPresentKHR-presentWait-06234

The [`presentWait`](../../../../spec/latest/chapters/features.html#features-presentWait) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkWaitForPresentKHR-device-parameter) VUID-vkWaitForPresentKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkWaitForPresentKHR-swapchain-parameter) VUID-vkWaitForPresentKHR-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](VkSwapchainKHR.html) handle

* 
[](#VUID-vkWaitForPresentKHR-swapchain-parent) VUID-vkWaitForPresentKHR-swapchain-parent

 `swapchain` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `swapchain` **must** be externally synchronized

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUBOPTIMAL_KHR](VkResult.html)

* 
[VK_SUCCESS](VkResult.html)

* 
[VK_TIMEOUT](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_DEVICE_LOST](VkResult.html)

* 
[VK_ERROR_FULL_SCREEN_EXCLUSIVE_MODE_LOST_EXT](VkResult.html)

* 
[VK_ERROR_OUT_OF_DATE_KHR](VkResult.html)

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

[VK_KHR_present_wait](VK_KHR_present_wait.html), [VkDevice](VkDevice.html), [VkSwapchainKHR](VkSwapchainKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkWaitForPresentKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
