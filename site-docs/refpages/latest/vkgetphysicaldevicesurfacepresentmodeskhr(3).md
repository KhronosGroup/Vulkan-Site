# vkGetPhysicalDeviceSurfacePresentModesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceSurfacePresentModesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceSurfacePresentModesKHR - Query supported presentation modes

To query the supported presentation modes for a surface, call:

// Provided by VK_KHR_surface
VkResult vkGetPhysicalDeviceSurfacePresentModesKHR(
    VkPhysicalDevice                            physicalDevice,
    VkSurfaceKHR                                surface,
    uint32_t*                                   pPresentModeCount,
    VkPresentModeKHR*                           pPresentModes);

* 
`physicalDevice` is the physical device that will be associated with
the swapchain to be created, as described for
[vkCreateSwapchainKHR](vkCreateSwapchainKHR.html).

* 
`surface` is the surface that will be associated with the swapchain.

* 
`pPresentModeCount` is a pointer to an integer related to the number
of presentation modes available or queried, as described below.

* 
`pPresentModes` is either `NULL` or a pointer to an array of
[VkPresentModeKHR](VkPresentModeKHR.html) values, indicating the supported presentation
modes.

If `pPresentModes` is `NULL`, then the number of presentation modes
supported for the given `surface` is returned in
`pPresentModeCount`.
Otherwise, `pPresentModeCount` **must** point to a variable set by the
application to the number of elements in the `pPresentModes` array, and
on return the variable is overwritten with the number of values actually
written to `pPresentModes`.
If the value of `pPresentModeCount` is less than the number of
presentation modes supported, at most `pPresentModeCount` values will be
written, and [VK_INCOMPLETE](VkResult.html) will be returned instead of
[VK_SUCCESS](VkResult.html), to indicate that not all the available modes were
returned.

If the `[VK_GOOGLE_surfaceless_query](VK_GOOGLE_surfaceless_query.html)` extension is enabled and
`surface` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the values returned in
`pPresentModes` will only indicate support for
[VK_PRESENT_MODE_FIFO_KHR](VkPresentModeKHR.html),
[VK_PRESENT_MODE_SHARED_DEMAND_REFRESH_KHR](VkPresentModeKHR.html), and
[VK_PRESENT_MODE_SHARED_CONTINUOUS_REFRESH_KHR](VkPresentModeKHR.html).
To query support for any other present mode, a valid handle **must** be
provided in `surface`.

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceSurfacePresentModesKHR-surface-06524) VUID-vkGetPhysicalDeviceSurfacePresentModesKHR-surface-06524

If the `[VK_GOOGLE_surfaceless_query](VK_GOOGLE_surfaceless_query.html)` extension is not enabled,
`surface` **must** be a valid [VkSurfaceKHR](VkSurfaceKHR.html) handle

* 
[](#VUID-vkGetPhysicalDeviceSurfacePresentModesKHR-surface-06525) VUID-vkGetPhysicalDeviceSurfacePresentModesKHR-surface-06525

If `surface` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`surface` **must** be supported by `physicalDevice`, as reported by
[vkGetPhysicalDeviceSurfaceSupportKHR](vkGetPhysicalDeviceSurfaceSupportKHR.html) or an equivalent
platform-specific mechanism

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceSurfacePresentModesKHR-physicalDevice-parameter) VUID-vkGetPhysicalDeviceSurfacePresentModesKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceSurfacePresentModesKHR-surface-parameter) VUID-vkGetPhysicalDeviceSurfacePresentModesKHR-surface-parameter

 If `surface` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `surface` **must** be a valid [VkSurfaceKHR](VkSurfaceKHR.html) handle

* 
[](#VUID-vkGetPhysicalDeviceSurfacePresentModesKHR-pPresentModeCount-parameter) VUID-vkGetPhysicalDeviceSurfacePresentModesKHR-pPresentModeCount-parameter

 `pPresentModeCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceSurfacePresentModesKHR-pPresentModes-parameter) VUID-vkGetPhysicalDeviceSurfacePresentModesKHR-pPresentModes-parameter

 If the value referenced by `pPresentModeCount` is not `0`, and `pPresentModes` is not `NULL`, `pPresentModes` **must** be a valid pointer to an array of `pPresentModeCount` [VkPresentModeKHR](VkPresentModeKHR.html) values

* 
[](#VUID-vkGetPhysicalDeviceSurfacePresentModesKHR-commonparent) VUID-vkGetPhysicalDeviceSurfacePresentModesKHR-commonparent

 Both of `physicalDevice`, and `surface` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkInstance](VkInstance.html)

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

[VK_KHR_surface](VK_KHR_surface.html), [VkPhysicalDevice](VkPhysicalDevice.html), [VkPresentModeKHR](VkPresentModeKHR.html), [VkSurfaceKHR](VkSurfaceKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetPhysicalDeviceSurfacePresentModesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
