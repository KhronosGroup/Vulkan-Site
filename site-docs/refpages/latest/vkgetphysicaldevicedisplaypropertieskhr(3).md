# vkGetPhysicalDeviceDisplayPropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceDisplayPropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceDisplayPropertiesKHR - Query information about the available displays

Various functions are provided for enumerating the available display devices
present on a Vulkan physical device.
To query information about the available displays, call:

// Provided by VK_KHR_display
VkResult vkGetPhysicalDeviceDisplayPropertiesKHR(
    VkPhysicalDevice                            physicalDevice,
    uint32_t*                                   pPropertyCount,
    VkDisplayPropertiesKHR*                     pProperties);

* 
`physicalDevice` is a physical device.

* 
`pPropertyCount` is a pointer to an integer related to the number of
display devices available or queried, as described below.

* 
`pProperties` is either `NULL` or a pointer to an array of
[VkDisplayPropertiesKHR](VkDisplayPropertiesKHR.html) structures.

If `pProperties` is `NULL`, then the number of display devices available
for `physicalDevice` is returned in `pPropertyCount`.
Otherwise, `pPropertyCount` **must** point to a variable set by the
application to the number of elements in the `pProperties` array, and on
return the variable is overwritten with the number of structures actually
written to `pProperties`.
If the value of `pPropertyCount` is less than the number of display
devices for `physicalDevice`, at most `pPropertyCount` structures
will be written, and [VK_INCOMPLETE](VkResult.html) will be returned instead of
[VK_SUCCESS](VkResult.html), to indicate that not all the available properties were
returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceDisplayPropertiesKHR-physicalDevice-parameter) VUID-vkGetPhysicalDeviceDisplayPropertiesKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceDisplayPropertiesKHR-pPropertyCount-parameter) VUID-vkGetPhysicalDeviceDisplayPropertiesKHR-pPropertyCount-parameter

 `pPropertyCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceDisplayPropertiesKHR-pProperties-parameter) VUID-vkGetPhysicalDeviceDisplayPropertiesKHR-pProperties-parameter

 If the value referenced by `pPropertyCount` is not `0`, and `pProperties` is not `NULL`, `pProperties` **must** be a valid pointer to an array of `pPropertyCount` [VkDisplayPropertiesKHR](VkDisplayPropertiesKHR.html) structures

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

[VK_KHR_display](VK_KHR_display.html), [VkDisplayPropertiesKHR](VkDisplayPropertiesKHR.html), [VkPhysicalDevice](VkPhysicalDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetPhysicalDeviceDisplayPropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
