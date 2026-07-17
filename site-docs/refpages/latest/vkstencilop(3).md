# VkStencilOp(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkStencilOp.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkStencilOp - Stencil comparison function

Possible values of the `failOp`, `passOp`, and `depthFailOp`
members of [VkStencilOpState](VkStencilOpState.html), specifying what happens to the stored
stencil value if this or certain subsequent tests fail or pass, are:

// Provided by VK_VERSION_1_0
typedef enum VkStencilOp {
    VK_STENCIL_OP_KEEP = 0,
    VK_STENCIL_OP_ZERO = 1,
    VK_STENCIL_OP_REPLACE = 2,
    VK_STENCIL_OP_INCREMENT_AND_CLAMP = 3,
    VK_STENCIL_OP_DECREMENT_AND_CLAMP = 4,
    VK_STENCIL_OP_INVERT = 5,
    VK_STENCIL_OP_INCREMENT_AND_WRAP = 6,
    VK_STENCIL_OP_DECREMENT_AND_WRAP = 7,
} VkStencilOp;

* 
[VK_STENCIL_OP_KEEP](#) keeps the current value.

* 
[VK_STENCIL_OP_ZERO](#) sets the value to 0.

* 
[VK_STENCIL_OP_REPLACE](#) sets the value to `reference`.

* 
[VK_STENCIL_OP_INCREMENT_AND_CLAMP](#) increments the current value and
clamps to the maximum representable unsigned value.

* 
[VK_STENCIL_OP_DECREMENT_AND_CLAMP](#) decrements the current value and
clamps to 0.

* 
[VK_STENCIL_OP_INVERT](#) bitwise-inverts the current value.

* 
[VK_STENCIL_OP_INCREMENT_AND_WRAP](#) increments the current value and
wraps to 0 when the maximum value would have been exceeded.

* 
[VK_STENCIL_OP_DECREMENT_AND_WRAP](#) decrements the current value and
wraps to the maximum possible value when the value would go below 0.

For purposes of increment and decrement, the stencil bits are considered as
an unsigned integer.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkStencilOpState](VkStencilOpState.html), [vkCmdSetStencilOp](vkCmdSetStencilOp.html), [vkCmdSetStencilOp](vkCmdSetStencilOp.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fragops.html#VkStencilOp).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
