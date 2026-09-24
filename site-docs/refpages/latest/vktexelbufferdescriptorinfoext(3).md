# VkTexelBufferDescriptorInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkTexelBufferDescriptorInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkTexelBufferDescriptorInfoEXT - Structure describing an image descriptor created from a buffer

`VkTexelBufferDescriptorInfoEXT` is defined as:

// Provided by VK_EXT_descriptor_heap
typedef struct VkTexelBufferDescriptorInfoEXT {
    VkStructureType            sType;
    const void*                pNext;
    VkFormat                   format;
    VkDeviceAddressRangeEXT    addressRange;
} VkTexelBufferDescriptorInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`format` is the [VkFormat](VkFormat.html) of the descriptor.

* 
`addressRange` is a [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html) defining the range
of data backing the descriptor.

Valid Usage (Implicit)

* 
[](#VUID-VkTexelBufferDescriptorInfoEXT-sType-sType) VUID-VkTexelBufferDescriptorInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_TEXEL_BUFFER_DESCRIPTOR_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkTexelBufferDescriptorInfoEXT-pNext-pNext) VUID-VkTexelBufferDescriptorInfoEXT-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkTexelBufferDescriptorInfoEXT-format-parameter) VUID-VkTexelBufferDescriptorInfoEXT-format-parameter

 `format` **must** be a valid [VkFormat](VkFormat.html) value

[VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), [VkDeviceAddressRangeKHR](VkDeviceAddressRangeKHR.html), [VkFormat](VkFormat.html), [VkResourceDescriptorDataEXT](VkResourceDescriptorDataEXT.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorheaps.html#VkTexelBufferDescriptorInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
