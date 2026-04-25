# vkDestroyBufferView(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyBufferView.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyBufferView - Destroy a buffer view object

To destroy a buffer view, call:

// Provided by VK_VERSION_1_0
void vkDestroyBufferView(
    VkDevice                                    device,
    VkBufferView                                bufferView,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the buffer view.

* 
`bufferView` is the buffer view to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyBufferView-bufferView-00936) VUID-vkDestroyBufferView-bufferView-00936

All submitted commands that refer to `bufferView` **must** have
completed execution

* 
[](#VUID-vkDestroyBufferView-bufferView-00937) VUID-vkDestroyBufferView-bufferView-00937

If `VkAllocationCallbacks` were provided when `bufferView` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyBufferView-bufferView-00938) VUID-vkDestroyBufferView-bufferView-00938

If no `VkAllocationCallbacks` were provided when `bufferView`
was created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyBufferView-device-parameter) VUID-vkDestroyBufferView-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyBufferView-bufferView-parameter) VUID-vkDestroyBufferView-bufferView-parameter

 If `bufferView` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `bufferView` **must** be a valid [VkBufferView](VkBufferView.html) handle

* 
[](#VUID-vkDestroyBufferView-pAllocator-parameter) VUID-vkDestroyBufferView-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyBufferView-bufferView-parent) VUID-vkDestroyBufferView-bufferView-parent

 If `bufferView` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `bufferView` **must** be externally synchronized

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkBufferView](VkBufferView.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/resources.html#vkDestroyBufferView).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
