# vkGetPhysicalDeviceSurfaceSupportKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceSurfaceSupportKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceSurfaceSupportKHR - Query if presentation is supported

To determine whether a queue family of a physical device supports
presentation to a given surface, call:

// Provided by VK_KHR_surface
VkResult vkGetPhysicalDeviceSurfaceSupportKHR(
    VkPhysicalDevice                            physicalDevice,
    uint32_t                                    queueFamilyIndex,
    VkSurfaceKHR                                surface,
    VkBool32*                                   pSupported);

* 
`physicalDevice` is the physical device.

* 
`queueFamilyIndex` is the queue family.

* 
`surface` is the surface.

* 
`pSupported` is a pointer to a `VkBool32`.
[VK_TRUE](VK_TRUE.html) indicates support, and [VK_FALSE](VK_FALSE.html) indicates no
support.

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceSurfaceSupportKHR-queueFamilyIndex-01269) VUID-vkGetPhysicalDeviceSurfaceSupportKHR-queueFamilyIndex-01269

`queueFamilyIndex` **must** be less than
`pQueueFamilyPropertyCount` returned by
`vkGetPhysicalDeviceQueueFamilyProperties` for the given
`physicalDevice`

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceSurfaceSupportKHR-physicalDevice-parameter) VUID-vkGetPhysicalDeviceSurfaceSupportKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceSurfaceSupportKHR-surface-parameter) VUID-vkGetPhysicalDeviceSurfaceSupportKHR-surface-parameter

 `surface` **must** be a valid [VkSurfaceKHR](VkSurfaceKHR.html) handle

* 
[](#VUID-vkGetPhysicalDeviceSurfaceSupportKHR-pSupported-parameter) VUID-vkGetPhysicalDeviceSurfaceSupportKHR-pSupported-parameter

 `pSupported` **must** be a valid pointer to a `VkBool32` value

* 
[](#VUID-vkGetPhysicalDeviceSurfaceSupportKHR-commonparent) VUID-vkGetPhysicalDeviceSurfaceSupportKHR-commonparent

 Both of `physicalDevice`, and `surface` **must** have been created, allocated, or retrieved from the same [VkInstance](VkInstance.html)

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
[VK_ERROR_SURFACE_LOST_KHR](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_KHR_surface](VK_KHR_surface.html), `VkBool32`, [VkPhysicalDevice](VkPhysicalDevice.html), [VkSurfaceKHR](VkSurfaceKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetPhysicalDeviceSurfaceSupportKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
