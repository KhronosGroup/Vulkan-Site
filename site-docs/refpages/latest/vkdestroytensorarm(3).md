# vkDestroyTensorARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyTensorARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyTensorARM - Destroy a tensor object

To destroy a tensor, call:

// Provided by VK_ARM_tensors
void vkDestroyTensorARM(
    VkDevice                                    device,
    VkTensorARM                                 tensor,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the tensor.

* 
`tensor` is the tensor to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyTensorARM-tensor-09730) VUID-vkDestroyTensorARM-tensor-09730

All submitted commands that refer to `tensor`, either directly or
via a `VkTensorViewARM`, **must** have completed execution

* 
[](#VUID-vkDestroyTensorARM-tensor-09731) VUID-vkDestroyTensorARM-tensor-09731

If `VkAllocationCallbacks` were provided when `tensor` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyTensorARM-tensor-09732) VUID-vkDestroyTensorARM-tensor-09732

If no `VkAllocationCallbacks` were provided when `tensor` was
created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyTensorARM-device-parameter) VUID-vkDestroyTensorARM-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyTensorARM-tensor-parameter) VUID-vkDestroyTensorARM-tensor-parameter

 If `tensor` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `tensor` **must** be a valid [VkTensorARM](VkTensorARM.html) handle

* 
[](#VUID-vkDestroyTensorARM-pAllocator-parameter) VUID-vkDestroyTensorARM-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyTensorARM-tensor-parent) VUID-vkDestroyTensorARM-tensor-parent

 If `tensor` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `tensor` **must** be externally synchronized

[VK_ARM_tensors](VK_ARM_tensors.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkTensorARM](VkTensorARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkDestroyTensorARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
