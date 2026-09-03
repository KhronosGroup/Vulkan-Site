# VkRenderPassCreateInfo2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRenderPassCreateInfo2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRenderPassCreateInfo2 - Structure specifying parameters of a newly created render pass

The `VkRenderPassCreateInfo2` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_2
typedef struct VkRenderPassCreateInfo2 {
    VkStructureType                    sType;
    const void*                        pNext;
    VkRenderPassCreateFlags            flags;
    uint32_t                           attachmentCount;
    const VkAttachmentDescription2*    pAttachments;
    uint32_t                           subpassCount;
    const VkSubpassDescription2*       pSubpasses;
    uint32_t                           dependencyCount;
    const VkSubpassDependency2*        pDependencies;
    uint32_t                           correlatedViewMaskCount;
    const uint32_t*                    pCorrelatedViewMasks;
} VkRenderPassCreateInfo2;

// Provided by VK_KHR_create_renderpass2
// Equivalent to VkRenderPassCreateInfo2
typedef VkRenderPassCreateInfo2 VkRenderPassCreateInfo2KHR;

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
[VkAttachmentDescription2](VkAttachmentDescription2.html) structures describing the attachments
used by the render pass.

* 
`subpassCount` is the number of subpasses to create.

* 
`pSubpasses` is a pointer to an array of `subpassCount`
[VkSubpassDescription2](VkSubpassDescription2.html) structures describing each subpass.

* 
`dependencyCount` is the number of dependencies between pairs of
subpasses.

* 
`pDependencies` is a pointer to an array of `dependencyCount`
[VkSubpassDependency2](VkSubpassDependency2.html) structures describing dependencies between
pairs of subpasses.

* 
`correlatedViewMaskCount` is the number of correlation masks.

* 
`pCorrelatedViewMasks` is a pointer to an array of view masks
indicating sets of views that **may** be more efficient to render
concurrently.

Parameters defined by this structure with the same name as those in
[VkRenderPassCreateInfo](VkRenderPassCreateInfo.html) have the identical effect to those parameters;
the child structures are variants of those used in
[VkRenderPassCreateInfo](VkRenderPassCreateInfo.html) which add `sType` and `pNext`
parameters, allowing them to be extended.

If the [VkSubpassDescription2](VkSubpassDescription2.html)::`viewMask` member of any element of
`pSubpasses` is not zero, *multiview* functionality is considered to be
enabled for this render pass.

`correlatedViewMaskCount` and `pCorrelatedViewMasks` have the same
effect as [VkRenderPassMultiviewCreateInfo](VkRenderPassMultiviewCreateInfo.html)::`correlationMaskCount`
and [VkRenderPassMultiviewCreateInfo](VkRenderPassMultiviewCreateInfo.html)::`pCorrelationMasks`,
respectively.

Valid Usage

