# vkGetRandROutputDisplayEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetRandROutputDisplayEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetRandROutputDisplayEXT - Query the VkDisplayKHR corresponding to an X11 RandR Output

When acquiring displays from an X11 server, an application may also wish to
enumerate and identify them using a native handle rather than a
`VkDisplayKHR` handle.
To determine the `VkDisplayKHR` handle corresponding to an X11 RandR
Output, call:

// Provided by VK_EXT_acquire_xlib_display
VkResult vkGetRandROutputDisplayEXT(
    VkPhysicalDevice                            physicalDevice,
    Display*                                    dpy,
    RROutput                                    rrOutput,
    VkDisplayKHR*                               pDisplay);

* 
`physicalDevice` The physical device to query the display handle on.

* 
`dpy` A connection to the X11 server from which `rrOutput` was
queried.

* 
`rrOutput` An X11 RandR output ID.

* 
`pDisplay` The corresponding [VkDisplayKHR](VkDisplayKHR.html) handle will be
returned here.

If there is no [VkDisplayKHR](VkDisplayKHR.html) corresponding to `rrOutput` on
`physicalDevice`, [VK_NULL_HANDLE](VK_NULL_HANDLE.html) **must** be returned in
`pDisplay`.

Valid Usage (Implicit)

* 
[](#VUID-vkGetRandROutputDisplayEXT-physicalDevice-parameter) VUID-vkGetRandROutputDisplayEXT-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetRandROutputDisplayEXT-dpy-parameter) VUID-vkGetRandROutputDisplayEXT-dpy-parameter

 `dpy` **must** be a valid pointer to a `Display` value

* 
[](#VUID-vkGetRandROutputDisplayEXT-pDisplay-parameter) VUID-vkGetRandROutputDisplayEXT-pDisplay-parameter

 `pDisplay` **must** be a valid pointer to a [VkDisplayKHR](VkDisplayKHR.html) handle

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_EXT_acquire_xlib_display](VK_EXT_acquire_xlib_display.html), [VkDisplayKHR](VkDisplayKHR.html), [VkPhysicalDevice](VkPhysicalDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetRandROutputDisplayEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
