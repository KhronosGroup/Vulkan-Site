# VkTensorViewCaptureDescriptorDataInfoARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkTensorViewCaptureDescriptorDataInfoARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkTensorViewCaptureDescriptorDataInfoARM - Structure specifying a tensor view for descriptor capture

Information about the tensor view to get descriptor buffer capture data for
is passed in a `VkTensorViewCaptureDescriptorDataInfoARM` structure:

// Provided by VK_EXT_descriptor_buffer with VK_ARM_tensors
typedef struct VkTensorViewCaptureDescriptorDataInfoARM {
    VkStructureType    sType;
    const void*        pNext;
    VkTensorViewARM    tensorView;
} VkTensorViewCaptureDescriptorDataInfoARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`tensorView` is the `VkTensorViewARM` handle of the tensor view
to get opaque capture data for.

Valid Usage

* 
[](#VUID-VkTensorViewCaptureDescriptorDataInfoARM-tensorView-09709) VUID-VkTensorViewCaptureDescriptorDataInfoARM-tensorView-09709

If `tensorView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html) then `tensorView`
**must** have been created with
[VK_TENSOR_VIEW_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_ARM](VkTensorViewCreateFlagBitsARM.html) set
in [VkTensorViewCreateInfoARM](VkTensorViewCreateInfoARM.html)::`flags`

Valid Usage (Implicit)

* 
[](#VUID-VkTensorViewCaptureDescriptorDataInfoARM-sType-sType) VUID-VkTensorViewCaptureDescriptorDataInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_TENSOR_VIEW_CAPTURE_DESCRIPTOR_DATA_INFO_ARM](VkStructureType.html)

* 
[](#VUID-VkTensorViewCaptureDescriptorDataInfoARM-pNext-pNext) VUID-VkTensorViewCaptureDescriptorDataInfoARM-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkTensorViewCaptureDescriptorDataInfoARM-tensorView-parameter) VUID-VkTensorViewCaptureDescriptorDataInfoARM-tensorView-parameter

 `tensorView` **must** be a valid [VkTensorViewARM](VkTensorViewARM.html) handle

[VK_ARM_tensors](VK_ARM_tensors.html), [VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html), [VkStructureType](VkStructureType.html), [VkTensorViewARM](VkTensorViewARM.html), [vkGetTensorViewOpaqueCaptureDescriptorDataARM](vkGetTensorViewOpaqueCaptureDescriptorDataARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorbuffers.html#VkTensorViewCaptureDescriptorDataInfoARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
