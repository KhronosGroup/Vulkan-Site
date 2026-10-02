# vkFreeMemory(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkFreeMemory.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkFreeMemory - Free device memory

To free a memory object, call:

// Provided by VK_VERSION_1_0
void vkFreeMemory(
    VkDevice                                    device,
    VkDeviceMemory                              memory,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that owns the memory.

* 
`memory` is the [VkDeviceMemory](VkDeviceMemory.html) object to be freed.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Before freeing a memory object, an application **must** ensure the memory
object is no longer in use by the device — for example by command buffers
in the *pending state*.
Memory **can** be freed whilst still bound to resources, but those resources
**must** not be used afterwards.
Freeing a memory object releases the reference it held, if any, to its
payload.
If there are still any bound images or buffers, the memory object’s payload
**may** not be immediately released by the implementation, but **must** be
released by the time all bound images and buffers have been destroyed.
Once all references to a payload are released, it is returned to the heap
from which it was allocated.

How memory objects are bound to Images and Buffers is described in detail in
the [Resource Memory Association](../../../../spec/latest/chapters/resources.html#resources-association) section.

If a memory object is mapped at the time it is freed, it is implicitly
unmapped.

|  | As described [below](../../../../spec/latest/chapters/memory.html#memory-device-unmap-does-not-flush), host writes are
| --- | --- |
not implicitly flushed when the memory object is unmapped, but the
implementation **must** guarantee that writes that have not been flushed do not
affect any other memory. |

Valid Usage

* 
[](#VUID-vkFreeMemory-memory-00677) VUID-vkFreeMemory-memory-00677

All submitted commands that refer to `memory` (via images or
buffers) **must** have completed execution

Valid Usage (Implicit)

* 
[](#VUID-vkFreeMemory-device-parameter) VUID-vkFreeMemory-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkFreeMemory-memory-parameter) VUID-vkFreeMemory-memory-parameter

 If `memory` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `memory` **must** be a valid [VkDeviceMemory](VkDeviceMemory.html) handle

* 
[](#VUID-vkFreeMemory-pAllocator-parameter) VUID-vkFreeMemory-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkFreeMemory-memory-parent) VUID-vkFreeMemory-memory-parent

 If `memory` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `memory` **must** be externally synchronized

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkDeviceMemory](VkDeviceMemory.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/memory.html#vkFreeMemory).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
