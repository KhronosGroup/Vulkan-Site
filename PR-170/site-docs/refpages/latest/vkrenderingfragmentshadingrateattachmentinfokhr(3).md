# VkRenderingFragmentShadingRateAttachmentInfoKHR(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkRenderingFragmentShadingRateAttachmentInfoKHR.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkRenderingFragmentShadingRateAttachmentInfoKHR - Structure specifying fragment shading rate attachment information

The `VkRenderingFragmentShadingRateAttachmentInfoKHR` structure is
defined as:

// Provided by VK_KHR_fragment_shading_rate with VK_VERSION_1_3 or VK_KHR_dynamic_rendering
typedef struct VkRenderingFragmentShadingRateAttachmentInfoKHR {
    VkStructureType    sType;
    const void*        pNext;
    VkImageView        imageView;
    VkImageLayout      imageLayout;
    VkExtent2D         shadingRateAttachmentTexelSize;
} VkRenderingFragmentShadingRateAttachmentInfoKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`imageView` is the image view that will be used as a fragment
shading rate attachment.

* 
`imageLayout` is the layout that `imageView` will be in during
rendering.

* 
`shadingRateAttachmentTexelSize` specifies the number of pixels
corresponding to each texel in `imageView`.

This structure can be included in the `pNext` chain of
[VkRenderingInfo](VkRenderingInfo.html) to define a
[fragment shading rate attachment](../../../../spec/latest/chapters/primsrast.html#primsrast-fragment-shading-rate-attachment).
If `imageView` is [VK_NULL_HANDLE](VK_NULL_HANDLE.html), or if this structure is not
specified, the implementation behaves as if a valid shading rate attachment
was specified with all texels specifying a single pixel per fragment.

Valid Usage

* 
[](#VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06147) VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06147

If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `layout` **must** be
[VK_IMAGE_LAYOUT_GENERAL](VkImageLayout.html) or
[VK_IMAGE_LAYOUT_FRAGMENT_SHADING_RATE_ATTACHMENT_OPTIMAL_KHR](VkImageLayout.html)

* 
[](#VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06148) VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06148

If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), it **must** have been
created with the
[VK_IMAGE_USAGE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_KHR](VkImageUsageFlagBits.html) usage flag
set_KHR

* 
[](#VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06149) VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06149

If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`shadingRateAttachmentTexelSize.width` **must** be a power of two value

* 
[](#VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06150) VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06150

If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`shadingRateAttachmentTexelSize.width` **must** be less than or equal
to [    `maxFragmentShadingRateAttachmentTexelSize.width`](../../../../spec/latest/chapters/limits.html#limits-maxFragmentShadingRateAttachmentTexelSize)

* 
[](#VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06151) VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06151

If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`shadingRateAttachmentTexelSize.width` **must** be greater than or
equal to [    `minFragmentShadingRateAttachmentTexelSize.width`](../../../../spec/latest/chapters/limits.html#limits-minFragmentShadingRateAttachmentTexelSize)

* 
[](#VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06152) VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06152

If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`shadingRateAttachmentTexelSize.height` **must** be a power of two
value

* 
[](#VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06153) VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06153

If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`shadingRateAttachmentTexelSize.height` **must** be less than or equal
to [    `maxFragmentShadingRateAttachmentTexelSize.height`](../../../../spec/latest/chapters/limits.html#limits-maxFragmentShadingRateAttachmentTexelSize)

* 
[](#VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06154) VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06154

If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html),
`shadingRateAttachmentTexelSize.height` **must** be greater than or
equal to [    `minFragmentShadingRateAttachmentTexelSize.height`](../../../../spec/latest/chapters/limits.html#limits-minFragmentShadingRateAttachmentTexelSize)

* 
[](#VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06155) VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06155

If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the quotient of
`shadingRateAttachmentTexelSize.width` and
`shadingRateAttachmentTexelSize.height` **must** be less than or equal
to [    `maxFragmentShadingRateAttachmentTexelSizeAspectRatio`](../../../../spec/latest/chapters/limits.html#limits-maxFragmentShadingRateAttachmentTexelSizeAspectRatio)

* 
[](#VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06156) VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-06156

If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the quotient of
`shadingRateAttachmentTexelSize.height` and
`shadingRateAttachmentTexelSize.width` **must** be less than or equal
to [    `maxFragmentShadingRateAttachmentTexelSizeAspectRatio`](../../../../spec/latest/chapters/limits.html#limits-maxFragmentShadingRateAttachmentTexelSizeAspectRatio)

Valid Usage (Implicit)

* 
[](#VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-sType-sType) VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RENDERING_FRAGMENT_SHADING_RATE_ATTACHMENT_INFO_KHR](VkStructureType.html)

* 
[](#VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-parameter) VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageView-parameter

 If `imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `imageView` **must** be a valid [VkImageView](VkImageView.html) handle

* 
[](#VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageLayout-parameter) VUID-VkRenderingFragmentShadingRateAttachmentInfoKHR-imageLayout-parameter

 `imageLayout` **must** be a valid [VkImageLayout](VkImageLayout.html) value

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkRenderingInfo](VkRenderingInfo.html)

[VK_KHR_dynamic_rendering](VK_KHR_dynamic_rendering.html), [VK_KHR_fragment_shading_rate](VK_KHR_fragment_shading_rate.html), [VK_VERSION_1_3](VK_VERSION_1_3.html), [VkExtent2D](VkExtent2D.html), [VkImageLayout](VkImageLayout.html), [VkImageView](VkImageView.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkRenderingFragmentShadingRateAttachmentInfoKHR).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
