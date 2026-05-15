# vkGetPhysicalDeviceSurfaceCapabilitiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceSurfaceCapabilitiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceSurfaceCapabilitiesKHR - Query surface capabilities

To query the basic capabilities of a surface, needed in order to create a
swapchain, call:

// Provided by VK_KHR_surface
VkResult vkGetPhysicalDeviceSurfaceCapabilitiesKHR(
    VkPhysicalDevice                            physicalDevice,
    VkSurfaceKHR                                surface,
    VkSurfaceCapabilitiesKHR*                   pSurfaceCapabilities);

* 
`physicalDevice` is the physical device that will be associated with
the swapchain to be created, as described for
[vkCreateSwapchainKHR](vkCreateSwapchainKHR.html).

* 
`surface` is the surface that will be associated with the swapchain.

* 
`pSurfaceCapabilities` is a pointer to a
[VkSurfaceCapabilitiesKHR](VkSurfaceCapabilitiesKHR.html) structure in which the capabilities are
returned.

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilitiesKHR-surface-06211) VUID-vkGetPhysicalDeviceSurfaceCapabilitiesKHR-surface-06211

`surface` **must** be supported by `physicalDevice`, as reported by
[vkGetPhysicalDeviceSurfaceSupportKHR](vkGetPhysicalDeviceSurfaceSupportKHR.html) or an equivalent
platform-specific mechanism

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilitiesKHR-physicalDevice-parameter) VUID-vkGetPhysicalDeviceSurfaceCapabilitiesKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilitiesKHR-surface-parameter) VUID-vkGetPhysicalDeviceSurfaceCapabilitiesKHR-surface-parameter

 `surface` **must** be a valid [VkSurfaceKHR](VkSurfaceKHR.html) handle

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilitiesKHR-pSurfaceCapabilities-parameter) VUID-vkGetPhysicalDeviceSurfaceCapabilitiesKHR-pSurfaceCapabilities-parameter

 `pSurfaceCapabilities` **must** be a valid pointer to a [VkSurfaceCapabilitiesKHR](VkSurfaceCapabilitiesKHR.html) structure

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilitiesKHR-commonparent) VUID-vkGetPhysicalDeviceSurfaceCapabilitiesKHR-commonparent

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

[VK_KHR_surface](VK_KHR_surface.html), [VkPhysicalDevice](VkPhysicalDevice.html), [VkSurfaceCapabilitiesKHR](VkSurfaceCapabilitiesKHR.html), [VkSurfaceKHR](VkSurfaceKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetPhysicalDeviceSurfaceCapabilitiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
