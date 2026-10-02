# VkRenderPassInputAttachmentAspectCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRenderPassInputAttachmentAspectCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRenderPassInputAttachmentAspectCreateInfo - Structure specifying, for a given subpass/input attachment pair, which aspect **can** be read.

The `VkRenderPassInputAttachmentAspectCreateInfo` structure is defined
as:

|  | This functionality is superseded by [Vulkan Version 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-renderpass2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_1
typedef struct VkRenderPassInputAttachmentAspectCreateInfo {
    VkStructureType                            sType;
    const void*                                pNext;
    uint32_t                                   aspectReferenceCount;
    const VkInputAttachmentAspectReference*    pAspectReferences;
} VkRenderPassInputAttachmentAspectCreateInfo;

// Provided by VK_KHR_maintenance2
// Equivalent to VkRenderPassInputAttachmentAspectCreateInfo
typedef VkRenderPassInputAttachmentAspectCreateInfo VkRenderPassInputAttachmentAspectCreateInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`aspectReferenceCount` is the number of elements in the
`pAspectReferences` array.

* 
`pAspectReferences` is a pointer to an array of
`aspectReferenceCount` [VkInputAttachmentAspectReference](VkInputAttachmentAspectReference.html)
structures containing a mask describing which aspect(s) **can** be accessed
for a given input attachment within a given subpass.

To specify which aspects of an input attachment **can** be read, add a
[VkRenderPassInputAttachmentAspectCreateInfo](#) structure to the
`pNext` chain of the [VkRenderPassCreateInfo](VkRenderPassCreateInfo.html) structure:

An application **can** access any aspect of an input attachment that does not
have a specified aspect mask in the `pAspectReferences` array.
Otherwise, an application **must** not access aspect(s) of an input attachment
other than those in its specified aspect mask.

Valid Usage (Implicit)

* 
[](#VUID-VkRenderPassInputAttachmentAspectCreateInfo-sType-sType) VUID-VkRenderPassInputAttachmentAspectCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDER_PASS_INPUT_ATTACHMENT_ASPECT_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkRenderPassInputAttachmentAspectCreateInfo-pAspectReferences-parameter) VUID-VkRenderPassInputAttachmentAspectCreateInfo-pAspectReferences-parameter

 `pAspectReferences` **must** be a valid pointer to an array of `aspectReferenceCount` valid [VkInputAttachmentAspectReference](VkInputAttachmentAspectReference.html) structures

* 
[](#VUID-VkRenderPassInputAttachmentAspectCreateInfo-aspectReferenceCount-arraylength) VUID-VkRenderPassInputAttachmentAspectCreateInfo-aspectReferenceCount-arraylength

 `aspectReferenceCount` **must** be greater than `0`

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkRenderPassCreateInfo](VkRenderPassCreateInfo.html)

[VK_KHR_maintenance2](VK_KHR_maintenance2.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkInputAttachmentAspectReference](VkInputAttachmentAspectReference.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkRenderPassInputAttachmentAspectCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
