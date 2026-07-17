# VkAttachmentDescription2(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkAttachmentDescription2.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkAttachmentDescription2 - Structure specifying an attachment description

The `VkAttachmentDescription2` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_2
typedef struct VkAttachmentDescription2 {
    VkStructureType                 sType;
    const void*                     pNext;
    VkAttachmentDescriptionFlags    flags;
    VkFormat                        format;
    VkSampleCountFlagBits           samples;
    VkAttachmentLoadOp              loadOp;
    VkAttachmentStoreOp             storeOp;
    VkAttachmentLoadOp              stencilLoadOp;
    VkAttachmentStoreOp             stencilStoreOp;
    VkImageLayout                   initialLayout;
    VkImageLayout                   finalLayout;
} VkAttachmentDescription2;

// Provided by VK_KHR_create_renderpass2
// Equivalent to VkAttachmentDescription2
typedef VkAttachmentDescription2 VkAttachmentDescription2KHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`flags` is a bitmask of [VkAttachmentDescriptionFlagBits](VkAttachmentDescriptionFlagBits.html)
specifying additional properties of the attachment.

* 
`format` is a [VkFormat](VkFormat.html) value specifying the format of the
image that will be used for the attachment.

* 
`samples` is a [VkSampleCountFlagBits](VkSampleCountFlagBits.html) value specifying the
number of samples of the image.

* 
`loadOp` is a [VkAttachmentLoadOp](VkAttachmentLoadOp.html) value specifying how the
contents of color and depth components of the attachment are treated at
the beginning of the subpass where it is first used.

* 
`storeOp` is a [VkAttachmentStoreOp](VkAttachmentStoreOp.html) value specifying how the
contents of color and depth components of the attachment are treated at
the end of the subpass where it is last used.

* 
`stencilLoadOp` is a [VkAttachmentLoadOp](VkAttachmentLoadOp.html) value specifying how
the contents of stencil components of the attachment are treated at the
beginning of the subpass where it is first used.

* 
`stencilStoreOp` is a [VkAttachmentStoreOp](VkAttachmentStoreOp.html) value specifying how
the contents of stencil components of the attachment are treated at the
end of the last subpass where it is used.

* 
`initialLayout` is the layout the attachment image subresource will
be in when a render pass instance begins.

* 
`finalLayout` is the layout the attachment image subresource will be
transitioned to when a render pass instance ends.

Parameters defined by this structure with the same name as those in
[VkAttachmentDescription](VkAttachmentDescription.html) have the identical effect to those parameters.

