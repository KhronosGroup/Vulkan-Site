# VkTensorUsageFlagBitsARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkTensorUsageFlagBitsARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkTensorUsageFlagBitsARM - Bitmask specifying allowed usage of a tensor

Bits which **can** be set in [VkTensorDescriptionARM](VkTensorDescriptionARM.html)::`usage`,
specifying usage behavior of a tensor, are:

// Provided by VK_ARM_tensors
// Flag bits for VkTensorUsageFlagBitsARM
typedef VkFlags64 VkTensorUsageFlagBitsARM;
static const VkTensorUsageFlagBitsARM VK_TENSOR_USAGE_SHADER_BIT_ARM = 0x00000002ULL;
static const VkTensorUsageFlagBitsARM VK_TENSOR_USAGE_TRANSFER_SRC_BIT_ARM = 0x00000004ULL;
static const VkTensorUsageFlagBitsARM VK_TENSOR_USAGE_TRANSFER_DST_BIT_ARM = 0x00000008ULL;
static const VkTensorUsageFlagBitsARM VK_TENSOR_USAGE_IMAGE_ALIASING_BIT_ARM = 0x00000010ULL;
// Provided by VK_ARM_data_graph
static const VkTensorUsageFlagBitsARM VK_TENSOR_USAGE_DATA_GRAPH_BIT_ARM = 0x00000020ULL;

* 
[VK_TENSOR_USAGE_SHADER_BIT_ARM](#) specifies that the tensor **can** be
used to create a `VkTensorViewARM` suitable for occupying a
`VkDescriptorSet` slot of type [VK_DESCRIPTOR_TYPE_TENSOR_ARM](VkDescriptorType.html)
accessed by shader stages.

* 
[VK_TENSOR_USAGE_TRANSFER_SRC_BIT_ARM](#) specifies that the tensor
**can** be used as the source of a *transfer command* (see the definition
of
[](../../../../spec/latest/chapters/synchronization.html#synchronization-pipeline-stages-transfer)[VK_PIPELINE_STAGE_TRANSFER_BIT](VkPipelineStageFlagBits.html)).

* 
[VK_TENSOR_USAGE_TRANSFER_DST_BIT_ARM](#) specifies that the tensor
**can** be used as the destination of a transfer command.

* 
[VK_TENSOR_USAGE_IMAGE_ALIASING_BIT_ARM](#) specifies that the tensor
**can** be bound to a range of memory aliased with an image created with
[VK_IMAGE_TILING_OPTIMAL](VkImageTiling.html).
See [Memory Aliasing](../../../../spec/latest/chapters/resources.html#resources-memory-aliasing) for a complete set of rules for
tensor/image aliasing.

* 
[VK_TENSOR_USAGE_DATA_GRAPH_BIT_ARM](#) specifies that the tensor **can**
be used to create a `VkTensorViewARM` suitable for occupying a
`VkDescriptorSet` slot of type [VK_DESCRIPTOR_TYPE_TENSOR_ARM](VkDescriptorType.html)
accessed by [data graph pipelines](../../../../spec/latest/chapters/VK_ARM_data_graph/graphs.html#graphs-pipelines).

[VK_ARM_tensors](VK_ARM_tensors.html), [VkTensorUsageFlagsARM](VkTensorUsageFlagsARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkTensorUsageFlagBitsARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
