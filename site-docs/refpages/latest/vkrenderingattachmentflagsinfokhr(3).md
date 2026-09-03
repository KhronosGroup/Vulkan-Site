# VkRenderingAttachmentFlagsInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRenderingAttachmentFlagsInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRenderingAttachmentFlagsInfoKHR - Structure specifying flags extending a rendering attachment

To specify an attachment as an *input attachment* or to specify resolve
operation flags, the `VkRenderingAttachmentFlagsInfoKHR` structure **can**
be added to the `pNext` chain of [VkRenderingAttachmentInfo](VkRenderingAttachmentInfo.html).

The `VkRenderingAttachmentFlagsInfoKHR` structure is defined as:

// Provided by VK_KHR_maintenance10
typedef struct VkRenderingAttachmentFlagsInfoKHR {
    VkStructureType                  sType;
    const void*                      pNext;
    VkRenderingAttachmentFlagsKHR    flags;
} VkRenderingAttachmentFlagsInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkRenderingAttachmentFlagsKHR](VkRenderingAttachmentFlagsKHR.html)

Valid Usage

* 
[](#VUID-VkRenderingAttachmentFlagsInfoKHR-flags-11755) VUID-VkRenderingAttachmentFlagsInfoKHR-flags-11755

`flags` **must** not include
[VK_RENDERING_ATTACHMENT_INPUT_ATTACHMENT_FEEDBACK_BIT_KHR](VkRenderingAttachmentFlagBitsKHR.html)
if the
[`dynamicRenderingLocalRead`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingLocalRead)
feature is not enabled

* 
[](#VUID-VkRenderingAttachmentFlagsInfoKHR-flags-11756) VUID-VkRenderingAttachmentFlagsInfoKHR-flags-11756

If `flags` includes
[VK_RENDERING_ATTACHMENT_RESOLVE_SKIP_TRANSFER_FUNCTION_BIT_KHR](VkRenderingAttachmentFlagBitsKHR.html),
`flags` **must** not include
[VK_RENDERING_ATTACHMENT_RESOLVE_ENABLE_TRANSFER_FUNCTION_BIT_KHR](VkRenderingAttachmentFlagBitsKHR.html)

* 
[](#VUID-VkRenderingAttachmentFlagsInfoKHR-flags-11757) VUID-VkRenderingAttachmentFlagsInfoKHR-flags-11757

If `flags` includes
[VK_RENDERING_ATTACHMENT_RESOLVE_SKIP_TRANSFER_FUNCTION_BIT_KHR](VkRenderingAttachmentFlagBitsKHR.html) or
[VK_RENDERING_ATTACHMENT_RESOLVE_ENABLE_TRANSFER_FUNCTION_BIT_KHR](VkRenderingAttachmentFlagBitsKHR.html),
[`resolveSrgbFormatSupportsTransferFunctionControl`](../../../../spec/latest/chapters/limits.html#limits-resolveSrgbFormatSupportsTransferFunctionControl)
**must** be [VK_TRUE](VK_TRUE.html)

Valid Usage (Implicit)

* 
[](#VUID-VkRenderingAttachmentFlagsInfoKHR-sType-sType) VUID-VkRenderingAttachmentFlagsInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDERING_ATTACHMENT_FLAGS_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkRenderingAttachmentFlagsInfoKHR-flags-parameter) VUID-VkRenderingAttachmentFlagsInfoKHR-flags-parameter

 `flags` **must** be a valid combination of [VkRenderingAttachmentFlagBitsKHR](VkRenderingAttachmentFlagBitsKHR.html) values

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkRenderingAttachmentInfo](VkRenderingAttachmentInfo.html)

[VK_KHR_maintenance10](VK_KHR_maintenance10.html), [VkRenderingAttachmentFlagsKHR](VkRenderingAttachmentFlagsKHR.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkRenderingAttachmentFlagsInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
