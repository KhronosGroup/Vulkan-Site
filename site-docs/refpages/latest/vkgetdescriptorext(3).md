# vkGetDescriptorEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkGetDescriptorEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkGetDescriptorEXT - To get a descriptor to place in a buffer

To get descriptor data to place in a buffer, call:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-descriptor-sets) for more information. |
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
`pDescriptorInfo` is a pointer to a [VkDescriptorGetInfoEXT](VkDescriptorGetInfoEXT.html)
structure specifying the parameters of the descriptor to get.

* 
`dataSize` is the amount of the descriptor data to get in bytes.

* 
`pDescriptor` is a pointer to an application-allocated buffer where
the descriptor will be written.

The size of the data for each descriptor type is determined by the value in
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](VkPhysicalDeviceDescriptorBufferPropertiesEXT.html).
This value also defines the stride in bytes for arrays of that descriptor
type.

If the
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](VkPhysicalDeviceDescriptorBufferPropertiesEXT.html)::`combinedImageSamplerDescriptorSingleArray`
property is [VK_FALSE](VK_FALSE.html) the implementation requires an array of
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html) descriptors to be written
into a descriptor buffer as an array of image descriptors, immediately
followed by an array of sampler descriptors.
Applications **must** write the first
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](VkPhysicalDeviceDescriptorBufferPropertiesEXT.html)::`sampledImageDescriptorSize`
bytes of the data returned through `pDescriptor` to the first array, and
the remaining
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](VkPhysicalDeviceDescriptorBufferPropertiesEXT.html)::`samplerDescriptorSize`
bytes of the data to the second array.
For variable-sized descriptor bindings of
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html) descriptors, the two arrays
each have a size equal to the upper bound `descriptorCount` of that
binding.

A descriptor obtained by this command references the underlying
[VkImageView](VkImageView.html) or [VkSampler](VkSampler.html), and these objects **must** not be
destroyed before the last time a descriptor is dynamically accessed.
For descriptor types which consume an address instead of an object, the
underlying [VkBuffer](VkBuffer.html) is referenced instead.

Valid Usage

* 
[](#VUID-vkGetDescriptorEXT-None-08015) VUID-vkGetDescriptorEXT-None-08015

The [`descriptorBuffer`](../../../../spec/latest/chapters/features.html#features-descriptorBuffer) feature **must**
be enabled

* 
[](#VUID-vkGetDescriptorEXT-dataSize-08125) VUID-vkGetDescriptorEXT-dataSize-08125

If `pDescriptorInfo->type` is not
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html) or
`pDescriptorInfo->data.pCombinedImageSampler` has an `imageView`
member that was not created with a `VkSamplerYcbcrConversionInfo`
structure in its `pNext` chain,
`dataSize` **must** equal the size of a descriptor of type
[VkDescriptorGetInfoEXT](VkDescriptorGetInfoEXT.html)::`type` determined by the value in
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](VkPhysicalDeviceDescriptorBufferPropertiesEXT.html)
, or determined by
[VkPhysicalDeviceDescriptorBufferDensityMapPropertiesEXT](VkPhysicalDeviceDescriptorBufferDensityMapPropertiesEXT.html)::`combinedImageSamplerDensityMapDescriptorSize`
if `pDescriptorInfo` specifies a
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html) whose [VkSampler](VkSampler.html)
was created with [VK_SAMPLER_CREATE_SUBSAMPLED_BIT_EXT](VkSamplerCreateFlagBits.html) set

* 
[](#VUID-vkGetDescriptorEXT-descriptorType-09469) VUID-vkGetDescriptorEXT-descriptorType-09469

If `pDescriptorInfo->type` is
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html) and
`pDescriptorInfo->data.pCombinedImageSampler` has an `imageView`
member that was created with a `VkSamplerYcbcrConversionInfo`
structure in its `pNext` chain, `dataSize` **must** equal the size
of
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](VkPhysicalDeviceDescriptorBufferPropertiesEXT.html)::`combinedImageSamplerDescriptorSize`
times
[VkSamplerYcbcrConversionImageFormatProperties](VkSamplerYcbcrConversionImageFormatProperties.html)::`combinedImageSamplerDescriptorCount`

* 
[](#VUID-vkGetDescriptorEXT-pDescriptorInfo-09507) VUID-vkGetDescriptorEXT-pDescriptorInfo-09507

If `pDescriptorInfo->type` is
[VK_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER](VkDescriptorType.html) and it has a
`imageView` that is [VK_NULL_HANDLE](VK_NULL_HANDLE.html) then `dataSize` **must**
be equal to the size of
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](VkPhysicalDeviceDescriptorBufferPropertiesEXT.html)::`combinedImageSamplerDescriptorSize`

Valid Usage (Implicit)

* 
[](#VUID-vkGetDescriptorEXT-device-parameter) VUID-vkGetDescriptorEXT-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkGetDescriptorEXT-pDescriptorInfo-parameter) VUID-vkGetDescriptorEXT-pDescriptorInfo-parameter

 `pDescriptorInfo` **must** be a valid pointer to a valid [VkDescriptorGetInfoEXT](VkDescriptorGetInfoEXT.html) structure

* 
[](#VUID-vkGetDescriptorEXT-pDescriptor-parameter) VUID-vkGetDescriptorEXT-pDescriptor-parameter

 `pDescriptor` **must** be a valid pointer to an array of `dataSize` bytes

* 
[](#VUID-vkGetDescriptorEXT-dataSize-arraylength) VUID-vkGetDescriptorEXT-dataSize-arraylength

 `dataSize` **must** be greater than `0`

[VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html), [VkDescriptorGetInfoEXT](VkDescriptorGetInfoEXT.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorbuffers.html#vkGetDescriptorEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
