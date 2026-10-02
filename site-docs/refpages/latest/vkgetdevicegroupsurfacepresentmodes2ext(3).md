# vkGetDeviceGroupSurfacePresentModes2EXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDeviceGroupSurfacePresentModes2EXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDeviceGroupSurfacePresentModes2EXT - Query device group present capabilities for a surface

To query the supported device group presentation modes for a surface
combined with select other fixed swapchain creation parameters, call:

// Provided by VK_EXT_full_screen_exclusive with VK_KHR_device_group or VK_VERSION_1_1
VkResult vkGetDeviceGroupSurfacePresentModes2EXT(
    VkDevice                                    device,
    const VkPhysicalDeviceSurfaceInfo2KHR*      pSurfaceInfo,
    VkDeviceGroupPresentModeFlagsKHR*           pModes);

* 
`device` is the logical device.

* 
`pSurfaceInfo` is a pointer to a
[VkPhysicalDeviceSurfaceInfo2KHR](VkPhysicalDeviceSurfaceInfo2KHR.html) structure describing the surface
and other fixed parameters that would be consumed by
[vkCreateSwapchainKHR](vkCreateSwapchainKHR.html).

* 
`pModes` is a pointer to a [VkDeviceGroupPresentModeFlagsKHR](VkDeviceGroupPresentModeFlagsKHR.html) in
which the supported device group present modes for the surface are
returned.

`vkGetDeviceGroupSurfacePresentModes2EXT` behaves similarly to
[vkGetDeviceGroupSurfacePresentModesKHR](vkGetDeviceGroupSurfacePresentModesKHR.html), with the ability to specify
extended inputs via chained input structures.

Valid Usage

* 
[](#VUID-vkGetDeviceGroupSurfacePresentModes2EXT-pSurfaceInfo-06213) VUID-vkGetDeviceGroupSurfacePresentModes2EXT-pSurfaceInfo-06213

`pSurfaceInfo->surface` **must** be supported by all physical devices
associated with `device`, as reported by
[vkGetPhysicalDeviceSurfaceSupportKHR](vkGetPhysicalDeviceSurfaceSupportKHR.html) or an equivalent
platform-specific mechanism

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceGroupSurfacePresentModes2EXT-device-parameter) VUID-vkGetDeviceGroupSurfacePresentModes2EXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetDeviceGroupSurfacePresentModes2EXT-pSurfaceInfo-parameter) VUID-vkGetDeviceGroupSurfacePresentModes2EXT-pSurfaceInfo-parameter

 `pSurfaceInfo` **must** be a valid pointer to a valid [VkPhysicalDeviceSurfaceInfo2KHR](VkPhysicalDeviceSurfaceInfo2KHR.html) structure

* 
[](#VUID-vkGetDeviceGroupSurfacePresentModes2EXT-pModes-parameter) VUID-vkGetDeviceGroupSurfacePresentModes2EXT-pModes-parameter

 `pModes` **must** be a valid pointer to a [VkDeviceGroupPresentModeFlagsKHR](VkDeviceGroupPresentModeFlagsKHR.html) value

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

[VK_EXT_full_screen_exclusive](VK_EXT_full_screen_exclusive.html), [VK_KHR_device_group](VK_KHR_device_group.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkDevice](VkDevice.html), [VkDeviceGroupPresentModeFlagsKHR](VkDeviceGroupPresentModeFlagsKHR.html), [VkPhysicalDeviceSurfaceInfo2KHR](VkPhysicalDeviceSurfaceInfo2KHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetDeviceGroupSurfacePresentModes2EXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
