# VkClearAttachment(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkClearAttachment.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkClearAttachment - Structure specifying a clear attachment

The `VkClearAttachment` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkClearAttachment {
    VkImageAspectFlags    aspectMask;
    uint32_t              colorAttachment;
    VkClearValue          clearValue;
} VkClearAttachment;

* 
`aspectMask` is a mask selecting the color, depth and/or stencil
aspects of the attachment to be cleared.

* 
`colorAttachment` is only meaningful if
[VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html) is set in `aspectMask`, in which
case it is an index into the bound color attachments.

* 
`clearValue` is the color or depth/stencil value to clear the
attachment to, as described in [Clear Values](../../../../spec/latest/chapters/clears.html#clears-values) below.

Valid Usage

* 
[](#VUID-VkClearAttachment-aspectMask-00019) VUID-VkClearAttachment-aspectMask-00019

If `aspectMask` includes [VK_IMAGE_ASPECT_COLOR_BIT](VkImageAspectFlagBits.html), it **must**
not include [VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html) or
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-VkClearAttachment-aspectMask-00020) VUID-VkClearAttachment-aspectMask-00020

`aspectMask` **must** not include [VK_IMAGE_ASPECT_METADATA_BIT](VkImageAspectFlagBits.html)

* 
[](#VUID-VkClearAttachment-aspectMask-02246) VUID-VkClearAttachment-aspectMask-02246

`aspectMask` **must** not include
`VK_IMAGE_ASPECT_MEMORY_PLANE*_i_*BIT_EXT` for any index *i*

Valid Usage (Implicit)

* 
[](#VUID-VkClearAttachment-aspectMask-parameter) VUID-VkClearAttachment-aspectMask-parameter

 `aspectMask` **must** be a valid combination of [VkImageAspectFlagBits](VkImageAspectFlagBits.html) values

* 
[](#VUID-VkClearAttachment-aspectMask-requiredbitmask) VUID-VkClearAttachment-aspectMask-requiredbitmask

 `aspectMask` **must** not be `0`

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkClearValue](VkClearValue.html), [VkImageAspectFlags](VkImageAspectFlags.html), [vkCmdClearAttachments](vkCmdClearAttachments.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/clears.html#VkClearAttachment).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
