# VK_QCOM_render_pass_store_ops(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_QCOM_render_pass_store_ops.html

## Table of Contents

- [Name](#_name)
- [VK_QCOM_render_pass_store_ops](#VK_QCOM_render_pass_store_ops)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_QCOM_render_pass_store_ops - device extension

**Name String**

`VK_QCOM_render_pass_store_ops`

**Extension Type**

Device extension

**Registered Extension Number**

302

**Revision**

2

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**Contact**

* 
Matthew Netsch [mnetsch](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_QCOM_render_pass_store_ops] @mnetsch%0A*Here describe the issue or question you have about the VK_QCOM_render_pass_store_ops extension*)

**Last Modified Date**

2020-03-25

**Contributors**

* 
Bill Licea-Kane, Qualcomm Technologies, Inc.

Render pass attachments **can** be read-only for the duration of a render pass.

Examples include input attachments and depth attachments where depth tests
are enabled but depth writes are not enabled.

In such cases, there **can** be no contents generated for an attachment within
the render area.

This extension adds a new [VkAttachmentStoreOp](VkAttachmentStoreOp.html)
[VK_ATTACHMENT_STORE_OP_NONE_QCOM](VkAttachmentStoreOp.html) specifying that the contents within
the render area **may** not be written to memory, but that the prior contents
of the attachment in memory are preserved.
However, if any contents were generated within the render area during
rendering, the contents of the attachment will be **undefined** inside the
render area.

|  | The [VkAttachmentStoreOp](VkAttachmentStoreOp.html) [VK_ATTACHMENT_STORE_OP_STORE](VkAttachmentStoreOp.html) **may** force
| --- | --- |
an implementation to assume that the attachment was written and force an
implementation to flush data to memory or to a higher level cache.
The [VkAttachmentStoreOp](VkAttachmentStoreOp.html) [VK_ATTACHMENT_STORE_OP_NONE_QCOM](VkAttachmentStoreOp.html) **may**
allow an implementation to assume that the attachment was not written and
allow an implementation to avoid such a flush. |

* 
`VK_QCOM_RENDER_PASS_STORE_OPS_EXTENSION_NAME`

* 
`VK_QCOM_RENDER_PASS_STORE_OPS_SPEC_VERSION`

* 
Extending [VkAttachmentStoreOp](VkAttachmentStoreOp.html):

[VK_ATTACHMENT_STORE_OP_NONE_QCOM](VkAttachmentStoreOp.html)

* 
Revision 1, 2019-12-20 (wwlk)

Initial version

Revision 2, 2020-03-25 (wwlk)

* 
Minor renaming

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_QCOM_render_pass_store_ops).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
