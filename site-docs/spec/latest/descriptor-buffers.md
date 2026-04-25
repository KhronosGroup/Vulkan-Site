# Descriptor Buffers

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/descriptorbuffers.html

## Table of Contents

- [Putting Descriptors in Memory](#descriptorbuffers-puttingdescriptorsinmemory)
- [Putting_Descriptors_in_Memory](#descriptorbuffers-puttingdescriptorsinmemory)
- [Binding Descriptor Buffers](#descriptorbuffers-binding)
- [Binding_Descriptor_Buffers](#descriptorbuffers-binding)
- [Updating Descriptor Buffers](#descriptorbuffers-updates)
- [Updating_Descriptor_Buffers](#descriptorbuffers-updates)
- [Push Descriptors With Descriptor Buffers](#descriptorbuffers-push-descriptors)
- [Push_Descriptors_With_Descriptor_Buffers](#descriptorbuffers-push-descriptors)
- [Capture and Replay](#descriptorbuffers-capturereplay)
- [Capture_and_Replay](#descriptorbuffers-capturereplay)

## Content

If the [`descriptorBuffer`](features.html#features-descriptorBuffer) feature is
enabled, an alternative way to specify descriptor sets is via buffers,
rather than descriptor set objects.

Commands are provided to retrieve descriptor data, and also to locate where
in memory that data **must** be written to match the given descriptor set
layout.

To determine the amount of memory needed to store all descriptors with a
given layout, call:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
void vkGetDescriptorSetLayoutSizeEXT(
    VkDevice                                    device,
    VkDescriptorSetLayout                       layout,
    VkDeviceSize*                               pLayoutSizeInBytes);

* 
`device` is the logical device that gets the size.

* 
`layout` is the descriptor set layout being queried.

* 
`pLayoutSizeInBytes` is a pointer to `VkDeviceSize` where the
size in bytes will be written.

The size of a descriptor set layout will be at least as large as the sum
total of the size of all descriptors in the layout, and **may** be larger.
This size represents the amount of memory that will be required to store all
of the descriptors for this layout in memory, when placed according to the
layout’s offsets as obtained by
[vkGetDescriptorSetLayoutBindingOffsetEXT](#vkGetDescriptorSetLayoutBindingOffsetEXT).

If any `binding` in `layout` is
[VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT](descriptorsets.html#VkDescriptorBindingFlagBitsEXT), the returned size
includes space for the maximum `descriptorCount` descriptors as declared
for that `binding`.
To compute the required size of a descriptor set with a
[VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT](descriptorsets.html#VkDescriptorBindingFlagBitsEXT):

size = offset + descriptorSize ×
variableDescriptorCount

where offset is obtained by
[vkGetDescriptorSetLayoutBindingOffsetEXT](#vkGetDescriptorSetLayoutBindingOffsetEXT) and descriptorSize is
the size of the relevant descriptor as obtained from
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT), and
variableDescriptorCount is the equivalent of
[VkDescriptorSetVariableDescriptorCountAllocateInfo](descriptorsets.html#VkDescriptorSetVariableDescriptorCountAllocateInfo)::`pDescriptorCounts`.
For [VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](descriptors.html#VkDescriptorType),
variableDescriptorCount is the size in bytes for the inline uniform
block, and descriptorSize is 1.

If
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`combinedImageSamplerDescriptorSingleArray`
is [VK_FALSE](fundamentals.html#VK_FALSE) and the variable descriptor type is
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](descriptors.html#VkDescriptorType),
variableDescriptorCount is always considered to be the upper bound.

Valid Usage

* 
[](#VUID-vkGetDescriptorSetLayoutSizeEXT-None-08011) VUID-vkGetDescriptorSetLayoutSizeEXT-None-08011

The [`descriptorBuffer`](features.html#features-descriptorBuffer) feature **must**
be enabled

* 
[](#VUID-vkGetDescriptorSetLayoutSizeEXT-layout-08012) VUID-vkGetDescriptorSetLayoutSizeEXT-layout-08012

`layout` **must** have been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) flag set

* 
[](#VUID-vkGetDescriptorSetLayoutSizeEXT-layout-11811) VUID-vkGetDescriptorSetLayoutSizeEXT-layout-11811

`layout` **must** have not been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) flag set

* 
[](#VUID-vkGetDescriptorSetLayoutSizeEXT-layout-11812) VUID-vkGetDescriptorSetLayoutSizeEXT-layout-11812

`layout` **must** have not been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_EMBEDDED_IMMUTABLE_SAMPLERS_BIT_EXT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits)
flag set

Valid Usage (Implicit)

* 
[](#VUID-vkGetDescriptorSetLayoutSizeEXT-device-parameter) VUID-vkGetDescriptorSetLayoutSizeEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetDescriptorSetLayoutSizeEXT-layout-parameter) VUID-vkGetDescriptorSetLayoutSizeEXT-layout-parameter

 `layout` **must** be a valid [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) handle

* 
[](#VUID-vkGetDescriptorSetLayoutSizeEXT-pLayoutSizeInBytes-parameter) VUID-vkGetDescriptorSetLayoutSizeEXT-pLayoutSizeInBytes-parameter

 `pLayoutSizeInBytes` **must** be a valid pointer to a `VkDeviceSize` value

* 
[](#VUID-vkGetDescriptorSetLayoutSizeEXT-layout-parent) VUID-vkGetDescriptorSetLayoutSizeEXT-layout-parent

 `layout` **must** have been created, allocated, or retrieved from `device`

To get the offset of a binding within a descriptor set layout in memory,
call:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
void vkGetDescriptorSetLayoutBindingOffsetEXT(
    VkDevice                                    device,
    VkDescriptorSetLayout                       layout,
    uint32_t                                    binding,
    VkDeviceSize*                               pOffset);

* 
`device` is the logical device that gets the offset.

* 
`layout` is the descriptor set layout being queried.

* 
`binding` is the binding number being queried.

* 
`pOffset` is a pointer to `VkDeviceSize` where the byte
offset of the binding will be written.

Each binding in a descriptor set layout is assigned an offset in memory by
the implementation.
When a shader accesses a resource with that binding, it will access the
bound descriptor buffer from that offset to look for its descriptor.
This command provides an application with that offset, so that descriptors
can be placed in the correct locations.
The precise location accessed by a shader for a given descriptor is as
follows:

location = bufferAddress +  setOffset + 
descriptorOffset +  (arrayElement × descriptorSize)

where bufferAddress and setOffset are the base address and
offset for the identified descriptor set as specified by
[vkCmdBindDescriptorBuffersEXT](#vkCmdBindDescriptorBuffersEXT) and
[vkCmdSetDescriptorBufferOffsetsEXT](#vkCmdSetDescriptorBufferOffsetsEXT), descriptorOffset is the
offset for the binding returned by this command, arrayElement is the
index into the array specified in the shader, and descriptorSize is
the size of the relevant descriptor as obtained from
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT).
Applications are responsible for placing valid descriptors at the expected
location in order for a shader to access it.
The overall offset added to bufferAddress to calculate location
**must** be less than
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`maxSamplerDescriptorBufferRange`
for samplers and
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`maxResourceDescriptorBufferRange`
for resources.

If any `binding` in `layout` is
[VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT](descriptorsets.html#VkDescriptorBindingFlagBitsEXT), that
`binding` **must** have the largest offset of any `binding`.

A descriptor `binding` with type [VK_DESCRIPTOR_TYPE_MUTABLE_EXT](descriptors.html#VkDescriptorType)
**can** be used.
Any potential types in
[VkMutableDescriptorTypeCreateInfoEXT](descriptorsets.html#VkMutableDescriptorTypeCreateInfoEXT)::`pDescriptorTypes` for
`binding` share the same offset.
If the size of the [mutable descriptor](descriptors.html#descriptors-mutable) is larger
than the size of a concrete descriptor type being accessed, the padding area
is ignored by the implementation.

Valid Usage

* 
[](#VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-None-08013) VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-None-08013

The [`descriptorBuffer`](features.html#features-descriptorBuffer) feature **must**
be enabled

* 
[](#VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-layout-08014) VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-layout-08014

`layout` **must** have been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) flag set

* 
[](#VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-layout-11813) VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-layout-11813

`layout` **must** have not been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) flag set

* 
[](#VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-layout-11814) VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-layout-11814

`layout` **must** have not been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_EMBEDDED_IMMUTABLE_SAMPLERS_BIT_EXT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits)
flag set

Valid Usage (Implicit)

* 
[](#VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-device-parameter) VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-layout-parameter) VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-layout-parameter

 `layout` **must** be a valid [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) handle

* 
[](#VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-pOffset-parameter) VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-pOffset-parameter

 `pOffset` **must** be a valid pointer to a `VkDeviceSize` value

* 
[](#VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-layout-parent) VUID-vkGetDescriptorSetLayoutBindingOffsetEXT-layout-parent

 `layout` **must** have been created, allocated, or retrieved from `device`

To get descriptor data to place in a buffer, call:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
void vkGetDescriptorEXT(
    VkDevice                                    device,
    const VkDescriptorGetInfoEXT*               pDescriptorInfo,
    size_t                                      dataSize,
    void*                                       pDescriptor);

* 
`device` is the logical device that gets the descriptor.

* 
`pDescriptorInfo` is a pointer to a [VkDescriptorGetInfoEXT](#VkDescriptorGetInfoEXT)
structure specifying the parameters of the descriptor to get.

* 
`dataSize` is the amount of the descriptor data to get in bytes.

* 
`pDescriptor` is a pointer to an application-allocated buffer where
the descriptor will be written.

The size of the data for each descriptor type is determined by the value in
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT).
This value also defines the stride in bytes for arrays of that descriptor
type.

If the
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`combinedImageSamplerDescriptorSingleArray`
property is [VK_FALSE](fundamentals.html#VK_FALSE) the implementation requires an array of
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](descriptors.html#VkDescriptorType) descriptors to be written
into a descriptor buffer as an array of image descriptors, immediately
followed by an array of sampler descriptors.
Applications **must** write the first
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`sampledImageDescriptorSize`
bytes of the data returned through `pDescriptor` to the first array, and
the remaining
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`samplerDescriptorSize`
bytes of the data to the second array.
For variable-sized descriptor bindings of
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](descriptors.html#VkDescriptorType) descriptors, the two arrays
each have a size equal to the upper bound `descriptorCount` of that
binding.

A descriptor obtained by this command references the underlying
[VkImageView](resources.html#VkImageView) or [VkSampler](samplers.html#VkSampler), and these objects **must** not be
destroyed before the last time a descriptor is dynamically accessed.
For descriptor types which consume an address instead of an object, the
underlying [VkBuffer](resources.html#VkBuffer) is referenced instead.

Valid Usage

* 
[](#VUID-vkGetDescriptorEXT-None-08015) VUID-vkGetDescriptorEXT-None-08015

The [`descriptorBuffer`](features.html#features-descriptorBuffer) feature **must**
be enabled

* 
[](#VUID-vkGetDescriptorEXT-dataSize-08125) VUID-vkGetDescriptorEXT-dataSize-08125

If `pDescriptorInfo->type` is not
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](descriptors.html#VkDescriptorType) or
`pDescriptorInfo->data.pCombinedImageSampler` has an `imageView`
member that was not created with a `VkSamplerYcbcrConversionInfo`
structure in its `pNext` chain,
`dataSize` **must** equal the size of a descriptor of type
[VkDescriptorGetInfoEXT](#VkDescriptorGetInfoEXT)::`type` determined by the value in
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)
, or determined by
[VkPhysicalDeviceDescriptorBufferDensityMapPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferDensityMapPropertiesEXT)::`combinedImageSamplerDensityMapDescriptorSize`
if `pDescriptorInfo` specifies a
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](descriptors.html#VkDescriptorType) whose [VkSampler](samplers.html#VkSampler)
was created with [VK_SAMPLER_CREATE_SUBSAMPLED_BIT_EXT](samplers.html#VkSamplerCreateFlagBits) set

* 
[](#VUID-vkGetDescriptorEXT-descriptorType-09469) VUID-vkGetDescriptorEXT-descriptorType-09469

If `pDescriptorInfo->type` is
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](descriptors.html#VkDescriptorType) and
`pDescriptorInfo->data.pCombinedImageSampler` has an `imageView`
member that was created with a `VkSamplerYcbcrConversionInfo`
structure in its `pNext` chain, `dataSize` **must** equal the size
of
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`combinedImageSamplerDescriptorSize`
times
[VkSamplerYcbcrConversionImageFormatProperties](capabilities.html#VkSamplerYcbcrConversionImageFormatProperties)::`combinedImageSamplerDescriptorCount`

* 
[](#VUID-vkGetDescriptorEXT-pDescriptorInfo-09507) VUID-vkGetDescriptorEXT-pDescriptorInfo-09507

If `pDescriptorInfo->type` is
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](descriptors.html#VkDescriptorType) and it has a
`imageView` that is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) then `dataSize` **must**
be equal to the size of
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`combinedImageSamplerDescriptorSize`

Valid Usage (Implicit)

* 
[](#VUID-vkGetDescriptorEXT-device-parameter) VUID-vkGetDescriptorEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetDescriptorEXT-pDescriptorInfo-parameter) VUID-vkGetDescriptorEXT-pDescriptorInfo-parameter

 `pDescriptorInfo` **must** be a valid pointer to a valid [VkDescriptorGetInfoEXT](#VkDescriptorGetInfoEXT) structure

* 
[](#VUID-vkGetDescriptorEXT-pDescriptor-parameter) VUID-vkGetDescriptorEXT-pDescriptor-parameter

 `pDescriptor` **must** be a valid pointer to an array of `dataSize` bytes

* 
[](#VUID-vkGetDescriptorEXT-dataSize-arraylength) VUID-vkGetDescriptorEXT-dataSize-arraylength

 `dataSize` **must** be greater than `0`

Information about the descriptor to get is passed in a
`VkDescriptorGetInfoEXT` structure:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
typedef struct VkDescriptorGetInfoEXT {
    VkStructureType        sType;
    const void*            pNext;
    VkDescriptorType       type;
    VkDescriptorDataEXT    data;
} VkDescriptorGetInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`type` is the type of descriptor to get.

* 
`data` is a [VkDescriptorDataEXT](#VkDescriptorDataEXT) union containing the
information needed to get the descriptor.

Valid Usage

* 
[](#VUID-VkDescriptorGetInfoEXT-type-08018) VUID-VkDescriptorGetInfoEXT-type-08018

`type` **must** not be [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER_DYNAMIC](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER_DYNAMIC](descriptors.html#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](descriptors.html#VkDescriptorType)

* 
[](#VUID-VkDescriptorGetInfoEXT-type-08019) VUID-VkDescriptorGetInfoEXT-type-08019

If `type` is [VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](descriptors.html#VkDescriptorType), the
`pCombinedImageSampler->sampler` member of `data` **must** be a
[VkSampler](samplers.html#VkSampler) created on `device`

* 
[](#VUID-VkDescriptorGetInfoEXT-type-08020) VUID-VkDescriptorGetInfoEXT-type-08020

If `type` is [VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](descriptors.html#VkDescriptorType), the
`pCombinedImageSampler->imageView` member of `data` **must** be a
[VkImageView](resources.html#VkImageView) created on `device`, or [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkDescriptorGetInfoEXT-type-08021) VUID-VkDescriptorGetInfoEXT-type-08021

If `type` is [VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](descriptors.html#VkDescriptorType), the
`pInputAttachmentImage->imageView` member of `data` **must** be a
[VkImageView](resources.html#VkImageView) created on `device`

* 
[](#VUID-VkDescriptorGetInfoEXT-type-08022) VUID-VkDescriptorGetInfoEXT-type-08022

If `type` is [VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptors.html#VkDescriptorType), and if
`pSampledImage` is not `NULL`, the `pSampledImage->imageView`
member of `data` **must** be a [VkImageView](resources.html#VkImageView) created on
`device`, or [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkDescriptorGetInfoEXT-type-08023) VUID-VkDescriptorGetInfoEXT-type-08023

If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptors.html#VkDescriptorType), and if
`pStorageImage` is not `NULL`, the `pStorageImage->imageView`
member of `data` **must** be a [VkImageView](resources.html#VkImageView) created on
`device`, or [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkDescriptorGetInfoEXT-type-09427) VUID-VkDescriptorGetInfoEXT-type-09427

If `type` is [VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](descriptors.html#VkDescriptorType),
`pUniformBuffer` is not `NULL` , the number of texel buffer elements
given by (⌊`pUniformBuffer->range` / (texel block
size)⌋ × (texels per block)) where texel block size and
texels per block are as defined in the [    Compatible Formats](formats.html#formats-compatibility) table for `pUniformBuffer->format`, **must** be
less than or equal to
`VkPhysicalDeviceLimits`::`maxTexelBufferElements`

* 
[](#VUID-VkDescriptorGetInfoEXT-type-09428) VUID-VkDescriptorGetInfoEXT-type-09428

If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptors.html#VkDescriptorType),
`pStorageBuffer` is not `NULL` , the number of texel buffer elements
given by (⌊`pStorageBuffer->range` / (texel block
size)⌋ × (texels per block)) where texel block size and
texels per block are as defined in the [    Compatible Formats](formats.html#formats-compatibility) table for `pStorageBuffer->format`, **must** be
less than or equal to
`VkPhysicalDeviceLimits`::`maxTexelBufferElements`

* 
[](#VUID-VkDescriptorGetInfoEXT-type-08028) VUID-VkDescriptorGetInfoEXT-type-08028

If `type` is [VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](descriptors.html#VkDescriptorType) and
`accelerationStructure` is not `0`, `accelerationStructure`
**must** contain the address of a [VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR) created
on `device`

* 
[](#VUID-VkDescriptorGetInfoEXT-type-08029) VUID-VkDescriptorGetInfoEXT-type-08029

If `type` is [VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](descriptors.html#VkDescriptorType) and
`accelerationStructure` is not `0`, `accelerationStructure`
**must** contain the handle of a [VkAccelerationStructureNV](resources.html#VkAccelerationStructureNV) created on
`device`, returned by [vkGetAccelerationStructureHandleNV](resources.html#vkGetAccelerationStructureHandleNV)

* 
[](#VUID-VkDescriptorGetInfoEXT-type-09701) VUID-VkDescriptorGetInfoEXT-type-09701

If `type` is [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptors.html#VkDescriptorType), a
[VkDescriptorGetTensorInfoARM](#VkDescriptorGetTensorInfoARM) structure **must** be included in the
`pNext` chain and `data` is ignored

* 
[](#VUID-VkDescriptorGetInfoEXT-type-12216) VUID-VkDescriptorGetInfoEXT-type-12216

If `type` is [VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](descriptors.html#VkDescriptorType) and
`pCombinedImageSampler->imageView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the
`pCombinedImageSampler->imageView` member of `data` **must** have
been created with [VK_IMAGE_USAGE_SAMPLED_BIT](resources.html#VkImageUsageFlagBits) set

* 
[](#VUID-VkDescriptorGetInfoEXT-type-12217) VUID-VkDescriptorGetInfoEXT-type-12217

If `type` is [VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptors.html#VkDescriptorType),
`pSampledImage` is not `NULL`, and `pSampledImage->imageView` is
not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the `pSampledImage->imageView` member of
`data` **must** have been created with [VK_IMAGE_USAGE_SAMPLED_BIT](resources.html#VkImageUsageFlagBits)
set

* 
[](#VUID-VkDescriptorGetInfoEXT-type-12218) VUID-VkDescriptorGetInfoEXT-type-12218

If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptors.html#VkDescriptorType),
`pStorageImage` is not `NULL`, and `pStorageImage->imageView` is
not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the `pStorageImage->imageView` member of
`data` **must** have been created with [VK_IMAGE_USAGE_STORAGE_BIT](resources.html#VkImageUsageFlagBits)
set

* 
[](#VUID-VkDescriptorGetInfoEXT-type-12219) VUID-VkDescriptorGetInfoEXT-type-12219

If `type` is [VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](descriptors.html#VkDescriptorType), the
`pInputAttachmentImage->imageView` member of `data` **must** have
been created with [VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits) set

* 
[](#VUID-VkDescriptorGetInfoEXT-type-12220) VUID-VkDescriptorGetInfoEXT-type-12220

If `type` is [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](descriptors.html#VkDescriptorType),
`pUniformBuffer` is not `NULL` and `pUniformBuffer->address` is
not zero, `pUniformBuffer->address` **must** be a device address
allocated to the application from a buffer created with the
[VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-VkDescriptorGetInfoEXT-type-12221) VUID-VkDescriptorGetInfoEXT-type-12221

If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](descriptors.html#VkDescriptorType),
`pStorageBuffer` is not `NULL` and `pStorageBuffer->address` is
not zero, `pStorageBuffer->address` **must** be a device address
allocated to the application from a buffer created with the
[VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-VkDescriptorGetInfoEXT-type-12222) VUID-VkDescriptorGetInfoEXT-type-12222

If `type` is [VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](descriptors.html#VkDescriptorType),
`pUniformTexelBuffer` is not `NULL` and
`pUniformTexelBuffer->address` is not zero,
`pUniformTexelBuffer->address` **must** be a device address allocated
to the application from a buffer created with the
[VK_BUFFER_USAGE_UNIFORM_TEXEL_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-VkDescriptorGetInfoEXT-type-12223) VUID-VkDescriptorGetInfoEXT-type-12223

If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptors.html#VkDescriptorType),
`pStorageTexelBuffer` is not `NULL` and
`pStorageTexelBuffer->address` is not zero,
`pStorageTexelBuffer->address` **must** be a device address allocated
to the application from a buffer created with the
[VK_BUFFER_USAGE_STORAGE_TEXEL_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-VkDescriptorGetInfoEXT-type-12265) VUID-VkDescriptorGetInfoEXT-type-12265

If `type` is [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](descriptors.html#VkDescriptorType) and
`pUniformBuffer` is not `NULL`, `pUniformBuffer->address` **must**
be aligned to
`VkPhysicalDeviceLimits`::`minUniformBufferOffsetAlignment`

* 
[](#VUID-VkDescriptorGetInfoEXT-type-12266) VUID-VkDescriptorGetInfoEXT-type-12266

If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](descriptors.html#VkDescriptorType) and
`pStorageBuffer` is not `NULL`, `pStorageBuffer->address` **must**
be aligned to
`VkPhysicalDeviceLimits`::`minStorageBufferOffsetAlignment`

* 
[](#VUID-VkDescriptorGetInfoEXT-type-12269) VUID-VkDescriptorGetInfoEXT-type-12269

If `type` is [VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](descriptors.html#VkDescriptorType), and
`pUniformTexelBuffer` is not `NULL`,
`pUniformTexelBuffer->address` **must** be a multiple of the effective
alignment requirement as determined by
[`minTexelBufferOffsetAlignment`](limits.html#limits-minTexelBufferOffsetAlignment)

* 
[](#VUID-VkDescriptorGetInfoEXT-type-12270) VUID-VkDescriptorGetInfoEXT-type-12270

If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptors.html#VkDescriptorType), the and
`pStorageTexelBuffer` is not `NULL`,
`pStorageTexelBuffer->address` **must** be a multiple of the effective
alignment requirement as determined by
[`minTexelBufferOffsetAlignment`](limits.html#limits-minTexelBufferOffsetAlignment)

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorGetInfoEXT-sType-sType) VUID-VkDescriptorGetInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DESCRIPTOR_GET_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDescriptorGetInfoEXT-pNext-pNext) VUID-VkDescriptorGetInfoEXT-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkDescriptorGetTensorInfoARM](#VkDescriptorGetTensorInfoARM)

* 
[](#VUID-VkDescriptorGetInfoEXT-sType-unique) VUID-VkDescriptorGetInfoEXT-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkDescriptorGetInfoEXT-type-parameter) VUID-VkDescriptorGetInfoEXT-type-parameter

 `type` **must** be a valid [VkDescriptorType](descriptors.html#VkDescriptorType) value

* 
[](#VUID-VkDescriptorGetInfoEXT-pSampler-parameter) VUID-VkDescriptorGetInfoEXT-pSampler-parameter

 If `type` is [VK_DESCRIPTOR_TYPE_SAMPLER](descriptors.html#VkDescriptorType), the `pSampler` member of `data` **must** be a valid pointer to a valid [VkSampler](samplers.html#VkSampler) handle

* 
[](#VUID-VkDescriptorGetInfoEXT-pCombinedImageSampler-parameter) VUID-VkDescriptorGetInfoEXT-pCombinedImageSampler-parameter

 If `type` is [VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](descriptors.html#VkDescriptorType), the `pCombinedImageSampler` member of `data` **must** be a valid pointer to a valid [VkDescriptorImageInfo](descriptorsets.html#VkDescriptorImageInfo) structure

* 
[](#VUID-VkDescriptorGetInfoEXT-pInputAttachmentImage-parameter) VUID-VkDescriptorGetInfoEXT-pInputAttachmentImage-parameter

 If `type` is [VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](descriptors.html#VkDescriptorType), the `pInputAttachmentImage` member of `data` **must** be a valid pointer to a valid [VkDescriptorImageInfo](descriptorsets.html#VkDescriptorImageInfo) structure

* 
[](#VUID-VkDescriptorGetInfoEXT-pSampledImage-parameter) VUID-VkDescriptorGetInfoEXT-pSampledImage-parameter

 If `type` is [VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptors.html#VkDescriptorType), and if `pSampledImage` is not `NULL`, the `pSampledImage` member of `data` **must** be a valid pointer to a valid [VkDescriptorImageInfo](descriptorsets.html#VkDescriptorImageInfo) structure

* 
[](#VUID-VkDescriptorGetInfoEXT-pStorageImage-parameter) VUID-VkDescriptorGetInfoEXT-pStorageImage-parameter

 If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptors.html#VkDescriptorType), and if `pStorageImage` is not `NULL`, the `pStorageImage` member of `data` **must** be a valid pointer to a valid [VkDescriptorImageInfo](descriptorsets.html#VkDescriptorImageInfo) structure

* 
[](#VUID-VkDescriptorGetInfoEXT-pUniformTexelBuffer-parameter) VUID-VkDescriptorGetInfoEXT-pUniformTexelBuffer-parameter

 If `type` is [VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](descriptors.html#VkDescriptorType), and if `pUniformTexelBuffer` is not `NULL`, the `pUniformTexelBuffer` member of `data` **must** be a valid pointer to a valid [VkDescriptorAddressInfoEXT](#VkDescriptorAddressInfoEXT) structure

* 
[](#VUID-VkDescriptorGetInfoEXT-pStorageTexelBuffer-parameter) VUID-VkDescriptorGetInfoEXT-pStorageTexelBuffer-parameter

 If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptors.html#VkDescriptorType), and if `pStorageTexelBuffer` is not `NULL`, the `pStorageTexelBuffer` member of `data` **must** be a valid pointer to a valid [VkDescriptorAddressInfoEXT](#VkDescriptorAddressInfoEXT) structure

* 
[](#VUID-VkDescriptorGetInfoEXT-pUniformBuffer-parameter) VUID-VkDescriptorGetInfoEXT-pUniformBuffer-parameter

 If `type` is [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](descriptors.html#VkDescriptorType), and if `pUniformBuffer` is not `NULL`, the `pUniformBuffer` member of `data` **must** be a valid pointer to a valid [VkDescriptorAddressInfoEXT](#VkDescriptorAddressInfoEXT) structure

* 
[](#VUID-VkDescriptorGetInfoEXT-pStorageBuffer-parameter) VUID-VkDescriptorGetInfoEXT-pStorageBuffer-parameter

 If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](descriptors.html#VkDescriptorType), and if `pStorageBuffer` is not `NULL`, the `pStorageBuffer` member of `data` **must** be a valid pointer to a valid [VkDescriptorAddressInfoEXT](#VkDescriptorAddressInfoEXT) structure

* 
[](#VUID-VkDescriptorGetInfoEXT-accelerationStructure-parameter) VUID-VkDescriptorGetInfoEXT-accelerationStructure-parameter

 If `type` is [VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](descriptors.html#VkDescriptorType) or [VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](descriptors.html#VkDescriptorType), the `accelerationStructure` member of `data` **must** be a valid `VkDeviceAddress` value

Data describing the descriptor is passed in a `VkDescriptorDataEXT`
structure:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
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
`pSampler` is a pointer to a [VkSampler](samplers.html#VkSampler) handle specifying the
parameters of a [VK_DESCRIPTOR_TYPE_SAMPLER](descriptors.html#VkDescriptorType) descriptor.

* 
`pCombinedImageSampler` is a pointer to a
[VkDescriptorImageInfo](descriptorsets.html#VkDescriptorImageInfo) structure specifying the parameters of a
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](descriptors.html#VkDescriptorType) descriptor.

* 
`pInputAttachmentImage` is a pointer to a
[VkDescriptorImageInfo](descriptorsets.html#VkDescriptorImageInfo) structure specifying the parameters of a
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](descriptors.html#VkDescriptorType) descriptor.

* 
`pSampledImage` is a pointer to a [VkDescriptorImageInfo](descriptorsets.html#VkDescriptorImageInfo)
structure specifying the parameters of a
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptors.html#VkDescriptorType) descriptor.

* 
`pStorageImage` is a pointer to a [VkDescriptorImageInfo](descriptorsets.html#VkDescriptorImageInfo)
structure specifying the parameters of a
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptors.html#VkDescriptorType) descriptor.

* 
`pUniformTexelBuffer` is a pointer to a
[VkDescriptorAddressInfoEXT](#VkDescriptorAddressInfoEXT) structure specifying the parameters of
a [VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](descriptors.html#VkDescriptorType) descriptor.

* 
`pStorageTexelBuffer` is a pointer to a
[VkDescriptorAddressInfoEXT](#VkDescriptorAddressInfoEXT) structure specifying the parameters of
a [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptors.html#VkDescriptorType) descriptor.

* 
`pUniformBuffer` is a pointer to a [VkDescriptorAddressInfoEXT](#VkDescriptorAddressInfoEXT)
structure specifying the parameters of a
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](descriptors.html#VkDescriptorType) descriptor.

* 
`pStorageBuffer` is a pointer to a [VkDescriptorAddressInfoEXT](#VkDescriptorAddressInfoEXT)
structure specifying the parameters of a
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](descriptors.html#VkDescriptorType) descriptor.

* 
`accelerationStructure` is
     the address of a [VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR) specifying the
     parameters of a [VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](descriptors.html#VkDescriptorType)
     descriptor
, or
    a [VkAccelerationStructureNV](resources.html#VkAccelerationStructureNV) handle specifying the parameters of a
    [VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](descriptors.html#VkDescriptorType) descriptor.

If the [`nullDescriptor`](features.html#features-nullDescriptor) feature is enabled,
`pSampledImage`, `pStorageImage`, `pUniformTexelBuffer`,
`pStorageTexelBuffer`, `pUniformBuffer`, and `pStorageBuffer`
**can** each be `NULL`.
Loads from a null descriptor return zero values and stores and atomics to a
null descriptor are discarded.

If the [`nullDescriptor`](features.html#features-nullDescriptor) feature is enabled,
`accelerationStructure` **can** be `0`.
A null acceleration structure descriptor results in the miss shader being
invoked.

Valid Usage

* 
[](#VUID-VkDescriptorDataEXT-type-08034) VUID-VkDescriptorDataEXT-type-08034

If [VkDescriptorGetInfoEXT](#VkDescriptorGetInfoEXT)::`type` is
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](descriptors.html#VkDescriptorType), and the
[`nullDescriptor`](features.html#features-nullDescriptor) feature is not
enabled, `pCombinedImageSampler->imageView` **must** not be
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkDescriptorDataEXT-type-08035) VUID-VkDescriptorDataEXT-type-08035

If [VkDescriptorGetInfoEXT](#VkDescriptorGetInfoEXT)::`type` is
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptors.html#VkDescriptorType), and the
[`nullDescriptor`](features.html#features-nullDescriptor) feature is not
enabled, `pSampledImage` **must** not be `NULL` and
`pSampledImage->imageView` **must** not be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkDescriptorDataEXT-type-08036) VUID-VkDescriptorDataEXT-type-08036

If [VkDescriptorGetInfoEXT](#VkDescriptorGetInfoEXT)::`type` is
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptors.html#VkDescriptorType), and the
[`nullDescriptor`](features.html#features-nullDescriptor) feature is not
enabled, `pStorageImage` **must** not be `NULL` and
`pStorageImage->imageView` **must** not be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkDescriptorDataEXT-type-08037) VUID-VkDescriptorDataEXT-type-08037

If [VkDescriptorGetInfoEXT](#VkDescriptorGetInfoEXT)::`type` is
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](descriptors.html#VkDescriptorType), and the
[`nullDescriptor`](features.html#features-nullDescriptor) feature is not
enabled, `pUniformTexelBuffer` **must** not be `NULL`

* 
[](#VUID-VkDescriptorDataEXT-type-08038) VUID-VkDescriptorDataEXT-type-08038

If [VkDescriptorGetInfoEXT](#VkDescriptorGetInfoEXT)::`type` is
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptors.html#VkDescriptorType), and the
[`nullDescriptor`](features.html#features-nullDescriptor) feature is not
enabled, `pStorageTexelBuffer` **must** not be `NULL`

* 
[](#VUID-VkDescriptorDataEXT-type-08039) VUID-VkDescriptorDataEXT-type-08039

If [VkDescriptorGetInfoEXT](#VkDescriptorGetInfoEXT)::`type` is
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](descriptors.html#VkDescriptorType), and the
[`nullDescriptor`](features.html#features-nullDescriptor) feature is not
enabled, `pUniformBuffer` **must** not be `NULL`

* 
[](#VUID-VkDescriptorDataEXT-type-08040) VUID-VkDescriptorDataEXT-type-08040

If [VkDescriptorGetInfoEXT](#VkDescriptorGetInfoEXT)::`type` is
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](descriptors.html#VkDescriptorType), and the
[`nullDescriptor`](features.html#features-nullDescriptor) feature is not
enabled, `pStorageBuffer` **must** not be `NULL`

* 
[](#VUID-VkDescriptorDataEXT-type-08041) VUID-VkDescriptorDataEXT-type-08041

If [VkDescriptorGetInfoEXT](#VkDescriptorGetInfoEXT)::`type` is
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](descriptors.html#VkDescriptorType), and the
[`nullDescriptor`](features.html#features-nullDescriptor) feature is not
enabled, `accelerationStructure` **must** not be `0`

* 
[](#VUID-VkDescriptorDataEXT-type-08042) VUID-VkDescriptorDataEXT-type-08042

If [VkDescriptorGetInfoEXT](#VkDescriptorGetInfoEXT)::`type` is
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](descriptors.html#VkDescriptorType), and the
[`nullDescriptor`](features.html#features-nullDescriptor) feature is not
enabled, `accelerationStructure` **must** not be `0`

Data describing a [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](descriptors.html#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptors.html#VkDescriptorType) descriptor is passed in a
`VkDescriptorAddressInfoEXT` structure:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
typedef struct VkDescriptorAddressInfoEXT {
    VkStructureType    sType;
    void*              pNext;
    VkDeviceAddress    address;
    VkDeviceSize       range;
    VkFormat           format;
} VkDescriptorAddressInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`address` is either `0` or a device address at an offset in a
buffer, where the base address can be queried from
[vkGetBufferDeviceAddress](resources.html#vkGetBufferDeviceAddress).

* 
`range` is the size in bytes of the buffer or buffer view used by
the descriptor.

* 
`format` is the format of the data elements in the buffer view and
is ignored for buffers.

Valid Usage

* 
[](#VUID-VkDescriptorAddressInfoEXT-None-09508) VUID-VkDescriptorAddressInfoEXT-None-09508

If
`address` is not zero, and
the descriptor is of type [VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](descriptors.html#VkDescriptorType)
or [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptors.html#VkDescriptorType), then `format`
**must** not be [VK_FORMAT_UNDEFINED](formats.html#VkFormat)

* 
[](#VUID-VkDescriptorAddressInfoEXT-address-08043) VUID-VkDescriptorAddressInfoEXT-address-08043

If the [`nullDescriptor`](features.html#features-nullDescriptor) feature is not
enabled,
`address` **must** not be zero

* 
[](#VUID-VkDescriptorAddressInfoEXT-nullDescriptor-08938) VUID-VkDescriptorAddressInfoEXT-nullDescriptor-08938

If `address` is zero, `range` **must** be [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE)

* 
[](#VUID-VkDescriptorAddressInfoEXT-nullDescriptor-08939) VUID-VkDescriptorAddressInfoEXT-nullDescriptor-08939

If `address` is not zero,
`range` **must** not be [VK_WHOLE_SIZE](synchronization.html#VK_WHOLE_SIZE)

* 
[](#VUID-VkDescriptorAddressInfoEXT-range-08045) VUID-VkDescriptorAddressInfoEXT-range-08045

If `address` is not zero, then `range` **must** be less than or
equal to the size of the buffer containing `address` minus the
offset of `address` from the base address of the buffer

* 
[](#VUID-VkDescriptorAddressInfoEXT-range-08940) VUID-VkDescriptorAddressInfoEXT-range-08940

`range` **must** not be zero

* 
[](#VUID-VkDescriptorAddressInfoEXT-None-12271) VUID-VkDescriptorAddressInfoEXT-None-12271

    If
Vulkan 1.3 is not supported and
    the [`ycbcr2plane444Formats`](features.html#features-ycbcr2plane444Formats)
    feature is not enabled, `format` **must** not be
    [VK_FORMAT_G8_B8R8_2PLANE_444_UNORM](formats.html#VkFormat),
    [VK_FORMAT_G10X6_B10X6R10X6_2PLANE_444_UNORM_3PACK16](formats.html#VkFormat),
    [VK_FORMAT_G12X4_B12X4R12X4_2PLANE_444_UNORM_3PACK16](formats.html#VkFormat), or
    [VK_FORMAT_G16_B16R16_2PLANE_444_UNORM](formats.html#VkFormat)

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorAddressInfoEXT-sType-sType) VUID-VkDescriptorAddressInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DESCRIPTOR_ADDRESS_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDescriptorAddressInfoEXT-pNext-pNext) VUID-VkDescriptorAddressInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkDescriptorAddressInfoEXT-address-parameter) VUID-VkDescriptorAddressInfoEXT-address-parameter

 If `address` is not `0`, `address` **must** be a valid `VkDeviceAddress` value

* 
[](#VUID-VkDescriptorAddressInfoEXT-format-parameter) VUID-VkDescriptorAddressInfoEXT-format-parameter

 `format` **must** be a valid [VkFormat](formats.html#VkFormat) value

If the [`nullDescriptor`](features.html#features-nullDescriptor) feature is enabled,
`address` **can** be zero.
Loads from a null descriptor return zero values and stores and atomics to a
null descriptor are discarded.

Immutable samplers specified in a descriptor set layout through
`pImmutableSamplers` **must** be provided by applications when obtaining
descriptor data.
Immutable samplers written in a descriptor buffer **must** have identical
parameters to the immutable samplers in the descriptor set layout that
consumes the sampler.

|  | If the descriptor set layout was created with
| --- | --- |
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_EMBEDDED_IMMUTABLE_SAMPLERS_BIT_EXT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits),
there is no buffer backing for the immutable sampler, so this requirement
does not exist.
The implementation handles allocation of these descriptors internally. |

|  | As descriptors are now in regular memory, drivers cannot hide copies of
| --- | --- |
immutable samplers that end up in descriptor sets from the application.
As such, applications are required to provide these samplers as if they were
not provided immutably. |

The `VkDescriptorGetTensorInfoARM` is defined as:

// Provided by VK_EXT_descriptor_buffer with VK_ARM_tensors
typedef struct VkDescriptorGetTensorInfoARM {
    VkStructureType    sType;
    const void*        pNext;
    VkTensorViewARM    tensorView;
} VkDescriptorGetTensorInfoARM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`tensorView` is a [VkTensorViewARM](resources.html#VkTensorViewARM) handle specifying the
parameters of a [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptors.html#VkDescriptorType) descriptor.

Valid Usage

* 
[](#VUID-VkDescriptorGetTensorInfoARM-nullDescriptor-09899) VUID-VkDescriptorGetTensorInfoARM-nullDescriptor-09899

If the [`nullDescriptor`](features.html#features-nullDescriptor) feature is not
enabled, `tensorView` **must** not be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorGetTensorInfoARM-sType-sType) VUID-VkDescriptorGetTensorInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DESCRIPTOR_GET_TENSOR_INFO_ARM](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDescriptorGetTensorInfoARM-tensorView-parameter) VUID-VkDescriptorGetTensorInfoARM-tensorView-parameter

 If `tensorView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `tensorView` **must** be a valid [VkTensorViewARM](resources.html#VkTensorViewARM) handle

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDescriptorGetInfoEXT](#VkDescriptorGetInfoEXT)

Descriptor buffers have their own separate binding point on the command
buffer, with buffers bound using [vkCmdBindDescriptorBuffersEXT](#vkCmdBindDescriptorBuffersEXT).
[vkCmdSetDescriptorBufferOffsetsEXT](#vkCmdSetDescriptorBufferOffsetsEXT) assigns pairs of buffer binding
indices and buffer offsets to the same binding point on the command buffer
as [vkCmdBindDescriptorSets](descriptorsets.html#vkCmdBindDescriptorSets), allowing subsequent
[bound pipeline commands](pipelines.html#pipelines-bindpoint-commands) to use the
specified descriptor buffers.
Bindings applied via [vkCmdBindDescriptorSets](descriptorsets.html#vkCmdBindDescriptorSets) **cannot** exist
simultaneously with those applied via calls to
[vkCmdSetDescriptorBufferOffsetsEXT](#vkCmdSetDescriptorBufferOffsetsEXT) or
[vkCmdBindDescriptorBufferEmbeddedSamplersEXT](#vkCmdBindDescriptorBufferEmbeddedSamplersEXT), as calls to
[vkCmdSetDescriptorBufferOffsetsEXT](#vkCmdSetDescriptorBufferOffsetsEXT) or
[vkCmdBindDescriptorBufferEmbeddedSamplersEXT](#vkCmdBindDescriptorBufferEmbeddedSamplersEXT) invalidate any bindings
by previous calls to [vkCmdBindDescriptorSets](descriptorsets.html#vkCmdBindDescriptorSets) and vice-versa.

To bind descriptor buffers to a command buffer, call:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
void vkCmdBindDescriptorBuffersEXT(
    VkCommandBuffer                             commandBuffer,
    uint32_t                                    bufferCount,
    const VkDescriptorBufferBindingInfoEXT*     pBindingInfos);

* 
`commandBuffer` is the command buffer that the descriptor buffers
will be bound to.

* 
`bufferCount` is the number of elements in the `pBindingInfos`
array.

* 
`pBindingInfos` is a pointer to an array of
[VkDescriptorBufferBindingInfoEXT](#VkDescriptorBufferBindingInfoEXT) structures.

`vkCmdBindDescriptorBuffersEXT` causes any offsets previously set by
[vkCmdSetDescriptorBufferOffsetsEXT](#vkCmdSetDescriptorBufferOffsetsEXT) that use the bindings numbered
[`0`..
`bufferCount`-1] to be no longer valid for subsequent bound pipeline
commands.
Any previously bound buffers at binding points greater than or equal to
`bufferCount` are unbound.

Valid Usage

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-commandBuffer-11295) VUID-vkCmdBindDescriptorBuffersEXT-commandBuffer-11295

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pSamplerHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-commandBuffer-11296) VUID-vkCmdBindDescriptorBuffersEXT-commandBuffer-11296

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pResourceHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-None-08047) VUID-vkCmdBindDescriptorBuffersEXT-None-08047

The [`descriptorBuffer`](features.html#features-descriptorBuffer) feature **must**
be enabled

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-maxSamplerDescriptorBufferBindings-08048) VUID-vkCmdBindDescriptorBuffersEXT-maxSamplerDescriptorBufferBindings-08048

There **must** be no more than
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`maxSamplerDescriptorBufferBindings`
elements in `pBindingInfos` with
[VkDescriptorBufferBindingInfoEXT](#VkDescriptorBufferBindingInfoEXT)::`usage` containing
[VK_BUFFER_USAGE_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits)

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-maxResourceDescriptorBufferBindings-08049) VUID-vkCmdBindDescriptorBuffersEXT-maxResourceDescriptorBufferBindings-08049

There **must** be no more than
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`maxResourceDescriptorBufferBindings`
elements in `pBindingInfos` with
[VkDescriptorBufferBindingInfoEXT](#VkDescriptorBufferBindingInfoEXT)::`usage` containing
[VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits)

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-None-08050) VUID-vkCmdBindDescriptorBuffersEXT-None-08050

There **must** be no more than `1` element in `pBindingInfos` with
[VkDescriptorBufferBindingInfoEXT](#VkDescriptorBufferBindingInfoEXT)::`usage` containing
[VK_BUFFER_USAGE_PUSH_DESCRIPTORS_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits)

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-bufferCount-08051) VUID-vkCmdBindDescriptorBuffersEXT-bufferCount-08051

`bufferCount` **must** be less than or equal to
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`maxDescriptorBufferBindings`

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-pBindingInfos-08053) VUID-vkCmdBindDescriptorBuffersEXT-pBindingInfos-08053

For each element of `pBindingInfos`, the buffer from which
`address` was queried **must** have been created with the
[VK_BUFFER_USAGE_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits) usage flag set
if it contains sampler descriptor data

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-pBindingInfos-08054) VUID-vkCmdBindDescriptorBuffersEXT-pBindingInfos-08054

For each element of `pBindingInfos`, the buffer from which
`address` was queried **must** have been created with the
[VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits) usage flag set
if it contains resource descriptor data

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-pBindingInfos-08055) VUID-vkCmdBindDescriptorBuffersEXT-pBindingInfos-08055

For each element of `pBindingInfos`, at least one buffer from which
`address` was queried must contain `usage`

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-pBindingInfos-09947) VUID-vkCmdBindDescriptorBuffersEXT-pBindingInfos-09947

For all elements of `pBindingInfos`, the buffer from which
`address` was queried **must** have been created with the
[VK_BUFFER_USAGE_2_DATA_GRAPH_FOREIGN_DESCRIPTOR_BIT_ARM](resources.html#VkBufferUsageFlagBits2KHR) usage flag
set if the command pool from which `commandBuffer` was allocated
from was created with any element of
[VkDataGraphProcessingEngineCreateInfoARM](VK_ARM_data_graph/graphs.html#VkDataGraphProcessingEngineCreateInfoARM)::pProcessingEngines with
`isForeign` set to [VK_TRUE](fundamentals.html#VK_TRUE)

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-commandBuffer-parameter) VUID-vkCmdBindDescriptorBuffersEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-pBindingInfos-parameter) VUID-vkCmdBindDescriptorBuffersEXT-pBindingInfos-parameter

 `pBindingInfos` **must** be a valid pointer to an array of `bufferCount` valid [VkDescriptorBufferBindingInfoEXT](#VkDescriptorBufferBindingInfoEXT) structures

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-commandBuffer-recording) VUID-vkCmdBindDescriptorBuffersEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-commandBuffer-cmdpool) VUID-vkCmdBindDescriptorBuffersEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_DATA_GRAPH_BIT_ARM](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-videocoding) VUID-vkCmdBindDescriptorBuffersEXT-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBindDescriptorBuffersEXT-bufferCount-arraylength) VUID-vkCmdBindDescriptorBuffersEXT-bufferCount-arraylength

 `bufferCount` **must** be greater than `0`

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_DATA_GRAPH_BIT_ARM

VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdBindDescriptorBuffersEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

Data describing a descriptor buffer binding is passed in a
`VkDescriptorBufferBindingInfoEXT` structure:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
typedef struct VkDescriptorBufferBindingInfoEXT {
    VkStructureType       sType;
    const void*           pNext;
    VkDeviceAddress       address;
    VkBufferUsageFlags    usage;
} VkDescriptorBufferBindingInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`address` is a `VkDeviceAddress` specifying the device
address defining the descriptor buffer to be bound.

* 
`usage` is a bitmask of [VkBufferUsageFlagBits](resources.html#VkBufferUsageFlagBits) specifying the
[VkBufferCreateInfo](resources.html#VkBufferCreateInfo)::`usage` for the buffer from which
`address` was queried.
Usage flags other than
[VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits),
[VK_BUFFER_USAGE_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits), and
[VK_BUFFER_USAGE_PUSH_DESCRIPTORS_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits) are
ignored.

If the `pNext` chain includes a [VkBufferUsageFlags2CreateInfo](resources.html#VkBufferUsageFlags2CreateInfo)
structure, [VkBufferUsageFlags2CreateInfo](resources.html#VkBufferUsageFlags2CreateInfo)::`usage` from that
structure is used instead of `usage` from this structure.

Valid Usage

* 
[](#VUID-VkDescriptorBufferBindingInfoEXT-None-09499) VUID-VkDescriptorBufferBindingInfoEXT-None-09499

If the `pNext` chain does not include a
[VkBufferUsageFlags2CreateInfo](resources.html#VkBufferUsageFlags2CreateInfo) structure,
`usage` **must** be a valid combination of [VkBufferUsageFlagBits](resources.html#VkBufferUsageFlagBits)
values

* 
[](#VUID-VkDescriptorBufferBindingInfoEXT-None-09500) VUID-VkDescriptorBufferBindingInfoEXT-None-09500

If the `pNext` chain does not include a
[VkBufferUsageFlags2CreateInfo](resources.html#VkBufferUsageFlags2CreateInfo) structure,
`usage` **must** not be 0

* 
[](#VUID-VkDescriptorBufferBindingInfoEXT-usage-10998) VUID-VkDescriptorBufferBindingInfoEXT-usage-10998

The `usage` must include at least one of
[VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits),
[VK_BUFFER_USAGE_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits), or
[VK_BUFFER_USAGE_PUSH_DESCRIPTORS_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits)

* 
[](#VUID-VkDescriptorBufferBindingInfoEXT-bufferlessPushDescriptors-08056) VUID-VkDescriptorBufferBindingInfoEXT-bufferlessPushDescriptors-08056

If [    `VkPhysicalDeviceDescriptorBufferPropertiesEXT`::`bufferlessPushDescriptors`](limits.html#limits-bufferlessPushDescriptors)
is [VK_FALSE](fundamentals.html#VK_FALSE), and `usage` contains
[VK_BUFFER_USAGE_PUSH_DESCRIPTORS_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits), then
the `pNext` chain **must** include a
[VkDescriptorBufferBindingPushDescriptorBufferHandleEXT](#VkDescriptorBufferBindingPushDescriptorBufferHandleEXT) structure

* 
[](#VUID-VkDescriptorBufferBindingInfoEXT-address-08057) VUID-VkDescriptorBufferBindingInfoEXT-address-08057

`address` **must** be aligned to
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`descriptorBufferOffsetAlignment`

* 
[](#VUID-VkDescriptorBufferBindingInfoEXT-usage-08122) VUID-VkDescriptorBufferBindingInfoEXT-usage-08122

If `usage` includes
[VK_BUFFER_USAGE_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits), `address`
**must** be a device address allocated to the application from a buffer
created with the [VK_BUFFER_USAGE_SAMPLER_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits)
usage flag set

* 
[](#VUID-VkDescriptorBufferBindingInfoEXT-usage-08123) VUID-VkDescriptorBufferBindingInfoEXT-usage-08123

If `usage` includes
[VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits), `address`
**must** be a device address allocated to the application from a buffer
created with the
[VK_BUFFER_USAGE_RESOURCE_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-VkDescriptorBufferBindingInfoEXT-usage-08124) VUID-VkDescriptorBufferBindingInfoEXT-usage-08124

If `usage` includes
[VK_BUFFER_USAGE_PUSH_DESCRIPTORS_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits),
`address` **must** be a device address allocated to the application
from a buffer created with the
[VK_BUFFER_USAGE_PUSH_DESCRIPTORS_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits) usage
flag set

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorBufferBindingInfoEXT-sType-sType) VUID-VkDescriptorBufferBindingInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DESCRIPTOR_BUFFER_BINDING_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDescriptorBufferBindingInfoEXT-pNext-pNext) VUID-VkDescriptorBufferBindingInfoEXT-pNext-pNext

 Each `pNext` member of any structure (including this one) in the `pNext` chain **must** be either `NULL` or a pointer to a valid instance of [VkBufferUsageFlags2CreateInfo](resources.html#VkBufferUsageFlags2CreateInfo) or [VkDescriptorBufferBindingPushDescriptorBufferHandleEXT](#VkDescriptorBufferBindingPushDescriptorBufferHandleEXT)

* 
[](#VUID-VkDescriptorBufferBindingInfoEXT-sType-unique) VUID-VkDescriptorBufferBindingInfoEXT-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkDescriptorBufferBindingInfoEXT-address-parameter) VUID-VkDescriptorBufferBindingInfoEXT-address-parameter

 `address` **must** be a valid `VkDeviceAddress` value

When the [`VkPhysicalDeviceDescriptorBufferPropertiesEXT`::`bufferlessPushDescriptors`](limits.html#limits-bufferlessPushDescriptors)
property is [VK_FALSE](fundamentals.html#VK_FALSE), the `VkBuffer` handle of the buffer for push
descriptors is passed in a
`VkDescriptorBufferBindingPushDescriptorBufferHandleEXT` structure:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
typedef struct VkDescriptorBufferBindingPushDescriptorBufferHandleEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkBuffer           buffer;
} VkDescriptorBufferBindingPushDescriptorBufferHandleEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`buffer` is the `VkBuffer` handle of the buffer for push
descriptors.

Valid Usage

* 
[](#VUID-VkDescriptorBufferBindingPushDescriptorBufferHandleEXT-bufferlessPushDescriptors-08059) VUID-VkDescriptorBufferBindingPushDescriptorBufferHandleEXT-bufferlessPushDescriptors-08059

[    `VkPhysicalDeviceDescriptorBufferPropertiesEXT`::`bufferlessPushDescriptors`](limits.html#limits-bufferlessPushDescriptors)
**must** be [VK_FALSE](fundamentals.html#VK_FALSE)

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorBufferBindingPushDescriptorBufferHandleEXT-sType-sType) VUID-VkDescriptorBufferBindingPushDescriptorBufferHandleEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DESCRIPTOR_BUFFER_BINDING_PUSH_DESCRIPTOR_BUFFER_HANDLE_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDescriptorBufferBindingPushDescriptorBufferHandleEXT-buffer-parameter) VUID-VkDescriptorBufferBindingPushDescriptorBufferHandleEXT-buffer-parameter

 `buffer` **must** be a valid [VkBuffer](resources.html#VkBuffer) handle

Structure Chaining

[Extends the structure](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDescriptorBufferBindingInfoEXT](#VkDescriptorBufferBindingInfoEXT)

To set descriptor buffer offsets in a command buffer, call:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
void vkCmdSetDescriptorBufferOffsetsEXT(
    VkCommandBuffer                             commandBuffer,
    VkPipelineBindPoint                         pipelineBindPoint,
    VkPipelineLayout                            layout,
    uint32_t                                    firstSet,
    uint32_t                                    setCount,
    const uint32_t*                             pBufferIndices,
    const VkDeviceSize*                         pOffsets);

* 
`commandBuffer` is the command buffer in which the descriptor buffer
offsets will be set.

* 
`pipelineBindPoint` is a [VkPipelineBindPoint](pipelines.html#VkPipelineBindPoint) indicating the
type of the pipeline that will use the descriptors.

* 
`layout` is a [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) object used to program the
bindings.

* 
`firstSet` is the number of the first set to be bound.

* 
`setCount` is the number of elements in the `pBufferIndices` and
`pOffsets` arrays.

* 
`pBufferIndices` is a pointer to an array of indices into the
descriptor buffer binding points set by
[vkCmdBindDescriptorBuffersEXT](#vkCmdBindDescriptorBuffersEXT).

* 
`pOffsets` is a pointer to an array of `VkDeviceSize` offsets
to apply to the bound descriptor buffers.

`vkCmdSetDescriptorBufferOffsetsEXT` binds `setCount` pairs of
descriptor buffers, specified by indices into the binding points bound using
[vkCmdBindDescriptorBuffersEXT](#vkCmdBindDescriptorBuffersEXT), and buffer offsets to set numbers
[`firstSet`..`firstSet`+`setCount`-1] for subsequent
[bound pipeline commands](pipelines.html#pipelines-bindpoint-commands) set by
`pipelineBindPoint`.
Set [`firstSet` + i] is bound to the descriptor buffer at binding
`pBufferIndices`[i] at an offset of `pOffsets`[i].
Any bindings that were previously applied via these sets, or calls to
[vkCmdBindDescriptorSets](descriptorsets.html#vkCmdBindDescriptorSets), are no longer valid.
Other sets will also be invalidated upon calling this command if
`layout` differs from the pipeline layout used to bind those other sets,
as described in [Pipeline Layout Compatibility](descriptorsets.html#descriptors-compatibility).

After binding descriptors, applications **can** modify descriptor memory either
by performing writes on the host or with device commands.
When descriptor memory is updated with device commands, visibility for the
shader stage accessing a descriptor is ensured with the
[VK_ACCESS_2_DESCRIPTOR_BUFFER_READ_BIT_EXT](synchronization.html#VkAccessFlagBits2KHR) access flag.
Implementations **must** not access resources referenced by these descriptors
unless they are dynamically accessed by shaders.
Descriptors bound with this call **can** be **undefined** if they are not
dynamically accessed by shaders.

Implementations **may** read descriptor data for any statically accessed
descriptor if the `binding` in `layout` is not declared with the
[VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT](descriptorsets.html#VkDescriptorBindingFlagBitsEXT) flag.
If the `binding` in `layout` is declared with
[VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT](descriptorsets.html#VkDescriptorBindingFlagBitsEXT), implementations
**must** not read descriptor data that is not dynamically accessed.

Applications **must** ensure that any descriptor which the implementation **may**
read **must** be in-bounds of the underlying descriptor buffer binding.

|  | Applications can freely decide how large a variable descriptor buffer
| --- | --- |
binding is, so it may not be safe to read such descriptor payloads
statically.
The intention of these rules is to allow implementations to speculatively
prefetch descriptor payloads where feasible. |

Dynamically accessing a resource through descriptor data from an unbound
region of a [sparse partially-resident buffer](sparsemem.html#sparsememory-partially-resident-buffers) will result in invalid descriptor data being
read, and therefore **undefined** behavior.

|  | For descriptors written by the host, visibility is implied through the
| --- | --- |
automatic visibility operation on queue submit, and there is no need to
consider `VK_ACCESS_2_DESCRIPTOR_BUFFER_READ_BIT`.
Explicit synchronization for descriptors is only required when descriptors
are updated on the device. |

|  | The requirements above imply that all descriptor bindings have been defined
| --- | --- |
with the equivalent of [VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](descriptorsets.html#VkDescriptorBindingFlagBitsEXT),
[VK_DESCRIPTOR_BINDING_UPDATE_UNUSED_WHILE_PENDING_BIT](descriptorsets.html#VkDescriptorBindingFlagBitsEXT) and
[VK_DESCRIPTOR_BINDING_PARTIALLY_BOUND_BIT](descriptorsets.html#VkDescriptorBindingFlagBitsEXT), but enabling those features
is not required to get this behavior. |

Valid Usage

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-commandBuffer-11295) VUID-vkCmdSetDescriptorBufferOffsetsEXT-commandBuffer-11295

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pSamplerHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-commandBuffer-11296) VUID-vkCmdSetDescriptorBufferOffsetsEXT-commandBuffer-11296

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pResourceHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-pOffsets-08061) VUID-vkCmdSetDescriptorBufferOffsetsEXT-pOffsets-08061

The offsets in `pOffsets` **must** be aligned to
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`descriptorBufferOffsetAlignment`

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-pOffsets-08063) VUID-vkCmdSetDescriptorBufferOffsetsEXT-pOffsets-08063

The offsets in `pOffsets` **must** be small enough such that any
descriptor binding referenced by `layout`
without the [VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT](descriptorsets.html#VkDescriptorBindingFlagBitsEXT)
flag
computes a valid address inside the underlying [VkBuffer](resources.html#VkBuffer)

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-pOffsets-08126) VUID-vkCmdSetDescriptorBufferOffsetsEXT-pOffsets-08126

The offsets in `pOffsets` **must** be small enough such that any
location accessed by a shader as a sampler descriptor **must** be within
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`maxSamplerDescriptorBufferRange`
of the sampler descriptor buffer binding

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-pOffsets-08127) VUID-vkCmdSetDescriptorBufferOffsetsEXT-pOffsets-08127

The offsets in `pOffsets` **must** be small enough such that any
location accessed by a shader as a resource descriptor **must** be within
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`maxResourceDescriptorBufferRange`
of the resource descriptor buffer binding

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-pBufferIndices-08064) VUID-vkCmdSetDescriptorBufferOffsetsEXT-pBufferIndices-08064

Each element of `pBufferIndices` **must** be less than
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`maxDescriptorBufferBindings`

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-pBufferIndices-08065) VUID-vkCmdSetDescriptorBufferOffsetsEXT-pBufferIndices-08065

Each element of `pBufferIndices` **must** reference a valid descriptor
buffer binding set by a previous call to
[vkCmdBindDescriptorBuffersEXT](#vkCmdBindDescriptorBuffersEXT) in `commandBuffer`

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-firstSet-08066) VUID-vkCmdSetDescriptorBufferOffsetsEXT-firstSet-08066

The sum of `firstSet` and `setCount` **must** be less than or equal
to [VkPipelineLayoutCreateInfo](descriptorsets.html#VkPipelineLayoutCreateInfo)::`setLayoutCount` provided when
`layout` was created

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-firstSet-09006) VUID-vkCmdSetDescriptorBufferOffsetsEXT-firstSet-09006

The [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) for each set from `firstSet` to
`firstSet` +  `setCount` when `layout` was created
**must** have been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit set

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-firstSet-11803) VUID-vkCmdSetDescriptorBufferOffsetsEXT-firstSet-11803

The [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) for each set from `firstSet` to
`firstSet` +  `setCount` when `layout` was created
**must** not have been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT_KHR](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit set

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-firstSet-11804) VUID-vkCmdSetDescriptorBufferOffsetsEXT-firstSet-11804

The [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) for each set from `firstSet` to
`firstSet` +  `setCount` when `layout` was created
**must** not have been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_EMBEDDED_IMMUTABLE_SAMPLERS_BIT_EXT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits)
bit set

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-None-08060) VUID-vkCmdSetDescriptorBufferOffsetsEXT-None-08060

The [`descriptorBuffer`](features.html#features-descriptorBuffer) feature **must**
be enabled

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-pipelineBindPoint-08067) VUID-vkCmdSetDescriptorBufferOffsetsEXT-pipelineBindPoint-08067

`pipelineBindPoint` **must** be supported by the `commandBuffer`’s
parent `VkCommandPool`’s queue family

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-commandBuffer-parameter) VUID-vkCmdSetDescriptorBufferOffsetsEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-pipelineBindPoint-parameter) VUID-vkCmdSetDescriptorBufferOffsetsEXT-pipelineBindPoint-parameter

 `pipelineBindPoint` **must** be a valid [VkPipelineBindPoint](pipelines.html#VkPipelineBindPoint) value

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-layout-parameter) VUID-vkCmdSetDescriptorBufferOffsetsEXT-layout-parameter

 `layout` **must** be a valid [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) handle

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-pBufferIndices-parameter) VUID-vkCmdSetDescriptorBufferOffsetsEXT-pBufferIndices-parameter

 `pBufferIndices` **must** be a valid pointer to an array of `setCount` `uint32_t` values

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-pOffsets-parameter) VUID-vkCmdSetDescriptorBufferOffsetsEXT-pOffsets-parameter

 `pOffsets` **must** be a valid pointer to an array of `setCount` `VkDeviceSize` values

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-commandBuffer-recording) VUID-vkCmdSetDescriptorBufferOffsetsEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-commandBuffer-cmdpool) VUID-vkCmdSetDescriptorBufferOffsetsEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_DATA_GRAPH_BIT_ARM](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-videocoding) VUID-vkCmdSetDescriptorBufferOffsetsEXT-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-setCount-arraylength) VUID-vkCmdSetDescriptorBufferOffsetsEXT-setCount-arraylength

 `setCount` **must** be greater than `0`

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-commonparent) VUID-vkCmdSetDescriptorBufferOffsetsEXT-commonparent

 Both of `commandBuffer`, and `layout` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_DATA_GRAPH_BIT_ARM

VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetDescriptorBufferOffsetsEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To set descriptor buffer offsets in a command buffer, call:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_KHR_maintenance6 with VK_EXT_descriptor_buffer
void vkCmdSetDescriptorBufferOffsets2EXT(
    VkCommandBuffer                             commandBuffer,
    const VkSetDescriptorBufferOffsetsInfoEXT*  pSetDescriptorBufferOffsetsInfo);

* 
`commandBuffer` is the command buffer in which the descriptor buffer
offsets will be set.

* 
`pSetDescriptorBufferOffsetsInfo` is a pointer to a
`VkSetDescriptorBufferOffsetsInfoEXT` structure.

Valid Usage

* 
[](#VUID-vkCmdSetDescriptorBufferOffsets2EXT-commandBuffer-11295) VUID-vkCmdSetDescriptorBufferOffsets2EXT-commandBuffer-11295

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pSamplerHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdSetDescriptorBufferOffsets2EXT-commandBuffer-11296) VUID-vkCmdSetDescriptorBufferOffsets2EXT-commandBuffer-11296

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pResourceHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdSetDescriptorBufferOffsets2EXT-descriptorBuffer-09470) VUID-vkCmdSetDescriptorBufferOffsets2EXT-descriptorBuffer-09470

The [`descriptorBuffer`](features.html#features-descriptorBuffer) feature **must**
be enabled

* 
[](#VUID-vkCmdSetDescriptorBufferOffsets2EXT-pSetDescriptorBufferOffsetsInfo-09471) VUID-vkCmdSetDescriptorBufferOffsets2EXT-pSetDescriptorBufferOffsetsInfo-09471

Each bit in `pSetDescriptorBufferOffsetsInfo->stageFlags` **must** be a
stage supported by the `commandBuffer`’s parent
`VkCommandPool`’s queue family

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetDescriptorBufferOffsets2EXT-commandBuffer-parameter) VUID-vkCmdSetDescriptorBufferOffsets2EXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdSetDescriptorBufferOffsets2EXT-pSetDescriptorBufferOffsetsInfo-parameter) VUID-vkCmdSetDescriptorBufferOffsets2EXT-pSetDescriptorBufferOffsetsInfo-parameter

 `pSetDescriptorBufferOffsetsInfo` **must** be a valid pointer to a valid [VkSetDescriptorBufferOffsetsInfoEXT](#VkSetDescriptorBufferOffsetsInfoEXT) structure

* 
[](#VUID-vkCmdSetDescriptorBufferOffsets2EXT-commandBuffer-recording) VUID-vkCmdSetDescriptorBufferOffsets2EXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetDescriptorBufferOffsets2EXT-commandBuffer-cmdpool) VUID-vkCmdSetDescriptorBufferOffsets2EXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), [VK_QUEUE_DATA_GRAPH_BIT_ARM](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdSetDescriptorBufferOffsets2EXT-videocoding) VUID-vkCmdSetDescriptorBufferOffsets2EXT-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_DATA_GRAPH_BIT_ARM

VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetDescriptorBufferOffsets2EXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkSetDescriptorBufferOffsetsInfoEXT` structure is defined as:

// Provided by VK_KHR_maintenance6 with VK_EXT_descriptor_buffer
typedef struct VkSetDescriptorBufferOffsetsInfoEXT {
    VkStructureType        sType;
    const void*            pNext;
    VkShaderStageFlags     stageFlags;
    VkPipelineLayout       layout;
    uint32_t               firstSet;
    uint32_t               setCount;
    const uint32_t*        pBufferIndices;
    const VkDeviceSize*    pOffsets;
} VkSetDescriptorBufferOffsetsInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`stageFlags` is a bitmask of [VkShaderStageFlagBits](pipelines.html#VkShaderStageFlagBits) specifying
the shader stages the descriptor sets will be bound to

* 
`layout` is a [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) object used to program the
bindings.
If the [`dynamicPipelineLayout`](features.html#features-dynamicPipelineLayout)
feature is enabled, `layout` **can** be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) and the
layout **must** be specified by chaining [VkPipelineLayoutCreateInfo](descriptorsets.html#VkPipelineLayoutCreateInfo)
structure off the `pNext`

* 
`firstSet` is the number of the first set to be bound.

* 
`setCount` is the number of elements in the `pBufferIndices` and
`pOffsets` arrays.

* 
`pBufferIndices` is a pointer to an array of indices into the
descriptor buffer binding points set by
[vkCmdBindDescriptorBuffersEXT](#vkCmdBindDescriptorBuffersEXT).

* 
`pOffsets` is a pointer to an array of `VkDeviceSize` offsets
to apply to the bound descriptor buffers.

If `stageFlags` specifies a subset of all stages corresponding to one or
more pipeline bind points, the binding operation still affects all stages
corresponding to the given pipeline bind point(s) as if the equivalent
original version of this command had been called with the same parameters.
For example, specifying a `stageFlags` value of
[VK_SHADER_STAGE_VERTEX_BIT](pipelines.html#VkShaderStageFlagBits) | [VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits) |
[VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits) is equivalent to calling the original
version of this command once with [VK_PIPELINE_BIND_POINT_GRAPHICS](pipelines.html#VkPipelineBindPoint) and
once with [VK_PIPELINE_BIND_POINT_COMPUTE](pipelines.html#VkPipelineBindPoint).

Valid Usage

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-pOffsets-08061) VUID-VkSetDescriptorBufferOffsetsInfoEXT-pOffsets-08061

The offsets in `pOffsets` **must** be aligned to
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`descriptorBufferOffsetAlignment`

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-pOffsets-08063) VUID-VkSetDescriptorBufferOffsetsInfoEXT-pOffsets-08063

The offsets in `pOffsets` **must** be small enough such that any
descriptor binding referenced by `layout`
without the [VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT](descriptorsets.html#VkDescriptorBindingFlagBitsEXT)
flag
computes a valid address inside the underlying [VkBuffer](resources.html#VkBuffer)

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-pOffsets-08126) VUID-VkSetDescriptorBufferOffsetsInfoEXT-pOffsets-08126

The offsets in `pOffsets` **must** be small enough such that any
location accessed by a shader as a sampler descriptor **must** be within
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`maxSamplerDescriptorBufferRange`
of the sampler descriptor buffer binding

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-pOffsets-08127) VUID-VkSetDescriptorBufferOffsetsInfoEXT-pOffsets-08127

The offsets in `pOffsets` **must** be small enough such that any
location accessed by a shader as a resource descriptor **must** be within
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`maxResourceDescriptorBufferRange`
of the resource descriptor buffer binding

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-pBufferIndices-08064) VUID-VkSetDescriptorBufferOffsetsInfoEXT-pBufferIndices-08064

Each element of `pBufferIndices` **must** be less than
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`maxDescriptorBufferBindings`

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-pBufferIndices-08065) VUID-VkSetDescriptorBufferOffsetsInfoEXT-pBufferIndices-08065

Each element of `pBufferIndices` **must** reference a valid descriptor
buffer binding set by a previous call to
[vkCmdBindDescriptorBuffersEXT](#vkCmdBindDescriptorBuffersEXT) in `commandBuffer`

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-firstSet-08066) VUID-VkSetDescriptorBufferOffsetsInfoEXT-firstSet-08066

The sum of `firstSet` and `setCount` **must** be less than or equal
to [VkPipelineLayoutCreateInfo](descriptorsets.html#VkPipelineLayoutCreateInfo)::`setLayoutCount` provided when
`layout` was created

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-firstSet-09006) VUID-VkSetDescriptorBufferOffsetsInfoEXT-firstSet-09006

The [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) for each set from `firstSet` to
`firstSet` +  `setCount` when `layout` was created
**must** have been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit set

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-firstSet-11803) VUID-VkSetDescriptorBufferOffsetsInfoEXT-firstSet-11803

The [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) for each set from `firstSet` to
`firstSet` +  `setCount` when `layout` was created
**must** not have been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT_KHR](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits) bit set

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-firstSet-11804) VUID-VkSetDescriptorBufferOffsetsInfoEXT-firstSet-11804

The [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) for each set from `firstSet` to
`firstSet` +  `setCount` when `layout` was created
**must** not have been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_EMBEDDED_IMMUTABLE_SAMPLERS_BIT_EXT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits)
bit set

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-None-09495) VUID-VkSetDescriptorBufferOffsetsInfoEXT-None-09495

If the [`dynamicPipelineLayout`](features.html#features-dynamicPipelineLayout)
feature is not enabled,
`layout` **must** be a valid [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) handle

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-layout-09496) VUID-VkSetDescriptorBufferOffsetsInfoEXT-layout-09496

If `layout` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the `pNext` chain **must**
include a valid [VkPipelineLayoutCreateInfo](descriptorsets.html#VkPipelineLayoutCreateInfo) structure

Valid Usage (Implicit)

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-sType-sType) VUID-VkSetDescriptorBufferOffsetsInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SET_DESCRIPTOR_BUFFER_OFFSETS_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-pNext-pNext) VUID-VkSetDescriptorBufferOffsetsInfoEXT-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkPipelineLayoutCreateInfo](descriptorsets.html#VkPipelineLayoutCreateInfo)

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-sType-unique) VUID-VkSetDescriptorBufferOffsetsInfoEXT-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-stageFlags-parameter) VUID-VkSetDescriptorBufferOffsetsInfoEXT-stageFlags-parameter

 `stageFlags` **must** be a valid combination of [VkShaderStageFlagBits](pipelines.html#VkShaderStageFlagBits) values

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-stageFlags-requiredbitmask) VUID-VkSetDescriptorBufferOffsetsInfoEXT-stageFlags-requiredbitmask

 `stageFlags` **must** not be `0`

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-layout-parameter) VUID-VkSetDescriptorBufferOffsetsInfoEXT-layout-parameter

 If `layout` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `layout` **must** be a valid [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) handle

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-pBufferIndices-parameter) VUID-VkSetDescriptorBufferOffsetsInfoEXT-pBufferIndices-parameter

 `pBufferIndices` **must** be a valid pointer to an array of `setCount` `uint32_t` values

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-pOffsets-parameter) VUID-VkSetDescriptorBufferOffsetsInfoEXT-pOffsets-parameter

 `pOffsets` **must** be a valid pointer to an array of `setCount` `VkDeviceSize` values

* 
[](#VUID-VkSetDescriptorBufferOffsetsInfoEXT-setCount-arraylength) VUID-VkSetDescriptorBufferOffsetsInfoEXT-setCount-arraylength

 `setCount` **must** be greater than `0`

To bind an embedded immutable sampler set to a command buffer, call:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
void vkCmdBindDescriptorBufferEmbeddedSamplersEXT(
    VkCommandBuffer                             commandBuffer,
    VkPipelineBindPoint                         pipelineBindPoint,
    VkPipelineLayout                            layout,
    uint32_t                                    set);

* 
`commandBuffer` is the command buffer that the embedded immutable
samplers will be bound to.

* 
`pipelineBindPoint` is a [VkPipelineBindPoint](pipelines.html#VkPipelineBindPoint) indicating the
type of the pipeline that will use the embedded immutable samplers.

* 
`layout` is a [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) object used to program the
bindings.

* 
`set` is the number of the set to be bound.

`vkCmdBindDescriptorBufferEmbeddedSamplersEXT` binds the embedded immutable
samplers in `set` of `layout` to `set` for the command buffer
for subsequent [bound pipeline commands](pipelines.html#pipelines-bindpoint-commands) set
by `pipelineBindPoint`.
Any previous binding to this set by [vkCmdSetDescriptorBufferOffsetsEXT](#vkCmdSetDescriptorBufferOffsetsEXT)
or this command is overwritten.
Any sets that were last bound by a call to [vkCmdBindDescriptorSets](descriptorsets.html#vkCmdBindDescriptorSets) are
invalidated upon calling this command.
Other sets will also be invalidated upon calling this command if
`layout` differs from the pipeline layout used to bind those other sets,
as described in [Pipeline Layout Compatibility](descriptorsets.html#descriptors-compatibility).

Valid Usage

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-commandBuffer-11295) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-commandBuffer-11295

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pSamplerHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-commandBuffer-11296) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-commandBuffer-11296

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pResourceHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-set-08070) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-set-08070

The [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) at index `set` when `layout` was
created **must** have been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_EMBEDDED_IMMUTABLE_SAMPLERS_BIT_EXT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits)
bit set

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-set-08071) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-set-08071

`set` **must** be less than or equal to
[VkPipelineLayoutCreateInfo](descriptorsets.html#VkPipelineLayoutCreateInfo)::`setLayoutCount` provided when
`layout` was created

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-None-08068) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-None-08068

The [`descriptorBuffer`](features.html#features-descriptorBuffer) feature **must**
be enabled

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-pipelineBindPoint-08069) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-pipelineBindPoint-08069

`pipelineBindPoint` **must** be supported by the `commandBuffer`’s
parent `VkCommandPool`’s queue family

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-commandBuffer-parameter) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-pipelineBindPoint-parameter) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-pipelineBindPoint-parameter

 `pipelineBindPoint` **must** be a valid [VkPipelineBindPoint](pipelines.html#VkPipelineBindPoint) value

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-layout-parameter) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-layout-parameter

 `layout` **must** be a valid [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) handle

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-commandBuffer-recording) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-commandBuffer-cmdpool) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-videocoding) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-commonparent) VUID-vkCmdBindDescriptorBufferEmbeddedSamplersEXT-commonparent

 Both of `commandBuffer`, and `layout` **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdBindDescriptorBufferEmbeddedSamplersEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To bind an embedded immutable sampler set to a command buffer, call:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_KHR_maintenance6 with VK_EXT_descriptor_buffer
void vkCmdBindDescriptorBufferEmbeddedSamplers2EXT(
    VkCommandBuffer                             commandBuffer,
    const VkBindDescriptorBufferEmbeddedSamplersInfoEXT* pBindDescriptorBufferEmbeddedSamplersInfo);

* 
`commandBuffer` is the command buffer that the embedded immutable
samplers will be bound to.

* 
`pBindDescriptorBufferEmbeddedSamplersInfo` is a pointer to a
`VkBindDescriptorBufferEmbeddedSamplersInfoEXT` structure.

Valid Usage

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplers2EXT-commandBuffer-11295) VUID-vkCmdBindDescriptorBufferEmbeddedSamplers2EXT-commandBuffer-11295

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pSamplerHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplers2EXT-commandBuffer-11296) VUID-vkCmdBindDescriptorBufferEmbeddedSamplers2EXT-commandBuffer-11296

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pResourceHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplers2EXT-descriptorBuffer-09472) VUID-vkCmdBindDescriptorBufferEmbeddedSamplers2EXT-descriptorBuffer-09472

The [`descriptorBuffer`](features.html#features-descriptorBuffer) feature **must**
be enabled

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplers2EXT-pBindDescriptorBufferEmbeddedSamplersInfo-09473) VUID-vkCmdBindDescriptorBufferEmbeddedSamplers2EXT-pBindDescriptorBufferEmbeddedSamplersInfo-09473

Each bit in `pBindDescriptorBufferEmbeddedSamplersInfo->stageFlags`
**must** be a stage supported by the `commandBuffer`’s parent
`VkCommandPool`’s queue family

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplers2EXT-commandBuffer-parameter) VUID-vkCmdBindDescriptorBufferEmbeddedSamplers2EXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplers2EXT-pBindDescriptorBufferEmbeddedSamplersInfo-parameter) VUID-vkCmdBindDescriptorBufferEmbeddedSamplers2EXT-pBindDescriptorBufferEmbeddedSamplersInfo-parameter

 `pBindDescriptorBufferEmbeddedSamplersInfo` **must** be a valid pointer to a valid [VkBindDescriptorBufferEmbeddedSamplersInfoEXT](#VkBindDescriptorBufferEmbeddedSamplersInfoEXT) structure

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplers2EXT-commandBuffer-recording) VUID-vkCmdBindDescriptorBufferEmbeddedSamplers2EXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplers2EXT-commandBuffer-cmdpool) VUID-vkCmdBindDescriptorBufferEmbeddedSamplers2EXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdBindDescriptorBufferEmbeddedSamplers2EXT-videocoding) VUID-vkCmdBindDescriptorBufferEmbeddedSamplers2EXT-videocoding

 This command **must** only be called outside of a video coding scope

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](devsandqueues.html#VkQueueFlagBits) | [Command Type](fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdBindDescriptorBufferEmbeddedSamplers2EXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkBindDescriptorBufferEmbeddedSamplersInfoEXT` structure is defined
as:

// Provided by VK_KHR_maintenance6 with VK_EXT_descriptor_buffer
typedef struct VkBindDescriptorBufferEmbeddedSamplersInfoEXT {
    VkStructureType       sType;
    const void*           pNext;
    VkShaderStageFlags    stageFlags;
    VkPipelineLayout      layout;
    uint32_t              set;
} VkBindDescriptorBufferEmbeddedSamplersInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`stageFlags` is a bitmask of [VkShaderStageFlagBits](pipelines.html#VkShaderStageFlagBits) specifying
the shader stages that will use the embedded immutable samplers.

* 
`layout` is a [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) object used to program the
bindings.
If the [`dynamicPipelineLayout`](features.html#features-dynamicPipelineLayout)
feature is enabled, `layout` **can** be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) and the
layout **must** be specified by chaining [VkPipelineLayoutCreateInfo](descriptorsets.html#VkPipelineLayoutCreateInfo)
structure off the `pNext`

* 
`set` is the number of the set to be bound.

If `stageFlags` specifies a subset of all stages corresponding to one or
more pipeline bind points, the binding operation still affects all stages
corresponding to the given pipeline bind point(s) as if the equivalent
original version of this command had been called with the same parameters.
For example, specifying a `stageFlags` value of
[VK_SHADER_STAGE_VERTEX_BIT](pipelines.html#VkShaderStageFlagBits) | [VK_SHADER_STAGE_FRAGMENT_BIT](pipelines.html#VkShaderStageFlagBits) |
[VK_SHADER_STAGE_COMPUTE_BIT](pipelines.html#VkShaderStageFlagBits) is equivalent to calling the original
version of this command once with [VK_PIPELINE_BIND_POINT_GRAPHICS](pipelines.html#VkPipelineBindPoint) and
once with [VK_PIPELINE_BIND_POINT_COMPUTE](pipelines.html#VkPipelineBindPoint).

Valid Usage

* 
[](#VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-set-08070) VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-set-08070

The [VkDescriptorSetLayout](descriptorsets.html#VkDescriptorSetLayout) at index `set` when `layout` was
created **must** have been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_EMBEDDED_IMMUTABLE_SAMPLERS_BIT_EXT](descriptorsets.html#VkDescriptorSetLayoutCreateFlagBits)
bit set

* 
[](#VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-set-08071) VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-set-08071

`set` **must** be less than or equal to
[VkPipelineLayoutCreateInfo](descriptorsets.html#VkPipelineLayoutCreateInfo)::`setLayoutCount` provided when
`layout` was created

* 
[](#VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-None-09495) VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-None-09495

If the [`dynamicPipelineLayout`](features.html#features-dynamicPipelineLayout)
feature is not enabled,
`layout` **must** be a valid [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) handle

* 
[](#VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-layout-09496) VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-layout-09496

If `layout` is [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), the `pNext` chain **must**
include a valid [VkPipelineLayoutCreateInfo](descriptorsets.html#VkPipelineLayoutCreateInfo) structure

Valid Usage (Implicit)

* 
[](#VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-sType-sType) VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BIND_DESCRIPTOR_BUFFER_EMBEDDED_SAMPLERS_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-pNext-pNext) VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkPipelineLayoutCreateInfo](descriptorsets.html#VkPipelineLayoutCreateInfo)

* 
[](#VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-sType-unique) VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-stageFlags-parameter) VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-stageFlags-parameter

 `stageFlags` **must** be a valid combination of [VkShaderStageFlagBits](pipelines.html#VkShaderStageFlagBits) values

* 
[](#VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-stageFlags-requiredbitmask) VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-stageFlags-requiredbitmask

 `stageFlags` **must** not be `0`

* 
[](#VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-layout-parameter) VUID-VkBindDescriptorBufferEmbeddedSamplersInfoEXT-layout-parameter

 If `layout` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `layout` **must** be a valid [VkPipelineLayout](descriptorsets.html#VkPipelineLayout) handle

Updates to descriptor data in buffers **can** be performed by any operation on
either the host or device that **can** access memory.

Descriptor buffer reads **can** be synchronized using
[VK_ACCESS_2_DESCRIPTOR_BUFFER_READ_BIT_EXT](synchronization.html#VkAccessFlagBits2KHR) in the relevant shader
stage.

If the [`descriptorBufferPushDescriptors`](features.html#features-descriptorBufferPushDescriptors) feature is enabled, push descriptors
**can** be used with descriptor buffers in the same way as with descriptor
sets.

The [`VkPhysicalDeviceDescriptorBufferPropertiesEXT`::`bufferlessPushDescriptors`](limits.html#limits-bufferlessPushDescriptors)
property indicates whether the implementation requires a buffer to back push
descriptors.
If the property is [VK_FALSE](fundamentals.html#VK_FALSE) then before recording any push
descriptors, the application **must** bind exactly `1` descriptor buffer that
was created with the
[VK_BUFFER_USAGE_PUSH_DESCRIPTORS_DESCRIPTOR_BUFFER_BIT_EXT](resources.html#VkBufferUsageFlagBits) usage flag
set.
When this buffer is bound, any previously recorded push descriptors that are
required for a subsequent command **must** be recorded again.

In a similar way to [`bufferDeviceAddressCaptureReplay`](features.html#features-bufferDeviceAddressCaptureReplay), the
[`descriptorBufferCaptureReplay`](features.html#features-descriptorBufferCaptureReplay) feature allows the creation of opaque
handles for objects at capture time that **can** be passed into object creation
calls in a future replay, causing descriptors to be created with the same
data.
The opaque memory address for any memory used by these resources **must** have
been captured using [vkGetDeviceMemoryOpaqueCaptureAddress](memory.html#vkGetDeviceMemoryOpaqueCaptureAddress) and be
replayed using [VkMemoryOpaqueCaptureAddressAllocateInfo](memory.html#VkMemoryOpaqueCaptureAddressAllocateInfo).

To get the opaque descriptor data for a buffer, call:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
VkResult vkGetBufferOpaqueCaptureDescriptorDataEXT(
    VkDevice                                    device,
    const VkBufferCaptureDescriptorDataInfoEXT* pInfo,
    void*                                       pData);

* 
`device` is the logical device that gets the data.

* 
`pInfo` is a pointer to a [VkBufferCaptureDescriptorDataInfoEXT](#VkBufferCaptureDescriptorDataInfoEXT)
structure specifying the buffer.

* 
`pData` is a pointer to an application-allocated buffer where the
data will be written.

Valid Usage

* 
[](#VUID-vkGetBufferOpaqueCaptureDescriptorDataEXT-None-08072) VUID-vkGetBufferOpaqueCaptureDescriptorDataEXT-None-08072

The [    `descriptorBufferCaptureReplay`](features.html#features-descriptorBufferCaptureReplay) feature **must** be enabled

* 
[](#VUID-vkGetBufferOpaqueCaptureDescriptorDataEXT-pData-08073) VUID-vkGetBufferOpaqueCaptureDescriptorDataEXT-pData-08073

`pData` **must** point to a buffer that is at least
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`bufferCaptureReplayDescriptorDataSize`
bytes in size

* 
[](#VUID-vkGetBufferOpaqueCaptureDescriptorDataEXT-device-08074) VUID-vkGetBufferOpaqueCaptureDescriptorDataEXT-device-08074

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetBufferOpaqueCaptureDescriptorDataEXT-device-parameter) VUID-vkGetBufferOpaqueCaptureDescriptorDataEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetBufferOpaqueCaptureDescriptorDataEXT-pInfo-parameter) VUID-vkGetBufferOpaqueCaptureDescriptorDataEXT-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkBufferCaptureDescriptorDataInfoEXT](#VkBufferCaptureDescriptorDataInfoEXT) structure

* 
[](#VUID-vkGetBufferOpaqueCaptureDescriptorDataEXT-pData-parameter) VUID-vkGetBufferOpaqueCaptureDescriptorDataEXT-pData-parameter

 `pData` **must** be a pointer value

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

Information about the buffer to get descriptor buffer capture data for is
passed in a `VkBufferCaptureDescriptorDataInfoEXT` structure:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
typedef struct VkBufferCaptureDescriptorDataInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkBuffer           buffer;
} VkBufferCaptureDescriptorDataInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`buffer` is the `VkBuffer` handle of the buffer to get opaque
capture data for.

Valid Usage

* 
[](#VUID-VkBufferCaptureDescriptorDataInfoEXT-buffer-08075) VUID-VkBufferCaptureDescriptorDataInfoEXT-buffer-08075

`buffer` **must** have been created with
[VK_BUFFER_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](resources.html#VkBufferCreateFlagBits) set in
[VkBufferCreateInfo](resources.html#VkBufferCreateInfo)::`flags`

Valid Usage (Implicit)

* 
[](#VUID-VkBufferCaptureDescriptorDataInfoEXT-sType-sType) VUID-VkBufferCaptureDescriptorDataInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BUFFER_CAPTURE_DESCRIPTOR_DATA_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkBufferCaptureDescriptorDataInfoEXT-pNext-pNext) VUID-VkBufferCaptureDescriptorDataInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkBufferCaptureDescriptorDataInfoEXT-buffer-parameter) VUID-VkBufferCaptureDescriptorDataInfoEXT-buffer-parameter

 `buffer` **must** be a valid [VkBuffer](resources.html#VkBuffer) handle

To get the opaque capture descriptor data for an image, call:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
VkResult vkGetImageOpaqueCaptureDescriptorDataEXT(
    VkDevice                                    device,
    const VkImageCaptureDescriptorDataInfoEXT*  pInfo,
    void*                                       pData);

* 
`device` is the logical device that gets the data.

* 
`pInfo` is a pointer to a [VkImageCaptureDescriptorDataInfoEXT](#VkImageCaptureDescriptorDataInfoEXT)
structure specifying the image.

* 
`pData` is a pointer to an application-allocated buffer where the
data will be written.

Valid Usage

* 
[](#VUID-vkGetImageOpaqueCaptureDescriptorDataEXT-None-08076) VUID-vkGetImageOpaqueCaptureDescriptorDataEXT-None-08076

The [    `descriptorBufferCaptureReplay`](features.html#features-descriptorBufferCaptureReplay) feature **must** be enabled

* 
[](#VUID-vkGetImageOpaqueCaptureDescriptorDataEXT-pData-08077) VUID-vkGetImageOpaqueCaptureDescriptorDataEXT-pData-08077

`pData` **must** point to a buffer that is at least
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`imageCaptureReplayDescriptorDataSize`
bytes in size

* 
[](#VUID-vkGetImageOpaqueCaptureDescriptorDataEXT-device-08078) VUID-vkGetImageOpaqueCaptureDescriptorDataEXT-device-08078

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetImageOpaqueCaptureDescriptorDataEXT-device-parameter) VUID-vkGetImageOpaqueCaptureDescriptorDataEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetImageOpaqueCaptureDescriptorDataEXT-pInfo-parameter) VUID-vkGetImageOpaqueCaptureDescriptorDataEXT-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkImageCaptureDescriptorDataInfoEXT](#VkImageCaptureDescriptorDataInfoEXT) structure

* 
[](#VUID-vkGetImageOpaqueCaptureDescriptorDataEXT-pData-parameter) VUID-vkGetImageOpaqueCaptureDescriptorDataEXT-pData-parameter

 `pData` **must** be a pointer value

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

Information about the image to get descriptor buffer capture data for is
passed in a `VkImageCaptureDescriptorDataInfoEXT` structure:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
typedef struct VkImageCaptureDescriptorDataInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkImage            image;
} VkImageCaptureDescriptorDataInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`image` is the `VkImage` handle of the image to get opaque
capture data for.

Valid Usage

* 
[](#VUID-VkImageCaptureDescriptorDataInfoEXT-image-08079) VUID-VkImageCaptureDescriptorDataInfoEXT-image-08079

`image` **must** have been created with
[VK_IMAGE_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](resources.html#VkImageCreateFlagBits) set in
[VkImageCreateInfo](resources.html#VkImageCreateInfo)::`flags`

Valid Usage (Implicit)

* 
[](#VUID-VkImageCaptureDescriptorDataInfoEXT-sType-sType) VUID-VkImageCaptureDescriptorDataInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_CAPTURE_DESCRIPTOR_DATA_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImageCaptureDescriptorDataInfoEXT-pNext-pNext) VUID-VkImageCaptureDescriptorDataInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkImageCaptureDescriptorDataInfoEXT-image-parameter) VUID-VkImageCaptureDescriptorDataInfoEXT-image-parameter

 `image` **must** be a valid [VkImage](resources.html#VkImage) handle

To get the opaque capture descriptor data for an image view, call:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
VkResult vkGetImageViewOpaqueCaptureDescriptorDataEXT(
    VkDevice                                    device,
    const VkImageViewCaptureDescriptorDataInfoEXT* pInfo,
    void*                                       pData);

* 
`device` is the logical device that gets the data.

* 
`pInfo` is a pointer to a
[VkImageViewCaptureDescriptorDataInfoEXT](#VkImageViewCaptureDescriptorDataInfoEXT) structure specifying the
image view.

* 
`pData` is a pointer to an application-allocated buffer where the
data will be written.

Valid Usage

* 
[](#VUID-vkGetImageViewOpaqueCaptureDescriptorDataEXT-None-08080) VUID-vkGetImageViewOpaqueCaptureDescriptorDataEXT-None-08080

The [    `descriptorBufferCaptureReplay`](features.html#features-descriptorBufferCaptureReplay) feature **must** be enabled

* 
[](#VUID-vkGetImageViewOpaqueCaptureDescriptorDataEXT-pData-08081) VUID-vkGetImageViewOpaqueCaptureDescriptorDataEXT-pData-08081

`pData` **must** point to a buffer that is at least
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`imageViewCaptureReplayDescriptorDataSize`
bytes in size

* 
[](#VUID-vkGetImageViewOpaqueCaptureDescriptorDataEXT-device-08082) VUID-vkGetImageViewOpaqueCaptureDescriptorDataEXT-device-08082

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetImageViewOpaqueCaptureDescriptorDataEXT-device-parameter) VUID-vkGetImageViewOpaqueCaptureDescriptorDataEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetImageViewOpaqueCaptureDescriptorDataEXT-pInfo-parameter) VUID-vkGetImageViewOpaqueCaptureDescriptorDataEXT-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkImageViewCaptureDescriptorDataInfoEXT](#VkImageViewCaptureDescriptorDataInfoEXT) structure

* 
[](#VUID-vkGetImageViewOpaqueCaptureDescriptorDataEXT-pData-parameter) VUID-vkGetImageViewOpaqueCaptureDescriptorDataEXT-pData-parameter

 `pData` **must** be a pointer value

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

Information about the image view to get descriptor buffer capture data for
is passed in a `VkImageViewCaptureDescriptorDataInfoEXT` structure:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
typedef struct VkImageViewCaptureDescriptorDataInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkImageView        imageView;
} VkImageViewCaptureDescriptorDataInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`imageView` is the `VkImageView` handle of the image view to get
opaque capture data for.

Valid Usage

* 
[](#VUID-VkImageViewCaptureDescriptorDataInfoEXT-imageView-08083) VUID-VkImageViewCaptureDescriptorDataInfoEXT-imageView-08083

`imageView` **must** have been created with
[VK_IMAGE_VIEW_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](resources.html#VkImageViewCreateFlagBits) set
in [VkImageViewCreateInfo](resources.html#VkImageViewCreateInfo)::`flags`

Valid Usage (Implicit)

* 
[](#VUID-VkImageViewCaptureDescriptorDataInfoEXT-sType-sType) VUID-VkImageViewCaptureDescriptorDataInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_VIEW_CAPTURE_DESCRIPTOR_DATA_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImageViewCaptureDescriptorDataInfoEXT-pNext-pNext) VUID-VkImageViewCaptureDescriptorDataInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkImageViewCaptureDescriptorDataInfoEXT-imageView-parameter) VUID-VkImageViewCaptureDescriptorDataInfoEXT-imageView-parameter

 `imageView` **must** be a valid [VkImageView](resources.html#VkImageView) handle

To get the opaque capture descriptor data for a sampler, call:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
VkResult vkGetSamplerOpaqueCaptureDescriptorDataEXT(
    VkDevice                                    device,
    const VkSamplerCaptureDescriptorDataInfoEXT* pInfo,
    void*                                       pData);

* 
`device` is the logical device that gets the data.

* 
`pInfo` is a pointer to a
[VkSamplerCaptureDescriptorDataInfoEXT](#VkSamplerCaptureDescriptorDataInfoEXT) structure specifying the
sampler.

* 
`pData` is a pointer to an application-allocated buffer where the
data will be written.

Valid Usage

* 
[](#VUID-vkGetSamplerOpaqueCaptureDescriptorDataEXT-None-08084) VUID-vkGetSamplerOpaqueCaptureDescriptorDataEXT-None-08084

The [    `descriptorBufferCaptureReplay`](features.html#features-descriptorBufferCaptureReplay) feature **must** be enabled

* 
[](#VUID-vkGetSamplerOpaqueCaptureDescriptorDataEXT-pData-08085) VUID-vkGetSamplerOpaqueCaptureDescriptorDataEXT-pData-08085

`pData` **must** point to a buffer that is at least
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`samplerCaptureReplayDescriptorDataSize`
bytes in size

* 
[](#VUID-vkGetSamplerOpaqueCaptureDescriptorDataEXT-device-08086) VUID-vkGetSamplerOpaqueCaptureDescriptorDataEXT-device-08086

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetSamplerOpaqueCaptureDescriptorDataEXT-device-parameter) VUID-vkGetSamplerOpaqueCaptureDescriptorDataEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetSamplerOpaqueCaptureDescriptorDataEXT-pInfo-parameter) VUID-vkGetSamplerOpaqueCaptureDescriptorDataEXT-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkSamplerCaptureDescriptorDataInfoEXT](#VkSamplerCaptureDescriptorDataInfoEXT) structure

* 
[](#VUID-vkGetSamplerOpaqueCaptureDescriptorDataEXT-pData-parameter) VUID-vkGetSamplerOpaqueCaptureDescriptorDataEXT-pData-parameter

 `pData` **must** be a pointer value

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

Information about the sampler to get descriptor buffer capture data for is
passed in a `VkSamplerCaptureDescriptorDataInfoEXT` structure:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
typedef struct VkSamplerCaptureDescriptorDataInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    VkSampler          sampler;
} VkSamplerCaptureDescriptorDataInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`sampler` is the `VkSampler` handle of the sampler to get opaque
capture data for.

Valid Usage

* 
[](#VUID-VkSamplerCaptureDescriptorDataInfoEXT-sampler-08087) VUID-VkSamplerCaptureDescriptorDataInfoEXT-sampler-08087

`sampler` **must** have been created with
[VK_SAMPLER_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](samplers.html#VkSamplerCreateFlagBits) set in
[VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo)::`flags`

Valid Usage (Implicit)

* 
[](#VUID-VkSamplerCaptureDescriptorDataInfoEXT-sType-sType) VUID-VkSamplerCaptureDescriptorDataInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SAMPLER_CAPTURE_DESCRIPTOR_DATA_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkSamplerCaptureDescriptorDataInfoEXT-pNext-pNext) VUID-VkSamplerCaptureDescriptorDataInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkSamplerCaptureDescriptorDataInfoEXT-sampler-parameter) VUID-VkSamplerCaptureDescriptorDataInfoEXT-sampler-parameter

 `sampler` **must** be a valid [VkSampler](samplers.html#VkSampler) handle

To get the opaque capture descriptor data for an acceleration structure,
call:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer with VK_KHR_acceleration_structure or VK_NV_ray_tracing
VkResult vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT(
    VkDevice                                    device,
    const VkAccelerationStructureCaptureDescriptorDataInfoEXT* pInfo,
    void*                                       pData);

* 
`device` is the logical device that gets the data.

* 
`pInfo` is a pointer to a
[VkAccelerationStructureCaptureDescriptorDataInfoEXT](#VkAccelerationStructureCaptureDescriptorDataInfoEXT) structure
specifying the acceleration structure.

* 
`pData` is a pointer to an application-allocated buffer where the
data will be written.

Valid Usage

* 
[](#VUID-vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT-None-08088) VUID-vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT-None-08088

The [    `descriptorBufferCaptureReplay`](features.html#features-descriptorBufferCaptureReplay) feature **must** be enabled

* 
[](#VUID-vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT-pData-08089) VUID-vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT-pData-08089

`pData` **must** point to a buffer that is at least
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorBufferPropertiesEXT)::`accelerationStructureCaptureReplayDescriptorDataSize`
bytes in size

* 
[](#VUID-vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT-device-08090) VUID-vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT-device-08090

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT-device-parameter) VUID-vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT-pInfo-parameter) VUID-vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkAccelerationStructureCaptureDescriptorDataInfoEXT](#VkAccelerationStructureCaptureDescriptorDataInfoEXT) structure

* 
[](#VUID-vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT-pData-parameter) VUID-vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT-pData-parameter

 `pData` **must** be a pointer value

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

Information about the acceleration structure to get descriptor buffer
capture data for is passed in a
`VkAccelerationStructureCaptureDescriptorDataInfoEXT` structure:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer with VK_KHR_acceleration_structure or VK_NV_ray_tracing
typedef struct VkAccelerationStructureCaptureDescriptorDataInfoEXT {
    VkStructureType               sType;
    const void*                   pNext;
    VkAccelerationStructureKHR    accelerationStructure;
    VkAccelerationStructureNV     accelerationStructureNV;
} VkAccelerationStructureCaptureDescriptorDataInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`accelerationStructure` is the `VkAccelerationStructureKHR`
handle of the acceleration structure to get opaque capture data for.

* 
`accelerationStructureNV` is the `VkAccelerationStructureNV`
handle of the acceleration structure to get opaque capture data for.

Valid Usage

* 
[](#VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-accelerationStructure-08091) VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-accelerationStructure-08091

If `accelerationStructure` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) then
`accelerationStructure` **must** have been created with
[VK_ACCELERATION_STRUCTURE_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](resources.html#VkAccelerationStructureCreateFlagBitsKHR)
set in [VkAccelerationStructureCreateInfoKHR](resources.html#VkAccelerationStructureCreateInfoKHR)::`createFlags`

* 
[](#VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-accelerationStructureNV-08092) VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-accelerationStructureNV-08092

If `accelerationStructureNV` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) then
`accelerationStructureNV` **must** have been created with
[VK_ACCELERATION_STRUCTURE_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_EXT](resources.html#VkAccelerationStructureCreateFlagBitsKHR)
set in [VkAccelerationStructureCreateInfoNV](resources.html#VkAccelerationStructureCreateInfoNV)::`info.flags`

* 
[](#VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-accelerationStructure-08093) VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-accelerationStructure-08093

If `accelerationStructure` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) then
`accelerationStructureNV` **must** be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

* 
[](#VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-accelerationStructureNV-08094) VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-accelerationStructureNV-08094

If `accelerationStructureNV` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) then
`accelerationStructure` **must** be [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE)

Valid Usage (Implicit)

* 
[](#VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-sType-sType) VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_ACCELERATION_STRUCTURE_CAPTURE_DESCRIPTOR_DATA_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-pNext-pNext) VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-accelerationStructure-parameter) VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-accelerationStructure-parameter

 If `accelerationStructure` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `accelerationStructure` **must** be a valid [VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR) handle

* 
[](#VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-accelerationStructureNV-parameter) VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-accelerationStructureNV-parameter

 If `accelerationStructureNV` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE), `accelerationStructureNV` **must** be a valid [VkAccelerationStructureNV](resources.html#VkAccelerationStructureNV) handle

* 
[](#VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-commonparent) VUID-VkAccelerationStructureCaptureDescriptorDataInfoEXT-commonparent

 Both of `accelerationStructure`, and `accelerationStructureNV` that are valid handles of non-ignored parameters **must** have been created, allocated, or retrieved from the same [VkDevice](devsandqueues.html#VkDevice)

The `VkOpaqueCaptureDescriptorDataCreateInfoEXT` structure is defined
as:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](../appendices/extensions.html#VK_EXT_descriptor_heap). See [Legacy Functionality](../appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
typedef struct VkOpaqueCaptureDescriptorDataCreateInfoEXT {
    VkStructureType    sType;
    const void*        pNext;
    const void*        opaqueCaptureDescriptorData;
} VkOpaqueCaptureDescriptorDataCreateInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`opaqueCaptureDescriptorData` is a pointer to an
application-allocated buffer containing opaque capture data retrieved
using [vkGetBufferOpaqueCaptureDescriptorDataEXT](#vkGetBufferOpaqueCaptureDescriptorDataEXT),
[vkGetImageOpaqueCaptureDescriptorDataEXT](#vkGetImageOpaqueCaptureDescriptorDataEXT),
[vkGetImageViewOpaqueCaptureDescriptorDataEXT](#vkGetImageViewOpaqueCaptureDescriptorDataEXT),
[vkGetTensorOpaqueCaptureDescriptorDataARM](#vkGetTensorOpaqueCaptureDescriptorDataARM),
[vkGetTensorViewOpaqueCaptureDescriptorDataARM](#vkGetTensorViewOpaqueCaptureDescriptorDataARM),
[vkGetSamplerOpaqueCaptureDescriptorDataEXT](#vkGetSamplerOpaqueCaptureDescriptorDataEXT), or
[vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT](#vkGetAccelerationStructureOpaqueCaptureDescriptorDataEXT).

During replay, opaque descriptor capture data **can** be specified by adding a
`VkOpaqueCaptureDescriptorDataCreateInfoEXT` structure to the relevant
`pNext` chain of a [VkBufferCreateInfo](resources.html#VkBufferCreateInfo), [VkImageCreateInfo](resources.html#VkImageCreateInfo),
[VkImageViewCreateInfo](resources.html#VkImageViewCreateInfo), [VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo),
[VkTensorCreateInfoARM](resources.html#VkTensorCreateInfoARM), [VkTensorViewCreateInfoARM](resources.html#VkTensorViewCreateInfoARM),
[VkAccelerationStructureCreateInfoNV](resources.html#VkAccelerationStructureCreateInfoNV) or
[VkAccelerationStructureCreateInfoKHR](resources.html#VkAccelerationStructureCreateInfoKHR) structure.

When providing opaque capture data for an image, if the `pNext` chain of
[VkImageCreateInfo](resources.html#VkImageCreateInfo)
or [VkTensorCreateInfoARM](resources.html#VkTensorCreateInfoARM)
contains an instance of both this structure and
[VkOpaqueCaptureDataCreateInfoEXT](resources.html#VkOpaqueCaptureDataCreateInfoEXT), they **should** both specify data from
the same original resource.
If they have capture data from different original resources, resource
creation is much more likely to fail.

Valid Usage (Implicit)

* 
[](#VUID-VkOpaqueCaptureDescriptorDataCreateInfoEXT-sType-sType) VUID-VkOpaqueCaptureDescriptorDataCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_OPAQUE_CAPTURE_DESCRIPTOR_DATA_CREATE_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkOpaqueCaptureDescriptorDataCreateInfoEXT-opaqueCaptureDescriptorData-parameter) VUID-VkOpaqueCaptureDescriptorDataCreateInfoEXT-opaqueCaptureDescriptorData-parameter

 `opaqueCaptureDescriptorData` **must** be a pointer value

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkAccelerationStructureCreateInfo2KHR](resources.html#VkAccelerationStructureCreateInfo2KHR)

* 
[VkAccelerationStructureCreateInfoKHR](resources.html#VkAccelerationStructureCreateInfoKHR)

* 
[VkAccelerationStructureCreateInfoNV](resources.html#VkAccelerationStructureCreateInfoNV)

* 
[VkBufferCreateInfo](resources.html#VkBufferCreateInfo)

* 
[VkImageCreateInfo](resources.html#VkImageCreateInfo)

* 
[VkImageViewCreateInfo](resources.html#VkImageViewCreateInfo)

* 
[VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo)

* 
[VkTensorCreateInfoARM](resources.html#VkTensorCreateInfoARM)

* 
[VkTensorViewCreateInfoARM](resources.html#VkTensorViewCreateInfoARM)

To get the opaque capture descriptor data for a tensor, call:

// Provided by VK_EXT_descriptor_buffer with VK_ARM_tensors
VkResult vkGetTensorOpaqueCaptureDescriptorDataARM(
    VkDevice                                    device,
    const VkTensorCaptureDescriptorDataInfoARM* pInfo,
    void*                                       pData);

* 
`device` is the logical device that gets the data.

* 
`pInfo` is a pointer to a [VkTensorCaptureDescriptorDataInfoARM](#VkTensorCaptureDescriptorDataInfoARM)
structure specifying the tensor.

* 
`pData` is a pointer to a user-allocated buffer where the data will
be written.

Valid Usage

* 
[](#VUID-vkGetTensorOpaqueCaptureDescriptorDataARM-descriptorBufferCaptureReplay-09702) VUID-vkGetTensorOpaqueCaptureDescriptorDataARM-descriptorBufferCaptureReplay-09702

The [`descriptorBufferCaptureReplay`](features.html#features-descriptorBuffer)
and [    `descriptorBufferTensorDescriptors`](features.html#features-descriptorBufferTensorDescriptors) features **must** be enabled

* 
[](#VUID-vkGetTensorOpaqueCaptureDescriptorDataARM-pData-09703) VUID-vkGetTensorOpaqueCaptureDescriptorDataARM-pData-09703

`pData` **must** point to a buffer that is at least
[VkPhysicalDeviceDescriptorBufferTensorPropertiesARM](limits.html#VkPhysicalDeviceDescriptorBufferTensorPropertiesARM)::`tensorCaptureReplayDescriptorDataSize`
bytes in size

* 
[](#VUID-vkGetTensorOpaqueCaptureDescriptorDataARM-device-09704) VUID-vkGetTensorOpaqueCaptureDescriptorDataARM-device-09704

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetTensorOpaqueCaptureDescriptorDataARM-device-parameter) VUID-vkGetTensorOpaqueCaptureDescriptorDataARM-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetTensorOpaqueCaptureDescriptorDataARM-pInfo-parameter) VUID-vkGetTensorOpaqueCaptureDescriptorDataARM-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkTensorCaptureDescriptorDataInfoARM](#VkTensorCaptureDescriptorDataInfoARM) structure

* 
[](#VUID-vkGetTensorOpaqueCaptureDescriptorDataARM-pData-parameter) VUID-vkGetTensorOpaqueCaptureDescriptorDataARM-pData-parameter

 `pData` **must** be a pointer value

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

Information about the tensor to get descriptor buffer capture data for is
passed in a `VkTensorCaptureDescriptorDataInfoARM` structure:

// Provided by VK_EXT_descriptor_buffer with VK_ARM_tensors
typedef struct VkTensorCaptureDescriptorDataInfoARM {
    VkStructureType    sType;
    const void*        pNext;
    VkTensorARM        tensor;
} VkTensorCaptureDescriptorDataInfoARM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`tensor` is the `VkTensorARM` handle of the tensor to get opaque
capture data for.

Valid Usage

* 
[](#VUID-VkTensorCaptureDescriptorDataInfoARM-tensor-09705) VUID-VkTensorCaptureDescriptorDataInfoARM-tensor-09705

If `tensor` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) then `tensor` **must** have
been created with
[VK_TENSOR_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_ARM](resources.html#VkTensorCreateFlagBitsARM) set in
[VkTensorCreateInfoARM](resources.html#VkTensorCreateInfoARM)::`flags`

Valid Usage (Implicit)

* 
[](#VUID-VkTensorCaptureDescriptorDataInfoARM-sType-sType) VUID-VkTensorCaptureDescriptorDataInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_TENSOR_CAPTURE_DESCRIPTOR_DATA_INFO_ARM](fundamentals.html#VkStructureType)

* 
[](#VUID-VkTensorCaptureDescriptorDataInfoARM-pNext-pNext) VUID-VkTensorCaptureDescriptorDataInfoARM-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkTensorCaptureDescriptorDataInfoARM-tensor-parameter) VUID-VkTensorCaptureDescriptorDataInfoARM-tensor-parameter

 `tensor` **must** be a valid [VkTensorARM](resources.html#VkTensorARM) handle

To get the opaque capture descriptor data for a tensor view, call:

// Provided by VK_EXT_descriptor_buffer with VK_ARM_tensors
VkResult vkGetTensorViewOpaqueCaptureDescriptorDataARM(
    VkDevice                                    device,
    const VkTensorViewCaptureDescriptorDataInfoARM* pInfo,
    void*                                       pData);

* 
`device` is the logical device that gets the data.

* 
`pInfo` is a pointer to a
[VkTensorViewCaptureDescriptorDataInfoARM](#VkTensorViewCaptureDescriptorDataInfoARM) structure specifying the
tensor view.

* 
`pData` is a pointer to a user-allocated buffer where the data will
be written.

Valid Usage

* 
[](#VUID-vkGetTensorViewOpaqueCaptureDescriptorDataARM-descriptorBufferCaptureReplay-09706) VUID-vkGetTensorViewOpaqueCaptureDescriptorDataARM-descriptorBufferCaptureReplay-09706

The [`descriptorBufferCaptureReplay`](features.html#features-descriptorBuffer)
and [    `descriptorBufferTensorDescriptors`](features.html#features-descriptorBufferTensorDescriptors) features **must** be enabled

* 
[](#VUID-vkGetTensorViewOpaqueCaptureDescriptorDataARM-pData-09707) VUID-vkGetTensorViewOpaqueCaptureDescriptorDataARM-pData-09707

`pData` **must** point to a buffer that is at least
[VkPhysicalDeviceDescriptorBufferTensorPropertiesARM](limits.html#VkPhysicalDeviceDescriptorBufferTensorPropertiesARM)::`tensorViewCaptureReplayDescriptorDataSize`
bytes in size

* 
[](#VUID-vkGetTensorViewOpaqueCaptureDescriptorDataARM-device-09708) VUID-vkGetTensorViewOpaqueCaptureDescriptorDataARM-device-09708

If `device` was created with multiple physical devices, then the
[    `bufferDeviceAddressMultiDevice`](features.html#features-bufferDeviceAddressMultiDevice) feature **must** be enabled

Valid Usage (Implicit)

* 
[](#VUID-vkGetTensorViewOpaqueCaptureDescriptorDataARM-device-parameter) VUID-vkGetTensorViewOpaqueCaptureDescriptorDataARM-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkGetTensorViewOpaqueCaptureDescriptorDataARM-pInfo-parameter) VUID-vkGetTensorViewOpaqueCaptureDescriptorDataARM-pInfo-parameter

 `pInfo` **must** be a valid pointer to a valid [VkTensorViewCaptureDescriptorDataInfoARM](#VkTensorViewCaptureDescriptorDataInfoARM) structure

* 
[](#VUID-vkGetTensorViewOpaqueCaptureDescriptorDataARM-pData-parameter) VUID-vkGetTensorViewOpaqueCaptureDescriptorDataARM-pData-parameter

 `pData` **must** be a pointer value

Return Codes

[Success](fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](fundamentals.html#VkResult)

[Failure](fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](fundamentals.html#VkResult)

* 
[VK_ERROR_UNKNOWN](fundamentals.html#VkResult)

* 
[VK_ERROR_VALIDATION_FAILED](fundamentals.html#VkResult)

Information about the tensor view to get descriptor buffer capture data for
is passed in a `VkTensorViewCaptureDescriptorDataInfoARM` structure:

// Provided by VK_EXT_descriptor_buffer with VK_ARM_tensors
typedef struct VkTensorViewCaptureDescriptorDataInfoARM {
    VkStructureType    sType;
    const void*        pNext;
    VkTensorViewARM    tensorView;
} VkTensorViewCaptureDescriptorDataInfoARM;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`tensorView` is the `VkTensorViewARM` handle of the tensor view
to get opaque capture data for.

Valid Usage

* 
[](#VUID-VkTensorViewCaptureDescriptorDataInfoARM-tensorView-09709) VUID-VkTensorViewCaptureDescriptorDataInfoARM-tensorView-09709

If `tensorView` is not [VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE) then `tensorView`
**must** have been created with
[VK_TENSOR_VIEW_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_ARM](resources.html#VkTensorViewCreateFlagBitsARM) set
in [VkTensorViewCreateInfoARM](resources.html#VkTensorViewCreateInfoARM)::`flags`

Valid Usage (Implicit)

* 
[](#VUID-VkTensorViewCaptureDescriptorDataInfoARM-sType-sType) VUID-VkTensorViewCaptureDescriptorDataInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_TENSOR_VIEW_CAPTURE_DESCRIPTOR_DATA_INFO_ARM](fundamentals.html#VkStructureType)

* 
[](#VUID-VkTensorViewCaptureDescriptorDataInfoARM-pNext-pNext) VUID-VkTensorViewCaptureDescriptorDataInfoARM-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkTensorViewCaptureDescriptorDataInfoARM-tensorView-parameter) VUID-VkTensorViewCaptureDescriptorDataInfoARM-tensorView-parameter

 `tensorView` **must** be a valid [VkTensorViewARM](resources.html#VkTensorViewARM) handle
