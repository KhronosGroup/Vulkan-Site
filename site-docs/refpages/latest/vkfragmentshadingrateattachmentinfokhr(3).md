# VkFragmentShadingRateAttachmentInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkFragmentShadingRateAttachmentInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkFragmentShadingRateAttachmentInfoKHR - Structure specifying a fragment shading rate attachment for a subpass

The `VkFragmentShadingRateAttachmentInfoKHR` structure is defined as:

|  | This functionality is superseded by [Vulkan Version 1.4](../../../../spec/latest/appendices/versions.html#versions-1.4) and [VK_KHR_dynamic_rendering_local_read](VK_KHR_dynamic_rendering_local_read.html). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-dynamicrendering) for more information. |
| --- | --- |

// Provided by VK_KHR_fragment_shading_rate
typedef struct VkFragmentShadingRateAttachmentInfoKHR {
    VkStructureType                  sType;
    const void*                      pNext;
    const VkAttachmentReference2*    pFragmentShadingRateAttachment;
    VkExtent2D                       shadingRateAttachmentTexelSize;
} VkFragmentShadingRateAttachmentInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pFragmentShadingRateAttachment` is `NULL` or a pointer to a
[VkAttachmentReference2](VkAttachmentReference2.html) structure defining the fragment shading
rate attachment for this subpass.

* 
`shadingRateAttachmentTexelSize` specifies the size of the portion
of the framebuffer corresponding to each texel in
`pFragmentShadingRateAttachment`.

If no shading rate attachment is specified, or if this structure is not
specified, the implementation behaves as if a valid shading rate attachment
was specified with all texels specifying a single pixel per fragment.

Valid Usage

* 
[](#VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-04524) VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-04524

If `pFragmentShadingRateAttachment` is not `NULL` and its
`attachment` member is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), its
`layout` member **must** be equal to [VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_FRAGMENT_SHADING_RATE_ATTACHMENT_OPTIMAL_KHR](VkImageLayout.html)

* 
[](#VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-04525) VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-04525

If `pFragmentShadingRateAttachment` is not `NULL` and its
`attachment` member is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html),
`shadingRateAttachmentTexelSize.width` **must** be a power of two value

* 
[](#VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-04526) VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-04526

If `pFragmentShadingRateAttachment` is not `NULL` and its
`attachment` member is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html),
`shadingRateAttachmentTexelSize.width` **must** be less than or equal
to [    `maxFragmentShadingRateAttachmentTexelSize.width`](../../../../spec/latest/chapters/limits.html#limits-maxFragmentShadingRateAttachmentTexelSize)

* 
[](#VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-04527) VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-04527

If `pFragmentShadingRateAttachment` is not `NULL` and its
`attachment` member is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html),
`shadingRateAttachmentTexelSize.width` **must** be greater than or
equal to [    `minFragmentShadingRateAttachmentTexelSize.width`](../../../../spec/latest/chapters/limits.html#limits-minFragmentShadingRateAttachmentTexelSize)

* 
[](#VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-04528) VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-04528

If `pFragmentShadingRateAttachment` is not `NULL` and its
`attachment` member is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html),
`shadingRateAttachmentTexelSize.height` **must** be a power of two
value

* 
[](#VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-04529) VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-04529

If `pFragmentShadingRateAttachment` is not `NULL` and its
`attachment` member is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html),
`shadingRateAttachmentTexelSize.height` **must** be less than or equal
to [    `maxFragmentShadingRateAttachmentTexelSize.height`](../../../../spec/latest/chapters/limits.html#limits-maxFragmentShadingRateAttachmentTexelSize)

* 
[](#VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-04530) VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-04530

If `pFragmentShadingRateAttachment` is not `NULL` and its
`attachment` member is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html),
`shadingRateAttachmentTexelSize.height` **must** be greater than or
equal to [    `minFragmentShadingRateAttachmentTexelSize.height`](../../../../spec/latest/chapters/limits.html#limits-minFragmentShadingRateAttachmentTexelSize)

* 
[](#VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-04531) VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-04531

If `pFragmentShadingRateAttachment` is not `NULL` and its
`attachment` member is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), the quotient
of `shadingRateAttachmentTexelSize.width` and
`shadingRateAttachmentTexelSize.height` **must** be less than or equal
to [    `maxFragmentShadingRateAttachmentTexelSizeAspectRatio`](../../../../spec/latest/chapters/limits.html#limits-maxFragmentShadingRateAttachmentTexelSizeAspectRatio)

* 
[](#VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-04532) VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-04532

If `pFragmentShadingRateAttachment` is not `NULL` and its
`attachment` member is not [VK_ATTACHMENT_UNUSED](VK_ATTACHMENT_UNUSED.html), the quotient
of `shadingRateAttachmentTexelSize.height` and
`shadingRateAttachmentTexelSize.width` **must** be less than or equal
to [    `maxFragmentShadingRateAttachmentTexelSizeAspectRatio`](../../../../spec/latest/chapters/limits.html#limits-maxFragmentShadingRateAttachmentTexelSizeAspectRatio)

Valid Usage (Implicit)

* 
[](#VUID-VkFragmentShadingRateAttachmentInfoKHR-sType-sType) VUID-VkFragmentShadingRateAttachmentInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_FRAGMENT_SHADING_RATE_ATTACHMENT_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-parameter) VUID-VkFragmentShadingRateAttachmentInfoKHR-pFragmentShadingRateAttachment-parameter

 If `pFragmentShadingRateAttachment` is not `NULL`, `pFragmentShadingRateAttachment` **must** be a valid pointer to a valid [VkAttachmentReference2](VkAttachmentReference2.html) structure

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkSubpassDescription2](VkSubpassDescription2.html)

[VK_KHR_fragment_shading_rate](VK_KHR_fragment_shading_rate.html), [VkAttachmentReference2](VkAttachmentReference2.html), [VkExtent2D](VkExtent2D.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkFragmentShadingRateAttachmentInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
