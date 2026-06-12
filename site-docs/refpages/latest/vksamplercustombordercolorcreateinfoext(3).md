# VkSamplerCustomBorderColorCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSamplerCustomBorderColorCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSamplerCustomBorderColorCreateInfoEXT - Structure specifying custom border color

In addition to the predefined border color values, applications **can** provide
a custom border color value by including the
`VkSamplerCustomBorderColorCreateInfoEXT` structure in the
[VkSamplerCreateInfo](VkSamplerCreateInfo.html)::`pNext` chain.

The `VkSamplerCustomBorderColorCreateInfoEXT` structure is defined as:

// Provided by VK_EXT_custom_border_color
typedef struct VkSamplerCustomBorderColorCreateInfoEXT {
    VkStructureType      sType;
    const void*          pNext;
    VkClearColorValue    customBorderColor;
    VkFormat             format;
} VkSamplerCustomBorderColorCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`customBorderColor` is a [VkClearColorValue](VkClearColorValue.html) representing the
desired custom sampler border color.

* 
`format` is a [VkFormat](VkFormat.html) representing the format of the sampled
image view(s).
This field may be [VK_FORMAT_UNDEFINED](VkFormat.html) if the
[    `customBorderColorWithoutFormat`](../../../../spec/latest/chapters/features.html#features-customBorderColorWithoutFormat) feature is enabled.

|  | If `format` is a depth/stencil format, the aspect is determined by the
| --- | --- |
value of [VkSamplerCreateInfo](VkSamplerCreateInfo.html)::`borderColor`.
If [VkSamplerCreateInfo](VkSamplerCreateInfo.html)::`borderColor` is
[VK_BORDER_COLOR_FLOAT_CUSTOM_EXT](VkBorderColor.html), the depth aspect is considered.
If [VkSamplerCreateInfo](VkSamplerCreateInfo.html)::`borderColor` is
[VK_BORDER_COLOR_INT_CUSTOM_EXT](VkBorderColor.html), the stencil aspect is considered.

If `format` is [VK_FORMAT_UNDEFINED](VkFormat.html), the
[VkSamplerCreateInfo](VkSamplerCreateInfo.html)::`borderColor` is
[VK_BORDER_COLOR_INT_CUSTOM_EXT](VkBorderColor.html), and the sampler is used with an image
with a stencil format, then the implementation **must** source the custom
border color from either the first or second components of
[VkSamplerCreateInfo](VkSamplerCreateInfo.html)::`borderColor` and **should** source it from the
first component. |

Valid Usage

* 
[](#VUID-VkSamplerCustomBorderColorCreateInfoEXT-format-07605) VUID-VkSamplerCustomBorderColorCreateInfoEXT-format-07605

If `format` is not [VK_FORMAT_UNDEFINED](VkFormat.html) and `format` is not
a depth/stencil format then the
[VkSamplerCreateInfo](VkSamplerCreateInfo.html)::`borderColor` type **must** match the
sampled type of the provided `format`, as shown in the *SPIR-V Type*
column of the [Interpretation of Numeric Format](../../../../spec/latest/chapters/formats.html#formats-numericformat) table

* 
[](#VUID-VkSamplerCustomBorderColorCreateInfoEXT-format-04014) VUID-VkSamplerCustomBorderColorCreateInfoEXT-format-04014

If the [    `customBorderColorWithoutFormat`](../../../../spec/latest/chapters/features.html#features-customBorderColorWithoutFormat) feature is not enabled then
`format` **must** not be [VK_FORMAT_UNDEFINED](VkFormat.html)

* 
[](#VUID-VkSamplerCustomBorderColorCreateInfoEXT-format-04015) VUID-VkSamplerCustomBorderColorCreateInfoEXT-format-04015

If the sampler is used to sample an image view of
[VK_FORMAT_B4G4R4A4_UNORM_PACK16](VkFormat.html),
[VK_FORMAT_B5G6R5_UNORM_PACK16](VkFormat.html),
[VK_FORMAT_A1B5G5R5_UNORM_PACK16](VkFormat.html),
or [VK_FORMAT_B5G5R5A1_UNORM_PACK16](VkFormat.html) format then `format` **must**
not be [VK_FORMAT_UNDEFINED](VkFormat.html)

Valid Usage (Implicit)

* 
[](#VUID-VkSamplerCustomBorderColorCreateInfoEXT-sType-sType) VUID-VkSamplerCustomBorderColorCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SAMPLER_CUSTOM_BORDER_COLOR_CREATE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkSamplerCustomBorderColorCreateInfoEXT-format-parameter) VUID-VkSamplerCustomBorderColorCreateInfoEXT-format-parameter

 `format` **must** be a valid [VkFormat](VkFormat.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSamplerCreateInfo](VkSamplerCreateInfo.html)

[VK_EXT_custom_border_color](VK_EXT_custom_border_color.html), [VkClearColorValue](VkClearColorValue.html), [VkFormat](VkFormat.html), [VkStructureType](VkStructureType.html), [vkRegisterCustomBorderColorEXT](vkRegisterCustomBorderColorEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/samplers.html#VkSamplerCustomBorderColorCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
