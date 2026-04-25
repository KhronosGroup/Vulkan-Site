# VkRenderingInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRenderingInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRenderingInfo - Structure specifying render pass instance begin info

The `VkRenderingInfo` structure is defined as:

// Provided by VK_VERSION_1_3
typedef struct VkRenderingInfo {
    VkStructureType                     sType;
    const void*                         pNext;
    VkRenderingFlags                    flags;
    VkRect2D                            renderArea;
    uint32_t                            layerCount;
    uint32_t                            viewMask;
    uint32_t                            colorAttachmentCount;
    const VkRenderingAttachmentInfo*    pColorAttachments;
    const VkRenderingAttachmentInfo*    pDepthAttachment;
    const VkRenderingAttachmentInfo*    pStencilAttachment;
} VkRenderingInfo;

// Provided by VK_KHR_dynamic_rendering, VK_QCOM_tile_properties with VK_KHR_dynamic_rendering or VK_VERSION_1_3
// Equivalent to VkRenderingInfo
typedef VkRenderingInfo VkRenderingInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkRenderingFlagBits](VkRenderingFlagBits.html).

* 
`renderArea` is the render area that is affected by the render pass
instance.

* 
`layerCount` is the number of layers rendered to in each attachment
when `viewMask` is `0`.

* 
`viewMask` is a bitfield of view indices describing which views are
active during rendering, when it is not `0`.

* 
`colorAttachmentCount` is the number of elements in
`pColorAttachments`.

* 
`pColorAttachments` is a pointer to an array of
`colorAttachmentCount` [VkRenderingAttachmentInfo](VkRenderingAttachmentInfo.html) structures
describing any color attachments used.

* 
`pDepthAttachment` is a pointer to a [VkRenderingAttachmentInfo](VkRenderingAttachmentInfo.html)
structure describing a depth attachment.

* 
`pStencilAttachment` is a pointer to a
[VkRenderingAttachmentInfo](VkRenderingAttachmentInfo.html) structure describing a stencil
attachment.

If `viewMask` is not `0`, multiview is enabled.

If there is an instance of [VkDeviceGroupRenderPassBeginInfo](VkDeviceGroupRenderPassBeginInfo.html) included
in the `pNext` chain and its `deviceRenderAreaCount` member is not
`0`, then `renderArea` is ignored, and the render area is defined
per-device by that structure.

If multiview is enabled, and the [`multiviewPerViewRenderAreas`](../../../../spec/latest/chapters/features.html#features-multiviewPerViewRenderAreas) feature is enabled, and there is an
instance of [VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM](VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM.html)
included in the `pNext` chain with `perViewRenderAreaCount` not
equal to `0`, then the elements of
[VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM](VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM.html)::`pPerViewRenderAreas`
override `renderArea` and define a render area for each view.
In this case, `renderArea` **must** be an area at least as large as the
union of all the per-view render areas.

Each element of the `pColorAttachments` array corresponds to an output
location in the shader, i.e. if the shader declares an output variable
decorated with a `Location` value of **X**, then it uses the attachment
provided in `pColorAttachments`[**X**].
If the `imageView` member of any element of `pColorAttachments` is
[VK_NULL_HANDLE](VK_NULL_HANDLE.html),
and `resolveMode` is not
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](VkResolveModeFlagBits.html),
writes to the corresponding location by a fragment are discarded.

The `aspectMask` of any image view specified for `pDepthAttachment`
or `pStencilAttachment` is ignored.
Instead, depth attachments are automatically treated as if
[VK_IMAGE_ASPECT_DEPTH_BIT](VkImageAspectFlagBits.html) was specified for their aspect masks, and
stencil attachments are automatically treated as if
[VK_IMAGE_ASPECT_STENCIL_BIT](VkImageAspectFlagBits.html) was specified for their aspect masks.

Valid Usage

