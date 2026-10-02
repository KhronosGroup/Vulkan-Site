# VkPushDataInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkPushDataInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkPushDataInfoEXT - Structure specifying a push data update operation

The `VkPushDataInfoEXT` structure is defined as:

// Provided by VK_EXT_descriptor_heap
typedef struct VkPushDataInfoEXT {
    VkStructureType               sType;
    const void*                   pNext;
    uint32_t                      offset;
    VkHostAddressRangeConstEXT    data;
} VkPushDataInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

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
to [`maxPushDataSize`](../../../../spec/latest/chapters/limits.html#limits-maxPushDataSize)

* 
[](#VUID-VkPushDataInfoEXT-offset-11418) VUID-VkPushDataInfoEXT-offset-11418

`offset` **must** be a multiple of 4

* 
[](#VUID-VkPushDataInfoEXT-data-11419) VUID-VkPushDataInfoEXT-data-11419

`data.size` **must** be a multiple of 4

Valid Usage (Implicit)

* 
[](#VUID-VkPushDataInfoEXT-sType-sType) VUID-VkPushDataInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_PUSH_DATA_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkPushDataInfoEXT-pNext-pNext) VUID-VkPushDataInfoEXT-pNext-pNext

 `pNext` **must** be `NULL` or a pointer to a valid instance of [VkPushConstantBankInfoNV](VkPushConstantBankInfoNV.html)

* 
[](#VUID-VkPushDataInfoEXT-sType-unique) VUID-VkPushDataInfoEXT-sType-unique

 The `sType` value of each structure in the `pNext` chain **must** be unique

* 
[](#VUID-VkPushDataInfoEXT-data-parameter) VUID-VkPushDataInfoEXT-data-parameter

 `data` **must** be a valid [VkHostAddressRangeConstEXT](VkHostAddressRangeConstEXT.html) structure

[VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), [VkHostAddressRangeConstEXT](VkHostAddressRangeConstEXT.html), [VkStructureType](VkStructureType.html), [vkCmdPushDataEXT](vkCmdPushDataEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorheaps.html#VkPushDataInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
