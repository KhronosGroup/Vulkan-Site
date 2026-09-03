# vkGetPhysicalDeviceDisplayPlanePropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceDisplayPlanePropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceDisplayPlanePropertiesKHR - Query the plane properties

Images are presented to individual planes on a display.
Devices **must** support at least one plane on each display.
Planes **can** be stacked and blended to composite multiple images on one
display.
Devices **may** support only a fixed stacking order and fixed mapping between
planes and displays, or they **may** allow arbitrary application-specified
stacking orders and mappings between planes and displays.
To query the properties of device display planes, call:

// Provided by VK_KHR_display
VkResult vkGetPhysicalDeviceDisplayPlanePropertiesKHR(
    VkPhysicalDevice                            physicalDevice,
    uint32_t*                                   pPropertyCount,
    VkDisplayPlanePropertiesKHR*                pProperties);

* 
`physicalDevice` is a physical device.

* 
`pPropertyCount` is a pointer to an integer related to the number of
display planes available or queried, as described below.

* 
`pProperties` is either `NULL` or a pointer to an array of
`VkDisplayPlanePropertiesKHR` structures.

If `pProperties` is `NULL`, then the number of display planes available
for `physicalDevice` is returned in `pPropertyCount`.
Otherwise, `pPropertyCount` **must** point to a variable set by the
application to the number of elements in the `pProperties` array, and on
return the variable is overwritten with the number of structures actually
written to `pProperties`.
If the value of `pPropertyCount` is less than the number of display
planes for `physicalDevice`, at most `pPropertyCount` structures
will be written.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceDisplayPlanePropertiesKHR-physicalDevice-parameter) VUID-vkGetPhysicalDeviceDisplayPlanePropertiesKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceDisplayPlanePropertiesKHR-pPropertyCount-parameter) VUID-vkGetPhysicalDeviceDisplayPlanePropertiesKHR-pPropertyCount-parameter

 `pPropertyCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceDisplayPlanePropertiesKHR-pProperties-parameter) VUID-vkGetPhysicalDeviceDisplayPlanePropertiesKHR-pProperties-parameter

 If the value referenced by `pPropertyCount` is not `0`, and `pProperties` is not `NULL`, `pProperties` **must** be a valid pointer to an array of `pPropertyCount` [VkDisplayPlanePropertiesKHR](VkDisplayPlanePropertiesKHR.html) structures

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

[VK_KHR_display](VK_KHR_display.html), [VkDisplayPlanePropertiesKHR](VkDisplayPlanePropertiesKHR.html), [VkPhysicalDevice](VkPhysicalDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetPhysicalDeviceDisplayPlanePropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
