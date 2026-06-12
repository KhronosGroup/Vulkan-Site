# vkGetPhysicalDeviceDisplayProperties2KHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceDisplayProperties2KHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceDisplayProperties2KHR - Query information about the available displays

To query information about the available displays, call:

// Provided by VK_KHR_get_display_properties2
VkResult vkGetPhysicalDeviceDisplayProperties2KHR(
    VkPhysicalDevice                            physicalDevice,
    uint32_t*                                   pPropertyCount,
    VkDisplayProperties2KHR*                    pProperties);

* 
`physicalDevice` is a physical device.

* 
`pPropertyCount` is a pointer to an integer related to the number of
display devices available or queried, as described below.

* 
`pProperties` is either `NULL` or a pointer to an array of
`VkDisplayProperties2KHR` structures.

`vkGetPhysicalDeviceDisplayProperties2KHR` behaves similarly to
[vkGetPhysicalDeviceDisplayPropertiesKHR](vkGetPhysicalDeviceDisplayPropertiesKHR.html), with the ability to return
extended information via chained output structures.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceDisplayProperties2KHR-physicalDevice-parameter) VUID-vkGetPhysicalDeviceDisplayProperties2KHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceDisplayProperties2KHR-pPropertyCount-parameter) VUID-vkGetPhysicalDeviceDisplayProperties2KHR-pPropertyCount-parameter

 `pPropertyCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceDisplayProperties2KHR-pProperties-parameter) VUID-vkGetPhysicalDeviceDisplayProperties2KHR-pProperties-parameter

 If the value referenced by `pPropertyCount` is not `0`, and `pProperties` is not `NULL`, `pProperties` **must** be a valid pointer to an array of `pPropertyCount` [VkDisplayProperties2KHR](VkDisplayProperties2KHR.html) structures

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

[VK_KHR_get_display_properties2](VK_KHR_get_display_properties2.html), [VkDisplayProperties2KHR](VkDisplayProperties2KHR.html), [VkPhysicalDevice](VkPhysicalDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetPhysicalDeviceDisplayProperties2KHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
