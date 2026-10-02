# vkGetPhysicalDeviceWaylandPresentationSupportKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceWaylandPresentationSupportKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceWaylandPresentationSupportKHR - Query physical device for presentation to Wayland

To determine whether a queue family of a physical device supports
presentation to a Wayland compositor, call:

// Provided by VK_KHR_wayland_surface
VkBool32 vkGetPhysicalDeviceWaylandPresentationSupportKHR(
    VkPhysicalDevice                            physicalDevice,
    uint32_t                                    queueFamilyIndex,
    struct wl_display*                          display);

* 
`physicalDevice` is the physical device.

* 
`queueFamilyIndex` is the queue family index.

* 
`display` is a pointer to the `wl_display` associated with a
Wayland compositor.

This platform-specific function **can** be called prior to creating a surface.

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceWaylandPresentationSupportKHR-queueFamilyIndex-01306) VUID-vkGetPhysicalDeviceWaylandPresentationSupportKHR-queueFamilyIndex-01306

`queueFamilyIndex` **must** be less than
`pQueueFamilyPropertyCount` returned by
`vkGetPhysicalDeviceQueueFamilyProperties` for the given
`physicalDevice`

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceWaylandPresentationSupportKHR-physicalDevice-parameter) VUID-vkGetPhysicalDeviceWaylandPresentationSupportKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceWaylandPresentationSupportKHR-display-parameter) VUID-vkGetPhysicalDeviceWaylandPresentationSupportKHR-display-parameter

 `display` **must** be a valid pointer to a `wl_display` value

[VK_KHR_wayland_surface](VK_KHR_wayland_surface.html), [VkPhysicalDevice](VkPhysicalDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetPhysicalDeviceWaylandPresentationSupportKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
