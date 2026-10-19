# VkCompareOp(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkCompareOp.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkCompareOp - Comparison operator for depth, stencil, and sampler operations

*Comparison operators* compare a *reference* and a *test* value, and return
a true (“passed”) or false (“failed”) value depending on the comparison
operator chosen.
The supported operators are:

// Provided by VK_VERSION_1_0
typedef enum VkCompareOp {
    VK_COMPARE_OP_NEVER = 0,
    VK_COMPARE_OP_LESS = 1,
    VK_COMPARE_OP_EQUAL = 2,
    VK_COMPARE_OP_LESS_OR_EQUAL = 3,
    VK_COMPARE_OP_GREATER = 4,
    VK_COMPARE_OP_NOT_EQUAL = 5,
    VK_COMPARE_OP_GREATER_OR_EQUAL = 6,
    VK_COMPARE_OP_ALWAYS = 7,
} VkCompareOp;

* 
[VK_COMPARE_OP_NEVER](#) specifies that the comparison always evaluates
false.

* 
[VK_COMPARE_OP_LESS](#) specifies that the comparison evaluates
*reference* .

* 
[VK_COMPARE_OP_EQUAL](#) specifies that the comparison evaluates
*reference* = *test*.

* 
[VK_COMPARE_OP_LESS_OR_EQUAL](#) specifies that the comparison
evaluates *reference* ≤ *test*.

* 
[VK_COMPARE_OP_GREATER](#) specifies that the comparison evaluates
*reference* > *test*.

* 
[VK_COMPARE_OP_NOT_EQUAL](#) specifies that the comparison evaluates
*reference* ≠ *test*.

* 
[VK_COMPARE_OP_GREATER_OR_EQUAL](#) specifies that the comparison
evaluates *reference* ≥ *test*.

* 
[VK_COMPARE_OP_ALWAYS](#) specifies that the comparison always
evaluates true.

Comparison operators are used for:

* 
The [Depth Compare Operation](../../../../spec/latest/chapters/textures.html#textures-depth-compare-operation)
operator for a sampler, specified by
[VkSamplerCreateInfo](VkSamplerCreateInfo.html)::`compareOp`.

* 
The stencil comparison operator for the [stencil    test](../../../../spec/latest/chapters/fragops.html#fragops-stencil), specified by
[vkCmdSetStencilOp](vkCmdSetStencilOp.html)::`compareOp` or
    [VkStencilOpState](VkStencilOpState.html)::`compareOp`.

* 
The [Depth Comparison](../../../../spec/latest/chapters/fragops.html#fragops-depth-comparison) operator for the
    [depth test](../../../../spec/latest/chapters/fragops.html#fragops-depth), specified by
[vkCmdSetDepthCompareOp](vkCmdSetDepthCompareOp.html)::`depthCompareOp` or
    [VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html)::`depthCompareOp`.

Each such use describes how the *reference* and *test* values for that
comparison are determined.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkPipelineDepthStencilStateCreateInfo](VkPipelineDepthStencilStateCreateInfo.html), [VkSamplerCreateInfo](VkSamplerCreateInfo.html), [VkStencilOpState](VkStencilOpState.html), [vkCmdSetDepthCompareOp](vkCmdSetDepthCompareOp.html), [vkCmdSetDepthCompareOp](vkCmdSetDepthCompareOp.html), [vkCmdSetStencilOp](vkCmdSetStencilOp.html), [vkCmdSetStencilOp](vkCmdSetStencilOp.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/samplers.html#VkCompareOp).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
