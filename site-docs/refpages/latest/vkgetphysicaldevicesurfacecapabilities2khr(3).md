# vkGetPhysicalDeviceSurfaceCapabilities2KHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceSurfaceCapabilities2KHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceSurfaceCapabilities2KHR - Reports capabilities of a surface on a physical device

To query the basic capabilities of a surface defined by the core or
extensions, call:

// Provided by VK_KHR_get_surface_capabilities2
VkResult vkGetPhysicalDeviceSurfaceCapabilities2KHR(
    VkPhysicalDevice                            physicalDevice,
    const VkPhysicalDeviceSurfaceInfo2KHR*      pSurfaceInfo,
    VkSurfaceCapabilities2KHR*                  pSurfaceCapabilities);

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
`pSurfaceCapabilities` is a pointer to a
[VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html) structure in which the capabilities are
returned.

`vkGetPhysicalDeviceSurfaceCapabilities2KHR` behaves similarly to
[vkGetPhysicalDeviceSurfaceCapabilitiesKHR](vkGetPhysicalDeviceSurfaceCapabilitiesKHR.html), with the ability to specify
extended inputs via chained input structures, and to return extended
information via chained output structures.

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-pSurfaceInfo-06521) VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-pSurfaceInfo-06521

If the `[VK_GOOGLE_surfaceless_query](VK_GOOGLE_surfaceless_query.html)` extension is not enabled,
`pSurfaceInfo->surface` **must** be a valid [VkSurfaceKHR](VkSurfaceKHR.html) handle

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-pSurfaceInfo-06522) VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-pSurfaceInfo-06522

If `pSurfaceInfo->surface` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`pSurfaceInfo->surface` **must** be supported by `physicalDevice`,
as reported by [vkGetPhysicalDeviceSurfaceSupportKHR](vkGetPhysicalDeviceSurfaceSupportKHR.html) or an
equivalent platform-specific mechanism

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-pNext-02671) VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-pNext-02671

If a [VkSurfaceCapabilitiesFullScreenExclusiveEXT](VkSurfaceCapabilitiesFullScreenExclusiveEXT.html) structure is
included in the `pNext` chain of `pSurfaceCapabilities`, a
[VkSurfaceFullScreenExclusiveWin32InfoEXT](VkSurfaceFullScreenExclusiveWin32InfoEXT.html) structure **must** be
included in the `pNext` chain of `pSurfaceInfo`

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-pNext-07776) VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-pNext-07776

If a [VkSurfacePresentModeCompatibilityKHR](VkSurfacePresentModeCompatibilityKHR.html) structure is included in
the `pNext` chain of `pSurfaceCapabilities`, a
[VkSurfacePresentModeKHR](VkSurfacePresentModeKHR.html) structure **must** be included in the
`pNext` chain of `pSurfaceInfo`

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-pNext-07777) VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-pNext-07777

If a [VkSurfacePresentScalingCapabilitiesKHR](VkSurfacePresentScalingCapabilitiesKHR.html) structure is included
in the `pNext` chain of `pSurfaceCapabilities`, a
[VkSurfacePresentModeKHR](VkSurfacePresentModeKHR.html) structure **must** be included in the
`pNext` chain of `pSurfaceInfo`

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-pNext-07778) VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-pNext-07778

If a [VkSurfacePresentModeCompatibilityKHR](VkSurfacePresentModeCompatibilityKHR.html) structure is included in
the `pNext` chain of `pSurfaceCapabilities`,
`pSurfaceInfo->surface` **must** be a valid [VkSurfaceKHR](VkSurfaceKHR.html) handle

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-pNext-07779) VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-pNext-07779

If a [VkSurfacePresentScalingCapabilitiesKHR](VkSurfacePresentScalingCapabilitiesKHR.html) structure is included
in the `pNext` chain of `pSurfaceCapabilities`,
`pSurfaceInfo->surface` **must** be a valid [VkSurfaceKHR](VkSurfaceKHR.html) handle

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-physicalDevice-parameter) VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-pSurfaceInfo-parameter) VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-pSurfaceInfo-parameter

 `pSurfaceInfo` **must** be a valid pointer to a valid [VkPhysicalDeviceSurfaceInfo2KHR](VkPhysicalDeviceSurfaceInfo2KHR.html) structure

* 
[](#VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-pSurfaceCapabilities-parameter) VUID-vkGetPhysicalDeviceSurfaceCapabilities2KHR-pSurfaceCapabilities-parameter

 `pSurfaceCapabilities` **must** be a valid pointer to a [VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html) structure

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

[VK_KHR_get_surface_capabilities2](VK_KHR_get_surface_capabilities2.html), [VkPhysicalDevice](VkPhysicalDevice.html), [VkPhysicalDeviceSurfaceInfo2KHR](VkPhysicalDeviceSurfaceInfo2KHR.html), [VkSurfaceCapabilities2KHR](VkSurfaceCapabilities2KHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetPhysicalDeviceSurfaceCapabilities2KHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
