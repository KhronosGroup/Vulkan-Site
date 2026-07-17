# vkGetDisplayPlaneCapabilitiesKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDisplayPlaneCapabilitiesKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDisplayPlaneCapabilitiesKHR - Query capabilities of a mode and plane combination

Applications that wish to present directly to a display **must** select which
layer, or “plane” of the display they wish to target, and a mode to use
with the display.
Each display supports at least one plane.
The capabilities of a given mode and plane combination are determined by
calling:

// Provided by VK_KHR_display
VkResult vkGetDisplayPlaneCapabilitiesKHR(
    VkPhysicalDevice                            physicalDevice,
    VkDisplayModeKHR                            mode,
    uint32_t                                    planeIndex,
    VkDisplayPlaneCapabilitiesKHR*              pCapabilities);

* 
`physicalDevice` is the physical device associated with the display
specified by `mode`

* 
`mode` is the display mode the application intends to program when
using the specified plane.
Note this parameter also implicitly specifies a display.

* 
`planeIndex` is the plane which the application intends to use with
the display, and is less than the number of display planes supported by
the device.

* 
`pCapabilities` is a pointer to a
[VkDisplayPlaneCapabilitiesKHR](VkDisplayPlaneCapabilitiesKHR.html) structure in which the capabilities
are returned.

Valid Usage (Implicit)

* 
[](#VUID-vkGetDisplayPlaneCapabilitiesKHR-physicalDevice-parameter) VUID-vkGetDisplayPlaneCapabilitiesKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetDisplayPlaneCapabilitiesKHR-mode-parameter) VUID-vkGetDisplayPlaneCapabilitiesKHR-mode-parameter

 `mode` **must** be a valid [VkDisplayModeKHR](VkDisplayModeKHR.html) handle

* 
[](#VUID-vkGetDisplayPlaneCapabilitiesKHR-pCapabilities-parameter) VUID-vkGetDisplayPlaneCapabilitiesKHR-pCapabilities-parameter

 `pCapabilities` **must** be a valid pointer to a [VkDisplayPlaneCapabilitiesKHR](VkDisplayPlaneCapabilitiesKHR.html) structure

* 
[](#VUID-vkGetDisplayPlaneCapabilitiesKHR-mode-parent) VUID-vkGetDisplayPlaneCapabilitiesKHR-mode-parent

 `mode` **must** have been created, allocated, or retrieved from `physicalDevice`

Host Synchronization

* 
Host access to `mode` **must** be externally synchronized

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
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_KHR_display](VK_KHR_display.html), [VkDisplayModeKHR](VkDisplayModeKHR.html), [VkDisplayPlaneCapabilitiesKHR](VkDisplayPlaneCapabilitiesKHR.html), [VkPhysicalDevice](VkPhysicalDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetDisplayPlaneCapabilitiesKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
