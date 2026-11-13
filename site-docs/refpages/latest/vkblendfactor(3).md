# VkBlendFactor(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkBlendFactor.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkBlendFactor - Framebuffer blending factors

The source and destination color and alpha blending factors are selected
from the enum:

// Provided by VK_VERSION_1_0
typedef enum VkBlendFactor {
    VK_BLEND_FACTOR_ZERO = 0,
    VK_BLEND_FACTOR_ONE = 1,
    VK_BLEND_FACTOR_SRC_COLOR = 2,
    VK_BLEND_FACTOR_ONE_MINUS_SRC_COLOR = 3,
    VK_BLEND_FACTOR_DST_COLOR = 4,
    VK_BLEND_FACTOR_ONE_MINUS_DST_COLOR = 5,
    VK_BLEND_FACTOR_SRC_ALPHA = 6,
    VK_BLEND_FACTOR_ONE_MINUS_SRC_ALPHA = 7,
    VK_BLEND_FACTOR_DST_ALPHA = 8,
    VK_BLEND_FACTOR_ONE_MINUS_DST_ALPHA = 9,
    VK_BLEND_FACTOR_CONSTANT_COLOR = 10,
    VK_BLEND_FACTOR_ONE_MINUS_CONSTANT_COLOR = 11,
    VK_BLEND_FACTOR_CONSTANT_ALPHA = 12,
    VK_BLEND_FACTOR_ONE_MINUS_CONSTANT_ALPHA = 13,
    VK_BLEND_FACTOR_SRC_ALPHA_SATURATE = 14,
    VK_BLEND_FACTOR_SRC1_COLOR = 15,
    VK_BLEND_FACTOR_ONE_MINUS_SRC1_COLOR = 16,
    VK_BLEND_FACTOR_SRC1_ALPHA = 17,
    VK_BLEND_FACTOR_ONE_MINUS_SRC1_ALPHA = 18,
} VkBlendFactor;

The semantics of the enum values are described in the table below:

| [VkBlendFactor](#) | RGB Blend Factors (Sr,Sg,Sb) or (Dr,Dg,Db) | Alpha Blend Factor (Sa or Da) |
| --- | --- | --- |
| [VK_BLEND_FACTOR_ZERO](#) | (0,0,0) | 0 |
| [VK_BLEND_FACTOR_ONE](#) | (1,1,1) | 1 |
| [VK_BLEND_FACTOR_SRC_COLOR](#) | (Rs0,Gs0,Bs0) | As0 |
| [VK_BLEND_FACTOR_ONE_MINUS_SRC_COLOR](#) | (1-Rs0,1-Gs0,1-Bs0) | 1-As0 |
| [VK_BLEND_FACTOR_DST_COLOR](#) | (Rd,Gd,Bd) | Ad |
| [VK_BLEND_FACTOR_ONE_MINUS_DST_COLOR](#) | (1-Rd,1-Gd,1-Bd) | 1-Ad |
| [VK_BLEND_FACTOR_SRC_ALPHA](#) | (As0,As0,As0) | As0 |
| [VK_BLEND_FACTOR_ONE_MINUS_SRC_ALPHA](#) | (1-As0,1-As0,1-As0) | 1-As0 |
| [VK_BLEND_FACTOR_DST_ALPHA](#) | (Ad,Ad,Ad) | Ad |
| [VK_BLEND_FACTOR_ONE_MINUS_DST_ALPHA](#) | (1-Ad,1-Ad,1-Ad) | 1-Ad |
| [VK_BLEND_FACTOR_CONSTANT_COLOR](#) | (Rc,Gc,Bc) | Ac |
| [VK_BLEND_FACTOR_ONE_MINUS_CONSTANT_COLOR](#) | (1-Rc,1-Gc,1-Bc) | 1-Ac |
| [VK_BLEND_FACTOR_CONSTANT_ALPHA](#) | (Ac,Ac,Ac) | Ac |
| [VK_BLEND_FACTOR_ONE_MINUS_CONSTANT_ALPHA](#) | (1-Ac,1-Ac,1-Ac) | 1-Ac |
| [VK_BLEND_FACTOR_SRC_ALPHA_SATURATE](#) | (f,f,f); f = min(As0,1-Ad) | 1 |
| [VK_BLEND_FACTOR_SRC1_COLOR](#) | (Rs1,Gs1,Bs1) | As1 |
| [VK_BLEND_FACTOR_ONE_MINUS_SRC1_COLOR](#) | (1-Rs1,1-Gs1,1-Bs1) | 1-As1 |
| [VK_BLEND_FACTOR_SRC1_ALPHA](#) | (As1,As1,As1) | As1 |
| [VK_BLEND_FACTOR_ONE_MINUS_SRC1_ALPHA](#) | (1-As1,1-As1,1-As1) | 1-As1 |

In this table, the following conventions are used:

* 
Rs0,Gs0,Bs0 and As0 represent the first source color
R, G, B, and A components, respectively, for the fragment output
location corresponding to the color attachment being blended.

* 
Rs1,Gs1,Bs1 and As1 represent the second source
color R, G, B, and A components, respectively, used in dual source
blending modes, for the fragment output location corresponding to the
color attachment being blended.

* 
Rd,Gd,Bd and Ad represent the R, G, B, and A
components of the destination color.
That is, the color currently in the corresponding color attachment for
this fragment/sample.

* 
Rc,Gc,Bc and Ac represent the blend constant R, G,
B, and A components, respectively.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkColorBlendEquationEXT](VkColorBlendEquationEXT.html), [VkPipelineColorBlendAttachmentState](VkPipelineColorBlendAttachmentState.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/framebuffer.html#VkBlendFactor).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
