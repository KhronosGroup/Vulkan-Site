# VkDescriptorPoolSize(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDescriptorPoolSize.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDescriptorPoolSize - Structure specifying descriptor pool size

The `VkDescriptorPoolSize` structure is defined as:

// Provided by VK_VERSION_1_0
typedef struct VkDescriptorPoolSize {
    VkDescriptorType    type;
    uint32_t            descriptorCount;
} VkDescriptorPoolSize;

* 
`type` is the type of descriptor.

* 
`descriptorCount` is the number of descriptors of that type to
allocate.
If `type` is [VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](VkDescriptorType.html) then
`descriptorCount` is the number of bytes to allocate for descriptors
of this type.

|  | When creating a descriptor pool that will contain descriptors for combined
| --- | --- |
image samplers of [multi-planar formats](../../../../spec/latest/chapters/formats.html#formats-multiplanar), an
application needs to account for non-trivial descriptor consumption when
choosing the `descriptorCount` value, as indicated by
[VkSamplerYcbcrConversionImageFormatProperties](VkSamplerYcbcrConversionImageFormatProperties.html)::`combinedImageSamplerDescriptorCount`.

For simplicity the application **can** use the
[VkPhysicalDeviceMaintenance6Properties](VkPhysicalDeviceMaintenance6Properties.html)::`maxCombinedImageSamplerDescriptorCount`
property, which is sized to accommodate any and all
[formats that require a sampler Y′CBCR conversion](../../../../spec/latest/chapters/formats.html#formats-requiring-sampler-ycbcr-conversion) supported by the implementation. |

Valid Usage

* 
[](#VUID-VkDescriptorPoolSize-descriptorCount-00302) VUID-VkDescriptorPoolSize-descriptorCount-00302

`descriptorCount` **must** be greater than `0`

* 
[](#VUID-VkDescriptorPoolSize-type-02218) VUID-VkDescriptorPoolSize-type-02218

If `type` is [VK_DESCRIPTOR_TYPE_INLINE_UNIFORM_BLOCK](VkDescriptorType.html) then
`descriptorCount` **must** be a multiple of `4`

Valid Usage (Implicit)

* 
[](#VUID-VkDescriptorPoolSize-type-parameter) VUID-VkDescriptorPoolSize-type-parameter

 `type` **must** be a valid [VkDescriptorType](VkDescriptorType.html) value

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkDescriptorPoolCreateInfo](VkDescriptorPoolCreateInfo.html), [VkDescriptorType](VkDescriptorType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#VkDescriptorPoolSize).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
