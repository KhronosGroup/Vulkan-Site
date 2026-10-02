# VkBorderColor(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBorderColor.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBorderColor - Specify border color used for texture lookups

Possible values of [VkSamplerCreateInfo](VkSamplerCreateInfo.html)::`borderColor`, specifying
the border color used for texture lookups, are:

// Provided by VK_VERSION_1_0
typedef enum VkBorderColor {
    VK_BORDER_COLOR_FLOAT_TRANSPARENT_BLACK = 0,
    VK_BORDER_COLOR_INT_TRANSPARENT_BLACK = 1,
    VK_BORDER_COLOR_FLOAT_OPAQUE_BLACK = 2,
    VK_BORDER_COLOR_INT_OPAQUE_BLACK = 3,
    VK_BORDER_COLOR_FLOAT_OPAQUE_WHITE = 4,
    VK_BORDER_COLOR_INT_OPAQUE_WHITE = 5,
  // Provided by VK_EXT_custom_border_color
    VK_BORDER_COLOR_FLOAT_CUSTOM_EXT = 1000287003,
  // Provided by VK_EXT_custom_border_color
    VK_BORDER_COLOR_INT_CUSTOM_EXT = 1000287004,
} VkBorderColor;

* 
[VK_BORDER_COLOR_FLOAT_TRANSPARENT_BLACK](#) specifies a transparent,
floating-point format, black color.

* 
[VK_BORDER_COLOR_INT_TRANSPARENT_BLACK](#) specifies a transparent,
integer format, black color.

* 
[VK_BORDER_COLOR_FLOAT_OPAQUE_BLACK](#) specifies an opaque,
floating-point format, black color.

* 
[VK_BORDER_COLOR_INT_OPAQUE_BLACK](#) specifies an opaque, integer
format, black color.

* 
[VK_BORDER_COLOR_FLOAT_OPAQUE_WHITE](#) specifies an opaque,
floating-point format, white color.

* 
[VK_BORDER_COLOR_INT_OPAQUE_WHITE](#) specifies an opaque, integer
format, white color.

* 
[VK_BORDER_COLOR_FLOAT_CUSTOM_EXT](#) specifies that a
[VkSamplerCustomBorderColorCreateInfoEXT](VkSamplerCustomBorderColorCreateInfoEXT.html) structure is included in
the [VkSamplerCreateInfo](VkSamplerCreateInfo.html)::`pNext` chain containing the color
data in floating-point format.

* 
[VK_BORDER_COLOR_INT_CUSTOM_EXT](#) specifies that a
[VkSamplerCustomBorderColorCreateInfoEXT](VkSamplerCustomBorderColorCreateInfoEXT.html) structure is included in
the [VkSamplerCreateInfo](VkSamplerCreateInfo.html)::`pNext` chain containing the color
data in integer format.

These colors are described in detail in [Border Replacement](../../../../spec/latest/chapters/textures.html#textures-border-replacement).

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkSamplerCreateInfo](VkSamplerCreateInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/samplers.html#VkBorderColor).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