* 
[](#VUID-VkRenderingInfo-viewMask-06069) VUID-VkRenderingInfo-viewMask-06069

If `viewMask` is `0`, `layerCount` **must** not be `0`

* 
[](#VUID-VkRenderingInfo-multisampledRenderToSingleSampled-06857) VUID-VkRenderingInfo-multisampledRenderToSingleSampled-06857

If none of the following are enabled:

The `[VK_AMD_mixed_attachment_samples](VK_AMD_mixed_attachment_samples.html)` extension

* 
The `[VK_NV_framebuffer_mixed_samples](VK_NV_framebuffer_mixed_samples.html)` extension

* 
The [     `multisampledRenderToSingleSampled`](../../../../spec/latest/chapters/features.html#features-multisampledRenderToSingleSampled) feature

`imageView` members of `pDepthAttachment`, `pStencilAttachment`,
and elements of `pColorAttachments` that are not [VK_NULL_HANDLE](VK_NULL_HANDLE.html)
**must** have been created with the same `sampleCount`

[](#VUID-VkRenderingInfo-imageView-09429) VUID-VkRenderingInfo-imageView-09429

`imageView` members of elements of `pColorAttachments` that are
not [VK_NULL_HANDLE](VK_NULL_HANDLE.html) **must** have been created with the same
`sampleCount`
, if the [    `multisampledRenderToSingleSampled`](../../../../spec/latest/chapters/features.html#features-multisampledRenderToSingleSampled) feature is not enabled

[](#VUID-VkRenderingInfo-None-08994) VUID-VkRenderingInfo-None-08994

If [VkDeviceGroupRenderPassBeginInfo](VkDeviceGroupRenderPassBeginInfo.html)::`deviceRenderAreaCount`
is 0,
`renderArea.extent.width` **must** be greater than 0

[](#VUID-VkRenderingInfo-None-08995) VUID-VkRenderingInfo-None-08995

If [VkDeviceGroupRenderPassBeginInfo](VkDeviceGroupRenderPassBeginInfo.html)::`deviceRenderAreaCount`
is 0,
`renderArea.extent.height` **must** be greater than 0

[](#VUID-VkRenderingInfo-imageView-06858) VUID-VkRenderingInfo-imageView-06858

If
[multisampled-render-to-single-sampled](../../../../spec/latest/chapters/renderpass.html#subpass-multisampledrendertosinglesampled)
is enabled, then all attachments referenced by `imageView` members
of `pDepthAttachment`, `pStencilAttachment`, and elements of
`pColorAttachments` that are not [VK_NULL_HANDLE](VK_NULL_HANDLE.html) **must** have a
sample count that is either [VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html) or equal to
[VkMultisampledRenderToSingleSampledInfoEXT](VkMultisampledRenderToSingleSampledInfoEXT.html)::`rasterizationSamples`

[](#VUID-VkRenderingInfo-imageView-06859) VUID-VkRenderingInfo-imageView-06859

If
[multisampled-render-to-single-sampled](../../../../spec/latest/chapters/renderpass.html#subpass-multisampledrendertosinglesampled)
is enabled, then all attachments referenced by `imageView` members
of `pDepthAttachment`, `pStencilAttachment`, and elements of
`pColorAttachments` that are not [VK_NULL_HANDLE](VK_NULL_HANDLE.html) and have a
sample count of [VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html) **must** have been created with
[VK_IMAGE_CREATE_MULTISAMPLED_RENDER_TO_SINGLE_SAMPLED_BIT_EXT](VkImageCreateFlagBits.html) in
their [VkImageCreateInfo](VkImageCreateInfo.html)::`flags`

[](#VUID-VkRenderingInfo-pNext-06077) VUID-VkRenderingInfo-pNext-06077

If the `pNext` chain does not contain
[VkDeviceGroupRenderPassBeginInfo](VkDeviceGroupRenderPassBeginInfo.html) or its
`deviceRenderAreaCount` member is equal to 0,
`renderArea.offset.x` **must** be greater than or equal to 0

[](#VUID-VkRenderingInfo-pNext-06078) VUID-VkRenderingInfo-pNext-06078

If the `pNext` chain does not contain
[VkDeviceGroupRenderPassBeginInfo](VkDeviceGroupRenderPassBeginInfo.html) or its
`deviceRenderAreaCount` member is equal to 0,
`renderArea.offset.y` **must** be greater than or equal to 0

[](#VUID-VkRenderingInfo-pNext-07815) VUID-VkRenderingInfo-pNext-07815

If the `pNext` chain does not contain
[VkDeviceGroupRenderPassBeginInfo](VkDeviceGroupRenderPassBeginInfo.html) or its
`deviceRenderAreaCount` member is equal to 0,
the sum of `renderArea.extent.width` and `renderArea.offset.x`
**must** be less than or equal to
[`maxFramebufferWidth`](../../../../spec/latest/chapters/limits.html#limits-maxFramebufferWidth)

[](#VUID-VkRenderingInfo-pNext-07816) VUID-VkRenderingInfo-pNext-07816

If the `pNext` chain does not contain
[VkDeviceGroupRenderPassBeginInfo](VkDeviceGroupRenderPassBeginInfo.html) or its
`deviceRenderAreaCount` member is equal to 0,
the sum of `renderArea.extent.height` and `renderArea.offset.y`
**must** be less than or equal to
[`maxFramebufferHeight`](../../../../spec/latest/chapters/limits.html#limits-maxFramebufferWidth)

[](#VUID-VkRenderingInfo-pNext-06079) VUID-VkRenderingInfo-pNext-06079

If the `pNext` chain does not contain
[VkDeviceGroupRenderPassBeginInfo](VkDeviceGroupRenderPassBeginInfo.html) or its
`deviceRenderAreaCount` member is equal to 0,
the width of the `imageView` member of each element of
`pColorAttachments`, `pDepthAttachment`, or
`pStencilAttachment` that is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html) **must** be
greater than or equal to `renderArea.offset.x` + 
`renderArea.extent.width`

[](#VUID-VkRenderingInfo-pNext-06080) VUID-VkRenderingInfo-pNext-06080

If the `pNext` chain does not contain
[VkDeviceGroupRenderPassBeginInfo](VkDeviceGroupRenderPassBeginInfo.html) or its
`deviceRenderAreaCount` member is equal to 0,
the height of the `imageView` member of each element of
`pColorAttachments`, `pDepthAttachment`, or
`pStencilAttachment` that is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html) **must** be
greater than or equal to `renderArea.offset.y` + 
`renderArea.extent.height`

[](#VUID-VkRenderingInfo-pNext-06083) VUID-VkRenderingInfo-pNext-06083

If the `pNext` chain contains
[VkDeviceGroupRenderPassBeginInfo](VkDeviceGroupRenderPassBeginInfo.html), the width of the `imageView`
member of any element of `pColorAttachments`,
`pDepthAttachment`, or `pStencilAttachment` that is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html) **must** be greater than or equal to the sum of the
`offset.x` and `extent.width` members of each element of
`pDeviceRenderAreas`

[](#VUID-VkRenderingInfo-pNext-06084) VUID-VkRenderingInfo-pNext-06084

If the `pNext` chain contains
[VkDeviceGroupRenderPassBeginInfo](VkDeviceGroupRenderPassBeginInfo.html), the height of the
`imageView` member of any element of `pColorAttachments`,
`pDepthAttachment`, or `pStencilAttachment` that is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html) **must** be greater than or equal to the sum of the
`offset.y` and `extent.height` members of each element of
`pDeviceRenderAreas`

[](#VUID-VkRenderingInfo-pDepthAttachment-06085) VUID-VkRenderingInfo-pDepthAttachment-06085

If neither `pDepthAttachment` or `pStencilAttachment` are `NULL`
and the `imageView` member of either structure is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html), the `imageView` member of each structure **must**
be the same

[](#VUID-VkRenderingInfo-pDepthAttachment-06086) VUID-VkRenderingInfo-pDepthAttachment-06086

If neither `pDepthAttachment` or `pStencilAttachment` are
`NULL`, and the `resolveMode` member of each is not
[VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html), the `resolveImageView` member of each
structure **must** be the same

[](#VUID-VkRenderingInfo-colorAttachmentCount-06087) VUID-VkRenderingInfo-colorAttachmentCount-06087

If `colorAttachmentCount` is not `0` and the `imageView` member
of an element of `pColorAttachments` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
that `imageView` **must** have been created with the
[VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flag set

[](#VUID-VkRenderingInfo-colorAttachmentCount-09476) VUID-VkRenderingInfo-colorAttachmentCount-09476

If `colorAttachmentCount` is not `0` and there is an element of
`pColorAttachments` with
either its `resolveMode` member set to
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](VkResolveModeFlagBits.html), or
its `imageView` member not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and its
`resolveMode` member not set to [VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html), the
`resolveImageView` member of that element of `pColorAttachments`
**must** have been created with the
[VK_IMAGE_USAGE_COLOR_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flag set

[](#VUID-VkRenderingInfo-pDepthAttachment-06547) VUID-VkRenderingInfo-pDepthAttachment-06547

If `pDepthAttachment` is not `NULL` and
`pDepthAttachment->imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`pDepthAttachment->imageView` **must** have been created with a format
that includes a depth component

[](#VUID-VkRenderingInfo-pDepthAttachment-06088) VUID-VkRenderingInfo-pDepthAttachment-06088

If `pDepthAttachment` is not `NULL` and
`pDepthAttachment->imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`pDepthAttachment->imageView` **must** have been created with the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flag set

[](#VUID-VkRenderingInfo-pDepthAttachment-09477) VUID-VkRenderingInfo-pDepthAttachment-09477

If `pDepthAttachment` is not `NULL` and
`pDepthAttachment->resolveMode` is not [VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html),
`pDepthAttachment->resolveImageView` **must** have been created with
the [VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flag set

[](#VUID-VkRenderingInfo-pStencilAttachment-06548) VUID-VkRenderingInfo-pStencilAttachment-06548

If `pStencilAttachment` is not `NULL` and
`pStencilAttachment->imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`pStencilAttachment->imageView` **must** have been created with a
format that includes a stencil aspect

[](#VUID-VkRenderingInfo-pStencilAttachment-06089) VUID-VkRenderingInfo-pStencilAttachment-06089

If `pStencilAttachment` is not `NULL` and
`pStencilAttachment->imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`pStencilAttachment->imageView` **must** have been created with the
[VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flag set

[](#VUID-VkRenderingInfo-pStencilAttachment-09478) VUID-VkRenderingInfo-pStencilAttachment-09478

If `pStencilAttachment` is not `NULL` and
`pStencilAttachment->resolveMode` is not [VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html),
`pStencilAttachment->resolveImageView` **must** have been created with
the [VK_IMAGE_USAGE_DEPTH_STENCIL_ATTACHMENT_BIT](VkImageUsageFlagBits.html) usage flag set

[](#VUID-VkRenderingInfo-colorAttachmentCount-06090) VUID-VkRenderingInfo-colorAttachmentCount-06090

If `colorAttachmentCount` is not `0` and the `imageView` member
of an element of `pColorAttachments` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
the `layout` member of that element of `pColorAttachments` **must**
not be [VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html)

[](#VUID-VkRenderingInfo-colorAttachmentCount-06091) VUID-VkRenderingInfo-colorAttachmentCount-06091

If `colorAttachmentCount` is not `0` and the `imageView` member
of an element of `pColorAttachments` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), if
the `resolveMode` member of that element of `pColorAttachments`
is not [VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html), its `resolveImageLayout` member
**must** not be [VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html)

[](#VUID-VkRenderingInfo-pDepthAttachment-06092) VUID-VkRenderingInfo-pDepthAttachment-06092

If `pDepthAttachment` is not `NULL` and
`pDepthAttachment->imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`pDepthAttachment->layout` **must** not be
[VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](VkImageLayout.html)

[](#VUID-VkRenderingInfo-pDepthAttachment-06093) VUID-VkRenderingInfo-pDepthAttachment-06093

If `pDepthAttachment` is not `NULL`,
`pDepthAttachment->imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and
`pDepthAttachment->resolveMode` is not [VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html),
`pDepthAttachment->resolveImageLayout` **must** not be
[VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](VkImageLayout.html)

[](#VUID-VkRenderingInfo-pStencilAttachment-06094) VUID-VkRenderingInfo-pStencilAttachment-06094

If `pStencilAttachment` is not `NULL` and
`pStencilAttachment->imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`pStencilAttachment->layout` **must** not be
[VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](VkImageLayout.html)

[](#VUID-VkRenderingInfo-flags-11514) VUID-VkRenderingInfo-flags-11514

If `flags` contains [VK_RENDERING_CUSTOM_RESOLVE_BIT_EXT](VkRenderingFlagBits.html) or
[VK_RENDERING_FRAGMENT_REGION_BIT_EXT](VkRenderingFlagBits.html), then the
[`customResolve`](../../../../spec/latest/chapters/features.html#features-customResolve) feature **must** enabled

[](#VUID-VkRenderingInfo-pColorAttachments-11515) VUID-VkRenderingInfo-pColorAttachments-11515

For any element of `pColorAttachments`, `pDepthAttachment`, or
`pStencilAttachment`, if `resolveMode` contains
[VK_RESOLVE_MODE_CUSTOM_BIT_EXT](VkResolveModeFlagBits.html), then `flags` **must** contain
[VK_RENDERING_CUSTOM_RESOLVE_BIT_EXT](VkRenderingFlagBits.html)

[](#VUID-VkRenderingInfo-flags-11516) VUID-VkRenderingInfo-flags-11516

If `flags` contains [VK_RENDERING_CUSTOM_RESOLVE_BIT_EXT](VkRenderingFlagBits.html), then
for any element of `pColorAttachments`, `pDepthAttachment`, or
`pStencilAttachment`, `resolveMode` **must** be
[VK_RESOLVE_MODE_CUSTOM_BIT_EXT](VkResolveModeFlagBits.html) or [VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html)

[](#VUID-VkRenderingInfo-pStencilAttachment-06095) VUID-VkRenderingInfo-pStencilAttachment-06095

If `pStencilAttachment` is not `NULL`,
`pStencilAttachment->imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and
`pStencilAttachment->resolveMode` is not [VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html),
`pStencilAttachment->resolveImageLayout` **must** not be
[VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](VkImageLayout.html)

[](#VUID-VkRenderingInfo-layerCount-07817) VUID-VkRenderingInfo-layerCount-07817

`layerCount` **must** be less than or equal to
[`maxFramebufferLayers`](../../../../spec/latest/chapters/limits.html#limits-maxFramebufferLayers)

[](#VUID-VkRenderingInfo-viewMask-10859) VUID-VkRenderingInfo-viewMask-10859

If `viewMask` is `0`, each `pColorAttachment->imageView` and
`pColorAttachment->resolveImageView` that is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html) **must** have a `layerCount` that is greater than
or equal to `VkRenderingInfo`::`layerCount`

[](#VUID-VkRenderingInfo-viewMask-10860) VUID-VkRenderingInfo-viewMask-10860

If `viewMask` is `0`, each `pDepthAttachment->imageView` and
`pDepthAttachment->resolveImageView` that is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html) **must** have a `layerCount` that is greater than
or equal to `VkRenderingInfo`::`layerCount`

[](#VUID-VkRenderingInfo-viewMask-10861) VUID-VkRenderingInfo-viewMask-10861

If `viewMask` is `0`, each `pStencilAttachment->imageView` and
`pStencilAttachment->resolveImageView` that is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html) **must** have a `layerCount` that is greater than
or equal to `VkRenderingInfo`::`layerCount`

[](#VUID-VkRenderingInfo-viewMask-12403) VUID-VkRenderingInfo-viewMask-12403

If `viewMask` is not `0`, each `pColorAttachment->imageView` and
`pColorAttachment->resolveImageView` that is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html) **must** have a `layerCount` that is greater than
the index of the most significant bit in `viewMask`

[](#VUID-VkRenderingInfo-viewMask-12404) VUID-VkRenderingInfo-viewMask-12404

If `viewMask` is not `0`, each `pDepthAttachment->imageView` and
`pDepthAttachment->resolveImageView` that is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html) **must** have a `layerCount` that is greater than
the index of the most significant bit in `viewMask`

[](#VUID-VkRenderingInfo-viewMask-12405) VUID-VkRenderingInfo-viewMask-12405

If `viewMask` is not `0`, each `pStencilAttachment->imageView`
and `pStencilAttachment->resolveImageView` that is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html) **must** have a `layerCount` that is greater than
the index of the most significant bit in `viewMask`

[](#VUID-VkRenderingInfo-colorAttachmentCount-06096) VUID-VkRenderingInfo-colorAttachmentCount-06096

If `colorAttachmentCount` is not `0` and the `imageView` member
of an element of `pColorAttachments` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
the `layout` member of that element of `pColorAttachments` **must**
not be [VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html)
or [VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html)

[](#VUID-VkRenderingInfo-colorAttachmentCount-06097) VUID-VkRenderingInfo-colorAttachmentCount-06097

If `colorAttachmentCount` is not `0` and the `imageView` member
of an element of `pColorAttachments` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), if
the `resolveMode` member of that element of `pColorAttachments`
is not [VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html), its `resolveImageLayout` member
**must** not be
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html)

[](#VUID-VkRenderingInfo-pDepthAttachment-06098) VUID-VkRenderingInfo-pDepthAttachment-06098

If `pDepthAttachment` is not `NULL`,
`pDepthAttachment->imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and
`pDepthAttachment->resolveMode` is not [VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html),
`pDepthAttachment->resolveImageLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html)

[](#VUID-VkRenderingInfo-pStencilAttachment-06099) VUID-VkRenderingInfo-pStencilAttachment-06099

If `pStencilAttachment` is not `NULL`,
`pStencilAttachment->imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and
`pStencilAttachment->resolveMode` is not [VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html),
`pStencilAttachment->resolveImageLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html)

[](#VUID-VkRenderingInfo-colorAttachmentCount-06100) VUID-VkRenderingInfo-colorAttachmentCount-06100

If `colorAttachmentCount` is not `0` and the `imageView` member
of an element of `pColorAttachments` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
the `layout` member of that element of `pColorAttachments` **must**
not be [VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html), or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html)

[](#VUID-VkRenderingInfo-colorAttachmentCount-06101) VUID-VkRenderingInfo-colorAttachmentCount-06101

If `colorAttachmentCount` is not `0` and the `imageView` member
of an element of `pColorAttachments` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), if
the `resolveMode` member of that element of `pColorAttachments`
is not [VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html), its `resolveImageLayout` member
**must** not be [VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html), or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html)

[](#VUID-VkRenderingInfo-pDepthAttachment-07732) VUID-VkRenderingInfo-pDepthAttachment-07732

If `pDepthAttachment` is not `NULL` and
`pDepthAttachment->imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`pDepthAttachment->layout` **must** not be
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html)

[](#VUID-VkRenderingInfo-pDepthAttachment-07733) VUID-VkRenderingInfo-pDepthAttachment-07733

If `pDepthAttachment` is not `NULL`,
`pDepthAttachment->imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and
`pDepthAttachment->resolveMode` is not [VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html),
`pDepthAttachment->resolveImageLayout` **must** not be
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html)

[](#VUID-VkRenderingInfo-pStencilAttachment-07734) VUID-VkRenderingInfo-pStencilAttachment-07734

If `pStencilAttachment` is not `NULL` and
`pStencilAttachment->imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`pStencilAttachment->layout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](VkImageLayout.html)

[](#VUID-VkRenderingInfo-pStencilAttachment-07735) VUID-VkRenderingInfo-pStencilAttachment-07735

If `pStencilAttachment` is not `NULL`,
`pStencilAttachment->imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and
`pStencilAttachment->resolveMode` is not [VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html),
`pStencilAttachment->resolveImageLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](VkImageLayout.html)

[](#VUID-VkRenderingInfo-pDepthAttachment-06102) VUID-VkRenderingInfo-pDepthAttachment-06102

If `pDepthAttachment` is not `NULL` and
`pDepthAttachment->imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`pDepthAttachment->resolveMode` **must** be one of the bits set in
[VkPhysicalDeviceDepthStencilResolveProperties](VkPhysicalDeviceDepthStencilResolveProperties.html)::`supportedDepthResolveModes`

[](#VUID-VkRenderingInfo-pStencilAttachment-06103) VUID-VkRenderingInfo-pStencilAttachment-06103

If `pStencilAttachment` is not `NULL` and
`pStencilAttachment->imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`pStencilAttachment->resolveMode` **must** be one of the bits set in
[VkPhysicalDeviceDepthStencilResolveProperties](VkPhysicalDeviceDepthStencilResolveProperties.html)::`supportedStencilResolveModes`

[](#VUID-VkRenderingInfo-pDepthAttachment-06104) VUID-VkRenderingInfo-pDepthAttachment-06104

If `pDepthAttachment` or `pStencilAttachment` are both not
`NULL`, `pDepthAttachment->imageView` and
`pStencilAttachment->imageView` are both not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
and
[VkPhysicalDeviceDepthStencilResolveProperties](VkPhysicalDeviceDepthStencilResolveProperties.html)::`independentResolveNone`
is [VK_FALSE](VK_FALSE.html), the `resolveMode` of both structures **must** be the
same value

[](#VUID-VkRenderingInfo-pDepthAttachment-06105) VUID-VkRenderingInfo-pDepthAttachment-06105

If `pDepthAttachment` or `pStencilAttachment` are both not
`NULL`, `pDepthAttachment->imageView` and
`pStencilAttachment->imageView` are both not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
[VkPhysicalDeviceDepthStencilResolveProperties](VkPhysicalDeviceDepthStencilResolveProperties.html)::`independentResolve`
is [VK_FALSE](VK_FALSE.html), and the `resolveMode` of neither structure is
[VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html), the `resolveMode` of both structures
**must** be the same value

[](#VUID-VkRenderingInfo-colorAttachmentCount-06106) VUID-VkRenderingInfo-colorAttachmentCount-06106

`colorAttachmentCount` **must** be less than or equal to
[VkPhysicalDeviceLimits](VkPhysicalDeviceLimits.html)::`maxColorAttachments`

[](#VUID-VkRenderingInfo-imageView-06107) VUID-VkRenderingInfo-imageView-06107

If the `imageView` member of a
[VkRenderingFragmentDensityMapAttachmentInfoEXT](VkRenderingFragmentDensityMapAttachmentInfoEXT.html) structure included
in the `pNext` chain is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and the
[    `fragmentDensityMapNonSubsampledImages`](../../../../spec/latest/chapters/features.html#features-fragmentDensityMapNonSubsampledImages) feature is not enabled,
valid `imageView` and `resolveImageView` members of
`pDepthAttachment`, `pStencilAttachment`, and each element of
`pColorAttachments` **must** be a [VkImageView](VkImageView.html) created with
[VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](VkImageCreateFlagBits.html)

[](#VUID-VkRenderingInfo-imageView-06108) VUID-VkRenderingInfo-imageView-06108

If the `imageView` member of a
[VkRenderingFragmentDensityMapAttachmentInfoEXT](VkRenderingFragmentDensityMapAttachmentInfoEXT.html) structure included
in the `pNext` chain is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and `viewMask`
is not `0`, `imageView` **must** have a `layerCount` greater than
the index of the most significant bit in `viewMask`

[](#VUID-VkRenderingInfo-imageView-06109) VUID-VkRenderingInfo-imageView-06109

If the `imageView` member of a
[VkRenderingFragmentDensityMapAttachmentInfoEXT](VkRenderingFragmentDensityMapAttachmentInfoEXT.html) structure included
in the `pNext` chain is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and `viewMask`
is `0`, `imageView` **must** have a `layerCount` equal to `1`

[](#VUID-VkRenderingInfo-pNext-06112) VUID-VkRenderingInfo-pNext-06112

If
the `pNext` chain does not contain
[VkDeviceGroupRenderPassBeginInfo](VkDeviceGroupRenderPassBeginInfo.html) or its
`deviceRenderAreaCount` member is equal to 0 and
the `imageView` member of a
[VkRenderingFragmentDensityMapAttachmentInfoEXT](VkRenderingFragmentDensityMapAttachmentInfoEXT.html) structure included
in the `pNext` chain is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `imageView`
**must** have a width greater than or equal to
  

[](#VUID-VkRenderingInfo-pNext-06114) VUID-VkRenderingInfo-pNext-06114

If
the `pNext` chain does not contain
[VkDeviceGroupRenderPassBeginInfo](VkDeviceGroupRenderPassBeginInfo.html) or its
`deviceRenderAreaCount` member is equal to 0 and
the `imageView` member of a
[VkRenderingFragmentDensityMapAttachmentInfoEXT](VkRenderingFragmentDensityMapAttachmentInfoEXT.html) structure included
in the `pNext` chain is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `imageView`
**must** have a height greater than or equal to
  

[](#VUID-VkRenderingInfo-pNext-06113) VUID-VkRenderingInfo-pNext-06113

If the `pNext` chain contains a
[VkDeviceGroupRenderPassBeginInfo](VkDeviceGroupRenderPassBeginInfo.html) structure, its
`deviceRenderAreaCount` member is not 0, and the `imageView`
member of a [VkRenderingFragmentDensityMapAttachmentInfoEXT](VkRenderingFragmentDensityMapAttachmentInfoEXT.html)
structure included in the `pNext` chain is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`imageView` **must** have a width greater than or equal to
  
for each element of `pDeviceRenderAreas`

[](#VUID-VkRenderingInfo-pNext-06115) VUID-VkRenderingInfo-pNext-06115

If the `pNext` chain contains a
[VkDeviceGroupRenderPassBeginInfo](VkDeviceGroupRenderPassBeginInfo.html) structure, its
`deviceRenderAreaCount` member is not 0, and the `imageView`
member of a [VkRenderingFragmentDensityMapAttachmentInfoEXT](VkRenderingFragmentDensityMapAttachmentInfoEXT.html)
structure included in the `pNext` chain is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`imageView` **must** have a height greater than or equal to
  
for each element of `pDeviceRenderAreas`

[](#VUID-VkRenderingInfo-imageView-06116) VUID-VkRenderingInfo-imageView-06116

If the `imageView` member of a
[VkRenderingFragmentDensityMapAttachmentInfoEXT](VkRenderingFragmentDensityMapAttachmentInfoEXT.html) structure included
in the `pNext` chain is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), it **must** not be
equal to the `imageView` or `resolveImageView` member of
`pDepthAttachment`, `pStencilAttachment`, or any element of
`pColorAttachments`

[](#VUID-VkRenderingInfo-flags-10826) VUID-VkRenderingInfo-flags-10826

If `flags` contains
[VK_RENDERING_PER_LAYER_FRAGMENT_DENSITY_BIT_VALVE](VkRenderingFlagBits.html), then
`layerCount` **must** be less than or equal to
[    `maxFragmentDensityMapLayers`](../../../../spec/latest/chapters/limits.html#limits-maxFragmentDensityMapLayers)

[](#VUID-VkRenderingInfo-fragmentDensityMapLayered-10827) VUID-VkRenderingInfo-fragmentDensityMapLayered-10827

If the [    `fragmentDensityMapLayered`](../../../../spec/latest/chapters/features.html#features-fragmentDensityMapLayered) feature is not enabled, `flags`
**must** not contain
[VK_RENDERING_PER_LAYER_FRAGMENT_DENSITY_BIT_VALVE](VkRenderingFlagBits.html)

[](#VUID-VkRenderingInfo-pNext-06119) VUID-VkRenderingInfo-pNext-06119

If
the [`maintenance7`](../../../../spec/latest/chapters/features.html#features-maintenance7) feature is not enabled
or the [    `robustFragmentShadingRateAttachmentAccess`](../../../../spec/latest/chapters/limits.html#limits-robustFragmentShadingRateAttachmentAccess) limit is
[VK_FALSE](VK_FALSE.html) or the `imageView` member of a
[VkRenderingFragmentShadingRateAttachmentInfoKHR](VkRenderingFragmentShadingRateAttachmentInfoKHR.html) structure was
created with [VkImageSubresourceRange](VkImageSubresourceRange.html)::`baseMipLevel` greater
than 0,
the `pNext` chain does not contain
[VkDeviceGroupRenderPassBeginInfo](VkDeviceGroupRenderPassBeginInfo.html) or its
`deviceRenderAreaCount` member is equal to 0, and
the `imageView` member of a
[VkRenderingFragmentShadingRateAttachmentInfoKHR](VkRenderingFragmentShadingRateAttachmentInfoKHR.html) structure included
in the `pNext` chain is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `imageView`
**must** have a width greater than or equal to
  

[](#VUID-VkRenderingInfo-pNext-06121) VUID-VkRenderingInfo-pNext-06121

If
the [`maintenance7`](../../../../spec/latest/chapters/features.html#features-maintenance7) feature is not enabled
or the [    `robustFragmentShadingRateAttachmentAccess`](../../../../spec/latest/chapters/limits.html#limits-robustFragmentShadingRateAttachmentAccess) limit is
[VK_FALSE](VK_FALSE.html) or the `imageView` member of a
[VkRenderingFragmentShadingRateAttachmentInfoKHR](VkRenderingFragmentShadingRateAttachmentInfoKHR.html) structure was
created with [VkImageSubresourceRange](VkImageSubresourceRange.html)::`baseMipLevel` greater
than 0,
the `pNext` chain does not contain
[VkDeviceGroupRenderPassBeginInfo](VkDeviceGroupRenderPassBeginInfo.html) or its
`deviceRenderAreaCount` member is equal to 0 and
the `imageView` member of a
[VkRenderingFragmentShadingRateAttachmentInfoKHR](VkRenderingFragmentShadingRateAttachmentInfoKHR.html) structure included
in the `pNext` chain is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `imageView`
**must** have a height greater than or equal to
  

[](#VUID-VkRenderingInfo-pNext-06120) VUID-VkRenderingInfo-pNext-06120

If
the [`maintenance7`](../../../../spec/latest/chapters/features.html#features-maintenance7) feature is not enabled
or the [    `robustFragmentShadingRateAttachmentAccess`](../../../../spec/latest/chapters/limits.html#limits-robustFragmentShadingRateAttachmentAccess) limit is
[VK_FALSE](VK_FALSE.html) or the `imageView` member of a
[VkRenderingFragmentShadingRateAttachmentInfoKHR](VkRenderingFragmentShadingRateAttachmentInfoKHR.html) structure was
created with [VkImageSubresourceRange](VkImageSubresourceRange.html)::`baseMipLevel` greater
than 0,
the `pNext` chain contains a [VkDeviceGroupRenderPassBeginInfo](VkDeviceGroupRenderPassBeginInfo.html)
structure, its `deviceRenderAreaCount` member is not 0, and the
`imageView` member of a
[VkRenderingFragmentShadingRateAttachmentInfoKHR](VkRenderingFragmentShadingRateAttachmentInfoKHR.html) structure included
in the `pNext` chain is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `imageView`
**must** have a width greater than or equal to
  
for each element of `pDeviceRenderAreas`

[](#VUID-VkRenderingInfo-pNext-06122) VUID-VkRenderingInfo-pNext-06122

If
the [`maintenance7`](../../../../spec/latest/chapters/features.html#features-maintenance7) feature is not enabled
or the [    `robustFragmentShadingRateAttachmentAccess`](../../../../spec/latest/chapters/limits.html#limits-robustFragmentShadingRateAttachmentAccess) limit is
[VK_FALSE](VK_FALSE.html) or the `imageView` member of a
[VkRenderingFragmentShadingRateAttachmentInfoKHR](VkRenderingFragmentShadingRateAttachmentInfoKHR.html) structure was
created with [VkImageSubresourceRange](VkImageSubresourceRange.html)::`baseMipLevel` greater
than 0,
the `pNext` chain contains a [VkDeviceGroupRenderPassBeginInfo](VkDeviceGroupRenderPassBeginInfo.html)
structure, its `deviceRenderAreaCount` member is not 0, and the
`imageView` member of a
[VkRenderingFragmentShadingRateAttachmentInfoKHR](VkRenderingFragmentShadingRateAttachmentInfoKHR.html) structure included
in the `pNext` chain is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `imageView`
**must** have a height greater than or equal to
  
for each element of `pDeviceRenderAreas`

[](#VUID-VkRenderingInfo-imageView-06123) VUID-VkRenderingInfo-imageView-06123

If the `imageView` member of a
[VkRenderingFragmentShadingRateAttachmentInfoKHR](VkRenderingFragmentShadingRateAttachmentInfoKHR.html) structure included
in the `pNext` chain is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and `viewMask`
is `0`, `imageView` **must** have a `layerCount` that is either
equal to `1` or greater than or equal to
`VkRenderingInfo`::`layerCount`

[](#VUID-VkRenderingInfo-imageView-06124) VUID-VkRenderingInfo-imageView-06124

If the `imageView` member of a
[VkRenderingFragmentShadingRateAttachmentInfoKHR](VkRenderingFragmentShadingRateAttachmentInfoKHR.html) structure included
in the `pNext` chain is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and `viewMask`
is not `0`, `imageView` **must** have a `layerCount` that is either
equal to `1` or greater than the index of the most significant bit in
`viewMask`

[](#VUID-VkRenderingInfo-imageView-06125) VUID-VkRenderingInfo-imageView-06125

If the `imageView` member of a
[VkRenderingFragmentShadingRateAttachmentInfoKHR](VkRenderingFragmentShadingRateAttachmentInfoKHR.html) structure included
in the `pNext` chain is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), it **must** not be
equal to the `imageView` or `resolveImageView` member of
`pDepthAttachment`, `pStencilAttachment`, or any element of
`pColorAttachments`

[](#VUID-VkRenderingInfo-imageView-06126) VUID-VkRenderingInfo-imageView-06126

If the `imageView` member of a
[VkRenderingFragmentShadingRateAttachmentInfoKHR](VkRenderingFragmentShadingRateAttachmentInfoKHR.html) structure included
in the `pNext` chain is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), it **must** not be
equal to the `imageView` member of a
[VkRenderingFragmentDensityMapAttachmentInfoEXT](VkRenderingFragmentDensityMapAttachmentInfoEXT.html) structure included
in the `pNext` chain

[](#VUID-VkRenderingInfo-multiview-06127) VUID-VkRenderingInfo-multiview-06127

If the [`multiview`](../../../../spec/latest/chapters/features.html#features-multiview) feature is not enabled,
`viewMask` **must** be `0`

[](#VUID-VkRenderingInfo-viewMask-06128) VUID-VkRenderingInfo-viewMask-06128

The index of the most significant bit in `viewMask` **must** be less
than [`maxMultiviewViewCount`](../../../../spec/latest/chapters/devsandqueues.html#limits-maxMultiviewViewCount)

[](#VUID-VkRenderingInfo-perViewRenderAreaCount-07857) VUID-VkRenderingInfo-perViewRenderAreaCount-07857

If the `perViewRenderAreaCount` member of a
[VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM](VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM.html) structure
included in the `pNext` chain is not `0`, then the
[    `multiviewPerViewRenderAreas`](../../../../spec/latest/chapters/features.html#features-multiviewPerViewRenderAreas) feature **must** be enabled

[](#VUID-VkRenderingInfo-perViewRenderAreaCount-07858) VUID-VkRenderingInfo-perViewRenderAreaCount-07858

If the `perViewRenderAreaCount` member of a
[VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM](VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM.html) structure
included in the `pNext` chain is not `0`, then `renderArea`
**must** specify a render area that includes the union of all per view
render areas

[](#VUID-VkRenderingInfo-None-09044) VUID-VkRenderingInfo-None-09044

Valid attachments specified by this structure **must** not be bound to
memory locations that are bound to any other valid attachments specified
by this structure

[](#VUID-VkRenderingInfo-flags-10012) VUID-VkRenderingInfo-flags-10012

If `flags` includes [VK_RENDERING_CONTENTS_INLINE_BIT_KHR](VkRenderingFlagBits.html) then
at least one of the following features **must** be enabled

* 
[`maintenance7`](../../../../spec/latest/chapters/features.html#features-maintenance7)

* 
[`nestedCommandBuffer`](../../../../spec/latest/chapters/features.html#features-nestedCommandBuffer)

[](#VUID-VkRenderingInfo-pDepthAttachment-09318) VUID-VkRenderingInfo-pDepthAttachment-09318

`pDepthAttachment->resolveMode` **must** not be
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](VkResolveModeFlagBits.html)

[](#VUID-VkRenderingInfo-pStencilAttachment-09319) VUID-VkRenderingInfo-pStencilAttachment-09319

`pStencilAttachment->resolveMode` **must** not be
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](VkResolveModeFlagBits.html)

[](#VUID-VkRenderingInfo-colorAttachmentCount-09320) VUID-VkRenderingInfo-colorAttachmentCount-09320

If `colorAttachmentCount` is not `1`, the `resolveMode` member
of any element of `pColorAttachments` **must** not be
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](VkResolveModeFlagBits.html)

[](#VUID-VkRenderingInfo-resolveMode-09321) VUID-VkRenderingInfo-resolveMode-09321

If the `resolveMode` of any element of `pColorAttachments` is
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](VkResolveModeFlagBits.html),
[VkRenderingFragmentDensityMapAttachmentInfoEXT](VkRenderingFragmentDensityMapAttachmentInfoEXT.html)::`imageView`
**must** be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

[](#VUID-VkRenderingInfo-resolveMode-09322) VUID-VkRenderingInfo-resolveMode-09322

If the `resolveMode` of any element of `pColorAttachments` is
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](VkResolveModeFlagBits.html),
[VkRenderingFragmentShadingRateAttachmentInfoKHR](VkRenderingFragmentShadingRateAttachmentInfoKHR.html)::`imageView`
**must** be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

[](#VUID-VkRenderingInfo-pNext-09535) VUID-VkRenderingInfo-pNext-09535

If the `pNext` chain contains a [VkRenderPassStripeBeginInfoARM](VkRenderPassStripeBeginInfoARM.html)
structure, the union of stripe areas defined by the elements of
[VkRenderPassStripeBeginInfoARM](VkRenderPassStripeBeginInfoARM.html)::`pStripeInfos` **must** cover the
`renderArea`

[](#VUID-VkRenderingInfo-colorAttachmentCount-09479) VUID-VkRenderingInfo-colorAttachmentCount-09479

If `colorAttachmentCount` is not `0` and the `imageView` member
of an element of `pColorAttachments` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
that `imageView` **must** have been created with the
[identity swizzle](../../../../spec/latest/chapters/resources.html#resources-image-views-identity-mappings)

[](#VUID-VkRenderingInfo-colorAttachmentCount-09480) VUID-VkRenderingInfo-colorAttachmentCount-09480

If `colorAttachmentCount` is not `0`, and there is an element of
`pColorAttachments` with
either its `resolveMode` member set to
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](VkResolveModeFlagBits.html), or
its `imageView` member not set to [VK_NULL_HANDLE](VK_NULL_HANDLE.html) and its
`resolveMode` member not set to [VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html), the
`resolveImageView` member of that element of `pColorAttachments`
**must** have been created with the
[identity swizzle](../../../../spec/latest/chapters/resources.html#resources-image-views-identity-mappings)

[](#VUID-VkRenderingInfo-pDepthAttachment-09481) VUID-VkRenderingInfo-pDepthAttachment-09481

If `pDepthAttachment` is not `NULL` and
`pDepthAttachment->imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`pDepthAttachment->imageView` **must** have been created with the
[identity swizzle](../../../../spec/latest/chapters/resources.html#resources-image-views-identity-mappings)

[](#VUID-VkRenderingInfo-pDepthAttachment-09482) VUID-VkRenderingInfo-pDepthAttachment-09482

If `pDepthAttachment` is not `NULL`,
`pDepthAttachment->imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and
`pDepthAttachment->resolveMode` is not [VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html),
`pDepthAttachment->resolveImageView` **must** have been created with
the [identity swizzle](../../../../spec/latest/chapters/resources.html#resources-image-views-identity-mappings)

[](#VUID-VkRenderingInfo-pStencilAttachment-09483) VUID-VkRenderingInfo-pStencilAttachment-09483

If `pStencilAttachment` is not `NULL` and
`pStencilAttachment->imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`pStencilAttachment->imageView` **must** have been created with the
[identity swizzle](../../../../spec/latest/chapters/resources.html#resources-image-views-identity-mappings)

[](#VUID-VkRenderingInfo-pStencilAttachment-09484) VUID-VkRenderingInfo-pStencilAttachment-09484

If `pStencilAttachment` is not `NULL`,
`pStencilAttachment->imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), and
`pStencilAttachment->resolveMode` is not [VK_RESOLVE_MODE_NONE](VkResolveModeFlagBits.html),
`pStencilAttachment->resolveImageView` **must** have been created with
the [identity swizzle](../../../../spec/latest/chapters/resources.html#resources-image-views-identity-mappings)

[](#VUID-VkRenderingInfo-imageView-09485) VUID-VkRenderingInfo-imageView-09485

If the `imageView` member of a
[VkRenderingFragmentShadingRateAttachmentInfoKHR](VkRenderingFragmentShadingRateAttachmentInfoKHR.html) structure included
in the `pNext` chain is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), it **must** have been
created with the [identity    swizzle](../../../../spec/latest/chapters/resources.html#resources-image-views-identity-mappings)

[](#VUID-VkRenderingInfo-imageView-09486) VUID-VkRenderingInfo-imageView-09486

If the `imageView` member of a
[VkRenderingFragmentDensityMapAttachmentInfoEXT](VkRenderingFragmentDensityMapAttachmentInfoEXT.html) structure included
in the `pNext` chain is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), it **must** have been
created with the [identity    swizzle](../../../../spec/latest/chapters/resources.html#resources-image-views-identity-mappings)

[](#VUID-VkRenderingInfo-imageView-10643) VUID-VkRenderingInfo-imageView-10643

If the `imageView` member of a
[VkRenderingFragmentDensityMapAttachmentInfoEXT](VkRenderingFragmentDensityMapAttachmentInfoEXT.html) structure included
in the `pNext` chain is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
[VK_TILE_SHADING_RENDER_PASS_ENABLE_BIT_QCOM](VkTileShadingRenderPassFlagBitsQCOM.html) **must** not be included
in [VkRenderPassTileShadingCreateInfoQCOM](VkRenderPassTileShadingCreateInfoQCOM.html)::`flags`

[](#VUID-VkRenderingInfo-resolveMode-10644) VUID-VkRenderingInfo-resolveMode-10644

If the `resolveMode` of any element of `pColorAttachments` is
[VK_RESOLVE_MODE_EXTERNAL_FORMAT_DOWNSAMPLE_BIT_ANDROID](VkResolveModeFlagBits.html),
[VK_TILE_SHADING_RENDER_PASS_ENABLE_BIT_QCOM](VkTileShadingRenderPassFlagBitsQCOM.html) **must** not be included
in [VkRenderPassTileShadingCreateInfoQCOM](VkRenderPassTileShadingCreateInfoQCOM.html)::`flags`

Valid Usage (Implicit)

* 
[](#VUID-VkRenderingInfo-sType-sType) VUID-VkRenderingInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDERING_INFO](VkStructureType.html)

* 
[](#VUID-VkRenderingInfo-pNext-pNext) VUID-VkRenderingInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkDeviceGroupRenderPassBeginInfo](VkDeviceGroupRenderPassBeginInfo.html), [VkMultisampledRenderToSingleSampledInfoEXT](VkMultisampledRenderToSingleSampledInfoEXT.html), [VkMultiviewPerViewAttributesInfoNVX](VkMultiviewPerViewAttributesInfoNVX.html), [VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM](VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM.html), [VkRenderPassPerformanceCountersByRegionBeginInfoARM](VkRenderPassPerformanceCountersByRegionBeginInfoARM.html), [VkRenderPassStripeBeginInfoARM](VkRenderPassStripeBeginInfoARM.html), [VkRenderPassTileShadingCreateInfoQCOM](VkRenderPassTileShadingCreateInfoQCOM.html), [VkRenderingFragmentDensityMapAttachmentInfoEXT](VkRenderingFragmentDensityMapAttachmentInfoEXT.html), [VkRenderingFragmentShadingRateAttachmentInfoKHR](VkRenderingFragmentShadingRateAttachmentInfoKHR.html), or [VkTileMemorySizeInfoQCOM](VkTileMemorySizeInfoQCOM.html)

* 
[](#VUID-VkRenderingInfo-sType-unique) VUID-VkRenderingInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkRenderingInfo-flags-parameter) VUID-VkRenderingInfo-flags-parameter

 `flags` **must** be a valid combination of [VkRenderingFlagBits](VkRenderingFlagBits.html) values

* 
[](#VUID-VkRenderingInfo-pColorAttachments-parameter) VUID-VkRenderingInfo-pColorAttachments-parameter

 If `colorAttachmentCount` is not `0`, `pColorAttachments` **must** be a valid pointer to an array of `colorAttachmentCount` valid [VkRenderingAttachmentInfo](VkRenderingAttachmentInfo.html) structures

* 
[](#VUID-VkRenderingInfo-pDepthAttachment-parameter) VUID-VkRenderingInfo-pDepthAttachment-parameter

 If `pDepthAttachment` is not `NULL`, `pDepthAttachment` **must** be a valid pointer to a valid [VkRenderingAttachmentInfo](VkRenderingAttachmentInfo.html) structure

* 
[](#VUID-VkRenderingInfo-pStencilAttachment-parameter) VUID-VkRenderingInfo-pStencilAttachment-parameter

 If `pStencilAttachment` is not `NULL`, `pStencilAttachment` **must** be a valid pointer to a valid [VkRenderingAttachmentInfo](VkRenderingAttachmentInfo.html) structure

[VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html), [VK_QCOM_tile_properties](VK_QCOM_tile_properties.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkRect2D](VkRect2D.html), [VkRenderingAttachmentInfo](VkRenderingAttachmentInfo.html), [VkRenderingFlags](VkRenderingFlags.html), [VkStructureType](VkStructureType.html), [vkCmdBeginRendering](vkCmdBeginRendering.html), [vkCmdBeginRendering](vkCmdBeginRendering.html), [vkGetDynamicRenderingTilePropertiesQCOM](vkGetDynamicRenderingTilePropertiesQCOM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkRenderingInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
