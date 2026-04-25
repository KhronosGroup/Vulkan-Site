# VkClearValue(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkClearValue.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkClearValue - Structure specifying a clear value

The `VkClearValue` union is defined as:

// Provided by VK_VERSION_1_0
typedef union VkClearValue {
    VkClearColorValue           color;
    VkClearDepthStencilValue    depthStencil;
} VkClearValue;

* 
`color` specifies the color image clear values to use when clearing
a color image or attachment.

* 
`depthStencil` specifies the depth and stencil clear values to use
when clearing a depth/stencil image or attachment.

This union is used where part of the API requires either color or
depth/stencil clear values, depending on the attachment, and defines the
initial clear values in the [VkRenderPassBeginInfo](VkRenderPassBeginInfo.html) structure.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkClearAttachment](VkClearAttachment.html), [VkClearColorValue](VkClearColorValue.html), [VkClearDepthStencilValue](VkClearDepthStencilValue.html), [VkRenderPassBeginInfo](VkRenderPassBeginInfo.html), [VkRenderingAttachmentInfo](VkRenderingAttachmentInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/clears.html#VkClearValue).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
