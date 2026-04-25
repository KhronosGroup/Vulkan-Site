# VkRenderPassFragmentDensityMapCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRenderPassFragmentDensityMapCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRenderPassFragmentDensityMapCreateInfoEXT - Structure containing fragment density map attachment for render pass

If the [VkRenderPassCreateInfo](VkRenderPassCreateInfo.html)::`pNext` chain includes a
`VkRenderPassFragmentDensityMapCreateInfoEXT` structure, then that
structure includes a fragment density map attachment for the render pass.

The `VkRenderPassFragmentDensityMapCreateInfoEXT` structure is defined
as:

|  | This functionality is superseded by [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4) and [VK_KHR_dynamic_rendering_local_read](VK_KHR_dynamic_rendering_local_read.html). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_EXT_fragment_density_map
typedef struct VkRenderPassFragmentDensityMapCreateInfoEXT {
    VkStructureType          sType;
    const void*              pNext;
    VkAttachmentReference    fragmentDensityMapAttachment;
} VkRenderPassFragmentDensityMapCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`fragmentDensityMapAttachment` is the fragment density map to use
for the render pass.

The fragment density map is read at an implementation-dependent time with
the following constraints determined by the attachment’s image view
`flags`:

* 
[VK_IMAGE_VIEW_CREATE_FRAGMENT_DENSITY_MAP_DYNAMIC_BIT_EXT](VkImageViewCreateFlagBits.html)
specifies that the fragment density map will be read by the device
during [VK_PIPELINE_STAGE_FRAGMENT_DENSITY_PROCESS_BIT_EXT](VkPipelineStageFlagBits.html)

* 
[VK_IMAGE_VIEW_CREATE_FRAGMENT_DENSITY_MAP_DEFERRED_BIT_EXT](VkImageViewCreateFlagBits.html)
specifies that the fragment density map will be read by the host during
[vkEndCommandBuffer](vkEndCommandBuffer.html) of the primary command buffer that the render
pass is recorded into

* 
Otherwise the fragment density map will be read by the host during
[vkCmdBeginRenderPass](vkCmdBeginRenderPass.html)

The fragment density map **may** additionally be read by the device during
[VK_PIPELINE_STAGE_FRAGMENT_DENSITY_PROCESS_BIT_EXT](VkPipelineStageFlagBits.html) for any mode.

If this structure is not present, it is as if
`fragmentDensityMapAttachment` was given as [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html).

Valid Usage

* 
[](#VUID-VkRenderPassFragmentDensityMapCreateInfoEXT-fragmentDensityMapAttachment-02548) VUID-VkRenderPassFragmentDensityMapCreateInfoEXT-fragmentDensityMapAttachment-02548

If `fragmentDensityMapAttachment` is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html),
`fragmentDensityMapAttachment` **must** not be an element of
`VkSubpassDescription`::`pInputAttachments`,
`VkSubpassDescription`::`pColorAttachments`,
`VkSubpassDescription`::`pResolveAttachments`,
`VkSubpassDescription`::`pDepthStencilAttachment`, or
`VkSubpassDescription`::`pPreserveAttachments` for any subpass

* 
[](#VUID-VkRenderPassFragmentDensityMapCreateInfoEXT-fragmentDensityMapAttachment-02549) VUID-VkRenderPassFragmentDensityMapCreateInfoEXT-fragmentDensityMapAttachment-02549

If `fragmentDensityMapAttachment` is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html),
`layout` **must** be equal to
[VK_IMAGE_LAYOUT_FRAGMENT_DENSITY_MAP_OPTIMAL_EXT](VkImageLayout.html), or
[VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html)

* 
[](#VUID-VkRenderPassFragmentDensityMapCreateInfoEXT-fragmentDensityMapAttachment-02550) VUID-VkRenderPassFragmentDensityMapCreateInfoEXT-fragmentDensityMapAttachment-02550

If `fragmentDensityMapAttachment` is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html),
`fragmentDensityMapAttachment` **must** reference an attachment with a
`loadOp` equal to [VK_ATTACHMENT_LOAD_OP_LOAD](VkAttachmentLoadOp.html) or
[VK_ATTACHMENT_LOAD_OP_DONT_CARE](VkAttachmentLoadOp.html)

* 
[](#VUID-VkRenderPassFragmentDensityMapCreateInfoEXT-fragmentDensityMapAttachment-02551) VUID-VkRenderPassFragmentDensityMapCreateInfoEXT-fragmentDensityMapAttachment-02551

If `fragmentDensityMapAttachment` is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html),
`fragmentDensityMapAttachment` **must** reference an attachment with a
`storeOp` equal to [VK_ATTACHMENT_STORE_OP_DONT_CARE](VkAttachmentStoreOp.html)

Valid Usage (Implicit)

* 
[](#VUID-VkRenderPassFragmentDensityMapCreateInfoEXT-sType-sType) VUID-VkRenderPassFragmentDensityMapCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDER_PASS_FRAGMENT_DENSITY_MAP_CREATE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkRenderPassFragmentDensityMapCreateInfoEXT-fragmentDensityMapAttachment-parameter) VUID-VkRenderPassFragmentDensityMapCreateInfoEXT-fragmentDensityMapAttachment-parameter

 `fragmentDensityMapAttachment` **must** be a valid [VkAttachmentReference](VkAttachmentReference.html) structure

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkRenderPassCreateInfo](VkRenderPassCreateInfo.html)

* 
[VkRenderPassCreateInfo2](VkRenderPassCreateInfo2.html)

[VK_EXT_fragment_density_map](VK_EXT_fragment_density_map.html), [VkAttachmentReference](VkAttachmentReference.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkRenderPassFragmentDensityMapCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
