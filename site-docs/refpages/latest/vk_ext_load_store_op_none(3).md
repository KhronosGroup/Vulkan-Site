# VK_EXT_load_store_op_none(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_EXT_load_store_op_none.html

## Table of Contents

- [Name](#_name)
- [VK_EXT_load_store_op_none](#VK_EXT_load_store_op_none)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to VK_KHR_load_store_op_none](#_promotion_to_vk_khr_load_store_op_none)
- [Promotion_to_VK_KHR_load_store_op_none](#_promotion_to_vk_khr_load_store_op_none)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_EXT_load_store_op_none - device extension

**Name String**

`VK_EXT_load_store_op_none`

**Extension Type**

Device extension

**Registered Extension Number**

401

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

None

**Deprecation State**

* 
*Promoted* to
[VK_KHR_load_store_op_none](VK_KHR_load_store_op_none.html)
extension

Which in turn was *promoted* to
[Vulkan 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4-promotions)

**Contact**

* 
Shahbaz Youssefi [syoussefi](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_EXT_load_store_op_none] @syoussefi%0A*Here describe the issue or question you have about the VK_EXT_load_store_op_none extension*)

**Last Modified Date**

2021-06-06

**Contributors**

* 
Shahbaz Youssefi, Google

* 
Bill Licea-Kane, Qualcomm Technologies, Inc.

* 
Tobias Hector, AMD

This extension incorporates [VK_ATTACHMENT_STORE_OP_NONE_EXT](VkAttachmentStoreOp.html) from
`[VK_QCOM_render_pass_store_ops](VK_QCOM_render_pass_store_ops.html)`, enabling applications to avoid
unnecessary synchronization when an attachment is not written during a
render pass.

Additionally, [VK_ATTACHMENT_LOAD_OP_NONE_EXT](VkAttachmentLoadOp.html) is introduced to avoid
unnecessary synchronization when an attachment is not used during a render
pass at all.
In combination with [VK_ATTACHMENT_STORE_OP_NONE_EXT](VkAttachmentStoreOp.html), this is useful as
an alternative to preserve attachments in applications that cannot decide if
an attachment will be used in a render pass until after the necessary
pipelines have been created.

All functionality in this extension is included in
`[VK_KHR_load_store_op_none](VK_KHR_load_store_op_none.html)`, with the suffix changed to KHR.
The original enum names are still available as aliases of the KHR
functionality.

* 
`VK_EXT_LOAD_STORE_OP_NONE_EXTENSION_NAME`

* 
`VK_EXT_LOAD_STORE_OP_NONE_SPEC_VERSION`

* 
Extending [VkAttachmentLoadOp](VkAttachmentLoadOp.html):

[VK_ATTACHMENT_LOAD_OP_NONE_EXT](VkAttachmentLoadOp.html)

Extending [VkAttachmentStoreOp](VkAttachmentStoreOp.html):

* 
[VK_ATTACHMENT_STORE_OP_NONE_EXT](VkAttachmentStoreOp.html)

|  | While [VK_ATTACHMENT_STORE_OP_NONE](VkAttachmentStoreOp.html) is part of Vulkan 1.3, this
| --- | --- |
extension was not promoted to core either in whole or in part.
This functionality was promoted from `[VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html)`. |

* 
Revision 1, 2021-06-06 (Shahbaz Youssefi)

Initial revision, based on VK_QCOM_render_pass_store_ops.

* 
Added VK_ATTACHMENT_LOAD_OP_NONE_EXT.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_EXT_load_store_op_none).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
