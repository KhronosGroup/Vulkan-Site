# Descriptor Heaps

## Metadata

- **Component**: spec
- **Version**: latest
- **URL**: /spec/latest/chapters/descriptorheaps.html

## Table of Contents

- [Writing Descriptors](#descriptorheaps-writing)
- [Using Heaps](#descriptorheaps-using)
- [Push Data](#descriptorheaps-pushdata)
- [Push Data Banks](#descriptorheaps-pushdata-banks)
- [Push_Data_Banks](#descriptorheaps-pushdata-banks)
- [Shader Bindings](#descriptorheaps-bindings)
- [Packing descriptors more tightly](#descriptorheaps-exactbitsizes)
- [Packing_descriptors_more_tightly](#descriptorheaps-exactbitsizes)

## Content

When the [`descriptorHeap`](features.html#features-descriptorHeap) feature is
enabled, applications can use descriptor heaps to specify the descriptors
that they will be accessing from shaders.
Descriptor heaps are not objects, rather they are state that is bound to a
command buffer indicating the device address of descriptors that can be
accessed from a shader.
There are two heaps available to the application - the sampler heap and the
resource heap.
The sampler heap contains sampler descriptors, the resource heap contains
image,
acceleration structure,
tensor,
and buffer descriptors.

Descriptors can be obtained for the different heaps with commands that write
descriptors to a host address, with the application responsible for
transferring those descriptors into device memory for access via heaps.

To write sampler descriptors to memory, call:

// Provided by VK_EXT_descriptor_heap
VkResult vkWriteSamplerDescriptorsEXT(
    VkDevice                                    device,
    uint32_t                                    samplerCount,
    const VkSamplerCreateInfo*                  pSamplers,
    const VkHostAddressRangeEXT*                pDescriptors);

* 
`device` is the logical device that the descriptors are for.

* 
`samplerCount` is the number of elements in `pSamplers` and
`pDescriptors`.

* 
`pSamplers` is a pointer to an array of [VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo)
structures defining properties of the sampler descriptors that will be
written.

* 
`pDescriptors` is a pointer to an array of
[VkHostAddressRangeEXT](fundamentals.html#VkHostAddressRangeEXT) structures defining the host address ranges
that will be written to for each descriptor.

Each descriptor will be written to `pDescriptors`[i].`address` where
i is the index of its create info in `pSamplers`.

Descriptors written using a fully identical [VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo)
structure on the same [VkDevice](devsandqueues.html#VkDevice) will always return the same bit
pattern.
If the [descriptorHeapCaptureReplay](features.html#features-descriptorHeapCaptureReplay)
feature is enabled, descriptors written using a fully identical
[VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo) structure on a [VkDevice](devsandqueues.html#VkDevice) created from the
same [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) with identical parameters will always return the
same bit pattern.

|  | YCBCR samplers must be embedded in a shader by using
| --- | --- |
[VkShaderDescriptorSetAndBindingMappingInfoEXT](#VkShaderDescriptorSetAndBindingMappingInfoEXT), they cannot be
specified here. |

Valid Usage

* 
[](#VUID-vkWriteSamplerDescriptorsEXT-descriptorHeap-11202) VUID-vkWriteSamplerDescriptorsEXT-descriptorHeap-11202

The [`descriptorHeap`](features.html#features-descriptorHeap) feature **must** be
enabled

* 
[](#VUID-vkWriteSamplerDescriptorsEXT-size-11203) VUID-vkWriteSamplerDescriptorsEXT-size-11203

The `size` member of each element of `pDescriptors` **must** be
greater than or equal to the value returned by
[vkGetPhysicalDeviceDescriptorSizeEXT](#vkGetPhysicalDeviceDescriptorSizeEXT) with a `descriptorType`
equal to [VK_DESCRIPTOR_TYPE_SAMPLER](descriptors.html#VkDescriptorType)

* 
[](#VUID-vkWriteSamplerDescriptorsEXT-pSamplers-11204) VUID-vkWriteSamplerDescriptorsEXT-pSamplers-11204

Elements of `pSamplers` **must** not include
[VkSamplerYcbcrConversionInfo](samplers.html#VkSamplerYcbcrConversionInfo) structures in their `pNext`
chains

* 
[](#VUID-vkWriteSamplerDescriptorsEXT-borderColor-11444) VUID-vkWriteSamplerDescriptorsEXT-borderColor-11444

If the `borderColor` of any element of `pSamplers` is
[VK_BORDER_COLOR_FLOAT_CUSTOM_EXT](samplers.html#VkBorderColor) or
[VK_BORDER_COLOR_INT_CUSTOM_EXT](samplers.html#VkBorderColor),
[VkSamplerCustomBorderColorIndexCreateInfoEXT](samplers.html#VkSamplerCustomBorderColorIndexCreateInfoEXT) **must** be included in
the `pNext` chain of that element

* 
[](#VUID-vkWriteSamplerDescriptorsEXT-borderColor-11205) VUID-vkWriteSamplerDescriptorsEXT-borderColor-11205

If the `borderColor` of any element of `pSamplers` is
[VK_BORDER_COLOR_FLOAT_CUSTOM_EXT](samplers.html#VkBorderColor) or
[VK_BORDER_COLOR_INT_CUSTOM_EXT](samplers.html#VkBorderColor),
[VkSamplerCustomBorderColorIndexCreateInfoEXT](samplers.html#VkSamplerCustomBorderColorIndexCreateInfoEXT)::`index` **must** be
a value less than [    `maxCustomBorderColorSamplers`](limits.html#limits-maxCustomBorderColorSamplers)

* 
[](#VUID-vkWriteSamplerDescriptorsEXT-pNext-11400) VUID-vkWriteSamplerDescriptorsEXT-pNext-11400

If there is a [VkDebugUtilsObjectNameInfoEXT](debugging.html#VkDebugUtilsObjectNameInfoEXT) structure in the
`pNext` chain of any element of `pSamplers`, its
`objectType` **must** be [VK_OBJECT_TYPE_UNKNOWN](debugging.html#VkObjectType)

Valid Usage (Implicit)

* 
[](#VUID-vkWriteSamplerDescriptorsEXT-device-parameter) VUID-vkWriteSamplerDescriptorsEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkWriteSamplerDescriptorsEXT-pSamplers-parameter) VUID-vkWriteSamplerDescriptorsEXT-pSamplers-parameter

 `pSamplers` **must** be a valid pointer to an array of `samplerCount` valid [VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo) structures

* 
[](#VUID-vkWriteSamplerDescriptorsEXT-pDescriptors-parameter) VUID-vkWriteSamplerDescriptorsEXT-pDescriptors-parameter

 `pDescriptors` **must** be a valid pointer to an array of `samplerCount` valid [VkHostAddressRangeEXT](fundamentals.html#VkHostAddressRangeEXT) structures

* 
[](#VUID-vkWriteSamplerDescriptorsEXT-samplerCount-arraylength) VUID-vkWriteSamplerDescriptorsEXT-samplerCount-arraylength

 `samplerCount` **must** be greater than `0`

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

To write resource descriptors to memory, call:

// Provided by VK_EXT_descriptor_heap
VkResult vkWriteResourceDescriptorsEXT(
    VkDevice                                    device,
    uint32_t                                    resourceCount,
    const VkResourceDescriptorInfoEXT*          pResources,
    const VkHostAddressRangeEXT*                pDescriptors);

* 
`device` is the logical device that the descriptors are for.

* 
`resourceCount` is the number of elements in `pResources` and
`pDescriptors`.

* 
`pResources` is a pointer to an array of
[VkResourceDescriptorInfoEXT](#VkResourceDescriptorInfoEXT) structures defining properties of the
resource descriptors that will be written.

* 
`pDescriptors` is a pointer to an array of
[VkHostAddressRangeEXT](fundamentals.html#VkHostAddressRangeEXT) structures defining the host address ranges
that will be written to for each descriptor.

Each descriptor will be written to `pDescriptors`[i].address where
i is the index of its create info in `pResources`.

If any image descriptor written by this command includes a
[VkSamplerYcbcrConversion](samplers.html#VkSamplerYcbcrConversion), multiple descriptors will be written
adjacent to each other for that descriptor, equal to
[VkSamplerYcbcrConversionImageFormatProperties](capabilities.html#VkSamplerYcbcrConversionImageFormatProperties)::combinedImageSamplerDescriptorCount
for the image.

If any image descriptor written by this command is for an image created with
`flags` containing [VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](resources.html#VkImageCreateFlagBits), multiple
descriptors will be written adjacent to each other for that descriptor,
equal to
[VkSubsampledImageFormatPropertiesEXT](capabilities.html#VkSubsampledImageFormatPropertiesEXT)::subsampledImageDescriptorCount
for the image.

Descriptors using the same `type` and written using a fully identical
[VkTexelBufferDescriptorInfoEXT](#VkTexelBufferDescriptorInfoEXT) or [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR)
structure on the same [VkDevice](devsandqueues.html#VkDevice) will always return the same bit
pattern.
If the [descriptorHeapCaptureReplay](features.html#features-descriptorHeapCaptureReplay)
feature is enabled, this applies to any [VkDevice](devsandqueues.html#VkDevice) created with
identical parameters from the same [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice).

|  | Recreating the same buffer descriptor during replay of a prior capture
| --- | --- |
requires that the device address is the same, which requires additional data
to be captured and provided during replay when creating a buffer and
allocating memory for it. |

Image descriptors using the same `type` and written using a fully
identical [VkImageDescriptorInfoEXT](#VkImageDescriptorInfoEXT) other than
[VkImageDescriptorInfoEXT](#VkImageDescriptorInfoEXT)::`pView->image`, where image was
successfully created with
[VK_IMAGE_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_EXT](resources.html#VkImageCreateFlagBits) and a
[VkOpaqueCaptureDataCreateInfoEXT](resources.html#VkOpaqueCaptureDataCreateInfoEXT) with data captured via
[vkGetImageOpaqueCaptureDataEXT](resources.html#vkGetImageOpaqueCaptureDataEXT) from an image used previously, will
write a descriptor with the same bit pattern if possible; if the same bit
pattern cannot be generated, [VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS](fundamentals.html#VkResult)
will be returned instead.

Tensor descriptors using the same `type` and written using a fully
identical [VkTensorViewCreateInfoARM](resources.html#VkTensorViewCreateInfoARM) other than
[VkTensorViewCreateInfoARM](resources.html#VkTensorViewCreateInfoARM)::`tensor`, where tensor was successfully
created with [VkOpaqueCaptureDataCreateInfoEXT](resources.html#VkOpaqueCaptureDataCreateInfoEXT) with
[VK_TENSOR_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_ARM](resources.html#VkTensorCreateFlagBitsARM) and a
[VkOpaqueCaptureDataCreateInfoEXT](resources.html#VkOpaqueCaptureDataCreateInfoEXT) with data captured via
[vkGetTensorOpaqueCaptureDataARM](resources.html#vkGetTensorOpaqueCaptureDataARM) from a tensor used previously, will
write a descriptor with the same bit pattern if possible; if the same bit
pattern cannot be generated, [VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS](fundamentals.html#VkResult)
will be returned instead.

|  | Image creation is sufficiently complex that it may not be possible to
| --- | --- |
recreate all possible descriptors from an image during replay, even if the
image itself was successfully recreated.
The conditions for this happening will be largely the same as those which
could cause allocating a buffer with the same device address during replay
to fail.
Replay tools are advised to recreate captured descriptors for an image
immediately after recreating the image itself wherever possible.
The same is true for tensors. |

Valid Usage

* 
[](#VUID-vkWriteResourceDescriptorsEXT-descriptorHeap-11206) VUID-vkWriteResourceDescriptorsEXT-descriptorHeap-11206

The [`descriptorHeap`](features.html#features-descriptorHeap) feature **must** be
enabled

* 
[](#VUID-vkWriteResourceDescriptorsEXT-size-11207) VUID-vkWriteResourceDescriptorsEXT-size-11207

The `size` member of each element of `pDescriptors` **must** be
greater than or equal to the value returned by
[vkGetPhysicalDeviceDescriptorSizeEXT](#vkGetPhysicalDeviceDescriptorSizeEXT) with a `descriptorType`
equal to `type`

* 
[](#VUID-vkWriteResourceDescriptorsEXT-pResources-11208) VUID-vkWriteResourceDescriptorsEXT-pResources-11208

If any element of `pResources` specifies a
[VkImageViewCreateInfo](resources.html#VkImageViewCreateInfo) structure with a
[VkSamplerYcbcrConversionInfo](samplers.html#VkSamplerYcbcrConversionInfo) structure in its `pNext` chain,
the corresponding element of `pDescriptors` **must** have a `size`
member that is greater than or equal to the product of the value
returned by [vkGetPhysicalDeviceDescriptorSizeEXT](#vkGetPhysicalDeviceDescriptorSizeEXT) with a
`descriptorType` equal to `type` and
[VkSamplerYcbcrConversionImageFormatProperties](capabilities.html#VkSamplerYcbcrConversionImageFormatProperties)::combinedImageSamplerDescriptorCount,
as queried from [VkPhysicalDeviceImageFormatInfo2](capabilities.html#VkPhysicalDeviceImageFormatInfo2) with image format
info equivalent to the image view the descriptor is being created for

* 
[](#VUID-vkWriteResourceDescriptorsEXT-pResources-11209) VUID-vkWriteResourceDescriptorsEXT-pResources-11209

If any element of `pResources` specifies a
[VkImageViewCreateInfo](resources.html#VkImageViewCreateInfo) structure with an `image` created with
`flags` containing [VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](resources.html#VkImageCreateFlagBits), the
corresponding element of `pDescriptors` **must** have a `size`
member that is greater than or equal to the product of the value
returned by [vkGetPhysicalDeviceDescriptorSizeEXT](#vkGetPhysicalDeviceDescriptorSizeEXT) with a
`descriptorType` equal to `type` and
[VkSubsampledImageFormatPropertiesEXT](capabilities.html#VkSubsampledImageFormatPropertiesEXT)::subsampledImageDescriptorCount,
as queried from [VkPhysicalDeviceImageFormatInfo2](capabilities.html#VkPhysicalDeviceImageFormatInfo2) with image format
info equivalent to the image view the descriptor is being created for

Valid Usage (Implicit)

* 
[](#VUID-vkWriteResourceDescriptorsEXT-device-parameter) VUID-vkWriteResourceDescriptorsEXT-device-parameter

 `device` **must** be a valid [VkDevice](devsandqueues.html#VkDevice) handle

* 
[](#VUID-vkWriteResourceDescriptorsEXT-pResources-parameter) VUID-vkWriteResourceDescriptorsEXT-pResources-parameter

 `pResources` **must** be a valid pointer to an array of `resourceCount` valid [VkResourceDescriptorInfoEXT](#VkResourceDescriptorInfoEXT) structures

* 
[](#VUID-vkWriteResourceDescriptorsEXT-pDescriptors-parameter) VUID-vkWriteResourceDescriptorsEXT-pDescriptors-parameter

 `pDescriptors` **must** be a valid pointer to an array of `resourceCount` valid [VkHostAddressRangeEXT](fundamentals.html#VkHostAddressRangeEXT) structures

* 
[](#VUID-vkWriteResourceDescriptorsEXT-resourceCount-arraylength) VUID-vkWriteResourceDescriptorsEXT-resourceCount-arraylength

 `resourceCount` **must** be greater than `0`

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

`VkResourceDescriptorInfoEXT` is defined as:

// Provided by VK_EXT_descriptor_heap
typedef struct VkResourceDescriptorInfoEXT {
    VkStructureType                sType;
    const void*                    pNext;
    VkDescriptorType               type;
    VkResourceDescriptorDataEXT    data;
} VkResourceDescriptorInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`type` is the type of descriptor to get.

* 
`data` is a [VkResourceDescriptorDataEXT](#VkResourceDescriptorDataEXT) union defining the
properties of a resource descriptor according to `type`

If `type` is [VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](descriptors.html#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptors.html#VkDescriptorType), `data->pTexelBuffer` is
used to construct the descriptor.

If `type` is
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_PARTITIONED_ACCELERATION_STRUCTURE_NV](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](descriptors.html#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](descriptors.html#VkDescriptorType), `data->pAddressRange` is used
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

If `type` is [VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptors.html#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](descriptors.html#VkDescriptorType), `data->pImage` is used to
construct the descriptor.
If `type` is [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptors.html#VkDescriptorType), `data->pTensorARM`
is used to construct the descriptor.

If the [`nullDescriptor`](features.html#features-nullDescriptor) feature is enabled,
the corresponding element of `data` **may** be `NULL` to generate a null
descriptor.

Applications **can** give resource descriptors a debug name in a similar way to
naming an object, via the [VkDebugUtilsObjectNameInfoEXT](debugging.html#VkDebugUtilsObjectNameInfoEXT) structure.
However, as there is no actual object, this structure **must** be passed via
the `pNext` chain of this structure, with a `objectType` of
[VK_OBJECT_TYPE_UNKNOWN](debugging.html#VkObjectType) and a `objectHandle` of
[VK_NULL_HANDLE](../appendices/boilerplate.html#VK_NULL_HANDLE).
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

`type` **must** be one of [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_PARTITIONED_ACCELERATION_STRUCTURE_NV](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptors.html#VkDescriptorType),
or [VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](descriptors.html#VkDescriptorType)

* 
[](#VUID-VkResourceDescriptorInfoEXT-None-11211) VUID-VkResourceDescriptorInfoEXT-None-11211

If
the [`nullDescriptor`](features.html#features-nullDescriptor) feature is not
enabled, and
`type` is [VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptors.html#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptors.html#VkDescriptorType), `data->pImage` **must** not be
`NULL`

* 
[](#VUID-VkResourceDescriptorInfoEXT-type-11469) VUID-VkResourceDescriptorInfoEXT-type-11469

If `type` is
[VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](descriptors.html#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](descriptors.html#VkDescriptorType), `data->pImage` **must** not
be `NULL`

* 
[](#VUID-VkResourceDescriptorInfoEXT-None-11212) VUID-VkResourceDescriptorInfoEXT-None-11212

If
the [`nullDescriptor`](features.html#features-nullDescriptor) feature is not
enabled, and
`type` is [VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](descriptors.html#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptors.html#VkDescriptorType), `data->pTexelBuffer`
**must** not be `NULL`

* 
[](#VUID-VkResourceDescriptorInfoEXT-None-11213) VUID-VkResourceDescriptorInfoEXT-None-11213

If
the [`nullDescriptor`](features.html#features-nullDescriptor) feature is not
enabled, and
`type` is
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_PARTITIONED_ACCELERATION_STRUCTURE_NV](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](descriptors.html#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](descriptors.html#VkDescriptorType), `data->pAddressRange` **must**
not be `NULL`

* 
[](#VUID-VkResourceDescriptorInfoEXT-None-11457) VUID-VkResourceDescriptorInfoEXT-None-11457

If
the [`nullDescriptor`](features.html#features-nullDescriptor) feature is not
enabled, and
`type` is [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptors.html#VkDescriptorType),
`data->pTensorARM` **must** not be `NULL`

* 
[](#VUID-VkResourceDescriptorInfoEXT-type-12349) VUID-VkResourceDescriptorInfoEXT-type-12349

If `type` is [VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](descriptors.html#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptors.html#VkDescriptorType),
`data->pTexelBuffer→addressRange.address` **must** be a multiple of
the effective alignment requirement of `data->pTexelBuffer→format`
as determined by
[`minTexelBufferOffsetAlignment`](limits.html#limits-minTexelBufferOffsetAlignment)

* 
[](#VUID-VkResourceDescriptorInfoEXT-type-12350) VUID-VkResourceDescriptorInfoEXT-type-12350

If `type` is [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](descriptors.html#VkDescriptorType),
`data->pAddressRange→address` **must** be a multiple of
[    `minUniformBufferOffsetAlignment`](limits.html#limits-minUniformBufferOffsetAlignment)

* 
[](#VUID-VkResourceDescriptorInfoEXT-type-12351) VUID-VkResourceDescriptorInfoEXT-type-12351

If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](descriptors.html#VkDescriptorType),
`data->pAddressRange→address` **must** be a multiple of
[    `minStorageBufferOffsetAlignment`](limits.html#limits-minStorageBufferOffsetAlignment)

* 
[](#VUID-VkResourceDescriptorInfoEXT-type-11454) VUID-VkResourceDescriptorInfoEXT-type-11454

If `type` is one of

[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](descriptors.html#VkDescriptorType)

* 
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](descriptors.html#VkDescriptorType)

* 
[VK_DESCRIPTOR_TYPE_PARTITIONED_ACCELERATION_STRUCTURE_NV](descriptors.html#VkDescriptorType)

`data->pAddressRange→address` **must** be a multiple of 256

[](#VUID-VkResourceDescriptorInfoEXT-pNext-11401) VUID-VkResourceDescriptorInfoEXT-pNext-11401

If there is a [VkDebugUtilsObjectNameInfoEXT](debugging.html#VkDebugUtilsObjectNameInfoEXT) structure in the
`pNext` chain, its `objectType` **must** be
[VK_OBJECT_TYPE_UNKNOWN](debugging.html#VkObjectType)

[](#VUID-VkResourceDescriptorInfoEXT-type-11422) VUID-VkResourceDescriptorInfoEXT-type-11422

If `type` is
[VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](descriptors.html#VkDescriptorType), or
[VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](descriptors.html#VkDescriptorType),
`data.pImage->pView→image` **must** not have been created with an
`imageType` of [VK_IMAGE_TYPE_3D](resources.html#VkImageType)

[](#VUID-VkResourceDescriptorInfoEXT-type-11424) VUID-VkResourceDescriptorInfoEXT-type-11424

If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptors.html#VkDescriptorType),
`data.pImage->pView→viewType` is [VK_IMAGE_VIEW_TYPE_2D](resources.html#VkImageViewType), and
the [`image2DViewOf3D`](features.html#features-image2DViewOf3D) feature is not
enabled, `data.pImage->pView→image` **must** not have been created
with an `imageType` of [VK_IMAGE_TYPE_3D](resources.html#VkImageType)

[](#VUID-VkResourceDescriptorInfoEXT-type-11425) VUID-VkResourceDescriptorInfoEXT-type-11425

If `type` is [VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptors.html#VkDescriptorType),
`data.pImage->pView→viewType` is [VK_IMAGE_VIEW_TYPE_2D](resources.html#VkImageViewType), and
the [`sampler2DViewOf3D`](features.html#features-sampler2DViewOf3D) feature is
not enabled, `data.pImage->pView→image` **must** not have been created
with an `imageType` of [VK_IMAGE_TYPE_3D](resources.html#VkImageType)

[](#VUID-VkResourceDescriptorInfoEXT-type-11433) VUID-VkResourceDescriptorInfoEXT-type-11433

If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](descriptors.html#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](descriptors.html#VkDescriptorType), `data.pAddressRange->size`
**must** not be 0

[](#VUID-VkResourceDescriptorInfoEXT-type-11458) VUID-VkResourceDescriptorInfoEXT-type-11458

If `type` is [VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptors.html#VkDescriptorType) and
`data.pImage` is not `NULL`, `data.pImage->pView→image` **must**
have been created with the [VK_IMAGE_USAGE_SAMPLED_BIT](resources.html#VkImageUsageFlagBits) usage flag
set

[](#VUID-VkResourceDescriptorInfoEXT-type-11459) VUID-VkResourceDescriptorInfoEXT-type-11459

If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptors.html#VkDescriptorType) and
`data.pImage` is not `NULL`, `data.pImage->pView→image` **must**
have been created with the [VK_IMAGE_USAGE_STORAGE_BIT](resources.html#VkImageUsageFlagBits) usage flag
set

[](#VUID-VkResourceDescriptorInfoEXT-type-11460) VUID-VkResourceDescriptorInfoEXT-type-11460

If `type` is [VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](descriptors.html#VkDescriptorType) and
`data.pImage` is not `NULL`, `data.pImage->pView→image` **must**
have been created with the [VK_IMAGE_USAGE_INPUT_ATTACHMENT_BIT](resources.html#VkImageUsageFlagBits)
usage flag set

[](#VUID-VkResourceDescriptorInfoEXT-type-11461) VUID-VkResourceDescriptorInfoEXT-type-11461

If `type` is [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](descriptors.html#VkDescriptorType) and
`data.pAddressRange` is not `NULL`, `data.pAddressRange` **must**
be a device address range allocated to the application from a buffer
created with the [VK_BUFFER_USAGE_UNIFORM_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

[](#VUID-VkResourceDescriptorInfoEXT-type-11462) VUID-VkResourceDescriptorInfoEXT-type-11462

If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](descriptors.html#VkDescriptorType) and
`data.pAddressRange` is not `NULL`, `data.pAddressRange` **must**
be a device address range allocated to the application from a buffer
created with the [VK_BUFFER_USAGE_STORAGE_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

[](#VUID-VkResourceDescriptorInfoEXT-type-11463) VUID-VkResourceDescriptorInfoEXT-type-11463

If `type` is [VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](descriptors.html#VkDescriptorType) and
`data.pTexelBuffer` is not `NULL`,
`data.pTexelBuffer->addressRange` **must** be a device address range
allocated to the application from a buffer created with the
[VK_BUFFER_USAGE_UNIFORM_TEXEL_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

[](#VUID-VkResourceDescriptorInfoEXT-type-11464) VUID-VkResourceDescriptorInfoEXT-type-11464

If `type` is [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptors.html#VkDescriptorType) and
`data.pTexelBuffer` is not `NULL`,
`data.pTexelBuffer->addressRange` **must** be a device address range
allocated to the application from a buffer created with the
[VK_BUFFER_USAGE_STORAGE_TEXEL_BUFFER_BIT](resources.html#VkBufferUsageFlagBits) usage flag set

[](#VUID-VkResourceDescriptorInfoEXT-type-11483) VUID-VkResourceDescriptorInfoEXT-type-11483

If `type` is
[VK_DESCRIPTOR_TYPE_PARTITIONED_ACCELERATION_STRUCTURE_NV](descriptors.html#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](descriptors.html#VkDescriptorType), and
`data.pAddressRange` is not `NULL`,
`data.pAddressRange->address` **must** be an acceleration structure
address retrieved from a [VkAccelerationStructureKHR](resources.html#VkAccelerationStructureKHR) object via
[vkGetAccelerationStructureDeviceAddressKHR](resources.html#vkGetAccelerationStructureDeviceAddressKHR)

[](#VUID-VkResourceDescriptorInfoEXT-type-11484) VUID-VkResourceDescriptorInfoEXT-type-11484

If `type` is
[VK_DESCRIPTOR_TYPE_PARTITIONED_ACCELERATION_STRUCTURE_NV](descriptors.html#VkDescriptorType) or
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](descriptors.html#VkDescriptorType),
`data.pAddressRange` is not `NULL`, and
`data.pAddressRange->size` is not 0, `data.pAddressRange` **must**
be a device address range allocated to the application from the buffer
used to create the acceleration structure that
`data.pAddressRange->address` was retrieved from, and within the
buffer range bound to that acceleration structure

[](#VUID-VkResourceDescriptorInfoEXT-type-11467) VUID-VkResourceDescriptorInfoEXT-type-11467

If `type` is [VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](descriptors.html#VkDescriptorType) and
`data.pAddressRange` is not `NULL`,
`data.pAddressRange->address` **must** be an acceleration structure
handle retrieved from a [VkAccelerationStructureNV](resources.html#VkAccelerationStructureNV) object via
[vkGetAccelerationStructureHandleNV](resources.html#vkGetAccelerationStructureHandleNV)

[](#VUID-VkResourceDescriptorInfoEXT-type-11468) VUID-VkResourceDescriptorInfoEXT-type-11468

If `type` is [VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](descriptors.html#VkDescriptorType) and
`data.pAddressRange` is not `NULL`, `data.pAddressRange->size`
**must** be 0

Valid Usage (Implicit)

* 
[](#VUID-VkResourceDescriptorInfoEXT-sType-sType) VUID-VkResourceDescriptorInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_RESOURCE_DESCRIPTOR_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkResourceDescriptorInfoEXT-pNext-pNext) VUID-VkResourceDescriptorInfoEXT-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkDebugUtilsObjectNameInfoEXT](debugging.html#VkDebugUtilsObjectNameInfoEXT)

* 
[](#VUID-VkResourceDescriptorInfoEXT-sType-unique) VUID-VkResourceDescriptorInfoEXT-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkResourceDescriptorInfoEXT-type-parameter) VUID-VkResourceDescriptorInfoEXT-type-parameter

 `type` **must** be a valid [VkDescriptorType](descriptors.html#VkDescriptorType) value

* 
[](#VUID-VkResourceDescriptorInfoEXT-pImage-parameter) VUID-VkResourceDescriptorInfoEXT-pImage-parameter

 If `type` is [VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptors.html#VkDescriptorType), [VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptors.html#VkDescriptorType), [VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](descriptors.html#VkDescriptorType), [VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](descriptors.html#VkDescriptorType), or [VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](descriptors.html#VkDescriptorType), and if `pImage` is not `NULL`, the `pImage` member of `data` **must** be a valid pointer to a valid [VkImageDescriptorInfoEXT](#VkImageDescriptorInfoEXT) structure

* 
[](#VUID-VkResourceDescriptorInfoEXT-pTexelBuffer-parameter) VUID-VkResourceDescriptorInfoEXT-pTexelBuffer-parameter

 If `type` is [VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](descriptors.html#VkDescriptorType) or [VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptors.html#VkDescriptorType), and if `pTexelBuffer` is not `NULL`, the `pTexelBuffer` member of `data` **must** be a valid pointer to a valid [VkTexelBufferDescriptorInfoEXT](#VkTexelBufferDescriptorInfoEXT) structure

* 
[](#VUID-VkResourceDescriptorInfoEXT-pAddressRange-parameter) VUID-VkResourceDescriptorInfoEXT-pAddressRange-parameter

 If `type` is [VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](descriptors.html#VkDescriptorType), [VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](descriptors.html#VkDescriptorType), or [VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](descriptors.html#VkDescriptorType), and if `pAddressRange` is not `NULL`, the `pAddressRange` member of `data` **must** be a valid pointer to a valid [VkDeviceAddressRangeEXT](fundamentals.html#VkDeviceAddressRangeEXT) structure

* 
[](#VUID-VkResourceDescriptorInfoEXT-pTensorARM-parameter) VUID-VkResourceDescriptorInfoEXT-pTensorARM-parameter

 If `type` is [VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptors.html#VkDescriptorType), and if `pTensorARM` is not `NULL`, the `pTensorARM` member of `data` **must** be a valid pointer to a valid [VkTensorViewCreateInfoARM](resources.html#VkTensorViewCreateInfoARM) structure

The `VkResourceDescriptorDataEXT` union is defined as:

// Provided by VK_EXT_descriptor_heap
typedef union VkResourceDescriptorDataEXT {
    const VkImageDescriptorInfoEXT*          pImage;
    const VkTexelBufferDescriptorInfoEXT*    pTexelBuffer;
    const VkDeviceAddressRangeEXT*           pAddressRange;
    const VkTensorViewCreateInfoARM*         pTensorARM;
} VkResourceDescriptorDataEXT;

* 
`pImage` is a pointer to a [VkImageDescriptorInfoEXT](#VkImageDescriptorInfoEXT) structure.

* 
`pTexelBuffer` is a pointer to a
[VkTexelBufferDescriptorInfoEXT](#VkTexelBufferDescriptorInfoEXT) structure.

* 
`pAddressRange` is a pointer to a [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR)
structure.

* 
`pTensorARM` is a pointer to a [VkTensorViewCreateInfoARM](resources.html#VkTensorViewCreateInfoARM)
structure.

`VkTexelBufferDescriptorInfoEXT` is defined as:

// Provided by VK_EXT_descriptor_heap
typedef struct VkTexelBufferDescriptorInfoEXT {
    VkStructureType            sType;
    const void*                pNext;
    VkFormat                   format;
    VkDeviceAddressRangeEXT    addressRange;
} VkTexelBufferDescriptorInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`format` is the [VkFormat](formats.html#VkFormat) of the descriptor.

* 
`addressRange` is a [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR) defining the range
of data backing the descriptor.

Valid Usage (Implicit)

* 
[](#VUID-VkTexelBufferDescriptorInfoEXT-sType-sType) VUID-VkTexelBufferDescriptorInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_TEXEL_BUFFER_DESCRIPTOR_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkTexelBufferDescriptorInfoEXT-pNext-pNext) VUID-VkTexelBufferDescriptorInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkTexelBufferDescriptorInfoEXT-format-parameter) VUID-VkTexelBufferDescriptorInfoEXT-format-parameter

 `format` **must** be a valid [VkFormat](formats.html#VkFormat) value

`VkImageDescriptorInfoEXT` is defined as:

// Provided by VK_EXT_descriptor_heap
typedef struct VkImageDescriptorInfoEXT {
    VkStructureType                 sType;
    const void*                     pNext;
    const VkImageViewCreateInfo*    pView;
    VkImageLayout                   layout;
} VkImageDescriptorInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pView` is an [VkImageViewCreateInfo](resources.html#VkImageViewCreateInfo) describing the descriptor.

* 
`layout` is the [VkImageLayout](resources.html#VkImageLayout) that the image view will be in
when accessed as a descriptor.

Valid Usage

* 
[](#VUID-VkImageDescriptorInfoEXT-pView-11426) VUID-VkImageDescriptorInfoEXT-pView-11426

`pView->viewType` **must** not be [VK_IMAGE_VIEW_TYPE_2D_ARRAY](resources.html#VkImageViewType) if
`pView->image` was created with an `imageType` of
[VK_IMAGE_TYPE_3D](resources.html#VkImageType)

* 
[](#VUID-VkImageDescriptorInfoEXT-pView-11427) VUID-VkImageDescriptorInfoEXT-pView-11427

If `pView->viewType` is [VK_IMAGE_VIEW_TYPE_2D](resources.html#VkImageViewType) and
`pView->image` was created with an `imageType` of
[VK_IMAGE_TYPE_3D](resources.html#VkImageType), `pView->image` **must** have been created with
[VK_IMAGE_CREATE_2D_VIEW_COMPATIBLE_BIT_EXT](resources.html#VkImageCreateFlagBits) set

* 
[](#VUID-VkImageDescriptorInfoEXT-layout-11219) VUID-VkImageDescriptorInfoEXT-layout-11219

`layout` **must** be
[VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_SHADER_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_SHARED_PRESENT_KHR](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_RENDERING_LOCAL_READ_KHR](resources.html#VkImageLayout),
[VK_IMAGE_LAYOUT_ATTACHMENT_FEEDBACK_LOOP_OPTIMAL_EXT](resources.html#VkImageLayout),
or [VK_IMAGE_LAYOUT_GENERAL](resources.html#VkImageLayout)

* 
[](#VUID-VkImageDescriptorInfoEXT-layout-11221) VUID-VkImageDescriptorInfoEXT-layout-11221

    If `layout` is
    [VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_STENCIL_ATTACHMENT_OPTIMAL](resources.html#VkImageLayout),
    [VK_IMAGE_LAYOUT_DEPTH_ATTACHMENT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
    [VK_IMAGE_LAYOUT_DEPTH_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
    [VK_IMAGE_LAYOUT_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout),
or
    [VK_IMAGE_LAYOUT_DEPTH_STENCIL_READ_ONLY_OPTIMAL](resources.html#VkImageLayout), then
    `pView->aspectMask` **must** not include
    [VK_IMAGE_ASPECT_COLOR_BIT](resources.html#VkImageAspectFlagBits)

* 
[](#VUID-VkImageDescriptorInfoEXT-pView-11430) VUID-VkImageDescriptorInfoEXT-pView-11430

If `pView->image` is a depth/stencil image,
`pView->subresourceRange.aspectMask` **must** include either
[VK_IMAGE_ASPECT_DEPTH_BIT](resources.html#VkImageAspectFlagBits) or [VK_IMAGE_ASPECT_STENCIL_BIT](resources.html#VkImageAspectFlagBits) but
not both

Valid Usage (Implicit)

* 
[](#VUID-VkImageDescriptorInfoEXT-sType-sType) VUID-VkImageDescriptorInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_IMAGE_DESCRIPTOR_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkImageDescriptorInfoEXT-pNext-pNext) VUID-VkImageDescriptorInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkImageDescriptorInfoEXT-pView-parameter) VUID-VkImageDescriptorInfoEXT-pView-parameter

 `pView` **must** be a valid pointer to a valid [VkImageViewCreateInfo](resources.html#VkImageViewCreateInfo) structure

* 
[](#VUID-VkImageDescriptorInfoEXT-layout-parameter) VUID-VkImageDescriptorInfoEXT-layout-parameter

 `layout` **must** be a valid [VkImageLayout](resources.html#VkImageLayout) value

One descriptor heap of each type can be bound to a command buffer for use
with shaders.
When using descriptor heaps, pipelines **must** be created with
[VK_PIPELINE_CREATE_2_DESCRIPTOR_HEAP_BIT_EXT](pipelines.html#VkPipelineCreateFlagBits2KHR)
and shaders created with [VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](shaders.html#VkShaderCreateFlagBitsEXT)
in order to make use of the heaps.

When any heap state command is recorded to a command buffer, it immediately
invalidates all descriptor set
and descriptor buffer
state set by
[vkCmdBindDescriptorSets2](descriptorsets.html#vkCmdBindDescriptorSets2),
[vkCmdPushDescriptorSet2](descriptorsets.html#vkCmdPushDescriptorSet2),
[vkCmdPushDescriptorSetWithTemplate2](descriptorsets.html#vkCmdPushDescriptorSetWithTemplate2),
[vkCmdSetDescriptorBufferOffsets2EXT](descriptorbuffers.html#vkCmdSetDescriptorBufferOffsets2EXT),
[vkCmdBindDescriptorBufferEmbeddedSamplers2EXT](descriptorbuffers.html#vkCmdBindDescriptorBufferEmbeddedSamplers2EXT),
[vkCmdPushConstants2](descriptorsets.html#vkCmdPushConstants2),
[vkCmdBindDescriptorSets](descriptorsets.html#vkCmdBindDescriptorSets),
[vkCmdPushDescriptorSet](descriptorsets.html#vkCmdPushDescriptorSet),
[vkCmdPushDescriptorSetWithTemplate](descriptorsets.html#vkCmdPushDescriptorSetWithTemplate),
[vkCmdBindDescriptorBuffersEXT](descriptorbuffers.html#vkCmdBindDescriptorBuffersEXT),
[vkCmdSetDescriptorBufferOffsetsEXT](descriptorbuffers.html#vkCmdSetDescriptorBufferOffsetsEXT),
[vkCmdBindDescriptorBufferEmbeddedSamplersEXT](descriptorbuffers.html#vkCmdBindDescriptorBufferEmbeddedSamplersEXT),
or [vkCmdPushConstants](descriptorsets.html#vkCmdPushConstants).
Similarly, recording any of these commands immediately invalidates all state
set by commands in this chapter.

Implementations **may** require storage in descriptor heaps for their own
internal descriptors.
Storage for these extra descriptors **must** be allocated by the application as
part of each descriptor heap address range, and **must** not be accessed by the
application while it is bound as a reserved range, in any command buffer,
until all such command buffers are freed or reset.
The amount of storage required by an implementation is advertised by
[`minResourceHeapReservedRange`](limits.html#limits-minResourceHeapReservedRange)
for the resource heap, and [`minSamplerHeapReservedRange`](limits.html#limits-minSamplerHeapReservedRange) or
[`minSamplerHeapReservedRangeWithEmbedded`](limits.html#limits-minSamplerHeapReservedRangeWithEmbedded) for the sampler heap (the
latter being required when using embedded samplers).

Applications **can** set different heaps to use the same address ranges, but
**must** take care to ensure that the [reserved ranges](#descriptorheaps-reservedranges) for each heap do not overlap with each other or with user
ranges.

To bind a sampler heap to a command buffer, call:

// Provided by VK_EXT_descriptor_heap
void vkCmdBindSamplerHeapEXT(
    VkCommandBuffer                             commandBuffer,
    const VkBindHeapInfoEXT*                    pBindInfo);

* 
`commandBuffer` is the command buffer that the sampler heap will be
bound to.

* 
`pBindInfo` is a [VkBindHeapInfoEXT](#VkBindHeapInfoEXT) specifying the device
address range used for the heap and any implementation reservations.

Addresses in the range defined by `pBindInfo->heapRange` are bound as
the sampler heap.
The application **can** access samplers and data through this heap anywhere
except for the reserved range specified by
`pBindInfo->reservedRangeOffset`.
Addresses in the range [`pBindInfo->reservedRangeOffset`,
`pBindInfo->reservedRangeOffset` + 
[`minSamplerHeapReservedRange`](limits.html#limits-minSamplerHeapReservedRange)),
or in the range [`pBindInfo->reservedRangeOffset`,
`pBindInfo->reservedRangeOffset` + 
[`minSamplerHeapReservedRangeWithEmbedded`](limits.html#limits-minSamplerHeapReservedRangeWithEmbedded)) if embedded samplers will
be used, are reserved for the implementation and **must** not be accessed by
the application at any time from when this command is recorded until all
command buffers with that range bound (even invalid ones) have been reset or
freed.

|  | Implementations may require a larger sampler heap reservation to store
| --- | --- |
embedded sampler descriptors when used in a mapping, as advertised by
[`minSamplerHeapReservedRangeWithEmbedded`](limits.html#limits-minSamplerHeapReservedRangeWithEmbedded). |

Shaders executed by commands recorded after this command **can** use the
specified sampler heap to access resources.
`pBindInfo->heapRange.address` will be available to shaders to access
samplers and data through the `SamplerHeapEXT` `BuiltIn` or via
[shader bindings](#descriptorheaps-bindings).

When `vkCmdBindSamplerHeapEXT` is recorded, it
[immediately invalidates all non-heap descriptor state](#descriptorheaps-invalidate-sets).
Similarly, recording any non-heap descriptor state commands immediately
invalidates state set by this command.

Valid Usage

* 
[](#VUID-vkCmdBindSamplerHeapEXT-pBindInfo-11223) VUID-vkCmdBindSamplerHeapEXT-pBindInfo-11223

The sum of `pBindInfo->reservedRangeOffset` and
`pBindInfo->reservedRangeSize` **must** be less than or equal to
`pBindInfo->heapRange.size`

* 
[](#VUID-vkCmdBindSamplerHeapEXT-pBindInfo-11224) VUID-vkCmdBindSamplerHeapEXT-pBindInfo-11224

`pBindInfo->reservedRangeSize` **must** be greater than or equal to
[`minSamplerHeapReservedRange`](limits.html#limits-minSamplerHeapReservedRange)

* 
[](#VUID-vkCmdBindSamplerHeapEXT-pBindInfo-11225) VUID-vkCmdBindSamplerHeapEXT-pBindInfo-11225

`pBindInfo->heapRange.size` **must**be less than or equal to
[`maxSamplerHeapSize`](limits.html#limits-maxSamplerHeapSize)

* 
[](#VUID-vkCmdBindSamplerHeapEXT-pBindInfo-11226) VUID-vkCmdBindSamplerHeapEXT-pBindInfo-11226

`pBindInfo->heapRange.address` **must** be a multiple of
[`samplerHeapAlignment`](limits.html#limits-samplerHeapAlignment)

* 
[](#VUID-vkCmdBindSamplerHeapEXT-pBindInfo-11434) VUID-vkCmdBindSamplerHeapEXT-pBindInfo-11434

`pBindInfo->reservedRangeOffset` **must** be a multiple of
[`samplerDescriptorAlignment`](limits.html#limits-samplerDescriptorAlignment)

* 
[](#VUID-vkCmdBindSamplerHeapEXT-pBindInfo-11228) VUID-vkCmdBindSamplerHeapEXT-pBindInfo-11228

Memory bound to addresses in the range
[`pBindInfo->heapRange.address` + 
`pBindInfo->reservedRangeOffset`, `pBindInfo->heapRange.address`
+  `pBindInfo->reservedRangeOffset` + 
`pBindInfo->reservedRangeSize`) **must** not be
[bound to any other command buffer as a    reserved range](#descriptorheaps-reservedranges) for any heap unless the reserved range matches exactly
and it is the same heap type

* 
[](#VUID-vkCmdBindSamplerHeapEXT-heapRange-11230) VUID-vkCmdBindSamplerHeapEXT-heapRange-11230

`heapRange` **must** be a device address range allocated to the
application from a buffer created with the
[VK_BUFFER_USAGE_DESCRIPTOR_HEAP_BIT_EXT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdBindSamplerHeapEXT-commandBuffer-11231) VUID-vkCmdBindSamplerHeapEXT-commandBuffer-11231

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pSamplerHeapBindInfo`
equal to `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBindSamplerHeapEXT-commandBuffer-parameter) VUID-vkCmdBindSamplerHeapEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBindSamplerHeapEXT-pBindInfo-parameter) VUID-vkCmdBindSamplerHeapEXT-pBindInfo-parameter

 `pBindInfo` **must** be a valid pointer to a valid [VkBindHeapInfoEXT](#VkBindHeapInfoEXT) structure

* 
[](#VUID-vkCmdBindSamplerHeapEXT-commandBuffer-recording) VUID-vkCmdBindSamplerHeapEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBindSamplerHeapEXT-commandBuffer-cmdpool) VUID-vkCmdBindSamplerHeapEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdBindSamplerHeapEXT-videocoding) VUID-vkCmdBindSamplerHeapEXT-videocoding

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

vkCmdBindSamplerHeapEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

To bind a resource heap to a command buffer, call:

// Provided by VK_EXT_descriptor_heap
void vkCmdBindResourceHeapEXT(
    VkCommandBuffer                             commandBuffer,
    const VkBindHeapInfoEXT*                    pBindInfo);

* 
`commandBuffer` is the command buffer that the resource heap will be
bound to.

* 
`pBindInfo` is a [VkBindHeapInfoEXT](#VkBindHeapInfoEXT) specifying the device
address range used for the heap and any implementation reservations.

Addresses in the range defined by `pBindInfo->heapRange` are bound as
the resource heap.
The application **can** access resources and data through this heap anywhere
except for the reserved range specified by
`pBindInfo->reservedRangeOffset`.
Addresses in the range [`pBindInfo->reservedRangeOffset`,
`pBindInfo->reservedRangeOffset` + 
[`minResourceHeapReservedRange`](limits.html#limits-minResourceHeapReservedRange))
are reserved for the implementation and **must** not be accessed by the
application at any time from when this command is recorded until there are
no command buffers with that range bound.

Shaders executed by commands recorded after this command **can** use the
specified resource heap to access resources.
`pBindInfo->heapRange.address` will be available to shaders to access
resources through the `ResourceHeapEXT` `BuiltIn` or via
[shader bindings](#descriptorheaps-bindings).

When `vkCmdBindResourceHeapEXT` is recorded, it
[immediately invalidates all non-heap descriptor state](#descriptorheaps-invalidate-sets).
Similarly, recording any non-heap descriptor state commands immediately
invalidates state set by this command.

Valid Usage

* 
[](#VUID-vkCmdBindResourceHeapEXT-pBindInfo-11232) VUID-vkCmdBindResourceHeapEXT-pBindInfo-11232

The sum of `pBindInfo->reservedRangeOffset` and
`pBindInfo->reservedRangeSize` **must** be less than or equal to
`pBindInfo->heapRange.size`

* 
[](#VUID-vkCmdBindResourceHeapEXT-pBindInfo-11233) VUID-vkCmdBindResourceHeapEXT-pBindInfo-11233

`pBindInfo->reservedRangeSize` **must** be greater than or equal to
[`minResourceHeapReservedRange`](limits.html#limits-minResourceHeapReservedRange)

* 
[](#VUID-vkCmdBindResourceHeapEXT-pBindInfo-11234) VUID-vkCmdBindResourceHeapEXT-pBindInfo-11234

`pBindInfo->heapRange.size` **must**be less than or equal to
[`maxResourceHeapSize`](limits.html#limits-maxResourceHeapSize)

* 
[](#VUID-vkCmdBindResourceHeapEXT-pBindInfo-11235) VUID-vkCmdBindResourceHeapEXT-pBindInfo-11235

`pBindInfo->heapRange.address` **must** be a multiple of
[`resourceHeapAlignment`](limits.html#limits-resourceHeapAlignment)

* 
[](#VUID-vkCmdBindResourceHeapEXT-pBindInfo-11435) VUID-vkCmdBindResourceHeapEXT-pBindInfo-11435

`pBindInfo->reservedRangeOffset` **must** be a multiple of
[`bufferDescriptorAlignment`](limits.html#limits-bufferDescriptorAlignment)

* 
[](#VUID-vkCmdBindResourceHeapEXT-pBindInfo-11436) VUID-vkCmdBindResourceHeapEXT-pBindInfo-11436

`pBindInfo->reservedRangeOffset` **must** be a multiple of
[`imageDescriptorAlignment`](limits.html#limits-imageDescriptorAlignment)

* 
[](#VUID-vkCmdBindResourceHeapEXT-pBindInfo-11236) VUID-vkCmdBindResourceHeapEXT-pBindInfo-11236

Memory bound to addresses in the range
[`pBindInfo->heapRange.address` + 
`pBindInfo->reservedRangeOffset`, `pBindInfo->heapRange.address`
+  `pBindInfo->reservedRangeOffset` + 
`pBindInfo->reservedRangeSize`) **must** not be
[bound to any other command buffer as a    reserved range](#descriptorheaps-reservedranges) for any heap unless the reserved range matches exactly
and it is the same heap type

* 
[](#VUID-vkCmdBindResourceHeapEXT-heapRange-11237) VUID-vkCmdBindResourceHeapEXT-heapRange-11237

`heapRange` **must** be a device address range allocated to the
application from a buffer created with the
[VK_BUFFER_USAGE_DESCRIPTOR_HEAP_BIT_EXT](resources.html#VkBufferUsageFlagBits) usage flag set

* 
[](#VUID-vkCmdBindResourceHeapEXT-commandBuffer-11238) VUID-vkCmdBindResourceHeapEXT-commandBuffer-11238

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](cmdbuffers.html#VkCommandBufferInheritanceDescriptorHeapInfoEXT)::`pResourceHeapBindInfo`
equal to `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkCmdBindResourceHeapEXT-commandBuffer-parameter) VUID-vkCmdBindResourceHeapEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdBindResourceHeapEXT-pBindInfo-parameter) VUID-vkCmdBindResourceHeapEXT-pBindInfo-parameter

 `pBindInfo` **must** be a valid pointer to a valid [VkBindHeapInfoEXT](#VkBindHeapInfoEXT) structure

* 
[](#VUID-vkCmdBindResourceHeapEXT-commandBuffer-recording) VUID-vkCmdBindResourceHeapEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdBindResourceHeapEXT-commandBuffer-cmdpool) VUID-vkCmdBindResourceHeapEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdBindResourceHeapEXT-videocoding) VUID-vkCmdBindResourceHeapEXT-videocoding

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

vkCmdBindResourceHeapEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

`VkBindHeapInfoEXT` is defined as:

// Provided by VK_EXT_descriptor_heap
typedef struct VkBindHeapInfoEXT {
    VkStructureType            sType;
    const void*                pNext;
    VkDeviceAddressRangeEXT    heapRange;
    VkDeviceSize               reservedRangeOffset;
    VkDeviceSize               reservedRangeSize;
} VkBindHeapInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`heapRange` is a [VkDeviceAddressRangeKHR](fundamentals.html#VkDeviceAddressRangeKHR) defining the device
address range used for the heap, inclusive of the implementation
reserved range.

* 
`reservedRangeOffset` is the offset within `heapRange` to the
start of the reserved range for the implementation.

* 
`reservedRangeSize` is the size of the reserved range for the
implementation within `heapRange`.

Valid Usage (Implicit)

* 
[](#VUID-VkBindHeapInfoEXT-sType-sType) VUID-VkBindHeapInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_BIND_HEAP_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkBindHeapInfoEXT-pNext-pNext) VUID-VkBindHeapInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

`SamplerHeapEXT`

Decorating a variable with the `SamplerHeapEXT` built-in decoration will
back it with the contents of the sampler heap bound by
[vkCmdBindSamplerHeapEXT](#vkCmdBindSamplerHeapEXT).

Valid Usage

* 
[](#VUID-SamplerHeapEXT-SamplerHeapEXT-11239) VUID-SamplerHeapEXT-SamplerHeapEXT-11239

The variable decorated with `SamplerHeapEXT` **must** be declared using
the `UniformConstant` `Storage` `Class`

`ResourceHeapEXT`

Decorating a variable with the `ResourceHeapEXT` built-in decoration will
back it with the contents of the resource heap bound by
[vkCmdBindResourceHeapEXT](#vkCmdBindResourceHeapEXT).

Valid Usage

* 
[](#VUID-ResourceHeapEXT-ResourceHeapEXT-11241) VUID-ResourceHeapEXT-ResourceHeapEXT-11241

The variable decorated with `ResourceHeapEXT` **must** be declared using
the `UniformConstant` `Storage` `Class`

Push constants specified by [vkCmdPushConstants](descriptorsets.html#vkCmdPushConstants)
or [vkCmdPushConstants2KHR](descriptorsets.html#vkCmdPushConstants2KHR)
rely on descriptor set layout state, and are not compatible with descriptor
heaps.
A new push interface is provided for use with descriptor heaps:

To update push data when using descriptor heaps, call:

// Provided by VK_EXT_descriptor_heap
void vkCmdPushDataEXT(
    VkCommandBuffer                             commandBuffer,
    const VkPushDataInfoEXT*                    pPushDataInfo);

* 
`commandBuffer` is the command buffer in which the push data update
will be recorded.

* 
`pPushDataInfo` is a pointer to a [VkPushDataInfoEXT](#VkPushDataInfoEXT) structure.

When `vkCmdPushDataEXT` is recorded, it
[immediately invalidates all non-heap descriptor state](#descriptorheaps-invalidate-sets).
Similarly, recording any non-heap descriptor state commands immediately
invalidates state set by this command.

All push data is available to all shaders using the existing
`PushConstant` `Storage` `Class`.

|  | Device addresses in push data are intended as the fast path for
| --- | --- |
shader-constant data that does not fit into push data directly.
In order to maximize performance of constant data inputs, addresses should
be aligned to [`minUniformBufferOffsetAlignment`](limits.html#limits-minUniformBufferOffsetAlignment), and decorated with `Alignment`
and `NonWritable` in the shader when using physical pointers. |

Valid Usage (Implicit)

* 
[](#VUID-vkCmdPushDataEXT-commandBuffer-parameter) VUID-vkCmdPushDataEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](cmdbuffers.html#VkCommandBuffer) handle

* 
[](#VUID-vkCmdPushDataEXT-pPushDataInfo-parameter) VUID-vkCmdPushDataEXT-pPushDataInfo-parameter

 `pPushDataInfo` **must** be a valid pointer to a valid [VkPushDataInfoEXT](#VkPushDataInfoEXT) structure

* 
[](#VUID-vkCmdPushDataEXT-commandBuffer-recording) VUID-vkCmdPushDataEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdPushDataEXT-commandBuffer-cmdpool) VUID-vkCmdPushDataEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](devsandqueues.html#VkQueueFlagBits), or [VK_QUEUE_GRAPHICS_BIT](devsandqueues.html#VkQueueFlagBits) operations

* 
[](#VUID-vkCmdPushDataEXT-videocoding) VUID-vkCmdPushDataEXT-videocoding

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

vkCmdPushDataEXT is not affected by [conditional rendering](drawing.html#drawing-conditional-rendering)

The `VkPushDataInfoEXT` structure is defined as:

// Provided by VK_EXT_descriptor_heap
typedef struct VkPushDataInfoEXT {
    VkStructureType               sType;
    const void*                   pNext;
    uint32_t                      offset;
    VkHostAddressRangeConstEXT    data;
} VkPushDataInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`offset` is the start offset of the push data range to update, in
units of bytes.

* 
`data` is the host address range containing the push data to update.

Valid Usage

* 
[](#VUID-VkPushDataInfoEXT-offset-11243) VUID-VkPushDataInfoEXT-offset-11243

The sum of `offset` and `data.size` **must** be less than or equal
to [`maxPushDataSize`](limits.html#limits-maxPushDataSize)

* 
[](#VUID-VkPushDataInfoEXT-offset-11418) VUID-VkPushDataInfoEXT-offset-11418

`offset` **must** be a multiple of 4

* 
[](#VUID-VkPushDataInfoEXT-data-11419) VUID-VkPushDataInfoEXT-data-11419

`data.size` **must** be a multiple of 4

Valid Usage (Implicit)

* 
[](#VUID-VkPushDataInfoEXT-sType-sType) VUID-VkPushDataInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PUSH_DATA_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkPushDataInfoEXT-pNext-pNext) VUID-VkPushDataInfoEXT-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkPushConstantBankInfoNV](#VkPushConstantBankInfoNV)

* 
[](#VUID-VkPushDataInfoEXT-sType-unique) VUID-VkPushDataInfoEXT-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkPushDataInfoEXT-data-parameter) VUID-VkPushDataInfoEXT-data-parameter

 `data` **must** be a valid [VkHostAddressRangeConstEXT](fundamentals.html#VkHostAddressRangeConstEXT) structure

When the [pushConstantBank](features.html#features-pushConstantBank) feature is enabled,
applications **can** specify the hardware bank into which data is pushed using
the `VkPushConstantBankInfoNV` structure.

The `VkPushConstantBankInfoNV` structure is defined as:

// Provided by VK_NV_push_constant_bank
typedef struct VkPushConstantBankInfoNV {
    VkStructureType    sType;
    const void*        pNext;
    uint32_t           bank;
} VkPushConstantBankInfoNV;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`bank` is the index of the hardware bank into which the data is
pushed.

This structure **can** be chained to [VkPushDataInfoEXT](#VkPushDataInfoEXT),
[VkPushConstantsInfo](descriptorsets.html#VkPushConstantsInfo), [VkDescriptorSetAndBindingMappingEXT](#VkDescriptorSetAndBindingMappingEXT), and
[VkIndirectCommandsLayoutTokenEXT](device_generated_commands/generatedcommands.html#VkIndirectCommandsLayoutTokenEXT) via the `pNext` chain to specify
push constant bank placement:

* 
When chained to [VkPushDataInfoEXT](#VkPushDataInfoEXT), it specifies the hardware bank
into which [vkCmdPushDataEXT](#vkCmdPushDataEXT) pushes the data.

* 
When chained to [VkPushConstantsInfo](descriptorsets.html#VkPushConstantsInfo), it specifies the hardware
bank into which [vkCmdPushConstants2](descriptorsets.html#vkCmdPushConstants2) pushes the constants.

* 
When chained to [VkDescriptorSetAndBindingMappingEXT](#VkDescriptorSetAndBindingMappingEXT), it specifies
the hardware push data bank from which the push data is read.

* 
When chained to [VkIndirectCommandsLayoutTokenEXT](device_generated_commands/generatedcommands.html#VkIndirectCommandsLayoutTokenEXT) with
[VK_INDIRECT_COMMANDS_TOKEN_TYPE_PUSH_DATA_EXT](device_generated_commands/generatedcommands.html#VkIndirectCommandsTokenTypeEXT), it specifies the
hardware bank into which indirect push data is placed.

This allows for more flexible push constant management in descriptor heap
scenarios where shaders access different root descriptors with specific bank
requirements.

Valid Usage

* 
[](#VUID-VkPushConstantBankInfoNV-bank-12342) VUID-VkPushConstantBankInfoNV-bank-12342

When chained to [VkPushDataInfoEXT](#VkPushDataInfoEXT), if the command buffer is
executing graphics operations, `bank` **must** be less than
[VkPhysicalDevicePushConstantBankPropertiesNV](limits.html#VkPhysicalDevicePushConstantBankPropertiesNV)::`maxGraphicsPushDataBanks`

* 
[](#VUID-VkPushConstantBankInfoNV-bank-12343) VUID-VkPushConstantBankInfoNV-bank-12343

When chained to [VkPushDataInfoEXT](#VkPushDataInfoEXT), if the command buffer is
executing compute operations, `bank` **must** be less than
[VkPhysicalDevicePushConstantBankPropertiesNV](limits.html#VkPhysicalDevicePushConstantBankPropertiesNV)::`maxComputePushDataBanks`

* 
[](#VUID-VkPushConstantBankInfoNV-bank-12344) VUID-VkPushConstantBankInfoNV-bank-12344

When chained to [VkPushConstantsInfo](descriptorsets.html#VkPushConstantsInfo), if
VkPushConstantsInfo::stageFlags includes a graphics stage then
`bank` **must** be less than
[VkPhysicalDevicePushConstantBankPropertiesNV](limits.html#VkPhysicalDevicePushConstantBankPropertiesNV)::`maxGraphicsPushConstantBanks`

* 
[](#VUID-VkPushConstantBankInfoNV-bank-12345) VUID-VkPushConstantBankInfoNV-bank-12345

When chained to [VkPushConstantsInfo](descriptorsets.html#VkPushConstantsInfo), if
VkPushConstantsInfo::stageFlags includes a compute stage then `bank`
**must** be less than
[VkPhysicalDevicePushConstantBankPropertiesNV](limits.html#VkPhysicalDevicePushConstantBankPropertiesNV)::`maxComputePushConstantBanks`

* 
[](#VUID-VkPushConstantBankInfoNV-bank-12346) VUID-VkPushConstantBankInfoNV-bank-12346

When chained to [VkDescriptorSetAndBindingMappingEXT](#VkDescriptorSetAndBindingMappingEXT) for a graphics
shader stage, `bank` **must** be less than
[VkPhysicalDevicePushConstantBankPropertiesNV](limits.html#VkPhysicalDevicePushConstantBankPropertiesNV)::`maxGraphicsPushDataBanks`

* 
[](#VUID-VkPushConstantBankInfoNV-bank-12347) VUID-VkPushConstantBankInfoNV-bank-12347

When chained to [VkDescriptorSetAndBindingMappingEXT](#VkDescriptorSetAndBindingMappingEXT) for a compute
shader stage, `bank` **must** be less than
[VkPhysicalDevicePushConstantBankPropertiesNV](limits.html#VkPhysicalDevicePushConstantBankPropertiesNV)::`maxComputePushDataBanks`

Valid Usage (Implicit)

* 
[](#VUID-VkPushConstantBankInfoNV-sType-sType) VUID-VkPushConstantBankInfoNV-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PUSH_CONSTANT_BANK_INFO_NV](fundamentals.html#VkStructureType)

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkDescriptorSetAndBindingMappingEXT](#VkDescriptorSetAndBindingMappingEXT)

* 
[VkIndirectCommandsLayoutTokenEXT](device_generated_commands/generatedcommands.html#VkIndirectCommandsLayoutTokenEXT)

* 
[VkPushConstantsInfo](descriptorsets.html#VkPushConstantsInfo)

* 
[VkPushDataInfoEXT](#VkPushDataInfoEXT)

While descriptor heaps can be accessed directly through the
`SamplerHeapEXT` and `ResourceHeapEXT` built-ins, shaders using the
existing `DescriptorSet` and `Binding` decorations **can** map these to
heap offsets.
In place of descriptor set layouts and pipeline layouts, information **can** be
provided at pipeline
or shader
creation time to indicate how these bindings are mapped, through a
combination of constants, push data, and indirections through device
addresses.
This interface provides significantly more flexibility than descriptor set
layouts, enabling applications to specify precisely where they expect each
descriptor to be.

The `VkShaderDescriptorSetAndBindingMappingInfoEXT` structure is defined
as:

// Provided by VK_EXT_descriptor_heap
typedef struct VkShaderDescriptorSetAndBindingMappingInfoEXT {
    VkStructureType                               sType;
    const void*                                   pNext;
    uint32_t                                      mappingCount;
    const VkDescriptorSetAndBindingMappingEXT*    pMappings;
} VkShaderDescriptorSetAndBindingMappingInfoEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`mappingCount` is the number of elements in `pMappings`.

* 
`pMappings` is a pointer to an array of
[VkDescriptorSetAndBindingMappingEXT](#VkDescriptorSetAndBindingMappingEXT) structures specifying mappings
for a set of descriptors

Including this structure in the `pNext` chain of
[VkPipelineShaderStageCreateInfo](pipelines.html#VkPipelineShaderStageCreateInfo) will set mappings for the shader
defined by that structure.
Similarly, including this structure in the `pNext` chain of a
[VkShaderCreateInfoEXT](shaders.html#VkShaderCreateInfoEXT) with a `codeType` of
[VK_SHADER_CODE_TYPE_SPIRV_EXT](shaders.html#VkShaderCodeTypeEXT), will set mappings for that shader.

If this structure is not present, it is equivalent to setting
`mappingCount` to 0.

Valid Usage

* 
[](#VUID-VkShaderDescriptorSetAndBindingMappingInfoEXT-pMappings-11244) VUID-VkShaderDescriptorSetAndBindingMappingInfoEXT-pMappings-11244

Any two elements of `pMappings` **must** not have the same value of
`descriptorSet`, an overlapping range specified by
`firstBinding` and `bindingCount`, and any overlapping bits in
`resourceMask`

Valid Usage (Implicit)

* 
[](#VUID-VkShaderDescriptorSetAndBindingMappingInfoEXT-sType-sType) VUID-VkShaderDescriptorSetAndBindingMappingInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SHADER_DESCRIPTOR_SET_AND_BINDING_MAPPING_INFO_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkShaderDescriptorSetAndBindingMappingInfoEXT-pMappings-parameter) VUID-VkShaderDescriptorSetAndBindingMappingInfoEXT-pMappings-parameter

 If `mappingCount` is not `0`, `pMappings` **must** be a valid pointer to an array of `mappingCount` valid [VkDescriptorSetAndBindingMappingEXT](#VkDescriptorSetAndBindingMappingEXT) structures

Structure Chaining

[Extends the structures](fundamentals.html#fundamentals-validusage-pNext)

* 
[VkPipelineShaderStageCreateInfo](pipelines.html#VkPipelineShaderStageCreateInfo)

* 
[VkShaderCreateInfoEXT](shaders.html#VkShaderCreateInfoEXT)

The `VkDescriptorSetAndBindingMappingEXT` structure is defined as:

// Provided by VK_EXT_descriptor_heap
typedef struct VkDescriptorSetAndBindingMappingEXT {
    VkStructureType                     sType;
    const void*                         pNext;
    uint32_t                            descriptorSet;
    uint32_t                            firstBinding;
    uint32_t                            bindingCount;
    VkSpirvResourceTypeFlagsEXT         resourceMask;
    VkDescriptorMappingSourceEXT        source;
    VkDescriptorMappingSourceDataEXT    sourceData;
} VkDescriptorSetAndBindingMappingEXT;

* 
`sType` is a [VkStructureType](fundamentals.html#VkStructureType) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`descriptorSet` is the value of `DescriptorSet` for resources
that this mapping affects.

* 
`firstBinding` is the first value of `Binding` of resources that
this mapping affects.

* 
`bindingCount` is the number of consecutive `Binding` values of
resources that this mapping affects.

* 
`resourceMask` is a mask of [VkSpirvResourceTypeFlagBitsEXT](#VkSpirvResourceTypeFlagBitsEXT)
values indicating which resource types are specified by this mapping.

* 
`source` is a [VkDescriptorMappingSourceEXT](#VkDescriptorMappingSourceEXT) value specifying
the method of mapping specified for the affected resources.

* 
`sourceData` is a [VkDescriptorMappingSourceDataEXT](#VkDescriptorMappingSourceDataEXT) that
provides the details of how each mapping is specified according to
`source`.

Resources specified in a shader with a `DescriptorSet` decoration set to
`descriptorSet`, a `Binding` decoration greater than or equal to
`firstBinding` and less than the sum of `firstBinding` and
`bindingCount`, and a resource type matching one of the bits in
`resourceMask` will be mapped according to `source` and
`sourceData`.

|  | Applications are free to overspecify bindings that are not present; allowing
| --- | --- |
reuse of the same mapping structures with multiple shaders, even when those
shaders only partially reuse those mappings.
This includes things like setting binding counts higher than the number used
in the shader, specifying bindings that are not present in the shader, and
setting `resourceMask` to all possible resources that may be
encountered. |

If `source` selects an element of `sourceData` defined by a
structure, the description of that structure defines how resources are
mapped.
Source mappings using a single base type are defined here.

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_CONSTANT_OFFSET_EXT](#VkDescriptorMappingSourceEXT), the
resource will be backed by heap data as specified by
[`constantOffset`](#VkDescriptorMappingSourceConstantOffsetEXT).

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](#VkDescriptorMappingSourceEXT), the resource
will be backed by heap data as specified by
[`pushIndex`](#VkDescriptorMappingSourcePushIndexEXT).

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](#VkDescriptorMappingSourceEXT), the
resource will be backed by heap data as specified by
[`indirectIndex`](#VkDescriptorMappingSourceIndirectIndexEXT).

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](#VkDescriptorMappingSourceEXT), the
resource will be backed by heap data as specified by
[`indirectIndexArray`](#VkDescriptorMappingSourceIndirectIndexEXT).

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_RESOURCE_HEAP_DATA_EXT](#VkDescriptorMappingSourceEXT), the resource will
be backed by heap data as specified by
[`heapData`](#VkDescriptorMappingSourceHeapDataEXT).

If `source` is [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_DATA_EXT](#VkDescriptorMappingSourceEXT), the
resource will be backed by push data at a range from `pushDataOffset` to
the size of the resource, allowing a uniform buffer to be backed by push
data access push data.
Accessing data in the uniform buffer at an offset of shaderOffset in
the shader will access push data at an offset equal to

offset = shaderOffset +  pushDataOffset.

If `source` is [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](#VkDescriptorMappingSourceEXT), the
resource will be backed by data pointed to by a device address in push data
at an offset of `pushAddressOffset`.
Accessing data via the mapped resource in the shader will access data
backing the address specified in push data:

address =
((VkDeviceAddress*)pPushData)[pushAddressOffset/8]

where pPushData is the total set of push data specified by
[vkCmdPushDataEXT](#vkCmdPushDataEXT).
If the shader resource is an acceleration structure, the address **must** be a
valid acceleration structure address.

If `source` is [VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](#VkDescriptorMappingSourceEXT),
the resource will be backed by heap data as specified by
[`indirectAddress`](#VkDescriptorMappingSourceIndirectAddressEXT).

|  | Accesses to resources using mappings to anything that is not a descriptor in
| --- | --- |
a heap are not subject to robustness guarantees; resources for such mappings
must not be accessed out of bounds. |

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](#VkDescriptorMappingSourceEXT), the
resource will be backed by heap data as specified by
[`shaderRecordIndex`](#VkDescriptorMappingSourceShaderRecordIndexEXT).

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_DATA_EXT](#VkDescriptorMappingSourceEXT), the resource will
be backed by shader record data at a range from `shaderRecordDataOffset`
to the size of the resource, allowing a uniform buffer to be used as a way
to access shader record data.
Accessing data in the uniform buffer at an offset shaderOffset in the
shader will access shader record data at an offset equal to

offset = shaderOffset +  shaderRecordDataOffset.

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](#VkDescriptorMappingSourceEXT), the resource
will be backed by data pointed to by a device address in the shader record
at `shaderRecordAddressOffset`.
Accessing data via the mapped resource in the shader will access data
backing the address specified in shader record data:

address =
((VkDeviceAddress*)pShaderRecordData)[shaderRecordAddressOffset/8]

where pShaderRecord is the memory associated with a given shader as
its shader record.
If the shader resource is an acceleration structure, the address **must** be a
valid acceleration structure address.

|  | Accesses to resources using
| --- | --- |
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](#VkDescriptorMappingSourceEXT) mappings are
not subject to robustness guarantees; data must not be accessed outside of
the allocated memory range. |

Mappings must be declared for all variables with a `DescriptorSet` and
`Binding` in the [shader resource interface](interfaces.html#interfaces-resources).

Valid Usage

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-source-11245) VUID-VkDescriptorSetAndBindingMappingEXT-source-11245

If `source` is [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_DATA_EXT](#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](#VkDescriptorMappingSourceEXT), or
[VK_DESCRIPTOR_MAPPING_SOURCE_RESOURCE_HEAP_DATA_EXT](#VkDescriptorMappingSourceEXT),
`bindingCount` **must** be 1

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-source-11246) VUID-VkDescriptorSetAndBindingMappingEXT-source-11246

If `source` is [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_DATA_EXT](#VkDescriptorMappingSourceEXT),
`sourceData.pushDataOffset` **must** be a multiple of 4

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-source-11247) VUID-VkDescriptorSetAndBindingMappingEXT-source-11247

If `source` is [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](#VkDescriptorMappingSourceEXT),
`sourceData.pushAddressOffset` **must** be a multiple of 8

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-source-11248) VUID-VkDescriptorSetAndBindingMappingEXT-source-11248

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_DATA_EXT](#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](#VkDescriptorMappingSourceEXT),
`bindingCount` **must** be 1

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-source-11249) VUID-VkDescriptorSetAndBindingMappingEXT-source-11249

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_DATA_EXT](#VkDescriptorMappingSourceEXT),
`sourceData.shaderRecordDataOffset` **must** be a multiple of 4

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-source-11250) VUID-VkDescriptorSetAndBindingMappingEXT-source-11250

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](#VkDescriptorMappingSourceEXT),
`sourceData.shaderRecordAddressOffset` **must** be a multiple of 8

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-source-11251) VUID-VkDescriptorSetAndBindingMappingEXT-source-11251

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_CONSTANT_OFFSET_EXT](#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](#VkDescriptorMappingSourceEXT),
and `descriptorSet`, `firstBinding`, and `bindingCount`
identify any `OpTypeImage` variables, any `heapOffset`, and
`heapArrayStride` members of the corresponding member of
`sourceData` **must** be 0 or a multiple of
[`imageDescriptorAlignment`](limits.html#limits-imageDescriptorAlignment)

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-source-11252) VUID-VkDescriptorSetAndBindingMappingEXT-source-11252

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_CONSTANT_OFFSET_EXT](#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](#VkDescriptorMappingSourceEXT),
and `descriptorSet`, `firstBinding`, and `bindingCount`
identify any `OpTypeStruct` variables, any `heapOffset`, and
`heapArrayStride` members of the corresponding member of
`sourceData` **must** be 0 or a multiple of
[`bufferDescriptorAlignment`](limits.html#limits-bufferDescriptorAlignment)

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-source-11253) VUID-VkDescriptorSetAndBindingMappingEXT-source-11253

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_CONSTANT_OFFSET_EXT](#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](#VkDescriptorMappingSourceEXT),
and `descriptorSet`, `firstBinding`, and `bindingCount`
identify any `OpTypeSampler` variables, any `heapOffset` and
`heapArrayStride` members of the corresponding member of
`sourceData` **must** be 0 or a multiple of
[`samplerDescriptorAlignment`](limits.html#limits-samplerDescriptorAlignment)

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-source-11254) VUID-VkDescriptorSetAndBindingMappingEXT-source-11254

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_CONSTANT_OFFSET_EXT](#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](#VkDescriptorMappingSourceEXT),
and `descriptorSet`, `firstBinding`, and `bindingCount`
identify any `OpTypeSampledImage` variables, any
`samplerHeapOffset` and `samplerHeapArrayStride` members of the
corresponding member of `sourceData` **must** be 0 or a multiple of
[`samplerDescriptorAlignment`](limits.html#limits-samplerDescriptorAlignment)

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-source-11356) VUID-VkDescriptorSetAndBindingMappingEXT-source-11356

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_RESOURCE_HEAP_DATA_EXT](#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_DATA_EXT](#VkDescriptorMappingSourceEXT),
or [VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_DATA_EXT](#VkDescriptorMappingSourceEXT), `resourceMask`
**must** include [VK_SPIRV_RESOURCE_TYPE_UNIFORM_BUFFER_BIT_EXT](#VkSpirvResourceTypeFlagBitsEXT)

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-source-11357) VUID-VkDescriptorSetAndBindingMappingEXT-source-11357

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](#VkDescriptorMappingSourceEXT) or
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](#VkDescriptorMappingSourceEXT), `resourceMask`
**must** include at least one of
[VK_SPIRV_RESOURCE_TYPE_UNIFORM_BUFFER_BIT_EXT](#VkSpirvResourceTypeFlagBitsEXT),
[VK_SPIRV_RESOURCE_TYPE_READ_ONLY_STORAGE_BUFFER_BIT_EXT](#VkSpirvResourceTypeFlagBitsEXT),
[VK_SPIRV_RESOURCE_TYPE_READ_WRITE_STORAGE_BUFFER_BIT_EXT](#VkSpirvResourceTypeFlagBitsEXT), or
[VK_SPIRV_RESOURCE_TYPE_ACCELERATION_STRUCTURE_BIT_EXT](#VkSpirvResourceTypeFlagBitsEXT)

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-source-11358) VUID-VkDescriptorSetAndBindingMappingEXT-source-11358

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](#VkDescriptorMappingSourceEXT), or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](#VkDescriptorMappingSourceEXT),
and the mapping sets `useCombinedImageSamplerIndex` to
[VK_TRUE](fundamentals.html#VK_TRUE), `resourceMask` **must** include at least one of
[VK_SPIRV_RESOURCE_TYPE_COMBINED_SAMPLED_IMAGE_BIT_EXT](#VkSpirvResourceTypeFlagBitsEXT),
[VK_SPIRV_RESOURCE_TYPE_SAMPLED_IMAGE_BIT_EXT](#VkSpirvResourceTypeFlagBitsEXT), or
[VK_SPIRV_RESOURCE_TYPE_SAMPLER_BIT_EXT](#VkSpirvResourceTypeFlagBitsEXT)

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-source-11389) VUID-VkDescriptorSetAndBindingMappingEXT-source-11389

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_CONSTANT_OFFSET_EXT](#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](#VkDescriptorMappingSourceEXT), or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](#VkDescriptorMappingSourceEXT),
and `bindingCount` is not `1`, the `pEmbeddedSampler` member of
the corresponding mapping structure **must** be `NULL`

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-source-11390) VUID-VkDescriptorSetAndBindingMappingEXT-source-11390

If `source` is
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_CONSTANT_OFFSET_EXT](#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](#VkDescriptorMappingSourceEXT),
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](#VkDescriptorMappingSourceEXT), or
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](#VkDescriptorMappingSourceEXT),
and `descriptorSet`, `firstBinding`, and `bindingCount`
identify any `OpTypeTensorARM` variables, the `heapOffset`, and
`heapArrayStride` members of the corresponding member of
`sourceData` **must** be 0 or a multiple of
[`tensorDescriptorAlignment`](limits.html#limits-tensorDescriptorAlignment)

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-sType-sType) VUID-VkDescriptorSetAndBindingMappingEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_DESCRIPTOR_SET_AND_BINDING_MAPPING_EXT](fundamentals.html#VkStructureType)

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-pNext-pNext) VUID-VkDescriptorSetAndBindingMappingEXT-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkPushConstantBankInfoNV](#VkPushConstantBankInfoNV)

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-sType-unique) VUID-VkDescriptorSetAndBindingMappingEXT-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-resourceMask-parameter) VUID-VkDescriptorSetAndBindingMappingEXT-resourceMask-parameter

 `resourceMask` **must** be a valid combination of [VkSpirvResourceTypeFlagBitsEXT](#VkSpirvResourceTypeFlagBitsEXT) values

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-resourceMask-requiredbitmask) VUID-VkDescriptorSetAndBindingMappingEXT-resourceMask-requiredbitmask

 `resourceMask` **must** not be `0`

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-source-parameter) VUID-VkDescriptorSetAndBindingMappingEXT-source-parameter

 `source` **must** be a valid [VkDescriptorMappingSourceEXT](#VkDescriptorMappingSourceEXT) value

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-constantOffset-parameter) VUID-VkDescriptorSetAndBindingMappingEXT-constantOffset-parameter

 If `source` is [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_CONSTANT_OFFSET_EXT](#VkDescriptorMappingSourceEXT), the `constantOffset` member of `sourceData` **must** be a valid [VkDescriptorMappingSourceConstantOffsetEXT](#VkDescriptorMappingSourceConstantOffsetEXT) structure

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-pushIndex-parameter) VUID-VkDescriptorSetAndBindingMappingEXT-pushIndex-parameter

 If `source` is [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](#VkDescriptorMappingSourceEXT), the `pushIndex` member of `sourceData` **must** be a valid [VkDescriptorMappingSourcePushIndexEXT](#VkDescriptorMappingSourcePushIndexEXT) structure

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-indirectIndex-parameter) VUID-VkDescriptorSetAndBindingMappingEXT-indirectIndex-parameter

 If `source` is [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](#VkDescriptorMappingSourceEXT), the `indirectIndex` member of `sourceData` **must** be a valid [VkDescriptorMappingSourceIndirectIndexEXT](#VkDescriptorMappingSourceIndirectIndexEXT) structure

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-indirectIndexArray-parameter) VUID-VkDescriptorSetAndBindingMappingEXT-indirectIndexArray-parameter

 If `source` is [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](#VkDescriptorMappingSourceEXT), the `indirectIndexArray` member of `sourceData` **must** be a valid [VkDescriptorMappingSourceIndirectIndexArrayEXT](#VkDescriptorMappingSourceIndirectIndexArrayEXT) structure

* 
[](#VUID-VkDescriptorSetAndBindingMappingEXT-shaderRecordIndex-parameter) VUID-VkDescriptorSetAndBindingMappingEXT-shaderRecordIndex-parameter

 If `source` is [VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](#VkDescriptorMappingSourceEXT), the `shaderRecordIndex` member of `sourceData` **must** be a valid [VkDescriptorMappingSourceShaderRecordIndexEXT](#VkDescriptorMappingSourceShaderRecordIndexEXT) structure

Bits which **can** be set in
[VkDescriptorSetAndBindingMappingEXT](#VkDescriptorSetAndBindingMappingEXT)::`resourceMask`, are:

// Provided by VK_EXT_descriptor_heap
typedef enum VkSpirvResourceTypeFlagBitsEXT {
    VK_SPIRV_RESOURCE_TYPE_ALL_EXT = 0x7FFFFFFF,
    VK_SPIRV_RESOURCE_TYPE_SAMPLER_BIT_EXT = 0x00000001,
    VK_SPIRV_RESOURCE_TYPE_SAMPLED_IMAGE_BIT_EXT = 0x00000002,
    VK_SPIRV_RESOURCE_TYPE_READ_ONLY_IMAGE_BIT_EXT = 0x00000004,
    VK_SPIRV_RESOURCE_TYPE_READ_WRITE_IMAGE_BIT_EXT = 0x00000008,
    VK_SPIRV_RESOURCE_TYPE_COMBINED_SAMPLED_IMAGE_BIT_EXT = 0x00000010,
    VK_SPIRV_RESOURCE_TYPE_UNIFORM_BUFFER_BIT_EXT = 0x00000020,
    VK_SPIRV_RESOURCE_TYPE_READ_ONLY_STORAGE_BUFFER_BIT_EXT = 0x00000040,
    VK_SPIRV_RESOURCE_TYPE_READ_WRITE_STORAGE_BUFFER_BIT_EXT = 0x00000080,
  // Provided by VK_EXT_descriptor_heap with VK_KHR_ray_tracing_pipeline or VK_NV_ray_tracing
    VK_SPIRV_RESOURCE_TYPE_ACCELERATION_STRUCTURE_BIT_EXT = 0x00000100,
  // Provided by VK_EXT_descriptor_heap with VK_ARM_tensors
    VK_SPIRV_RESOURCE_TYPE_TENSOR_BIT_ARM = 0x00000200,
} VkSpirvResourceTypeFlagBitsEXT;

* 
[VK_SPIRV_RESOURCE_TYPE_ALL_EXT](#VkSpirvResourceTypeFlagBitsEXT) specifies that all resource
declarations are included.

* 
[VK_SPIRV_RESOURCE_TYPE_SAMPLER_BIT_EXT](#VkSpirvResourceTypeFlagBitsEXT) specifies
`OpTypeSampler` variables.

* 
[VK_SPIRV_RESOURCE_TYPE_SAMPLED_IMAGE_BIT_EXT](#VkSpirvResourceTypeFlagBitsEXT) specifies
`OpTypeImage` variables with a `Sampled` parameter of 1.

* 
[VK_SPIRV_RESOURCE_TYPE_READ_ONLY_IMAGE_BIT_EXT](#VkSpirvResourceTypeFlagBitsEXT) specifies
`OpTypeImage` variables with a `Sampled` parameter of 2 and
decorated with `NonWritable`.

* 
[VK_SPIRV_RESOURCE_TYPE_READ_WRITE_IMAGE_BIT_EXT](#VkSpirvResourceTypeFlagBitsEXT) specifies
`OpTypeImage` variables with a `Sampled` parameter of 2 and not
decorated with `NonWritable`.

* 
[VK_SPIRV_RESOURCE_TYPE_COMBINED_SAMPLED_IMAGE_BIT_EXT](#VkSpirvResourceTypeFlagBitsEXT) specifies
`OpTypeSampledImage` variables.

* 
[VK_SPIRV_RESOURCE_TYPE_UNIFORM_BUFFER_BIT_EXT](#VkSpirvResourceTypeFlagBitsEXT) specifies
`OpTypeStruct` variables in the `Uniform` storage class decorated
with `Block`

* 
[VK_SPIRV_RESOURCE_TYPE_READ_ONLY_STORAGE_BUFFER_BIT_EXT](#VkSpirvResourceTypeFlagBitsEXT) specifies
`OpTypeStruct` variables either in the `StorageBuffer` storage
class decorated with `Block` or in the `Uniform` storage class
decorated with `BufferBlock`, and decorated with `NonWritable`

* 
[VK_SPIRV_RESOURCE_TYPE_READ_WRITE_STORAGE_BUFFER_BIT_EXT](#VkSpirvResourceTypeFlagBitsEXT) specifies
`OpTypeStruct` variables either in the `StorageBuffer` storage
class decorated with `Block` or in the `Uniform` storage class
decorated with `BufferBlock`, but not decorated with `NonWritable`

* 
[VK_SPIRV_RESOURCE_TYPE_ACCELERATION_STRUCTURE_BIT_EXT](#VkSpirvResourceTypeFlagBitsEXT) specifies
`OpTypeAccelerationStructureKHR` variables

* 
[VK_SPIRV_RESOURCE_TYPE_TENSOR_BIT_ARM](#VkSpirvResourceTypeFlagBitsEXT) specifies
`OpTypeTensorARM` variables

// Provided by VK_EXT_descriptor_heap
typedef VkFlags VkSpirvResourceTypeFlagsEXT;

`VkSpirvResourceTypeFlagsEXT` is a bitmask type for setting a mask of
zero or more [VkSpirvResourceTypeFlagBitsEXT](#VkSpirvResourceTypeFlagBitsEXT).

The possible mapping sources for a shader binding are:

// Provided by VK_EXT_descriptor_heap
typedef enum VkDescriptorMappingSourceEXT {
    VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_CONSTANT_OFFSET_EXT = 0,
    VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT = 1,
    VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT = 2,
    VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT = 3,
    VK_DESCRIPTOR_MAPPING_SOURCE_RESOURCE_HEAP_DATA_EXT = 4,
    VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_DATA_EXT = 5,
    VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT = 6,
    VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT = 7,
  // Provided by VK_EXT_descriptor_heap with VK_KHR_ray_tracing_pipeline or VK_NV_ray_tracing
    VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT = 8,
  // Provided by VK_EXT_descriptor_heap with VK_KHR_ray_tracing_pipeline or VK_NV_ray_tracing
    VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_DATA_EXT = 9,
  // Provided by VK_EXT_descriptor_heap with VK_KHR_ray_tracing_pipeline or VK_NV_ray_tracing
    VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT = 10,
} VkDescriptorMappingSourceEXT;

* 
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_CONSTANT_OFFSET_EXT](#VkDescriptorMappingSourceEXT)
specifies that the resource will be backed by a descriptor from the heap
at a constant index.

* 
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_PUSH_INDEX_EXT](#VkDescriptorMappingSourceEXT) specifies
that the resource will be backed by a descriptor from the heap at an
index sourced from push data, added to a constant index.

* 
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_EXT](#VkDescriptorMappingSourceEXT)
specifies that the resource will be backed by a descriptor from the heap
at an index sourced from an address in push data, added to a constant
index.
If the mapping is an array, the array will be mapped to a base offset in
indirect memory, and subsequent elements are mapped as offsets to that
base.

* 
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_INDIRECT_INDEX_ARRAY_EXT](#VkDescriptorMappingSourceEXT)
specifies that the resource will be backed by a descriptor from the heap
at an index sourced from an address in push data, added to a constant
index.
If the mapping is an array, each array element will be mapped to a
separate index in indirect memory.

* 
[VK_DESCRIPTOR_MAPPING_SOURCE_RESOURCE_HEAP_DATA_EXT](#VkDescriptorMappingSourceEXT) specifies that
the resource will be backed by heap data directly.

* 
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_DATA_EXT](#VkDescriptorMappingSourceEXT) specifies that the
resource will be backed by push data directly.

* 
[VK_DESCRIPTOR_MAPPING_SOURCE_PUSH_ADDRESS_EXT](#VkDescriptorMappingSourceEXT) specifies that the
resource will be backed by an address in push data.

* 
[VK_DESCRIPTOR_MAPPING_SOURCE_INDIRECT_ADDRESS_EXT](#VkDescriptorMappingSourceEXT) specifies that
the resource will be backed by an address sourced via another address in
push data.

* 
[VK_DESCRIPTOR_MAPPING_SOURCE_HEAP_WITH_SHADER_RECORD_INDEX_EXT](#VkDescriptorMappingSourceEXT)
specifies that the resource will be backed by a descriptor from the heap
at an index sourced from shader record data, added to a constant index.

* 
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_DATA_EXT](#VkDescriptorMappingSourceEXT) specifies that
the resource will be backed by shader record data directly.

* 
[VK_DESCRIPTOR_MAPPING_SOURCE_SHADER_RECORD_ADDRESS_EXT](#VkDescriptorMappingSourceEXT) specifies
that the resource will be backed by an address in shader record data.

The `VkDescriptorMappingSourceDataEXT` union is defined as:

// Provided by VK_EXT_descriptor_heap
typedef union VkDescriptorMappingSourceDataEXT {
    VkDescriptorMappingSourceConstantOffsetEXT        constantOffset;
    VkDescriptorMappingSourcePushIndexEXT             pushIndex;
    VkDescriptorMappingSourceIndirectIndexEXT         indirectIndex;
    VkDescriptorMappingSourceIndirectIndexArrayEXT    indirectIndexArray;
    VkDescriptorMappingSourceHeapDataEXT              heapData;
    uint32_t                                          pushDataOffset;
    uint32_t                                          pushAddressOffset;
    VkDescriptorMappingSourceIndirectAddressEXT       indirectAddress;
    VkDescriptorMappingSourceShaderRecordIndexEXT     shaderRecordIndex;
    uint32_t                                          shaderRecordDataOffset;
    uint32_t                                          shaderRecordAddressOffset;
} VkDescriptorMappingSourceDataEXT;

* 
`constantOffset` is a
[VkDescriptorMappingSourceConstantOffsetEXT](#VkDescriptorMappingSourceConstantOffsetEXT) structure specifying
the mapping for resources at a constant byte offset into a heap.

* 
`pushIndex` is a [VkDescriptorMappingSourcePushIndexEXT](#VkDescriptorMappingSourcePushIndexEXT)
structure specifying the mapping for resources at an index into a heap
source from push data.

* 
`indirectIndex` is a [VkDescriptorMappingSourceIndirectIndexEXT](#VkDescriptorMappingSourceIndirectIndexEXT)
structure specifying the mapping for resources at an index into a heap
source from an address in push data.

* 
`indirectIndexArray` is a
[VkDescriptorMappingSourceIndirectIndexArrayEXT](#VkDescriptorMappingSourceIndirectIndexArrayEXT) structure
specifying the mapping for resources to an array of indices into a heap
source from an address in push data.

* 
`heapData` is a [VkDescriptorMappingSourceHeapDataEXT](#VkDescriptorMappingSourceHeapDataEXT) structure
specifying an offset into heap data for a uniform buffer to map to.

* 
`pushDataOffset` an offset into push data for a uniform buffer to
map to.

* 
`pushAddressOffset` an offset into push data storing an address for
a resource to map to.

* 
`indirectAddress` is a
[VkDescriptorMappingSourceIndirectAddressEXT](#VkDescriptorMappingSourceIndirectAddressEXT) structure specifying
an address in push data containing another address for a resource to map
to.

* 
`shaderRecordIndex` is a
[VkDescriptorMappingSourceShaderRecordIndexEXT](#VkDescriptorMappingSourceShaderRecordIndexEXT) structure specifying
the mapping for resources at an index into a heap source from shader
record data.

* 
`shaderRecordDataOffset` an offset into shader record data for a
uniform buffer to map to.

* 
`shaderRecordAddressOffset` an offset into shader record data
storing an address for a resource to map to.

The `VkDescriptorMappingSourceConstantOffsetEXT` structure is defined
as:

// Provided by VK_EXT_descriptor_heap
typedef struct VkDescriptorMappingSourceConstantOffsetEXT {
    uint32_t                      heapOffset;
    uint32_t                      heapArrayStride;
    const VkSamplerCreateInfo*    pEmbeddedSampler;
    uint32_t                      samplerHeapOffset;
    uint32_t                      samplerHeapArrayStride;
} VkDescriptorMappingSourceConstantOffsetEXT;

* 
`heapOffset` is a constant byte offset added to the heap address for
the mapped resource or sampler.

* 
`heapArrayStride` is a constant byte stride that multiplies the
shader binding and array index.

* 
`pEmbeddedSampler` is an optional [VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo)
structure specifying a sampler to embed into the shader, in place of
looking the sampler up in a heap.

* 
`samplerHeapOffset` is used only when mapping a combined image
sampler, used in place of `heapOffset` to retrieve the sampler.

* 
`samplerHeapArrayStride` is used only when mapping a combined image
sampler, used in place of `heapArrayStride` to retrieve the sampler.

Resources using this mapping will be backed by a descriptor in the heap, at
an offset calculated as

shaderIndex = (Binding - `firstBinding`) + 
arrayIndex

offset = heapOffset +  (shaderIndex * heapArrayStride)

where Binding is the binding value in the shader, arrayIndex is
the index into the array if the shader binding is declared as an array.

If the mapped resource is a `OpTypeSampledImage`, offset is instead
calculated for the sampler as

offset = samplerHeapOffset +  (shaderIndex *
samplerHeapArrayStride)

If the mapped resource is a `OpTypeSampler` or `OpTypeSampledImage`,
and `pEmbeddedSampler` is not `NULL`, the specified embedded sampler
will be used rather than accessing the sampler heap.

Valid Usage

* 
[](#VUID-VkDescriptorMappingSourceConstantOffsetEXT-pEmbeddedSampler-11445) VUID-VkDescriptorMappingSourceConstantOffsetEXT-pEmbeddedSampler-11445

If `pEmbeddedSampler` is a valid pointer to a
[VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo), its `borderColor` **must** not be
[VK_BORDER_COLOR_FLOAT_CUSTOM_EXT](samplers.html#VkBorderColor) or
[VK_BORDER_COLOR_INT_CUSTOM_EXT](samplers.html#VkBorderColor)

* 
[](#VUID-VkDescriptorMappingSourceConstantOffsetEXT-pEmbeddedSampler-11415) VUID-VkDescriptorMappingSourceConstantOffsetEXT-pEmbeddedSampler-11415

If `pEmbeddedSampler` is a valid pointer to a
[VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo), and there is a
[VkDebugUtilsObjectNameInfoEXT](debugging.html#VkDebugUtilsObjectNameInfoEXT) structure in its `pNext` chain,
its `objectType` **must** be [VK_OBJECT_TYPE_UNKNOWN](debugging.html#VkObjectType)

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorMappingSourceConstantOffsetEXT-pEmbeddedSampler-parameter) VUID-VkDescriptorMappingSourceConstantOffsetEXT-pEmbeddedSampler-parameter

 If `pEmbeddedSampler` is not `NULL`, `pEmbeddedSampler` **must** be a valid pointer to a valid [VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo) structure

The `VkDescriptorMappingSourcePushIndexEXT` structure is defined as:

// Provided by VK_EXT_descriptor_heap
typedef struct VkDescriptorMappingSourcePushIndexEXT {
    uint32_t                      heapOffset;
    uint32_t                      pushOffset;
    uint32_t                      heapIndexStride;
    uint32_t                      heapArrayStride;
    const VkSamplerCreateInfo*    pEmbeddedSampler;
    VkBool32                      useCombinedImageSamplerIndex;
    uint32_t                      samplerHeapOffset;
    uint32_t                      samplerPushOffset;
    uint32_t                      samplerHeapIndexStride;
    uint32_t                      samplerHeapArrayStride;
} VkDescriptorMappingSourcePushIndexEXT;

* 
`heapOffset` is a constant byte offset added to the heap address for
the mapped resource or sampler.

* 
`pushOffset` is an index into push data where an index into the heap
for the mapped resource will be retrieved.

* 
`heapIndexStride` is a constant byte stride that multiplies the
index in push data.

* 
`heapArrayStride` is a constant byte stride that multiplies the
shader binding and array index.

* 
`pEmbeddedSampler` is an optional [VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo)
structure specifying a sampler to embed into the shader, in place of
looking the sampler up in a heap.

* 
`useCombinedImageSamplerIndex` specifies whether the generated index
value will be decoded as two packed indices if the mapped resource is an
`OpTypeSampledImage`.

* 
`samplerHeapOffset` is used only when mapping a combined image
sampler, used in place of `heapOffset` to retrieve the sampler.

* 
`samplerPushOffset` is used only when mapping a combined image
sampler, used in place of `pushOffset` to retrieve the sampler.

* 
`samplerHeapIndexStride` is used only when mapping a combined image
sampler, used in place of `heapIndexStride` to retrieve the sampler.

* 
`samplerHeapArrayStride` is used only when mapping a combined image
sampler, used in place of `heapArrayStride` to retrieve the sampler.

Resources using this mapping will be backed by a descriptor in the heap, at
an offset calculated as

pushIndex = ((uint32_t*)pPushData)[pushOffset/4]

shaderIndex = (Binding - firstBinding) +  arrayIndex

offset = heapOffset +  (pushIndex ×
heapIndexStride) +  (shaderIndex × heapArrayStride)

where Binding is the binding value in the shader, arrayIndex is
the index into the array if the shader binding is declared as an array, and
pPushData is the total set of push data specified by
[vkCmdPushDataEXT](#vkCmdPushDataEXT).

If the mapped resource is a `OpTypeSampledImage`, offset is instead
calculated for the sampler as

samplerPushIndex =
((uint32_t*)pPushData)[samplerPushOffset/4]

offset = samplerHeapOffset +  (samplerPushIndex ×
samplerHeapIndexStride) +  (shaderIndex ×
samplerHeapArrayStride)

If `useCombinedImageSamplerIndex` is [VK_TRUE](fundamentals.html#VK_TRUE), and the mapped
resource is a `OpTypeSampledImage`, pushIndex and
samplerPushIndex in the above equations are instead calculated as

pushIndex = ((uint32_t*)pPushData)[pushOffset/4] & 0xFFFFF

samplerPushIndex = (((uint32_t*)pPushData)[pushOffset/4] >>
20) & 0xFFF

If the mapped resource is a `OpTypeSampler` or `OpTypeSampledImage`,
and `pEmbeddedSampler` is not `NULL`, the specified embedded sampler
will be used rather than accessing the sampler heap.

Valid Usage

* 
[](#VUID-VkDescriptorMappingSourcePushIndexEXT-pushOffset-11258) VUID-VkDescriptorMappingSourcePushIndexEXT-pushOffset-11258

`pushOffset` **must** be a multiple of 4

* 
[](#VUID-VkDescriptorMappingSourcePushIndexEXT-pushOffset-11259) VUID-VkDescriptorMappingSourcePushIndexEXT-pushOffset-11259

`pushOffset` **must** be less than or equal to
`maxPushDataSize` - 4

* 
[](#VUID-VkDescriptorMappingSourcePushIndexEXT-pEmbeddedSampler-11446) VUID-VkDescriptorMappingSourcePushIndexEXT-pEmbeddedSampler-11446

If `pEmbeddedSampler` is a valid pointer to a
[VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo), its `borderColor` **must** not be
[VK_BORDER_COLOR_FLOAT_CUSTOM_EXT](samplers.html#VkBorderColor) or
[VK_BORDER_COLOR_INT_CUSTOM_EXT](samplers.html#VkBorderColor)

* 
[](#VUID-VkDescriptorMappingSourcePushIndexEXT-pEmbeddedSampler-11402) VUID-VkDescriptorMappingSourcePushIndexEXT-pEmbeddedSampler-11402

If `pEmbeddedSampler` is a valid pointer to a
[VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo), and there is a
[VkDebugUtilsObjectNameInfoEXT](debugging.html#VkDebugUtilsObjectNameInfoEXT) structure in its `pNext` chain,
its `objectType` **must** be [VK_OBJECT_TYPE_UNKNOWN](debugging.html#VkObjectType)

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorMappingSourcePushIndexEXT-pEmbeddedSampler-parameter) VUID-VkDescriptorMappingSourcePushIndexEXT-pEmbeddedSampler-parameter

 If `pEmbeddedSampler` is not `NULL`, `pEmbeddedSampler` **must** be a valid pointer to a valid [VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo) structure

The `VkDescriptorMappingSourceIndirectIndexEXT` structure is defined as:

// Provided by VK_EXT_descriptor_heap
typedef struct VkDescriptorMappingSourceIndirectIndexEXT {
    uint32_t                      heapOffset;
    uint32_t                      pushOffset;
    uint32_t                      addressOffset;
    uint32_t                      heapIndexStride;
    uint32_t                      heapArrayStride;
    const VkSamplerCreateInfo*    pEmbeddedSampler;
    VkBool32                      useCombinedImageSamplerIndex;
    uint32_t                      samplerHeapOffset;
    uint32_t                      samplerPushOffset;
    uint32_t                      samplerAddressOffset;
    uint32_t                      samplerHeapIndexStride;
    uint32_t                      samplerHeapArrayStride;
} VkDescriptorMappingSourceIndirectIndexEXT;

* 
`heapOffset` is a constant byte offset added to the heap address for
the mapped resource or sampler.

* 
`pushOffset` is an offset into push data where an the indirect
address will be.

* 
`addressOffset` is an index into the address in push data where an
index into the heap for the mapped resource will be retrieved.

* 
`heapIndexStride` is a constant byte stride that multiplies the
index in indirect data.

* 
`heapArrayStride` is a constant byte stride that multiplies the
shader binding and array index.

* 
`pEmbeddedSampler` is an optional [VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo)
structure specifying a sampler to embed into the shader, in place of
looking the sampler up in a heap.

* 
`useCombinedImageSamplerIndex` specifies whether the generated index
value will be decoded as two packed indices if the mapped resource is an
`OpTypeSampledImage`.

* 
`samplerHeapOffset` is used only when mapping a combined image
sampler, used in place of `heapOffset` to retrieve the sampler.

* 
`samplerPushOffset` is used only when mapping a combined image
sampler, used in place of `pushOffset` to retrieve the sampler.

* 
`samplerAddressOffset` is used only when mapping a combined image
sampler, used in place of `addressOffset` to retrieve the sampler.

* 
`samplerHeapIndexStride` is used only when mapping a combined image
sampler, used in place of `heapIndexStride` to retrieve the sampler.

* 
`samplerHeapArrayStride` is used only when mapping a combined image
sampler, used in place of `heapArrayStride` to retrieve the sampler.

Resources using this mapping will be backed by a descriptor in the heap, at
an offset calculated as

uint32_t *indirectAddress =
((VkDeviceAddress*)pPushData)[pushOffset/8]

indirectIndex = indirectAddress[(addressOffset / 4)]

shaderIndex = (Binding - firstBinding) +  arrayIndex

offset = heapOffset +  (indirectIndex ×
heapIndexStride) +  (shaderIndex × heapArrayStride)

where Binding is the binding value in the shader, arrayIndex is
the index into the array if the shader binding is declared as an array, and
pPushData is the total set of push data specified by
[vkCmdPushDataEXT](#vkCmdPushDataEXT).
The value of the address in push data **must** be a multiple of 4.
Index reads through indirectAddress are performed as non-volatile
uniform buffer reads, and can be synchronized using
[VK_ACCESS_2_UNIFORM_READ_BIT](synchronization.html#VkAccessFlagBits2KHR).
The value in memory **must** remain static while any shader invocation using
this mapping is in flight to avoid a data race.

If the mapped resource is a `OpTypeSampledImage`, offset is instead
calculated for the sampler as

uint32_t *samplerIndirectAddress =
((VkDeviceAddress*)pPushData)[samplerPushOffset/8]

samplerIndirectIndex =
samplerIndirectAddress[(samplerAddressOffset / 4)]

offset = samplerHeapOffset +  (samplerIndirectIndex
× samplerHeapIndexStride) +  (shaderIndex ×
samplerHeapArrayStride)

If `useCombinedImageSamplerIndex` is [VK_TRUE](fundamentals.html#VK_TRUE), and the mapped
resource is a `OpTypeSampledImage`, indirectIndex and
samplerIndirectIndex in the above equations are instead calculated as

indirectIndex = indirectAddress[addressOffset/4] & 0xFFFFF

samplerIndirectIndex = indirectAddress[addressOffset/4] >>
20) & 0xFFF

If the mapped resource is a `OpTypeSampler` or `OpTypeSampledImage`,
and `pEmbeddedSampler` is not `NULL`, the specified embedded sampler
will be used rather than accessing the sampler heap.

Valid Usage

* 
[](#VUID-VkDescriptorMappingSourceIndirectIndexEXT-pushOffset-11260) VUID-VkDescriptorMappingSourceIndirectIndexEXT-pushOffset-11260

`pushOffset` **must** be a multiple of 8

* 
[](#VUID-VkDescriptorMappingSourceIndirectIndexEXT-pushOffset-11261) VUID-VkDescriptorMappingSourceIndirectIndexEXT-pushOffset-11261

`pushOffset` **must** be less than or equal to
`maxPushDataSize` - 8

* 
[](#VUID-VkDescriptorMappingSourceIndirectIndexEXT-addressOffset-11262) VUID-VkDescriptorMappingSourceIndirectIndexEXT-addressOffset-11262

`addressOffset` **must** be a multiple of 4

* 
[](#VUID-VkDescriptorMappingSourceIndirectIndexEXT-pEmbeddedSampler-11447) VUID-VkDescriptorMappingSourceIndirectIndexEXT-pEmbeddedSampler-11447

If `pEmbeddedSampler` is a valid pointer to a
[VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo), its `borderColor` **must** not be
[VK_BORDER_COLOR_FLOAT_CUSTOM_EXT](samplers.html#VkBorderColor) or
[VK_BORDER_COLOR_INT_CUSTOM_EXT](samplers.html#VkBorderColor)

* 
[](#VUID-VkDescriptorMappingSourceIndirectIndexEXT-pEmbeddedSampler-11403) VUID-VkDescriptorMappingSourceIndirectIndexEXT-pEmbeddedSampler-11403

If `pEmbeddedSampler` is a valid pointer to a
[VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo), and there is a
[VkDebugUtilsObjectNameInfoEXT](debugging.html#VkDebugUtilsObjectNameInfoEXT) structure in its `pNext` chain,
its `objectType` **must** be [VK_OBJECT_TYPE_UNKNOWN](debugging.html#VkObjectType)

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorMappingSourceIndirectIndexEXT-pEmbeddedSampler-parameter) VUID-VkDescriptorMappingSourceIndirectIndexEXT-pEmbeddedSampler-parameter

 If `pEmbeddedSampler` is not `NULL`, `pEmbeddedSampler` **must** be a valid pointer to a valid [VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo) structure

The `VkDescriptorMappingSourceIndirectIndexArrayEXT` structure is
defined as:

// Provided by VK_EXT_descriptor_heap
typedef struct VkDescriptorMappingSourceIndirectIndexArrayEXT {
    uint32_t                      heapOffset;
    uint32_t                      pushOffset;
    uint32_t                      addressOffset;
    uint32_t                      heapIndexStride;
    const VkSamplerCreateInfo*    pEmbeddedSampler;
    VkBool32                      useCombinedImageSamplerIndex;
    uint32_t                      samplerHeapOffset;
    uint32_t                      samplerPushOffset;
    uint32_t                      samplerAddressOffset;
    uint32_t                      samplerHeapIndexStride;
} VkDescriptorMappingSourceIndirectIndexArrayEXT;

* 
`heapOffset` is a constant byte offset added to the heap address for
the mapped resource or sampler.

* 
`pushOffset` is an offset into push data where an the indirect
address will be.

* 
`addressOffset` is an index into the address in push data where an
index into the heap for the mapped resource will be retrieved.

* 
`heapIndexStride` is a constant byte stride that multiplies the
index in indirect data.

* 
`pEmbeddedSampler` is an optional [VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo)
structure specifying a sampler to embed into the shader, in place of
looking the sampler up in a heap.

* 
`useCombinedImageSamplerIndex` specifies whether the generated index
value will be decoded as two packed indices if the mapped resource is an
`OpTypeSampledImage`.

* 
`samplerHeapOffset` is used only when mapping a combined image
sampler, used in place of `heapOffset` to retrieve the sampler.

* 
`samplerPushOffset` is used only when mapping a combined image
sampler, used in place of `pushOffset` to retrieve the sampler.

* 
`samplerAddressOffset` is used only when mapping a combined image
sampler, used in place of `addressOffset` to retrieve the sampler.

* 
`samplerHeapIndexStride` is used only when mapping a combined image
sampler, used in place of `heapIndexStride` to retrieve the sampler.

Resources using this mapping will be backed by a descriptor in the heap, at
an offset calculated as

uint32_t *indirectAddress =
((VkDeviceAddress*)pPushData)[pushOffset/8]

shaderIndex = (Binding - firstBinding) +  arrayIndex

indirectIndex = indirectAddress[(addressOffset / 4) + 
shaderIndex]

offset = heapOffset +  (indirectIndex ×
heapIndexStride)

where Binding is the binding value in the shader, arrayIndex is
the index into the array if the shader binding is declared as an array, and
pPushData is the total set of push data specified by
[vkCmdPushDataEXT](#vkCmdPushDataEXT).
The value of the address in push data **must** be a multiple of 4.
Index reads through indirectAddress are performed as non-volatile
uniform buffer reads, and can be synchronized using
[VK_ACCESS_2_UNIFORM_READ_BIT](synchronization.html#VkAccessFlagBits2KHR).
The value in memory **must** remain static while any shader invocation using
this mapping is in flight to avoid a data race.

If the mapped resource is a `OpTypeSampledImage`, offset is instead
calculated for the sampler as

uint32_t *samplerIndirectAddress =
((VkDeviceAddress*)pPushData)[samplerPushOffset/8]

samplerIndirectIndex = samplerAddr[(samplerAddressOffset /
4) +  shaderIndex]

offset = samplerHeapOffset +  (samplerIndirectIndex
× samplerHeapIndexStride)

If `useCombinedImageSamplerIndex` is [VK_TRUE](fundamentals.html#VK_TRUE), and the mapped
resource is a `OpTypeSampledImage`, indirectIndex and
samplerIndirectIndex in the above equations are instead calculated as

indirectIndex = indirectAddress[addressOffset/4 + 
shaderIndex] & 0xFFFFF

samplerIndirectIndex = indirectAddress[addressOffset/4
+  shaderIndex] >> 20) & 0xFFF

If the mapped resource is a `OpTypeSampler` or `OpTypeSampledImage`,
and `pEmbeddedSampler` is not `NULL`, the specified embedded sampler
will be used rather than accessing the sampler heap.

Valid Usage

* 
[](#VUID-VkDescriptorMappingSourceIndirectIndexArrayEXT-pushOffset-11359) VUID-VkDescriptorMappingSourceIndirectIndexArrayEXT-pushOffset-11359

`pushOffset` **must** be a multiple of 8

* 
[](#VUID-VkDescriptorMappingSourceIndirectIndexArrayEXT-pushOffset-11360) VUID-VkDescriptorMappingSourceIndirectIndexArrayEXT-pushOffset-11360

`pushOffset` **must** be less than or equal to
`maxPushDataSize` - 8

* 
[](#VUID-VkDescriptorMappingSourceIndirectIndexArrayEXT-addressOffset-11361) VUID-VkDescriptorMappingSourceIndirectIndexArrayEXT-addressOffset-11361

`addressOffset` **must** be a multiple of 4

* 
[](#VUID-VkDescriptorMappingSourceIndirectIndexArrayEXT-pEmbeddedSampler-11448) VUID-VkDescriptorMappingSourceIndirectIndexArrayEXT-pEmbeddedSampler-11448

If `pEmbeddedSampler` is a valid pointer to a
[VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo), its `borderColor` **must** not be
[VK_BORDER_COLOR_FLOAT_CUSTOM_EXT](samplers.html#VkBorderColor) or
[VK_BORDER_COLOR_INT_CUSTOM_EXT](samplers.html#VkBorderColor)

* 
[](#VUID-VkDescriptorMappingSourceIndirectIndexArrayEXT-pEmbeddedSampler-11404) VUID-VkDescriptorMappingSourceIndirectIndexArrayEXT-pEmbeddedSampler-11404

If `pEmbeddedSampler` is a valid pointer to a
[VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo), and there is a
[VkDebugUtilsObjectNameInfoEXT](debugging.html#VkDebugUtilsObjectNameInfoEXT) structure in its `pNext` chain,
its `objectType` **must** be [VK_OBJECT_TYPE_UNKNOWN](debugging.html#VkObjectType)

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorMappingSourceIndirectIndexArrayEXT-pEmbeddedSampler-parameter) VUID-VkDescriptorMappingSourceIndirectIndexArrayEXT-pEmbeddedSampler-parameter

 If `pEmbeddedSampler` is not `NULL`, `pEmbeddedSampler` **must** be a valid pointer to a valid [VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo) structure

The `VkDescriptorMappingSourceHeapDataEXT` structure is defined as:

// Provided by VK_EXT_descriptor_heap
typedef struct VkDescriptorMappingSourceHeapDataEXT {
    uint32_t    heapOffset;
    uint32_t    pushOffset;
} VkDescriptorMappingSourceHeapDataEXT;

* 
`heapOffset` is a constant byte offset added to the heap address for
the mapped buffer.

* 
`pushOffset` is an index into push data where an additional offset
into the heap for the mapped resource will be retrieved.

Uniform buffers using this mapping will be backed directly by data in the
heap.
Accessing data in the uniform buffer at an offset of shaderOffset in
the shader will access heap data at an offset equal to

offset = shaderOffset +  heapOffset + 
((uint32_t*)pPushData)[pushOffset/4]

where pPushData is the total set of push data specified by
[vkCmdPushDataEXT](#vkCmdPushDataEXT).
Shader reads through the heap mapped in this way are performed according to
the mapped resource.

Valid Usage

* 
[](#VUID-VkDescriptorMappingSourceHeapDataEXT-heapOffset-11263) VUID-VkDescriptorMappingSourceHeapDataEXT-heapOffset-11263

`heapOffset` **must** be a multiple of
[    `minUniformBufferOffsetAlignment`](limits.html#limits-minUniformBufferOffsetAlignment)

* 
[](#VUID-VkDescriptorMappingSourceHeapDataEXT-pushOffset-11264) VUID-VkDescriptorMappingSourceHeapDataEXT-pushOffset-11264

`pushOffset` **must** be a multiple of 4

* 
[](#VUID-VkDescriptorMappingSourceHeapDataEXT-pushOffset-11265) VUID-VkDescriptorMappingSourceHeapDataEXT-pushOffset-11265

`pushOffset` **must** be less than or equal to
`maxPushDataSize` - 4

The `VkDescriptorMappingSourceIndirectAddressEXT` structure is defined
as:

// Provided by VK_EXT_descriptor_heap
typedef struct VkDescriptorMappingSourceIndirectAddressEXT {
    uint32_t    pushOffset;
    uint32_t    addressOffset;
} VkDescriptorMappingSourceIndirectAddressEXT;

* 
`pushOffset` is a byte offset into push data where an indirect
address containing the address for the mapped resource will be
retrieved.

* 
`addressOffset` is a byte offset into the indirect address where the
address for the mapped resource will be retrieved.

Accessing data via the mapped resource in the shader will access data
backing the address specified in the indirect address at the supplied
offset:

indirectAddress =
((VkDeviceAddress*)pPushData)[pushOffset/8]

resourceAddress =
((VkDeviceAddress*)indirectAddress)[addressOffset/8]

where pPushData is the total set of push data specified by
[vkCmdPushDataEXT](#vkCmdPushDataEXT).
Reads through indirectAddress are performed as non-volatile uniform
buffer reads, and can be synchronized using
[VK_ACCESS_2_UNIFORM_READ_BIT](synchronization.html#VkAccessFlagBits2KHR).
Shader reads through resourceAddress are performed according to the
mapped resource.
If the shader resource is an acceleration structure, the address **must** be a
valid acceleration structure address.

Valid Usage

* 
[](#VUID-VkDescriptorMappingSourceIndirectAddressEXT-pushOffset-11266) VUID-VkDescriptorMappingSourceIndirectAddressEXT-pushOffset-11266

`pushOffset` **must** be a multiple of 8

* 
[](#VUID-VkDescriptorMappingSourceIndirectAddressEXT-pushOffset-11267) VUID-VkDescriptorMappingSourceIndirectAddressEXT-pushOffset-11267

`pushOffset` **must** be less than or equal to
`maxPushDataSize` - 8

* 
[](#VUID-VkDescriptorMappingSourceIndirectAddressEXT-addressOffset-11268) VUID-VkDescriptorMappingSourceIndirectAddressEXT-addressOffset-11268

`addressOffset` **must** be a multiple of 8

The `VkDescriptorMappingSourceShaderRecordIndexEXT` structure is defined
as:

// Provided by VK_EXT_descriptor_heap
typedef struct VkDescriptorMappingSourceShaderRecordIndexEXT {
    uint32_t                      heapOffset;
    uint32_t                      shaderRecordOffset;
    uint32_t                      heapIndexStride;
    uint32_t                      heapArrayStride;
    const VkSamplerCreateInfo*    pEmbeddedSampler;
    VkBool32                      useCombinedImageSamplerIndex;
    uint32_t                      samplerHeapOffset;
    uint32_t                      samplerShaderRecordOffset;
    uint32_t                      samplerHeapIndexStride;
    uint32_t                      samplerHeapArrayStride;
} VkDescriptorMappingSourceShaderRecordIndexEXT;

* 
`heapOffset` is a constant byte offset added to the heap address for
the mapped resource or sampler.

* 
`shaderRecordOffset` is an index into shader record data where an
index into the heap for the mapped resource will be retrieved.

* 
`heapIndexStride` is a constant byte stride that multiplies the
index in shader record data.

* 
`heapArrayStride` is a constant byte stride that multiplies the
shader binding and array index.

* 
`pEmbeddedSampler` is an optional [VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo)
structure specifying a sampler to embed into the shader, in place of
looking the sampler up in a heap.

* 
`useCombinedImageSamplerIndex` specifies whether the generated index
value will be decoded as two packed indices if the mapped resource is an
`OpTypeSampledImage`.

* 
`samplerHeapOffset` is used only when mapping a combined image
sampler, used in place of `heapOffset` to retrieve the sampler.

* 
`samplerShaderRecordOffset` is used only when mapping a combined
image sampler, used in place of `shaderRecordOffset` to retrieve the
sampler.

* 
`samplerHeapIndexStride` is used only when mapping a combined image
sampler, used in place of `heapIndexStride` to retrieve the sampler.

* 
`samplerHeapArrayStride` is used only when mapping a combined image
sampler, used in place of `heapArrayStride` to retrieve the sampler.

Resources using this mapping will be backed by a descriptor in the heap, at
an offset calculated as

shaderRecordIndex =
((uint32_t*)pShaderRecordData)[shaderRecordOffset/4]

shaderIndex = (Binding - firstBinding) +  arrayIndex

offset = heapOffset +  (shaderRecordIndex ×
heapIndexStride) +  (shaderIndex × heapArrayStride)

where Binding is the binding value in the shader, arrayIndex is
the index into the array if the shader binding is declared as an array, and
pShaderRecordData is the set of shader record data accessible to the
shader.

If the mapped resource is a `OpTypeSampledImage`, offset is instead
calculated for the sampler as

samplerShaderRecordIndex =
((uint32_t*)pShaderRecordData)[samplerShaderRecordOffset/4]

offset = samplerHeapOffset +  (samplerShaderRecordIndex
× samplerHeapIndexStride) +  (shaderIndex ×
samplerHeapArrayStride)

If `useCombinedImageSamplerIndex` is [VK_TRUE](fundamentals.html#VK_TRUE), and the mapped
resource is a `OpTypeSampledImage`, shaderRecordIndex and
samplerShaderRecordIndex in the above equations are instead calculated
as

shaderRecordIndex =
((uint32_t*)pShaderRecordData)[shaderRecordOffset/4] & 0xFFFFF

samplerShaderRecordIndex =
(((uint32_t*)pShaderRecordData)[shaderRecordOffset/4] >> 20) &
0xFFF

If the mapped resource is a `OpTypeSampler` or `OpTypeSampledImage`,
and `pEmbeddedSampler` is not `NULL`, the specified embedded sampler
will be used rather than accessing the sampler heap.

Valid Usage

* 
[](#VUID-VkDescriptorMappingSourceShaderRecordIndexEXT-shaderRecordOffset-11269) VUID-VkDescriptorMappingSourceShaderRecordIndexEXT-shaderRecordOffset-11269

`shaderRecordOffset` **must** be a multiple of 4

* 
[](#VUID-VkDescriptorMappingSourceShaderRecordIndexEXT-shaderRecordOffset-11270) VUID-VkDescriptorMappingSourceShaderRecordIndexEXT-shaderRecordOffset-11270

`shaderRecordOffset` **must** be less than or equal to
[`maxShaderGroupStride`](limits.html#limits-maxShaderGroupStride) - 4

* 
[](#VUID-VkDescriptorMappingSourceShaderRecordIndexEXT-pEmbeddedSampler-11449) VUID-VkDescriptorMappingSourceShaderRecordIndexEXT-pEmbeddedSampler-11449

If `pEmbeddedSampler` is a valid pointer to a
[VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo), its `borderColor` **must** not be
[VK_BORDER_COLOR_FLOAT_CUSTOM_EXT](samplers.html#VkBorderColor) or
[VK_BORDER_COLOR_INT_CUSTOM_EXT](samplers.html#VkBorderColor)

* 
[](#VUID-VkDescriptorMappingSourceShaderRecordIndexEXT-pEmbeddedSampler-11405) VUID-VkDescriptorMappingSourceShaderRecordIndexEXT-pEmbeddedSampler-11405

If `pEmbeddedSampler` is a valid pointer to a
[VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo), and there is a
[VkDebugUtilsObjectNameInfoEXT](debugging.html#VkDebugUtilsObjectNameInfoEXT) structure in its `pNext` chain,
its `objectType` **must** be [VK_OBJECT_TYPE_UNKNOWN](debugging.html#VkObjectType)

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorMappingSourceShaderRecordIndexEXT-pEmbeddedSampler-parameter) VUID-VkDescriptorMappingSourceShaderRecordIndexEXT-pEmbeddedSampler-parameter

 If `pEmbeddedSampler` is not `NULL`, `pEmbeddedSampler` **must** be a valid pointer to a valid [VkSamplerCreateInfo](samplers.html#VkSamplerCreateInfo) structure

For simplicity, descriptor sizes are advertised and treated by default as
equal to the advertised descriptor size limits:

* 
[`samplerDescriptorSize`](limits.html#limits-samplerDescriptorSize)

* 
[`bufferDescriptorSize`](limits.html#limits-bufferDescriptorSize)

* 
[`imageDescriptorSize`](limits.html#limits-imageDescriptorSize)

* 
[`tensorDescriptorSize`](limits.html#limits-tensorDescriptorSize)

However, for some specific use cases it is useful to be able to pack
specific descriptors into memory more tightly than this when the
implementation allows for this.

To query the size of heap descriptor for a specific [VkDescriptorType](descriptors.html#VkDescriptorType),
call:

// Provided by VK_EXT_descriptor_heap
VkDeviceSize vkGetPhysicalDeviceDescriptorSizeEXT(
    VkPhysicalDevice                            physicalDevice,
    VkDescriptorType                            descriptorType);

* 
`physicalDevice` is the physical device from which to query the
descriptor sizes.

* 
`descriptorType` is a [VkDescriptorType](descriptors.html#VkDescriptorType) specifying the type of
heap descriptor to query the size for.

The return value of this function will be a `VkDeviceSize` indicating
the size in bytes (N) of a heap descriptor with a type equal to
`descriptorType`.
When a descriptor of this type is written by
[vkWriteResourceDescriptorsEXT](#vkWriteResourceDescriptorsEXT) or [vkWriteSamplerDescriptorsEXT](#vkWriteSamplerDescriptorsEXT),
only the first N bytes are written; the rest will not be accessed and
**can** be safely discarded when copying descriptors around.
Additionally, those first N bytes are the only bytes that will be
accessed when the descriptor is accessed in the shader.
N will never be larger than the applicable limits in
[VkPhysicalDeviceDescriptorHeapTensorPropertiesARM](limits.html#VkPhysicalDeviceDescriptorHeapTensorPropertiesARM) or
[VkPhysicalDeviceDescriptorHeapPropertiesEXT](limits.html#VkPhysicalDeviceDescriptorHeapPropertiesEXT).

|  | Values returned by this function have other requirements, so for example may
| --- | --- |
not be power-of-two values. |

|  | This command is not intended for general use, and is for tools that already
| --- | --- |
take advantage of tighter packing with other similar features
(e.g. `[VK_EXT_descriptor_buffer](../appendices/extensions.html#VK_EXT_descriptor_buffer)`)
to optimize accesses in some cases.
Applications can safely ignore this function and are advised to do so, to
avoid depending on non-portable packing. |

Valid Usage

* 
[](#VUID-vkGetPhysicalDeviceDescriptorSizeEXT-type-11362) VUID-vkGetPhysicalDeviceDescriptorSizeEXT-type-11362

`type` **must** be one of [VK_DESCRIPTOR_TYPE_SAMPLER](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_UNIFORM_BUFFER](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_BUFFER](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_SAMPLED_IMAGE](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_IMAGE](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_SAMPLE_WEIGHT_IMAGE_QCOM](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_BLOCK_MATCH_IMAGE_QCOM](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_KHR](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE_NV](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_PARTITIONED_ACCELERATION_STRUCTURE_NV](descriptors.html#VkDescriptorType),
[VK_DESCRIPTOR_TYPE_TENSOR_ARM](descriptors.html#VkDescriptorType),
or [VK_DESCRIPTOR_TYPE_INPUT_ATTACHMENT](descriptors.html#VkDescriptorType)

Valid Usage (Implicit)

* 
[](#VUID-vkGetPhysicalDeviceDescriptorSizeEXT-physicalDevice-parameter) VUID-vkGetPhysicalDeviceDescriptorSizeEXT-physicalDevice-parameter

 `physicalDevice` **must** be a valid [VkPhysicalDevice](devsandqueues.html#VkPhysicalDevice) handle

* 
[](#VUID-vkGetPhysicalDeviceDescriptorSizeEXT-descriptorType-parameter) VUID-vkGetPhysicalDeviceDescriptorSizeEXT-descriptorType-parameter

 `descriptorType` **must** be a valid [VkDescriptorType](descriptors.html#VkDescriptorType) value
