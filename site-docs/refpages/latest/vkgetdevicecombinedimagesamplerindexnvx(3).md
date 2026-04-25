# vkGetDeviceCombinedImageSamplerIndexNVX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDeviceCombinedImageSamplerIndexNVX.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDeviceCombinedImageSamplerIndexNVX - Get the handle for an image view and sampler index

To get the handle for a combined image sampler, call:

// Provided by VK_NVX_image_view_handle
uint64_t vkGetDeviceCombinedImageSamplerIndexNVX(
    VkDevice                                    device,
    uint64_t                                    imageViewIndex,
    uint64_t                                    samplerIndex);

* 
`device` is the logical device that will use the result handle.

* 
`imageViewIndex` is the index within the resource heap.

* 
`samplerIndex` is the index within the sampler heap.

Shaders take `imageViewIndex` and `samplerIndex`, and multiply it by
[VkPhysicalDeviceDescriptorHeapPropertiesEXT](VkPhysicalDeviceDescriptorHeapPropertiesEXT.html)::`imageDescriptorSize`
and
[VkPhysicalDeviceDescriptorHeapPropertiesEXT](VkPhysicalDeviceDescriptorHeapPropertiesEXT.html)::`samplerDescriptorSize`
respectively to obtain the descriptor offset in bytes.

Valid Usage (Implicit)

* 
[](#VUID-vkGetDeviceCombinedImageSamplerIndexNVX-device-parameter) VUID-vkGetDeviceCombinedImageSamplerIndexNVX-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

[VK_NVX_image_view_handle](VK_NVX_image_view_handle.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkGetDeviceCombinedImageSamplerIndexNVX).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
