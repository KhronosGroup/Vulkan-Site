# vkDestroyDescriptorPool(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyDescriptorPool.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyDescriptorPool - Destroy a descriptor pool object

To destroy a descriptor pool, call:

// Provided by VK_VERSION_1_0
void vkDestroyDescriptorPool(
    VkDevice                                    device,
    VkDescriptorPool                            descriptorPool,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the descriptor pool.

* 
`descriptorPool` is the descriptor pool to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

When a pool is destroyed, all descriptor sets allocated from the pool are
implicitly freed and become invalid.
Descriptor sets allocated from a given pool do not need to be freed before
destroying that descriptor pool.

Valid Usage

* 
[](#VUID-vkDestroyDescriptorPool-descriptorPool-00303) VUID-vkDestroyDescriptorPool-descriptorPool-00303

All submitted commands that refer to `descriptorPool` (via any
allocated descriptor sets) **must** have completed execution

* 
[](#VUID-vkDestroyDescriptorPool-descriptorPool-00304) VUID-vkDestroyDescriptorPool-descriptorPool-00304

If `VkAllocationCallbacks` were provided when `descriptorPool`
was created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyDescriptorPool-descriptorPool-00305) VUID-vkDestroyDescriptorPool-descriptorPool-00305

If no `VkAllocationCallbacks` were provided when
`descriptorPool` was created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyDescriptorPool-device-parameter) VUID-vkDestroyDescriptorPool-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyDescriptorPool-descriptorPool-parameter) VUID-vkDestroyDescriptorPool-descriptorPool-parameter

 If `descriptorPool` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `descriptorPool` **must** be a valid [VkDescriptorPool](VkDescriptorPool.html) handle

* 
[](#VUID-vkDestroyDescriptorPool-pAllocator-parameter) VUID-vkDestroyDescriptorPool-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyDescriptorPool-descriptorPool-parent) VUID-vkDestroyDescriptorPool-descriptorPool-parent

 If `descriptorPool` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `descriptorPool` **must** be externally synchronized

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDescriptorPool](VkDescriptorPool.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorsets.html#vkDestroyDescriptorPool).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
