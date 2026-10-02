# vkGetPhysicalDeviceDirectFBPresentationSupportEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceDirectFBPresentationSupportEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceDirectFBPresentationSupportEXT - Query physical device for presentation with DirectFB

To determine whether a queue family of a physical device supports
presentation with DirectFB library, call:

// Provided by VK_EXT_directfb_surface
VkBool32 vkGetPhysicalDeviceDirectFBPresentationSupportEXT(
    VkPhysicalDevice                            physicalDevice,
    uint32_t                                    queueFamilyIndex,
    IDirectFB*                                  dfb);

* 
`physicalDevice` is the physical device.

* 
`queueFamilyIndex` is the queue family index.

* 
`dfb` is a pointer to the `IDirectFB` main interface of DirectFB.

This platform-specific function **can** be called prior to creating a surface.

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceDirectFBPresentationSupportEXT-queueFamilyIndex-04119) VUID-vkGetPhysicalDeviceDirectFBPresentationSupportEXT-queueFamilyIndex-04119

`queueFamilyIndex` **must** be less than
`pQueueFamilyPropertyCount` returned by
`vkGetPhysicalDeviceQueueFamilyProperties` for the given
`physicalDevice`

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceDirectFBPresentationSupportEXT-physicalDevice-parameter) VUID-vkGetPhysicalDeviceDirectFBPresentationSupportEXT-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceDirectFBPresentationSupportEXT-dfb-parameter) VUID-vkGetPhysicalDeviceDirectFBPresentationSupportEXT-dfb-parameter

 `dfb` **must** be a valid pointer to an `IDirectFB` value

[VK_EXT_directfb_surface](VK_EXT_directfb_surface.html), [VkPhysicalDevice](VkPhysicalDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/VK_KHR_surface/wsi.html#vkGetPhysicalDeviceDirectFBPresentationSupportEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
