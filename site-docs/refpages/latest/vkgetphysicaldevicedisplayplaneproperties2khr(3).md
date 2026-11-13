# vkGetPhysicalDeviceDisplayPlaneProperties2KHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceDisplayPlaneProperties2KHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceDisplayPlaneProperties2KHR - Query information about the available display planes.

To query the properties of a device’s display planes, call:

// Provided by VK_KHR_get_display_properties2
VkResult vkGetPhysicalDeviceDisplayPlaneProperties2KHR(
    VkPhysicalDevice                            physicalDevice,
    uint32_t*                                   pPropertyCount,
    VkDisplayPlaneProperties2KHR*               pProperties);

* 
`physicalDevice` is a physical device.

* 
`pPropertyCount` is a pointer to an integer related to the number of
display planes available or queried, as described below.

* 
`pProperties` is either `NULL` or a pointer to an array of
`VkDisplayPlaneProperties2KHR` structures.

`vkGetPhysicalDeviceDisplayPlaneProperties2KHR` behaves similarly to
[vkGetPhysicalDeviceDisplayPlanePropertiesKHR](vkGetPhysicalDeviceDisplayPlanePropertiesKHR.html), with the ability to
return extended information via chained output structures.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceDisplayPlaneProperties2KHR-physicalDevice-parameter) VUID-vkGetPhysicalDeviceDisplayPlaneProperties2KHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceDisplayPlaneProperties2KHR-pPropertyCount-parameter) VUID-vkGetPhysicalDeviceDisplayPlaneProperties2KHR-pPropertyCount-parameter

 `pPropertyCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceDisplayPlaneProperties2KHR-pProperties-parameter) VUID-vkGetPhysicalDeviceDisplayPlaneProperties2KHR-pProperties-parameter

 If the value referenced by `pPropertyCount` is not `0`, and `pProperties` is not `NULL`, `pProperties` **must** be a valid pointer to an array of `pPropertyCount` [VkDisplayPlaneProperties2KHR](VkDisplayPlaneProperties2KHR.html) structures

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_INCOMPLETE](VkResult.html)

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

[VK_KHR_get_display_properties2](VK_KHR_get_display_properties2.html), [VkDisplayPlaneProperties2KHR](VkDisplayPlaneProperties2KHR.html), [VkPhysicalDevice](VkPhysicalDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetPhysicalDeviceDisplayPlaneProperties2KHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
