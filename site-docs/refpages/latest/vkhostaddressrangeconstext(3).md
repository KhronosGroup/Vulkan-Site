# VkHostAddressRangeConstEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkHostAddressRangeConstEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkHostAddressRangeConstEXT - Structure specifying a constant host address range

A constant host address range indicates a range of host memory that cannot
be altered.

// Provided by VK_EXT_descriptor_heap
typedef struct VkHostAddressRangeConstEXT {
    const void*    address;
    size_t         size;
} VkHostAddressRangeConstEXT;

* 
`address` is a read-only host memory address.

* 
`size` is the size of the range.

Valid Usage (Implicit)

* 
[](#VUID-VkHostAddressRangeConstEXT-address-parameter) VUID-VkHostAddressRangeConstEXT-address-parameter

 `address` **must** be a valid pointer to an array of `size` bytes

* 
[](#VUID-VkHostAddressRangeConstEXT-size-arraylength) VUID-VkHostAddressRangeConstEXT-size-arraylength

 `size` **must** be greater than `0`

[VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), [VkOpaqueCaptureDataCreateInfoEXT](VkOpaqueCaptureDataCreateInfoEXT.html), [VkPushDataInfoEXT](VkPushDataInfoEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/fundamentals.html#VkHostAddressRangeConstEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
