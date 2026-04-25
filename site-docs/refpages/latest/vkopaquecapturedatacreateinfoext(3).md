# VkOpaqueCaptureDataCreateInfoEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkOpaqueCaptureDataCreateInfoEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkOpaqueCaptureDataCreateInfoEXT - Structure specifying opaque capture data

The `VkOpaqueCaptureDataCreateInfoEXT` structure is defined as:

// Provided by VK_EXT_descriptor_heap
typedef struct VkOpaqueCaptureDataCreateInfoEXT {
    VkStructureType                      sType;
    const void*                          pNext;
    const VkHostAddressRangeConstEXT*    pData;
} VkOpaqueCaptureDataCreateInfoEXT;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`pData` is a pointer to the range of host memory containing opaque
data previously captured via [vkGetImageOpaqueCaptureDataEXT](vkGetImageOpaqueCaptureDataEXT.html).

When an image is created with
[VK_IMAGE_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_EXT](VkImageCreateFlagBits.html) set in
[VkImageCreateInfo](VkImageCreateInfo.html)::`flags`, if the `pNext` chain of
[VkImageCreateInfo](VkImageCreateInfo.html) includes this structure, and `pData` is not
`NULL`, the implementation will attempt to recreate the image such that
descriptors written with [vkWriteResourceDescriptorsEXT](vkWriteResourceDescriptorsEXT.html) will be
reproduced with the same bit pattern as during capture if possible.
If the implementation is unable to recreate the image based on this data,
image creation will fail and return
[VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS](VkResult.html).

When a tensor is created with
[VK_TENSOR_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_ARM](VkTensorCreateFlagBitsARM.html) set in
[VkTensorCreateInfoARM](VkTensorCreateInfoARM.html)::`flags`, if the `pNext` chain of
[VkTensorCreateInfoARM](VkTensorCreateInfoARM.html) includes this structure, and `pData` is not
`NULL`, the implementation will attempt to recreate the tensor such that
descriptors written with [vkWriteResourceDescriptorsEXT](vkWriteResourceDescriptorsEXT.html) will be
reproduced with the same bit pattern as during capture if possible.
If the implementation is unable to recreate the tensor based on this data,
tensor creation will fail and return
[VK_ERROR_INVALID_OPAQUE_CAPTURE_ADDRESS](VkResult.html).

If this structure is not present, it is equivalent to setting `pData` to
`NULL`.

Valid Usage (Implicit)

* 
[](#VUID-VkOpaqueCaptureDataCreateInfoEXT-sType-sType) VUID-VkOpaqueCaptureDataCreateInfoEXT-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_OPAQUE_CAPTURE_DATA_CREATE_INFO_EXT](VkStructureType.html)

* 
[](#VUID-VkOpaqueCaptureDataCreateInfoEXT-pData-parameter) VUID-VkOpaqueCaptureDataCreateInfoEXT-pData-parameter

 If `pData` is not `NULL`, `pData` **must** be a valid pointer to a valid [VkHostAddressRangeConstEXT](VkHostAddressRangeConstEXT.html) structure

Structure Chaining

[Extends the structures](../../../../spec/latest/chapters/fundamentals.html#fundamentals-validusage-pNext)

* 
[VkImageCreateInfo](VkImageCreateInfo.html)

* 
[VkTensorCreateInfoARM](VkTensorCreateInfoARM.html)

[VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html), [VkHostAddressRangeConstEXT](VkHostAddressRangeConstEXT.html), [VkStructureType](VkStructureType.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkOpaqueCaptureDataCreateInfoEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
