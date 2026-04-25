# vkGetPhysicalDeviceSurfaceFormatsKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceSurfaceFormatsKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceSurfaceFormatsKHR - Query color formats supported by surface

To query the supported swapchain format-color space pairs for a surface,
call:

// Provided by VK_KHR_surface
VkResult vkGetPhysicalDeviceSurfaceFormatsKHR(
    VkPhysicalDevice                            physicalDevice,
    VkSurfaceKHR                                surface,
    uint32_t*                                   pSurfaceFormatCount,
    VkSurfaceFormatKHR*                         pSurfaceFormats);

* 
`physicalDevice` is the physical device that will be associated with
the swapchain to be created, as described for
[vkCreateSwapchainKHR](vkCreateSwapchainKHR.html).

* 
`surface` is the surface that will be associated with the swapchain.

* 
`pSurfaceFormatCount` is a pointer to an integer related to the
number of format pairs available or queried, as described below.

* 
`pSurfaceFormats` is either `NULL` or a pointer to an array of
`VkSurfaceFormatKHR` structures.

If `pSurfaceFormats` is `NULL`, then the number of format pairs
supported for the given `surface` is returned in
`pSurfaceFormatCount`.
Otherwise, `pSurfaceFormatCount` **must** point to a variable set by the
application to the number of elements in the `pSurfaceFormats` array,
and on return the variable is overwritten with the number of structures
actually written to `pSurfaceFormats`.
If the value of `pSurfaceFormatCount` is less than the number of format
pairs supported, at most `pSurfaceFormatCount` structures will be
written, and [VK_INCOMPLETE](VkResult.html) will be returned instead of
[VK_SUCCESS](VkResult.html), to indicate that not all the available format pairs were
returned.

The number of format pairs supported **must** be greater than or equal to 1.
`pSurfaceFormats` **must** not contain an entry whose value for
`format` is [VK_FORMAT_UNDEFINED](VkFormat.html).

If `pSurfaceFormats` includes an entry whose value for `colorSpace`
is [VK_COLOR_SPACE_SRGB_NONLINEAR_KHR](VkColorSpaceKHR.html) and whose value for `format`
is a UNORM (or SRGB) format and the corresponding SRGB (or UNORM) format is
a color renderable format for [VK_IMAGE_TILING_OPTIMAL](VkImageTiling.html), then
`pSurfaceFormats` **must** also contain an entry with the same value for
`colorSpace` and `format` equal to the corresponding SRGB (or UNORM)
format.

If the `[VK_GOOGLE_surfaceless_query](VK_GOOGLE_surfaceless_query.html)` extension is enabled, the values
returned in `pSurfaceFormats` will be identical for every valid surface
created on this physical device, and so `surface` **can** be
[VK_NULL_HANDLE](VK_NULL_HANDLE.html).

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceSurfaceFormatsKHR-surface-06524) VUID-vkGetPhysicalDeviceSurfaceFormatsKHR-surface-06524

If the `[VK_GOOGLE_surfaceless_query](VK_GOOGLE_surfaceless_query.html)` extension is not enabled,
`surface` **must** be a valid [VkSurfaceKHR](VkSurfaceKHR.html) handle

* 
[](#VUID-vkGetPhysicalDeviceSurfaceFormatsKHR-surface-06525) VUID-vkGetPhysicalDeviceSurfaceFormatsKHR-surface-06525

If `surface` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`surface` **must** be supported by `physicalDevice`, as reported by
[vkGetPhysicalDeviceSurfaceSupportKHR](vkGetPhysicalDeviceSurfaceSupportKHR.html) or an equivalent
platform-specific mechanism

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceSurfaceFormatsKHR-physicalDevice-parameter) VUID-vkGetPhysicalDeviceSurfaceFormatsKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceSurfaceFormatsKHR-surface-parameter) VUID-vkGetPhysicalDeviceSurfaceFormatsKHR-surface-parameter

 If `surface` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `surface` **must** be a valid [VkSurfaceKHR](VkSurfaceKHR.html) handle

* 
[](#VUID-vkGetPhysicalDeviceSurfaceFormatsKHR-pSurfaceFormatCount-parameter) VUID-vkGetPhysicalDeviceSurfaceFormatsKHR-pSurfaceFormatCount-parameter

 `pSurfaceFormatCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceSurfaceFormatsKHR-pSurfaceFormats-parameter) VUID-vkGetPhysicalDeviceSurfaceFormatsKHR-pSurfaceFormats-parameter

 If the value referenced by `pSurfaceFormatCount` is not `0`, and `pSurfaceFormats` is not `NULL`, `pSurfaceFormats` **must** be a valid pointer to an array of `pSurfaceFormatCount` [VkSurfaceFormatKHR](VkSurfaceFormatKHR.html) structures

* 
[](#VUID-vkGetPhysicalDeviceSurfaceFormatsKHR-commonparent) VUID-vkGetPhysicalDeviceSurfaceFormatsKHR-commonparent

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

[VK_KHR_surface](VK_KHR_surface.html), [VkPhysicalDevice](VkPhysicalDevice.html), [VkSurfaceFormatKHR](VkSurfaceFormatKHR.html), [VkSurfaceKHR](VkSurfaceKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetPhysicalDeviceSurfaceFormatsKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