If the [`separateDepthStencilLayouts`](../../../../spec/latest/chapters/features.html#features-separateDepthStencilLayouts) feature is enabled, and `format` is
a depth/stencil format, `initialLayout` and `finalLayout` **can** be
set to a layout that only specifies the layout of the depth aspect.

If the `pNext` chain includes a
[VkAttachmentDescriptionStencilLayout](VkAttachmentDescriptionStencilLayout.html) structure, then the
`stencilInitialLayout` and `stencilFinalLayout` members specify the
initial and final layouts of the stencil aspect of a depth/stencil format,
and `initialLayout` and `finalLayout` only apply to the depth
aspect.
For depth-only formats, the [VkAttachmentDescriptionStencilLayout](VkAttachmentDescriptionStencilLayout.html)
structure is ignored.
For stencil-only formats, the initial and final layouts of the stencil
aspect are taken from the [VkAttachmentDescriptionStencilLayout](VkAttachmentDescriptionStencilLayout.html)
structure if present, or `initialLayout` and `finalLayout` if not
present.

If `format` is a depth/stencil format, and either `initialLayout` or
`finalLayout` does not specify a layout for the stencil aspect, then the
application **must** specify the initial and final layouts of the stencil
aspect by including a [VkAttachmentDescriptionStencilLayout](VkAttachmentDescriptionStencilLayout.html) structure
in the `pNext` chain.

`loadOp` and `storeOp` are ignored for fragment shading rate
attachments.
No access to the shading rate attachment is performed in `loadOp` and
`storeOp`.
Instead, access to
[VK_ACCESS_FRAGMENT_SHADING_RATE_ATTACHMENT_READ_BIT_KHR](VkAccessFlagBits.html) is performed
as fragments are rasterized.

Valid Usage

* 
[](#VUID-VkAttachmentDescription2-format-06699) VUID-VkAttachmentDescription2-format-06699

If `format` includes a color or depth component and `loadOp` is
[VK_ATTACHMENT_LOAD_OP_LOAD](VkAttachmentLoadOp.html), then `initialLayout` **must** not be
[VK_IMAGE_LAYOUT_UNDEFINED](VkImageLayout.html)

* 
[](#VUID-VkAttachmentDescription2-finalLayout-00843) VUID-VkAttachmentDescription2-finalLayout-00843

    `finalLayout` **must** not be [VK_IMAGE_LAYOUT_UNDEFINED](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_ZERO_INITIALIZED_EXT](VkImageLayout.html) or
    [VK_IMAGE_LAYOUT_PREINITIALIZED](VkImageLayout.html)

* 
[](#VUID-VkAttachmentDescription2-format-03280) VUID-VkAttachmentDescription2-format-03280

If `format` is a color format, `initialLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html)

* 
[](#VUID-VkAttachmentDescription2-format-03281) VUID-VkAttachmentDescription2-format-03281

If `format` is a depth/stencil format, `initialLayout` **must** not
be [VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](VkImageLayout.html)

* 
[](#VUID-VkAttachmentDescription2-format-03282) VUID-VkAttachmentDescription2-format-03282

If `format` is a color format, `finalLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html)

* 
[](#VUID-VkAttachmentDescription2-format-03283) VUID-VkAttachmentDescription2-format-03283

If `format` is a depth/stencil format, `finalLayout` **must** not
be [VK_IMAGE_LAYOUT_COLOR_ATTACHMENT_OPTIMAL](VkImageLayout.html)

* 
[](#VUID-VkAttachmentDescription2-format-06487) VUID-VkAttachmentDescription2-format-06487

If `format` is a color format, `initialLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html)

* 
[](#VUID-VkAttachmentDescription2-format-06488) VUID-VkAttachmentDescription2-format-06488

If `format` is a color format, `finalLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html)

* 
[](#VUID-VkAttachmentDescription2-separateDepthStencilLayouts-03284) VUID-VkAttachmentDescription2-separateDepthStencilLayouts-03284

If the [    `separateDepthStencilLayouts`](../../../../spec/latest/chapters/features.html#features-separateDepthStencilLayouts) feature is not enabled,
`initialLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html), or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html),

* 
[](#VUID-VkAttachmentDescription2-separateDepthStencilLayouts-03285) VUID-VkAttachmentDescription2-separateDepthStencilLayouts-03285

If the [    `separateDepthStencilLayouts`](../../../../spec/latest/chapters/features.html#features-separateDepthStencilLayouts) feature is not enabled,
`finalLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html), or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html),

* 
[](#VUID-VkAttachmentDescription2-format-03286) VUID-VkAttachmentDescription2-format-03286

If `format` is a color format, `initialLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html), or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html)

* 
[](#VUID-VkAttachmentDescription2-format-03287) VUID-VkAttachmentDescription2-format-03287

If `format` is a color format, `finalLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](VkImageLayout.html),
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html), or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html)

* 
[](#VUID-VkAttachmentDescription2-format-06906) VUID-VkAttachmentDescription2-format-06906

If `format` is a depth/stencil format which includes both depth and
stencil components, `initialLayout` **must** not be
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html)

* 
[](#VUID-VkAttachmentDescription2-format-06907) VUID-VkAttachmentDescription2-format-06907

If `format` is a depth/stencil format which includes both depth and
stencil components, `finalLayout` **must** not be
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html)

* 
[](#VUID-VkAttachmentDescription2-format-03290) VUID-VkAttachmentDescription2-format-03290

If `format` is a depth/stencil format which includes only the depth
component, `initialLayout` **must** not be
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html)

* 
[](#VUID-VkAttachmentDescription2-format-03291) VUID-VkAttachmentDescription2-format-03291

If `format` is a depth/stencil format which includes only the depth
component, `finalLayout` **must** not be
[VK_IMAGE_LAYOUT_STENCIL_ATTACHMENT_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](VkImageLayout.html)

* 
[](#VUID-VkAttachmentDescription2-synchronization2-06908) VUID-VkAttachmentDescription2-synchronization2-06908

If the [`synchronization2`](../../../../spec/latest/chapters/features.html#features-synchronization2) feature is
not enabled, `initialLayout` **must** not be
[VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL_KHR](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL_KHR](VkImageLayout.html)

* 
[](#VUID-VkAttachmentDescription2-synchronization2-06909) VUID-VkAttachmentDescription2-synchronization2-06909

If the [`synchronization2`](../../../../spec/latest/chapters/features.html#features-synchronization2) feature is
not enabled, `finalLayout` **must** not be
[VK_IMAGE_LAYOUT_ATTACHMENT_OPTIMAL_KHR](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL_KHR](VkImageLayout.html)

* 
[](#VUID-VkAttachmentDescription2-attachmentFeedbackLoopLayout-07309) VUID-VkAttachmentDescription2-attachmentFeedbackLoopLayout-07309

If the [    `attachmentFeedbackLoopLayout`](../../../../spec/latest/chapters/features.html#features-attachmentFeedbackLoopLayout) feature is not enabled,
`initialLayout` **must** not be
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](VkImageLayout.html)

* 
[](#VUID-VkAttachmentDescription2-attachmentFeedbackLoopLayout-07310) VUID-VkAttachmentDescription2-attachmentFeedbackLoopLayout-07310

If the [    `attachmentFeedbackLoopLayout`](../../../../spec/latest/chapters/features.html#features-attachmentFeedbackLoopLayout) feature is not enabled,
`finalLayout` **must** not be
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](VkImageLayout.html)

* 
[](#VUID-VkAttachmentDescription2-samples-08745) VUID-VkAttachmentDescription2-samples-08745

`samples` **must** be a valid [VkSampleCountFlagBits](VkSampleCountFlagBits.html) value that is
set in `imageCreateSampleCounts` (as defined in
[Image Creation Limits](../../../../spec/latest/chapters/resources.html#resources-image-creation-limits)) for the given
`format`

* 
[](#VUID-VkAttachmentDescription2-dynamicRenderingLocalRead-09544) VUID-VkAttachmentDescription2-dynamicRenderingLocalRead-09544

If the [    `dynamicRenderingLocalRead`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingLocalRead) feature is not enabled,
`initialLayout` **must** not be
[VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ](VkImageLayout.html)

* 
[](#VUID-VkAttachmentDescription2-dynamicRenderingLocalRead-09545) VUID-VkAttachmentDescription2-dynamicRenderingLocalRead-09545

If the [    `dynamicRenderingLocalRead`](../../../../spec/latest/chapters/features.html#features-dynamicRenderingLocalRead) feature is not enabled,
`finalLayout` **must** not be
[VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ](VkImageLayout.html)

* 
[](#VUID-VkAttachmentDescription2-flags-11773) VUID-VkAttachmentDescription2-flags-11773

If `flags` includes
[VK_ATTACHMENT_DESCRIPTION_RESOLVE_SKIP_TRANSFER_FUNCTION_BIT_KHR](VkAttachmentDescriptionFlagBits.html),
`flags` **must** not include
[VK_ATTACHMENT_DESCRIPTION_RESOLVE_ENABLE_TRANSFER_FUNCTION_BIT_KHR](VkAttachmentDescriptionFlagBits.html)

* 
[](#VUID-VkAttachmentDescription2-flags-11774) VUID-VkAttachmentDescription2-flags-11774

If `flags` includes
[VK_ATTACHMENT_DESCRIPTION_RESOLVE_SKIP_TRANSFER_FUNCTION_BIT_KHR](VkAttachmentDescriptionFlagBits.html)
or
[VK_ATTACHMENT_DESCRIPTION_RESOLVE_ENABLE_TRANSFER_FUNCTION_BIT_KHR](VkAttachmentDescriptionFlagBits.html),
[`resolveSrgbFormatSupportsTransferFunctionControl`](../../../../spec/latest/chapters/limits.html#limits-resolveSrgbFormatSupportsTransferFunctionControl)
**must** be [VK_TRUE](VK_TRUE.html)

* 
[](#VUID-VkAttachmentDescription2-flags-11775) VUID-VkAttachmentDescription2-flags-11775

If `flags` includes
[VK_ATTACHMENT_DESCRIPTION_RESOLVE_SKIP_TRANSFER_FUNCTION_BIT_KHR](VkAttachmentDescriptionFlagBits.html)
or
[VK_ATTACHMENT_DESCRIPTION_RESOLVE_ENABLE_TRANSFER_FUNCTION_BIT_KHR](VkAttachmentDescriptionFlagBits.html),
[`maintenance10`](../../../../spec/latest/chapters/features.html#features-maintenance10) **must** be enabled

* 
[](#VUID-VkAttachmentDescription2-flags-11776) VUID-VkAttachmentDescription2-flags-11776

If `flags` includes
[VK_ATTACHMENT_DESCRIPTION_RESOLVE_SKIP_TRANSFER_FUNCTION_BIT_KHR](VkAttachmentDescriptionFlagBits.html)
or
[VK_ATTACHMENT_DESCRIPTION_RESOLVE_ENABLE_TRANSFER_FUNCTION_BIT_KHR](VkAttachmentDescriptionFlagBits.html),
`format` **must** use sRGB encoding

* 
[](#VUID-VkAttachmentDescription2-flags-11777) VUID-VkAttachmentDescription2-flags-11777

If `flags` includes
[VK_ATTACHMENT_DESCRIPTION_RESOLVE_SKIP_TRANSFER_FUNCTION_BIT_KHR](VkAttachmentDescriptionFlagBits.html)
or
[VK_ATTACHMENT_DESCRIPTION_RESOLVE_ENABLE_TRANSFER_FUNCTION_BIT_KHR](VkAttachmentDescriptionFlagBits.html),
`samples` **must** be [VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html)

* 
[](#VUID-VkAttachmentDescription2-pNext-06704) VUID-VkAttachmentDescription2-pNext-06704

If
the `pNext` chain does not include a
[VkAttachmentDescriptionStencilLayout](VkAttachmentDescriptionStencilLayout.html) structure,
`format` includes a stencil component, and `stencilLoadOp` is
[VK_ATTACHMENT_LOAD_OP_LOAD](VkAttachmentLoadOp.html), then `initialLayout` **must** not be
[VK_IMAGE_LAYOUT_UNDEFINED](VkImageLayout.html)

* 
[](#VUID-VkAttachmentDescription2-pNext-06705) VUID-VkAttachmentDescription2-pNext-06705

If the `pNext` chain includes a
[VkAttachmentDescriptionStencilLayout](VkAttachmentDescriptionStencilLayout.html) structure, `format`
includes a stencil component, and `stencilLoadOp` is
[VK_ATTACHMENT_LOAD_OP_LOAD](VkAttachmentLoadOp.html), then
[VkAttachmentDescriptionStencilLayout](VkAttachmentDescriptionStencilLayout.html)::`stencilInitialLayout`
**must** not be [VK_IMAGE_LAYOUT_UNDEFINED](VkImageLayout.html)

* 
[](#VUID-VkAttachmentDescription2-format-06249) VUID-VkAttachmentDescription2-format-06249

If `format` is a depth/stencil format which includes both depth and
stencil components, and `initialLayout` is
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](VkImageLayout.html), the `pNext` chain
**must** include a [VkAttachmentDescriptionStencilLayout](VkAttachmentDescriptionStencilLayout.html) structure

* 
[](#VUID-VkAttachmentDescription2-format-06250) VUID-VkAttachmentDescription2-format-06250

If `format` is a depth/stencil format which includes both depth and
stencil components, and `finalLayout` is
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](VkImageLayout.html), the `pNext` chain
**must** include a [VkAttachmentDescriptionStencilLayout](VkAttachmentDescriptionStencilLayout.html) structure

* 
[](#VUID-VkAttachmentDescription2-format-06247) VUID-VkAttachmentDescription2-format-06247

If the `pNext` chain does not include a
[VkAttachmentDescriptionStencilLayout](VkAttachmentDescriptionStencilLayout.html) structure and `format`
only includes a stencil component, `initialLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](VkImageLayout.html)

* 
[](#VUID-VkAttachmentDescription2-format-06248) VUID-VkAttachmentDescription2-format-06248

If the `pNext` chain does not include a
[VkAttachmentDescriptionStencilLayout](VkAttachmentDescriptionStencilLayout.html) structure and `format`
only includes a stencil component, `finalLayout` **must** not be
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_OPTIMAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](VkImageLayout.html)

* 
[](#VUID-VkAttachmentDescription2-format-09332) VUID-VkAttachmentDescription2-format-09332

If the [`externalFormatResolve`](../../../../spec/latest/chapters/features.html#features-externalFormatResolve)
feature is not enabled,
`format` **must** not be [VK_FORMAT_UNDEFINED](VkFormat.html)

* 
[](#VUID-VkAttachmentDescription2-format-09334) VUID-VkAttachmentDescription2-format-09334

If `format` is [VK_FORMAT_UNDEFINED](VkFormat.html), there **must** be a
[VkExternalFormatANDROID](VkExternalFormatANDROID.html) structure in the `pNext` chain with a
`externalFormat` that is not equal to `0`

Valid Usage (Implicit)

* 
[](#VUID-VkAttachmentDescription2-sType-sType) VUID-VkAttachmentDescription2-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ATTACHMENT_DESCRIPTION_2](VkStructureType.html)

* 
[](#VUID-VkAttachmentDescription2-pNext-pNext) VUID-VkAttachmentDescription2-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkAttachmentDescriptionStencilLayout](VkAttachmentDescriptionStencilLayout.html), [VkExternalFormatANDROID](VkExternalFormatANDROID.html), or [VkExternalFormatOHOS](VkExternalFormatOHOS.html)

* 
[](#VUID-VkAttachmentDescription2-sType-unique) VUID-VkAttachmentDescription2-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkAttachmentDescription2-flags-parameter) VUID-VkAttachmentDescription2-flags-parameter

 `flags` **must** be a valid combination of [VkAttachmentDescriptionFlagBits](VkAttachmentDescriptionFlagBits.html) values

* 
[](#VUID-VkAttachmentDescription2-format-parameter) VUID-VkAttachmentDescription2-format-parameter

 `format` **must** be a valid [VkFormat](VkFormat.html) value

* 
[](#VUID-VkAttachmentDescription2-samples-parameter) VUID-VkAttachmentDescription2-samples-parameter

 `samples` **must** be a valid [VkSampleCountFlagBits](VkSampleCountFlagBits.html) value

* 
[](#VUID-VkAttachmentDescription2-loadOp-parameter) VUID-VkAttachmentDescription2-loadOp-parameter

 `loadOp` **must** be a valid [VkAttachmentLoadOp](VkAttachmentLoadOp.html) value

* 
[](#VUID-VkAttachmentDescription2-storeOp-parameter) VUID-VkAttachmentDescription2-storeOp-parameter

 `storeOp` **must** be a valid [VkAttachmentStoreOp](VkAttachmentStoreOp.html) value

* 
[](#VUID-VkAttachmentDescription2-stencilLoadOp-parameter) VUID-VkAttachmentDescription2-stencilLoadOp-parameter

 `stencilLoadOp` **must** be a valid [VkAttachmentLoadOp](VkAttachmentLoadOp.html) value

* 
[](#VUID-VkAttachmentDescription2-stencilStoreOp-parameter) VUID-VkAttachmentDescription2-stencilStoreOp-parameter

 `stencilStoreOp` **must** be a valid [VkAttachmentStoreOp](VkAttachmentStoreOp.html) value

* 
[](#VUID-VkAttachmentDescription2-initialLayout-parameter) VUID-VkAttachmentDescription2-initialLayout-parameter

 `initialLayout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

* 
[](#VUID-VkAttachmentDescription2-finalLayout-parameter) VUID-VkAttachmentDescription2-finalLayout-parameter

 `finalLayout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

[VK_KHR_create_renderpass2](VK_KHR_create_renderpass2.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkAttachmentDescriptionFlags](VkAttachmentDescriptionFlags.html), [VkAttachmentLoadOp](VkAttachmentLoadOp.html), [VkAttachmentStoreOp](VkAttachmentStoreOp.html), [VkFormat](VkFormat.html), [VkImageLayout](VkImageLayout.html), [VkRenderPassCreateInfo2](VkRenderPassCreateInfo2.html), [VkSampleCountFlagBits](VkSampleCountFlagBits.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkAttachmentDescription2).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
