# VkRenderPassAttachmentBeginInfo(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRenderPassAttachmentBeginInfo.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRenderPassAttachmentBeginInfo - Structure specifying images to be used as framebuffer attachments

The `VkRenderPassAttachmentBeginInfo` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_VERSION_1_2
typedef struct VkRenderPassAttachmentBeginInfo {
    VkStructureType       sType;
    const void*           pNext;
    uint32_t              attachmentCount;
    const VkImageView*    pAttachments;
} VkRenderPassAttachmentBeginInfo;

// Provided by VK_KHR_imageless_framebuffer
// Equivalent to VkRenderPassAttachmentBeginInfo
typedef VkRenderPassAttachmentBeginInfo VkRenderPassAttachmentBeginInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`attachmentCount` is the number of attachments.

* 
`pAttachments` is a pointer to an array of `VkImageView`
handles, each of which will be used as the corresponding attachment in
the render pass instance.

Valid Usage

* 
[](#VUID-VkRenderPassAttachmentBeginInfo-pAttachments-03218) VUID-VkRenderPassAttachmentBeginInfo-pAttachments-03218

Each element of `pAttachments` **must** only specify a single mip level

* 
[](#VUID-VkRenderPassAttachmentBeginInfo-pAttachments-03219) VUID-VkRenderPassAttachmentBeginInfo-pAttachments-03219

Each element of `pAttachments` **must** have been created with the
[identity swizzle](../../../../spec/latest/chapters/resources.html#resources-image-views-identity-mappings)

* 
[](#VUID-VkRenderPassAttachmentBeginInfo-pAttachments-04114) VUID-VkRenderPassAttachmentBeginInfo-pAttachments-04114

Each element of `pAttachments` **must** have been created with
[VkImageViewCreateInfo](VkImageViewCreateInfo.html)::`viewType` not equal to
[VK_IMAGE_VIEW_TYPE_3D](VkImageViewType.html)

* 
[](#VUID-VkRenderPassAttachmentBeginInfo-pAttachments-07010) VUID-VkRenderPassAttachmentBeginInfo-pAttachments-07010

If
[multisampled-render-to-single-sampled](../../../../spec/latest/chapters/renderpass.html#subpass-multisampledrendertosinglesampled)
is enabled for any subpass, all element of `pAttachments` which have
a sample count equal to [VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html) **must** have a format
that supports the sample count specified in
[VkMultisampledRenderToSingleSampledInfoEXT](VkMultisampledRenderToSingleSampledInfoEXT.html)::`rasterizationSamples`

Valid Usage (Implicit)

* 
[](#VUID-VkRenderPassAttachmentBeginInfo-sType-sType) VUID-VkRenderPassAttachmentBeginInfo-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDER_PASS_ATTACHMENT_BEGIN_INFO](VkStructureType.html)

* 
[](#VUID-VkRenderPassAttachmentBeginInfo-pAttachments-parameter) VUID-VkRenderPassAttachmentBeginInfo-pAttachments-parameter

 If `attachmentCount` is not `0`, `pAttachments` **must** be a valid pointer to an array of `attachmentCount` valid [VkImageView](VkImageView.html) handles

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkRenderPassBeginInfo](VkRenderPassBeginInfo.html)

[VK_KHR_imageless_framebuffer](VK_KHR_imageless_framebuffer.html), [VK_VERSION_1_2](VK_VERSION_1_2.html), [VkImageView](VkImageView.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkRenderPassAttachmentBeginInfo).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
