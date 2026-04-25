# VkComponentSwizzle(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkComponentSwizzle.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkComponentSwizzle - Specify how a component is swizzled

Possible values of the members of [VkComponentMapping](VkComponentMapping.html), specifying the
component values placed in each component of the output vector, are:

// Provided by VK_VERSION_1_0
typedef enum VkComponentSwizzle {
    VK_COMPONENT_SWIZZLE_IDENTITY = 0,
    VK_COMPONENT_SWIZZLE_ZERO = 1,
    VK_COMPONENT_SWIZZLE_ONE = 2,
    VK_COMPONENT_SWIZZLE_R = 3,
    VK_COMPONENT_SWIZZLE_G = 4,
    VK_COMPONENT_SWIZZLE_B = 5,
    VK_COMPONENT_SWIZZLE_A = 6,
} VkComponentSwizzle;

* 
[VK_COMPONENT_SWIZZLE_IDENTITY](#) specifies that the component is set
to the identity swizzle.

* 
[VK_COMPONENT_SWIZZLE_ZERO](#) specifies that the component is set to
zero.

* 
[VK_COMPONENT_SWIZZLE_ONE](#) specifies that the component is set to
either 1 or 1.0, depending on whether the type of the image view format
is integer or floating-point respectively, as determined by the
[Format Definition](../../../../spec/latest/chapters/formats.html#formats-definition) section for each
[VkFormat](VkFormat.html).

* 
[VK_COMPONENT_SWIZZLE_R](#) specifies that the component is set to the
value of the R component of the image.

* 
[VK_COMPONENT_SWIZZLE_G](#) specifies that the component is set to the
value of the G component of the image.

* 
[VK_COMPONENT_SWIZZLE_B](#) specifies that the component is set to the
value of the B component of the image.

* 
[VK_COMPONENT_SWIZZLE_A](#) specifies that the component is set to the
value of the A component of the image.

Setting the identity swizzle on a component is equivalent to setting the
identity mapping on that component.
That is:

| Component | Identity Mapping |
| --- | --- |
| `components.r` | [VK_COMPONENT_SWIZZLE_R](#) |
| `components.g` | [VK_COMPONENT_SWIZZLE_G](#) |
| `components.b` | [VK_COMPONENT_SWIZZLE_B](#) |
| `components.a` | [VK_COMPONENT_SWIZZLE_A](#) |

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkComponentMapping](VkComponentMapping.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkComponentSwizzle).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
