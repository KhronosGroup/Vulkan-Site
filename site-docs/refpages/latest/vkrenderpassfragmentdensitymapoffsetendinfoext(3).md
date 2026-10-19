# VkRenderPassFragmentDensityMapOffsetEndInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRenderPassFragmentDensityMapOffsetEndInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRenderPassFragmentDensityMapOffsetEndInfoEXT - Structure specifying fragment density map offset subpass end information

If the [VkSubpassEndInfo](VkSubpassEndInfo.html)::`pNext` chain
or [VkRenderingEndInfoEXT](VkRenderingEndInfoKHR.html)::`pNext` chain
includes a `VkRenderPassFragmentDensityMapOffsetEndInfoEXT` structure,
then that structure includes an array of fragment density map offsets per
layer for the render pass.

The `VkRenderPassFragmentDensityMapOffsetEndInfoEXT` structure is
defined as:

// Provided by VK_EXT_fragment_density_map_offset
typedef struct VkRenderPassFragmentDensityMapOffsetEndInfoEXT {
    VkStructureType      sType;
    const void*          pNext;
    uint32_t             fragmentDensityOffsetCount;
    const VkOffset2D*    pFragmentDensityOffsets;
} VkRenderPassFragmentDensityMapOffsetEndInfoEXT;

// Provided by VK_QCOM_fragment_density_map_offset
// Equivalent to VkRenderPassFragmentDensityMapOffsetEndInfoEXT
typedef VkRenderPassFragmentDensityMapOffsetEndInfoEXT VkSubpassFragmentDensityMapOffsetEndInfoQCOM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`fragmentDensityOffsetCount` is the number of offsets being
specified.

* 
`pFragmentDensityOffsets` is a pointer to an array of
[VkOffset2D](VkOffset2D.html) structs, each of which describes the offset per layer.

