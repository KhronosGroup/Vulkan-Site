# vkTrimCommandPool(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkTrimCommandPool.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkTrimCommandPool - Trim a command pool

To trim a command pool, call:

// Provided by VK_VERSION_1_1
void vkTrimCommandPool(
    VkDevice                                    device,
    VkCommandPool                               commandPool,
    VkCommandPoolTrimFlags                      flags);

// Provided by VK_KHR_maintenance1
// Equivalent to vkTrimCommandPool
void vkTrimCommandPoolKHR(
    VkDevice                                    device,
    VkCommandPool                               commandPool,
    VkCommandPoolTrimFlags                      flags);

* 
`device` is the logical device that owns the command pool.

* 
`commandPool` is the command pool to trim.

* 
`flags` is reserved for future use.

Trimming a command pool recycles unused memory from the command pool back to
the system.
Command buffers allocated from the pool are not affected by the command.

|  | This command provides applications with some control over the internal
| --- | --- |
memory allocations used by command pools.

Unused memory normally arises from command buffers that have been recorded
and later reset, such that they are no longer using the memory.
On reset, a command buffer can return memory to its command pool, but the
only way to release memory from a command pool to the system requires
calling [vkResetCommandPool](vkResetCommandPool.html), which cannot be executed while any command
buffers from that pool are still in use.
Subsequent recording operations into command buffers will reuse this memory
but since total memory requirements fluctuate over time, unused memory can
accumulate.

In this situation, trimming a command pool **may** be useful to return unused
memory back to the system, returning the total outstanding memory allocated
by the pool back to a more “average” value.

Implementations utilize many internal allocation strategies that make it
impossible to guarantee that all unused memory is released back to the
system.
For instance, an implementation of a command pool **may** involve allocating
memory in bulk from the system and sub-allocating from that memory.
In such an implementation any live command buffer that holds a reference to
a bulk allocation would prevent that allocation from being freed, even if
only a small proportion of the bulk allocation is in use.

In most cases trimming will result in a reduction in allocated but unused
memory, but it does not guarantee the “ideal” behavior.

Trimming **may** be an expensive operation, and **should** not be called
frequently.
Trimming **should** be treated as a way to relieve memory pressure after
application-known points when there exists enough unused memory that the
cost of trimming is “worth” it. |

Valid Usage (Implicit)

* 
[](#VUID-vkTrimCommandPool-device-parameter) VUID-vkTrimCommandPool-device-parameter

 `device` **must** be a valid [VkDevice](VkDevice.html) handle

* 
[](#VUID-vkTrimCommandPool-commandPool-parameter) VUID-vkTrimCommandPool-commandPool-parameter

 `commandPool` **must** be a valid [VkCommandPool](VkCommandPool.html) handle

* 
[](#VUID-vkTrimCommandPool-flags-zerobitmask) VUID-vkTrimCommandPool-flags-zerobitmask

 `flags` **must** be `0`

* 
[](#VUID-vkTrimCommandPool-commandPool-parent) VUID-vkTrimCommandPool-commandPool-parent

 `commandPool` **must** have been created, allocated, or retrieved from `device`

Host Synchronization

* 
Host access to `commandPool` **must** be externally synchronized

[VK_KHR_maintenance1](VK_KHR_maintenance1.html), [VK_VERSION_1_1](VK_VERSION_1_1.html), [VkCommandPool](VkCommandPool.html), [VkCommandPoolTrimFlags](VkCommandPoolTrimFlags.html), [VkDevice](VkDevice.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/cmdbuffers.html#vkTrimCommandPool).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
