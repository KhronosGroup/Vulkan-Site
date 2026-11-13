# vkGetDisplayModeProperties2KHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDisplayModeProperties2KHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDisplayModeProperties2KHR - Query information about the available display modes.

To query the properties of a device’s built-in display modes, call:

// Provided by VK_KHR_get_display_properties2
VkResult vkGetDisplayModeProperties2KHR(
    VkPhysicalDevice                            physicalDevice,
    VkDisplayKHR                                display,
    uint32_t*                                   pPropertyCount,
    VkDisplayModeProperties2KHR*                pProperties);

* 
`physicalDevice` is the physical device associated with
`display`.

* 
`display` is the display to query.

* 
`pPropertyCount` is a pointer to an integer related to the number of
display modes available or queried, as described below.

* 
`pProperties` is either `NULL` or a pointer to an array of
`VkDisplayModeProperties2KHR` structures.

`vkGetDisplayModeProperties2KHR` behaves similarly to
[vkGetDisplayModePropertiesKHR](vkGetDisplayModePropertiesKHR.html), with the ability to return extended
information via chained output structures.

Valid Usage (Implicit)

* 
[](#VUID-vkGetDisplayModeProperties2KHR-physicalDevice-parameter) VUID-vkGetDisplayModeProperties2KHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetDisplayModeProperties2KHR-display-parameter) VUID-vkGetDisplayModeProperties2KHR-display-parameter

 `display` **must** be a valid [VkDisplayKHR](VkDisplayKHR.html) handle

* 
[](#VUID-vkGetDisplayModeProperties2KHR-pPropertyCount-parameter) VUID-vkGetDisplayModeProperties2KHR-pPropertyCount-parameter

 `pPropertyCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetDisplayModeProperties2KHR-pProperties-parameter) VUID-vkGetDisplayModeProperties2KHR-pProperties-parameter

 If the value referenced by `pPropertyCount` is not `0`, and `pProperties` is not `NULL`, `pProperties` **must** be a valid pointer to an array of `pPropertyCount` [VkDisplayModeProperties2KHR](VkDisplayModeProperties2KHR.html) structures

* 
[](#VUID-vkGetDisplayModeProperties2KHR-display-parent) VUID-vkGetDisplayModeProperties2KHR-display-parent

 `display` **must** have been created, allocated, or retrieved from `physicalDevice`

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

[VK_KHR_get_display_properties2](VK_KHR_get_display_properties2.html), [VkDisplayKHR](VkDisplayKHR.html), [VkDisplayModeProperties2KHR](VkDisplayModeProperties2KHR.html), [VkPhysicalDevice](VkPhysicalDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetDisplayModeProperties2KHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
