# vkGetPhysicalDeviceScreenPresentationSupportQNX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceScreenPresentationSupportQNX.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceScreenPresentationSupportQNX - Query physical device for presentation to QNX Screen

To determine whether a queue family of a physical device supports
presentation to a QNX Screen compositor, call:

// Provided by VK_QNX_screen_surface
VkBool32 vkGetPhysicalDeviceScreenPresentationSupportQNX(
    VkPhysicalDevice                            physicalDevice,
    uint32_t                                    queueFamilyIndex,
    struct _screen_window*                      window);

* 
`physicalDevice` is the physical device.

* 
`queueFamilyIndex` is the queue family index.

* 
`window` is the QNX Screen `window` object.

This platform-specific function **can** be called prior to creating a surface.

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceScreenPresentationSupportQNX-queueFamilyIndex-04743) VUID-vkGetPhysicalDeviceScreenPresentationSupportQNX-queueFamilyIndex-04743

`queueFamilyIndex` **must** be less than
`pQueueFamilyPropertyCount` returned by
`vkGetPhysicalDeviceQueueFamilyProperties` for the given
`physicalDevice`

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceScreenPresentationSupportQNX-physicalDevice-parameter) VUID-vkGetPhysicalDeviceScreenPresentationSupportQNX-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceScreenPresentationSupportQNX-window-parameter) VUID-vkGetPhysicalDeviceScreenPresentationSupportQNX-window-parameter

 `window` **must** be a valid pointer to a `_screen_window` value

[VK_QNX_screen_surface](VK_QNX_screen_surface.html), [VkPhysicalDevice](VkPhysicalDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetPhysicalDeviceScreenPresentationSupportQNX).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
