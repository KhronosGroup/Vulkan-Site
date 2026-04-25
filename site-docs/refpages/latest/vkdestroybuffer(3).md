# vkDestroyBuffer(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyBuffer.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyBuffer - Destroy a buffer object

To destroy a buffer, call:

// Provided by VK_VERSION_1_0
void vkDestroyBuffer(
    VkDevice                                    device,
    VkBuffer                                    buffer,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the buffer.

* 
`buffer` is the buffer to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyBuffer-buffer-00922) VUID-vkDestroyBuffer-buffer-00922

All submitted commands that refer to `buffer`, either directly or
via a `VkBufferView`, **must** have completed execution

* 
[](#VUID-vkDestroyBuffer-buffer-00923) VUID-vkDestroyBuffer-buffer-00923

If `VkAllocationCallbacks` were provided when `buffer` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyBuffer-buffer-00924) VUID-vkDestroyBuffer-buffer-00924

If no `VkAllocationCallbacks` were provided when `buffer` was
created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyBuffer-device-parameter) VUID-vkDestroyBuffer-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyBuffer-buffer-parameter) VUID-vkDestroyBuffer-buffer-parameter

 If `buffer` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `buffer` **must** be a valid [VkBuffer](VkBuffer.html) handle

* 
[](#VUID-vkDestroyBuffer-pAllocator-parameter) VUID-vkDestroyBuffer-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyBuffer-buffer-parent) VUID-vkDestroyBuffer-buffer-parent

 If `buffer` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `buffer` **must** be externally synchronized

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkBuffer](VkBuffer.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkDestroyBuffer).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
