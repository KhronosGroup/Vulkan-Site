# VkAttachmentStoreOp(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAttachmentStoreOp.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAttachmentStoreOp - Specify how contents of an attachment are treated at the end of the subpass where it is last used

Possible values of [VkAttachmentDescription](VkAttachmentDescription.html)::`storeOp` and
`stencilStoreOp`, specifying how the contents of the attachment are
treated, are:

// Provided by VK_VERSION_1_0
typedef enum VkAttachmentStoreOp {
    VK_ATTACHMENT_STORE_OP_STORE = 0,
    VK_ATTACHMENT_STORE_OP_DONT_CARE = 1,
  // Provided by VK_VERSION_1_3
    VK_ATTACHMENT_STORE_OP_NONE = 1000301000,
  // Provided by VK_KHR_dynamic_rendering, VK_KHR_load_store_op_none
    VK_ATTACHMENT_STORE_OP_NONE_KHR = VK_ATTACHMENT_STORE_OP_NONE,
  // Provided by VK_QCOM_render_pass_store_ops
    VK_ATTACHMENT_STORE_OP_NONE_QCOM = VK_ATTACHMENT_STORE_OP_NONE,
  // Provided by VK_EXT_load_store_op_none
    VK_ATTACHMENT_STORE_OP_NONE_EXT = VK_ATTACHMENT_STORE_OP_NONE,
} VkAttachmentStoreOp;

* 
[VK_ATTACHMENT_STORE_OP_STORE](#) specifies the contents generated
during the render pass and within the render area are written to memory.
For attachments with a depth/stencil format, this uses the access type
[VK_ACCESS_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT](VkAccessFlagBits.html).
For attachments with a color format, this uses the access type
[VK_ACCESS_COLOR_ATTACHMENT_WRITE_BIT](VkAccessFlagBits.html).

* 
[VK_ATTACHMENT_STORE_OP_DONT_CARE](#) specifies the contents within the
render area are not needed after rendering, and **may** be discarded; the
contents of the attachment will be **undefined** inside the render area.
For attachments with a depth/stencil format, this uses the access type
[VK_ACCESS_DEPTH_STENCIL_ATTACHMENT_WRITE_BIT](VkAccessFlagBits.html).
For attachments with a color format, this uses the access type
[VK_ACCESS_COLOR_ATTACHMENT_WRITE_BIT](VkAccessFlagBits.html).

* 
[VK_ATTACHMENT_STORE_OP_NONE](#) specifies the contents within the
render area are not accessed by the store operation as long as no values
are written to the attachment during the render pass.
If values are written during the render pass, this behaves identically
to [VK_ATTACHMENT_STORE_OP_DONT_CARE](#) and with matching access
semantics.

|  | [VK_ATTACHMENT_STORE_OP_DONT_CARE](#) **can** cause contents generated during
| --- | --- |
previous render passes to be discarded before reaching memory, even if no
write to the attachment occurs during the current render pass. |

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAttachmentDescription](VkAttachmentDescription.html), [VkAttachmentDescription2](VkAttachmentDescription2.html), [VkRenderingAttachmentInfo](VkRenderingAttachmentInfo.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkAttachmentStoreOp).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
