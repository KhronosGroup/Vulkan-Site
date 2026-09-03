# vkGetPhysicalDeviceUbmPresentationSupportSEC(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceUbmPresentationSupportSEC.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceUbmPresentationSupportSEC - Query physical device for presentation to UBM

To determine whether a queue family of a physical device supports
presentation to a UBM compositor, call:

// Provided by VK_SEC_ubm_surface
VkBool32 vkGetPhysicalDeviceUbmPresentationSupportSEC(
    VkPhysicalDevice                            physicalDevice,
    uint32_t                                    queueFamilyIndex,
    struct ubm_device*                          device);

* 
`physicalDevice` is the physical device.

* 
`queueFamilyIndex` is the queue family index.

* 
`device` is a pointer to the `ubm_device` associated with a UBM
compositor.

This platform-specific function **can** be called prior to creating a surface.

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceUbmPresentationSupportSEC-device-12368) VUID-vkGetPhysicalDeviceUbmPresentationSupportSEC-device-12368

`device` **must** point to a valid UBM `ubm_device`

* 
[](#VUID-vkGetPhysicalDeviceUbmPresentationSupportSEC-queueFamilyIndex-12369) VUID-vkGetPhysicalDeviceUbmPresentationSupportSEC-queueFamilyIndex-12369

`queueFamilyIndex` **must** be less than
`pQueueFamilyPropertyCount` returned by
`vkGetPhysicalDeviceQueueFamilyProperties` for the given
`physicalDevice`

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceUbmPresentationSupportSEC-physicalDevice-parameter) VUID-vkGetPhysicalDeviceUbmPresentationSupportSEC-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceUbmPresentationSupportSEC-device-parameter) VUID-vkGetPhysicalDeviceUbmPresentationSupportSEC-device-parameter

 `device` **must** be a valid pointer to a `ubm_device` value

[VK_SEC_ubm_surface](VK_SEC_ubm_surface.html), [VkPhysicalDevice](VkPhysicalDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetPhysicalDeviceUbmPresentationSupportSEC).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
