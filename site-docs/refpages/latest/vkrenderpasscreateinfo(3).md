# VkRenderPassCreateInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRenderPassCreateInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRenderPassCreateInfo - Structure specifying parameters of a newly created render pass

The `VkRenderPassCreateInfo` structure is defined as:

|  | This functionality is superseded by [VkRenderPassCreateInfo2](../../../../spec/latest/chapters/renderpass.html#VkRenderPassCreateInfo2). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-renderpass2) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef struct VkRenderPassCreateInfo {
    VkStructureType                   sType;
    const void*                       pNext;
    VkRenderPassCreateFlags           flags;
    uint32_t                          attachmentCount;
    const VkAttachmentDescription*    pAttachments;
    uint32_t                          subpassCount;
    const VkSubpassDescription*       pSubpasses;
    uint32_t                          dependencyCount;
    const VkSubpassDependency*        pDependencies;
} VkRenderPassCreateInfo;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkRenderPassCreateFlagBits](VkRenderPassCreateFlagBits.html)

* 
`attachmentCount` is the number of attachments used by this render
pass.

* 
`pAttachments` is a pointer to an array of `attachmentCount`
[VkAttachmentDescription](VkAttachmentDescription.html) structures describing the attachments used
by the render pass.

* 
`subpassCount` is the number of subpasses to create.

* 
`pSubpasses` is a pointer to an array of `subpassCount`
[VkSubpassDescription](VkSubpassDescription.html) structures describing each subpass.

* 
`dependencyCount` is the number of memory dependencies between pairs
of subpasses.

* 
`pDependencies` is a pointer to an array of `dependencyCount`
[VkSubpassDependency](VkSubpassDependency.html) structures describing dependencies between
pairs of subpasses.

|  | Care should be taken to avoid a data race here; if any subpasses access
| --- | --- |
attachments with overlapping memory locations, and one of those accesses is
a write, a subpass dependency needs to be included between them. |

Valid Usage

* 
[](#VUID-VkRenderPassCreateInfo-attachment-00834) VUID-VkRenderPassCreateInfo-attachment-00834

If the `attachment` member of any element of
`pInputAttachments`, `pColorAttachments`,
`pResolveAttachments` or `pDepthStencilAttachment`, or any
element of `pPreserveAttachments` in any element of `pSubpasses`
is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), then it **must** be less than
`attachmentCount`

