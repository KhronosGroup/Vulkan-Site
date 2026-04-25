# VkLogicOp(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkLogicOp.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkLogicOp - Framebuffer logical operations

Logical operations are controlled by the `logicOpEnable` and
`logicOp` members of [VkPipelineColorBlendStateCreateInfo](VkPipelineColorBlendStateCreateInfo.html).
The `logicOpEnable` state can also be controlled by
[vkCmdSetLogicOpEnableEXT](vkCmdSetLogicOpEnableEXT.html) if graphics pipeline is created with
[VK_DYNAMIC_STATE_LOGIC_OP_ENABLE_EXT](VkDynamicState.html) set in
[VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
The `logicOp` state can also be controlled by [vkCmdSetLogicOpEXT](vkCmdSetLogicOpEXT.html)
if graphics pipeline is created with [VK_DYNAMIC_STATE_LOGIC_OP_EXT](VkDynamicState.html) set
in [VkPipelineDynamicStateCreateInfo](VkPipelineDynamicStateCreateInfo.html)::`pDynamicStates`.
If `logicOpEnable` is [VK_TRUE](VK_TRUE.html), then a logical operation selected
by `logicOp` is applied between each color attachment and the fragment’s
corresponding output value, and blending of all attachments is treated as if
it were disabled.
Any attachments using color formats for which logical operations are not
supported simply pass through the color values unmodified.
The logical operation is applied independently for each of the red, green,
blue, and alpha components.
The `logicOp` is selected from the following operations:

// Provided by VK_VERSION_1_0
typedef enum VkLogicOp {
    VK_LOGIC_OP_CLEAR = 0,
    VK_LOGIC_OP_AND = 1,
    VK_LOGIC_OP_AND_REVERSE = 2,
    VK_LOGIC_OP_COPY = 3,
    VK_LOGIC_OP_AND_INVERTED = 4,
    VK_LOGIC_OP_NO_OP = 5,
    VK_LOGIC_OP_XOR = 6,
    VK_LOGIC_OP_OR = 7,
    VK_LOGIC_OP_NOR = 8,
    VK_LOGIC_OP_EQUIVALENT = 9,
    VK_LOGIC_OP_INVERT = 10,
    VK_LOGIC_OP_OR_REVERSE = 11,
    VK_LOGIC_OP_COPY_INVERTED = 12,
    VK_LOGIC_OP_OR_INVERTED = 13,
    VK_LOGIC_OP_NAND = 14,
    VK_LOGIC_OP_SET = 15,
} VkLogicOp;

The logical operations supported by Vulkan are summarized in the following
table in which

* 
¬ is bitwise invert,

* 
∧ is bitwise and,

* 
∨ is bitwise or,

* 
⊕ is bitwise exclusive or,

* 
s is the fragment’s Rs0, Gs0, Bs0 or As0
component value for the fragment output corresponding to the color
attachment being updated, and

* 
d is the color attachment’s R, G, B or A component
value:

| Mode | Operation |
| --- | --- |
| [VK_LOGIC_OP_CLEAR](#) | 0 |
| [VK_LOGIC_OP_AND](#) | s ∧ d |
| [VK_LOGIC_OP_AND_REVERSE](#) | s ∧ ¬ d |
| [VK_LOGIC_OP_COPY](#) | s |
| [VK_LOGIC_OP_AND_INVERTED](#) | ¬ s ∧ d |
| [VK_LOGIC_OP_NO_OP](#) | d |
| [VK_LOGIC_OP_XOR](#) | s ⊕ d |
| [VK_LOGIC_OP_OR](#) | s ∨ d |
| [VK_LOGIC_OP_NOR](#) | ¬ (s ∨ d) |
| [VK_LOGIC_OP_EQUIVALENT](#) | ¬ (s ⊕ d) |
| [VK_LOGIC_OP_INVERT](#) | ¬ d |
| [VK_LOGIC_OP_OR_REVERSE](#) | s ∨ ¬ d |
| [VK_LOGIC_OP_COPY_INVERTED](#) | ¬ s |
| [VK_LOGIC_OP_OR_INVERTED](#) | ¬ s ∨ d |
| [VK_LOGIC_OP_NAND](#) | ¬ (s ∧ d) |
| [VK_LOGIC_OP_SET](#) | all 1s |

The result of the logical operation is then written to the color attachment
as controlled by the component write mask, described in
[Blend Operations](../../../../spec/latest/chapters/framebuffer.html#framebuffer-blendoperations).

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkPipelineColorBlendStateCreateInfo](VkPipelineColorBlendStateCreateInfo.html), [vkCmdSetLogicOpEXT](vkCmdSetLogicOpEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/framebuffer.html#VkLogicOp).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
