# vkWriteResourceDescriptorsEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkWriteResourceDescriptorsEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkWriteResourceDescriptorsEXT - Write resource descriptors to memory

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
[VkResourceDescriptorInfoEXT](VkResourceDescriptorInfoEXT.html) structures defining properties of the
resource descriptors that will be written.

* 
`pDescriptors` is a pointer to an array of
[VkHostAddressRangeEXT](VkHostAddressRangeEXT.html) structures defining the host address ranges
that will be written to for each descriptor.

Each descriptor will be written to `pDescriptors`[i].address where
i is the index of its create info in `pResources`.

If any image descriptor written by this command includes a
[VkSamplerYcbcrConversion](VkSamplerYcbcrConversion.html), multiple descriptors will be written
adjacent to each other for that descriptor, equal to
[VkSamplerYcbcrConversionImageFormatProperties](VkSamplerYcbcrConversionImageFormatProperties.html)::combinedImageSamplerDescriptorCount
for the image.

If any image descriptor written by this command is for an image created with
`flags` containing [VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](VkImageCreateFlagBits.html), multiple
descriptors will be written adjacent to each other for that descriptor,
equal to
[VkSubsampledImageFormatPropertiesEXT](VkSubsampledImageFormatPropertiesEXT.html)::subsampledImageDescriptorCount
for the image.

