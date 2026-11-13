# VkImageViewHandleInfoNVX(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkImageViewHandleInfoNVX.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkImageViewHandleInfoNVX - Structure specifying the image view for handle queries

The `VkImageViewHandleInfoNVX` structure is defined as:

// Provided by VK_NVX_image_view_handle
typedef struct VkImageViewHandleInfoNVX {
    VkStructureType     sType;
    const void*         pNext;
    VkImageView         imageView;
    VkDescriptorType    descriptorType;
    VkSampler           sampler;
} VkImageViewHandleInfoNVX;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`imageView` is the image view to query.

* 
`descriptorType` is the type of descriptor for which to query a
handle.

* 
`sampler` is the sampler to combine with the image view when
generating the handle.

Valid Usage

* 
[](#VUID-VkImageViewHandleInfoNVX-descriptorType-02654) VUID-VkImageViewHandleInfoNVX-descriptorType-02654

`descriptorType` **must** be [VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html), or
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html)

* 
[](#VUID-VkImageViewHandleInfoNVX-sampler-02655) VUID-VkImageViewHandleInfoNVX-sampler-02655

`sampler` **must** be a valid [VkSampler](VkSampler.html) if `descriptorType`
is [VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html)

* 
[](#VUID-VkImageViewHandleInfoNVX-imageView-02656) VUID-VkImageViewHandleInfoNVX-imageView-02656

If descriptorType is [VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html), the image that
`imageView` was created from **must** have been created with the
[VK_IMAGE_USAGE_SAMPLED_BIT](VkImageUsageFlagBits.html) usage flag set

* 
[](#VUID-VkImageViewHandleInfoNVX-imageView-02657) VUID-VkImageViewHandleInfoNVX-imageView-02657

If descriptorType is [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html), the image
that `imageView` was created from **must** have been created with the
[VK_IMAGE_USAGE_STORAGE_BIT](VkImageUsageFlagBits.html) usage flag set

Valid Usage (Implicit)

* 
[](#VUID-VkImageViewHandleInfoNVX-sType-sType) VUID-VkImageViewHandleInfoNVX-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_VIEW_HANDLE_INFO_NVX](VkStructureType.html)

* 
[](#VUID-VkImageViewHandleInfoNVX-pNext-pNext) VUID-VkImageViewHandleInfoNVX-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkImageViewHandleInfoNVX-imageView-parameter) VUID-VkImageViewHandleInfoNVX-imageView-parameter

 `imageView` **must** be a valid [VkImageView](VkImageView.html) handle

* 
[](#VUID-VkImageViewHandleInfoNVX-descriptorType-parameter) VUID-VkImageViewHandleInfoNVX-descriptorType-parameter

 `descriptorType` **must** be a valid [VkDescriptorType](VkDescriptorType.html) value

* 
[](#VUID-VkImageViewHandleInfoNVX-sampler-parameter) VUID-VkImageViewHandleInfoNVX-sampler-parameter

 If `sampler` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `sampler` **must** be a valid [VkSampler](VkSampler.html) handle

* 
[](#VUID-VkImageViewHandleInfoNVX-commonparent) VUID-VkImageViewHandleInfoNVX-commonparent

 Both of `imageView`, and `sampler` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

[VK_NVX_image_view_handle](VK_NVX_image_view_handle.html), [VkDescriptorType](VkDescriptorType.html), [VkImageView](VkImageView.html), [VkSampler](VkSampler.html), [VkStructureType](VkStructureType.html), [vkGetImageViewHandle64NVX](vkGetImageViewHandle64NVX.html), [vkGetImageViewHandleNVX](vkGetImageViewHandleNVX.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkImageViewHandleInfoNVX).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
