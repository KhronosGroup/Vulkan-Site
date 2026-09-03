# VkSamplerBorderColorComponentMappingCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSamplerBorderColorComponentMappingCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSamplerBorderColorComponentMappingCreateInfoEXT - Structure specifying the component mapping of the border color

If the sampler is created with [VK_BORDER_COLOR_FLOAT_OPAQUE_BLACK](VkBorderColor.html),
[VK_BORDER_COLOR_INT_OPAQUE_BLACK](VkBorderColor.html),
[VK_BORDER_COLOR_FLOAT_CUSTOM_EXT](VkBorderColor.html), or
[VK_BORDER_COLOR_INT_CUSTOM_EXT](VkBorderColor.html) `borderColor`, and that sampler
will be combined with an image view that does not have an
[identity swizzle](../../../../spec/latest/chapters/resources.html#resources-image-views-identity-mappings), and
[VkPhysicalDeviceBorderColorSwizzleFeaturesEXT](VkPhysicalDeviceBorderColorSwizzleFeaturesEXT.html)::`borderColorSwizzleFromImage`
is not enabled, then it is necessary to specify the component mapping of the
border color, by including the
`VkSamplerBorderColorComponentMappingCreateInfoEXT` structure in the
[VkSamplerCreateInfo](VkSamplerCreateInfo.html)::`pNext` chain, to get defined results.

The `VkSamplerBorderColorComponentMappingCreateInfoEXT` structure is
defined as:

// Provided by VK_EXT_border_color_swizzle
typedef struct VkSamplerBorderColorComponentMappingCreateInfoEXT {
    VkStructureType       sType;
    const void*           pNext;
    VkComponentMapping    components;
    VkBool32              srgb;
} VkSamplerBorderColorComponentMappingCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`components` is a [VkComponentMapping](VkComponentMapping.html) structure specifying a
remapping of the border color components.

* 
`srgb` indicates that the sampler will be combined with an image
view that has an image format which is sRGB encoded.

The [VkComponentMapping](VkComponentMapping.html) `components` member describes a remapping
from components of the border color to components of the vector returned by
shader image instructions when the border color is used.

Valid Usage

* 
[](#VUID-VkSamplerBorderColorComponentMappingCreateInfoEXT-borderColorSwizzle-06437) VUID-VkSamplerBorderColorComponentMappingCreateInfoEXT-borderColorSwizzle-06437

The [`borderColorSwizzle`](../../../../spec/latest/chapters/features.html#features-borderColorSwizzle) feature
**must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-VkSamplerBorderColorComponentMappingCreateInfoEXT-sType-sType) VUID-VkSamplerBorderColorComponentMappingCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SAMPLER_BORDER_COLOR_COMPONENT_MAPPING_CREATE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkSamplerBorderColorComponentMappingCreateInfoEXT-components-parameter) VUID-VkSamplerBorderColorComponentMappingCreateInfoEXT-components-parameter

 `components` **must** be a valid [VkComponentMapping](VkComponentMapping.html) structure

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSamplerCreateInfo](VkSamplerCreateInfo.html)

[VK_EXT_border_color_swizzle](VK_EXT_border_color_swizzle.html), `VkBool32`, [VkComponentMapping](VkComponentMapping.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/samplers.html#VkSamplerBorderColorComponentMappingCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
