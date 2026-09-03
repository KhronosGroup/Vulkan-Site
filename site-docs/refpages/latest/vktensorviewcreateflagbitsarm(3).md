# VkTensorViewCreateFlagBitsARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkTensorViewCreateFlagBitsARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkTensorViewCreateFlagBitsARM - Bitmask specifying additional parameters of an tensor view

Bits which **can** be set in [VkTensorViewCreateInfoARM](VkTensorViewCreateInfoARM.html)::`flags`,
specifying additional parameters of an tensor, are:

// Provided by VK_ARM_tensors
// Flag bits for VkTensorViewCreateFlagBitsARM
typedef VkFlags64 VkTensorViewCreateFlagBitsARM;
// Provided by VK_EXT_descriptor_buffer with VK_ARM_tensors
static const VkTensorViewCreateFlagBitsARM VK_TENSOR_VIEW_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_ARM = 0x00000001ULL;

* 
[VK_TENSOR_VIEW_CREATE_DESCRIPTOR_BUFFER_CAPTURE_REPLAY_BIT_ARM](#)
specifies that the tensor view **can** be used with descriptor buffers when
capturing and replaying (e.g. for trace capture and replay), see
[VkOpaqueCaptureDescriptorDataCreateInfoEXT](VkOpaqueCaptureDescriptorDataCreateInfoEXT.html) for more detail.

[VK_ARM_tensors](VK_ARM_tensors.html), [VkTensorViewCreateFlagsARM](VkTensorViewCreateFlagsARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkTensorViewCreateFlagBitsARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
