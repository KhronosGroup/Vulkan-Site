# VkClearRect(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkClearRect.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkClearRect - Structure specifying a clear rectangle

The `VkClearRect` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkClearRect {
    VkRect2D    rect;
    uint32_t    baseArrayLayer;
    uint32_t    layerCount;
} VkClearRect;

* 
`rect` is the two-dimensional region to be cleared.

* 
`baseArrayLayer` is the first layer to be cleared.

* 
`layerCount` is the number of layers to clear.

The layers [`baseArrayLayer`, `baseArrayLayer` + 
`layerCount`) counting from the base layer of the attachment image view
are cleared.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkRect2D](VkRect2D.html), [vkCmdClearAttachments](vkCmdClearAttachments.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/clears.html#VkClearRect).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
