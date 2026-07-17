# vkGetPhysicalDeviceSurfaceFormats2KHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceSurfaceFormats2KHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceSurfaceFormats2KHR - Query color formats supported by surface

To query the supported swapchain format tuples for a surface, call:

// Provided by VK_KHR_get_surface_capabilities2
VkResult vkGetPhysicalDeviceSurfaceFormats2KHR(
    VkPhysicalDevice                            physicalDevice,
    const VkPhysicalDeviceSurfaceInfo2KHR*      pSurfaceInfo,
    uint32_t*                                   pSurfaceFormatCount,
    VkSurfaceFormat2KHR*                        pSurfaceFormats);

* 
`physicalDevice` is the physical device that will be associated with
the swapchain to be created, as described for
[vkCreateSwapchainKHR](vkCreateSwapchainKHR.html).

* 
`pSurfaceInfo` is a pointer to a
[VkPhysicalDeviceSurfaceInfo2KHR](VkPhysicalDeviceSurfaceInfo2KHR.html) structure describing the surface
and other fixed parameters that would be consumed by
[vkCreateSwapchainKHR](vkCreateSwapchainKHR.html).

* 
`pSurfaceFormatCount` is a pointer to an integer related to the
number of format tuples available or queried, as described below.

* 
`pSurfaceFormats` is either `NULL` or a pointer to an array of
[VkSurfaceFormat2KHR](VkSurfaceFormat2KHR.html) structures.

[vkGetPhysicalDeviceSurfaceFormats2KHR](#) behaves similarly to
[vkGetPhysicalDeviceSurfaceFormatsKHR](vkGetPhysicalDeviceSurfaceFormatsKHR.html), with the ability to be extended
via `pNext` chains.

If `pSurfaceFormats` is `NULL`, then the number of format tuples
supported for the given `surface` is returned in
`pSurfaceFormatCount`.
Otherwise, `pSurfaceFormatCount` **must** point to a variable set by the
application to the number of elements in the `pSurfaceFormats` array,
and on return the variable is overwritten with the number of structures
actually written to `pSurfaceFormats`.
If the value of `pSurfaceFormatCount` is less than the number of format
tuples supported, at most `pSurfaceFormatCount` structures will be
written, and [VK_INCOMPLETE](VkResult.html) will be returned instead of
[VK_SUCCESS](VkResult.html), to indicate that not all the available values were
returned.

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceSurfaceFormats2KHR-pSurfaceInfo-06521) VUID-vkGetPhysicalDeviceSurfaceFormats2KHR-pSurfaceInfo-06521

If the `[VK_GOOGLE_surfaceless_query](VK_GOOGLE_surfaceless_query.html)` extension is not enabled,
`pSurfaceInfo->surface` **must** be a valid [VkSurfaceKHR](VkSurfaceKHR.html) handle

* 
[](#VUID-vkGetPhysicalDeviceSurfaceFormats2KHR-pSurfaceInfo-06522) VUID-vkGetPhysicalDeviceSurfaceFormats2KHR-pSurfaceInfo-06522

If `pSurfaceInfo->surface` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`pSurfaceInfo->surface` **must** be supported by `physicalDevice`,
as reported by [vkGetPhysicalDeviceSurfaceSupportKHR](vkGetPhysicalDeviceSurfaceSupportKHR.html) or an
equivalent platform-specific mechanism

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceSurfaceFormats2KHR-physicalDevice-parameter) VUID-vkGetPhysicalDeviceSurfaceFormats2KHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceSurfaceFormats2KHR-pSurfaceInfo-parameter) VUID-vkGetPhysicalDeviceSurfaceFormats2KHR-pSurfaceInfo-parameter

 `pSurfaceInfo` **must** be a valid pointer to a valid [VkPhysicalDeviceSurfaceInfo2KHR](VkPhysicalDeviceSurfaceInfo2KHR.html) structure

* 
[](#VUID-vkGetPhysicalDeviceSurfaceFormats2KHR-pSurfaceFormatCount-parameter) VUID-vkGetPhysicalDeviceSurfaceFormats2KHR-pSurfaceFormatCount-parameter

 `pSurfaceFormatCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceSurfaceFormats2KHR-pSurfaceFormats-parameter) VUID-vkGetPhysicalDeviceSurfaceFormats2KHR-pSurfaceFormats-parameter

 If the value referenced by `pSurfaceFormatCount` is not `0`, and `pSurfaceFormats` is not `NULL`, `pSurfaceFormats` **must** be a valid pointer to an array of `pSurfaceFormatCount` [VkSurfaceFormat2KHR](VkSurfaceFormat2KHR.html) structures

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
[VK_ERROR_SURFACE_LOST_KHR](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_KHR_get_surface_capabilities2](VK_KHR_get_surface_capabilities2.html), [VkPhysicalDevice](VkPhysicalDevice.html), [VkPhysicalDeviceSurfaceInfo2KHR](VkPhysicalDeviceSurfaceInfo2KHR.html), [VkSurfaceFormat2KHR](VkSurfaceFormat2KHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetPhysicalDeviceSurfaceFormats2KHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
