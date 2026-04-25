# VkResourceDescriptorInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkResourceDescriptorInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkResourceDescriptorInfoEXT - Structure describing a resource descriptor

`VkResourceDescriptorInfoEXT` is defined as:

// Provided by VK_EXT_descriptor_heap
typedef struct VkResourceDescriptorInfoEXT {
    VkStructureType                sType;
    const void*                    pNext;
    VkDescriptorType               type;
    VkResourceDescriptorDataEXT    data;
} VkResourceDescriptorInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`type` is the type of descriptor to get.

* 
`data` is a [VkResourceDescriptorDataEXT](VkResourceDescriptorDataEXT.html) union defining the
properties of a resource descriptor according to `type`

If `type` is [VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](VkDescriptorType.html), `data->pTexelBuffer` is
used to construct the descriptor.

If `type` is
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_PARTITIONED_ACCELERATION_STRUCTURE_NV](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](VkDescriptorType.html), or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](VkDescriptorType.html), `data->pAddressRange` is used
to construct the descriptor.
For acceleration structures, the size of the range is not used by the
descriptor, and **can** be set to 0.
If a non-zero size is provided though, it **must** be a valid range.

|  | Applications may wish to provide a valid range as a way to check their own
| --- | --- |
assumptions about the range they are binding; but it has no bearing on
anything except validation.
Implementations cannot make any assumptions based on the size of the
provided range. |

If `type` is [VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html), or
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](VkDescriptorType.html), `data->pImage` is used to
construct the descriptor.
If `type` is [VK_DESCRIPTOR_TYPE_TENSOR_ARM](VkDescriptorType.html), `data->pTensorARM`
is used to construct the descriptor.

