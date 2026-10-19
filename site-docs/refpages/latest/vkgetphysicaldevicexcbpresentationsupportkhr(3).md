# vkGetPhysicalDeviceXcbPresentationSupportKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceXcbPresentationSupportKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceXcbPresentationSupportKHR - Query physical device for presentation to X11 server using XCB

To determine whether a queue family of a physical device supports
presentation to an X11 server, using the XCB client-side library, call:

// Provided by VK_KHR_xcb_surface
VkBool32 vkGetPhysicalDeviceXcbPresentationSupportKHR(
    VkPhysicalDevice                            physicalDevice,
    uint32_t                                    queueFamilyIndex,
    xcb_connection_t*                           connection,
    xcb_visualid_t                              visual_id);

* 
`physicalDevice` is the physical device.

* 
`queueFamilyIndex` is the queue family index.

* 
`connection` is a pointer to an `xcb_connection_t` to the X
server.

* 
`visual_id` is an X11 visual (`xcb_visualid_t`).

This platform-specific function **can** be called prior to creating a surface.

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceXcbPresentationSupportKHR-queueFamilyIndex-01312) VUID-vkGetPhysicalDeviceXcbPresentationSupportKHR-queueFamilyIndex-01312

`queueFamilyIndex` **must** be less than
`pQueueFamilyPropertyCount` returned by
`vkGetPhysicalDeviceQueueFamilyProperties` for the given
`physicalDevice`

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceXcbPresentationSupportKHR-physicalDevice-parameter) VUID-vkGetPhysicalDeviceXcbPresentationSupportKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceXcbPresentationSupportKHR-connection-parameter) VUID-vkGetPhysicalDeviceXcbPresentationSupportKHR-connection-parameter

 `connection` **must** be a valid pointer to an `xcb_connection_t` value

[VK_KHR_xcb_surface](VK_KHR_xcb_surface.html), [VkPhysicalDevice](VkPhysicalDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetPhysicalDeviceXcbPresentationSupportKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
