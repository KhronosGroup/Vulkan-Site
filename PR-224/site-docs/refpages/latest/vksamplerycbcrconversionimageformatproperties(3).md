# VkSamplerYcbcrConversionImageFormatProperties(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkSamplerYcbcrConversionImageFormatProperties.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkSamplerYcbcrConversionImageFormatProperties - Structure specifying combined image sampler descriptor count for multi-planar images

To determine the number of [descriptors](../../../../spec/latest/chapters/descriptors.html#descriptors) required to support
an image format for sampled images with [Y′CBCR conversion](../../../../spec/latest/chapters/samplers.html#samplers-YCbCr-conversion), add [VkSamplerYcbcrConversionImageFormatProperties](#) to the
`pNext` chain of the [VkImageFormatProperties2](VkImageFormatProperties2.html) structure in a call
to `vkGetPhysicalDeviceImageFormatProperties2`.

The `VkSamplerYcbcrConversionImageFormatProperties` structure is defined
as:

// Provided by VK_VERSION_1_1
typedef struct VkSamplerYcbcrConversionImageFormatProperties {
    VkStructureType    sType;
    void*              pNext;
    uint32_t           combinedImageSamplerDescriptorCount;
} VkSamplerYcbcrConversionImageFormatProperties;

// Provided by VK_KHR_sampler_ycbcr_conversion
// Equivalent to VkSamplerYcbcrConversionImageFormatProperties
typedef VkSamplerYcbcrConversionImageFormatProperties VkSamplerYcbcrConversionImageFormatPropertiesKHR;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`combinedImageSamplerDescriptorCount` is the number of
[descriptors](../../../../spec/latest/chapters/descriptors.html#descriptors) that the implementation uses to access a
sampled image with [Y′CBCR conversion](../../../../spec/latest/chapters/samplers.html#samplers-YCbCr-conversion)

`combinedImageSamplerDescriptorCount` is a number between 1 and the
number of planes in the format.

The size an image descriptor with a [VkSamplerYcbcrConversionInfo](VkSamplerYcbcrConversionInfo.html)
structure consumes in the resource heap is multiplied by the
`combinedImageSamplerDescriptorCount` of its format.
These images are sampled with embedded samplers and therefore do not consume
space in the sampler heap.

For
descriptor buffers or
descriptor sets, each combined image sampler descriptor binding with a
layout that includes at least one immutable Y′CBCR conversion sampler will
internally use a number of descriptors equal to the maximum
`combinedImageSamplerDescriptorCount` of the formats of all the
immutable Y′CBCR conversion samplers in that binding.

This expanded number of descriptors will be consumed from the descriptor
pool when a descriptor set is allocated, and counts towards the
`maxDescriptorSetSamplers`, `maxDescriptorSetSampledImages`,
`maxPerStageDescriptorSamplers`, and
`maxPerStageDescriptorSampledImages` limits.

|  | All descriptors in a binding use the same expanded number of descriptors to
| --- | --- |
allow implementations to use a uniform stride for dynamic indexing.

For example, consider a descriptor set layout binding with two immutable
Y′CBCR samplers with formats that have
`VkSamplerYcbcrConversionImageFormatProperties`::`combinedImageSamplerDescriptorCount`
values of `2` and `3` respectively.
The maximum `combinedImageSamplerDescriptorCount` for this binding
layout is therefore `3`.

If there are `3` descriptors in a descriptor set binding with this layout,
including one descriptor without an immutable Y′CBCR sampler, the binding
will consume `9` combined image sampler descriptors from the descriptor
pool.

For descriptor heaps, the application explicitly maps the descriptor binding
to a heap offset with [VkDescriptorSetAndBindingMappingEXT](VkDescriptorSetAndBindingMappingEXT.html) and **should**
make similar calculations as it **must** offset each element in the binding
correctly. |

Instead of querying all the potential formats that an application might use,
it **can** use
[VkPhysicalDeviceMaintenance6Properties](VkPhysicalDeviceMaintenance6Properties.html)::`maxCombinedImageSamplerDescriptorCount`
property to determine the maximum `combinedImageSamplerDescriptorCount`
for all formats the implementation supports.

Valid Usage (Implicit)

* 
[](#VUID-VkSamplerYcbcrConversionImageFormatProperties-sType-sType) VUID-VkSamplerYcbcrConversionImageFormatProperties-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_SAMPLER_YCBCR_CONVERSION_IMAGE_FORMAT_PROPERTIES](VkStructureType.html)

Structure Chaining

[Extends the structure](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageFormatProperties2](VkImageFormatProperties2.html)

[VK_KHR_sampler_ycbcr_conversion](VK_KHR_sampler_ycbcr_conversion.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/capabilities.html#VkSamplerYcbcrConversionImageFormatProperties).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
