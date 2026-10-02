# VkDescriptorDataEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDescriptorDataEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDescriptorDataEXT - Structure specifying descriptor data

Data describing the descriptor is passed in a `VkDescriptorDataEXT`
structure:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
typedef union VkDescriptorDataEXT {
    const VkSampler*                     pSampler;
    const VkDescriptorImageInfo*         pCombinedImageSampler;
    const VkDescriptorImageInfo*         pInputAttachmentImage;
    const VkDescriptorImageInfo*         pSampledImage;
    const VkDescriptorImageInfo*         pStorageImage;
    const VkDescriptorAddressInfoEXT*    pUniformTexelBuffer;
    const VkDescriptorAddressInfoEXT*    pStorageTexelBuffer;
    const VkDescriptorAddressInfoEXT*    pUniformBuffer;
    const VkDescriptorAddressInfoEXT*    pStorageBuffer;
    VkDeviceAddress                      accelerationStructure;
} VkDescriptorDataEXT;

* 
`pSampler` is a pointer to a [VkSampler](VkSampler.html) handle specifying the
parameters of a [VK_DESCRIPTOR_TYPE_SAMPLER](VkDescriptorType.html) descriptor.

* 
`pCombinedImageSampler` is a pointer to a
[VkDescriptorImageInfo](VkDescriptorImageInfo.html) structure specifying the parameters of a
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html) descriptor.

* 
`pInputAttachmentImage` is a pointer to a
[VkDescriptorImageInfo](VkDescriptorImageInfo.html) structure specifying the parameters of a
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](VkDescriptorType.html) descriptor.

* 
`pSampledImage` is a pointer to a [VkDescriptorImageInfo](VkDescriptorImageInfo.html)
structure specifying the parameters of a
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](VkDescriptorType.html) descriptor.

* 
`pStorageImage` is a pointer to a [VkDescriptorImageInfo](VkDescriptorImageInfo.html)
structure specifying the parameters of a
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html) descriptor.

* 
`pUniformTexelBuffer` is a pointer to a
[VkDescriptorAddressInfoEXT](VkDescriptorAddressInfoEXT.html) structure specifying the parameters of
a [VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](VkDescriptorType.html) descriptor.

* 
`pStorageTexelBuffer` is a pointer to a
[VkDescriptorAddressInfoEXT](VkDescriptorAddressInfoEXT.html) structure specifying the parameters of
a [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](VkDescriptorType.html) descriptor.

* 
`pUniformBuffer` is a pointer to a [VkDescriptorAddressInfoEXT](VkDescriptorAddressInfoEXT.html)
structure specifying the parameters of a
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](VkDescriptorType.html) descriptor.

* 
`pStorageBuffer` is a pointer to a [VkDescriptorAddressInfoEXT](VkDescriptorAddressInfoEXT.html)
structure specifying the parameters of a
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](VkDescriptorType.html) descriptor.

* 
`accelerationStructure` is
     the address of a [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html) specifying the
     parameters of a [VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](VkDescriptorType.html)
     descriptor
, or
    a [VkAccelerationStructureNV](VkAccelerationStructureNV.html) handle specifying the parameters of a
    [VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](VkDescriptorType.html) descriptor.

