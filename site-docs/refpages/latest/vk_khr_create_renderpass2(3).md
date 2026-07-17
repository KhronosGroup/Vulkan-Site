# VK_KHR_create_renderpass2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_KHR_create_renderpass2.html

## Table of Contents

- [Name](#_name)
- [VK_KHR_create_renderpass2](#VK_KHR_create_renderpass2)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Promotion to Vulkan 1.2](#_promotion_to_vulkan_1_2)
- [Promotion_to_Vulkan_1.2](#_promotion_to_vulkan_1_2)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_KHR_create_renderpass2 - device extension

**Name String**

`VK_KHR_create_renderpass2`

**Extension Type**

Device extension

**Registered Extension Number**

110

**Revision**

1

**Ratification Status**

Ratified

**Extension and Version Dependencies**

     [VK_KHR_multiview](VK_KHR_multiview.html)

     and

     [VK_KHR_maintenance2](VK_KHR_maintenance2.html)

or

[Vulkan Version 1.1](../../../../spec/latest/appendices/versions.html#versions-1.1)

**Deprecation State**

* 
*Promoted* to
[Vulkan 1.2](../../../../spec/latest/appendices/versions.html#versions-1.2-promotions)

**Contact**

* 
Tobias Hector [tobias](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_KHR_create_renderpass2] @tobias%0A*Here describe the issue or question you have about the VK_KHR_create_renderpass2 extension*)

**Last Modified Date**

2018-02-07

**Contributors**

* 
Tobias Hector

* 
Jeff Bolz

This extension provides a new command to create render passes in a way that
can be easily extended by other extensions through the substructures of
render pass creation.
The Vulkan 1.0 render pass creation sub-structures do not include
`sType`/`pNext` members.
Additionally, the render pass begin/next/end commands have been augmented
with new extensible structures for passing additional subpass information.

The [VkRenderPassMultiviewCreateInfo](VkRenderPassMultiviewCreateInfo.html) and
[VkInputAttachmentAspectReference](VkInputAttachmentAspectReference.html) structures that extended the original
[VkRenderPassCreateInfo](VkRenderPassCreateInfo.html) are not accepted into the new creation
functions, and instead their parameters are folded into this extension as
follows:

* 
Elements of [VkRenderPassMultiviewCreateInfo](VkRenderPassMultiviewCreateInfo.html)::`pViewMasks` are
now specified in [VkSubpassDescription2KHR](VkSubpassDescription2.html)::`viewMask`.

* 
Elements of [VkRenderPassMultiviewCreateInfo](VkRenderPassMultiviewCreateInfo.html)::`pViewOffsets`
are now specified in [VkSubpassDependency2KHR](VkSubpassDependency2.html)::`viewOffset`.

* 
[VkRenderPassMultiviewCreateInfo](VkRenderPassMultiviewCreateInfo.html)::`correlationMaskCount` and
[VkRenderPassMultiviewCreateInfo](VkRenderPassMultiviewCreateInfo.html)::`pCorrelationMasks` are
directly specified in [VkRenderPassCreateInfo2KHR](VkRenderPassCreateInfo2.html).

* 
[VkInputAttachmentAspectReference](VkInputAttachmentAspectReference.html)::`aspectMask` is now
specified in the relevant input attachment reference in
[VkAttachmentReference2KHR](VkAttachmentReference2.html)::`aspectMask`

The details of these mappings are explained fully in the new structures.

All functionality in this extension is included in core Vulkan 1.2, with the
KHR suffix omitted.
The original type, enum, and command names are still available as aliases of
the core functionality.

* 
[vkCmdBeginRenderPass2KHR](vkCmdBeginRenderPass2.html)

* 
[vkCmdEndRenderPass2KHR](vkCmdEndRenderPass2.html)

* 
[vkCmdNextSubpass2KHR](vkCmdNextSubpass2.html)

* 
[vkCreateRenderPass2KHR](vkCreateRenderPass2.html)

* 
[VkAttachmentDescription2KHR](VkAttachmentDescription2.html)

* 
[VkAttachmentReference2KHR](VkAttachmentReference2.html)

* 
[VkRenderPassCreateInfo2KHR](VkRenderPassCreateInfo2.html)

* 
[VkSubpassBeginInfoKHR](VkSubpassBeginInfo.html)

* 
[VkSubpassDependency2KHR](VkSubpassDependency2.html)

* 
[VkSubpassDescription2KHR](VkSubpassDescription2.html)

* 
[VkSubpassEndInfoKHR](VkSubpassEndInfo.html)

* 
`VK_KHR_CREATE_RENDERPASS_2_EXTENSION_NAME`

* 
`VK_KHR_CREATE_RENDERPASS_2_SPEC_VERSION`

* 
Extending [VkStructureType](VkStructureType.html):

[VK_STRUCTURE_TYPE_ATTACHMENT_DESCRIPTION_2_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_ATTACHMENT_REFERENCE_2_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_RENDER_PASS_CREATE_INFO_2_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SUBPASS_BEGIN_INFO_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SUBPASS_DEPENDENCY_2_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SUBPASS_DESCRIPTION_2_KHR](VkStructureType.html)

* 
[VK_STRUCTURE_TYPE_SUBPASS_END_INFO_KHR](VkStructureType.html)

* 
Revision 1, 2018-02-07 (Tobias Hector)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_KHR_create_renderpass2).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