* 
[](#VUID-VkRenderPassCreateInfo-fragmentDensityMapAttachment-06471) VUID-VkRenderPassCreateInfo-fragmentDensityMapAttachment-06471

If the pNext chain includes a
[VkRenderPassFragmentDensityMapCreateInfoEXT](VkRenderPassFragmentDensityMapCreateInfoEXT.html) structure and the
`fragmentDensityMapAttachment` member is not
[VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), then `attachment` **must** be less than
`attachmentCount`

* 
[](#VUID-VkRenderPassCreateInfo-fragmentDensityMapLayered-10828) VUID-VkRenderPassCreateInfo-fragmentDensityMapLayered-10828

If the [    `fragmentDensityMapLayered`](../../../../spec/latest/chapters/features.html#features-fragmentDensityMapLayered) feature is not enabled, `flags`
**must** not contain
[VK_RENDER_PASS_CREATE_PER_LAYER_FRAGMENT_DENSITY_BIT_VALVE](VkRenderPassCreateFlagBits.html)

* 
[](#VUID-VkRenderPassCreateInfo-pAttachments-00836) VUID-VkRenderPassCreateInfo-pAttachments-00836

For any member of `pAttachments` with a `loadOp` equal to
[VK_ATTACHMENT_LOAD_OP_CLEAR](VkAttachmentLoadOp.html), the first use of that attachment
**must** not specify a `layout` equal to
[VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html)

* 
[](#VUID-VkRenderPassCreateInfo-pAttachments-02511) VUID-VkRenderPassCreateInfo-pAttachments-02511

For any member of `pAttachments` with a `stencilLoadOp` equal to
[VK_ATTACHMENT_LOAD_OP_CLEAR](VkAttachmentLoadOp.html), the first use of that attachment
**must** not specify a `layout` equal to
[VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html)

* 
[](#VUID-VkRenderPassCreateInfo-pAttachments-01566) VUID-VkRenderPassCreateInfo-pAttachments-01566

For any member of `pAttachments` with a `loadOp` equal to
[VK_ATTACHMENT_LOAD_OP_CLEAR](VkAttachmentLoadOp.html), the first use of that attachment
**must** not specify a `layout` equal to
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html)

* 
[](#VUID-VkRenderPassCreateInfo-pAttachments-01567) VUID-VkRenderPassCreateInfo-pAttachments-01567

For any member of `pAttachments` with a `stencilLoadOp` equal to
[VK_ATTACHMENT_LOAD_OP_CLEAR](VkAttachmentLoadOp.html), the first use of that attachment
**must** not specify a `layout` equal to
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html)

* 
[](#VUID-VkRenderPassCreateInfo-pNext-01926) VUID-VkRenderPassCreateInfo-pNext-01926

If the `pNext` chain includes a
[VkRenderPassInputAttachmentAspectCreateInfo](VkRenderPassInputAttachmentAspectCreateInfo.html) structure, the
`subpass` member of each element of its `pAspectReferences`
member **must** be less than `subpassCount`

* 
[](#VUID-VkRenderPassCreateInfo-pNext-01927) VUID-VkRenderPassCreateInfo-pNext-01927

If the `pNext` chain includes a
[VkRenderPassInputAttachmentAspectCreateInfo](VkRenderPassInputAttachmentAspectCreateInfo.html) structure, the
`inputAttachmentIndex` member of each element of its
`pAspectReferences` member **must** be less than the value of
`inputAttachmentCount` in the element of `pSubpasses` identified
by its `subpass` member

* 
[](#VUID-VkRenderPassCreateInfo-pNext-01963) VUID-VkRenderPassCreateInfo-pNext-01963

If the `pNext` chain includes a
[VkRenderPassInputAttachmentAspectCreateInfo](VkRenderPassInputAttachmentAspectCreateInfo.html) structure, for any
element of the `pInputAttachments` member of any element of
`pSubpasses` where the `attachment` member is not
[VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), the `aspectMask` member of the
corresponding element of
[VkRenderPassInputAttachmentAspectCreateInfo](VkRenderPassInputAttachmentAspectCreateInfo.html)::`pAspectReferences`
**must** only include aspects that are present in images of the format
specified by the element of `pAttachments` at `attachment`

* 
[](#VUID-VkRenderPassCreateInfo-pNext-01928) VUID-VkRenderPassCreateInfo-pNext-01928

If the `pNext` chain includes a
[VkRenderPassMultiviewCreateInfo](VkRenderPassMultiviewCreateInfo.html) structure, and its
`subpassCount` member is not zero, that member **must** be equal to the
value of `subpassCount`

* 
[](#VUID-VkRenderPassCreateInfo-pNext-01929) VUID-VkRenderPassCreateInfo-pNext-01929

If the `pNext` chain includes a
[VkRenderPassMultiviewCreateInfo](VkRenderPassMultiviewCreateInfo.html) structure, if its
`dependencyCount` member is not zero, it **must** be equal to
`dependencyCount`

* 
[](#VUID-VkRenderPassCreateInfo-pNext-01930) VUID-VkRenderPassCreateInfo-pNext-01930

If the `pNext` chain includes a
[VkRenderPassMultiviewCreateInfo](VkRenderPassMultiviewCreateInfo.html) structure, for each non-zero
element of `pViewOffsets`, the `srcSubpass` and `dstSubpass`
members of `pDependencies` at the same index **must** not be equal

* 
[](#VUID-VkRenderPassCreateInfo-pNext-02512) VUID-VkRenderPassCreateInfo-pNext-02512

If the `pNext` chain includes a
[VkRenderPassMultiviewCreateInfo](VkRenderPassMultiviewCreateInfo.html) structure, for each element of
`pDependencies` with a `dependencyFlags` member that does not
include [VK_DEPENDENCY_VIEW_LOCAL_BIT](VkDependencyFlagBits.html), the corresponding element of
the `pViewOffsets` member of that
[VkRenderPassMultiviewCreateInfo](VkRenderPassMultiviewCreateInfo.html) instance **must** be `0`

* 
[](#VUID-VkRenderPassCreateInfo-pNext-02513) VUID-VkRenderPassCreateInfo-pNext-02513

If the `pNext` chain includes a
[VkRenderPassMultiviewCreateInfo](VkRenderPassMultiviewCreateInfo.html) structure, elements of its
`pViewMasks` member **must** either all be `0`, or all not be `0`

* 
[](#VUID-VkRenderPassCreateInfo-pNext-02514) VUID-VkRenderPassCreateInfo-pNext-02514

If the `pNext` chain includes a
[VkRenderPassMultiviewCreateInfo](VkRenderPassMultiviewCreateInfo.html) structure, and each element of its
`pViewMasks` member is `0`, the `dependencyFlags` member of each
element of `pDependencies` **must** not include
[VK_DEPENDENCY_VIEW_LOCAL_BIT](VkDependencyFlagBits.html)

* 
[](#VUID-VkRenderPassCreateInfo-pNext-02515) VUID-VkRenderPassCreateInfo-pNext-02515

If the `pNext` chain includes a
[VkRenderPassMultiviewCreateInfo](VkRenderPassMultiviewCreateInfo.html) structure, and each element of its
`pViewMasks` member is `0`, its `correlationMaskCount` member
**must** be `0`

* 
[](#VUID-VkRenderPassCreateInfo-pDependencies-00837) VUID-VkRenderPassCreateInfo-pDependencies-00837

For each element of `pDependencies`, if the `srcSubpass` is not
[VK_SUBPASS_EXTERNAL](VK_SUBPASS_EXTERNAL.html), all stage flags included in the
`srcStageMask` member of that dependency **must** be
[VK_PIPELINE_STAGE_ALL_COMMANDS_BIT](VkPipelineStageFlagBits.html) or a pipeline stage supported
by the [pipeline](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages-types) identified by
the `pipelineBindPoint` member of the source subpass

* 
[](#VUID-VkRenderPassCreateInfo-pDependencies-00838) VUID-VkRenderPassCreateInfo-pDependencies-00838

For each element of `pDependencies`, if the `dstSubpass` is not
[VK_SUBPASS_EXTERNAL](VK_SUBPASS_EXTERNAL.html), all stage flags included in the
`dstStageMask` member of that dependency **must** be
[VK_PIPELINE_STAGE_ALL_COMMANDS_BIT](VkPipelineStageFlagBits.html) or a pipeline stage supported
by the [pipeline](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages-types) identified by
the `pipelineBindPoint` member of the destination subpass

* 
[](#VUID-VkRenderPassCreateInfo-pDependencies-06866) VUID-VkRenderPassCreateInfo-pDependencies-06866

For each element of `pDependencies`, if its `srcSubpass` is not
[VK_SUBPASS_EXTERNAL](VK_SUBPASS_EXTERNAL.html), it **must** be less than `subpassCount`

* 
[](#VUID-VkRenderPassCreateInfo-pDependencies-06867) VUID-VkRenderPassCreateInfo-pDependencies-06867

For each element of `pDependencies`, if its `dstSubpass` is not
[VK_SUBPASS_EXTERNAL](VK_SUBPASS_EXTERNAL.html), it **must** be less than `subpassCount`

* 
[](#VUID-VkRenderPassCreateInfo-pResolveAttachments-10647) VUID-VkRenderPassCreateInfo-pResolveAttachments-10647

If any element of `pResolveAttachments` of any element of
`pSubpasses` references an attachment description with a format of
[VK_FORMAT_UNDEFINED](VkFormat.html),
[VK_TILE_SHADING_RENDER_PASS_ENABLE_BIT_QCOM](VkTileShadingRenderPassFlagBitsQCOM.html) **must** not be included
in [VkRenderPassTileShadingCreateInfoQCOM](VkRenderPassTileShadingCreateInfoQCOM.html)::`flags`

* 
[](#VUID-VkRenderPassCreateInfo-fragmentDensityMapAttachment-10648) VUID-VkRenderPassCreateInfo-fragmentDensityMapAttachment-10648

If
[VkRenderPassFragmentDensityMapCreateInfoEXT](VkRenderPassFragmentDensityMapCreateInfoEXT.html)::`fragmentDensityMapAttachment`
is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html),
[VK_TILE_SHADING_RENDER_PASS_ENABLE_BIT_QCOM](VkTileShadingRenderPassFlagBitsQCOM.html) **must** not be included
in [VkRenderPassTileShadingCreateInfoQCOM](VkRenderPassTileShadingCreateInfoQCOM.html)::`flags`

* 
[](#VUID-VkRenderPassCreateInfo-None-10915) VUID-VkRenderPassCreateInfo-None-10915

If any subpass preserves an attachment, there **must** be a subpass
dependency from a prior subpass which uses or preserves that attachment

Valid Usage (Implicit)

* 
[](#VUID-VkRenderPassCreateInfo-sType-sType) VUID-VkRenderPassCreateInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDER_PASS_CREATE_INFO](VkStructureType.html)

* 
[](#VUID-VkRenderPassCreateInfo-pNext-pNext) VUID-VkRenderPassCreateInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkRenderPassFragmentDensityMapCreateInfoEXT](VkRenderPassFragmentDensityMapCreateInfoEXT.html), [VkRenderPassInputAttachmentAspectCreateInfo](VkRenderPassInputAttachmentAspectCreateInfo.html), [VkRenderPassMultiviewCreateInfo](VkRenderPassMultiviewCreateInfo.html), [VkRenderPassTileShadingCreateInfoQCOM](VkRenderPassTileShadingCreateInfoQCOM.html), or [VkTileMemorySizeInfoQCOM](VkTileMemorySizeInfoQCOM.html)

* 
[](#VUID-VkRenderPassCreateInfo-sType-unique) VUID-VkRenderPassCreateInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkRenderPassCreateInfo-flags-parameter) VUID-VkRenderPassCreateInfo-flags-parameter

 `flags` **must** be a valid combination of [VkRenderPassCreateFlagBits](VkRenderPassCreateFlagBits.html) values

* 
[](#VUID-VkRenderPassCreateInfo-pAttachments-parameter) VUID-VkRenderPassCreateInfo-pAttachments-parameter

 If `attachmentCount` is not `0`, `pAttachments` **must** be a valid pointer to an array of `attachmentCount` valid [VkAttachmentDescription](VkAttachmentDescription.html) structures

* 
[](#VUID-VkRenderPassCreateInfo-pSubpasses-parameter) VUID-VkRenderPassCreateInfo-pSubpasses-parameter

 `pSubpasses` **must** be a valid pointer to an array of `subpassCount` valid [VkSubpassDescription](VkSubpassDescription.html) structures

* 
[](#VUID-VkRenderPassCreateInfo-pDependencies-parameter) VUID-VkRenderPassCreateInfo-pDependencies-parameter

 If `dependencyCount` is not `0`, `pDependencies` **must** be a valid pointer to an array of `dependencyCount` valid [VkSubpassDependency](VkSubpassDependency.html) structures

* 
[](#VUID-VkRenderPassCreateInfo-subpassCount-arraylength) VUID-VkRenderPassCreateInfo-subpassCount-arraylength

 `subpassCount` **must** be greater than `0`

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAttachmentDescription](VkAttachmentDescription.html), [VkRenderPassCreateFlags](VkRenderPassCreateFlags.html), [VkStructureType](VkStructureType.html), [VkSubpassDependency](VkSubpassDependency.html), [VkSubpassDescription](VkSubpassDescription.html), [vkCreateRenderPass](vkCreateRenderPass.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkRenderPassCreateInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
