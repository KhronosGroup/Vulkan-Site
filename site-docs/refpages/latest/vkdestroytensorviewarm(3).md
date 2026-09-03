# vkDestroyTensorViewARM(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyTensorViewARM.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyTensorViewARM - Destroy a tensor view object

To destroy a tensor view, call:

// Provided by VK_ARM_tensors
void vkDestroyTensorViewARM(
    VkDevice                                    device,
    VkTensorViewARM                             tensorView,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the tensor view.

* 
`tensorView` is the tensor view to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyTensorViewARM-tensorView-09750) VUID-vkDestroyTensorViewARM-tensorView-09750

All submitted commands that refer to `tensorView` **must** have
completed execution

* 
[](#VUID-vkDestroyTensorViewARM-tensorView-09751) VUID-vkDestroyTensorViewARM-tensorView-09751

If `VkAllocationCallbacks` were provided when `tensorView` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyTensorViewARM-tensorView-09752) VUID-vkDestroyTensorViewARM-tensorView-09752

If no `VkAllocationCallbacks` were provided when `tensorView`
was created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyTensorViewARM-device-parameter) VUID-vkDestroyTensorViewARM-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyTensorViewARM-tensorView-parameter) VUID-vkDestroyTensorViewARM-tensorView-parameter

 If `tensorView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `tensorView` **must** be a valid [VkTensorViewARM](VkTensorViewARM.html) handle

* 
[](#VUID-vkDestroyTensorViewARM-pAllocator-parameter) VUID-vkDestroyTensorViewARM-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyTensorViewARM-tensorView-parent) VUID-vkDestroyTensorViewARM-tensorView-parent

 If `tensorView` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `tensorView` **must** be externally synchronized

[VK_ARM_tensors](VK_ARM_tensors.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkTensorViewARM](VkTensorViewARM.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkDestroyTensorViewARM).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