Descriptors using the same `type` and written using a fully identical
[VkTexelBufferDescriptorInfoEXT](VkTexelBufferDescriptorInfoEXT.html) or [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html)
structure on the same [VkDevice](VkDevice.html) will always return the same bit
pattern.
If the [descriptorHeapCaptureReplay](../../../../spec/latest/chapters/features.html#features-descriptorHeapCaptureReplay)
feature is enabled, this applies to any [VkDevice](VkDevice.html) created with
identical parameters from the same [VkPhysicalDevice](VkPhysicalDevice.html).

|  | Recreating the same buffer descriptor during replay of a prior capture
| --- | --- |
requires that the device address is the same, which requires additional data
to be captured and provided during replay when creating a buffer and
allocating memory for it. |

Image descriptors using the same `type` and written using a fully
identical [VkImageDescriptorInfoEXT](VkImageDescriptorInfoEXT.html) other than
[VkImageDescriptorInfoEXT](VkImageDescriptorInfoEXT.html)::`pView->image`, where image was
successfully created with
[VK_IMAGE_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_EXT](VkImageCreateFlagBits.html) and a
[VkOpaqueCaptureDataCreateInfoEXT](VkOpaqueCaptureDataCreateInfoEXT.html) with data captured via
[vkGetImageOpaqueCaptureDataEXT](vkGetImageOpaqueCaptureDataEXT.html) from an image used previously, will
write a descriptor with the same bit pattern if possible; if the same bit
pattern cannot be generated, [VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS](VkResult.html)
will be returned instead.

Tensor descriptors using the same `type` and written using a fully
identical [VkTensorViewCreateInfoARM](VkTensorViewCreateInfoARM.html) other than
[VkTensorViewCreateInfoARM](VkTensorViewCreateInfoARM.html)::`tensor`, where tensor was successfully
created with [VkOpaqueCaptureDataCreateInfoEXT](VkOpaqueCaptureDataCreateInfoEXT.html) with
[VK_TENSOR_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_ARM](VkTensorCreateFlagBitsARM.html) and a
[VkOpaqueCaptureDataCreateInfoEXT](VkOpaqueCaptureDataCreateInfoEXT.html) with data captured via
[vkGetTensorOpaqueCaptureDataARM](vkGetTensorOpaqueCaptureDataARM.html) from a tensor used previously, will
write a descriptor with the same bit pattern if possible; if the same bit
pattern cannot be generated, [VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS](VkResult.html)
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

The [`descriptorHeap`](../../../../spec/latest/chapters/features.html#features-descriptorHeap) feature **must** be
enabled

* 
[](#VUID-vkWriteResourceDescriptorsEXT-size-11207) VUID-vkWriteResourceDescriptorsEXT-size-11207

The `size` member of each element of `pDescriptors` **must** be
greater than or equal to the value returned by
[vkGetPhysicalDeviceDescriptorSizeEXT](vkGetPhysicalDeviceDescriptorSizeEXT.html) with a `descriptorType`
equal to `type`

* 
[](#VUID-vkWriteResourceDescriptorsEXT-pResources-11208) VUID-vkWriteResourceDescriptorsEXT-pResources-11208

If any element of `pResources` specifies a
[VkImageViewCreateInfo](VkImageViewCreateInfo.html) structure with a
[VkSamplerYcbcrConversionInfo](VkSamplerYcbcrConversionInfo.html) structure in its `pNext` chain,
the corresponding element of `pDescriptors` **must** have a `size`
member that is greater than or equal to the product of the value
returned by [vkGetPhysicalDeviceDescriptorSizeEXT](vkGetPhysicalDeviceDescriptorSizeEXT.html) with a
`descriptorType` equal to `type` and
[VkSamplerYcbcrConversionImageFormatProperties](VkSamplerYcbcrConversionImageFormatProperties.html)::combinedImageSamplerDescriptorCount,
as queried from [VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html) with image format
info equivalent to the image view the descriptor is being created for

* 
[](#VUID-vkWriteResourceDescriptorsEXT-pResources-11209) VUID-vkWriteResourceDescriptorsEXT-pResources-11209

If any element of `pResources` specifies a
[VkImageViewCreateInfo](VkImageViewCreateInfo.html) structure with an `image` created with
`flags` containing [VK_IMAGE_CREATE_SUBSAMPLED_BIT_EXT](VkImageCreateFlagBits.html), the
corresponding element of `pDescriptors` **must** have a `size`
member that is greater than or equal to the product of the value
returned by [vkGetPhysicalDeviceDescriptorSizeEXT](vkGetPhysicalDeviceDescriptorSizeEXT.html) with a
`descriptorType` equal to `type` and
[VkSubsampledImageFormatPropertiesEXT](VkSubsampledImageFormatPropertiesEXT.html)::subsampledImageDescriptorCount,
as queried from [VkPhysicalDeviceImageFormatInfo2](VkPhysicalDeviceImageFormatInfo2.html) with image format
info equivalent to the image view the descriptor is being created for

Valid Usage (Implicit)

* 
[](#VUID-vkWriteResourceDescriptorsEXT-device-parameter) VUID-vkWriteResourceDescriptorsEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkWriteResourceDescriptorsEXT-pResources-parameter) VUID-vkWriteResourceDescriptorsEXT-pResources-parameter

 `pResources` **must** be a valid pointer to an array of `resourceCount` valid [VkResourceDescriptorInfoEXT](VkResourceDescriptorInfoEXT.html) structures

* 
[](#VUID-vkWriteResourceDescriptorsEXT-pDescriptors-parameter) VUID-vkWriteResourceDescriptorsEXT-pDescriptors-parameter

 `pDescriptors` **must** be a valid pointer to an array of `resourceCount` valid [VkHostAddressRangeEXT](VkHostAddressRangeEXT.html) structures

* 
[](#VUID-vkWriteResourceDescriptorsEXT-resourceCount-arraylength) VUID-vkWriteResourceDescriptorsEXT-resourceCount-arraylength

 `resourceCount` **must** be greater than `0`

Return Codes

[Success](../../../../spec/latest/chapters/fundamentals.html#fundamentals-successcodes)

* 
[VK_SUCCESS](VkResult.html)

[Failure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-errorcodes)

* 
[VK_ERROR_OUT_OF_DEVICE_MEMORY](VkResult.html)

* 
[VK_ERROR_OUT_OF_HOST_MEMORY](VkResult.html)

* 
[VK_ERROR_UNKNOWN](VkResult.html)

* 
[VK_ERROR_VALIDATION_FAILED](VkResult.html)

[VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), [VkDevice](VkDevice.html), [VkHostAddressRangeEXT](VkHostAddressRangeEXT.html), [VkResourceDescriptorInfoEXT](VkResourceDescriptorInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorheaps.html#vkWriteResourceDescriptorsEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
