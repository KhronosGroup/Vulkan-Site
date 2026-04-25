# VK_KHR_load_store_op_none(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_load_store_op_none.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_load_store_op_none](#VK_KHR_load_store_op_none)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Promotion to Vulkan 1.4](#_promotion_to_vulkan_1_4)
- [Promotion_to_Vulkan_1.4](#_promotion_to_vulkan_1_4)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_load_store_op_none - device extension

**Name String**

`VK_KHR_load_store_op_none`

**Extension Type**

Device extension

**Registered Extension Number**

527

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

None

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4-promotions)

**Contact**

* 
Shahbaz Youssefi [syoussefi](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_load_store_op_none] @syoussefi%0A*Here describe the issue or question you have about the VK_KHR_load_store_op_none extension*)

**Extension Proposal**

[VK_KHR_load_store_op_none](../../../../features/latest/features/proposals/VK_KHR_load_store_op_none.html)

**Last Modified Date**

2023-05-16

**Contributors**

* 
Shahbaz Youssefi, Google

* 
Bill Licea-Kane, Qualcomm Technologies, Inc.

* 
Tobias Hector, AMD

This extension provides [VK_ATTACHMENT_LOAD_OP_NONE_KHR](VkAttachmentLoadOp.html) and
[VK_ATTACHMENT_STORE_OP_NONE_KHR](VkAttachmentStoreOp.html), which are identically promoted from
the `[VK_EXT_load_store_op_none](VK_EXT_load_store_op_none.html)` extension.

* 
`VK_KHR_LOAD_STORE_OP_NONE_EXTENSION_NAME`

* 
`VK_KHR_LOAD_STORE_OP_NONE_SPEC_VERSION`

* 
Extending [VkAttachmentLoadOp](VkAttachmentLoadOp.html):

[VK_ATTACHMENT_LOAD_OP_NONE_KHR](VkAttachmentLoadOp.html)

Extending [VkAttachmentStoreOp](VkAttachmentStoreOp.html):

* 
[VK_ATTACHMENT_STORE_OP_NONE_KHR](VkAttachmentStoreOp.html)

Functionality in this extension is included in core Vulkan 1.4 with the KHR
suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

|  | While [VK_ATTACHMENT_STORE_OP_NONE](VkAttachmentStoreOp.html) is part of Vulkan 1.3, this
| --- | --- |
extension was not promoted to core Vulkan 1.3 either in whole or in part.
This functionality was promoted from `[VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html)`. |

* 
Revision 1, 2023-05-16 (Shahbaz Youssefi)

Initial revision, based on VK_EXT_load_store_op_none.

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_load_store_op_none).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
