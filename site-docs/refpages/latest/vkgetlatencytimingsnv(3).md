# vkGetLatencyTimingsNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetLatencyTimingsNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetLatencyTimingsNV - Get latency marker results

To get an array containing the newest collected latency data, call:

// Provided by VK_NV_low_latency2
void vkGetLatencyTimingsNV(
    VkDevice                                    device,
    VkSwapchainKHR                              swapchain,
    VkGetLatencyMarkerInfoNV*                   pLatencyMarkerInfo);

* 
`device` is the device associated with `swapchain`.

* 
`swapchain` is the swapchain to return data from.

* 
`pLatencyMarkerInfo` is a pointer to a
[VkGetLatencyMarkerInfoNV](VkGetLatencyMarkerInfoNV.html) structure specifying the parameters for
returning latency information.

The timings returned by `vkGetLatencyTimingsNV` contain the timestamps
requested from [vkSetLatencyMarkerNV](vkSetLatencyMarkerNV.html) and additional
implementation-specific markers defined in
[VkLatencyTimingsFrameReportNV](VkLatencyTimingsFrameReportNV.html).

Valid Usage (Implicit)

* 
[](#VUID-vkGetLatencyTimingsNV-device-parameter) VUID-vkGetLatencyTimingsNV-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetLatencyTimingsNV-swapchain-parameter) VUID-vkGetLatencyTimingsNV-swapchain-parameter

 `swapchain` **must** be a valid [VkSwapchainKHR](VkSwapchainKHR.html) handle

* 
[](#VUID-vkGetLatencyTimingsNV-pLatencyMarkerInfo-parameter) VUID-vkGetLatencyTimingsNV-pLatencyMarkerInfo-parameter

 `pLatencyMarkerInfo` **must** be a valid pointer to a [VkGetLatencyMarkerInfoNV](VkGetLatencyMarkerInfoNV.html) structure

* 
[](#VUID-vkGetLatencyTimingsNV-swapchain-parent) VUID-vkGetLatencyTimingsNV-swapchain-parent

 `swapchain` **must** have been created, allocated, or retrieved from `device`

[VK_NV_low_latency2](VK_NV_low_latency2.html), [VkDevice](VkDevice.html), [VkGetLatencyMarkerInfoNV](VkGetLatencyMarkerInfoNV.html), [VkSwapchainKHR](VkSwapchainKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetLatencyTimingsNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
