# VkSubpassDescription2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSubpassDescription2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSubpassDescription2 - Structure specifying a subpass description

The `VkSubpassDescription2` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_2
typedef struct VkSubpassDescription2 {
    VkStructureType                  sType;
    const void*                      pNext;
    VkSubpassDescriptionFlags        flags;
    VkPipelineBindPoint              pipelineBindPoint;
    uint32_t                         viewMask;
    uint32_t                         inputAttachmentCount;
    const VkAttachmentReference2*    pInputAttachments;
    uint32_t                         colorAttachmentCount;
    const VkAttachmentReference2*    pColorAttachments;
    const VkAttachmentReference2*    pResolveAttachments;
    const VkAttachmentReference2*    pDepthStencilAttachment;
    uint32_t                         preserveAttachmentCount;
    const uint32_t*                  pPreserveAttachments;
} VkSubpassDescription2;

// Provided by VK_KHR_create_renderpass2
// Equivalent to VkSubpassDescription2
typedef VkSubpassDescription2 VkSubpassDescription2KHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkSubpassDescriptionFlagBits](VkSubpassDescriptionFlagBits.html)
specifying usage of the subpass.

* 
`pipelineBindPoint` is a [VkPipelineBindPoint](VkPipelineBindPoint.html) value specifying
the pipeline type supported for this subpass.

* 
`viewMask` is a bitfield of view indices describing which views
rendering is broadcast to in this subpass, when multiview is enabled.

* 
`inputAttachmentCount` is the number of input attachments.

* 
`pInputAttachments` is a pointer to an array of
[VkAttachmentReference2](VkAttachmentReference2.html) structures defining the input attachments
for this subpass and their layouts.

* 
`colorAttachmentCount` is the number of color attachments.

* 
`pColorAttachments` is a pointer to an array of
`colorAttachmentCount` [VkAttachmentReference2](VkAttachmentReference2.html) structures
defining the color attachments for this subpass and their layouts.

* 
`pResolveAttachments` is `NULL` or a pointer to an array of
`colorAttachmentCount` [VkAttachmentReference2](VkAttachmentReference2.html) structures
defining the resolve attachments for this subpass and their layouts.

* 
`pDepthStencilAttachment` is a pointer to a
[VkAttachmentReference2](VkAttachmentReference2.html) structure specifying the depth/stencil
attachment for this subpass and its layout.

* 
`preserveAttachmentCount` is the number of preserved attachments.

* 
`pPreserveAttachments` is a pointer to an array of
`preserveAttachmentCount` render pass attachment indices identifying
attachments that are not used by this subpass, but whose contents **must**
be preserved throughout the subpass.

Parameters defined by this structure with the same name as those in
[VkSubpassDescription](VkSubpassDescription.html) have the identical effect to those parameters.

`viewMask` has the same effect for the described subpass as
[VkRenderPassMultiviewCreateInfo](VkRenderPassMultiviewCreateInfo.html)::`pViewMasks` has on each
corresponding subpass.

If a [VkFragmentShadingRateAttachmentInfoKHR](VkFragmentShadingRateAttachmentInfoKHR.html) structure is included in
the `pNext` chain, `pFragmentShadingRateAttachment` is not `NULL`,
and its `attachment` member is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), the
identified attachment defines a fragment shading rate attachment for that
subpass.

