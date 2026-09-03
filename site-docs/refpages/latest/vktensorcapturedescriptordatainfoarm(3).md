# VkTensorCaptureDescriptorDataInfoARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkTensorCaptureDescriptorDataInfoARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Members](#_members)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkTensorCaptureDescriptorDataInfoARM - Structure specifying a tensor for descriptor capture

Information about the tensor to get descriptor buffer capture data for is
passed in a `VkTensorCaptureDescriptorDataInfoARM` structure:

// Provided by VK_EXT_descriptor_buffer with VK_ARM_tensors
typedef struct VkTensorCaptureDescriptorDataInfoARM {
    VkStructureType    sType;
    const void*        pNext;
    VkTensorARM        tensor;
} VkTensorCaptureDescriptorDataInfoARM;

* 
`sType` is a [VkStructureType](VkStructureType.html) value identifying this structure.

* 
`pNext` is `NULL` or a pointer to a structure extending this
structure.

* 
`tensor` is the `VkTensorARM` handle of the tensor to get opaque
capture data for.

Valid Usage

* 
[](#VUID-VkTensorCaptureDescriptorDataInfoARM-tensor-09705) VUID-VkTensorCaptureDescriptorDataInfoARM-tensor-09705

If `tensor` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html) then `tensor` **must** have
been created with
[VK_TENSOR_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_ARM](VkTensorCreateFlagBitsARM.html) set in
[VkTensorCreateInfoARM](VkTensorCreateInfoARM.html)::`flags`

Valid Usage (Implicit)

* 
[](#VUID-VkTensorCaptureDescriptorDataInfoARM-sType-sType) VUID-VkTensorCaptureDescriptorDataInfoARM-sType-sType

 `sType` **must** be [VK_STRUCTURE_TYPE_TENSOR_CAPTURE_DESCRIPTOR_DATA_INFO_ARM](VkStructureType.html)

* 
[](#VUID-VkTensorCaptureDescriptorDataInfoARM-pNext-pNext) VUID-VkTensorCaptureDescriptorDataInfoARM-pNext-pNext

 `pNext` **must** be `NULL`

* 
[](#VUID-VkTensorCaptureDescriptorDataInfoARM-tensor-parameter) VUID-VkTensorCaptureDescriptorDataInfoARM-tensor-parameter

 `tensor` **must** be a valid [VkTensorARM](VkTensorARM.html) handle

[VK_ARM_tensors](VK_ARM_tensors.html), [VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html), [VkStructureType](VkStructureType.html), [VkTensorARM](VkTensorARM.html), [vkGetTensorOpaqueCaptureDescriptorDataARM](vkGetTensorOpaqueCaptureDescriptorDataARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorbuffers.html#VkTensorCaptureDescriptorDataInfoARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
