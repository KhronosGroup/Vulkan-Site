# VkStencilOpState(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkStencilOpState.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkStencilOpState - Structure specifying stencil operation state

The `VkStencilOpState` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkStencilOpState {
    VkStencilOp    failOp;
    VkStencilOp    passOp;
    VkStencilOp    depthFailOp;
    VkCompareOp    compareOp;
    uint32_t       compareMask;
    uint32_t       writeMask;
    uint32_t       reference;
} VkStencilOpState;

* 
`failOp` is a [VkStencilOp](VkStencilOp.html) value specifying the action
performed on samples that fail the stencil test.

* 
`passOp` is a [VkStencilOp](VkStencilOp.html) value specifying the action
performed on samples that pass both the depth and stencil tests.

* 
`depthFailOp` is a [VkStencilOp](VkStencilOp.html) value specifying the action
performed on samples that pass the stencil test and fail the depth test.

* 
`compareOp` is a [VkCompareOp](VkCompareOp.html) value specifying the comparison
operator used in the stencil test.

* 
`compareMask` selects the bits of the unsigned integer stencil
values participating in the stencil test.

* 
`writeMask` selects the bits of the unsigned integer stencil values
updated by the stencil test in the stencil framebuffer attachment.

* 
`reference` is an integer stencil reference value that is used in
the unsigned stencil comparison.

Valid Usage (Implicit)

* 
[](#VUID-VkStencilOpState-failOp-parameter) VUID-VkStencilOpState-failOp-parameter

 `failOp` **must** be a valid [VkStencilOp](VkStencilOp.html) value

* 
[](#VUID-VkStencilOpState-passOp-parameter) VUID-VkStencilOpState-passOp-parameter

 `passOp` **must** be a valid [VkStencilOp](VkStencilOp.html) value

* 
[](#VUID-VkStencilOpState-depthFailOp-parameter) VUID-VkStencilOpState-depthFailOp-parameter

 `depthFailOp` **must** be a valid [VkStencilOp](VkStencilOp.html) value

* 
[](#VUID-VkStencilOpState-compareOp-parameter) VUID-VkStencilOpState-compareOp-parameter

 `compareOp` **must** be a valid [VkCompareOp](VkCompareOp.html) value

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkCompareOp](VkCompareOp.html), [VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html), [VkStencilOp](VkStencilOp.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fragops.html#VkStencilOpState).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
