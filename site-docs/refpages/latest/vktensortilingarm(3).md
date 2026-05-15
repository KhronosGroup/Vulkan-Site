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
} VkTensorTilingARM;

* 
[VK_TENSOR_TILING_OPTIMAL_ARM](#) specifies optimal tiling (elements
are laid out in an implementation-dependent arrangement, for more
efficient memory access).

* 
[VK_TENSOR_TILING_LINEAR_ARM](#) specifies linear tiling (elements are
laid out linearly and the offset between each element is determined by
the [strides](../../../../spec/latest/chapters/resources.html#resources-tensor-description-strides) of the tensor).

[VK_ARM_tensors](VK_ARM_tensors.html), [VkTensorDescriptionARM](VkTensorDescriptionARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#VkTensorTilingARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
