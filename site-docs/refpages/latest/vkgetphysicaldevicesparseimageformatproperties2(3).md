# vkGetPhysicalDeviceSparseImageFormatProperties2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetPhysicalDeviceSparseImageFormatProperties2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetPhysicalDeviceSparseImageFormatProperties2 - Retrieve properties of an image format applied to sparse images

`vkGetPhysicalDeviceSparseImageFormatProperties2` returns an array of
[VkSparseImageFormatProperties2](VkSparseImageFormatProperties2.html).
Each element describes properties for one set of image aspects that are
bound simultaneously for a `VkImage` created with the provided image
creation parameters.
This is usually one element for each aspect in the image, but for
interleaved depth/stencil images there is only one element describing the
combined aspects.

// Provided by VK_VERSION_1_1
void vkGetPhysicalDeviceSparseImageFormatProperties2(
    VkPhysicalDevice                            physicalDevice,
    const VkPhysicalDeviceSparseImageFormatInfo2* pFormatInfo,
    uint32_t*                                   pPropertyCount,
    VkSparseImageFormatProperties2*             pProperties);

// Provided by VK_KHR_get_physical_device_properties2
// Equivalent to vkGetPhysicalDeviceSparseImageFormatProperties2
void vkGetPhysicalDeviceSparseImageFormatProperties2KHR(
    VkPhysicalDevice                            physicalDevice,
    const VkPhysicalDeviceSparseImageFormatInfo2* pFormatInfo,
    uint32_t*                                   pPropertyCount,
    VkSparseImageFormatProperties2*             pProperties);

* 
`physicalDevice` is the physical device from which to query the
sparse image format properties.

* 
`pFormatInfo` is a pointer to a
[VkPhysicalDeviceSparseImageFormatInfo2](VkPhysicalDeviceSparseImageFormatInfo2.html) structure containing input
parameters to the command.

* 
`pPropertyCount` is a pointer to an integer related to the number of
sparse format properties available or queried, as described below.

* 
`pProperties` is either `NULL` or a pointer to an array of
[VkSparseImageFormatProperties2](VkSparseImageFormatProperties2.html) structures.

`vkGetPhysicalDeviceSparseImageFormatProperties2` behaves identically to
[vkGetPhysicalDeviceSparseImageFormatProperties](vkGetPhysicalDeviceSparseImageFormatProperties.html), with the ability to
return extended information by adding extending structures to the
`pNext` chain of its `pProperties` parameter.

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceSparseImageFormatProperties2-physicalDevice-parameter) VUID-vkGetPhysicalDeviceSparseImageFormatProperties2-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](VkPhysicalDevice.html) handle

* 
[](#VUID-vkGetPhysicalDeviceSparseImageFormatProperties2-pFormatInfo-parameter) VUID-vkGetPhysicalDeviceSparseImageFormatProperties2-pFormatInfo-parameter

 `pFormatInfo` **must** be a valid pointer to a valid [VkPhysicalDeviceSparseImageFormatInfo2](VkPhysicalDeviceSparseImageFormatInfo2.html) structure

* 
[](#VUID-vkGetPhysicalDeviceSparseImageFormatProperties2-pPropertyCount-parameter) VUID-vkGetPhysicalDeviceSparseImageFormatProperties2-pPropertyCount-parameter

 `pPropertyCount` **must** be a valid pointer to a `uint32_t` value

* 
[](#VUID-vkGetPhysicalDeviceSparseImageFormatProperties2-pProperties-parameter) VUID-vkGetPhysicalDeviceSparseImageFormatProperties2-pProperties-parameter

 If the value referenced by `pPropertyCount` is not `0`, and `pProperties` is not `NULL`, `pProperties` **must** be a valid pointer to an array of `pPropertyCount` [VkSparseImageFormatProperties2](VkSparseImageFormatProperties2.html) structures

[VK_KHR_get_physical_device_properties2](VK_KHR_get_physical_device_properties2.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkPhysicalDevice](VkPhysicalDevice.html), [VkPhysicalDeviceSparseImageFormatInfo2](VkPhysicalDeviceSparseImageFormatInfo2.html), [VkSparseImageFormatProperties2](VkSparseImageFormatProperties2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/sparsemem.html#vkGetPhysicalDeviceSparseImageFormatProperties2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
