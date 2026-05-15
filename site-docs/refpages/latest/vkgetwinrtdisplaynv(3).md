# vkGetWinrtDisplayNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetWinrtDisplayNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetWinrtDisplayNV - Query the VkDisplayKHR corresponding to a WinRT DisplayTarget

When acquiring displays on Windows 10, an application may also wish to
enumerate and identify them using a native handle rather than a
`VkDisplayKHR` handle.

To determine the `VkDisplayKHR` handle corresponding to a
[“winrt::Windows::Devices::Display::Core::DisplayTarget”](https://docs.microsoft.com/en-us/uwp/api/windows.devices.display.core.displaytarget),
call:

// Provided by VK_NV_acquire_winrt_display
VkResult vkGetWinrtDisplayNV(
    VkPhysicalDevice                            physicalDevice,
    uint32_t                                    deviceRelativeId,
    VkDisplayKHR*                               pDisplay);

* 
`physicalDevice` The physical device on which to query the display
handle.

* 
`deviceRelativeId` The value of the
[“AdapterRelativeId”](https://docs.microsoft.com/en-us/uwp/api/windows.devices.display.core.displaytarget.adapterrelativeid)
property of a
[“DisplayTarget”](https://docs.microsoft.com/en-us/uwp/api/windows.devices.display.core.displaytarget)
that is enumerated by a
[“DisplayAdapter”](https://docs.microsoft.com/en-us/uwp/api/windows.devices.display.core.displayadapter)
with an
[“Id”](https://docs.microsoft.com/en-us/uwp/api/windows.devices.display.core.displayadapter.id)
property matching the `deviceLUID` property of a
[VkPhysicalDeviceIDProperties](VkPhysicalDeviceIDProperties.html) for `physicalDevice`.

* 
`pDisplay` The corresponding [VkDisplayKHR](VkDisplayKHR.html) handle will be
returned here.

If there is no [VkDisplayKHR](VkDisplayKHR.html) corresponding to `deviceRelativeId` on
`physicalDevice`, [VK_NULL_HANDLE](VK_NULL_HANDLE.html) **must** be returned in
`pDisplay`.

Valid Usage (Implicit)

* 
[](#VUID-vkGetWinrtDisplayNV-physicalDevice-parameter) VUID-vkGetWinrtDisplayNV-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetWinrtDisplayNV-pDisplay-parameter) VUID-vkGetWinrtDisplayNV-pDisplay-parameter

 `pDisplay` **must** be a valid pointer to a [VkDisplayKHR](VkDisplayKHR.html) handle

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_DEVICE_LOST](VkResult.html)

* 
[VK_ERROR_INITIALIZATION_FAILED](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_NV_acquire_winrt_display](VK_NV_acquire_winrt_display.html), [VkDisplayKHR](VkDisplayKHR.html), [VkPhysicalDevice](VkPhysicalDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetWinrtDisplayNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
