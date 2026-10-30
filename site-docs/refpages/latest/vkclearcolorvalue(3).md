# VkClearColorValue(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkClearColorValue.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkClearColorValue - Structure specifying a clear color value

The `VkClearColorValue` structure is defined as:

// Provided by VK_VERSION_1_0
typedef union VkClearColorValue {
    float       float32[4];
    int32_t     int32[4];
    uint32_t    uint32[4];
} VkClearColorValue;

* 
`float32` are the color clear values when the format of the image or
attachment is one of the [numeric formats](../../../../spec/latest/chapters/formats.html#formats-numericformat) with
a numeric type that is floating-point.
Floating-point values are automatically converted to the format of the
image, with the clear value being treated as linear if the image is
sRGB.

* 
`int32` are the color clear values when the format of the image or
attachment has a numeric type that is signed integer (`SINT`).
Signed integer values are converted to the format of the image by
casting to the smaller type (with negative 32-bit values mapping to
negative values in the smaller type).
If the integer clear value is not representable in the target type (e.g.
would overflow in conversion to that type), the clear value is
**undefined**.

* 
`uint32` are the color clear values when the format of the image or
attachment has a numeric type that is unsigned integer (`UINT`).
Unsigned integer values are converted to the format of the image by
casting to the integer type with fewer bits.

The four array elements of the clear color map to R, G, B, and A components
of image formats, in order.

If the image has more than one sample, the same value is written to all
samples for any pixels being cleared.

If the image or attachment format has a 64-bit component width, the first 2
array elements of each of the arrays above are reinterpreted as a single
64-bit element for the R component.
The next 2 array elements are used in the same way for the G component.
In other words, the union behaves as if it had the following additional
members:

double float64[2];
int64_t int64[2];
uint64_t uint64[2];

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkClearValue](VkClearValue.html), [VkSamplerCustomBorderColorCreateInfoEXT](VkSamplerCustomBorderColorCreateInfoEXT.html), [vkCmdClearColorImage](vkCmdClearColorImage.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/clears.html#VkClearColorValue).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
