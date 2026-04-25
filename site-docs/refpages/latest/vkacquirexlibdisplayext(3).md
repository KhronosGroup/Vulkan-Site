# vkAcquireXlibDisplayEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkAcquireXlibDisplayEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkAcquireXlibDisplayEXT - Acquire access to a VkDisplayKHR using Xlib

To acquire permission to directly access a display in Vulkan from an X11
server, call:

// Provided by VK_EXT_acquire_xlib_display
VkResult vkAcquireXlibDisplayEXT(
    VkPhysicalDevice                            physicalDevice,
    Display*                                    dpy,
    VkDisplayKHR                                display);

* 
`physicalDevice` The physical device the display is on.

* 
`dpy` A connection to the X11 server that currently owns
`display`.

* 
`display` The display the caller wishes to control in Vulkan.

All permissions necessary to control the display are granted to the Vulkan
instance associated with `physicalDevice` until the display is released
or the X11 connection specified by `dpy` is terminated.
Permission to access the display **may** be temporarily revoked during periods
when the X11 server from which control was acquired itself loses access to
`display`.
During such periods, operations which require access to the display **must**
fail with an appropriate error code.
If the X11 server associated with `dpy` does not own `display`, or
if permission to access it has already been acquired by another entity, the
call **must** return the error code [VK_ERROR_INITIALIZATION_FAILED](VkResult.html).

|  | One example of when an X11 server loses access to a display is when it loses
| --- | --- |
ownership of its virtual terminal. |

Valid Usage (Implicit)

* 
[](#VUID-vkAcquireXlibDisplayEXT-physicalDevice-parameter) VUID-vkAcquireXlibDisplayEXT-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkAcquireXlibDisplayEXT-dpy-parameter) VUID-vkAcquireXlibDisplayEXT-dpy-parameter

 `dpy` **must** be a valid pointer to a `Display` value

* 
[](#VUID-vkAcquireXlibDisplayEXT-display-parameter) VUID-vkAcquireXlibDisplayEXT-display-parameter

 `display` **must** be a valid [VkDisplayKHR](VkDisplayKHR.html) handle

* 
[](#VUID-vkAcquireXlibDisplayEXT-display-parent) VUID-vkAcquireXlibDisplayEXT-display-parent

 `display` **must** have been created, allocated, or retrieved from `physicalDevice`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_INITIALIZATION_FAILED](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_EXT_acquire_xlib_display](VK_EXT_acquire_xlib_display.html), [VkDisplayKHR](VkDisplayKHR.html), [VkPhysicalDevice](VkPhysicalDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkAcquireXlibDisplayEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
