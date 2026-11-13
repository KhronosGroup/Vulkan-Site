# vkDestroyEvent(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkDestroyEvent.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkDestroyEvent - Destroy an event object

To destroy an event, call:

// Provided by VK_VERSION_1_0
void vkDestroyEvent(
    VkDevice                                    device,
    VkEvent                                     event,
    const VkAllocationCallbacks*                pAllocator);

* 
`device` is the logical device that destroys the event.

* 
`event` is the handle of the event to destroy.

* 
`pAllocator` controls host memory allocation as described in the
[Memory Allocation](../../../../spec/latest/chapters/memory.html#memory-allocation) chapter.

Valid Usage

* 
[](#VUID-vkDestroyEvent-event-01145) VUID-vkDestroyEvent-event-01145

All submitted commands that refer to `event` **must** have completed
execution

* 
[](#VUID-vkDestroyEvent-event-01146) VUID-vkDestroyEvent-event-01146

If `VkAllocationCallbacks` were provided when `event` was
created, a compatible set of callbacks **must** be provided here

* 
[](#VUID-vkDestroyEvent-event-01147) VUID-vkDestroyEvent-event-01147

If no `VkAllocationCallbacks` were provided when `event` was
created, `pAllocator` **must** be `NULL`

Valid Usage (Implicit)

* 
[](#VUID-vkDestroyEvent-device-parameter) VUID-vkDestroyEvent-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkDestroyEvent-event-parameter) VUID-vkDestroyEvent-event-parameter

 If `event` is not [VK_NULL_HANDLE](VK_NULL_HANDLE.html), `event` **must** be a valid [VkEvent](VkEvent.html) handle

* 
[](#VUID-vkDestroyEvent-pAllocator-parameter) VUID-vkDestroyEvent-pAllocator-parameter

 If `pAllocator` is not `NULL`, `pAllocator` **must** be a valid pointer to a valid [VkAllocationCallbacks](VkAllocationCallbacks.html) structure

* 
[](#VUID-vkDestroyEvent-event-parent) VUID-vkDestroyEvent-event-parent

 If `event` is a valid handle, it **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `event` **must** be externally synchronized

[VK_VERSION_1_0](VK_VERSION_1_0.html), [VkAllocationCallbacks](VkAllocationCallbacks.html), [VkDevice](VkDevice.html), [VkEvent](VkEvent.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/synchronization.html#vkDestroyEvent).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