If any element of `pResolveAttachments` is an image specified with an
[VkExternalFormatANDROID](VkExternalFormatANDROID.html), values in the corresponding color attachment
will be resolved to the resolve attachment in the same manner as specified
for [](../../../../spec/latest/chapters/renderpass.html#VkResolveModeFlagBits)[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](VkResolveModeFlagBits.html).

If the [`nullColorAttachmentWithExternalFormatResolve`](../../../../spec/latest/chapters/limits.html#limits-nullColorAttachmentWithExternalFormatResolve) limit is [VK_TRUE](VK_TRUE.html),
values in the color attachment will be loaded from the resolve attachment at
the start of rendering, and **may** also be reloaded any time after a resolve
occurs or the resolve attachment is written to; if this occurs it **must**
happen-before any writes to the color attachment are performed which
happen-after the resolve that triggers this.
If any color component in the external format is subsampled, values will be
read from the nearest sample in the image when they are loaded.
If the color attachment is also used as an input attachment, the same
behavior applies.

Setting the color attachment to [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html) when an external
resolve attachment is used and the
[`nullColorAttachmentWithExternalFormatResolve`](../../../../spec/latest/chapters/limits.html#limits-nullColorAttachmentWithExternalFormatResolve) limit is [VK_TRUE](VK_TRUE.html)
will not result in color attachment writes to be discarded for that
attachment.

When [`nullColorAttachmentWithExternalFormatResolve`](../../../../spec/latest/chapters/limits.html#limits-nullColorAttachmentWithExternalFormatResolve) is [VK_TRUE](VK_TRUE.html), the
color output from the subpass can still be read via an input attachment; but
the application cannot bind an image view for the color attachment as there
is no such image view bound.
Instead to access the data as an input attachment applications **can** use the
resolve attachment in its place - using the resolve attachment image for the
descriptor, and setting the corresponding element of `pInputAttachments`
to the index of the resolve attachment.

Loads or input attachment reads from the resolve attachment are performed as
if using a [VkSamplerYcbcrConversionCreateInfo](VkSamplerYcbcrConversionCreateInfo.html) with the following
parameters:

VkSamplerYcbcrConversionCreateInfo createInfo = {
    .sType = VK_STRUCTURE_TYPE_SAMPLER_YCBCR_CONVERSION_CREATE_INFO,
    .pNext = NULL,
    .format = VK_FORMAT_UNDEFINED,
    .ycbcrModel = VK_SAMPLER_YCBCR_MODEL_CONVERSION_RGB_IDENTITY,
    .ycbcrRange = VK_SAMPLER_YCBCR_RANGE_ITU_FULL,
    .components = {
        .r = VK_COMPONENT_SWIZZLE_B
        .g = VK_COMPONENT_SWIZZLE_R
        .b = VK_COMPONENT_SWIZZLE_G
        .a = VK_COMPONENT_SWIZZLE_IDENTITY},
    .xChromaOffset = properties.chromaOffsetX,
    .yChromaOffset = properties.chromaOffsetY,
    .chromaFilter = VK_FILTER_NEAREST,
    .forceExplicitReconstruction = ... };

where `properties` is equal to
[VkPhysicalDeviceExternalFormatResolvePropertiesANDROID](VkPhysicalDeviceExternalFormatResolvePropertiesANDROID.html) returned by the
device and `forceExplicitReconstruction` is effectively ignored as the
[VK_SAMPLER_YCBCR_MODEL_CONVERSION_RGB_IDENTITY](VkSamplerYcbcrModelConversion.html) model is used.
The applied swizzle is the same effective swizzle that would be applied by
the [VK_SAMPLER_YCBCR_MODEL_CONVERSION_YCBCR_IDENTITY](VkSamplerYcbcrModelConversion.html) model, but no
range expansion is applied.

Valid Usage

* 
[](#VUID-VkSubpassDescription2-attachment-06912) VUID-VkSubpassDescription2-attachment-06912

If the `attachment` member of an element of `pInputAttachments`
is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), its `layout` member **must** not be
[VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html)

* 
[](#VUID-VkSubpassDescription2-attachment-06913) VUID-VkSubpassDescription2-attachment-06913

If the `attachment` member of an element of `pColorAttachments`
is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), its `layout` member **must** not be
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](VkImageLayout.html)

* 
[](#VUID-VkSubpassDescription2-attachment-06914) VUID-VkSubpassDescription2-attachment-06914

If the `attachment` member of an element of
`pResolveAttachments` is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), its
`layout` member **must** not be
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](VkImageLayout.html)

* 
[](#VUID-VkSubpassDescription2-attachment-06915) VUID-VkSubpassDescription2-attachment-06915

If the `attachment` member of `pDepthStencilAttachment` is not
[VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), its `layout` member **must** not be
[VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](VkImageLayout.html)

* 
[](#VUID-VkSubpassDescription2-attachment-06916) VUID-VkSubpassDescription2-attachment-06916

If the `attachment` member of an element of `pColorAttachments`
is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), its `layout` member **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html)

* 
[](#VUID-VkSubpassDescription2-attachment-06917) VUID-VkSubpassDescription2-attachment-06917

If the `attachment` member of an element of
`pResolveAttachments` is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), its
`layout` member **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html)

* 
[](#VUID-VkSubpassDescription2-attachment-06918) VUID-VkSubpassDescription2-attachment-06918

If the `attachment` member of an element of `pInputAttachments`
is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), its `layout` member **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html)

