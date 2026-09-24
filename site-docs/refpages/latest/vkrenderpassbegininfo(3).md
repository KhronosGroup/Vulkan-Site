# VkRenderPassBeginInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRenderPassBeginInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRenderPassBeginInfo - Structure specifying render pass begin information

The `VkRenderPassBeginInfo` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_0
typedef struct VkRenderPassBeginInfo {
    VkStructureType        sType;
    const void*            pNext;
    VkRenderPass           renderPass;
    VkFramebuffer          framebuffer;
    VkRect2D               renderArea;
    uint32_t               clearValueCount;
    const VkClearValue*    pClearValues;
} VkRenderPassBeginInfo;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`renderPass` is the render pass to begin an instance of.

* 
`framebuffer` is the framebuffer containing the attachments that are
used with the render pass.

* 
`renderArea` is the render area that is affected by the render pass
instance, and is described in more detail below.

* 
`clearValueCount` is the number of elements in `pClearValues`.

* 
`pClearValues` is a pointer to an array of `clearValueCount`
[VkClearValue](VkClearValue.html) structures containing clear values for each
attachment, if the attachment uses a `loadOp` value of
[VK_ATTACHMENT_LOAD_OP_CLEAR](VkAttachmentLoadOp.html) or if the attachment has a
depth/stencil format and uses a `stencilLoadOp` value of
[VK_ATTACHMENT_LOAD_OP_CLEAR](VkAttachmentLoadOp.html).
The array is indexed by attachment number.
Only elements corresponding to cleared attachments are used.
Other elements of `pClearValues` are ignored.

`renderArea` is the render area that is affected by the render pass
instance.
The effects of attachment load, store, and multisample resolve operations
are restricted to the pixels whose x and y coordinates fall within the
render area on all attachments.
The render area extends to all layers of `framebuffer`.
The application **must** ensure (using scissor if necessary) that all rendering
is contained within the render area.
The render area, after any transform specified by
[VkRenderPassTransformBeginInfoQCOM](VkRenderPassTransformBeginInfoQCOM.html)::`transform` is applied, **must**
be contained within the framebuffer dimensions.

