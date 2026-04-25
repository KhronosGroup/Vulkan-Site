# VkMultisampledRenderToSingleSampledInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkMultisampledRenderToSingleSampledInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkMultisampledRenderToSingleSampledInfoEXT - Structure containing info for multisampled rendering to single-sampled attachments in a subpass

If the `pNext` chain of [VkSubpassDescription2](VkSubpassDescription2.html)
or [VkRenderingInfo](VkRenderingInfo.html)
includes a `VkMultisampledRenderToSingleSampledInfoEXT` structure, then
that structure describes how multisampled rendering is performed on single
sampled attachments in that subpass.

The `VkMultisampledRenderToSingleSampledInfoEXT` structure is defined
as:

// Provided by VK_EXT_multisampled_render_to_single_sampled
typedef struct VkMultisampledRenderToSingleSampledInfoEXT {
    VkStructureType          sType;
    const void*              pNext;
    VkBool32                 multisampledRenderToSingleSampledEnable;
    VkSampleCountFlagBits    rasterizationSamples;
} VkMultisampledRenderToSingleSampledInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`multisampledRenderToSingleSampledEnable` controls whether
multisampled rendering to single-sampled attachments is performed as
described [below](../../../../spec/latest/chapters/renderpass.html#multisampled-render-to-single-sampled).

* 
`rasterizationSamples` is a [VkSampleCountFlagBits](VkSampleCountFlagBits.html) specifying
the number of samples used in rasterization.

Valid Usage

* 
[](#VUID-VkMultisampledRenderToSingleSampledInfoEXT-rasterizationSamples-06878) VUID-VkMultisampledRenderToSingleSampledInfoEXT-rasterizationSamples-06878

The value of `rasterizationSamples` **must** not be
[VK_SAMPLE_COUNT_1_BIT](VkSampleCountFlagBits.html)

* 
[](#VUID-VkMultisampledRenderToSingleSampledInfoEXT-pNext-06880) VUID-VkMultisampledRenderToSingleSampledInfoEXT-pNext-06880

If added to the `pNext` chain of [VkRenderingInfo](VkRenderingInfo.html), each
`imageView` member of any element of
[VkRenderingInfo](VkRenderingInfo.html)::`pColorAttachments`,
[VkRenderingInfo](VkRenderingInfo.html)::`pDepthAttachment`, or
[VkRenderingInfo](VkRenderingInfo.html)::`pStencilAttachment` that is not
[VK_NULL_HANDLE](VK_NULL_HANDLE.html) **must** have a format that supports the sample count
specified in `rasterizationSamples`

Valid Usage (Implicit)

* 
[](#VUID-VkMultisampledRenderToSingleSampledInfoEXT-sType-sType) VUID-VkMultisampledRenderToSingleSampledInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_MULTISAMPLED_RENDER_TO_SINGLE_SAMPLED_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkMultisampledRenderToSingleSampledInfoEXT-rasterizationSamples-parameter) VUID-VkMultisampledRenderToSingleSampledInfoEXT-rasterizationSamples-parameter

 `rasterizationSamples` **must** be a valid [VkSampleCountFlagBits](VkSampleCountFlagBits.html) value

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkRenderingInfo](VkRenderingInfo.html)

* 
[VkSubpassDescription2](VkSubpassDescription2.html)

[VK_EXT_multisampled_render_to_single_sampled](VK_EXT_multisampled_render_to_single_sampled.html), `VkBool32`, [VkSampleCountFlagBits](VkSampleCountFlagBits.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/renderpass.html#VkMultisampledRenderToSingleSampledInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
