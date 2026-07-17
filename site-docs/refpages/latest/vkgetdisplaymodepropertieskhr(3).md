# vkGetDisplayModePropertiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDisplayModePropertiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDisplayModePropertiesKHR - Query the set of mode properties supported by the display

Each display has one or more supported modes associated with it by default.
These built-in modes are queried by calling:

// Provided by VK_KHR_display
VkResult vkGetDisplayModePropertiesKHR(
    VkPhysicalDevice                            physicalDevice,
    VkDisplayKHR                                display,
    uint32_t*                                   pPropertyCount,
    VkDisplayModePropertiesKHR*                 pProperties);

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
`VkDisplayModePropertiesKHR` structures.

If `pProperties` is `NULL`, then the number of display modes available
on the specified `display` for `physicalDevice` is returned in
`pPropertyCount`.
Otherwise, `pPropertyCount` **must** point to a variable set by the
application to the number of elements in the `pProperties` array, and on
return the variable is overwritten with the number of structures actually
written to `pProperties`.
If the value of `pPropertyCount` is less than the number of display
modes for `physicalDevice`, at most `pPropertyCount` structures will
be written, and [VK_INCOMPLETE](VkResult.html) will be returned instead of
[VK_SUCCESS](VkResult.html), to indicate that not all the available display modes were
returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetDisplayModePropertiesKHR-physicalDevice-parameter) VUID-vkGetDisplayModePropertiesKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetDisplayModePropertiesKHR-display-parameter) VUID-vkGetDisplayModePropertiesKHR-display-parameter

 `display` **must** be a valid [VkDisplayKHR](VkDisplayKHR.html) handle

* 
[](#VUID-vkGetDisplayModePropertiesKHR-pPropertyCount-parameter) VUID-vkGetDisplayModePropertiesKHR-pPropertyCount-parameter

 `pPropertyCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetDisplayModePropertiesKHR-pProperties-parameter) VUID-vkGetDisplayModePropertiesKHR-pProperties-parameter

 If the value referenced by `pPropertyCount` is not `0`, and `pProperties` is not `NULL`, `pProperties` **must** be a valid pointer to an array of `pPropertyCount` [VkDisplayModePropertiesKHR](VkDisplayModePropertiesKHR.html) structures

* 
[](#VUID-vkGetDisplayModePropertiesKHR-display-parent) VUID-vkGetDisplayModePropertiesKHR-display-parent

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

[VK_KHR_display](VK_KHR_display.html), [VkDisplayKHR](VkDisplayKHR.html), [VkDisplayModePropertiesKHR](VkDisplayModePropertiesKHR.html), [VkPhysicalDevice](VkPhysicalDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetDisplayModePropertiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