If [render pass transform](../../../../spec/latest/chapters/vertexpostproc.html#vertexpostproc-renderpass-transform) is
enabled, then `renderArea` **must** equal the framebuffer pre-transformed
dimensions.
After `renderArea` has been transformed by
[VkRenderPassTransformBeginInfoQCOM](VkRenderPassTransformBeginInfoQCOM.html)::`transform`, the resulting
render area **must** be equal to the framebuffer dimensions.

If multiview is enabled in `renderPass`, and
[`multiviewPerViewRenderAreas`](../../../../spec/latest/chapters/features.html#features-multiviewPerViewRenderAreas)
feature is enabled, and there is an instance of
[VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM](VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM.html) included in the
`pNext` chain with `perViewRenderAreaCount` not equal to `0`, then
the elements of
[VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM](VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM.html)::`pPerViewRenderAreas`
override `renderArea` and define a render area for each view.
In this case, `renderArea` **must** be an area at least as large as the
union of all the per-view render areas.

If the [`subpassShading`](../../../../spec/latest/chapters/features.html#features-subpassShading) feature is enabled,
then `renderArea` **must** equal the framebuffer dimensions.

|  | There **may** be a performance cost for using a render area smaller than the
| --- | --- |
framebuffer, unless it matches the render area granularity for the render
pass. |

Valid Usage

* 
[](#VUID-VkRenderPassBeginInfo-clearValueCount-00902) VUID-VkRenderPassBeginInfo-clearValueCount-00902

`clearValueCount` **must** be greater than the largest attachment index
in `renderPass` specifying a `loadOp` (or `stencilLoadOp`,
if the attachment has a depth/stencil format) of
[VK_ATTACHMENT_LOAD_OP_CLEAR](VkAttachmentLoadOp.html)

* 
[](#VUID-VkRenderPassBeginInfo-clearValueCount-04962) VUID-VkRenderPassBeginInfo-clearValueCount-04962

If `clearValueCount` is not `0`, `pClearValues` **must** be a valid
pointer to an array of `clearValueCount` [VkClearValue](VkClearValue.html) unions

* 
[](#VUID-VkRenderPassBeginInfo-renderPass-00904) VUID-VkRenderPassBeginInfo-renderPass-00904

`renderPass` **must** be [compatible](../../../../spec/latest/chapters/renderpass.html#renderpass-compatibility) with
the `renderPass` member of the [VkFramebufferCreateInfo](VkFramebufferCreateInfo.html)
structure specified when creating `framebuffer`

* 
[](#VUID-VkRenderPassBeginInfo-None-08996) VUID-VkRenderPassBeginInfo-None-08996

If the `pNext` chain does not contain
[VkDeviceGroupRenderPassBeginInfo](VkDeviceGroupRenderPassBeginInfo.html) or its
`deviceRenderAreaCount` member is equal to 0,
`renderArea.extent.width` **must** be greater than 0

* 
[](#VUID-VkRenderPassBeginInfo-None-08997) VUID-VkRenderPassBeginInfo-None-08997

If the `pNext` chain does not contain
[VkDeviceGroupRenderPassBeginInfo](VkDeviceGroupRenderPassBeginInfo.html) or its
`deviceRenderAreaCount` member is equal to 0,
`renderArea.extent.height` **must** be greater than 0

* 
[](#VUID-VkRenderPassBeginInfo-pNext-02850) VUID-VkRenderPassBeginInfo-pNext-02850

If the `pNext` chain does not contain
[VkDeviceGroupRenderPassBeginInfo](VkDeviceGroupRenderPassBeginInfo.html) or its
`deviceRenderAreaCount` member is equal to 0,
`renderArea.offset.x` **must** be greater than or equal to 0

* 
[](#VUID-VkRenderPassBeginInfo-pNext-02851) VUID-VkRenderPassBeginInfo-pNext-02851

If the `pNext` chain does not contain
[VkDeviceGroupRenderPassBeginInfo](VkDeviceGroupRenderPassBeginInfo.html) or its
`deviceRenderAreaCount` member is equal to 0,
`renderArea.offset.y` **must** be greater than or equal to 0

* 
[](#VUID-VkRenderPassBeginInfo-pNext-02852) VUID-VkRenderPassBeginInfo-pNext-02852

If the `pNext` chain does not contain
[VkDeviceGroupRenderPassBeginInfo](VkDeviceGroupRenderPassBeginInfo.html) or its
`deviceRenderAreaCount` member is equal to 0,
`renderArea.offset.x` +  `renderArea.extent.width`
**must** be less than or equal to
[VkFramebufferCreateInfo](VkFramebufferCreateInfo.html)::`width` the `framebuffer` was
created with

* 
[](#VUID-VkRenderPassBeginInfo-pNext-02853) VUID-VkRenderPassBeginInfo-pNext-02853

If the `pNext` chain does not contain
[VkDeviceGroupRenderPassBeginInfo](VkDeviceGroupRenderPassBeginInfo.html) or its
`deviceRenderAreaCount` member is equal to 0,
`renderArea.offset.y` +  `renderArea.extent.height`
**must** be less than or equal to
[VkFramebufferCreateInfo](VkFramebufferCreateInfo.html)::`height` the `framebuffer` was
created with

* 
[](#VUID-VkRenderPassBeginInfo-pNext-02856) VUID-VkRenderPassBeginInfo-pNext-02856

If the `pNext` chain contains
[VkDeviceGroupRenderPassBeginInfo](VkDeviceGroupRenderPassBeginInfo.html), `offset.x` + 
`extent.width` of each element of `pDeviceRenderAreas` **must** be
less than or equal to [VkFramebufferCreateInfo](VkFramebufferCreateInfo.html)::`width` the
`framebuffer` was created with

* 
[](#VUID-VkRenderPassBeginInfo-pNext-02857) VUID-VkRenderPassBeginInfo-pNext-02857

If the `pNext` chain contains
[VkDeviceGroupRenderPassBeginInfo](VkDeviceGroupRenderPassBeginInfo.html), `offset.y` + 
`extent.height` of each element of `pDeviceRenderAreas` **must**
be less than or equal to [VkFramebufferCreateInfo](VkFramebufferCreateInfo.html)::`height` the
`framebuffer` was created with

* 
[](#VUID-VkRenderPassBeginInfo-framebuffer-03207) VUID-VkRenderPassBeginInfo-framebuffer-03207

If `framebuffer` was created with a
[VkFramebufferCreateInfo](VkFramebufferCreateInfo.html)::`flags` value that did not include
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](VkFramebufferCreateFlagBits.html), and the `pNext` chain
includes a [VkRenderPassAttachmentBeginInfo](VkRenderPassAttachmentBeginInfo.html) structure, its
`attachmentCount` **must** be zero

* 
[](#VUID-VkRenderPassBeginInfo-framebuffer-03208) VUID-VkRenderPassBeginInfo-framebuffer-03208

If `framebuffer` was created with a
[VkFramebufferCreateInfo](VkFramebufferCreateInfo.html)::`flags` value that included
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](VkFramebufferCreateFlagBits.html), the `attachmentCount` of
a [VkRenderPassAttachmentBeginInfo](VkRenderPassAttachmentBeginInfo.html) structure included in the
`pNext` chain **must** be equal to the value of
[VkFramebufferAttachmentsCreateInfo](VkFramebufferAttachmentsCreateInfo.html)::`attachmentImageInfoCount`
used to create `framebuffer`

* 
[](#VUID-VkRenderPassBeginInfo-framebuffer-02780) VUID-VkRenderPassBeginInfo-framebuffer-02780

If `framebuffer` was created with a
[VkFramebufferCreateInfo](VkFramebufferCreateInfo.html)::`flags` value that included
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](VkFramebufferCreateFlagBits.html), each element of the
`pAttachments` member of a [VkRenderPassAttachmentBeginInfo](VkRenderPassAttachmentBeginInfo.html)
structure included in the `pNext` chain **must** have been created on
the same [VkDevice](VkDevice.html) as `framebuffer` and `renderPass`

* 
[](#VUID-VkRenderPassBeginInfo-framebuffer-03209) VUID-VkRenderPassBeginInfo-framebuffer-03209

If `framebuffer` was created with a
[VkFramebufferCreateInfo](VkFramebufferCreateInfo.html)::`flags` value that included
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](VkFramebufferCreateFlagBits.html), each element of the
`pAttachments` member of a [VkRenderPassAttachmentBeginInfo](VkRenderPassAttachmentBeginInfo.html)
structure included in the `pNext` chain **must** be a [VkImageView](VkImageView.html)
of an image created with a value of [VkImageCreateInfo](VkImageCreateInfo.html)::`flags`
equal to the `flags` member of the corresponding element of
[VkFramebufferAttachmentsCreateInfo](VkFramebufferAttachmentsCreateInfo.html)::`pAttachmentImageInfos`
used to create `framebuffer`

* 
[](#VUID-VkRenderPassBeginInfo-framebuffer-12328) VUID-VkRenderPassBeginInfo-framebuffer-12328

If `framebuffer` was created with a
[VkFramebufferCreateInfo](VkFramebufferCreateInfo.html)::`flags` value that included
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](VkFramebufferCreateFlagBits.html), each `pAttachments`
member of [VkRenderPassAttachmentBeginInfo](VkRenderPassAttachmentBeginInfo.html) that is used as a
resolve attachment by `renderPass` **must** not be bound to a
`VkDeviceMemory` object allocated from a `VkMemoryHeap` with the
[VK_MEMORY_HEAP_TILE_MEMORY_BIT_QCOM](VkMemoryHeapFlagBits.html) property

* 
[](#VUID-VkRenderPassBeginInfo-framebuffer-04627) VUID-VkRenderPassBeginInfo-framebuffer-04627

If `framebuffer` was created with a
[VkFramebufferCreateInfo](VkFramebufferCreateInfo.html)::`flags` value that included
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](VkFramebufferCreateFlagBits.html), each element of the
`pAttachments` member of a [VkRenderPassAttachmentBeginInfo](VkRenderPassAttachmentBeginInfo.html)
structure included in the `pNext` chain **must** be a [VkImageView](VkImageView.html)
with [an inherited usage](../../../../spec/latest/chapters/resources.html#resources-image-inherited-usage) equal to
the `usage` member of the corresponding element of
[VkFramebufferAttachmentsCreateInfo](VkFramebufferAttachmentsCreateInfo.html)::`pAttachmentImageInfos`
used to create `framebuffer`

* 
[](#VUID-VkRenderPassBeginInfo-framebuffer-03211) VUID-VkRenderPassBeginInfo-framebuffer-03211

If `framebuffer` was created with a
[VkFramebufferCreateInfo](VkFramebufferCreateInfo.html)::`flags` value that included
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](VkFramebufferCreateFlagBits.html), each element of the
`pAttachments` member of a [VkRenderPassAttachmentBeginInfo](VkRenderPassAttachmentBeginInfo.html)
structure included in the `pNext` chain **must** be a [VkImageView](VkImageView.html)
with a width equal to the `width` member of the corresponding
element of
[VkFramebufferAttachmentsCreateInfo](VkFramebufferAttachmentsCreateInfo.html)::`pAttachmentImageInfos`
used to create `framebuffer`

* 
[](#VUID-VkRenderPassBeginInfo-framebuffer-03212) VUID-VkRenderPassBeginInfo-framebuffer-03212

If `framebuffer` was created with a
[VkFramebufferCreateInfo](VkFramebufferCreateInfo.html)::`flags` value that included
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](VkFramebufferCreateFlagBits.html), each element of the
`pAttachments` member of a [VkRenderPassAttachmentBeginInfo](VkRenderPassAttachmentBeginInfo.html)
structure included in the `pNext` chain **must** be a [VkImageView](VkImageView.html)
with a height equal to the `height` member of the corresponding
element of
[VkFramebufferAttachmentsCreateInfo](VkFramebufferAttachmentsCreateInfo.html)::`pAttachmentImageInfos`
used to create `framebuffer`

* 
[](#VUID-VkRenderPassBeginInfo-framebuffer-03213) VUID-VkRenderPassBeginInfo-framebuffer-03213

If `framebuffer` was created with a
[VkFramebufferCreateInfo](VkFramebufferCreateInfo.html)::`flags` value that included
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](VkFramebufferCreateFlagBits.html), each element of the
`pAttachments` member of a [VkRenderPassAttachmentBeginInfo](VkRenderPassAttachmentBeginInfo.html)
structure included in the `pNext` chain **must** be a [VkImageView](VkImageView.html)
of an image created with a value of
[VkImageViewCreateInfo](VkImageViewCreateInfo.html)::`subresourceRange.layerCount` equal to
the `layerCount` member of the corresponding element of
[VkFramebufferAttachmentsCreateInfo](VkFramebufferAttachmentsCreateInfo.html)::`pAttachmentImageInfos`
used to create `framebuffer`

* 
[](#VUID-VkRenderPassBeginInfo-framebuffer-03214) VUID-VkRenderPassBeginInfo-framebuffer-03214

If `framebuffer` was created with a
[VkFramebufferCreateInfo](VkFramebufferCreateInfo.html)::`flags` value that included
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](VkFramebufferCreateFlagBits.html), each element of the
`pAttachments` member of a [VkRenderPassAttachmentBeginInfo](VkRenderPassAttachmentBeginInfo.html)
structure included in the `pNext` chain **must** be a [VkImageView](VkImageView.html)
of an image created with a value of
[VkImageFormatListCreateInfo](VkImageFormatListCreateInfo.html)::`viewFormatCount` equal to the
`viewFormatCount` member of the corresponding element of
[VkFramebufferAttachmentsCreateInfo](VkFramebufferAttachmentsCreateInfo.html)::`pAttachmentImageInfos`
used to create `framebuffer`

* 
[](#VUID-VkRenderPassBeginInfo-framebuffer-03215) VUID-VkRenderPassBeginInfo-framebuffer-03215

If `framebuffer` was created with a
[VkFramebufferCreateInfo](VkFramebufferCreateInfo.html)::`flags` value that included
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](VkFramebufferCreateFlagBits.html), each element of the
`pAttachments` member of a [VkRenderPassAttachmentBeginInfo](VkRenderPassAttachmentBeginInfo.html)
structure included in the `pNext` chain **must** be a [VkImageView](VkImageView.html)
of an image created with a set of elements in
[VkImageFormatListCreateInfo](VkImageFormatListCreateInfo.html)::`pViewFormats` equal to the set
of elements in the `pViewFormats` member of the corresponding
element of
[VkFramebufferAttachmentsCreateInfo](VkFramebufferAttachmentsCreateInfo.html)::`pAttachmentImageInfos`
used to create `framebuffer`

* 
[](#VUID-VkRenderPassBeginInfo-framebuffer-03216) VUID-VkRenderPassBeginInfo-framebuffer-03216

If `framebuffer` was created with a
[VkFramebufferCreateInfo](VkFramebufferCreateInfo.html)::`flags` value that included
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](VkFramebufferCreateFlagBits.html), each element of the
`pAttachments` member of a [VkRenderPassAttachmentBeginInfo](VkRenderPassAttachmentBeginInfo.html)
structure included in the `pNext` chain **must** be a [VkImageView](VkImageView.html)
of an image created with a value of
[VkImageViewCreateInfo](VkImageViewCreateInfo.html)::`format` equal to the corresponding
value of [VkAttachmentDescription](VkAttachmentDescription.html)::`format` in `renderPass`

* 
[](#VUID-VkRenderPassBeginInfo-framebuffer-09353) VUID-VkRenderPassBeginInfo-framebuffer-09353

If `framebuffer` was created with a
[VkFramebufferCreateInfo](VkFramebufferCreateInfo.html)::`flags` value that included
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](VkFramebufferCreateFlagBits.html), and the
[    `nullColorAttachmentWithExternalFormatResolve`](../../../../spec/latest/chapters/limits.html#limits-nullColorAttachmentWithExternalFormatResolve) is [VK_FALSE](VK_FALSE.html),
the format of the color attachment for each subpass that includes an
external format image as a resolve attachment **must** have a format equal
to the value of
[VkAndroidHardwareBufferFormatResolvePropertiesANDROID](VkAndroidHardwareBufferFormatResolvePropertiesANDROID.html)::`colorAttachmentFormat`
as returned by a call to
[vkGetAndroidHardwareBufferPropertiesANDROID](vkGetAndroidHardwareBufferPropertiesANDROID.html) for the Android
hardware buffer that was used to create the image view use as its
resolve attachment

* 
[](#VUID-VkRenderPassBeginInfo-framebuffer-09354) VUID-VkRenderPassBeginInfo-framebuffer-09354

If `framebuffer` was created with a
[VkFramebufferCreateInfo](VkFramebufferCreateInfo.html)::`flags` value that included
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](VkFramebufferCreateFlagBits.html), each element of the
`pAttachments` member of a [VkRenderPassAttachmentBeginInfo](VkRenderPassAttachmentBeginInfo.html)
structure included in the `pNext` chain **must** be a [VkImageView](VkImageView.html)
of an image created with a value of
[VkExternalFormatANDROID](VkExternalFormatANDROID.html)::`externalFormat` equal to
[VkExternalFormatANDROID](VkExternalFormatANDROID.html)::`externalFormat` in the `pNext`
chain of the corresponding [VkAttachmentDescription2](VkAttachmentDescription2.html) structure used
to create `renderPass`

* 
[](#VUID-VkRenderPassBeginInfo-framebuffer-09047) VUID-VkRenderPassBeginInfo-framebuffer-09047

If `framebuffer` was created with a
[VkFramebufferCreateInfo](VkFramebufferCreateInfo.html)::`flags` value that included
[VK_FRAMEBUFFER_CREATE_IMAGELESS_BIT](VkFramebufferCreateFlagBits.html), each element of the
`pAttachments` member of a [VkRenderPassAttachmentBeginInfo](VkRenderPassAttachmentBeginInfo.html)
structure included in the `pNext` chain **must** be a [VkImageView](VkImageView.html)
of an image created with a value of
[VkImageCreateInfo](VkImageCreateInfo.html)::`samples` equal to the corresponding value
of [VkAttachmentDescription](VkAttachmentDescription.html)::`samples` in `renderPass`
, or [VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html) if `renderPass` was created with
[VkMultisampledRenderToSingleSampledInfoEXT](VkMultisampledRenderToSingleSampledInfoEXT.html) structure in the
`pNext` chain with `multisampledRenderToSingleSampledEnable`
equal to [VK_TRUE](VK_TRUE.html)

* 
[](#VUID-VkRenderPassBeginInfo-pNext-02869) VUID-VkRenderPassBeginInfo-pNext-02869

If the `pNext` chain includes
[VkRenderPassTransformBeginInfoQCOM](VkRenderPassTransformBeginInfoQCOM.html), `renderArea.offset` **must**
equal (0,0)

* 
[](#VUID-VkRenderPassBeginInfo-pNext-02870) VUID-VkRenderPassBeginInfo-pNext-02870

If the `pNext` chain includes
[VkRenderPassTransformBeginInfoQCOM](VkRenderPassTransformBeginInfoQCOM.html), `renderArea.extent`
transformed by [VkRenderPassTransformBeginInfoQCOM](VkRenderPassTransformBeginInfoQCOM.html)::`transform`
**must** equal the `framebuffer` dimensions

* 
[](#VUID-VkRenderPassBeginInfo-perViewRenderAreaCount-07859) VUID-VkRenderPassBeginInfo-perViewRenderAreaCount-07859

If the `perViewRenderAreaCount` member of a
[VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM](VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM.html) structure
included in the `pNext` chain is not `0`, then the
[    `multiviewPerViewRenderAreas`](../../../../spec/latest/chapters/features.html#features-multiviewPerViewRenderAreas) feature **must** be enabled

* 
[](#VUID-VkRenderPassBeginInfo-perViewRenderAreaCount-07860) VUID-VkRenderPassBeginInfo-perViewRenderAreaCount-07860

If the `perViewRenderAreaCount` member of a
[VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM](VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM.html) structure
included in the `pNext` chain is not `0`, then `renderArea`
**must** specify a render area that includes the union of all per view
render areas

* 
[](#VUID-VkRenderPassBeginInfo-pNext-09539) VUID-VkRenderPassBeginInfo-pNext-09539

If the `pNext` chain contains a [VkRenderPassStripeBeginInfoARM](VkRenderPassStripeBeginInfoARM.html)
structure, the union of stripe areas defined by the elements of
[VkRenderPassStripeBeginInfoARM](VkRenderPassStripeBeginInfoARM.html)::`pStripeInfos` **must** cover the
`renderArea`

Valid Usage (Implicit)

* 
[](#VUID-VkRenderPassBeginInfo-sType-sType) VUID-VkRenderPassBeginInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDER_PASS_BEGIN_INFO](VkStructureType.html)

* 
[](#VUID-VkRenderPassBeginInfo-pNext-pNext) VUID-VkRenderPassBeginInfo-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkDeviceGroupRenderPassBeginInfo](VkDeviceGroupRenderPassBeginInfo.html), [VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM](VkMultiviewPerViewRenderAreasRenderPassBeginInfoQCOM.html), [VkRenderPassAttachmentBeginInfo](VkRenderPassAttachmentBeginInfo.html), [VkRenderPassPerformanceCountersByRegionBeginInfoARM](VkRenderPassPerformanceCountersByRegionBeginInfoARM.html), [VkRenderPassSampleLocationsBeginInfoEXT](VkRenderPassSampleLocationsBeginInfoEXT.html), [VkRenderPassStripeBeginInfoARM](VkRenderPassStripeBeginInfoARM.html), or [VkRenderPassTransformBeginInfoQCOM](VkRenderPassTransformBeginInfoQCOM.html)

* 
[](#VUID-VkRenderPassBeginInfo-sType-unique) VUID-VkRenderPassBeginInfo-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkRenderPassBeginInfo-renderPass-parameter) VUID-VkRenderPassBeginInfo-renderPass-parameter

 `renderPass` **must** be a valid [VkRenderPass](VkRenderPass.html) handle

* 
[](#VUID-VkRenderPassBeginInfo-framebuffer-parameter) VUID-VkRenderPassBeginInfo-framebuffer-parameter

 `framebuffer` **must** be a valid [VkFramebuffer](VkFramebuffer.html) handle

* 
[](#VUID-VkRenderPassBeginInfo-commonparent) VUID-VkRenderPassBeginInfo-commonparent

 Both of `framebuffer`, and `renderPass` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkClearValue](VkClearValue.html), [VkFramebuffer](VkFramebuffer.html), [VkRect2D](VkRect2D.html), [VkRenderPass](VkRenderPass.html), [VkStructureType](VkStructureType.html), [vkCmdBeginRenderPass](vkCmdBeginRenderPass.html), [vkCmdBeginRenderPass2](vkCmdBeginRenderPass2.html), [vkCmdBeginRenderPass2](vkCmdBeginRenderPass2.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkRenderPassBeginInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
