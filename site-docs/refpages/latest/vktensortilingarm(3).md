# VkTensorTilingARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkTensorTilingARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkTensorTilingARM - Specifies the tiling arrangement of data in an tensor

Possible values of [VkTensorCreateInfoARM](VkTensorCreateInfoARM.html)::`tiling`, specifying the
tiling arrangement of elements in the tensor, are:

// Provided by VK_ARM_tensors
typedef enum VkTensorTilingARM {
    VK_TENSOR_TILING_OPTIMAL_ARM = 0,
    VK_TENSOR_TILING_LINEAR_ARM = 1,
  // Provided by VK_ARM_tensor_controls
    VK_TENSOR_TILING_BRICK_16_WIDE_ARM = 1000565000,
  // Provided by VK_ARM_tensor_controls
    VK_TENSOR_TILING_BRICK_8_WIDE_ARM = 1000565001,
  // Provided by VK_ARM_tensor_controls
    VK_TENSOR_TILING_BRICK_4_WIDE_ARM = 1000565002,
  // Provided by VK_ARM_tensor_controls
    VK_TENSOR_TILING_BLOCK_U_INTERLEAVED_ARM = 1000565003,
  // Provided by VK_ARM_tensor_controls
    VK_TENSOR_TILING_BLOCK_U_INTERLEAVED_64K_ARM = 1000565004,
} VkTensorTilingARM;

* 
[VK_TENSOR_TILING_OPTIMAL_ARM](#) specifies optimal tiling (elements
are laid out in an implementation-dependent arrangement, for more
efficient memory access).

* 
[VK_TENSOR_TILING_LINEAR_ARM](#) specifies linear tiling (elements are
laid out linearly and the offset between each element is determined by
the [strides](../../../../spec/latest/chapters/resources.html#resources-tensor-description-strides) of the tensor).

* 
[VK_TENSOR_TILING_BRICK_16_WIDE_ARM](#) specifies that the data is laid
out in 64-byte blocks of 16 x N elements where N depends on
the size of the elements in the tensor.

* 
[VK_TENSOR_TILING_BRICK_8_WIDE_ARM](#) specifies that the data is laid
out in 64-byte blocks of 8 x N elements where N depends on
the size of the elements in the tensor.

* 
[VK_TENSOR_TILING_BRICK_4_WIDE_ARM](#) specifies that the data is laid
out in 64-byte blocks of 4 x N elements where N depends on
the size of the elements in the tensor.

* 
[VK_TENSOR_TILING_BLOCK_U_INTERLEAVED_ARM](#) specifies that the data
is laid out using blocks of size 16 x 16 x C where C is the
size of the tensor along the innermost dimension.

* 
[VK_TENSOR_TILING_BLOCK_U_INTERLEAVED_64K_ARM](#) specifies that the
data is laid out using 64kiB groups of blocks of size 16 x 16 x C,
where C is the size of the tensor along the innermost dimension.

[VK_ARM_tensors](VK_ARM_tensors.html), [VkTensorDescriptionARM](VkTensorDescriptionARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkTensorTilingARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
