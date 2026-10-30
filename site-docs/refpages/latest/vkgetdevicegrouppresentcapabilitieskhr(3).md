# vkGetDeviceGroupPresentCapabilitiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDeviceGroupPresentCapabilitiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDeviceGroupPresentCapabilitiesKHR - Query present capabilities from other physical devices

A logical device that represents multiple physical devices **may** support
presenting from images on more than one physical device, or combining images
from multiple physical devices.

To query these capabilities, call:

// Provided by VK_VERSION_1_1 with VK_KHR_swapchain, VK_KHR_device_group with VK_KHR_surface
VkResult vkGetDeviceGroupPresentCapabilitiesKHR(
    VkDevice                                    device,
    VkDeviceGroupPresentCapabilitiesKHR*        pDeviceGroupPresentCapabilities);

* 
`device` is the logical device.

* 
`pDeviceGroupPresentCapabilities` is a pointer to a
[VkDeviceGroupPresentCapabilitiesKHR](VkDeviceGroupPresentCapabilitiesKHR.html) structure in which the
device’s capabilities are returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceGroupPresentCapabilitiesKHR-device-parameter) VUID-vkGetDeviceGroupPresentCapabilitiesKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetDeviceGroupPresentCapabilitiesKHR-pDeviceGroupPresentCapabilities-parameter) VUID-vkGetDeviceGroupPresentCapabilitiesKHR-pDeviceGroupPresentCapabilities-parameter

 `pDeviceGroupPresentCapabilities` **must** be a valid pointer to a [VkDeviceGroupPresentCapabilitiesKHR](VkDeviceGroupPresentCapabilitiesKHR.html) structure

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

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

[VK_KHR_device_group](VK_KHR_device_group.html), [VK_KHR_surface](VK_KHR_surface.html), [VK_KHR_swapchain](VK_KHR_swapchain.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkDevice](VkDevice.html), [VkDeviceGroupPresentCapabilitiesKHR](VkDeviceGroupPresentCapabilitiesKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetDeviceGroupPresentCapabilitiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
