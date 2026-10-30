# vkGetPhysicalDeviceXlibPresentationSupportKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceXlibPresentationSupportKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceXlibPresentationSupportKHR - Query physical device for presentation to X11 server using Xlib

To determine whether a queue family of a physical device supports
presentation to an X11 server, using the Xlib client-side library, call:

// Provided by VK_KHR_xlib_surface
VkBool32 vkGetPhysicalDeviceXlibPresentationSupportKHR(
    VkPhysicalDevice                            physicalDevice,
    uint32_t                                    queueFamilyIndex,
    Display*                                    dpy,
    VisualID                                    visualID);

* 
`physicalDevice` is the physical device.

* 
`queueFamilyIndex` is the queue family index.

* 
`dpy` is a pointer to an Xlib `Display` connection to the server.

* 
`visualID` is an X11 visual (`VisualID`).

This platform-specific function **can** be called prior to creating a surface.

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceXlibPresentationSupportKHR-queueFamilyIndex-01315) VUID-vkGetPhysicalDeviceXlibPresentationSupportKHR-queueFamilyIndex-01315

`queueFamilyIndex` **must** be less than
`pQueueFamilyPropertyCount` returned by
`vkGetPhysicalDeviceQueueFamilyProperties` for the given
`physicalDevice`

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceXlibPresentationSupportKHR-physicalDevice-parameter) VUID-vkGetPhysicalDeviceXlibPresentationSupportKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceXlibPresentationSupportKHR-dpy-parameter) VUID-vkGetPhysicalDeviceXlibPresentationSupportKHR-dpy-parameter

 `dpy` **must** be a valid pointer to a `Display` value

[VK_KHR_xlib_surface](VK_KHR_xlib_surface.html), [VkPhysicalDevice](VkPhysicalDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetPhysicalDeviceXlibPresentationSupportKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
