# vkAcquireWinrtDisplayNV(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkAcquireWinrtDisplayNV.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkAcquireWinrtDisplayNV - Acquire access to a VkDisplayKHR

To acquire permission to directly access a display in Vulkan on Windows 10,
call:

// Provided by VK_NV_acquire_winrt_display
VkResult vkAcquireWinrtDisplayNV(
    VkPhysicalDevice                            physicalDevice,
    VkDisplayKHR                                display);

* 
`physicalDevice` The physical device the display is on.

* 
`display` The display the caller wishes to control in Vulkan.

All permissions necessary to control the display are granted to the Vulkan
instance associated with `physicalDevice` until the display is released
or the application is terminated.
Permission to access the display **may** be revoked by events that cause
Windows 10 itself to lose access to `display`.
If this has happened, operations which require access to the display **must**
fail with an appropriate error code.
If permission to access `display` has already been acquired by another
entity, the call **must** return the error code
[VK_ERROR_INITIALIZATION_FAILED](VkResult.html).

|  | The Vulkan instance acquires control of a
| --- | --- |
[“winrt::Windows::Devices::Display::Core::DisplayTarget”](https://docs.microsoft.com/en-us/uwp/api/windows.devices.display.core.displaytarget)
by performing an operation equivalent to
[“winrt::Windows::Devices::Display::Core::DisplayManager.TryAcquireTarget()”](https://docs.microsoft.com/en-us/uwp/api/windows.devices.display.core.displaymanager.tryacquiretarget)
on the “DisplayTarget”. |

|  | One example of when Windows 10 loses access to a display is when the display
| --- | --- |
is hot-unplugged. |

|  | One example of when a display has already been acquired by another entity is
| --- | --- |
when the Windows desktop compositor (DWM) is in control of the display.
Beginning with Windows 10 version 2004 it is possible to cause DWM to
release a display by using the “Advanced display settings” sub-page of the
“Display settings” control panel.
[vkAcquireWinrtDisplayNV](#) does not itself cause DWM to release a
display; this action must be performed outside of Vulkan. |

Valid Usage (Implicit)

* 
[](#VUID-vkAcquireWinrtDisplayNV-physicalDevice-parameter) VUID-vkAcquireWinrtDisplayNV-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkAcquireWinrtDisplayNV-display-parameter) VUID-vkAcquireWinrtDisplayNV-display-parameter

 `display` **must** be a valid [VkDisplayKHR](VkDisplayKHR.html) handle

* 
[](#VUID-vkAcquireWinrtDisplayNV-display-parent) VUID-vkAcquireWinrtDisplayNV-display-parent

 `display` **must** have been created, allocated, or retrieved from `physicalDevice`

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

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkAcquireWinrtDisplayNV).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
