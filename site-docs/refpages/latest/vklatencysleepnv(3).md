# vkLatencySleepNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkLatencySleepNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkLatencySleepNV - Trigger low latency mode Sleep

To provide the synchronization primitive used to delay host CPU work for
lower latency rendering, call:

// Provided by VK_NV_low_latency2
VkResult vkLatencySleepNV(
    VkDevice                                    device,
    VkSwapchainKHR                              swapchain,
    const VkLatencySleepInfoNV*                 pSleepInfo);

* 
`device` is the device associated with `swapchain`.

* 
`swapchain` is the swapchain to delay associated CPU work based on
[VkLatencySubmissionPresentIdNV](VkLatencySubmissionPresentIdNV.html) submissions.

* 
`pSleepInfo` is a pointer to a [VkLatencySleepInfoNV](VkLatencySleepInfoNV.html) structure
specifying the parameters of the latency sleep.

`vkLatencySleepNV` returns immediately.
Applications **should** use [vkWaitSemaphores](vkWaitSemaphores.html) with
`pSleepInfo->signalSemaphore` to delay host CPU work.
CPU work refers to application work done before presenting which includes
but is not limited to: input sampling, simulation, command buffer recording,
command buffer submission, and present submission.
Applications **should** call this function before input sampling, and exactly
once between presents.

Valid Usage (Implicit)

* 
[](#VUID-vkLatencySleepNV-device-parameter) VUID-vkLatencySleepNV-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkLatencySleepNV-swapchain-parameter) VUID-vkLatencySleepNV-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](VkSwapchainKHR.html) handle

* 
[](#VUID-vkLatencySleepNV-pSleepInfo-parameter) VUID-vkLatencySleepNV-pSleepInfo-parameter

 `pSleepInfo` **must** be a valid pointer to a valid [VkLatencySleepInfoNV](VkLatencySleepInfoNV.html) structure

* 
[](#VUID-vkLatencySleepNV-swapchain-parent) VUID-vkLatencySleepNV-swapchain-parent

 `swapchain` **must** have been created, allocated, or retrieved from `device`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_NV_low_latency2](VK_NV_low_latency2.html), [VkDevice](VkDevice.html), [VkLatencySleepInfoNV](VkLatencySleepInfoNV.html), [VkSwapchainKHR](VkSwapchainKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkLatencySleepNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
