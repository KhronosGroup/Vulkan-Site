# VkDescriptorMappingSourceIndirectAddressEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkDescriptorMappingSourceIndirectAddressEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkDescriptorMappingSourceIndirectAddressEXT - Structure specifying mapping a uniform buffer to an address specified indirectly

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
[vkCmdPushDataEXT](vkCmdPushDataEXT.html).
Reads through indirectAddress are performed as non-volatile uniform
buffer reads, and can be synchronized using
[VK_ACCESS_2_UNIFORM_READ_BIT](VkAccessFlagBits2.html).
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

[VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), [VkDescriptorMappingSourceDataEXT](VkDescriptorMappingSourceDataEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorheaps.html#VkDescriptorMappingSourceIndirectAddressEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
