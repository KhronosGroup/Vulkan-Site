# VkAttachmentLoadOp(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAttachmentLoadOp.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAttachmentLoadOp - Specify how contents of an attachment are treated at the beginning of the subpass where it is first used

Load operations that **can** be used for a render pass are:

// Provided by VK_VERSION_1_0
typedef enum VkAttachmentLoadOp {
    VK_ATTACHMENT_LOAD_OP_LOAD = 0,
    VK_ATTACHMENT_LOAD_OP_CLEAR = 1,
    VK_ATTACHMENT_LOAD_OP_DONT_CARE = 2,
  // Provided by VK_VERSION_1_4
    VK_ATTACHMENT_LOAD_OP_NONE = 1000400000,
  // Provided by VK_EXT_load_store_op_none
    VK_ATTACHMENT_LOAD_OP_NONE_EXT = VK_ATTACHMENT_LOAD_OP_NONE,
  // Provided by VK_KHR_load_store_op_none
    VK_ATTACHMENT_LOAD_OP_NONE_KHR = VK_ATTACHMENT_LOAD_OP_NONE,
} VkAttachmentLoadOp;

* 
[VK_ATTACHMENT_LOAD_OP_LOAD](#) specifies that the previous contents of
the image within the render area will be preserved as the initial
values.
For attachments with a depth/stencil format, this uses the access type
[VK_ACCESS_DEPTH_STENCIL_ATTACHMENT_READ_BIT](VkAccessFlagBits.html).
For attachments with a color format, this uses the access type
[VK_ACCESS_COLOR_ATTACHMENT_READ_BIT](VkAccessFlagBits.html).

* 
[VK_ATTACHMENT_LOAD_OP_CLEAR](#) specifies that the contents within the
render area will be cleared to a uniform value, which is specified when
a render pass instance is begun.
For attachments with a depth/stencil format, this uses the access type
[VK_ACCESS_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT](VkAccessFlagBits.html).
For attachments with a color format, this uses the access type
[VK_ACCESS_COLOR_ATTACHMENT_WRITE_BIT](VkAccessFlagBits.html).

* 
[VK_ATTACHMENT_LOAD_OP_DONT_CARE](#) specifies that the previous
contents within the area need not be preserved; the contents of the
attachment will be **undefined** inside the render area.
For attachments with a depth/stencil format, this uses the access type
[VK_ACCESS_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT](VkAccessFlagBits.html).
For attachments with a color format, this uses the access type
[VK_ACCESS_COLOR_ATTACHMENT_WRITE_BIT](VkAccessFlagBits.html).

* 
[VK_ATTACHMENT_LOAD_OP_NONE](#) specifies that the previous contents of
the image will be **undefined** inside the render pass.
No access type is used as the image is not accessed.

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAttachmentDescription](VkAttachmentDescription.html), [VkAttachmentDescription2](VkAttachmentDescription2.html), [VkRenderingAttachmentInfo](VkRenderingAttachmentInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkAttachmentLoadOp).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
