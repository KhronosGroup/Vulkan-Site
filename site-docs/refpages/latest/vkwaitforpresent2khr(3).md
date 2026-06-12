# vkWaitForPresent2KHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkWaitForPresent2KHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkWaitForPresent2KHR - Wait for presentation

When the `VkSurfaceCapabilitiesPresentWait2KHR` surface capability is
present for a given surface, an application **can** wait for an image to be
presented to the user by first specifying a `presentId` for the target
presentation by adding a `VkPresentId2KHR` structure to the `pNext`
chain of the [VkPresentInfoKHR](VkPresentInfoKHR.html) structure and then waiting for that
presentation to complete by calling:

// Provided by VK_KHR_present_wait2
VkResult vkWaitForPresent2KHR(
    VkDevice                                    device,
    VkSwapchainKHR                              swapchain,
    const VkPresentWait2InfoKHR*                pPresentWait2Info);

* 
`device` is the device associated with `swapchain`.

* 
`swapchain` is the non-retired swapchain on which an image was
queued for presentation.

* 
`pPresentWait2Info` is a pointer to a [VkPresentWait2InfoKHR](VkPresentWait2InfoKHR.html)
structure specifying the parameters of the wait.

`vkWaitForPresent2KHR` waits for the presentation engine to have begun
presentation of the presentation request associated with the
[VkPresentWait2InfoKHR](VkPresentWait2InfoKHR.html)::`presentId` on `swapchain`, or for
[VkPresentWait2InfoKHR](VkPresentWait2InfoKHR.html)::`timeout` to have expired.

The wait request will complete when the timeout expires, or after the
corresponding presentation request has either taken effect within the
presentation engine or has been replaced without presentation.

The timing relationship between the presentation of the image to the user
and the wait request completing is implementation-dependent due to
variations in window system implementations.

If the `swapchain` becomes [VK_ERROR_OUT_OF_DATE_KHR](VkResult.html) either before
or during this call, the call **may** either return [VK_SUCCESS](VkResult.html) (if the
image was delivered to the presentation engine and **may** have been presented
to the user) or return early with status [VK_ERROR_OUT_OF_DATE_KHR](VkResult.html) (if
the image could not be presented to the user).

As an exception to the normal rules for objects which are externally
synchronized, the `swapchain` passed to `vkWaitForPresent2KHR` **may**
be simultaneously used by other threads in calls to functions other than
[vkDestroySwapchainKHR](vkDestroySwapchainKHR.html).
Access to the swapchain data associated with this extension **must** be atomic
within the implementation.

Valid Usage

* 
[](#VUID-vkWaitForPresent2KHR-presentWait2-10814) VUID-vkWaitForPresent2KHR-presentWait2-10814

The [`presentWait2`](../../../../spec/latest/chapters/features.html#features-presentWait2) feature **must** be
enabled

* 
[](#VUID-vkWaitForPresent2KHR-None-10815) VUID-vkWaitForPresent2KHR-None-10815

The [VkSurfaceCapabilitiesPresentWait2KHR](VkSurfaceCapabilitiesPresentWait2KHR.html) surface capability **must**
be present for the underlying surface

* 
[](#VUID-vkWaitForPresent2KHR-None-10816) VUID-vkWaitForPresent2KHR-None-10816

The swapchain must have been created with
[VK_SWAPCHAIN_CREATE_PRESENT_WAIT_2_BIT_KHR](VkSwapchainCreateFlagBitsKHR.html) bit set in the
[VkSwapchainCreateFlagBitsKHR](VkSwapchainCreateFlagBitsKHR.html) field

* 
[](#VUID-vkWaitForPresent2KHR-presentId-10817) VUID-vkWaitForPresent2KHR-presentId-10817

The `presentId` value **must** have been associated with a
[vkQueuePresentKHR](vkQueuePresentKHR.html) request on the `swapchain` which returned a
non-error value

Valid Usage (Implicit)

* 
[](#VUID-vkWaitForPresent2KHR-device-parameter) VUID-vkWaitForPresent2KHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkWaitForPresent2KHR-swapchain-parameter) VUID-vkWaitForPresent2KHR-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](VkSwapchainKHR.html) handle

* 
[](#VUID-vkWaitForPresent2KHR-pPresentWait2Info-parameter) VUID-vkWaitForPresent2KHR-pPresentWait2Info-parameter

 `pPresentWait2Info` **must** be a valid pointer to a valid [VkPresentWait2InfoKHR](VkPresentWait2InfoKHR.html) structure

* 
[](#VUID-vkWaitForPresent2KHR-swapchain-parent) VUID-vkWaitForPresent2KHR-swapchain-parent

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

[VK_KHR_present_wait2](VK_KHR_present_wait2.html), [VkDevice](VkDevice.html), [VkPresentWait2InfoKHR](VkPresentWait2InfoKHR.html), [VkSwapchainKHR](VkSwapchainKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkWaitForPresent2KHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