If the [`nullDescriptor`](../../../../spec/latest/chapters/features.html#features-nullDescriptor) feature is enabled,
`pSampledImage`, `pStorageImage`, `pUniformTexelBuffer`,
`pStorageTexelBuffer`, `pUniformBuffer`, and `pStorageBuffer`
**can** each be `NULL`.
Loads from a null descriptor return zero values and stores and atomics to a
null descriptor are discarded.

If the [`nullDescriptor`](../../../../spec/latest/chapters/features.html#features-nullDescriptor) feature is enabled,
`accelerationStructure` **can** be `0`.
A null acceleration structure descriptor results in the miss shader being
invoked.

Valid Usage

* 
[](#VUID-VkDescriptorDataEXT-type-08034) VUID-VkDescriptorDataEXT-type-08034

If [VkDescriptorGetInfoEXT](VkDescriptorGetInfoEXT.html)::`type` is
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html), and the
[`nullDescriptor`](../../../../spec/latest/chapters/features.html#features-nullDescriptor) feature is not
enabled, `pCombinedImageSampler->imageView` **must** not be
[VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkDescriptorDataEXT-type-08035) VUID-VkDescriptorDataEXT-type-08035

If [VkDescriptorGetInfoEXT](VkDescriptorGetInfoEXT.html)::`type` is
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](VkDescriptorType.html), and the
[`nullDescriptor`](../../../../spec/latest/chapters/features.html#features-nullDescriptor) feature is not
enabled, `pSampledImage` **must** not be `NULL` and
`pSampledImage->imageView` **must** not be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkDescriptorDataEXT-type-08036) VUID-VkDescriptorDataEXT-type-08036

If [VkDescriptorGetInfoEXT](VkDescriptorGetInfoEXT.html)::`type` is
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html), and the
[`nullDescriptor`](../../../../spec/latest/chapters/features.html#features-nullDescriptor) feature is not
enabled, `pStorageImage` **must** not be `NULL` and
`pStorageImage->imageView` **must** not be [VK_NULL_HANDLE](VK_NULL_HANDLE.html)

* 
[](#VUID-VkDescriptorDataEXT-type-08037) VUID-VkDescriptorDataEXT-type-08037

If [VkDescriptorGetInfoEXT](VkDescriptorGetInfoEXT.html)::`type` is
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](VkDescriptorType.html), and the
[`nullDescriptor`](../../../../spec/latest/chapters/features.html#features-nullDescriptor) feature is not
enabled, `pUniformTexelBuffer` **must** not be `NULL`

* 
[](#VUID-VkDescriptorDataEXT-type-08038) VUID-VkDescriptorDataEXT-type-08038

If [VkDescriptorGetInfoEXT](VkDescriptorGetInfoEXT.html)::`type` is
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](VkDescriptorType.html), and the
[`nullDescriptor`](../../../../spec/latest/chapters/features.html#features-nullDescriptor) feature is not
enabled, `pStorageTexelBuffer` **must** not be `NULL`

* 
[](#VUID-VkDescriptorDataEXT-type-08039) VUID-VkDescriptorDataEXT-type-08039

If [VkDescriptorGetInfoEXT](VkDescriptorGetInfoEXT.html)::`type` is
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](VkDescriptorType.html), and the
[`nullDescriptor`](../../../../spec/latest/chapters/features.html#features-nullDescriptor) feature is not
enabled, `pUniformBuffer` **must** not be `NULL`

* 
[](#VUID-VkDescriptorDataEXT-type-08040) VUID-VkDescriptorDataEXT-type-08040

If [VkDescriptorGetInfoEXT](VkDescriptorGetInfoEXT.html)::`type` is
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](VkDescriptorType.html), and the
[`nullDescriptor`](../../../../spec/latest/chapters/features.html#features-nullDescriptor) feature is not
enabled, `pStorageBuffer` **must** not be `NULL`

* 
[](#VUID-VkDescriptorDataEXT-type-08041) VUID-VkDescriptorDataEXT-type-08041

If [VkDescriptorGetInfoEXT](VkDescriptorGetInfoEXT.html)::`type` is
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](VkDescriptorType.html), and the
[`nullDescriptor`](../../../../spec/latest/chapters/features.html#features-nullDescriptor) feature is not
enabled, `accelerationStructure` **must** not be `0`

* 
[](#VUID-VkDescriptorDataEXT-type-08042) VUID-VkDescriptorDataEXT-type-08042

If [VkDescriptorGetInfoEXT](VkDescriptorGetInfoEXT.html)::`type` is
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](VkDescriptorType.html), and the
[`nullDescriptor`](../../../../spec/latest/chapters/features.html#features-nullDescriptor) feature is not
enabled, `accelerationStructure` **must** not be `0`

[VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html), [VkDescriptorAddressInfoEXT](VkDescriptorAddressInfoEXT.html), [VkDescriptorGetInfoEXT](VkDescriptorGetInfoEXT.html), [VkDescriptorImageInfo](VkDescriptorImageInfo.html), `VkDeviceAddress`, [VkSampler](VkSampler.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorbuffers.html#VkDescriptorDataEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
