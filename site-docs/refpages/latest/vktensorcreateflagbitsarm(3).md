# VkTensorCreateFlagBitsARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkTensorCreateFlagBitsARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkTensorCreateFlagBitsARM - Bitmask specifying additional parameters of a tensor

Bits which **can** be set in [VkTensorCreateInfoARM](VkTensorCreateInfoARM.html)::`flags`,
specifying additional parameters of a tensor, are:

// Provided by VK_ARM_tensors
// Flag bits for VkTensorCreateFlagBitsARM
typedef VkFlags64 VkTensorCreateFlagBitsARM;
static const VkTensorCreateFlagBitsARM VK_TENSOR_CREATE_MUTABLE_FORMAT_BIT_ARM = 0x00000001ULL;
static const VkTensorCreateFlagBitsARM VK_TENSOR_CREATE_PROTECTED_BIT_ARM = 0x00000002ULL;
// Provided by VK_EXT_descriptor_heap with VK_ARM_tensors
static const VkTensorCreateFlagBitsARM VK_TENSOR_CREATE_DESCRIPTOR_HEAP_CAPTURE_REPLAY_BIT_ARM = 0x00000008ULL;
// Provided by VK_EXT_descriptor_buffer with VK_ARM_tensors
static const VkTensorCreateFlagBitsARM VK_TENSOR_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_ARM = 0x00000004ULL;

* 
[VK_TENSOR_CREATE_MUTABLE_FORMAT_BIT_ARM](#) specifies that the tensor
**can** be used to create a `VkTensorViewARM` with a different format
from the tensor.

* 
[VK_TENSOR_CREATE_PROTECTED_BIT_ARM](#) specifies that the tensor is a
protected tensor.

* 
[VK_TENSOR_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_ARM](#)
specifies that the tensor **can** be used with descriptor buffers when
capturing and replaying (e.g. for trace capture and replay), see
[VkOpaqueCaptureDescriptorDataCreateInfoEXT](VkOpaqueCaptureDescriptorDataCreateInfoEXT.html) for more detail.

[VK_ARM_tensors](VK_ARM_tensors.html), [VkTensorCreateFlagsARM](VkTensorCreateFlagsARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkTensorCreateFlagBitsARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