If the [`nullDescriptor`](../../../../spec/latest/chapters/features.html#features-nullDescriptor) feature is enabled,
the corresponding element of `data` **may** be `NULL` to generate a null
descriptor.

Applications **can** give resource descriptors a debug name in a similar way to
naming an object, via the [VkDebugUtilsObjectNameInfoEXT](VkDebugUtilsObjectNameInfoEXT.html) structure.
However, as there is no actual object, this structure **must** be passed via
the `pNext` chain of this structure, with a `objectType` of
[VK_OBJECT_TYPE_UNKNOWN](VkObjectType.html) and a `objectHandle` of
[VK_NULL_HANDLE](VK_NULL_HANDLE.html).
The name is attached to the unique set of descriptor bits written by the
implementation, and writing the same bits again with new debug info **may**
rename the original descriptor.

|  | Implementations are not prevented from returning the same bits for different
| --- | --- |
descriptors.
This can result in multiple different resources mapping to the same name.
A common case for this might be something like a uniform buffer and storage
buffer with the same device address range. |

If a descriptor becomes invalid due to the underlying resource becoming
invalid, implementations **may** remove the name association.

Valid Usage

* 
[](#VUID-VkResourceDescriptorInfoEXT-type-11210) VUID-VkResourceDescriptorInfoEXT-type-11210

`type` **must** be one of [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_PARTITIONED_ACCELERATION_STRUCTURE_NV](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_TENSOR_ARM](VkDescriptorType.html),
or [VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](VkDescriptorType.html)

* 
[](#VUID-VkResourceDescriptorInfoEXT-None-11211) VUID-VkResourceDescriptorInfoEXT-None-11211

If
the [`nullDescriptor`](../../../../spec/latest/chapters/features.html#features-nullDescriptor) feature is not
enabled, and
`type` is [VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html), `data->pImage` **must** not be
`NULL`

* 
[](#VUID-VkResourceDescriptorInfoEXT-type-11469) VUID-VkResourceDescriptorInfoEXT-type-11469

If `type` is
[VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](VkDescriptorType.html), or
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](VkDescriptorType.html), `data->pImage` **must** not
be `NULL`

* 
[](#VUID-VkResourceDescriptorInfoEXT-None-11212) VUID-VkResourceDescriptorInfoEXT-None-11212

If
the [`nullDescriptor`](../../../../spec/latest/chapters/features.html#features-nullDescriptor) feature is not
enabled, and
`type` is [VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](VkDescriptorType.html), `data->pTexelBuffer`
**must** not be `NULL`

* 
[](#VUID-VkResourceDescriptorInfoEXT-None-11213) VUID-VkResourceDescriptorInfoEXT-None-11213

If
the [`nullDescriptor`](../../../../spec/latest/chapters/features.html#features-nullDescriptor) feature is not
enabled, and
`type` is
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_PARTITIONED_ACCELERATION_STRUCTURE_NV](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_TENSOR_ARM](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](VkDescriptorType.html), or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](VkDescriptorType.html), `data->pAddressRange` **must**
not be `NULL`

* 
[](#VUID-VkResourceDescriptorInfoEXT-None-11457) VUID-VkResourceDescriptorInfoEXT-None-11457

If
the [`nullDescriptor`](../../../../spec/latest/chapters/features.html#features-nullDescriptor) feature is not
enabled, and
`type` is [VK_DESCRIPTOR_TYPE_TENSOR_ARM](VkDescriptorType.html),
`data->pTensorARM` **must** not be `NULL`

* 
[](#VUID-VkResourceDescriptorInfoEXT-type-12349) VUID-VkResourceDescriptorInfoEXT-type-12349

If `type` is [VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](VkDescriptorType.html),
`data->pTexelBuffer→addressRange.address` **must** be a multiple of
the effective alignment requirement of `data->pTexelBuffer→format`
as determined by
[`minTexelBufferOffsetAlignment`](../../../../spec/latest/chapters/limits.html#limits-minTexelBufferOffsetAlignment)

* 
[](#VUID-VkResourceDescriptorInfoEXT-type-12350) VUID-VkResourceDescriptorInfoEXT-type-12350

If `type` is [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](VkDescriptorType.html),
`data->pAddressRange→address` **must** be a multiple of
[    `minUniformBufferOffsetAlignment`](../../../../spec/latest/chapters/limits.html#limits-minUniformBufferOffsetAlignment)

* 
[](#VUID-VkResourceDescriptorInfoEXT-type-12351) VUID-VkResourceDescriptorInfoEXT-type-12351

If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](VkDescriptorType.html),
`data->pAddressRange→address` **must** be a multiple of
[    `minStorageBufferOffsetAlignment`](../../../../spec/latest/chapters/limits.html#limits-minStorageBufferOffsetAlignment)

* 
[](#VUID-VkResourceDescriptorInfoEXT-type-11454) VUID-VkResourceDescriptorInfoEXT-type-11454

If `type` is one of

[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](VkDescriptorType.html)

* 
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](VkDescriptorType.html)

* 
[VK_DESCRIPTOR_TYPE_PARTITIONED_ACCELERATION_STRUCTURE_NV](VkDescriptorType.html)

`data->pAddressRange→address` **must** be a multiple of 256

[](#VUID-VkResourceDescriptorInfoEXT-pNext-11401) VUID-VkResourceDescriptorInfoEXT-pNext-11401

If there is a [VkDebugUtilsObjectNameInfoEXT](VkDebugUtilsObjectNameInfoEXT.html) structure in the
`pNext` chain, its `objectType` **must** be
[VK_OBJECT_TYPE_UNKNOWN](VkObjectType.html)

[](#VUID-VkResourceDescriptorInfoEXT-type-11422) VUID-VkResourceDescriptorInfoEXT-type-11422

If `type` is
[VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](VkDescriptorType.html),
[VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](VkDescriptorType.html), or
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](VkDescriptorType.html),
`data.pImage->pView→image` **must** not have been created with an
`imageType` of [VK_IMAGE_TYPE_3D](VkImageType.html)

[](#VUID-VkResourceDescriptorInfoEXT-type-11424) VUID-VkResourceDescriptorInfoEXT-type-11424

If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html),
`data.pImage->pView→viewType` is [VK_IMAGE_VIEW_TYPE_2D](VkImageViewType.html), and
the [`image2DViewOf3D`](../../../../spec/latest/chapters/features.html#features-image2DViewOf3D) feature is not
enabled, `data.pImage->pView→image` **must** not have been created
with an `imageType` of [VK_IMAGE_TYPE_3D](VkImageType.html)

[](#VUID-VkResourceDescriptorInfoEXT-type-11425) VUID-VkResourceDescriptorInfoEXT-type-11425

If `type` is [VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](VkDescriptorType.html),
`data.pImage->pView→viewType` is [VK_IMAGE_VIEW_TYPE_2D](VkImageViewType.html), and
the [`sampler2DViewOf3D`](../../../../spec/latest/chapters/features.html#features-sampler2DViewOf3D) feature is
not enabled, `data.pImage->pView→image` **must** not have been created
with an `imageType` of [VK_IMAGE_TYPE_3D](VkImageType.html)

[](#VUID-VkResourceDescriptorInfoEXT-type-11433) VUID-VkResourceDescriptorInfoEXT-type-11433

If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](VkDescriptorType.html), `data.pAddressRange->size`
**must** not be 0

[](#VUID-VkResourceDescriptorInfoEXT-type-11458) VUID-VkResourceDescriptorInfoEXT-type-11458

If `type` is [VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](VkDescriptorType.html) and
`data.pImage` is not `NULL`, `data.pImage->pView→image` **must**
have been created with the [VK_IMAGE_USAGE_SAMPLED_BIT](VkImageUsageFlagBits.html) usage flag
set

[](#VUID-VkResourceDescriptorInfoEXT-type-11459) VUID-VkResourceDescriptorInfoEXT-type-11459

If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html) and
`data.pImage` is not `NULL`, `data.pImage->pView→image` **must**
have been created with the [VK_IMAGE_USAGE_STORAGE_BIT](VkImageUsageFlagBits.html) usage flag
set

[](#VUID-VkResourceDescriptorInfoEXT-type-11460) VUID-VkResourceDescriptorInfoEXT-type-11460

If `type` is [VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](VkDescriptorType.html) and
`data.pImage` is not `NULL`, `data.pImage->pView→image` **must**
have been created with the [VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](VkImageUsageFlagBits.html)
usage flag set

[](#VUID-VkResourceDescriptorInfoEXT-type-11461) VUID-VkResourceDescriptorInfoEXT-type-11461

If `type` is [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](VkDescriptorType.html) and
`data.pAddressRange` is not `NULL`, `data.pAddressRange` **must**
be a device address range allocated to the application from a buffer
created with the [VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](VkBufferUsageFlagBits.html) usage flag set

[](#VUID-VkResourceDescriptorInfoEXT-type-11462) VUID-VkResourceDescriptorInfoEXT-type-11462

If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](VkDescriptorType.html) and
`data.pAddressRange` is not `NULL`, `data.pAddressRange` **must**
be a device address range allocated to the application from a buffer
created with the [VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](VkBufferUsageFlagBits.html) usage flag set

[](#VUID-VkResourceDescriptorInfoEXT-type-11463) VUID-VkResourceDescriptorInfoEXT-type-11463

If `type` is [VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](VkDescriptorType.html) and
`data.pTexelBuffer` is not `NULL`,
`data.pTexelBuffer->addressRange` **must** be a device address range
allocated to the application from a buffer created with the
[VK_BUFFER_USAGE_UNIFORM_TEXEL_BUFFER_BIT](VkBufferUsageFlagBits.html) usage flag set

[](#VUID-VkResourceDescriptorInfoEXT-type-11464) VUID-VkResourceDescriptorInfoEXT-type-11464

If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](VkDescriptorType.html) and
`data.pTexelBuffer` is not `NULL`,
`data.pTexelBuffer->addressRange` **must** be a device address range
allocated to the application from a buffer created with the
[VK_BUFFER_USAGE_STORAGE_TEXEL_BUFFER_BIT](VkBufferUsageFlagBits.html) usage flag set

[](#VUID-VkResourceDescriptorInfoEXT-type-11483) VUID-VkResourceDescriptorInfoEXT-type-11483

If `type` is
[VK_DESCRIPTOR_TYPE_PARTITIONED_ACCELERATION_STRUCTURE_NV](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](VkDescriptorType.html), and
`data.pAddressRange` is not `NULL`,
`data.pAddressRange->address` **must** be an acceleration structure
address retrieved from a [VkAccelerationStructureKHR](VkAccelerationStructureKHR.html) object via
[vkGetAccelerationStructureDeviceAddressKHR](vkGetAccelerationStructureDeviceAddressKHR.html)

[](#VUID-VkResourceDescriptorInfoEXT-type-11484) VUID-VkResourceDescriptorInfoEXT-type-11484

If `type` is
[VK_DESCRIPTOR_TYPE_PARTITIONED_ACCELERATION_STRUCTURE_NV](VkDescriptorType.html) or
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](VkDescriptorType.html),
`data.pAddressRange` is not `NULL`, and
`data.pAddressRange->size` is not 0, `data.pAddressRange` **must**
be a device address range allocated to the application from the buffer
used to create the acceleration structure that
`data.pAddressRange->address` was retrieved from, and within the
buffer range bound to that acceleration structure

[](#VUID-VkResourceDescriptorInfoEXT-type-11467) VUID-VkResourceDescriptorInfoEXT-type-11467

If `type` is [VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](VkDescriptorType.html) and
`data.pAddressRange` is not `NULL`,
`data.pAddressRange->address` **must** be an acceleration structure
handle retrieved from a [VkAccelerationStructureNV](VkAccelerationStructureNV.html) object via
[vkGetAccelerationStructureHandleNV](vkGetAccelerationStructureHandleNV.html)

[](#VUID-VkResourceDescriptorInfoEXT-type-11468) VUID-VkResourceDescriptorInfoEXT-type-11468

If `type` is [VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](VkDescriptorType.html) and
`data.pAddressRange` is not `NULL`, `data.pAddressRange->size`
**must** be 0

Valid Usage (Implicit)

* 
[](#VUID-VkResourceDescriptorInfoEXT-sType-sType) VUID-VkResourceDescriptorInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RESOURCE_DESCRIPTOR_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkResourceDescriptorInfoEXT-pNext-pNext) VUID-VkResourceDescriptorInfoEXT-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkDebugUtilsObjectNameInfoEXT](VkDebugUtilsObjectNameInfoEXT.html)

* 
[](#VUID-VkResourceDescriptorInfoEXT-sType-unique) VUID-VkResourceDescriptorInfoEXT-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkResourceDescriptorInfoEXT-type-parameter) VUID-VkResourceDescriptorInfoEXT-type-parameter

 `type` **must** be a valid [VkDescriptorType](VkDescriptorType.html) value

* 
[](#VUID-VkResourceDescriptorInfoEXT-pImage-parameter) VUID-VkResourceDescriptorInfoEXT-pImage-parameter

 If `type` is [VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](VkDescriptorType.html), [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](VkDescriptorType.html), [VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](VkDescriptorType.html), [VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](VkDescriptorType.html), or [VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](VkDescriptorType.html), and if `pImage` is not `NULL`, the `pImage` member of `data` **must** be a valid pointer to a valid [VkImageDescriptorInfoEXT](VkImageDescriptorInfoEXT.html) structure

* 
[](#VUID-VkResourceDescriptorInfoEXT-pTexelBuffer-parameter) VUID-VkResourceDescriptorInfoEXT-pTexelBuffer-parameter

 If `type` is [VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](VkDescriptorType.html) or [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](VkDescriptorType.html), and if `pTexelBuffer` is not `NULL`, the `pTexelBuffer` member of `data` **must** be a valid pointer to a valid [VkTexelBufferDescriptorInfoEXT](VkTexelBufferDescriptorInfoEXT.html) structure

* 
[](#VUID-VkResourceDescriptorInfoEXT-pAddressRange-parameter) VUID-VkResourceDescriptorInfoEXT-pAddressRange-parameter

 If `type` is [VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](VkDescriptorType.html), [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](VkDescriptorType.html), or [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](VkDescriptorType.html), and if `pAddressRange` is not `NULL`, the `pAddressRange` member of `data` **must** be a valid pointer to a valid [VkDeviceAddressRangeEXT](VkDeviceAddressRangeKHR.html) structure

* 
[](#VUID-VkResourceDescriptorInfoEXT-pTensorARM-parameter) VUID-VkResourceDescriptorInfoEXT-pTensorARM-parameter

 If `type` is [VK_DESCRIPTOR_TYPE_TENSOR_ARM](VkDescriptorType.html), and if `pTensorARM` is not `NULL`, the `pTensorARM` member of `data` **must** be a valid pointer to a valid [VkTensorViewCreateInfoARM](VkTensorViewCreateInfoARM.html) structure

[VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), [VkDescriptorType](VkDescriptorType.html), [VkResourceDescriptorDataEXT](VkResourceDescriptorDataEXT.html), [VkStructureType](VkStructureType.html), [vkWriteResourceDescriptorsEXT](vkWriteResourceDescriptorsEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorheaps.html#VkResourceDescriptorInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