The array elements are given per `layer` as defined by
[Fetch Density Value](../../../../spec/latest/chapters/fragmentdensitymapops.html#fragmentdensitymap-fetch-density-value), where
index = layer.
Each (x,y) offset is in framebuffer pixels and shifts the fetch of the
fragment density map by that amount.
Offsets can be positive or negative.

If neither the [VkSubpassEndInfo](VkSubpassEndInfo.html)::`pNext` chain for the last
subpass of a render pass nor the [VkRenderingEndInfoEXT](VkRenderingEndInfoKHR.html)::`pNext`
chain of a dynamic render pass include
`VkRenderPassFragmentDensityMapOffsetEndInfoEXT`, or if
`fragmentDensityOffsetCount` is zero, then the offset (0,0) is
used for [Fetch Density Value](../../../../spec/latest/chapters/fragmentdensitymapops.html#fragmentdensitymap-fetch-density-value).

Valid Usage

* 
[](#VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-fragmentDensityMapOffsets-06503) VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-fragmentDensityMapOffsets-06503

If the [    `fragmentDensityMapOffset`](../../../../spec/latest/chapters/features.html#features-fragmentDensityMapOffset) feature is not enabled or fragment
density map is not enabled in the render pass,
`fragmentDensityOffsetCount` **must** equal `0`

* 
[](#VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-fragmentDensityMapAttachment-06504) VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-fragmentDensityMapAttachment-06504

If
[VkRenderPassFragmentDensityMapCreateInfoEXT](VkRenderPassFragmentDensityMapCreateInfoEXT.html)::`fragmentDensityMapAttachment`
is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html) and was not created with
[VK_IMAGE_CREATE_FRAGMENT_DENSITY_MAP_OFFSET_BIT_EXT](VkImageCreateFlagBits.html),
`fragmentDensityOffsetCount` **must** equal `0`

* 
[](#VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-pDepthStencilAttachment-06505) VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-pDepthStencilAttachment-06505

If the depth or stencil attachments for the render pass are used and
were not created with
[VK_IMAGE_CREATE_FRAGMENT_DENSITY_MAP_OFFSET_BIT_EXT](VkImageCreateFlagBits.html),
`fragmentDensityOffsetCount` **must** equal `0`

* 
[](#VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-pInputAttachments-06506) VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-pInputAttachments-06506

If any used input attachments for the render pass were not created with
[VK_IMAGE_CREATE_FRAGMENT_DENSITY_MAP_OFFSET_BIT_EXT](VkImageCreateFlagBits.html),
`fragmentDensityOffsetCount` **must** equal `0`

* 
[](#VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-pColorAttachments-06507) VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-pColorAttachments-06507

If any used color attachments for the render pass were not created with
[VK_IMAGE_CREATE_FRAGMENT_DENSITY_MAP_OFFSET_BIT_EXT](VkImageCreateFlagBits.html),
`fragmentDensityOffsetCount` **must** equal `0`

* 
[](#VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-pResolveAttachments-06508) VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-pResolveAttachments-06508

If any used resolve attachments for the render pass were not created
with [VK_IMAGE_CREATE_FRAGMENT_DENSITY_MAP_OFFSET_BIT_EXT](VkImageCreateFlagBits.html),
`fragmentDensityOffsetCount` **must** equal `0`

* 
[](#VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-pPreserveAttachments-06509) VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-pPreserveAttachments-06509

If any used preserve attachments for the render pass were not created
with [VK_IMAGE_CREATE_FRAGMENT_DENSITY_MAP_OFFSET_BIT_EXT](VkImageCreateFlagBits.html),
`fragmentDensityOffsetCount` **must** equal `0`

* 
[](#VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-fragmentDensityOffsetCount-06510) VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-fragmentDensityOffsetCount-06510

If `fragmentDensityOffsetCount` is not `0` and multiview is enabled
for the render pass, `fragmentDensityOffsetCount` **must** equal the
`layerCount` that was specified in creating the fragment density map
attachment view

* 
[](#VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-fragmentDensityOffsetCount-06511) VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-fragmentDensityOffsetCount-06511

If `fragmentDensityOffsetCount` is not `0` and multiview is not
enabled for the render pass, `fragmentDensityOffsetCount` **must**
equal `1`

* 
[](#VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-x-06512) VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-x-06512

The `x` component of each element of `pFragmentDensityOffsets`
**must** be an integer multiple of
`fragmentDensityOffsetGranularity.width`

* 
[](#VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-y-06513) VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-y-06513

The `y` component of each element of `pFragmentDensityOffsets`
**must** be an integer multiple of
`fragmentDensityOffsetGranularity.height`

* 
[](#VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-pFragmentDensityOffsets-10730) VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-pFragmentDensityOffsets-10730

Each element of `pFragmentDensityOffsets` **must** be identical for
every [vkCmdEndRendering2KHR](vkCmdEndRendering2KHR.html) call made in a render pass

Valid Usage (Implicit)

* 
[](#VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-sType-sType) VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDER_PASS_FRAGMENT_DENSITY_MAP_OFFSET_END_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-pFragmentDensityOffsets-parameter) VUID-VkRenderPassFragmentDensityMapOffsetEndInfoEXT-pFragmentDensityOffsets-parameter

 If `fragmentDensityOffsetCount` is not `0`, `pFragmentDensityOffsets` **must** be a valid pointer to an array of `fragmentDensityOffsetCount` [VkOffset2D](VkOffset2D.html) structures

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkRenderingEndInfoKHR](VkRenderingEndInfoKHR.html)

* 
[VkSubpassEndInfo](VkSubpassEndInfo.html)

[VK_EXT_fragment_density_map_offset](VK_EXT_fragment_density_map_offset.html), [VK_QCOM_fragment_density_map_offset](VK_QCOM_fragment_density_map_offset.html), [VkOffset2D](VkOffset2D.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkRenderPassFragmentDensityMapOffsetEndInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
