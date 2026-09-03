# vkUnregisterCustomBorderColorEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkUnregisterCustomBorderColorEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkUnregisterCustomBorderColorEXT - Unregister a custom border color

To unregister a custom border color, call:

// Provided by VK_EXT_custom_border_color with VK_EXT_descriptor_heap
void vkUnregisterCustomBorderColorEXT(
    VkDevice                                    device,
    uint32_t                                    index);

* 
`device` is the logical device where the border color is registered.

* 
`index` is the `uint32_t` index value to unregister.

Valid Usage

* 
[](#VUID-vkUnregisterCustomBorderColorEXT-index-11288) VUID-vkUnregisterCustomBorderColorEXT-index-11288

`index` **must** be less than [    `maxCustomBorderColorSamplers`](../../../../spec/latest/chapters/limits.html#limits-maxCustomBorderColorSamplers)

Valid Usage (Implicit)

* 
[](#VUID-vkUnregisterCustomBorderColorEXT-device-parameter) VUID-vkUnregisterCustomBorderColorEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

[VK_EXT_custom_border_color](VK_EXT_custom_border_color.html), [VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/samplers.html#vkUnregisterCustomBorderColorEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
