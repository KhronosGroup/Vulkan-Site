# vkSetLatencyMarkerNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkSetLatencyMarkerNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkSetLatencyMarkerNV - Pass in marker for timing info

An application **can** provide timestamps at various stages of its frame
generation work by calling:

// Provided by VK_NV_low_latency2
void vkSetLatencyMarkerNV(
    VkDevice                                    device,
    VkSwapchainKHR                              swapchain,
    const VkSetLatencyMarkerInfoNV*             pLatencyMarkerInfo);

* 
`device` is the device associated with `swapchain`.

* 
`swapchain` is the swapchain to capture timestamps on.

* 
`pSetLatencyMarkerInfo` is a pointer to a
[VkSetLatencyMarkerInfoNV](VkSetLatencyMarkerInfoNV.html) structure specifying the parameters of
the marker to set.

At the beginning and end of simulation and render threads and beginning and
end of [vkQueuePresentKHR](vkQueuePresentKHR.html) calls, `vkSetLatencyMarkerNV` **can** be
called to provide timestamps for the application’s reference.
These timestamps are returned with a call to [vkGetLatencyTimingsNV](vkGetLatencyTimingsNV.html)
alongside driver provided timestamps at various points of interest with
regards to latency within the application.
As an exception to the normal rules for objects which are externally
synchronized, the swapchain passed to `vkSetLatencyMarkerNV` **may** be
simultaneously used by other threads in calls to functions other than
[vkDestroySwapchainKHR](vkDestroySwapchainKHR.html).
Access to the swapchain data associated with this extension **must** be atomic
within the implementation.

Valid Usage (Implicit)

* 
[](#VUID-vkSetLatencyMarkerNV-device-parameter) VUID-vkSetLatencyMarkerNV-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkSetLatencyMarkerNV-swapchain-parameter) VUID-vkSetLatencyMarkerNV-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](VkSwapchainKHR.html) handle

* 
[](#VUID-vkSetLatencyMarkerNV-pLatencyMarkerInfo-parameter) VUID-vkSetLatencyMarkerNV-pLatencyMarkerInfo-parameter

 `pLatencyMarkerInfo` **must** be a valid pointer to a valid [VkSetLatencyMarkerInfoNV](VkSetLatencyMarkerInfoNV.html) structure

* 
[](#VUID-vkSetLatencyMarkerNV-swapchain-parent) VUID-vkSetLatencyMarkerNV-swapchain-parent

 `swapchain` **must** have been created, allocated, or retrieved from `device`

[VK_NV_low_latency2](VK_NV_low_latency2.html), [VkDevice](VkDevice.html), [VkSetLatencyMarkerInfoNV](VkSetLatencyMarkerInfoNV.html), [VkSwapchainKHR](VkSwapchainKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkSetLatencyMarkerNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