* 
[](#VUID-VkSubpassDescription2-attachment-06919) VUID-VkSubpassDescription2-attachment-06919

If the `attachment` member of an element of `pColorAttachments`
is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), its `layout` member **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html), or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html)

* 
[](#VUID-VkSubpassDescription2-attachment-06920) VUID-VkSubpassDescription2-attachment-06920

If the `attachment` member of an element of
`pResolveAttachments` is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), its
`layout` member **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html), or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html)

* 
[](#VUID-VkSubpassDescription2-attachment-06921) VUID-VkSubpassDescription2-attachment-06921

If the `attachment` member of an element of `pInputAttachments`
is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), its `layout` member **must** not be
[VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL_KHR](VkImageLayout.html)

* 
[](#VUID-VkSubpassDescription2-attachment-06922) VUID-VkSubpassDescription2-attachment-06922

If the `attachment` member of an element of `pColorAttachments`
is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), its `layout` member **must** not be
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL_KHR](VkImageLayout.html)

* 
[](#VUID-VkSubpassDescription2-attachment-06923) VUID-VkSubpassDescription2-attachment-06923

If the `attachment` member of an element of
`pResolveAttachments` is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), its
`layout` member **must** not be
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL_KHR](VkImageLayout.html)

* 
[](#VUID-VkSubpassDescription2-flags-10683) VUID-VkSubpassDescription2-flags-10683

If `flags` includes
[VK_SUBPASS_DESCRIPTION_TILE_SHADING_APRON_BIT_QCOM](VkSubpassDescriptionFlagBits.html), the render
pass **must** have been created with a
[VkRenderPassTileShadingCreateInfoQCOM](VkRenderPassTileShadingCreateInfoQCOM.html)::`tileApronSize` greater
than `(0,0)`

* 
[](#VUID-VkSubpassDescription2-inputAttachmentCount-12293) VUID-VkSubpassDescription2-inputAttachmentCount-12293

`inputAttachmentCount` **must** be less than or equal to
[    `maxPerStageDescriptorInputAttachments`](../../../../spec/latest/chapters/limits.html#limits-maxPerStageDescriptorInputAttachments)

* 
[](#VUID-VkSubpassDescription2-colorAttachmentCount-00845) VUID-VkSubpassDescription2-colorAttachmentCount-00845

`colorAttachmentCount` **must** be less than or equal to
[`maxColorAttachments`](../../../../spec/latest/chapters/limits.html#limits-maxColorAttachments)

* 
[](#VUID-VkSubpassDescription2-loadOp-00846) VUID-VkSubpassDescription2-loadOp-00846

If the first use of an attachment in this render pass is as an input
attachment, and the attachment is not also used as a color or
depth/stencil attachment in the same subpass, then `loadOp` **must**
not be [VK_ATTACHMENT_LOAD_OP_CLEAR](VkAttachmentLoadOp.html)

* 
[](#VUID-VkSubpassDescription2-attachment-06251) VUID-VkSubpassDescription2-attachment-06251

If the `attachment` member of `pDepthStencilAttachment` is not
[VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html) and its `pNext` chain includes a
[VkAttachmentReferenceStencilLayout](VkAttachmentReferenceStencilLayout.html) structure, the `layout`
member of `pDepthStencilAttachment` **must** not be
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html)

* 
[](#VUID-VkSubpassDescription2-pipelineBindPoint-04953) VUID-VkSubpassDescription2-pipelineBindPoint-04953

`pipelineBindPoint` **must** be [VK_PIPELINE_BIND_POINT_GRAPHICS](VkPipelineBindPoint.html)
or [VK_PIPELINE_BIND_POINT_SUBPASS_SHADING_HUAWEI](VkPipelineBindPoint.html)

* 
[](#VUID-VkSubpassDescription2-pResolveAttachments-03067) VUID-VkSubpassDescription2-pResolveAttachments-03067

If `pResolveAttachments` is not `NULL`, each resolve attachment that
is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html) **must** have a sample count of
[VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html)

* 
[](#VUID-VkSubpassDescription2-externalFormatResolve-09335) VUID-VkSubpassDescription2-externalFormatResolve-09335

If the [`externalFormatResolve`](../../../../spec/latest/chapters/features.html#features-externalFormatResolve)
feature is not enabled and `pResolveAttachments` is not `NULL`, for
each resolve attachment that does not have the value
[VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), the corresponding color attachment **must** not
have the value [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html)

* 
[](#VUID-VkSubpassDescription2-nullColorAttachmentWithExternalFormatResolve-09336) VUID-VkSubpassDescription2-nullColorAttachmentWithExternalFormatResolve-09336

If the [    `nullColorAttachmentWithExternalFormatResolve`](../../../../spec/latest/chapters/limits.html#limits-nullColorAttachmentWithExternalFormatResolve) property is
[VK_FALSE](VK_FALSE.html) and `pResolveAttachments` is not `NULL`, for each
resolve attachment that has a format of [VK_FORMAT_UNDEFINED](VkFormat.html), the
corresponding color attachment **must** not have the value
[VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html)

* 
[](#VUID-VkSubpassDescription2-nullColorAttachmentWithExternalFormatResolve-09337) VUID-VkSubpassDescription2-nullColorAttachmentWithExternalFormatResolve-09337

If the [    `nullColorAttachmentWithExternalFormatResolve`](../../../../spec/latest/chapters/limits.html#limits-nullColorAttachmentWithExternalFormatResolve) property is
[VK_TRUE](VK_TRUE.html) and `pResolveAttachments` is not `NULL`, for each
resolve attachment that has a format of [VK_FORMAT_UNDEFINED](VkFormat.html), the
corresponding color attachment **must** have the value
[VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html)

* 
[](#VUID-VkSubpassDescription2-externalFormatResolve-09338) VUID-VkSubpassDescription2-externalFormatResolve-09338

If the [`externalFormatResolve`](../../../../spec/latest/chapters/features.html#features-externalFormatResolve)
feature is not enabled and `pResolveAttachments` is not `NULL`, for
each resolve attachment that is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), the
corresponding color attachment **must** not have a sample count of
[VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html)

* 
[](#VUID-VkSubpassDescription2-externalFormatResolve-09339) VUID-VkSubpassDescription2-externalFormatResolve-09339

If the [`externalFormatResolve`](../../../../spec/latest/chapters/features.html#features-externalFormatResolve)
feature is not enabled, each element of `pResolveAttachments` **must**
have the same [VkFormat](VkFormat.html) as its corresponding color attachment

* 
[](#VUID-VkSubpassDescription2-multisampledRenderToSingleSampled-06869) VUID-VkSubpassDescription2-multisampledRenderToSingleSampled-06869

If the [    `multisampledRenderToSingleSampled`](../../../../spec/latest/chapters/features.html#features-multisampledRenderToSingleSampled) feature is not enabled, all
attachments in `pColorAttachments` that are not
[VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html) **must** have the same sample count

* 
[](#VUID-VkSubpassDescription2-pInputAttachments-02897) VUID-VkSubpassDescription2-pInputAttachments-02897

All attachments in `pInputAttachments` that are not
[VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html)
and any of the following is true:

the [`externalFormatResolve`](../../../../spec/latest/chapters/features.html#features-externalFormatResolve)
feature is not enabled

* 
the [     `nullColorAttachmentWithExternalFormatResolve`](../../../../spec/latest/chapters/limits.html#limits-nullColorAttachmentWithExternalFormatResolve) property is
[VK_FALSE](VK_FALSE.html)

* 
does not have a non-zero value of
[VkExternalFormatANDROID](VkExternalFormatANDROID.html)::`externalFormat`

**must** have image formats whose [potential format features](../../../../spec/latest/chapters/formats.html#potential-format-features) contain at least [VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](VkFormatFeatureFlagBits.html) or
[VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](VkFormatFeatureFlagBits.html)

[](#VUID-VkSubpassDescription2-pColorAttachments-02898) VUID-VkSubpassDescription2-pColorAttachments-02898

All attachments in `pColorAttachments` that are not
[VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html) **must** have image formats whose
[potential format features](../../../../spec/latest/chapters/formats.html#potential-format-features) contain
[VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](VkFormatFeatureFlagBits.html)

[](#VUID-VkSubpassDescription2-pResolveAttachments-09343) VUID-VkSubpassDescription2-pResolveAttachments-09343

All attachments in `pResolveAttachments` that are not
[VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html) and do not have an image format of
[VK_FORMAT_UNDEFINED](VkFormat.html) **must** have image formats whose
[potential format features](../../../../spec/latest/chapters/formats.html#potential-format-features) contain
[VK_FORMAT_FEATURE_COLOR_ATTACHMENT_BIT](VkFormatFeatureFlagBits.html)

[](#VUID-VkSubpassDescription2-pDepthStencilAttachment-02900) VUID-VkSubpassDescription2-pDepthStencilAttachment-02900

If `pDepthStencilAttachment` is not `NULL` and the attachment is not
[VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html) then it **must** have an image format whose
[potential format features](../../../../spec/latest/chapters/formats.html#potential-format-features) contain
[VK_FORMAT_FEATURE_DEPTH_STENCIL_ATTACHMENT_BIT](VkFormatFeatureFlagBits.html)

[](#VUID-VkSubpassDescription2-linearColorAttachment-06499) VUID-VkSubpassDescription2-linearColorAttachment-06499

If the [`linearColorAttachment`](../../../../spec/latest/chapters/features.html#features-linearColorAttachment)
feature is enabled and the image is created with
[VK_IMAGE_TILING_LINEAR](VkImageTiling.html), all attachments in `pInputAttachments`
that are not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html) **must** have image formats whose
[potential format features](../../../../spec/latest/chapters/formats.html#potential-format-features) **must** contain
[VK_FORMAT_FEATURE_2_LINEAR_COLOR_ATTACHMENT_BIT_NV](VkFormatFeatureFlagBits2.html)

[](#VUID-VkSubpassDescription2-linearColorAttachment-06500) VUID-VkSubpassDescription2-linearColorAttachment-06500

If the [`linearColorAttachment`](../../../../spec/latest/chapters/features.html#features-linearColorAttachment)
feature is enabled and the image is created with
[VK_IMAGE_TILING_LINEAR](VkImageTiling.html), all attachments in `pColorAttachments`
that are not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html) **must** have image formats whose
[potential format features](../../../../spec/latest/chapters/formats.html#potential-format-features) **must** contain
[VK_FORMAT_FEATURE_2_LINEAR_COLOR_ATTACHMENT_BIT_NV](VkFormatFeatureFlagBits2.html)

[](#VUID-VkSubpassDescription2-linearColorAttachment-06501) VUID-VkSubpassDescription2-linearColorAttachment-06501

If the [`linearColorAttachment`](../../../../spec/latest/chapters/features.html#features-linearColorAttachment)
feature is enabled and the image is created with
[VK_IMAGE_TILING_LINEAR](VkImageTiling.html), all attachments in
`pResolveAttachments` that are not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html) **must**
have image formats whose [potential format    features](../../../../spec/latest/chapters/formats.html#potential-format-features) **must** contain
[VK_FORMAT_FEATURE_2_LINEAR_COLOR_ATTACHMENT_BIT_NV](VkFormatFeatureFlagBits2.html)

[](#VUID-VkSubpassDescription2-None-09456) VUID-VkSubpassDescription2-None-09456

If either of the following is enabled:

* 
The `[VK_AMD_mixed_attachment_samples](VK_AMD_mixed_attachment_samples.html)` extension

* 
The `[VK_NV_framebuffer_mixed_samples](VK_NV_framebuffer_mixed_samples.html)` extension

all attachments in `pColorAttachments` that are not
[VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html) **must** have a sample count that is smaller than or
equal to the sample count of `pDepthStencilAttachment` if it is not
[VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html)

[](#VUID-VkSubpassDescription2-pNext-06870) VUID-VkSubpassDescription2-pNext-06870

If the `pNext` chain includes a
[VkMultisampledRenderToSingleSampledInfoEXT](VkMultisampledRenderToSingleSampledInfoEXT.html) structure with
`multisampledRenderToSingleSampledEnable` equal to [VK_TRUE](VK_TRUE.html),
then all attachments in `pColorAttachments` and
`pDepthStencilAttachment` that are not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html)
**must** have a sample count that is either [VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html) or
equal to
[VkMultisampledRenderToSingleSampledInfoEXT](VkMultisampledRenderToSingleSampledInfoEXT.html)::`rasterizationSamples`

[](#VUID-VkSubpassDescription2-pNext-06871) VUID-VkSubpassDescription2-pNext-06871

If the `pNext` chain includes a
[VkMultisampledRenderToSingleSampledInfoEXT](VkMultisampledRenderToSingleSampledInfoEXT.html) structure with
`multisampledRenderToSingleSampledEnable` equal to [VK_TRUE](VK_TRUE.html),
and `pDepthStencilAttachment` is not `NULL`, does not have the value
[VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), and has a sample count of
[VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html), the `pNext` chain **must** also include a
[VkSubpassDescriptionDepthStencilResolve](VkSubpassDescriptionDepthStencilResolve.html) structure with
`pDepthStencilResolveAttachment` that is either `NULL` or has the
value [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html)

[](#VUID-VkSubpassDescription2-multisampledRenderToSingleSampled-06872) VUID-VkSubpassDescription2-multisampledRenderToSingleSampled-06872

If none of the following are enabled:

* 
The `[VK_AMD_mixed_attachment_samples](VK_AMD_mixed_attachment_samples.html)` extension

* 
The `[VK_NV_framebuffer_mixed_samples](VK_NV_framebuffer_mixed_samples.html)` extension

* 
The [     `multisampledRenderToSingleSampled`](../../../../spec/latest/chapters/features.html#features-multisampledRenderToSingleSampled) feature

all attachments in `pDepthStencilAttachment` and `pColorAttachments`
that are not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html) **must** have the same sample count

[](#VUID-VkSubpassDescription2-attachment-03073) VUID-VkSubpassDescription2-attachment-03073

Each element of `pPreserveAttachments` **must** not be
[VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html)

[](#VUID-VkSubpassDescription2-pPreserveAttachments-03074) VUID-VkSubpassDescription2-pPreserveAttachments-03074

Each element of `pPreserveAttachments` **must** not also be an element
of any other member of the subpass description

[](#VUID-VkSubpassDescription2-layout-02528) VUID-VkSubpassDescription2-layout-02528

If any attachment is used by more than one [VkAttachmentReference2](VkAttachmentReference2.html)
member, then each use **must** use the same `layout`

[](#VUID-VkSubpassDescription2-flags-03076) VUID-VkSubpassDescription2-flags-03076

If `flags` includes
[VK_SUBPASS_DESCRIPTION_PER_VIEW_POSITION_X_ONLY_BIT_NVX](VkSubpassDescriptionFlagBits.html), it **must**
also include [VK_SUBPASS_DESCRIPTION_PER_VIEW_ATTRIBUTES_BIT_NVX](VkSubpassDescriptionFlagBits.html)

[](#VUID-VkSubpassDescription2-attachment-02799) VUID-VkSubpassDescription2-attachment-02799

If the `attachment` member of any element of `pInputAttachments`
is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), then the `aspectMask` member
**must** be a valid combination of [VkImageAspectFlagBits](VkImageAspectFlagBits.html)

[](#VUID-VkSubpassDescription2-attachment-02800) VUID-VkSubpassDescription2-attachment-02800

If the `attachment` member of any element of `pInputAttachments`
is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), then the `aspectMask` member
**must** not be `0`

[](#VUID-VkSubpassDescription2-attachment-02801) VUID-VkSubpassDescription2-attachment-02801

If the `attachment` member of any element of `pInputAttachments`
is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), then the `aspectMask` member
**must** not include [VK_IMAGE_ASPECT_METADATA_BIT](VkImageAspectFlagBits.html)

[](#VUID-VkSubpassDescription2-attachment-04563) VUID-VkSubpassDescription2-attachment-04563

If the `attachment` member of any element of `pInputAttachments`
is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), then the `aspectMask` member
**must** not include `VK_IMAGE_ASPECT_MEMORY_PLANE*_i_*BIT_EXT` for
any index *i*

[](#VUID-VkSubpassDescription2-pDepthStencilAttachment-04440) VUID-VkSubpassDescription2-pDepthStencilAttachment-04440

An attachment **must** not be used in both `pDepthStencilAttachment`
and `pColorAttachments`

[](#VUID-VkSubpassDescription2-multiview-06558) VUID-VkSubpassDescription2-multiview-06558

If the [`multiview`](../../../../spec/latest/chapters/features.html#features-multiview) feature is not enabled,
`viewMask` **must** be `0`

[](#VUID-VkSubpassDescription2-viewMask-06706) VUID-VkSubpassDescription2-viewMask-06706

The index of the most significant bit in `viewMask` **must** be less
than [`maxMultiviewViewCount`](../../../../spec/latest/chapters/devsandqueues.html#limits-maxMultiviewViewCount)

[](#VUID-VkSubpassDescription2-externalFormatResolve-09344) VUID-VkSubpassDescription2-externalFormatResolve-09344

If the [`externalFormatResolve`](../../../../spec/latest/chapters/features.html#features-externalFormatResolve)
feature is enabled, `pResolveAttachments` is not `NULL`, and
`colorAttachmentCount` is not `1`, any element of
`pResolveAttachments` that is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), **must**
not have a format of [VK_FORMAT_UNDEFINED](VkFormat.html)

[](#VUID-VkSubpassDescription2-externalFormatResolve-09345) VUID-VkSubpassDescription2-externalFormatResolve-09345

If the [`externalFormatResolve`](../../../../spec/latest/chapters/features.html#features-externalFormatResolve)
feature is enabled, `pResolveAttachments` is not `NULL`, any element
of `pResolveAttachments` is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html) and has a
format of [VK_FORMAT_UNDEFINED](VkFormat.html), and the corresponding element of
`pColorAttachments` is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), the color
attachment **must** have a `samples` value of `1`

[](#VUID-VkSubpassDescription2-externalFormatResolve-09346) VUID-VkSubpassDescription2-externalFormatResolve-09346

If the [`externalFormatResolve`](../../../../spec/latest/chapters/features.html#features-externalFormatResolve)
feature is enabled, `pResolveAttachments` is not `NULL`, and any
element of `pResolveAttachments` is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html)
and has a format of [VK_FORMAT_UNDEFINED](VkFormat.html), `viewMask` **must** be
`0`

[](#VUID-VkSubpassDescription2-externalFormatResolve-09347) VUID-VkSubpassDescription2-externalFormatResolve-09347

If the [`externalFormatResolve`](../../../../spec/latest/chapters/features.html#features-externalFormatResolve)
feature is enabled, `pResolveAttachments` is not `NULL`, and any
element of `pResolveAttachments` is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html)
and has a format of [VK_FORMAT_UNDEFINED](VkFormat.html),
[VkFragmentShadingRateAttachmentInfoKHR](VkFragmentShadingRateAttachmentInfoKHR.html)::`pFragmentShadingRateAttachment`
**must** either be `NULL` or a [VkAttachmentReference2](VkAttachmentReference2.html) structure with
an `attachment` value of [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html)

[](#VUID-VkSubpassDescription2-externalFormatResolve-09348) VUID-VkSubpassDescription2-externalFormatResolve-09348

If the [`externalFormatResolve`](../../../../spec/latest/chapters/features.html#features-externalFormatResolve)
feature is enabled, `pResolveAttachments` is not `NULL`, and any
element of `pResolveAttachments` is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html)
and has a format of [VK_FORMAT_UNDEFINED](VkFormat.html), elements of
`pInputAttachments` referencing either a color attachment or resolve
attachment used in this subpass **must** not include
`VK_IMAGE_ASPECT_PLANE*_i_*BIT` for any index *i* in its
`aspectMask`

[](#VUID-VkSubpassDescription2-flags-04907) VUID-VkSubpassDescription2-flags-04907

If `flags` includes
[VK_SUBPASS_DESCRIPTION_CUSTOM_RESOLVE_BIT_EXT](VkSubpassDescriptionFlagBits.html), and if
`pResolveAttachments` is not `NULL`, then each resolve attachment
**must** be [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html)

[](#VUID-VkSubpassDescription2-flags-04908) VUID-VkSubpassDescription2-flags-04908

If `flags` includes
[VK_SUBPASS_DESCRIPTION_CUSTOM_RESOLVE_BIT_EXT](VkSubpassDescriptionFlagBits.html), and if
`pDepthStencilResolveAttachment` is not `NULL`, then the
depth/stencil resolve attachment **must** be [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html)

[](#VUID-VkSubpassDescription2-flags-04909) VUID-VkSubpassDescription2-flags-04909

If `flags` includes
[VK_SUBPASS_DESCRIPTION_CUSTOM_RESOLVE_BIT_EXT](VkSubpassDescriptionFlagBits.html), then the subpass
**must** be the last subpass in a subpass dependency chain

Valid Usage (Implicit)

* 
[](#VUID-VkSubpassDescription2-sType-sType) VUID-VkSubpassDescription2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SUBPASS_DESCRIPTION_2](VkStructureType.html)

* 
[](#VUID-VkSubpassDescription2-pNext-pNext) VUID-VkSubpassDescription2-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkFragmentShadingRateAttachmentInfoKHR](VkFragmentShadingRateAttachmentInfoKHR.html), [VkMultisampledRenderToSingleSampledInfoEXT](VkMultisampledRenderToSingleSampledInfoEXT.html), [VkRenderPassCreationControlEXT](VkRenderPassCreationControlEXT.html), [VkRenderPassSubpassFeedbackCreateInfoEXT](VkRenderPassSubpassFeedbackCreateInfoEXT.html), or [VkSubpassDescriptionDepthStencilResolve](VkSubpassDescriptionDepthStencilResolve.html)

* 
[](#VUID-VkSubpassDescription2-sType-unique) VUID-VkSubpassDescription2-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkSubpassDescription2-flags-parameter) VUID-VkSubpassDescription2-flags-parameter

 `flags` **must** be a valid combination of [VkSubpassDescriptionFlagBits](VkSubpassDescriptionFlagBits.html) values

* 
[](#VUID-VkSubpassDescription2-pipelineBindPoint-parameter) VUID-VkSubpassDescription2-pipelineBindPoint-parameter

 `pipelineBindPoint` **must** be a valid [VkPipelineBindPoint](VkPipelineBindPoint.html) value

* 
[](#VUID-VkSubpassDescription2-pInputAttachments-parameter) VUID-VkSubpassDescription2-pInputAttachments-parameter

 If `inputAttachmentCount` is not `0`, `pInputAttachments` **must** be a valid pointer to an array of `inputAttachmentCount` valid [VkAttachmentReference2](VkAttachmentReference2.html) structures

* 
[](#VUID-VkSubpassDescription2-pColorAttachments-parameter) VUID-VkSubpassDescription2-pColorAttachments-parameter

 If `colorAttachmentCount` is not `0`, `pColorAttachments` **must** be a valid pointer to an array of `colorAttachmentCount` valid [VkAttachmentReference2](VkAttachmentReference2.html) structures

* 
[](#VUID-VkSubpassDescription2-pResolveAttachments-parameter) VUID-VkSubpassDescription2-pResolveAttachments-parameter

 If `colorAttachmentCount` is not `0`, and `pResolveAttachments` is not `NULL`, `pResolveAttachments` **must** be a valid pointer to an array of `colorAttachmentCount` valid [VkAttachmentReference2](VkAttachmentReference2.html) structures

* 
[](#VUID-VkSubpassDescription2-pDepthStencilAttachment-parameter) VUID-VkSubpassDescription2-pDepthStencilAttachment-parameter

 If `pDepthStencilAttachment` is not `NULL`, `pDepthStencilAttachment` **must** be a valid pointer to a valid [VkAttachmentReference2](VkAttachmentReference2.html) structure

* 
[](#VUID-VkSubpassDescription2-pPreserveAttachments-parameter) VUID-VkSubpassDescription2-pPreserveAttachments-parameter

 If `preserveAttachmentCount` is not `0`, `pPreserveAttachments` **must** be a valid pointer to an array of `preserveAttachmentCount` `uint32_t` values

[VK_KHR_create_renderpass2](VK_KHR_create_renderpass2.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkAttachmentReference2](VkAttachmentReference2.html), [VkPipelineBindPoint](VkPipelineBindPoint.html), [VkRenderPassCreateInfo2](VkRenderPassCreateInfo2.html), [VkStructureType](VkStructureType.html), [VkSubpassDescriptionFlags](VkSubpassDescriptionFlags.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkSubpassDescription2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
