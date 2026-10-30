# vkGetPhysicalDeviceSurfacePresentModes2EXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceSurfacePresentModes2EXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceSurfacePresentModes2EXT - Query supported presentation modes

To query the supported presentation modes for a surface combined with select
other fixed swapchain creation parameters, call:

// Provided by VK_EXT_full_screen_exclusive
VkResult vkGetPhysicalDeviceSurfacePresentModes2EXT(
    VkPhysicalDevice                            physicalDevice,
    const VkPhysicalDeviceSurfaceInfo2KHR*      pSurfaceInfo,
    uint32_t*                                   pPresentModeCount,
    VkPresentModeKHR*                           pPresentModes);

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
`pPresentModeCount` is a pointer to an integer related to the number
of presentation modes available or queried, as described below.

* 
`pPresentModes` is either `NULL` or a pointer to an array of
[VkPresentModeKHR](VkPresentModeKHR.html) values, indicating the supported presentation
modes.

`vkGetPhysicalDeviceSurfacePresentModes2EXT` behaves similarly to
[vkGetPhysicalDeviceSurfacePresentModesKHR](vkGetPhysicalDeviceSurfacePresentModesKHR.html), with the ability to specify
extended inputs via chained input structures.

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceSurfacePresentModes2EXT-pSurfaceInfo-06521) VUID-vkGetPhysicalDeviceSurfacePresentModes2EXT-pSurfaceInfo-06521

If the `[VK_GOOGLE_surfaceless_query](VK_GOOGLE_surfaceless_query.html)` extension is not enabled,
`pSurfaceInfo->surface` **must** be a valid [VkSurfaceKHR](VkSurfaceKHR.html) handle

* 
[](#VUID-vkGetPhysicalDeviceSurfacePresentModes2EXT-pSurfaceInfo-06522) VUID-vkGetPhysicalDeviceSurfacePresentModes2EXT-pSurfaceInfo-06522

If `pSurfaceInfo->surface` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`pSurfaceInfo->surface` **must** be supported by `physicalDevice`,
as reported by [vkGetPhysicalDeviceSurfaceSupportKHR](vkGetPhysicalDeviceSurfaceSupportKHR.html) or an
equivalent platform-specific mechanism

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceSurfacePresentModes2EXT-physicalDevice-parameter) VUID-vkGetPhysicalDeviceSurfacePresentModes2EXT-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceSurfacePresentModes2EXT-pSurfaceInfo-parameter) VUID-vkGetPhysicalDeviceSurfacePresentModes2EXT-pSurfaceInfo-parameter

 `pSurfaceInfo` **must** be a valid pointer to a valid [VkPhysicalDeviceSurfaceInfo2KHR](VkPhysicalDeviceSurfaceInfo2KHR.html) structure

* 
[](#VUID-vkGetPhysicalDeviceSurfacePresentModes2EXT-pPresentModeCount-parameter) VUID-vkGetPhysicalDeviceSurfacePresentModes2EXT-pPresentModeCount-parameter

 `pPresentModeCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceSurfacePresentModes2EXT-pPresentModes-parameter) VUID-vkGetPhysicalDeviceSurfacePresentModes2EXT-pPresentModes-parameter

 If the value referenced by `pPresentModeCount` is not `0`, and `pPresentModes` is not `NULL`, `pPresentModes` **must** be a valid pointer to an array of `pPresentModeCount` [VkPresentModeKHR](VkPresentModeKHR.html) values

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

[VK_EXT_full_screen_exclusive](VK_EXT_full_screen_exclusive.html), [VkPhysicalDevice](VkPhysicalDevice.html), [VkPhysicalDeviceSurfaceInfo2KHR](VkPhysicalDeviceSurfaceInfo2KHR.html), [VkPresentModeKHR](VkPresentModeKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetPhysicalDeviceSurfacePresentModes2EXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
