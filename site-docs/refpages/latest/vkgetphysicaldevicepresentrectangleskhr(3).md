# vkGetPhysicalDevicePresentRectanglesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDevicePresentRectanglesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDevicePresentRectanglesKHR - Query present rectangles for a surface on a physical device

When using [VK_DEVICE_GROUP_PRESENT_MODE_LOCAL_MULTI_DEVICE_BIT_KHR](VkDeviceGroupPresentModeFlagBitsKHR.html),
the application **may** need to know which regions of the surface are used when
presenting locally on each physical device.
Presentation of swapchain images to this surface need only have valid
contents in the regions returned by this command.

To query a set of rectangles used in presentation on the physical device,
call:

// Provided by VK_VERSION_1_1 with VK_KHR_swapchain, VK_KHR_device_group with VK_KHR_surface
VkResult vkGetPhysicalDevicePresentRectanglesKHR(
    VkPhysicalDevice                            physicalDevice,
    VkSurfaceKHR                                surface,
    uint32_t*                                   pRectCount,
    VkRect2D*                                   pRects);

* 
`physicalDevice` is the physical device.

* 
`surface` is the surface.

* 
`pRectCount` is a pointer to an integer related to the number of
rectangles available or queried, as described below.

* 
`pRects` is either `NULL` or a pointer to an array of [VkRect2D](VkRect2D.html)
structures.

If `pRects` is `NULL`, then the number of rectangles used when
presenting the given `surface` is returned in `pRectCount`.
Otherwise, `pRectCount` **must** point to a variable set by the application
to the number of elements in the `pRects` array, and on return the
variable is overwritten with the number of structures actually written to
`pRects`.
If the value of `pRectCount` is less than the number of rectangles, at
most `pRectCount` structures will be written, and [VK_INCOMPLETE](VkResult.html)
will be returned instead of [VK_SUCCESS](VkResult.html), to indicate that not all the
available rectangles were returned.

The values returned by this command are not invariant, and **may** change in
response to the surface being moved, resized, or occluded.

The rectangles returned by this command **must** not overlap.

Valid Usage

* 
[](#VUID-vkGetPhysicalDevicePresentRectanglesKHR-surface-06211) VUID-vkGetPhysicalDevicePresentRectanglesKHR-surface-06211

`surface` **must** be supported by `physicalDevice`, as reported by
[vkGetPhysicalDeviceSurfaceSupportKHR](vkGetPhysicalDeviceSurfaceSupportKHR.html) or an equivalent
platform-specific mechanism

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDevicePresentRectanglesKHR-physicalDevice-parameter) VUID-vkGetPhysicalDevicePresentRectanglesKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDevicePresentRectanglesKHR-surface-parameter) VUID-vkGetPhysicalDevicePresentRectanglesKHR-surface-parameter

 `surface` **must** be a valid [VkSurfaceKHR](VkSurfaceKHR.html) handle

* 
[](#VUID-vkGetPhysicalDevicePresentRectanglesKHR-pRectCount-parameter) VUID-vkGetPhysicalDevicePresentRectanglesKHR-pRectCount-parameter

 `pRectCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDevicePresentRectanglesKHR-pRects-parameter) VUID-vkGetPhysicalDevicePresentRectanglesKHR-pRects-parameter

 If the value referenced by `pRectCount` is not `0`, and `pRects` is not `NULL`, `pRects` **must** be a valid pointer to an array of `pRectCount` [VkRect2D](VkRect2D.html) structures

* 
[](#VUID-vkGetPhysicalDevicePresentRectanglesKHR-commonparent) VUID-vkGetPhysicalDevicePresentRectanglesKHR-commonparent

 Both of `physicalDevice`, and `surface` **must** have been created, allocated, or retrieved from the same [VkInstance](VkInstance.html)

Host Synchronization

* 
Host access to `surface` **must** be externally synchronized

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

[VK_KHR_device_group](VK_KHR_device_group.html), [VK_KHR_surface](VK_KHR_surface.html), [VK_KHR_swapchain](VK_KHR_swapchain.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkPhysicalDevice](VkPhysicalDevice.html), [VkRect2D](VkRect2D.html), [VkSurfaceKHR](VkSurfaceKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetPhysicalDevicePresentRectanglesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
