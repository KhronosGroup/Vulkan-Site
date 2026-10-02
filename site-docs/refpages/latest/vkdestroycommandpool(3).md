# vkDestroyCommandPool(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyCommandPool.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyCommandPool - Destroy a command pool object

To destroy a command pool, call:

// Provided by VK_VERSION_1_0
void vkDestroyCommandPool(
    VkDevice                                    device,
    VkCommandPool                               commandPool,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the command pool.

* 
`commandPool` is the handle of the command pool to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

When a pool is destroyed, all command buffers allocated from the pool are
[freed](../../../../spec/latest/chapters/cmdbuffers.html#vkFreeCommandBuffers).

Any primary command buffer allocated from another [VkCommandPool](VkCommandPool.html) that
is in the [recording or executable state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle) and
has a secondary command buffer allocated from `commandPool` recorded
into it, becomes [invalid](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle).

Valid Usage

* 
[](#VUID-vkDestroyCommandPool-commandPool-00041) VUID-vkDestroyCommandPool-commandPool-00041

All `VkCommandBuffer` objects allocated from `commandPool` **must**
not be in the [pending state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkDestroyCommandPool-commandPool-00042) VUID-vkDestroyCommandPool-commandPool-00042

If `VkAllocationCallbacks` were provided when `commandPool` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyCommandPool-commandPool-00043) VUID-vkDestroyCommandPool-commandPool-00043

If no `VkAllocationCallbacks` were provided when `commandPool`
was created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyCommandPool-device-parameter) VUID-vkDestroyCommandPool-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyCommandPool-commandPool-parameter) VUID-vkDestroyCommandPool-commandPool-parameter

 If `commandPool` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `commandPool` **must** be a valid [VkCommandPool](VkCommandPool.html) handle

* 
[](#VUID-vkDestroyCommandPool-pAllocator-parameter) VUID-vkDestroyCommandPool-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyCommandPool-commandPool-parent) VUID-vkDestroyCommandPool-commandPool-parent

 If `commandPool` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `commandPool` **must** be externally synchronized

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkCommandPool](VkCommandPool.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#vkDestroyCommandPool).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
