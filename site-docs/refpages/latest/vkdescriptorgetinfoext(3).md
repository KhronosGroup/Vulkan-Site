# VkDescriptorGetInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDescriptorGetInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDescriptorGetInfoEXT - Structure specifying parameters of descriptor to get

Information about the descriptor to get is passed in a
`VkDescriptorGetInfoEXT` structure:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
typedef struct VkDescriptorGetInfoEXT {
    VkStructureType        sType;
    const void*            pNext;
    VkDescriptorType       type;
    VkDescriptorDataEXT    data;
} VkDescriptorGetInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`type` is the type of descriptor to get.

* 
`data` is a [VkDescriptorDataEXT](VkDescriptorDataEXT.html) union containing the
information needed to get the descriptor.

Valid Usage

* 
[](#VUID-VkDescriptorGetInfoEXT-type-08018) VUID-VkDescriptorGetInfoEXT-type-08018

`type` **must** not be [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](VkDescriptorType.html)

* 
[](#VUID-VkDescriptorGetInfoEXT-type-08019) VUID-VkDescriptorGetInfoEXT-type-08019

If `type` is [VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html), the
`pCombinedImageSampler->sampler` member of `data` **must** be a
[VkSampler](VkSampler.html) created on `device`

* 
[](#VUID-VkDescriptorGetInfoEXT-type-08020) VUID-VkDescriptorGetInfoEXT-type-08020

If `type` is [VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html), the
`pCombinedImageSampler->imageView` member of `data` **must** be a
[VkImageView](VkImageView.html) created on `device`, or [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkDescriptorGetInfoEXT-type-08021) VUID-VkDescriptorGetInfoEXT-type-08021

If `type` is [VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](VkDescriptorType.html), the
`pInputAttachmentImage->imageView` member of `data` **must** be a
[VkImageView](VkImageView.html) created on `device`

* 
[](#VUID-VkDescriptorGetInfoEXT-type-08022) VUID-VkDescriptorGetInfoEXT-type-08022

If `type` is [VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](VkDescriptorType.html), and if
`pSampledImage` is not `NULL`, the `pSampledImage->imageView`
member of `data` **must** be a [VkImageView](VkImageView.html) created on
`device`, or [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkDescriptorGetInfoEXT-type-08023) VUID-VkDescriptorGetInfoEXT-type-08023

If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html), and if
`pStorageImage` is not `NULL`, the `pStorageImage->imageView`
member of `data` **must** be a [VkImageView](VkImageView.html) created on
`device`, or [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkDescriptorGetInfoEXT-type-09427) VUID-VkDescriptorGetInfoEXT-type-09427

If `type` is [VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](VkDescriptorType.html),
`pUniformBuffer` is not `NULL` , the number of texel buffer elements
given by (⌊`pUniformBuffer->range` / (texel block
size)⌋ × (texels per block)) where texel block size and
texels per block are as defined in the [    Compatible Formats](../../../../spec/latest/chapters/formats.html#formats-compatibility) table for `pUniformBuffer->format`, **must** be
less than or equal to
`VkPhysicalDeviceLimits`::`maxTexelBufferElements`

* 
[](#VUID-VkDescriptorGetInfoEXT-type-09428) VUID-VkDescriptorGetInfoEXT-type-09428

If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](VkDescriptorType.html),
`pStorageBuffer` is not `NULL` , the number of texel buffer elements
given by (⌊`pStorageBuffer->range` / (texel block
size)⌋ × (texels per block)) where texel block size and
texels per block are as defined in the [    Compatible Formats](../../../../spec/latest/chapters/formats.html#formats-compatibility) table for `pStorageBuffer->format`, **must** be
less than or equal to
`VkPhysicalDeviceLimits`::`maxTexelBufferElements`

* 
[](#VUID-VkDescriptorGetInfoEXT-type-08028) VUID-VkDescriptorGetInfoEXT-type-08028

If `type` is [VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](VkDescriptorType.html) and
`accelerationStructure` is not `0`, `accelerationStructure`
**must** contain the address of a [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html) created
on `device`

* 
[](#VUID-VkDescriptorGetInfoEXT-type-08029) VUID-VkDescriptorGetInfoEXT-type-08029

If `type` is [VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](VkDescriptorType.html) and
`accelerationStructure` is not `0`, `accelerationStructure`
**must** contain the handle of a [VkAccelerationStructureNV](VkAccelerationStructureNV.html) created on
`device`, returned by [vkGetAccelerationStructureHandleNV](vkGetAccelerationStructureHandleNV.html)

* 
[](#VUID-VkDescriptorGetInfoEXT-type-09701) VUID-VkDescriptorGetInfoEXT-type-09701

If `type` is [VK_DESCRIPTOR_TYPE_TENSOR_ARM](VkDescriptorType.html), a
[VkDescriptorGetTensorInfoARM](VkDescriptorGetTensorInfoARM.html) structure **must** be included in the
`pNext` chain and `data` is ignored

* 
[](#VUID-VkDescriptorGetInfoEXT-type-12216) VUID-VkDescriptorGetInfoEXT-type-12216

If `type` is [VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html) and
`pCombinedImageSampler->imageView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the
`pCombinedImageSampler->imageView` member of `data` **must** have
been created with [VK_IMAGE_USAGE_SAMPLED_BIT](VkImageUsageFlagBits.html) set

* 
[](#VUID-VkDescriptorGetInfoEXT-type-12217) VUID-VkDescriptorGetInfoEXT-type-12217

If `type` is [VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](VkDescriptorType.html),
`pSampledImage` is not `NULL`, and `pSampledImage->imageView` is
not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the `pSampledImage->imageView` member of
`data` **must** have been created with [VK_IMAGE_USAGE_SAMPLED_BIT](VkImageUsageFlagBits.html)
set

* 
[](#VUID-VkDescriptorGetInfoEXT-type-12218) VUID-VkDescriptorGetInfoEXT-type-12218

If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html),
`pStorageImage` is not `NULL`, and `pStorageImage->imageView` is
not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), the `pStorageImage->imageView` member of
`data` **must** have been created with [VK_IMAGE_USAGE_STORAGE_BIT](VkImageUsageFlagBits.html)
set

* 
[](#VUID-VkDescriptorGetInfoEXT-type-12219) VUID-VkDescriptorGetInfoEXT-type-12219

If `type` is [VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](VkDescriptorType.html), the
`pInputAttachmentImage->imageView` member of `data` **must** have
been created with [VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](VkImageUsageFlagBits.html) set

* 
[](#VUID-VkDescriptorGetInfoEXT-type-12220) VUID-VkDescriptorGetInfoEXT-type-12220

If `type` is [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](VkDescriptorType.html),
`pUniformBuffer` is not `NULL` and `pUniformBuffer->address` is
not zero, `pUniformBuffer->address` **must** be a device address
allocated to the application from a buffer created with the
[VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-VkDescriptorGetInfoEXT-type-12221) VUID-VkDescriptorGetInfoEXT-type-12221

If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](VkDescriptorType.html),
`pStorageBuffer` is not `NULL` and `pStorageBuffer->address` is
not zero, `pStorageBuffer->address` **must** be a device address
allocated to the application from a buffer created with the
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-VkDescriptorGetInfoEXT-type-12222) VUID-VkDescriptorGetInfoEXT-type-12222

If `type` is [VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](VkDescriptorType.html),
`pUniformTexelBuffer` is not `NULL` and
`pUniformTexelBuffer->address` is not zero,
`pUniformTexelBuffer->address` **must** be a device address allocated
to the application from a buffer created with the
[VK_BUFFER_USAGE_UNIFORM_TEXEL_BUFFER_BIT](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-VkDescriptorGetInfoEXT-type-12223) VUID-VkDescriptorGetInfoEXT-type-12223

If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](VkDescriptorType.html),
`pStorageTexelBuffer` is not `NULL` and
`pStorageTexelBuffer->address` is not zero,
`pStorageTexelBuffer->address` **must** be a device address allocated
to the application from a buffer created with the
[VK_BUFFER_USAGE_STORAGE_TEXEL_BUFFER_BIT](VkBufferUsageFlagBits.html) usage flag set

* 
[](#VUID-VkDescriptorGetInfoEXT-type-12265) VUID-VkDescriptorGetInfoEXT-type-12265

If `type` is [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](VkDescriptorType.html) and
`pUniformBuffer` is not `NULL`, `pUniformBuffer->address` **must**
be aligned to
`VkPhysicalDeviceLimits`::`minUniformBufferOffsetAlignment`

* 
[](#VUID-VkDescriptorGetInfoEXT-type-12266) VUID-VkDescriptorGetInfoEXT-type-12266

If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](VkDescriptorType.html) and
`pStorageBuffer` is not `NULL`, `pStorageBuffer->address` **must**
be aligned to
`VkPhysicalDeviceLimits`::`minStorageBufferOffsetAlignment`

* 
[](#VUID-VkDescriptorGetInfoEXT-type-12269) VUID-VkDescriptorGetInfoEXT-type-12269

If `type` is [VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](VkDescriptorType.html), and
`pUniformTexelBuffer` is not `NULL`,
`pUniformTexelBuffer->address` **must** be a multiple of the effective
alignment requirement as determined by
[`minTexelBufferOffsetAlignment`](../../../../spec/latest/chapters/limits.html#limits-minTexelBufferOffsetAlignment)

* 
[](#VUID-VkDescriptorGetInfoEXT-type-12270) VUID-VkDescriptorGetInfoEXT-type-12270

If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](VkDescriptorType.html), the and
`pStorageTexelBuffer` is not `NULL`,
`pStorageTexelBuffer->address` **must** be a multiple of the effective
alignment requirement as determined by
[`minTexelBufferOffsetAlignment`](../../../../spec/latest/chapters/limits.html#limits-minTexelBufferOffsetAlignment)

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorGetInfoEXT-sType-sType) VUID-VkDescriptorGetInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DESCRIPTOR_GET_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkDescriptorGetInfoEXT-pNext-pNext) VUID-VkDescriptorGetInfoEXT-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkDescriptorGetTensorInfoARM](VkDescriptorGetTensorInfoARM.html)

* 
[](#VUID-VkDescriptorGetInfoEXT-sType-unique) VUID-VkDescriptorGetInfoEXT-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkDescriptorGetInfoEXT-type-parameter) VUID-VkDescriptorGetInfoEXT-type-parameter

 `type` **must** be a valid [VkDescriptorType](VkDescriptorType.html) value

* 
[](#VUID-VkDescriptorGetInfoEXT-pSampler-parameter) VUID-VkDescriptorGetInfoEXT-pSampler-parameter

 If `type` is [VK_DESCRIPTOR_TYPE_SAMPLER](VkDescriptorType.html), the `pSampler` member of `data` **must** be a valid pointer to a valid [VkSampler](VkSampler.html) handle

* 
[](#VUID-VkDescriptorGetInfoEXT-pCombinedImageSampler-parameter) VUID-VkDescriptorGetInfoEXT-pCombinedImageSampler-parameter

 If `type` is [VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html), the `pCombinedImageSampler` member of `data` **must** be a valid pointer to a valid [VkDescriptorImageInfo](VkDescriptorImageInfo.html) structure

* 
[](#VUID-VkDescriptorGetInfoEXT-pInputAttachmentImage-parameter) VUID-VkDescriptorGetInfoEXT-pInputAttachmentImage-parameter

 If `type` is [VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](VkDescriptorType.html), the `pInputAttachmentImage` member of `data` **must** be a valid pointer to a valid [VkDescriptorImageInfo](VkDescriptorImageInfo.html) structure

* 
[](#VUID-VkDescriptorGetInfoEXT-pSampledImage-parameter) VUID-VkDescriptorGetInfoEXT-pSampledImage-parameter

 If `type` is [VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](VkDescriptorType.html), and if `pSampledImage` is not `NULL`, the `pSampledImage` member of `data` **must** be a valid pointer to a valid [VkDescriptorImageInfo](VkDescriptorImageInfo.html) structure

* 
[](#VUID-VkDescriptorGetInfoEXT-pStorageImage-parameter) VUID-VkDescriptorGetInfoEXT-pStorageImage-parameter

 If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html), and if `pStorageImage` is not `NULL`, the `pStorageImage` member of `data` **must** be a valid pointer to a valid [VkDescriptorImageInfo](VkDescriptorImageInfo.html) structure

* 
[](#VUID-VkDescriptorGetInfoEXT-pUniformTexelBuffer-parameter) VUID-VkDescriptorGetInfoEXT-pUniformTexelBuffer-parameter

 If `type` is [VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](VkDescriptorType.html), and if `pUniformTexelBuffer` is not `NULL`, the `pUniformTexelBuffer` member of `data` **must** be a valid pointer to a valid [VkDescriptorAddressInfoEXT](VkDescriptorAddressInfoEXT.html) structure

* 
[](#VUID-VkDescriptorGetInfoEXT-pStorageTexelBuffer-parameter) VUID-VkDescriptorGetInfoEXT-pStorageTexelBuffer-parameter

 If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](VkDescriptorType.html), and if `pStorageTexelBuffer` is not `NULL`, the `pStorageTexelBuffer` member of `data` **must** be a valid pointer to a valid [VkDescriptorAddressInfoEXT](VkDescriptorAddressInfoEXT.html) structure

* 
[](#VUID-VkDescriptorGetInfoEXT-pUniformBuffer-parameter) VUID-VkDescriptorGetInfoEXT-pUniformBuffer-parameter

 If `type` is [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](VkDescriptorType.html), and if `pUniformBuffer` is not `NULL`, the `pUniformBuffer` member of `data` **must** be a valid pointer to a valid [VkDescriptorAddressInfoEXT](VkDescriptorAddressInfoEXT.html) structure

* 
[](#VUID-VkDescriptorGetInfoEXT-pStorageBuffer-parameter) VUID-VkDescriptorGetInfoEXT-pStorageBuffer-parameter

 If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](VkDescriptorType.html), and if `pStorageBuffer` is not `NULL`, the `pStorageBuffer` member of `data` **must** be a valid pointer to a valid [VkDescriptorAddressInfoEXT](VkDescriptorAddressInfoEXT.html) structure

* 
[](#VUID-VkDescriptorGetInfoEXT-accelerationStructure-parameter) VUID-VkDescriptorGetInfoEXT-accelerationStructure-parameter

 If `type` is [VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](VkDescriptorType.html) or [VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](VkDescriptorType.html), the `accelerationStructure` member of `data` **must** be a valid `VkDeviceAddress` value

[VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html), [VkDescriptorDataEXT](VkDescriptorDataEXT.html), [VkDescriptorType](VkDescriptorType.html), [VkStructureType](VkStructureType.html), [vkGetDescriptorEXT](vkGetDescriptorEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorbuffers.html#VkDescriptorGetInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
