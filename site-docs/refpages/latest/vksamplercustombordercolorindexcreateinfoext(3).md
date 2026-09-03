# VkSamplerCustomBorderColorIndexCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSamplerCustomBorderColorIndexCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSamplerCustomBorderColorIndexCreateInfoEXT - Structure specifying the custom border color index for a sampler

The `VkSamplerCustomBorderColorIndexCreateInfoEXT` structure is defined
as:

// Provided by VK_EXT_custom_border_color with VK_EXT_descriptor_heap
typedef struct VkSamplerCustomBorderColorIndexCreateInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           index;
} VkSamplerCustomBorderColorIndexCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`index` is the `uint32_t` index value to use with the sampler

If this structure is included in the `pNext` chain of
[VkSamplerCreateInfo](VkSamplerCreateInfo.html), the value of `index` will be used for the
custom border color registration.
`index` does not need to be registered at the point that a sampler
object is created or a sampler descriptor is written; as long as it is
registered when any use of the sampler is recorded to a command, and remains
registered while the sampler is in use.
The color registered with the index and the color specified in the sampler
**must** be identically defined.

If this structure is not provided when creating a sampler object with a
custom border color, it is equivalent to registering a new custom border
color by calling [vkRegisterCustomBorderColorEXT](vkRegisterCustomBorderColorEXT.html) with that custom
border color value, and using that value as `index` in this structure.
This implicit registration will be implicitly unregistered when the sampler
is destroyed.

If this structure is not provided when creating a sampler object without a
custom border color, it is equivalent to setting `index` to 0.

Valid Usage

* 
[](#VUID-VkSamplerCustomBorderColorIndexCreateInfoEXT-index-11289) VUID-VkSamplerCustomBorderColorIndexCreateInfoEXT-index-11289

`index` **must** be less than [    `maxCustomBorderColorSamplers`](../../../../spec/latest/chapters/limits.html#limits-maxCustomBorderColorSamplers)

Valid Usage (Implicit)

* 
[](#VUID-VkSamplerCustomBorderColorIndexCreateInfoEXT-sType-sType) VUID-VkSamplerCustomBorderColorIndexCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SAMPLER_CUSTOM_BORDER_COLOR_INDEX_CREATE_INFO_EXT](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSamplerCreateInfo](VkSamplerCreateInfo.html)

[VK_EXT_custom_border_color](VK_EXT_custom_border_color.html), [VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/samplers.html#VkSamplerCustomBorderColorIndexCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