* 
[](#VUID-VkRenderPassCreateInfo2-None-03049) VUID-VkRenderPassCreateInfo2-None-03049

If any two subpasses operate on attachments with overlapping ranges of
the same `VkDeviceMemory` object, and at least one subpass writes to
that area of `VkDeviceMemory`, a subpass dependency **must** be
included (either directly or via some intermediate subpasses) between
them

* 
[](#VUID-VkRenderPassCreateInfo2-attachment-03050) VUID-VkRenderPassCreateInfo2-attachment-03050

If the `attachment` member of any element of
`pInputAttachments`, `pColorAttachments`,
`pResolveAttachments` or `pDepthStencilAttachment`, or the
attachment indexed by any element of `pPreserveAttachments` in any
element of `pSubpasses` is bound to a range of a
`VkDeviceMemory` object that overlaps with any other attachment in
any subpass (including the same subpass), the
`VkAttachmentDescription2` structures describing them **must** include
[VK_ATTACHMENT_DESCRIPTION_MAY_ALIAS_BIT](VkAttachmentDescriptionFlagBits.html) in `flags`

* 
[](#VUID-VkRenderPassCreateInfo2-attachment-03051) VUID-VkRenderPassCreateInfo2-attachment-03051

If the `attachment` member of any element of
`pInputAttachments`, `pColorAttachments`,
`pResolveAttachments` or `pDepthStencilAttachment`, or any
element of `pPreserveAttachments` in any element of `pSubpasses`
is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), then it **must** be less than
`attachmentCount`

* 
[](#VUID-VkRenderPassCreateInfo2-fragmentDensityMapAttachment-06472) VUID-VkRenderPassCreateInfo2-fragmentDensityMapAttachment-06472

If the pNext chain includes a
[VkRenderPassFragmentDensityMapCreateInfoEXT](VkRenderPassFragmentDensityMapCreateInfoEXT.html) structure and the
`fragmentDensityMapAttachment` member is not
[VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), then `attachment` **must** be less than
`attachmentCount`

* 
[](#VUID-VkRenderPassCreateInfo2-fragmentDensityMapLayered-10829) VUID-VkRenderPassCreateInfo2-fragmentDensityMapLayered-10829

If the [    `fragmentDensityMapLayered`](../../../../spec/latest/chapters/features.html#features-fragmentDensityMapLayered) feature is not enabled, `flags`
**must** not contain
[VK_RENDER_PASS_CREATE_PER_LAYER_FRAGMENT_DENSITY_BIT_VALVE](VkRenderPassCreateFlagBits.html)

* 
[](#VUID-VkRenderPassCreateInfo2-pSubpasses-06473) VUID-VkRenderPassCreateInfo2-pSubpasses-06473

If the `pSubpasses` pNext chain includes a
[VkSubpassDescriptionDepthStencilResolve](VkSubpassDescriptionDepthStencilResolve.html) structure and the
`pDepthStencilResolveAttachment` member is not `NULL` and does not
have the value [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), then `attachment` **must**
be less than `attachmentCount`

* 
[](#VUID-VkRenderPassCreateInfo2-pAttachments-02522) VUID-VkRenderPassCreateInfo2-pAttachments-02522

For any member of `pAttachments` with a `loadOp` equal to
[VK_ATTACHMENT_LOAD_OP_CLEAR](VkAttachmentLoadOp.html), the first use of that attachment
**must** not specify a `layout` equal to
[VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html), or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html)

* 
[](#VUID-VkRenderPassCreateInfo2-pAttachments-02523) VUID-VkRenderPassCreateInfo2-pAttachments-02523

For any member of `pAttachments` with a `stencilLoadOp` equal to
[VK_ATTACHMENT_LOAD_OP_CLEAR](VkAttachmentLoadOp.html), the first use of that attachment
**must** not specify a `layout` equal to
[VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html), or
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html)

* 
[](#VUID-VkRenderPassCreateInfo2-pDependencies-03054) VUID-VkRenderPassCreateInfo2-pDependencies-03054

For each element of `pDependencies`, if the `srcSubpass` is not
[VK_SUBPASS_EXTERNAL](VK_SUBPASS_EXTERNAL.html), all stage flags included in the
`srcStageMask` member of that dependency **must** be
[VK_PIPELINE_STAGE_ALL_COMMANDS_BIT](VkPipelineStageFlagBits.html) or a pipeline stage supported
by the [pipeline](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages-types) identified by
the `pipelineBindPoint` member of the source subpass

* 
[](#VUID-VkRenderPassCreateInfo2-pDependencies-03055) VUID-VkRenderPassCreateInfo2-pDependencies-03055

For each element of `pDependencies`, if the `dstSubpass` is not
[VK_SUBPASS_EXTERNAL](VK_SUBPASS_EXTERNAL.html), all stage flags included in the
`dstStageMask` member of that dependency **must** be
[VK_PIPELINE_STAGE_ALL_COMMANDS_BIT](VkPipelineStageFlagBits.html) or a pipeline stage supported
by the [pipeline](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages-types) identified by
the `pipelineBindPoint` member of the destination subpass

* 
[](#VUID-VkRenderPassCreateInfo2-pCorrelatedViewMasks-03056) VUID-VkRenderPassCreateInfo2-pCorrelatedViewMasks-03056

The set of bits included in any element of `pCorrelatedViewMasks`
**must** not overlap with the set of bits included in any other element of
`pCorrelatedViewMasks`

* 
[](#VUID-VkRenderPassCreateInfo2-viewMask-03057) VUID-VkRenderPassCreateInfo2-viewMask-03057

If the [VkSubpassDescription2](VkSubpassDescription2.html)::`viewMask` member of all
elements of `pSubpasses` is `0`, `correlatedViewMaskCount` **must**
be `0`

* 
[](#VUID-VkRenderPassCreateInfo2-viewMask-03058) VUID-VkRenderPassCreateInfo2-viewMask-03058

The [VkSubpassDescription2](VkSubpassDescription2.html)::`viewMask` member of all elements
of `pSubpasses` **must** either all be `0`, or all not be `0`

* 
[](#VUID-VkRenderPassCreateInfo2-viewMask-03059) VUID-VkRenderPassCreateInfo2-viewMask-03059

If the [VkSubpassDescription2](VkSubpassDescription2.html)::`viewMask` member of all
elements of `pSubpasses` is `0`, the `dependencyFlags` member of
any element of `pDependencies` **must** not include
[VK_DEPENDENCY_VIEW_LOCAL_BIT](VkDependencyFlagBits.html)

* 
[](#VUID-VkRenderPassCreateInfo2-pDependencies-03060) VUID-VkRenderPassCreateInfo2-pDependencies-03060

For each element of `pDependencies` where its `srcSubpass`
member equals its `dstSubpass` member, if the `viewMask` member
of the corresponding element of `pSubpasses` includes more than one
bit, its `dependencyFlags` member **must** include
[VK_DEPENDENCY_VIEW_LOCAL_BIT](VkDependencyFlagBits.html)

* 
[](#VUID-VkRenderPassCreateInfo2-attachment-02525) VUID-VkRenderPassCreateInfo2-attachment-02525

If the `attachment` member of any element of the
`pInputAttachments` member of any element of `pSubpasses` is not
[VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), the `aspectMask` member of that element
of `pInputAttachments` **must** only include aspects that are present
in images of the format specified by the element of `pAttachments`
specified by `attachment`

* 
[](#VUID-VkRenderPassCreateInfo2-srcSubpass-02526) VUID-VkRenderPassCreateInfo2-srcSubpass-02526

The `srcSubpass` member of each element of `pDependencies` **must**
be less than `subpassCount`

* 
[](#VUID-VkRenderPassCreateInfo2-dstSubpass-02527) VUID-VkRenderPassCreateInfo2-dstSubpass-02527

The `dstSubpass` member of each element of `pDependencies` **must**
be less than `subpassCount`

* 
[](#VUID-VkRenderPassCreateInfo2-pAttachments-04585) VUID-VkRenderPassCreateInfo2-pAttachments-04585

If any element of `pAttachments` is used as a fragment shading rate
attachment in any subpass, it **must** not be used as any other attachment
in the render pass

* 
[](#VUID-VkRenderPassCreateInfo2-pAttachments-09387) VUID-VkRenderPassCreateInfo2-pAttachments-09387

If any element of `pAttachments` is used as a fragment shading rate
attachment, the `loadOp` for that attachment **must** not be
[VK_ATTACHMENT_LOAD_OP_CLEAR](VkAttachmentLoadOp.html)

* 
[](#VUID-VkRenderPassCreateInfo2-flags-04521) VUID-VkRenderPassCreateInfo2-flags-04521

If `flags` includes [VK_RENDER_PASS_CREATE_TRANSFORM_BIT_QCOM](VkRenderPassCreateFlagBits.html),
an element of `pSubpasses` includes an instance of
[VkFragmentShadingRateAttachmentInfoKHR](VkFragmentShadingRateAttachmentInfoKHR.html) in its `pNext` chain,
and the `pFragmentShadingRateAttachment` member of that structure is
not equal to `NULL`, the `attachment` member of
`pFragmentShadingRateAttachment` **must** be [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html)

* 
[](#VUID-VkRenderPassCreateInfo2-pAttachments-04586) VUID-VkRenderPassCreateInfo2-pAttachments-04586

If any element of `pAttachments` is used as a fragment shading rate
attachment in any subpass, it **must** have an image format whose
[potential format features](../../../../spec/latest/chapters/formats.html#potential-format-features) contain
[VK_FORMAT_FEATURE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkFormatFeatureFlagBits.html)

* 
[](#VUID-VkRenderPassCreateInfo2-attachment-06244) VUID-VkRenderPassCreateInfo2-attachment-06244

If the `attachment` member of the `pDepthStencilAttachment`
member of an element of `pSubpasses` is not
[VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), the `layout` member of that same
structure is either [VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](VkImageLayout.html), and the `pNext` chain
of that structure does not include a
[VkAttachmentReferenceStencilLayout](VkAttachmentReferenceStencilLayout.html) structure, then the element of
`pAttachments` with an index equal to `attachment` **must** not
have a `format` that includes both depth and stencil components

* 
[](#VUID-VkRenderPassCreateInfo2-attachment-06245) VUID-VkRenderPassCreateInfo2-attachment-06245

If the `attachment` member of the `pDepthStencilAttachment`
member of an element of `pSubpasses` is not
[VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html) and the `layout` member of that same
structure is either [VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html), then the element of
`pAttachments` with an index equal to `attachment` **must** have a
`format` that includes only a stencil component

* 
[](#VUID-VkRenderPassCreateInfo2-attachment-06246) VUID-VkRenderPassCreateInfo2-attachment-06246

If the `attachment` member of the `pDepthStencilAttachment`
member of an element of `pSubpasses` is not
[VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html) and the `layout` member of that same
structure is either [VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](VkImageLayout.html), then the element of
`pAttachments` with an index equal to `attachment` **must** not
have a `format` that includes only a stencil component

* 
[](#VUID-VkRenderPassCreateInfo2-pResolveAttachments-09331) VUID-VkRenderPassCreateInfo2-pResolveAttachments-09331

If any element of `pResolveAttachments` of any element of
`pSubpasses` references an attachment description with a format of
[VK_FORMAT_UNDEFINED](VkFormat.html),
[VkRenderPassFragmentDensityMapCreateInfoEXT](VkRenderPassFragmentDensityMapCreateInfoEXT.html)::`fragmentDensityMapAttachment->attachment`
**must** be [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html)

* 
[](#VUID-VkRenderPassCreateInfo2-pResolveAttachments-10650) VUID-VkRenderPassCreateInfo2-pResolveAttachments-10650

If any element of `pResolveAttachments` of any element of
`pSubpasses` references an attachment description with a format of
[VK_FORMAT_UNDEFINED](VkFormat.html),
[VK_TILE_SHADING_RENDER_PASS_ENABLE_BIT_QCOM](VkTileShadingRenderPassFlagBitsQCOM.html) **must** not be included
in [VkRenderPassTileShadingCreateInfoQCOM](VkRenderPassTileShadingCreateInfoQCOM.html)::`flags`

* 
[](#VUID-VkRenderPassCreateInfo2-fragmentDensityMapAttachment-10651) VUID-VkRenderPassCreateInfo2-fragmentDensityMapAttachment-10651

If
[VkRenderPassFragmentDensityMapCreateInfoEXT](VkRenderPassFragmentDensityMapCreateInfoEXT.html)::`fragmentDensityMapAttachment`
is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html),
[VK_TILE_SHADING_RENDER_PASS_ENABLE_BIT_QCOM](VkTileShadingRenderPassFlagBitsQCOM.html) **must** not be included
in [VkRenderPassTileShadingCreateInfoQCOM](VkRenderPassTileShadingCreateInfoQCOM.html)::`flags`

* 
[](#VUID-VkRenderPassCreateInfo2-None-10916) VUID-VkRenderPassCreateInfo2-None-10916

If any subpass preserves an attachment, there **must** be a subpass
dependency from a prior subpass which uses or preserves that attachment

Valid Usage (Implicit)

* 
[](#VUID-VkRenderPassCreateInfo2-sType-sType) VUID-VkRenderPassCreateInfo2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDER_PASS_CREATE_INFO_2](VkStructureType.html)

* 
[](#VUID-VkRenderPassCreateInfo2-pNext-pNext) VUID-VkRenderPassCreateInfo2-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkRenderPassCreationControlEXT](VkRenderPassCreationControlEXT.html), [VkRenderPassCreationFeedbackCreateInfoEXT](VkRenderPassCreationFeedbackCreateInfoEXT.html), [VkRenderPassFragmentDensityMapCreateInfoEXT](VkRenderPassFragmentDensityMapCreateInfoEXT.html), [VkRenderPassTileShadingCreateInfoQCOM](VkRenderPassTileShadingCreateInfoQCOM.html), or [VkTileMemorySizeInfoQCOM](VkTileMemorySizeInfoQCOM.html)

* 
[](#VUID-VkRenderPassCreateInfo2-sType-unique) VUID-VkRenderPassCreateInfo2-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkRenderPassCreateInfo2-flags-parameter) VUID-VkRenderPassCreateInfo2-flags-parameter

 `flags` **must** be a valid combination of [VkRenderPassCreateFlagBits](VkRenderPassCreateFlagBits.html) values

* 
[](#VUID-VkRenderPassCreateInfo2-pAttachments-parameter) VUID-VkRenderPassCreateInfo2-pAttachments-parameter

 If `attachmentCount` is not `0`, `pAttachments` **must** be a valid pointer to an array of `attachmentCount` valid [VkAttachmentDescription2](VkAttachmentDescription2.html) structures

* 
[](#VUID-VkRenderPassCreateInfo2-pSubpasses-parameter) VUID-VkRenderPassCreateInfo2-pSubpasses-parameter

 `pSubpasses` **must** be a valid pointer to an array of `subpassCount` valid [VkSubpassDescription2](VkSubpassDescription2.html) structures

* 
[](#VUID-VkRenderPassCreateInfo2-pDependencies-parameter) VUID-VkRenderPassCreateInfo2-pDependencies-parameter

 If `dependencyCount` is not `0`, `pDependencies` **must** be a valid pointer to an array of `dependencyCount` valid [VkSubpassDependency2](VkSubpassDependency2.html) structures

* 
[](#VUID-VkRenderPassCreateInfo2-pCorrelatedViewMasks-parameter) VUID-VkRenderPassCreateInfo2-pCorrelatedViewMasks-parameter

 If `correlatedViewMaskCount` is not `0`, `pCorrelatedViewMasks` **must** be a valid pointer to an array of `correlatedViewMaskCount` `uint32_t` values

* 
[](#VUID-VkRenderPassCreateInfo2-subpassCount-arraylength) VUID-VkRenderPassCreateInfo2-subpassCount-arraylength

 `subpassCount` **must** be greater than `0`

[VK_KHR_create_renderpass2](VK_KHR_create_renderpass2.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkAttachmentDescription2](VkAttachmentDescription2.html), [VkRenderPassCreateFlags](VkRenderPassCreateFlags.html), [VkStructureType](VkStructureType.html), [VkSubpassDependency2](VkSubpassDependency2.html), [VkSubpassDescription2](VkSubpassDescription2.html), [vkCreateRenderPass2](vkCreateRenderPass2.html), [vkCreateRenderPass2](vkCreateRenderPass2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkRenderPassCreateInfo2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
