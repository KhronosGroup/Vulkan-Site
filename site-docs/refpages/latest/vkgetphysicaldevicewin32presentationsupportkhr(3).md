# vkGetPhysicalDeviceWin32PresentationSupportKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceWin32PresentationSupportKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceWin32PresentationSupportKHR - Query queue family support for presentation on a Win32 display

To determine whether a queue family of a physical device supports
presentation to the Microsoft Windows desktop, call:

// Provided by VK_KHR_win32_surface
VkBool32 vkGetPhysicalDeviceWin32PresentationSupportKHR(
    VkPhysicalDevice                            physicalDevice,
    uint32_t                                    queueFamilyIndex);

* 
`physicalDevice` is the physical device.

* 
`queueFamilyIndex` is the queue family index.

This platform-specific function **can** be called prior to creating a surface.

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceWin32PresentationSupportKHR-queueFamilyIndex-01309) VUID-vkGetPhysicalDeviceWin32PresentationSupportKHR-queueFamilyIndex-01309

`queueFamilyIndex` **must** be less than
`pQueueFamilyPropertyCount` returned by
`vkGetPhysicalDeviceQueueFamilyProperties` for the given
`physicalDevice`

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceWin32PresentationSupportKHR-physicalDevice-parameter) VUID-vkGetPhysicalDeviceWin32PresentationSupportKHR-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

[VK_KHR_win32_surface](VK_KHR_win32_surface.html), [VkPhysicalDevice](VkPhysicalDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetPhysicalDeviceWin32PresentationSupportKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
