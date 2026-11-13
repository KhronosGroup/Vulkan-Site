# vkGetDeviceGroupSurfacePresentModesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDeviceGroupSurfacePresentModesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDeviceGroupSurfacePresentModesKHR - Query present capabilities for a surface

Some surfaces **may** not be capable of using all the device group present
modes.

To query the supported device group present modes for a particular surface,
call:

// Provided by VK_VERSION_1_1 with VK_KHR_swapchain, VK_KHR_device_group with VK_KHR_surface
VkResult vkGetDeviceGroupSurfacePresentModesKHR(
    VkDevice                                    device,
    VkSurfaceKHR                                surface,
    VkDeviceGroupPresentModeFlagsKHR*           pModes);

* 
`device` is the logical device.

* 
`surface` is the surface.

* 
`pModes` is a pointer to a [VkDeviceGroupPresentModeFlagsKHR](VkDeviceGroupPresentModeFlagsKHR.html) in
which the supported device group present modes for the surface are
returned.

The modes returned by this command are not invariant, and **may** change in
response to the surface being moved, resized, or occluded.
These modes **must** be a subset of the modes returned by
[vkGetDeviceGroupPresentCapabilitiesKHR](vkGetDeviceGroupPresentCapabilitiesKHR.html).

Valid Usage

* 
[](#VUID-vkGetDeviceGroupSurfacePresentModesKHR-surface-06212) VUID-vkGetDeviceGroupSurfacePresentModesKHR-surface-06212

`surface` **must** be supported by all physical devices associated with
`device`, as reported by [vkGetPhysicalDeviceSurfaceSupportKHR](vkGetPhysicalDeviceSurfaceSupportKHR.html)
or an equivalent platform-specific mechanism

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceGroupSurfacePresentModesKHR-device-parameter) VUID-vkGetDeviceGroupSurfacePresentModesKHR-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetDeviceGroupSurfacePresentModesKHR-surface-parameter) VUID-vkGetDeviceGroupSurfacePresentModesKHR-surface-parameter

 `surface` **must** be a valid [VkSurfaceKHR](VkSurfaceKHR.html) handle

* 
[](#VUID-vkGetDeviceGroupSurfacePresentModesKHR-pModes-parameter) VUID-vkGetDeviceGroupSurfacePresentModesKHR-pModes-parameter

 `pModes` **must** be a valid pointer to a [VkDeviceGroupPresentModeFlagsKHR](VkDeviceGroupPresentModeFlagsKHR.html) value

* 
[](#VUID-vkGetDeviceGroupSurfacePresentModesKHR-commonparent) VUID-vkGetDeviceGroupSurfacePresentModesKHR-commonparent

 Both of `device`, and `surface` **must** have been created, allocated, or retrieved from the same [VkInstance](VkInstance.html)

Host Synchronization

* 
Host access to `surface` **must** be externally synchronized

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

[VK_KHR_device_group](VK_KHR_device_group.html), [VK_KHR_surface](VK_KHR_surface.html), [VK_KHR_swapchain](VK_KHR_swapchain.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkDevice](VkDevice.html), [VkDeviceGroupPresentModeFlagsKHR](VkDeviceGroupPresentModeFlagsKHR.html), [VkSurfaceKHR](VkSurfaceKHR.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetDeviceGroupSurfacePresentModesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
