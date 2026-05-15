# vkGetDisplayPlaneCapabilities2KHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDisplayPlaneCapabilities2KHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDisplayPlaneCapabilities2KHR - Query capabilities of a mode and plane combination

To query the capabilities of a given mode and plane combination, call:

// Provided by VK_KHR_get_display_properties2
VkResult vkGetDisplayPlaneCapabilities2KHR(
    VkPhysicalDevice                            physicalDevice,
    const VkDisplayPlaneInfo2KHR*               pDisplayPlaneInfo,
    VkDisplayPlaneCapabilities2KHR*             pCapabilities);

* 
`physicalDevice` is the physical device associated with
`pDisplayPlaneInfo`.

* 
`pDisplayPlaneInfo` is a pointer to a [VkDisplayPlaneInfo2KHR](VkDisplayPlaneInfo2KHR.html)
structure describing the plane and mode.

* 
`pCapabilities` is a pointer to a
[VkDisplayPlaneCapabilities2KHR](VkDisplayPlaneCapabilities2KHR.html) structure in which the capabilities
are returned.

`vkGetDisplayPlaneCapabilities2KHR` behaves similarly to
[vkGetDisplayPlaneCapabilitiesKHR](vkGetDisplayPlaneCapabilitiesKHR.html), with the ability to specify extended
inputs via chained input structures, and to return extended information via
chained output structures.

Valid Usage (Implicit)

* 
[](#VUID-vkGetDisplayPlaneCapabilities2KHR-physicalDevice-parameter) VUID-vkGetDisplayPlaneCapabilities2KHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetDisplayPlaneCapabilities2KHR-pDisplayPlaneInfo-parameter) VUID-vkGetDisplayPlaneCapabilities2KHR-pDisplayPlaneInfo-parameter

 `pDisplayPlaneInfo` **must** be a valid pointer to a valid [VkDisplayPlaneInfo2KHR](VkDisplayPlaneInfo2KHR.html) structure

* 
[](#VUID-vkGetDisplayPlaneCapabilities2KHR-pCapabilities-parameter) VUID-vkGetDisplayPlaneCapabilities2KHR-pCapabilities-parameter

 `pCapabilities` **must** be a valid pointer to a [VkDisplayPlaneCapabilities2KHR](VkDisplayPlaneCapabilities2KHR.html) structure

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

[VK_KHR_get_display_properties2](VK_KHR_get_display_properties2.html), [VkDisplayPlaneCapabilities2KHR](VkDisplayPlaneCapabilities2KHR.html), [VkDisplayPlaneInfo2KHR](VkDisplayPlaneInfo2KHR.html), [VkPhysicalDevice](VkPhysicalDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetDisplayPlaneCapabilities2KHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
