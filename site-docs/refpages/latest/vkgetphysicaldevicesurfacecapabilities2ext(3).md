# vkGetPhysicalDeviceSurfaceCapabilities2EXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceSurfaceCapabilities2EXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceSurfaceCapabilities2EXT - Query surface capabilities

To query the basic capabilities of a surface, needed in order to create a
swapchain, call:

// Provided by VK_EXT_display_surface_counter
VkResult vkGetPhysicalDeviceSurfaceCapabilities2EXT(
    VkPhysicalDevice                            physicalDevice,
    VkSurfaceKHR                                surface,
    VkSurfaceCapabilities2EXT*                  pSurfaceCapabilities);

* 
`physicalDevice` is the physical device that will be associated with
the swapchain to be created, as described for
[vkCreateSwapchainKHR](vkCreateSwapchainKHR.html).

* 
`surface` is the surface that will be associated with the swapchain.

* 
`pSurfaceCapabilities` is a pointer to a
[VkSurfaceCapabilities2EXT](VkSurfaceCapabilities2EXT.html) structure in which the capabilities are
returned.

`vkGetPhysicalDeviceSurfaceCapabilities2EXT` behaves similarly to
[vkGetPhysicalDeviceSurfaceCapabilitiesKHR](vkGetPhysicalDeviceSurfaceCapabilitiesKHR.html), with the ability to return
extended information by adding extending structures to the `pNext` chain
of its `pSurfaceCapabilities` parameter.

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilities2EXT-surface-06211) VUID-vkGetPhysicalDeviceSurfaceCapabilities2EXT-surface-06211

`surface` **must** be supported by `physicalDevice`, as reported by
[vkGetPhysicalDeviceSurfaceSupportKHR](vkGetPhysicalDeviceSurfaceSupportKHR.html) or an equivalent
platform-specific mechanism

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilities2EXT-physicalDevice-parameter) VUID-vkGetPhysicalDeviceSurfaceCapabilities2EXT-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilities2EXT-surface-parameter) VUID-vkGetPhysicalDeviceSurfaceCapabilities2EXT-surface-parameter

 `surface` **must** be a valid [VkSurfaceKHR](VkSurfaceKHR.html) handle

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilities2EXT-pSurfaceCapabilities-parameter) VUID-vkGetPhysicalDeviceSurfaceCapabilities2EXT-pSurfaceCapabilities-parameter

 `pSurfaceCapabilities` **must** be a valid pointer to a [VkSurfaceCapabilities2EXT](VkSurfaceCapabilities2EXT.html) structure

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilities2EXT-commonparent) VUID-vkGetPhysicalDeviceSurfaceCapabilities2EXT-commonparent

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

[VK_EXT_display_surface_counter](VK_EXT_display_surface_counter.html), [VkPhysicalDevice](VkPhysicalDevice.html), [VkSurfaceCapabilities2EXT](VkSurfaceCapabilities2EXT.html), [VkSurfaceKHR](VkSurfaceKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetPhysicalDeviceSurfaceCapabilities2EXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
