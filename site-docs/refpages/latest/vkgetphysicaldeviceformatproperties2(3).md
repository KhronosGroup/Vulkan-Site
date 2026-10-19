# vkGetPhysicalDeviceFormatProperties2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceFormatProperties2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceFormatProperties2 - Lists physical device’s format capabilities

To query supported format features which are properties of the physical
device, call:

// Provided by VK_VERSION_1_1
void vkGetPhysicalDeviceFormatProperties2(
    VkPhysicalDevice                            physicalDevice,
    VkFormat                                    format,
    VkFormatProperties2*                        pFormatProperties);

// Provided by VK_KHR_get_physical_device_properties2
// Equivalent to vkGetPhysicalDeviceFormatProperties2
void vkGetPhysicalDeviceFormatProperties2KHR(
    VkPhysicalDevice                            physicalDevice,
    VkFormat                                    format,
    VkFormatProperties2*                        pFormatProperties);

* 
`physicalDevice` is the physical device from which to query the
format properties.

* 
`format` is the format whose properties are queried.

* 
`pFormatProperties` is a pointer to a [VkFormatProperties2](VkFormatProperties2.html)
structure in which physical device properties for `format` are
returned.

`vkGetPhysicalDeviceFormatProperties2` behaves similarly to
[vkGetPhysicalDeviceFormatProperties](vkGetPhysicalDeviceFormatProperties.html), with the ability to return
extended information in a `pNext` chain of output structures.

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceFormatProperties2-None-12273) VUID-vkGetPhysicalDeviceFormatProperties2-None-12273

    If
Vulkan 1.3 is not supported,
    the [`maintenance5`](../../../../spec/latest/chapters/features.html#features-maintenance5) feature is not
    supported,
and
    the [`ycbcr2plane444Formats`](../../../../spec/latest/chapters/features.html#features-ycbcr2plane444Formats)
    feature is not supported, `format` **must** not be
    [VK_FORMAT_G8_B8R8_2PLANE_444_UNORM](VkFormat.html),
    [VK_FORMAT_G10X6_B10X6R10X6_2PLANE_444_UNORM_3PACK16](VkFormat.html),
    [VK_FORMAT_G12X4_B12X4R12X4_2PLANE_444_UNORM_3PACK16](VkFormat.html), or
    [VK_FORMAT_G16_B16R16_2PLANE_444_UNORM](VkFormat.html)

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceFormatProperties2-physicalDevice-parameter) VUID-vkGetPhysicalDeviceFormatProperties2-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceFormatProperties2-format-parameter) VUID-vkGetPhysicalDeviceFormatProperties2-format-parameter

 `format` **must** be a valid [VkFormat](VkFormat.html) value

* 
[](#VUID-vkGetPhysicalDeviceFormatProperties2-pFormatProperties-parameter) VUID-vkGetPhysicalDeviceFormatProperties2-pFormatProperties-parameter

 `pFormatProperties` **must** be a valid pointer to a [VkFormatProperties2](VkFormatProperties2.html) structure

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkFormat](VkFormat.html), [VkFormatProperties2](VkFormatProperties2.html), [VkPhysicalDevice](VkPhysicalDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/formats.html#vkGetPhysicalDeviceFormatProperties2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
