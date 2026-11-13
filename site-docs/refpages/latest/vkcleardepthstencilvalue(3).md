# VkClearDepthStencilValue(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkClearDepthStencilValue.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkClearDepthStencilValue - Structure specifying a clear depth stencil value

The `VkClearDepthStencilValue` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkClearDepthStencilValue {
    float       depth;
    uint32_t    stencil;
} VkClearDepthStencilValue;

* 
`depth` is the clear value for the depth aspect of the depth/stencil
attachment.
It is a floating-point value which is automatically converted to the
attachment’s format.

* 
`stencil` is the clear value for the stencil aspect of the
depth/stencil attachment.
It is a 32-bit integer value which is converted to the attachment’s
format by taking the appropriate number of LSBs.

Valid Usage

* 
[](#VUID-VkClearDepthStencilValue-depth-00022) VUID-VkClearDepthStencilValue-depth-00022

Unless the `[VK_EXT_depth_range_unrestricted](VK_EXT_depth_range_unrestricted.html)` extension is enabled
`depth` **must** be between `0.0` and `1.0`, inclusive

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkClearValue](VkClearValue.html), [vkCmdClearDepthStencilImage](vkCmdClearDepthStencilImage.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/clears.html#VkClearDepthStencilValue).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
