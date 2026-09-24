# vkGetDisplayPlaneSupportedDisplaysKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDisplayPlaneSupportedDisplaysKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDisplayPlaneSupportedDisplaysKHR - Query the list of displays a plane supports

To determine which displays a plane is usable with, call

// Provided by VK_KHR_display
VkResult vkGetDisplayPlaneSupportedDisplaysKHR(
    VkPhysicalDevice                            physicalDevice,
    uint32_t                                    planeIndex,
    uint32_t*                                   pDisplayCount,
    VkDisplayKHR*                               pDisplays);

* 
`physicalDevice` is a physical device.

* 
`planeIndex` is the plane which the application wishes to use, and
**must** be in the range [0, physical device plane count - 1].

* 
`pDisplayCount` is a pointer to an integer related to the number of
displays available or queried, as described below.

* 
`pDisplays` is either `NULL` or a pointer to an array of
`VkDisplayKHR` handles.

If `pDisplays` is `NULL`, then the number of displays usable with the
specified `planeIndex` for `physicalDevice` is returned in
`pDisplayCount`.
Otherwise, `pDisplayCount` **must** point to a variable set by the
application to the number of elements in the `pDisplays` array, and on
return the variable is overwritten with the number of handles actually
written to `pDisplays`.
If the value of `pDisplayCount` is less than the number of usable
display-plane pairs for `physicalDevice`, at most `pDisplayCount`
handles will be written, and [VK_INCOMPLETE](VkResult.html) will be returned instead of
[VK_SUCCESS](VkResult.html), to indicate that not all the available pairs were
returned.

Valid Usage

* 
[](#VUID-vkGetDisplayPlaneSupportedDisplaysKHR-planeIndex-01249) VUID-vkGetDisplayPlaneSupportedDisplaysKHR-planeIndex-01249

`planeIndex` **must** be less than the number of display planes
supported by the device as determined by calling
`vkGetPhysicalDeviceDisplayPlanePropertiesKHR`

Valid Usage (Implicit)

* 
[](#VUID-vkGetDisplayPlaneSupportedDisplaysKHR-physicalDevice-parameter) VUID-vkGetDisplayPlaneSupportedDisplaysKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetDisplayPlaneSupportedDisplaysKHR-pDisplayCount-parameter) VUID-vkGetDisplayPlaneSupportedDisplaysKHR-pDisplayCount-parameter

 `pDisplayCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetDisplayPlaneSupportedDisplaysKHR-pDisplays-parameter) VUID-vkGetDisplayPlaneSupportedDisplaysKHR-pDisplays-parameter

 If the value referenced by `pDisplayCount` is not `0`, and `pDisplays` is not `NULL`, `pDisplays` **must** be a valid pointer to an array of `pDisplayCount` [VkDisplayKHR](VkDisplayKHR.html) handles

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

[VK_KHR_display](VK_KHR_display.html), [VkDisplayKHR](VkDisplayKHR.html), [VkPhysicalDevice](VkPhysicalDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetDisplayPlaneSupportedDisplaysKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
