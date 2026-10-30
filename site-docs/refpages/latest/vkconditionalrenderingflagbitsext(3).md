# VkConditionalRenderingFlagBitsEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkConditionalRenderingFlagBitsEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkConditionalRenderingFlagBitsEXT - Specify the behavior of conditional rendering

Bits which **can** be set in
[vkCmdBeginConditionalRenderingEXT](vkCmdBeginConditionalRenderingEXT.html)::`flags`, specifying the
behavior of conditional rendering, are:

// Provided by VK_EXT_conditional_rendering
typedef enum VkConditionalRenderingFlagBitsEXT {
    VK_CONDITIONAL_RENDERING_INVERTED_BIT_EXT = 0x00000001,
} VkConditionalRenderingFlagBitsEXT;

* 
[VK_CONDITIONAL_RENDERING_INVERTED_BIT_EXT](#) specifies the condition
used to determine whether to discard rendering commands or not.
That is, if the 32-bit predicate read from `buffer` memory at
`offset` is zero, the rendering commands are not discarded, and if
non zero, then they are discarded.

[VK_EXT_conditional_rendering](VK_EXT_conditional_rendering.html), [VkConditionalRenderingFlagsEXT](VkConditionalRenderingFlagsEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/drawing.html#VkConditionalRenderingFlagBitsEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
