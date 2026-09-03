# VkHostAddressRangeEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkHostAddressRangeEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkHostAddressRangeEXT - Structure specifying a host address range

A host address range indicates a range of host memory.

// Provided by VK_EXT_descriptor_heap
typedef struct VkHostAddressRangeEXT {
    void*     address;
    size_t    size;
} VkHostAddressRangeEXT;

* 
`address` is a host memory address.

* 
`size` is the size of the range.

Valid Usage (Implicit)

* 
[](#VUID-VkHostAddressRangeEXT-address-parameter) VUID-VkHostAddressRangeEXT-address-parameter

 `address` **must** be a valid pointer to an array of `size` bytes

* 
[](#VUID-VkHostAddressRangeEXT-size-arraylength) VUID-VkHostAddressRangeEXT-size-arraylength

 `size` **must** be greater than `0`

[VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), [vkGetImageOpaqueCaptureDataEXT](vkGetImageOpaqueCaptureDataEXT.html), [vkGetTensorOpaqueCaptureDataARM](vkGetTensorOpaqueCaptureDataARM.html), [vkWriteResourceDescriptorsEXT](vkWriteResourceDescriptorsEXT.html), [vkWriteSamplerDescriptorsEXT](vkWriteSamplerDescriptorsEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fundamentals.html#VkHostAddressRangeEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
